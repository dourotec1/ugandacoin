import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UnfundedOfferWarningProps {
  cryptocurrency: string;
}

export const UnfundedOfferWarning = ({ cryptocurrency }: UnfundedOfferWarningProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <span className="text-red-700">
          Your offer is not visible because your {cryptocurrency} wallet is not funded
        </span>
      </div>
      <Link
        to="/wallet"
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Fund Wallet
      </Link>
    </div>
  );
};