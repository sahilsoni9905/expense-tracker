import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionProps {
  transaction: {
    _id: string;
    amount: number;
    type: 'DEBIT' | 'CREDIT';
    description: string;
    date: string;
    createdAt: string;
  };
}

const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
  const isDebit = transaction.type === 'DEBIT';
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  const formattedTime = new Date(transaction.date).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className="border-b border-gray-100 pb-3 last:border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
            isDebit ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
          }`}>
            {isDebit ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          </div>
          
          <div>
            <h4 className="font-medium">
              {isDebit ? 'Money Lent' : 'Payment Received'}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <span>{formattedDate}</span>
              <span className="mx-1">•</span>
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>
        
        <div className={`font-semibold ${isDebit ? 'text-red-600' : 'text-green-600'}`}>
          {isDebit ? `₹${transaction.amount.toFixed(2)}` : `₹${transaction.amount.toFixed(2)}`}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;