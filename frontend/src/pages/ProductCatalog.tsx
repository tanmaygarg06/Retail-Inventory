import React, { useState, useEffect } from 'react';
import { Plus, Tag, Search, Filter, MoreVertical, Edit, Trash2, Package } from 'lucide-react';
import axios from 'axios';

export default function ProductCatalog() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', sku: '', price: '', category: '' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8080/api/products');
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', {
        name: formData.name,
        description: formData.description,
        sku: formData.sku,
        sellingPrice: parseFloat(formData.price),
        costPrice: parseFloat(formData.price) * 0.8, // Dummy cost price
        status: 'ACTIVE',
        reorderLevel: 10,
        // Omit category for now if Category #1 doesn't exist to avoid FK constraint, or send null if DB allows.
        // Actually, if category_id is nullable, we can omit it. Let's send it empty.
      });
      setShowModal(false);
      setFormData({ name: '', description: '', sku: '', price: '', category: '' });
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyDiscount = async (product: any) => {
    const pctStr = prompt(`Enter discount percentage for ` + product.name + ` (e.g., 20):`);
    if (!pctStr) return;
    const pct = parseFloat(pctStr);
    if (isNaN(pct) || pct <= 0 || pct >= 100) return alert('Invalid percentage');
    
    try {
      const newPrice = product.sellingPrice * (1 - (pct / 100));
      await axios.put(`http://localhost:8080/api/products/` + product.id, {
         ...product,
         sellingPrice: newPrice
      });
      
      const usersRes = await axios.get('http://localhost:8080/api/users');
      let custCount = 0;
      if (usersRes.data.success) {
         const customers = usersRes.data.data.filter((u: any) => u.roles && u.roles.some((r:any) => r.name === 'ROLE_CUSTOMER'));
         custCount = customers.length;
         for (const c of customers) {
            await axios.post('http://localhost:8080/api/notifications', {
               userId: c.id,
               message: `dY" FLASH SALE: ` + product.name + ` now has a ` + pct + `% discount! Grab it before stock runs out!`,
               isRead: false
            });
         }
      }
      alert(`Discount applied and notifications sent to ` + custCount + ` customers!`);
      fetchProducts();
    } catch (e) {
      console.error(e);
      alert('Failed to apply discount');
    }
  };

  const handleDelete = async (id: number) => {
    if(confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Product Catalog</h1>
          <p className="text-slate-500 mt-1">Manage your products and categories with real-time database sync.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search products by name or SKU..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors" />
          </div>
          <button className="flex items-center px-4 py-2 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors bg-white">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading products from database...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-slate-500 flex flex-col items-center">
              <Package className="w-12 h-12 text-slate-300 mb-3" />
              <p>No products found in the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                  {/* Image Container */}
                  <div className="relative h-48 bg-white flex items-center justify-center overflow-hidden border-b border-slate-100 p-4">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Package className="w-16 h-16 text-slate-300" />
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider text-slate-600 uppercase shadow-sm">
                      {p.sku || `SKU-${p.id}`}
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight mb-1">{p.name}</h3>
                    <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-4">{p.description || 'No description'}</p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</p>
                        <p className="text-lg font-black text-black">₹{p.sellingPrice ? p.sellingPrice.toFixed(2) : '0.00'}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-slate-400 hover:text-black hover:bg-slate-100 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleApplyDiscount(p)} title="Apply Discount" className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Tag className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">SKU (Stock Keeping Unit)</label>
                <input type="text" required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"></textarea>
              </div>
              <div className="pt-2 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}




