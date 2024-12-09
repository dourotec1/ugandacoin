import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
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
          <h2 className="text-xl font-semibold mb-2">Initializing Secure Trade</h2>
          <p className="text-gray-600 mb-8">Please wait while we set up your escrow...</p>
          
          <div className="flex items-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600">Connecting</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-6 h-6 bg-indigo-600 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600">Securing</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 bg-green-500 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-600">Ready</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full"
            />
            Setting up secure communication channel...
          </div>
        </motion.div>
      </div>
    </div>
  );
};