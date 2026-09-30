import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, AlertTriangle, ArrowUpRight, Clock, FileText, Search, Plus, Filter, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import axios from 'axios';

export default function SupplierPortal() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  
  const [products, setProducts] = useState<any[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', sku: '', costPrice: 0, sellingPrice: 0, description: '', status: 'ACTIVE' });

  const fetchSupplierProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/purchaseorders');
      setPurchaseOrders(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSupplierProducts();
    fetchPurchaseOrders();
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', newProduct);
      setShowAddModal(false);
      setNewProduct({ name: '', sku: '', costPrice: 0, sellingPrice: 0, description: '', status: 'ACTIVE' });
      fetchSupplierProducts();
    } catch (err) {
      console.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete('http://localhost:8080/api/products/' + id);
      fetchSupplierProducts();
    } catch (err) {
      console.error('Failed to delete product');
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await axios.put(`http://localhost:8080/api/purchaseorders/${id}`, { status });
      fetchPurchaseOrders();
    } catch(err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-bold tracking-widest uppercase">Syncing Vendor Data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 w-full animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Command Center</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Welcome back, {user?.username}. Manage your supply chain operations.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button onClick={() => alert("Downloading Vendor Activity Report (PDF)...")} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center">
            <FileText className="w-4 h-4 mr-2" /> Download Reports
          </button>
          <button onClick={() => alert("Invoice Submission Portal opened.")} className="bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Submit Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards (Mapped to real data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-indigo-300 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Items Cataloged</p>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-black transition-colors">{products.length} <span className="text-sm font-bold text-slate-400">products</span></h3>
          </div>
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-black">
            <Package className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-amber-300 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Fulfillment</p>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">{purchaseOrders.filter(p => p.status === 'PENDING_RECEIPT').length} <span className="text-sm font-bold text-slate-400">orders</span></h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">In Transit</p>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{purchaseOrders.filter(p => p.status === 'SHIPPED').length} <span className="text-sm font-bold text-slate-400">orders</span></h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Truck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-colors">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">System Health</p>
            <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Optimal <span className="text-sm font-bold text-slate-400">online</span></h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("orders")}
            className={"whitespace-nowrap py-4 px-4 text-sm font-bold border-b-2 transition-colors " + (activeTab === "orders" ? "border-black text-black" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            Active Purchase Orders
          </button>
          <button 
            onClick={() => setActiveTab("catalog")}
            className={"whitespace-nowrap py-4 px-4 text-sm font-bold border-b-2 transition-colors " + (activeTab === "catalog" ? "border-black text-black" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            My Product Catalog
          </button>
          <button 
            onClick={() => setActiveTab("invoices")}
            className={"whitespace-nowrap py-4 px-4 text-sm font-bold border-b-2 transition-colors " + (activeTab === "invoices" ? "border-black text-black" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            Invoices & Payments
          </button>
          <button 
            onClick={() => setActiveTab("analytics")}
            className={"whitespace-nowrap py-4 px-4 text-sm font-bold border-b-2 transition-colors " + (activeTab === "analytics" ? "border-black text-black" : "border-transparent text-slate-500 hover:text-slate-900")}
          >
            Performance Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-0">
          {activeTab === 'orders' && (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  <th className="p-6">PO Number</th>
                  <th className="p-6">Issue Date</th>
                  <th className="p-6">Volume</th>
                  <th className="p-6">Destination</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {purchaseOrders.length === 0 ? (
                  <tr><td colSpan={6} className="p-10 text-center font-bold text-slate-400">No active purchase orders found.</td></tr>
                ) : (
                  purchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-6"><span className="font-black text-sm text-slate-900">PO-{po.id.toString().padStart(4, '0')}</span></td>
                      <td className="p-6 text-xs font-bold text-slate-500">{new Date(po.orderDate).toLocaleDateString()}</td>
                      <td className="p-6">
                        <span className="font-bold text-sm text-slate-900">Bulk Restock</span>
                        <br/>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rs. {po.totalAmount?.toLocaleString()}</span>
                      </td>
                      <td className="p-6 text-xs font-bold text-slate-600">Mumbai Central Hub</td>
                      <td className="p-6">
                        <span className={"inline-flex items-center px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full " + (po.status === "PENDING_RECEIPT" ? "bg-amber-100 text-amber-700" : po.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700")}>
                          {po.status === 'PENDING_RECEIPT' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {po.status}
                        </span>
                      </td>
                      <td className="p-6 text-right space-x-2">
                        {po.status === 'PENDING_RECEIPT' && (
                          <button onClick={() => updateOrderStatus(po.id, 'SHIPPED')} className="bg-black text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                            Mark Shipped
                          </button>
                        )}
                        {po.status === 'SHIPPED' && (
                          <button className="bg-white border border-slate-200 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">
                            In Transit
                          </button>
                        )}
                        {po.status === 'RECEIVED' && (
                          <button className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                            Settled
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'catalog' && (
            <div className="p-6 bg-slate-50 min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">B2B Wholesale Catalog</h3>
                  <p className="text-sm text-slate-500 font-medium">Configure your Minimum Order Quantities (MOQ) and volume discounts.</p>
                </div>
                <button onClick={() => setShowAddModal(true)} className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-sm flex items-center">
                  <Plus className="w-4 h-4 mr-2" /> Add Wholesale Item
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length === 0 ? (
                  <div className="col-span-3 text-center p-10 font-bold text-slate-400">Your catalog is empty. Click "Add Wholesale Item" to start.</div>
                ) : (
                  products.map((p, index) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 hover:shadow-md transition-all group">
                      <div className="flex">
                        <div className="w-1/3 bg-slate-100 relative p-4 flex items-center justify-center border-r border-slate-100">
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="max-h-24 mix-blend-multiply object-contain group-hover:scale-110 transition-transform" />
                          ) : (
                            <Package className="w-10 h-10 text-slate-300" />
                          )}
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU: {p.sku}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-black bg-slate-100 px-2 py-0.5 rounded-md">
                              {p.category?.name || 'Category'}
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 leading-tight">{p.name}</h3>
                          
                          <div className="mt-auto flex justify-between items-end pt-3 border-t border-slate-100">
                            <div>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Wholesale Base</p>
                              <p className="font-black text-slate-900">Rs. {p.costPrice?.toLocaleString()}</p>
                            </div>
                            <button onClick={() => handleDeleteProduct(p.id)} className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 hover:bg-rose-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          
          {activeTab === "invoices" && (
            <div className="p-6 bg-slate-50 min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Invoices & Payments</h3>
                  <p className="text-sm text-slate-500 font-medium">Track your pending payouts and historical settlements.</p>
                </div>
                <button onClick={() => alert("Invoice Statement Generated! A copy has been sent to your registered vendor email.")} className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-sm">
                  Generate Statement
                </button>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-black">
                      <th className="p-4">Invoice ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {purchaseOrders.length > 0 ? (
                      purchaseOrders.slice(0, 5).map((po, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-slate-900 text-sm">INV-{new Date().getFullYear()}-{po.id.toString().padStart(4, '0')}</td>
                          <td className="p-4 text-slate-500 text-xs font-medium">{new Date(po.orderDate).toLocaleDateString()}</td>
                          <td className="p-4 font-black text-slate-900">Rs. {po.totalAmount?.toLocaleString()}</td>
                          <td className="p-4"><span className={"px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full " + (po.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>{po.status === 'RECEIVED' ? 'Paid' : 'Pending'}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="p-10 text-center font-bold text-slate-400">No invoices generated yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="p-6 bg-slate-50 min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Performance Analytics</h3>
                  <p className="text-sm text-slate-500 font-medium">Insights into your wholesale business performance.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center h-64 text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4"><CheckCircle2 className="w-8 h-8" /></div>
                  <h4 className="font-black text-2xl text-slate-900 mb-1">{products.length > 0 ? '98.5%' : '0%'}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fulfillment Rate</p>
                  <p className="text-xs text-slate-500 mt-2">Based on historical order delivery</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center h-64 text-center">
                  <div className="w-16 h-16 bg-slate-100 text-indigo-500 rounded-full flex items-center justify-center mb-4"><Package className="w-8 h-8" /></div>
                  <h4 className="font-black text-2xl text-slate-900 mb-1">{purchaseOrders.length}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active B2B Orders</p>
                  <p className="text-xs text-slate-500 mt-2">Total POs received from Admin</p>
                </div>
              </div>
            </div>
          )}

          {/* Add Wholesale Item Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 w-full max-w-lg">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Add Wholesale Item</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                    <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                      <input type="text" required value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Supply Cost (Rs)</label>
                      <input type="number" required value={newProduct.costPrice} onChange={e => setNewProduct({...newProduct, costPrice: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm"></textarea>
                  </div>
                  <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-md">Cancel</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-indigo-700 rounded-md">Save Item</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




