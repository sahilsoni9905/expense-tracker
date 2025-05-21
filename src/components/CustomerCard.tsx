import React from 'react';
import { User, Phone, ArrowRight } from 'lucide-react';

interface CustomerProps {
  customer: {
    _id: string;
    name: string;
    phone: string;
    balance: number;
    createdAt: string;
  };
  shopId: string;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerProps> = ({ customer, onClick }) => {
  const formattedDate = new Date(customer.createdAt).toLocaleDateString();
  const isPositiveBalance = customer.balance > 0;
  
  return (
    <div 
      className="card p-4 cursor-pointer hover:border-blue-200 transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{customer.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <Phone size={16} className="mr-1" />
            <p>{customer.phone}</p>
          </div>
          <p className="text-gray-500 text-sm mt-2">Added on: {formattedDate}</p>
        </div>
        
        <div className="text-right">
          <div className={`font-semibold text-lg ${isPositiveBalance ? 'text-red-600' : 'text-green-600'}`}>
            {isPositiveBalance ? `₹${customer.balance.toFixed(2)} due` : `₹${Math.abs(customer.balance).toFixed(2)} credit`}
          </div>
          <div className="mt-2">
            <ArrowRight className="inline-block ml-1 text-blue-500" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;