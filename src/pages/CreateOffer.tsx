import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useOfferStore } from '../store/offerStore';
import { useCryptoBalanceStore } from '../store/cryptoBalanceStore';
import { CreateOfferForm } from '../components/CreateOffer/CreateOfferForm';
import { SwapOfferForm } from '../components/CreateOffer/SwapOfferForm';
import { LoadingScreen } from '../components/LoadingScreen';
import { StandardFormData, SwapFormData } from '../types/offers';

export const CreateOffer = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addOffer } = useOfferStore();
  const { getBalance } = useCryptoBalanceStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [offerType, setOfferType] = useState<'standard' | 'swap'>('standard');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleStandardSubmit = async (formData: StandardFormData) => {
    setIsSubmitting(true);
    
    // Create the offer
    const offer = {
      ...formData,
      username: user.username,
      createdAt: new Date().toISOString(),
      minAmount: parseFloat(formData.minAmount),
      maxAmount: parseFloat(formData.maxAmount),
      price: formData.priceType === 'fixed' ? parseFloat(formData.fixedPrice) : 0,
    };

    await addOffer(offer);
    
    // Simulate a short delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleSwapSubmit = async (formData: SwapFormData) => {
    setIsSubmitting(true);
    
    // Create the swap offer
    const offer = {
      ...formData,
      username: user.username,
      createdAt: new Date().toISOString(),
      minAmount: parseFloat(formData.minAmount),
      maxAmount: parseFloat(formData.maxAmount),
      type: 'swap'
    };

    await addOffer(offer);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate('/dashboard');
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />}
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">Create Trade Offer</h1>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-8">
              <div className="flex gap-4">
                <button
                  onClick={() => setOfferType('standard')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    offerType === 'standard'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Standard Offer
                </button>
                <button
                  onClick={() => setOfferType('swap')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    offerType === 'swap'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Swap Offer
                </button>
              </div>
            </div>

            {offerType === 'standard' ? (
              <CreateOfferForm onSubmit={handleStandardSubmit} isSubmitting={isSubmitting} />
            ) : (
              <SwapOfferForm onSubmit={handleSwapSubmit} isSubmitting={isSubmitting} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};