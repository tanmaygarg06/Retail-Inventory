import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  FileText,
  Bell,
  Package,
  LayoutDashboard,
  Users,
  Shield,
  Store,
  Warehouse,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import axios from "axios";

export default function Layout() {
  const { user, logout, cart, clearCart, addToCart, reduceQuantity } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.roles.includes("ROLE_ADMIN");
  const isSupplier = user?.roles.includes("ROLE_SUPPLIER");
  const isCustomer =
    user?.roles.includes("ROLE_CUSTOMER") || (!isAdmin && !isSupplier);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toast, setToast] = useState<{ message: string; show: boolean } | null>(
    null,
  );

  const playTingSound = () => {
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  };

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState("All");
  const [showCheckout, setShowCheckout] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const fetchNotifications = async (isBackground = false) => {
    try {
      if (!user) return;
      const res = await axios.get(
        "http://localhost:8080/api/notifications/user/" + user.id,
      );
      const sorted = res.data.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setNotifications(sorted);
      const newUnread = sorted.filter((n: any) => !n.isRead).length;
      if (isBackground && newUnread > unreadCount) {
        playTingSound();
        const latest = sorted.find((n: any) => !n.isRead);
        if (latest) {
          setToast({ message: latest.message, show: true });
          setTimeout(() => setToast(null), 6000);
        }
      }
      setUnreadCount(newUnread);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 10000);
    return () => clearInterval(interval);
  }, [user, unreadCount]);

  const markRead = async (n: any) => {
    try {
      if (!n.isRead) {
        await axios.put(
          "http://localhost:8080/api/notifications/" + n.id + "/read",
        );
        fetchNotifications();
      }
      if (n.actionUrl) {
        navigate(n.actionUrl);
        setIsNotifOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const triggerCustomNotification = async (type: string) => {
    let msg = "System notification received.";
    if (type === "discount")
      msg =
        "🔥 Flash Sale Alert! You got a 20% discount on wholesale orders above 500 units!";
    if (type === "order")
      msg =
        "📦 Order #PO-9943 has been successfully placed and is pending fulfillment.";
    if (type === "system")
      msg = "⚡ System Update: Your profile has been successfully upgraded.";

    try {
      await axios.post("http://localhost:8080/api/notifications", {
        userId: user?.id,
        message: msg,
        isRead: false,
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    try {
      const totalAmount = cart.reduce(
        (sum: number, item: any) =>
          sum + item.product.sellingPrice * item.quantity,
        0,
      );
      const orderPayload = {
        orderDate: new Date().toISOString(),
        status: "PENDING_FULFILLMENT",
        totalAmount: totalAmount,
        createdBy: { id: user?.id },
        items: cart.map((item: any) => ({
          product: { id: item.product.id },
          quantity: item.quantity,
          unitPrice: item.product.sellingPrice,
          totalPrice: item.quantity * item.product.sellingPrice,
        })),
      };

      await axios.post("http://localhost:8080/api/orders", orderPayload);

      clearCart();
      setShowCheckout(false);
      alert(
        "Order placed successfully! Cash on Delivery (COD) selected. Your order will be delivered to " +
          shippingDetails.address,
      );
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans text-slate-900 flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-[#111] text-white text-xs font-bold py-3 px-6 flex justify-between items-center tracking-widest">
        <span>FOR MODERN B2B WHOLESALE, CONTACT US!</span>
        <button
          onClick={() => setShowContactModal(true)}
          className="bg-white text-black hover:bg-slate-200 px-4 py-1 text-[10px] uppercase font-bold tracking-wider rounded-sm transition-colors"
        >
          LET'S TALK &rarr;
        </button>
      </div>

      {/* Navbar */}
      <header className="h-[84px] bg-white flex items-center justify-between px-10 sticky top-0 z-50 border-b border-slate-100">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center rounded-sm">
            <span className="font-black text-xl">N</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-widest text-slate-900">
              SHOPLUXE
            </h1>
            <p className="text-[8px] text-slate-500 font-bold tracking-[0.2em] uppercase">
              Everything You Need
            </p>
          </div>
        </div>

        {/* Center Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-slate-600 tracking-wider">
          {isAdmin && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Dashboard
              </Link>
              <Link
                to="/products"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Catalog
              </Link>
              
              <Link
                to="/inventory"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Inventory
              </Link>
              <Link
                to="/orders"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Sales
              </Link>
              <Link
                to="/fulfillment"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Fulfillment
              </Link>
              <Link
                to="/suppliers"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Suppliers
              </Link>
              <Link
                to="/procurement"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Procurement
              </Link>
              <Link
                to="/reports"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Reports
              </Link>
              <Link
                to="/users"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Admin
              </Link>
            </>
          )}
          {isCustomer && (
            <>
              <Link
                to="/customers/portal?tab=shop"
                className="text-slate-900 border-b-2 border-slate-900 pb-1 uppercase"
              >
                Home
              </Link>
              <div className="relative group cursor-pointer h-full flex items-center">
                <span className="hover:text-slate-900 transition-colors uppercase flex items-center">
                  Shop <span className="ml-1 text-[8px]">&#9660;</span>
                </span>
                <div className="absolute top-14 -left-4 w-48 bg-white shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-md">
                  <Link
                    to="/customers/portal?tab=shop&category=electronics"
                    className="block px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 uppercase"
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/customers/portal?tab=shop&category=accessories"
                    className="block px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 uppercase border-t border-slate-50"
                  >
                    Accessories
                  </Link>
                  <Link
                    to="/customers/portal?tab=shop&category=home"
                    className="block px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 uppercase border-t border-slate-50"
                  >
                    Home & Living
                  </Link>
                </div>
              </div>
              <div className="relative group cursor-pointer h-full flex items-center">
                <span className="hover:text-slate-900 transition-colors uppercase flex items-center">
                  Collections <span className="ml-1 text-[8px]">&#9660;</span>
                </span>
                <div className="absolute top-14 -left-4 w-48 bg-white shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-md">
                  <Link
                    to="/customers/portal?tab=shop&collection=new"
                    className="block px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 uppercase"
                  >
                    New Arrivals
                  </Link>
                  <Link
                    to="/customers/portal?tab=shop&collection=trending"
                    className="block px-4 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 uppercase border-t border-slate-50"
                  >
                    Trending Now
                  </Link>
                  <Link
                    to="/customers/portal?tab=shop&collection=sale"
                    className="block px-4 py-3 text-xs font-bold text-rose-500 hover:bg-slate-50 uppercase border-t border-slate-50"
                  >
                    Clearance Sale
                  </Link>
                </div>
              </div>
              <Link
                to="/customers/portal?tab=orders"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                My Orders
              </Link>
            </>
          )}
          {isSupplier && (
            <>
              <Link
                to="/supplier/dashboard"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Dashboard
              </Link>
              <Link
                to="/supplier/purchase-orders"
                className="hover:text-slate-900 transition-colors uppercase"
              >
                Purchase Orders
              </Link>
              
            </>
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {/* GLOBAL NOTIFICATION BELL */}
          <div className="relative group cursor-pointer">
            <Bell
              className="w-5 h-5 text-slate-700 hover:text-indigo-600 transition-colors"
              onClick={() => {
                if (!isNotifOpen) fetchNotifications();
                setIsNotifOpen(!isNotifOpen);
              }}
            />
            {notifications.filter((n) => !n.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden cursor-default">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-sm text-slate-800 uppercase tracking-widest">
                      Notification Center
                    </span>
                    {notifications.filter((n) => !n.isRead).length > 0 && (
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {notifications.filter((n) => !n.isRead).length} New
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => triggerCustomNotification("discount")}
                      className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded hover:bg-amber-100 uppercase tracking-wider"
                    >
                      Discount Alert
                    </button>
                    <button
                      onClick={() => triggerCustomNotification("order")}
                      className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded hover:bg-emerald-100 uppercase tracking-wider"
                    >
                      Order Placed
                    </button>
                  </div>
                </div>
                <div className="flex space-x-4 px-4 py-2 border-b border-slate-100 bg-slate-50">
                  <button
                    onClick={() => setNotifTab("All")}
                    className={`text-[10px] font-bold uppercase tracking-wider ${notifTab === "All" ? "text-indigo-600" : "text-slate-500"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setNotifTab("Unread")}
                    className={`text-[10px] font-bold uppercase tracking-wider ${notifTab === "Unread" ? "text-indigo-600" : "text-slate-500"}`}
                  >
                    Unread
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.filter(
                    (n: any) => notifTab === "All" || !n.isRead,
                  ).length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center">
                      <Bell className="w-8 h-8 text-slate-200 mb-2" />
                      <span className="text-sm font-bold text-slate-400">
                        You are all caught up!
                      </span>
                      <span className="text-xs text-slate-400">
                        No {notifTab === "Unread" ? "unread" : "new"}{" "}
                        notifications.
                      </span>
                    </div>
                  ) : (
                    notifications
                      .filter((n: any) => notifTab === "All" || !n.isRead)
                      .map((n: any) => (
                        <div
                          key={n.id}
                          onClick={() => markRead(n)}
                          className={
                            "p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex space-x-3 items-start " +
                            (!n.isRead ? "bg-indigo-50/30" : "")
                          }
                        >
                          <div
                            className={
                              "w-2 h-2 mt-1.5 rounded-full flex-shrink-0 " +
                              (!n.isRead ? "bg-indigo-600" : "bg-transparent")
                            }
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                                {n.title || "Notification"}
                              </span>
                              {n.priority === "HIGH" && (
                                <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[8px] font-bold">
                                  HIGH
                                </span>
                              )}
                            </div>
                            <p
                              className={
                                "text-sm leading-tight mt-1 " +
                                (!n.isRead
                                  ? "font-bold text-slate-900"
                                  : "font-medium text-slate-600")
                              }
                            >
                              {n.message}
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">
                              {new Date(n.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
          <Search className="w-5 h-5 text-slate-700 cursor-pointer hover:text-black" />
          <div className="relative group cursor-pointer">
            <User className="w-5 h-5 text-slate-700 hover:text-black" />
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-3 border-b border-slate-100 text-xs font-bold text-slate-900">
                Welcome, {user?.username}
              </div>
              <Link
                to="/profile"
                className="block w-full text-left p-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 border-b border-slate-100"
              >
                My Profile
              </Link>
              <button
                onClick={logout}
                className="w-full text-left p-3 text-xs font-semibold text-rose-500 hover:bg-slate-50"
              >
                Secure Sign Out
              </button>
            </div>
          </div>

          {/* Cart Dropdown */}
          {isCustomer && (
            <div className="relative group flex items-center">
              <button className="text-slate-700 hover:text-black transition-colors relative flex items-center">
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-slate-900 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                    {cart.reduce(
                      (sum: number, item: any) => sum + item.quantity,
                      0,
                    )}
                  </span>
                )}
              </button>
              <span className="ml-3 text-xs font-bold text-slate-900 tracking-wider">
                Rs.{" "}
                {cart
                  .reduce(
                    (s: number, i: any) =>
                      s + i.product.sellingPrice * i.quantity,
                    0,
                  )
                  .toLocaleString()}
              </span>

              <div className="absolute right-0 top-6 mt-2 w-80 bg-white shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-md">
                <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm">
                  Shopping Cart
                </div>
                <div className="max-h-64 overflow-y-auto p-2">
                  {cart.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500">
                      Your cart is empty.
                    </div>
                  ) : (
                    cart.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex p-2 hover:bg-slate-50 rounded-md"
                      >
                        <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center mr-3 flex-shrink-0">
                          {item.product.imageUrl ? (
                            <img
                              src={item.product.imageUrl}
                              alt=""
                              className="max-h-10 mix-blend-multiply"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-medium">
                            Rs. {item.product.sellingPrice}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <button
                              onClick={() => reduceQuantity(item.product.id)}
                              className="w-4 h-4 bg-slate-200 rounded flex items-center justify-center text-[10px] hover:bg-slate-300"
                            >
                              -
                            </button>
                            <span className="text-[10px] font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item.product)}
                              className="w-4 h-4 bg-slate-200 rounded flex items-center justify-center text-[10px] hover:bg-slate-300"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-md">
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest py-3 rounded hover:bg-black transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <Menu className="w-5 h-5 text-slate-700 cursor-pointer lg:hidden" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded-sm">
                <span className="font-black text-lg">N</span>
              </div>
              <h2 className="text-lg font-black tracking-widest text-slate-900">
                SHOPLUXE
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              The premier B2B and retail shopping destination for modern
              enterprises.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li className="hover:text-slate-900 cursor-pointer">About Us</li>
              <li className="hover:text-slate-900 cursor-pointer">Careers</li>
              <li className="hover:text-slate-900 cursor-pointer">
                Store Locator
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2 text-xs font-bold text-slate-500">
              <li className="hover:text-slate-900 cursor-pointer">
                Track Order
              </li>
              <li className="hover:text-slate-900 cursor-pointer">
                Returns & Exchanges
              </li>
              <li className="hover:text-slate-900 cursor-pointer">
                Contact Support
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4">
              Newsletter
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="bg-slate-50 border border-slate-200 px-3 py-2 text-xs outline-none w-full focus:border-slate-400 font-bold"
              />
              <button className="bg-slate-900 text-white px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-black">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            &copy; 2026 Nexus Corp. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase cursor-pointer hover:text-slate-900">
              Terms
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase cursor-pointer hover:text-slate-900">
              Privacy
            </span>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-[100] backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">??</span>
              </div>
              <h2 className="font-black text-2xl text-slate-900 tracking-tight mb-2">
                Let's Talk B2B
              </h2>
              <p className="text-sm text-slate-500 font-medium mb-6">
                Ready to scale your enterprise? Connect with our wholesale
                experts today.
              </p>

              <a
                href="mailto:tanmaylkgarg@gamil.com"
                className="w-full bg-black text-white shadow-md font-bold tracking-widest uppercase text-xs py-3.5 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm mb-3"
              >
                Email Us Now
              </a>
              <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                tanmaylkgarg@gamil.com
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && toast.show && (
        <div className="fixed bottom-6 right-6 z-[200] animate-in slide-in-from-right fade-in duration-300">
          <div className="bg-white border-l-4 border-indigo-600 shadow-2xl rounded shadow-indigo-900/10 w-80 overflow-hidden">
            <div className="p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Bell className="w-5 h-5 text-indigo-600 animate-bounce" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {toast.message}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                  Just now
                </p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="flex-shrink-0 text-slate-400 hover:text-slate-900"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-black text-lg text-slate-900 tracking-tight">
                Checkout
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-slate-400 hover:text-slate-900 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={confirmOrder} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.name}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Shipping Address
                  </label>
                  <textarea
                    required
                    value={shippingDetails.address}
                    onChange={(e) =>
                      setShippingDetails({
                        ...shippingDetails,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:border-slate-400"
                    rows={2}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:border-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.zip}
                      onChange={(e) =>
                        setShippingDetails({
                          ...shippingDetails,
                          zip: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded text-sm outline-none focus:border-slate-400"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center text-blue-800 font-bold text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Cash on Delivery (COD)
                  </div>
                  <p className="text-xs text-blue-600/80">
                    Pay safely in cash when your order arrives at your doorstep.
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-slate-500 font-medium">Total: </span>
                    <span className="font-black text-slate-900">
                      Rs.{" "}
                      {cart
                        .reduce(
                          (s: number, i: any) =>
                            s + i.product.sellingPrice * i.quantity,
                          0,
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


