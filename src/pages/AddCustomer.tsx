import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import { createCustomer } from '../api';

const AddCustomer: React.FC = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', phone: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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
      
      if (!shopId) {
        toast.error('Shop ID is missing');
        return;
      }
      
      await createCustomer(shopId, formData);
      toast.success('Customer added successfully');
      navigate(`/shop/${shopId}`);
      
    } catch (error) {
      console.error('Failed to add customer:', error);
      toast.error('Failed to add customer');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout title="Add New Customer">
      <div className="max-w-md mx-auto card p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="label flex items-center">
              <User size={16} className="mr-2" />
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`input ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter customer name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="label flex items-center">
              <Phone size={16} className="mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`input ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
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
              ) : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddCustomer;