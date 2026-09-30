import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, ArrowDownToLine, Plus, Building2, Package } from 'lucide-react';
import axios from 'axios';

export default function Inventory() {
  const [inventories, setInventories] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeTab, setActiveTab] = useState('stock'); // 'stock' or 'warehouses'
  const [showStockModal, setShowStockModal] = useState(false);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);

  // Forms
  const [stockForm, setStockForm] = useState({ productId: '', warehouseId: '', quantity: '' });
  const [warehouseForm, setWarehouseForm] = useState({ name: '', location: '', capacity: '', managerName: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [invRes, whRes, prodRes] = await Promise.all([
        axios.get('http://localhost:8080/api/inventories'),
        axios.get('http://localhost:8080/api/warehouses'),
        axios.get('http://localhost:8080/api/products')
      ]);
      if (invRes.data.success) setInventories(invRes.data.data);
      if (whRes.data.success) setWarehouses(whRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddWarehouse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/warehouses', {
        name: warehouseForm.name,
        address: warehouseForm.location,
        city: 'Default City',
        capacity: parseInt(warehouseForm.capacity),
        managerName: warehouseForm.managerName,
        status: 'ACTIVE'
      });
      setShowWarehouseModal(false);
      setWarehouseForm({ name: '', location: '', capacity: '', managerName: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleStockIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Find if inventory already exists for this product + warehouse
      const existing = inventories.find(i => 
        i.product?.id === parseInt(stockForm.productId) && 
        i.warehouse?.id === parseInt(stockForm.warehouseId)
      );

      if (existing) {
        // Update existing
        await axios.put(`http://localhost:8080/api/inventories/${existing.id}`, {
          ...existing,
          availableQuantity: (existing.quantityAvailable || 0) + parseInt(stockForm.quantity),
          totalQuantity: (existing.totalQuantity || 0) + parseInt(stockForm.quantity)
        });
      } else {
        // Create new
        await axios.post('http://localhost:8080/api/inventories', {
          product: { id: parseInt(stockForm.productId) },
          warehouse: { id: parseInt(stockForm.warehouseId) },
          totalQuantity: parseInt(stockForm.quantity),
          availableQuantity: parseInt(stockForm.quantity),
          reservedQuantity: 0,
          status: 'IN_STOCK'
        });
      }
      setShowStockModal(false);
      setStockForm({ productId: '', warehouseId: '', quantity: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory & Warehouses</h1>
          <p className="text-slate-500 mt-1">Track stock levels and manage warehouse locations.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setShowStockModal(true)} className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm flex items-center">
            <ArrowDownToLine className="w-4 h-4 mr-2 text-blue-600" /> Stock In
          </button>
          <button onClick={() => setShowWarehouseModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Warehouse
          </button>
        </div>
      </div>

      <div className="flex space-x-1 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('stock')} 
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'stock' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Stock Tracking
        </button>
        <button 
          onClick={() => setActiveTab('warehouses')} 
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'warehouses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          Warehouses
        </button>
      </div>

      {activeTab === 'stock' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-medium">
                <th className="p-4">Product</th>
                <th className="p-4">Warehouse</th>
                <th className="p-4 text-center">Total Stock</th>
                <th className="p-4 text-center">Reserved</th>
                <th className="p-4 text-center">Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading inventory data...</td></tr>
              ) : inventories.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No stock recorded yet.</td></tr>
              ) : (
                inventories.map((i, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 text-sm">
                    <td className="p-4 text-slate-900 font-semibold">{i.product?.name || 'Unknown Product'}</td>
                    <td className="p-4 text-slate-600">{i.warehouse?.name || 'Unknown Location'}</td>
                    <td className="p-4 text-center font-medium text-slate-700">{i.totalQuantity || 0}</td>
                    <td className="p-4 text-center font-medium text-amber-600">{i.reservedQuantity || 0}</td>
                    <td className="p-4 text-center font-bold text-emerald-600">{i.availableQuantity || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="p-8 col-span-full text-center text-slate-500">Loading warehouses...</div>
          ) : warehouses.length === 0 ? (
             <div className="p-8 col-span-full text-center text-slate-500 border border-slate-200 rounded-lg">No warehouses found. Add one!</div>
          ) : (
            warehouses.map((w, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-md">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{w.name}</h3>
                    <p className="text-xs text-slate-500">{w.address || w.city}</p>
                  </div>
                </div>
                <div className="space-y-2 mt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Manager:</span>
                    <span className="font-medium text-slate-900">{w.managerName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Capacity:</span>
                    <span className="font-medium text-slate-900">{w.capacity || 'Unlimited'} units</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stock In Modal */}
      {showStockModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Record Stock In</h2>
            <form onSubmit={handleStockIn} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                <select required value={stockForm.productId} onChange={e => setStockForm({...stockForm, productId: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="">Select a product...</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name} (SKU: {p.sku})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Destination Warehouse</label>
                <select required value={stockForm.warehouseId} onChange={e => setStockForm({...stockForm, warehouseId: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm">
                  <option value="">Select a warehouse...</option>
                  {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Quantity Received</label>
                <input type="number" min="1" required value={stockForm.quantity} onChange={e => setStockForm({...stockForm, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowStockModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Confirm Stock In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Warehouse Modal */}
      {showWarehouseModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Warehouse</h2>
            <form onSubmit={handleAddWarehouse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Warehouse Name</label>
                <input type="text" required value={warehouseForm.name} onChange={e => setWarehouseForm({...warehouseForm, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address</label>
                <input type="text" required value={warehouseForm.location} onChange={e => setWarehouseForm({...warehouseForm, location: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Manager Name</label>
                <input type="text" value={warehouseForm.managerName} onChange={e => setWarehouseForm({...warehouseForm, managerName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Max Capacity (Units)</label>
                <input type="number" min="1" value={warehouseForm.capacity} onChange={e => setWarehouseForm({...warehouseForm, capacity: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowWarehouseModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Save Warehouse</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


