import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, Phone, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { getCustomerById, getTransactions } from '../api';
import TransactionItem from '../components/TransactionItem';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  balance: number;
  createdAt: string;
}

interface Transaction {
  _id: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  description: string;
  date: string;
  createdAt: string;
}

const CustomerDetails: React.FC = () => {
  const { shopId, customerId } = useParams();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (shopId && customerId) {
      fetchCustomerDetails();
      fetchTransactions();
    }
  }, [shopId, customerId]);
  
  const fetchCustomerDetails = async () => {
    if (!shopId || !customerId) return;
    
    try {
      const response = await getCustomerById(shopId, customerId);
      setCustomer(response.data);
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
      toast.error('Failed to load customer details');
    }
  };
  
  const fetchTransactions = async () => {
    if (!shopId || !customerId) return;
    
    try {
      setLoading(true);
      const response = await getTransactions(shopId, customerId);
      setTransactions(response.data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };
  
  const addTransaction = () => {
    navigate(`/shop/${shopId}/customer/${customerId}/add-transaction`);
  };
  
  if (!customer) {
    return (
      <Layout title="Customer Details">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }
  
  const formattedDate = new Date(customer.createdAt).toLocaleDateString();
  const isPositiveBalance = customer.balance > 0;
  
  return (
    <Layout title={customer.name}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="card p-5">
            <h2 className="text-xl font-semibold mb-4">Customer Info</h2>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Phone size={20} className="text-gray-500 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={20} className="text-gray-500 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Customer Since</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                {isPositiveBalance ? (
                  <ArrowUpRight size={20} className="text-red-500 mr-3 mt-1" />
                ) : (
                  <ArrowDownRight size={20} className="text-green-500 mr-3 mt-1" />
                )}
                <div>
                  <p className="text-sm text-gray-500">Balance</p>
                  <p className={`font-bold text-lg ${isPositiveBalance ? 'text-red-600' : 'text-green-600'}`}>
                    {isPositiveBalance 
                      ? `₹${customer.balance.toFixed(2)} due` 
                      : `₹${Math.abs(customer.balance).toFixed(2)} credit`
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button 
                onClick={addTransaction}
                className="btn btn-primary w-full"
              >
                <PlusCircle size={18} className="mr-2" />
                Add Transaction
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="card p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Transaction History</h2>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map(transaction => (
                  <TransactionItem key={transaction._id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">No transactions found</p>
                <button 
                  onClick={addTransaction} 
                  className="btn btn-primary"
                >
                  Add First Transaction
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetails;