import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Truck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../store/AuthContext';

export default function SupplierPODetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // Backend Agent will build this API or we fetch all and filter for now
      // Actually we will use the same fetch since /api/supplier/purchaseorders returns all
      const res = await axios.get(`http://localhost:8080/api/supplier/purchaseorders?userId=${user?.id}`);
      const data = res.data.data || res.data;
      const found = data.find((o: any) => o.id.toString() === id);
      if (found) {
        setOrder(found);
        setItems(found.items || []);
      }
    } catch (err) {
      console.error('Failed to fetch details', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status: string) => {
    try {
      await axios.post(`http://localhost:8080/api/supplier/purchaseorders/${id}/status`, { status });
      setOrder({ ...order, status });
      alert(`Order status updated to ${status}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const updateShippedQuantity = async (itemId: number, shippedQuantity: number) => {
    try {
      await axios.put(`http://localhost:8080/api/supplier/purchaseorders/${id}/items`, [{ 
        itemId, 
        shippedQuantity } ] );
      alert('Shipped quantity updated successfully!');
      // Update local state to reflect change immediately
      setItems(items.map(item => item.id === itemId ? { ...item, shippedQuantity } : item));
    } catch (err) {
      console.error(err);
      alert('Failed to update shipped quantity');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading details...</div>;
  if (!order) return <div className="p-8 text-center text-rose-500">Purchase Order not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">PO-{order.id} Details</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div className="ml-auto flex space-x-3">
          {order.status === 'PENDING' && (
            <>
              <button onClick={() => updateStatus('ACCEPTED')} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center shadow-sm">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Accept
              </button>
              <button onClick={() => updateStatus('REJECTED')} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center shadow-sm">
                <XCircle className="w-4 h-4 mr-2" /> Reject
              </button>
            </>
          )}
          {(order.status === 'ACCEPTED' || order.status === 'SHIPPED') && (
            <button onClick={() => updateStatus('SHIPPED')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-widest flex items-center shadow-sm">
              <Truck className="w-4 h-4 mr-2" /> Mark as Shipped
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-900">Order Summary</h2>
          <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-slate-200 text-slate-800`}>
            Status: {order.status}
          </span>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 font-medium mb-4">Total Amount: <span className="font-black text-slate-900 text-lg">Rs. {order.totalAmount?.toLocaleString()}</span></p>
          
          <h3 className="font-bold text-slate-900 mb-4 mt-8 border-b pb-2">Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-widest font-bold text-slate-500">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Req. Qty</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Shipped Qty</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.product?.name || 'Unknown Product'}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">Rs. {item.unitPrice?.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold">Rs. {item.totalPrice?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <input 
                        type="number" 
                        defaultValue={item.shippedQuantity || 0}
                        id={`shipped-qty-${item.id}`}
                        className="w-20 px-2 py-1 border border-slate-200 rounded text-sm outline-none focus:border-indigo-400"
                        min="0"
                        max={item.quantity}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => {
                          const val = (document.getElementById(`shipped-qty-${item.id}`) as HTMLInputElement).value;
                          updateShippedQuantity(item.id, parseInt(val, 10));
                        }}
                        className="text-[10px] bg-slate-900 text-white px-3 py-1.5 rounded font-bold uppercase tracking-widest hover:bg-black transition-colors"
                      >
                        Update Qty
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-slate-500">No items found for this order.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

