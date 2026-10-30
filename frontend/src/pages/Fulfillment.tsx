import React, { useState, useEffect } from 'react';
import { Truck, CheckCircle2, Clock, PackageCheck, ArrowRight, XCircle } from 'lucide-react';
import axios from 'axios';

export default function Fulfillment() {
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

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${id}/status`, { status: newStatus });
      const order = orders.find(o => o.id === id);
      
      fetchOrders(); // refresh data
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // Helper to format date relative time
  const timeAgo = (dateString: string) => {
    if (!dateString) return 'Just now';
    const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const Column = ({ title, icon: Icon, colorClass, currentStatus, nextStatus, nextLabel, items }: any) => (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${colorClass}`} /> {title}
        </h3>
        <span className={`py-0.5 px-2.5 rounded-full text-xs font-bold ${colorClass.replace('text-', 'bg-').replace('500', '100')} ${colorClass}`}>
          {items.length}
        </span>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center p-6 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No orders in this queue.
          </div>
        ) : (
          items.map((q: any) => (
            <div key={q.id} className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-slate-50/50 shadow-sm group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-900">#ORD-{q.id.toString().padStart(4, '0')}</span>
                <span className="text-xs font-medium text-slate-500">{timeAgo(q.orderDate)}</span>
              </div>
              
              <div className="text-sm text-slate-600 mb-4">
                Total Amount: <span className="font-bold">₹{q.totalAmount?.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
              {nextStatus && (
                <button 
                  onClick={() => updateStatus(q.id, nextStatus)}
                  className="flex-1 flex items-center justify-center py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {nextLabel} <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              )}
              {q.status !== 'DELIVERED' && q.status !== 'SHIPPED' && q.status !== 'CANCELLED' && (
                <button 
                  onClick={() => {
                     if (confirm('Are you sure you want to cancel this order? This will revert the reserved inventory.')) {
                         updateStatus(q.id, 'CANCELLED');
                     }
                  }}
                  title="Cancel Order"
                  className="flex-none flex items-center justify-center px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-400 hover:text-rose-600 hover:border-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Fulfillment Center</h1>
        <p className="text-slate-500 mt-1">Manage processing, packing, and shipping operations.</p>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-500">Loading fulfillment queues...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
          <Column 
            title="Pending & Processing" 
            icon={Clock} 
            colorClass="text-blue-500"
            currentStatus="PENDING_FULFILLMENT"
            nextStatus="PACKED"
            nextLabel="Mark as Packed"
            items={orders.filter(o => o.status === 'PENDING_FULFILLMENT' || o.status === 'PENDING' || !o.status)}
          />
          <Column 
            title="Packed & Ready" 
            icon={PackageCheck} 
            colorClass="text-amber-500"
            currentStatus="PACKED"
            nextStatus="SHIPPED"
            nextLabel="Dispatch Shipment"
            items={orders.filter(o => o.status === 'PACKED')}
          />
          <Column 
            title="Shipped & In Transit" 
            icon={Truck} 
            colorClass="text-emerald-500"
            currentStatus="SHIPPED"
            nextStatus="DELIVERED"
            nextLabel="Confirm Delivery"
            items={orders.filter(o => o.status === 'SHIPPED')}
          />
        </div>
      )}
    </div>
  );
}






