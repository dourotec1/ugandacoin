import React, { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import { countries } from '../../data/countries';
import { PaymentMethodSearch } from './PaymentMethodSearch';
import { StandardFormData } from '../../types/offers';
import { supportedCryptos } from '../../data/cryptoAssets';

interface CreateOfferFormProps {
  onSubmit: (data: StandardFormData) => void;
  isSubmitting: boolean;
}

export const CreateOfferForm = ({ onSubmit, isSubmitting }: CreateOfferFormProps) => {
  const [showPaymentMethodSearch, setShowPaymentMethodSearch] = useState(false);
  const [formData, setFormData] = useState<StandardFormData>({
    type: 'buy',
    cryptocurrency: '',
    priceType: 'market',
    priceMargin: '',
    fixedPrice: '',
    minAmount: '',
    maxAmount: '',
    paymentMethods: [],
    country: '',
    terms: '',
    timeLimit: '30',
    requireVerification: true,
    autoReply: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addPaymentMethod = (method: string) => {
    if (!formData.paymentMethods.includes(method)) {
      setFormData(prev => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, method]
      }));
    }
    setShowPaymentMethodSearch(false);
  };

  const removePaymentMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter(m => m !== method)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trade Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'buy' | 'sell' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cryptocurrency
            </label>
            <select
              value={formData.cryptocurrency}
              onChange={(e) => setFormData(prev => ({ ...prev, cryptocurrency: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select cryptocurrency</option>
              {supportedCryptos.map(crypto => (
                <option key={`${crypto.symbol}-${crypto.network || ''}`} value={crypto.symbol}>
                  {crypto.name} ({crypto.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Pricing</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="market"
                  checked={formData.priceType === 'market'}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceType: e.target.value as 'market' | 'fixed' }))}
                  className="mr-2"
                />
                Market Price
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="fixed"
                  checked={formData.priceType === 'fixed'}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceType: e.target.value as 'market' | 'fixed' }))}
                  className="mr-2"
                />
                Fixed Price
              </label>
            </div>
          </div>

          {formData.priceType === 'market' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Margin (%)
              </label>
              <input
                type="number"
                value={formData.priceMargin}
                onChange={(e) => setFormData(prev => ({ ...prev, priceMargin: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 2 for 2% above market"
                step="0.1"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fixed Price (USD)
              </label>
              <input
                type="number"
                value={formData.fixedPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, fixedPrice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter price in USD"
                step="0.01"
                required
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Amount (USD)
              </label>
              <input
                type="number"
                value={formData.minAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, minAmount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Minimum trade amount"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Amount (USD)
              </label>
              <input
                type="number"
                value={formData.maxAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Maximum trade amount"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowPaymentMethodSearch(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Payment Method
          </button>

          {formData.paymentMethods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.paymentMethods.map((method) => (
                <div
                  key={method}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full"
                >
                  <span className="text-sm">{method}</span>
                  <button
                    type="button"
                    onClick={() => removePaymentMethod(method)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Location</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Select country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Terms */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Trade Terms</h2>
        <textarea
          value={formData.terms}
          onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your trade terms and instructions..."
        />
      </div>

      {/* Submit */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Offer...
            </>
          ) : (
            'Create Offer'
          )}
        </button>
      </div>

      {showPaymentMethodSearch && (
        <PaymentMethodSearch
          onSelect={addPaymentMethod}
          onClose={() => setShowPaymentMethodSearch(false)}
        />
      )}
    </form>
  );
};