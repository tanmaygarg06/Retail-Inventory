import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Calendar, IndianRupee, Clock, PackageCheck } from 'lucide-react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/orders');
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Master Order Log</h1>
          <p className="text-slate-500 mt-1">View all customer orders placed across the enterprise.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search order ID..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-medium">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date Placed</th>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Fulfillment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading order history...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">No orders found.</td></tr>
            ) : (
              orders.map((o, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center">
                    <ShoppingCart className="w-4 h-4 mr-2 text-slate-400" />
                    #ORD-{o.id.toString().padStart(4, '0')}
                  </td>
                  <td className="p-4 text-slate-600 text-sm">
                    {new Date(o.orderDate).toLocaleDateString()} {new Date(o.orderDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </td>
                  <td className="p-4 text-slate-600 font-medium">
                    {o.createdBy ? `USR-${o.createdBy.id}` : 'Walk-in / Unknown'}
                  </td>
                  <td className="p-4 font-bold text-slate-900 flex items-center">
                    <IndianRupee className="w-3 h-3 mr-0.5 text-slate-500" />{o.totalAmount?.toFixed(2)}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold uppercase ${
                      o.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700' :
                      o.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {o.status === 'DELIVERED' ? <PackageCheck className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {o.status || 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

