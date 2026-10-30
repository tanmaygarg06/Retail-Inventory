import React, { useState, useEffect } from 'react';
import { ShoppingBag, Star, ShoppingCart, Truck, ShieldCheck, RefreshCw, Gift, Percent, ArrowRight, CheckCircle2, Package, MapPin, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';
import { useLocation } from 'react-router-dom';

export default function CustomerPortal() {
  const { user, addToCart, cart, reduceQuantity } = useAuth();
  const location = useLocation();
  const [products, setProducts] = useState<any[]>([]);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'shop';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = queryParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [location.search]);

  useEffect(() => { fetchData(); }, [activeTab, location.search]);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get('http://localhost:8080/api/products');
      setProducts(prodRes.data.data);
      if (user?.id) {
        const ordRes = await axios.get('http://localhost:8080/api/orders');
        setMyOrders(ordRes.data.data.filter((o: any) => o.createdBy?.id === user.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const activeCategory = queryParams.get('category');
  const activeCollection = queryParams.get('collection');

  const filteredProducts = products.filter(p => {
    if (activeCategory) return p.category?.name?.toLowerCase() === activeCategory.toLowerCase() || p.category?.name?.toLowerCase().includes(activeCategory.toLowerCase());
    
    
    if (activeCollection === 'sale') return p.sellingPrice < 20000;
    if (activeCollection === 'new') return p.sellingPrice > 80000;
    if (activeCollection === 'trending') return p.sellingPrice > 40000 && p.sellingPrice < 80000;
    return true;
  });

  if (activeTab === 'orders') {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Orders</h1>
        <p className="text-sm text-slate-500 font-medium mb-8">Review and track your recent purchases.</p>
        
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  <th className="p-5">Order ID</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={4} className="p-10 text-center text-sm font-semibold text-slate-400">Loading...</td></tr>
                ) : myOrders.length === 0 ? (
                  <tr><td colSpan={4} className="p-10 text-center text-sm font-semibold text-slate-400">You haven't placed any orders yet.</td></tr>
                ) : (
                  myOrders.map(o => (
                    <React.Fragment key={o.id}>
                      <tr onClick={() => setExpandedOrder(expandedOrder === o.id ? null : o.id)} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                        <td className="p-5 flex items-center space-x-2">
                          {expandedOrder === o.id ? <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-700" /> : <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />}
                          <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1">ORD-{o.id}</span>
                        </td>
                        <td className="p-5 text-xs font-bold text-slate-700">{new Date(o.orderDate).toLocaleDateString()}</td>
                        <td className="p-5 font-black text-slate-900 text-sm">Rs. {o.totalAmount?.toLocaleString()}</td>
                        <td className="p-5">
                          <span className={"inline-flex items-center px-2 py-1 text-[9px] font-black uppercase tracking-widest " + (
                            o.status === 'SHIPPED' ? 'bg-emerald-100 text-emerald-800' :
                            o.status === 'PACKED' ? 'bg-blue-100 text-blue-800' :
                            o.status === 'DELIVERED' ? 'bg-slate-900 text-white' :
                            o.status === 'CANCELLED' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          )}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                      {expandedOrder === o.id && (
                        <tr>
                          <td colSpan={4} className="p-0 border-b border-slate-200">
                            <div className="bg-slate-50/50 p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-inner">
                              {o.status === 'CANCELLED' ? (
                                <div className="flex-1 w-full text-center py-8 bg-rose-50/50 rounded-2xl border border-rose-100 border-dashed">
                                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 mb-3">
                                    <XCircle className="w-6 h-6" />
                                  </div>
                                  <h4 className="text-lg font-black text-rose-900 mb-1">Order Cancelled</h4>
                                  <p className="text-sm text-rose-600/80 font-medium max-w-md mx-auto">This order was cancelled by the administrator. Any reserved stock has been released.</p>
                                </div>
                              ) : (
                                <>
                              <div className="flex-1 w-full relative pl-2 pr-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Order Tracking Timeline</h4>
                                <div className="relative flex justify-between items-start w-full px-4 overflow-x-auto min-w-[400px]">
                                  {/* Progress Line */}
                                  <div className="absolute top-4 left-0 w-full h-1 -translate-y-1/2 bg-slate-200 rounded-full z-0"></div>
                                  
                                  {/* Progress Fill */}
                                  <div className={"absolute top-4 left-0 h-1 -translate-y-1/2 bg-emerald-500 rounded-full z-0 transition-all duration-1000 " + (
                                    o.status === 'PENDING_FULFILLMENT' ? 'w-[10%]' : 
                                    o.status === 'PACKED' ? 'w-[50%]' : 
                                    o.status === 'SHIPPED' ? 'w-[85%]' : 
                                    o.status === 'DELIVERED' ? 'w-[100%]' : 'w-0'
                                  )}></div>

                                  {/* Steps */}
                                  <div className="relative z-10 flex flex-col items-center w-24">
                                    <div className={"w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-sm transition-colors " + (
                                      true ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                                    )}><ShoppingBag className="w-4 h-4" /></div>
                                    <span className={"text-[10px] font-bold uppercase tracking-wider mt-2 " + (true ? 'text-slate-900' : 'text-slate-400')}>Confirmed</span>
                                  </div>

                                  <div className="relative z-10 flex flex-col items-center w-24">
                                    <div className={"w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-sm transition-colors " + (
                                      ['PACKED', 'SHIPPED', 'DELIVERED'].includes(o.status) ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                                    )}><Package className="w-4 h-4" /></div>
                                    <span className={"text-[10px] font-bold uppercase tracking-wider mt-2 " + (['PACKED', 'SHIPPED', 'DELIVERED'].includes(o.status) ? 'text-slate-900' : 'text-slate-400')}>Packed</span>
                                  </div>

                                  <div className="relative z-10 flex flex-col items-center w-24">
                                    <div className={"w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-sm transition-colors " + (
                                      ['SHIPPED', 'DELIVERED'].includes(o.status) ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                                    )}><Truck className="w-4 h-4" /></div>
                                    <span className={"text-[10px] font-bold uppercase tracking-wider mt-2 " + (['SHIPPED', 'DELIVERED'].includes(o.status) ? 'text-slate-900' : 'text-slate-400')}>Shipped</span>
                                  </div>

                                  <div className="relative z-10 flex flex-col items-center w-24">
                                    <div className={"w-8 h-8 rounded-full flex items-center justify-center mb-2 shadow-sm transition-colors " + (
                                      o.status === 'DELIVERED' ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-300'
                                    )}><MapPin className="w-4 h-4" /></div>
                                    <span className={"text-[10px] font-bold uppercase tracking-wider mt-2 " + (o.status === 'DELIVERED' ? 'text-slate-900' : 'text-slate-400')}>Delivered</span>
                                  </div>
                                </div>
                              </div>
                              <div className="md:w-64 bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs md:mt-0 mt-8">
                                <h5 className="font-black text-slate-900 uppercase tracking-widest mb-3">Delivery Details</h5>
                                <div className="space-y-2">
                                  <p className="flex justify-between"><span className="text-slate-500 font-bold">Courier:</span><span className="font-black text-slate-900">FedEx Express</span></p>
                                  <p className="flex justify-between"><span className="text-slate-500 font-bold">Tracking ID:</span><span className="font-mono text-blue-600 font-bold hover:underline cursor-pointer">FX-8492011</span></p>
                                  <p className="flex justify-between mt-2 pt-2 border-t border-slate-100"><span className="text-slate-500 font-bold">Est. Arrival:</span><span className="font-black text-emerald-600">3-4 Days</span></p>
                                </div>
                              </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f9f9f9]">
      {/* Hero Section */}
      <div className="bg-[#f2ece4] w-full pt-16 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center relative">
          
          <div className="md:w-1/2 z-10">
            <h3 className="text-[#a48a73] font-extrabold tracking-widest text-xs uppercase mb-4">Welcome to Shopluxe</h3>
            <h1 className="text-5xl md:text-6xl font-black text-[#111] leading-[1.1] tracking-tight">
              EVERYTHING.<br/>FOR EVERYONE.
            </h1>
            <h2 className="text-3xl md:text-4xl text-[#c1a084] font-serif italic mt-2 mb-6">
              Best Quality, Best Prices!
            </h2>
            <p className="text-slate-600 text-sm font-medium max-w-sm mb-8 leading-relaxed">
              Discover a wide range of top-quality products handpicked just for you.
            </p>
            
            <div className="flex items-center space-x-4 mb-12">
              <button className="bg-[#111] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors flex items-center">
                Shop Now <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="bg-transparent border border-[#111] text-[#111] px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-[#111] hover:text-white transition-colors">
                Explore Collections
              </button>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Truck className="w-6 h-6 text-[#111] mr-3 stroke-[1.5]" />
                <div>
                  <p className="text-xs font-black text-[#111] uppercase tracking-wider">Free Shipping</p>
                  <p className="text-[10px] text-slate-500 font-medium">On orders over Rs. 5000</p>
                </div>
              </div>
              <div className="flex items-center">
                <RefreshCw className="w-6 h-6 text-[#111] mr-3 stroke-[1.5]" />
                <div>
                  <p className="text-xs font-black text-[#111] uppercase tracking-wider">Easy Returns</p>
                  <p className="text-[10px] text-slate-500 font-medium">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="w-6 h-6 text-[#111] mr-3 stroke-[1.5]" />
                <div>
                  <p className="text-xs font-black text-[#111] uppercase tracking-wider">Secure Payment</p>
                  <p className="text-[10px] text-slate-500 font-medium">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
             {/* Huge Circle Badge */}
             <div className="absolute top-0 left-0 bg-[#111] text-white rounded-full w-28 h-28 flex flex-col items-center justify-center z-20 shadow-2xl">
               <span className="text-[10px] font-bold tracking-widest uppercase">Up To</span>
               <span className="text-3xl font-black leading-none my-1">50%</span>
               <span className="text-[10px] font-bold tracking-widest uppercase">Off</span>
             </div>
             {products.length > 0 && (
               <img src={products[0]?.imageUrl} alt="Hero" className="w-[80%] max-w-md object-contain z-10 drop-shadow-2xl mix-blend-multiply" />
             )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* Browse Categories */}
        <div className="text-center mb-10">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-20">
                    {[
            {name: 'Electronics', img: '/MacBook_Pro.jpg', link: 'electronics'},{name: 'Home & Decor', img: '/cat_home.jpg', link: 'home & decor'},{name: 'Fashion', img: '/cat_fashion.jpg', link: 'fashion'},{name: 'Beauty', img: '/cat_beauty.jpg', link: 'beauty'},{name: 'Sports', img: '/cat_sports.jpg', link: 'sports'},{name: 'Accessories', img: '/AirPods_Pro.jpg', link: 'accessories'}].map(cat => (
            <div key={cat.name} className="flex flex-col items-center cursor-pointer group" onClick={() => window.location.href = '/customers/portal?tab=shop' + (cat.link ? '&category=' + cat.link : '')}>
              <div className="w-full aspect-square bg-[#f8f8f8] rounded-xl flex items-center justify-center mb-3 group-hover:shadow-md transition-shadow overflow-hidden">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Trending Products */}
        <div className="flex justify-between items-end mb-8 mt-12">
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">
            {activeCategory ? activeCategory + " Products" : activeCollection ? activeCollection + " Collection" : "Trending Products"}
          </h2>
          <button onClick={() => window.location.href = '/customers/portal?tab=shop'} className="text-[11px] font-black text-slate-900 uppercase tracking-widest hover:underline flex items-center">
            View All Products <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {loading ? (
            <div className="col-span-full py-20 text-center text-slate-500 font-bold uppercase tracking-widest">Loading Catalog...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-500 font-bold uppercase tracking-widest">No products found in this category.</div>
          ) : (
            filteredProducts.map((p, i) => (
              <div key={p.id} className="group flex flex-col bg-white p-4">
                <div className="w-full aspect-square bg-[#f4f4f4] mb-4 relative flex items-center justify-center overflow-hidden p-6">
                  {/* Discount Badge */}
                  {i % 3 === 0 && (
                    <div className="absolute top-3 left-3 bg-[#111] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                      -{Math.floor(Math.random() * 20 + 10)}%
                    </div>
                  )}
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <h3 className="font-bold text-slate-900 text-[13px] truncate">{p.name}</h3>
                
                <div className="flex items-center mt-1.5 mb-2">
                  <div className="flex text-[#f5b800]">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  <span className="text-[10px] text-slate-500 ml-1.5 font-bold">({Math.floor(Math.random() * 300 + 50)})</span>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="font-black text-slate-900 text-sm">Rs. {p.sellingPrice?.toLocaleString()}</span>
                  <span className="text-[11px] text-slate-400 font-bold line-through">Rs. {(p.sellingPrice * 1.2).toLocaleString()}</span>
                </div>

                                {(() => {
                  const cartItem = cart.find(c => c.product.id === p.id);
                  const quantity = cartItem ? cartItem.quantity : 0;
                  return quantity === 0 ? (
                    <button onClick={() => addToCart(p)} className="w-full py-2.5 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center mt-auto">
                      <ShoppingCart className="w-3.5 h-3.5 mr-2" /> Add To Cart
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full border border-slate-900 rounded-sm overflow-hidden mt-auto">
                      <button onClick={() => reduceQuantity(p.id)} className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors font-bold text-lg">-</button>
                      <div className="flex-1 text-center font-black text-xs text-slate-900 bg-slate-100 h-10 flex items-center justify-center">{quantity} in Cart</div>
                      <button onClick={() => addToCart(p)} className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center hover:bg-black transition-colors font-bold text-lg">+</button>
                    </div>
                  );
                })()}
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Banner Strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-20">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-[#101928] text-white p-8 flex items-center justify-center space-x-4">
            <Truck className="w-10 h-10 stroke-[1]" />
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider mb-1">Free Shipping</h4>
              <p className="text-[11px] text-slate-400 mb-2">On orders over Rs. 5000</p>
              <a href="#" className="text-[10px] font-bold tracking-widest uppercase hover:underline flex items-center">Shop Now <ArrowRight className="w-3 h-3 ml-1"/></a>
            </div>
          </div>
          <div className="flex-1 bg-[#b4987e] text-white p-8 flex items-center justify-center space-x-4">
            <Percent className="w-10 h-10 stroke-[1]" />
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider mb-1">Special Offer</h4>
              <p className="text-[11px] text-white/80 mb-2">Save up to 50% off</p>
              <a href="#" className="text-[10px] font-bold tracking-widest uppercase hover:underline flex items-center">Grab the Deal <ArrowRight className="w-3 h-3 ml-1"/></a>
            </div>
          </div>
          <div className="flex-1 bg-[#f1f1f1] text-[#111] p-8 flex items-center justify-center space-x-4">
            <Gift className="w-10 h-10 stroke-[1]" />
            <div>
              <h4 className="font-black text-sm uppercase tracking-wider mb-1">Member Benefits</h4>
              <p className="text-[11px] text-slate-500 mb-2">Join now & get exclusive deals</p>
              <a href="#" className="text-[10px] font-bold tracking-widest uppercase hover:underline flex items-center">Join Free <ArrowRight className="w-3 h-3 ml-1"/></a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Subscribe */}
      <div className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
             <div className="flex items-center">
               <ShieldCheck className="w-10 h-10 text-slate-300 mr-4" />
               <div>
                 <h4 className="font-black text-xs uppercase tracking-wider text-slate-900">Trusted By Thousands</h4>
                 <p className="text-[11px] text-slate-500 font-medium">Quality products, happy customers.</p>
               </div>
             </div>
             <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
             <div className="hidden md:flex items-center">
               <div className="flex text-[#f5b800] mr-2">
                 <Star className="w-4 h-4 fill-current" />
                 <Star className="w-4 h-4 fill-current" />
                 <Star className="w-4 h-4 fill-current" />
                 <Star className="w-4 h-4 fill-current" />
                 <Star className="w-4 h-4 fill-current" />
               </div>
               <div>
                 <p className="text-xs font-black text-slate-900">4.8/5</p>
                 <p className="text-[10px] text-slate-500 font-medium">Based on 2,500+ Reviews</p>
               </div>
             </div>
          </div>
          
          <div className="w-full md:w-auto">
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-900 mb-1">Subscribe To Our Newsletter</h4>
            <p className="text-[11px] text-slate-500 font-medium mb-3">Get the latest updates on new products and sales.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="px-4 py-2 bg-[#f4f4f4] border-none text-xs focus:ring-0 w-64 focus:outline-none" />
              <button className="bg-[#111] text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-black transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}



















