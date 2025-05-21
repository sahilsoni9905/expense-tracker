import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopSelection: React.FC = () => {
  const navigate = useNavigate();
  
  const shopOptions = [
    { id: 'shop1', name: 'Prakash' },
    { id: 'shop2', name: 'Vikash' }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-blue-600 text-white mb-4">
            <DollarSign size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Money Manager</h1>
          <p className="text-gray-600 mt-2">Select a shop to get started</p>
        </div>
        
        <motion.div
          className="grid gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {shopOptions.map((shop) => (
            <motion.div
              key={shop.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => navigate(`/shop/${shop.id}`)}
                className="w-full flex items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-blue-100 rounded-lg text-blue-600 mr-4">
                  <Store size={24} />
                </div>
                <div className="text-left">
                  <h2 className="text-xl font-semibold text-gray-800">{shop.name}</h2>
                  <p className="text-gray-500">Manage transactions and customers</p>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopSelection;