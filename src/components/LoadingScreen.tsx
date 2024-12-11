import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Creating Your Offer</h2>
          <p className="text-gray-600 mb-8">Please wait while we process your request...</p>
          
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full"
            />
            <span className="text-gray-600">Processing...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};