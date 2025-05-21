import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchIcon, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { getCustomers, searchCustomers } from '../api';
import CustomerCard from '../components/CustomerCard';
import SearchBar from '../components/SearchBar';

interface Customer {
  _id: string;
  name: string;
  phone: string;
  balance: number;
  createdAt: string;
}

const ShopDashboard: React.FC = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDue: 0,
    totalCredit: 0
  });
  
  useEffect(() => {
    fetchCustomers();
  }, [shopId]);
  
  const fetchCustomers = async () => {
    if (!shopId) return;
    
    try {
      setLoading(true);
      const response = await getCustomers(shopId);
      setCustomers(response.data);
      
      // Calculate stats
      const totalDue = response.data
        .filter((c: Customer) => c.balance > 0)
        .reduce((sum: number, c: Customer) => sum + c.balance, 0);
      
      const totalCredit = response.data
        .filter((c: Customer) => c.balance < 0)
        .reduce((sum: number, c: Customer) => sum + Math.abs(c.balance), 0);
      
      setStats({
        totalCustomers: response.data.length,
        totalDue,
        totalCredit
      });
      
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!shopId) return;
    
    if (!query.trim()) {
      fetchCustomers();
      return;
    }
    
    try {
      setLoading(true);
      const response = await searchCustomers(shopId, query);
      setCustomers(response.data);
    } catch (error) {
      console.error('Search failed:', error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };
  
  const addNewCustomer = () => {
    navigate(`/shop/${shopId}/add-customer`);
  };
  
  const shopName = shopId === 'shop1' ? 'Shop One' : 'Shop Two';
  
  return (
    <Layout title={shopName} showBackButton={true} showHomeButton={false}>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <SearchIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Due</p>
                <p className="text-2xl font-bold">₹{stats.totalDue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                <TrendingDown size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Credit</p>
                <p className="text-2xl font-bold">₹{stats.totalCredit.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Customers</h2>
          <button 
            onClick={addNewCustomer}
            className="btn btn-primary flex items-center"
          >
            <UserPlus size={18} className="mr-2" />
            Add Customer
          </button>
        </div>
        
        <SearchBar 
          value={searchQuery} 
          onChange={handleSearch} 
          placeholder="Search by name or phone number..." 
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : customers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customers.map((customer) => (
            <CustomerCard 
              key={customer._id} 
              customer={customer} 
              shopId={shopId || ''} 
              onClick={() => navigate(`/shop/${shopId}/customer/${customer._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No customers found</p>
          {searchQuery ? (
            <button 
              onClick={() => handleSearch('')} 
              className="btn btn-secondary"
            >
              Clear Search
            </button>
          ) : (
            <button 
              onClick={addNewCustomer} 
              className="btn btn-primary"
            >
              Add Your First Customer
            </button>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ShopDashboard;