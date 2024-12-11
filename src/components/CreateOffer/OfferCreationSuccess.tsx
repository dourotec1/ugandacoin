import React from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OfferCreationSuccessProps {
  cryptocurrency: string;
  isFunded: boolean;
}

export const OfferCreationSuccess = ({ cryptocurrency, isFunded }: OfferCreationSuccessProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            {isFunded ? (
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-yellow-500" />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {isFunded ? 'Offer Created Successfully!' : 'Offer Created - Action Required'}
          </h3>
          
          {!isFunded && (
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg mb-4">
              Your offer will not be visible until you fund your {cryptocurrency} wallet
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Link
              to="/wallet"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isFunded 
                  ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              Go to Wallet
            </Link>
            <Link
              to="/dashboard"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isFunded
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};