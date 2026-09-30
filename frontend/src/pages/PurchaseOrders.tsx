import React, { useState, useEffect } from "react";
import {
  ArrowDownToLine,
  Plus,
  Search,
  Building2,
  Package,
  XCircle,
} from "lucide-react";
import axios from "axios";

export default function PurchaseOrders() {
  const [pos, setPos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    totalAmount: "",
    status: "PENDING_RECEIPT",
    supplierId: "",
    productId: "",
    quantity: "",
  });

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const fetchPos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/purchaseorders");
      if (res.data.success) {
        setPos(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliersAndProducts = async () => {
    try {
      const [supRes, prodRes] = await Promise.all([
        axios.get("http://localhost:8080/api/suppliers"),
        axios.get("http://localhost:8080/api/products"),
      ]);
      if (supRes.data.success) setSuppliers(supRes.data.data);
      if (prodRes.data.success) setProducts(prodRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPos();
    fetchSuppliersAndProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const items = [];
      if (formData.productId && formData.quantity) {
        items.push({
          product: { id: parseInt(formData.productId) },
          quantity: parseInt(formData.quantity),
          unitPrice: 0, // Simplification for now, or totalAmount / quantity
        });
      }

      await axios.post("http://localhost:8080/api/purchaseorders", {
        orderDate: new Date().toISOString(),
        status: formData.status,
        totalAmount: parseFloat(formData.totalAmount),
        supplier: formData.supplierId
          ? { id: parseInt(formData.supplierId) }
          : null,
        items: items,
      });
      setShowModal(false);
      setFormData({
        totalAmount: "",
        status: "PENDING_RECEIPT",
        supplierId: "",
        productId: "",
        quantity: "",
      });
      fetchPos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 relative">
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">
                Add New Purchase Order
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Supplier
                </label>
                <select
                  required
                  value={formData.supplierId}
                  onChange={(e) =>
                    setFormData({ ...formData, supplierId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select a supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.supplierName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product
                  </label>
                  <select
                    required
                    value={formData.productId}
                    onChange={(e) =>
                      setFormData({ ...formData, productId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select a product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                    placeholder="Qty"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Total Amount (Rs.)
                </label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={formData.totalAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, totalAmount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                  placeholder="e.g. 15000.00"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Status
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="PENDING_RECEIPT">Pending Receipt</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="RECEIVED">Received</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-bold bg-black text-white hover:bg-slate-800 rounded shadow-sm"
                >
                  Save PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Procurement</h1>
          <p className="text-slate-500 mt-1">
            Manage purchase orders and supplier deliveries.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create PO
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search POs..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4 text-left">PO Number</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Loading purchase orders...
                  </td>
                </tr>
              ) : pos.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    No purchase orders found.
                  </td>
                </tr>
              ) : (
                pos.map((po) => (
                  <tr
                    key={po.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-slate-900">
                        #PO-{po.id.toString().padStart(4, "0")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(po.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-700">
                          {po.supplier?.supplierName || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-[10px] leading-5 font-bold rounded-full ${po.status === "RECEIVED" ? "bg-emerald-100 text-emerald-700" : po.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}
                      >
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-bold text-right">
                      Rs. {po.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
