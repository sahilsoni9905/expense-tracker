import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ShopSelection from "./pages/ShopSelection";
import ShopDashboard from "./pages/ShopDashboard";
import CustomerDetails from "./pages/CustomerDetails";
import AddCustomer from "./pages/AddCustomer";
import AddTransaction from "./pages/AddTransaction";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ShopSelection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/:shopId"
            element={
              <ProtectedRoute>
                <ShopDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/:shopId/customer/:customerId"
            element={
              <ProtectedRoute>
                <CustomerDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/:shopId/add-customer"
            element={
              <ProtectedRoute>
                <AddCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shop/:shopId/customer/:customerId/add-transaction"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
