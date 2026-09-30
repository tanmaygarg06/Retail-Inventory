import React, { useState, useEffect } from 'react';
import { Warehouse as WarehouseIcon, MapPin, User, Package, Plus, Search, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', city: '', capacity: 10000, managerName: '' });

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/warehouses');
      if (res.data.success) {
        setWarehouses(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/warehouses', {
        ...formData,
        status: 'ACTIVE',
        createdAt: new Date().toISOString()
      });
      setShowModal(false);
      setFormData({ name: '', address: '', city: '', capacity: 10000, managerName: '' });
      fetchWarehouses();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 relative">
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">Add New Warehouse</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Warehouse Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500" placeholder="e.g. Mumbai Central Depot" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500" placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Capacity (Units)</label>
                  <input required type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500" placeholder="Full street address" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Manager Name</label>
                <input required type="text" value={formData.managerName} onChange={e => setFormData({...formData, managerName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500" placeholder="e.g. Aditi Sharma" />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold bg-black text-white hover:bg-indigo-700 rounded shadow-sm">Save Warehouse</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Warehouses</h1>
          <p className="text-slate-500 mt-1">Manage physical storage locations, capacities, and managers.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition flex items-center shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-500 font-bold">Loading warehouses...</div>
        ) : warehouses.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-500 font-bold">No warehouses found.</div>
        ) : (
          warehouses.map(w => (
            <div key={w.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Top accent line */}
              <div className={"absolute top-0 left-0 w-full h-1 " + (w.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500')}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-slate-100 text-black rounded-lg flex items-center justify-center">
                  <WarehouseIcon className="w-6 h-6" />
                </div>
                <span className={"px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded flex items-center " + (w.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700')}>
                  {w.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                  {w.status}
                </span>
              </div>
              
              <h2 className="text-lg font-black text-slate-900 mb-1">{w.name}</h2>
              <div className="flex items-center text-xs font-bold text-slate-500 mb-6">
                <MapPin className="w-3.5 h-3.5 mr-1" /> {w.city} • {w.address}
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center"><Package className="w-3 h-3 mr-1" /> Capacity</p>
                  <p className="font-black text-slate-900 text-sm">{w.capacity?.toLocaleString() || 'N/A'} Units</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center"><User className="w-3 h-3 mr-1" /> Manager</p>
                  <p className="font-bold text-slate-700 text-sm truncate">{w.managerName || 'Unassigned'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

