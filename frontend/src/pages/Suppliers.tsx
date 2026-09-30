import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Mail, Phone, MapPin, Building2, Edit, Trash2, Users as UsersIcon } from 'lucide-react';
import axios from 'axios';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ supplierName: '', contactPerson: '', email: '', phone: '', address: '' });

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/suppliers');
      if (res.data.success) {
        setSuppliers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/suppliers', {
        ...formData,
        status: 'ACTIVE'
      });
      setShowModal(false);
      setFormData({ supplierName: '', contactPerson: '', email: '', phone: '', address: '' });
      fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure you want to delete this supplier contract?')) {
      try {
        await axios.delete(`http://localhost:8080/api/suppliers/${id}`);
        fetchSuppliers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Supplier Directory</h1>
          <p className="text-slate-500 mt-1">Manage vendor relationships, contracts, and contact information.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Supplier
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search suppliers by name or contact..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors" />
          </div>
          <button onClick={() => alert("Advanced filtering options modal opened")} className="flex items-center px-4 py-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {loading ? (
            <div className="col-span-full text-center p-8 text-slate-500">Loading suppliers...</div>
          ) : suppliers.length === 0 ? (
            <div className="col-span-full text-center p-8 border border-dashed border-slate-300 rounded-xl text-slate-500">
              No suppliers found. Click "Add Supplier" to register a new vendor.
            </div>
          ) : (
            suppliers.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-colors shadow-sm group overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">{s.supplierName}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${s.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {s.status || 'ACTIVE'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="p-5 space-y-3 flex-1 bg-slate-50/50">
                  <div className="flex items-start space-x-3 text-sm">
                    <div className="mt-0.5"><UsersIcon className="w-4 h-4 text-slate-400" /></div>
                    <div>
                      <p className="font-medium text-slate-900">{s.contactPerson}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Account Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{s.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">{s.phone}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-600 leading-tight">{s.address}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Register New Supplier</h2>
            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" required value={formData.supplierName} onChange={e => setFormData({...formData, supplierName: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                <input type="text" required value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
                <textarea rows={2} required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"></textarea>
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors">Save Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


