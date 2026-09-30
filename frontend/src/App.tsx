import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProductCatalog from './pages/ProductCatalog';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import SupplierPortal from './pages/SupplierPortal';
import Fulfillment from './pages/Fulfillment';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import Users from './pages/Users';
import CustomerPortal from './pages/CustomerPortal';
import PurchaseOrders from './pages/PurchaseOrders';
import { AuthProvider, useAuth } from './store/AuthContext';

import SupplierDashboard from './pages/supplier/SupplierDashboard';
import SupplierPurchaseOrders from './pages/supplier/SupplierPurchaseOrders';
import SupplierPODetails from './pages/supplier/SupplierPODetails';

// Protect routes that require login
const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

// Protect routes by specific roles
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 w-full">
    {children}
  </div>
);

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  const hasRole = user.roles.some((role: string) => allowedRoles.includes(role));
  if (!hasRole) {
    if (user.roles.includes('ROLE_CUSTOMER')) return <Navigate to="/customers/portal" replace />;
    if (user.roles.includes('ROLE_SUPPLIER')) return <Navigate to="/supplier/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          {/* Admin Only Routes */}
          <Route element={<RoleRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
                        <Route path="inventory" element={<PageWrapper><Inventory /></PageWrapper>} />
            <Route path="orders" element={<PageWrapper><Orders /></PageWrapper>} />
            <Route path="suppliers" element={<PageWrapper><Suppliers /></PageWrapper>} />
            <Route path="procurement" element={<PageWrapper><PurchaseOrders /></PageWrapper>} />
            <Route path="users" element={<PageWrapper><Users /></PageWrapper>} />
            <Route path="fulfillment" element={<PageWrapper><Fulfillment /></PageWrapper>} />
            <Route path="reports" element={<PageWrapper><Reports /></PageWrapper>} />
          </Route>

          {/* Supplier Only Routes */}
          <Route element={<RoleRoute allowedRoles={['ROLE_SUPPLIER']} />}>
            <Route path="supplier/dashboard" element={<PageWrapper><SupplierDashboard /></PageWrapper>} />
            <Route path="supplier/purchase-orders" element={<PageWrapper><SupplierPurchaseOrders /></PageWrapper>} />
            <Route path="supplier/purchase-orders/:id" element={<PageWrapper><SupplierPODetails /></PageWrapper>} />
          </Route>

          <Route path="customers/portal" element={<CustomerPortal />} />

          <Route path="products" element={<PageWrapper><ProductCatalog /></PageWrapper>} />
          <Route path="profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="*" element={<div className="p-8 text-center text-gray-500">Module Under Construction</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;





