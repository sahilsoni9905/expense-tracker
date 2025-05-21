import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ShopSelection from './pages/ShopSelection';
import ShopDashboard from './pages/ShopDashboard';
import CustomerDetails from './pages/CustomerDetails';
import AddCustomer from './pages/AddCustomer';
import AddTransaction from './pages/AddTransaction';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<ShopSelection />} />
          <Route path="/shop/:shopId" element={<ShopDashboard />} />
          <Route path="/shop/:shopId/customer/:customerId" element={<CustomerDetails />} />
          <Route path="/shop/:shopId/add-customer" element={<AddCustomer />} />
          <Route path="/shop/:shopId/customer/:customerId/add-transaction" element={<AddTransaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;