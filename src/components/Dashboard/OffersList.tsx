import React from 'react';
import { UnfundedOfferWarning } from './UnfundedOfferWarning';
import { useOfferStore } from '../../store/offerStore';
import { useCryptoBalanceStore } from '../../store/cryptoBalanceStore';
import { Link } from 'react-router-dom';

export const DashboardOffersList = () => {
  const { getUserOffers } = useOfferStore();
  const { getBalance } = useCryptoBalanceStore();
  const offers = getUserOffers();

  const isOfferFunded = (cryptocurrency: string) => {
    const balance = getBalance(cryptocurrency);
    return parseFloat(balance) > 0;
  };

  if (offers.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        You haven't created any trade offers yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <div key={offer.id}>
          {!isOfferFunded(offer.cryptocurrency) && (
            <UnfundedOfferWarning cryptocurrency={offer.cryptocurrency} />
          )}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-2">
            <div>
              <h3 className="font-medium">
                {offer.type === 'buy' ? 'Buying' : 'Selling'} {offer.cryptocurrency}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {offer.priceType === 'market' 
                  ? `Market price ${offer.priceMargin}%` 
                  : `Fixed price $${offer.price}`}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Limits: ${offer.minAmount.toLocaleString()} - ${offer.maxAmount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(offer.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};