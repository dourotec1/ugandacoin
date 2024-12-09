import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatUsd } from '../utils/priceCalculator';

interface AmountValidationModalProps {
  minAmount: number;
  maxAmount: number;
  onClose: () => void;
}

export const AmountValidationModal = ({ minAmount, maxAmount, onClose }: AmountValidationModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl max-w-md w-full p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold">Invalid Amount</h3>
        </div>

        <p className="text-gray-600 mb-6">
          Please enter an amount between {formatUsd(minAmount)} and {formatUsd(maxAmount)}.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  );
};