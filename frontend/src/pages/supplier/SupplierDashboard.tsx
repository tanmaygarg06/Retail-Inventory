import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../store/AuthContext';
import { LayoutDashboard, FileText, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupplierDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [recentPos, setRecentPos] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:8080/api/supplier/purchaseorders?userId=' + user.id).then(res => {
        const pos = res.data.data || [];
        setStats({
          total: pos.length,
          pending: pos.filter((p:any) => p.status === 'PENDING').length,
          completed: pos.filter((p:any) => p.status === 'COMPLETED').length
        });
        setRecentPos(pos.slice(0, 5));
      });
    }
  }, [user]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Supplier Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <FileText className="w-8 h-8 text-indigo-500 mb-2" />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total POs</h2>
          <p className="text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <Clock className="w-8 h-8 text-amber-500 mb-2" />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pending</h2>
          <p className="text-3xl font-black text-slate-900 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Completed</h2>
          <p className="text-3xl font-black text-slate-900 mt-1">{stats.completed}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Purchase Orders</h3>
          <Link to="/supplier/purchase-orders" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest">View All</Link>
        </div>
        <div className="p-4">{recentPos.length === 0 ? <p className="text-center text-slate-500 p-4">No recent POs.</p> : recentPos.map(po => (<div key={po.id} className="p-3 border-b border-slate-100 flex justify-between"><div><span className="font-bold text-slate-900">PO-{po.id}</span> <span className="text-xs text-slate-500 ml-2">{new Date(po.orderDate).toLocaleDateString()}</span></div><span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded uppercase">{po.status}</span></div>))}</div>
      </div>
    </div>
  );
}


