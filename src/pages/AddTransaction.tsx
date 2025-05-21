import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import { getCustomerById, createTransaction } from "../api";

interface Customer {
  _id: string;
  name: string;
  phone: string;
  balance: number;
}

const AddTransaction: React.FC = () => {
  const { shopId, customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    type: "DEBIT", // Default to DEBIT (customer takes money)
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0], // Default to today
  });

  const [errors, setErrors] = useState({
    amount: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shopId && customerId) {
      fetchCustomerDetails();
    }
  }, [shopId, customerId]);

  const fetchCustomerDetails = async () => {
    if (!shopId || !customerId) return;

    try {
      const response = await getCustomerById(shopId, customerId);
      setCustomer(response.data);
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
      toast.error("Failed to load customer details");
      navigate(-1);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { amount: "", description: "", date: "" };

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid positive amount";
      valid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (!shopId || !customerId) {
        toast.error("Missing shop or customer information");
        return;
      }

      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      await createTransaction(shopId, customerId, transactionData);
      toast.success("Transaction added successfully");
      navigate(`/shop/${shopId}/customer/${customerId}`);
    } catch (error) {
      console.error("Failed to add transaction:", error);
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!customer) {
    return (
      <Layout title="Add Transaction">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Add Transaction for ${customer.name}`}>
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center p-3 rounded-lg border ${
                  formData.type === "DEBIT"
                    ? "bg-red-50 border-red-500 text-red-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } cursor-pointer transition-colors`}
              >
                <input
                  type="radio"
                  name="type"
                  value="DEBIT"
                  checked={formData.type === "DEBIT"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <ArrowUpRight size={18} className="mr-2" />
                Customer Takes Money
              </label>

              <label
                className={`flex items-center justify-center p-3 rounded-lg border ${
                  formData.type === "CREDIT"
                    ? "bg-green-50 border-green-500 text-green-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                } cursor-pointer transition-colors`}
              >
                <input
                  type="radio"
                  name="type"
                  value="CREDIT"
                  checked={formData.type === "CREDIT"}
                  onChange={handleChange}
                  className="sr-only"
                />
                <ArrowDownRight size={18} className="mr-2" />
                Customer Gives Money
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="label flex items-center">
              <DollarSign size={16} className="mr-2" />
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              className={`input ${errors.amount ? "border-red-500" : ""}`}
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="label flex items-center">
              <FileText size={16} className="mr-2" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`input ${errors.description ? "border-red-500" : ""}`}
              placeholder="What's this transaction for?"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="date" className="label flex items-center">
              <Calendar size={16} className="mr-2" />
              Transaction Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className={`input ${errors.date ? "border-red-500" : ""}`}
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                  Saving...
                </span>
              ) : (
                "Add Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddTransaction;
