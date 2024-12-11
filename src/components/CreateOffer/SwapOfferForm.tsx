import React, { useState } from 'react';
import { supportedCryptos } from '../../data/cryptoAssets';
import { ArrowRight, Loader2 } from 'lucide-react';
import { SwapFormData } from '../../types/offers';

interface SwapOfferFormProps {
  onSubmit: (data: SwapFormData) => void;
  isSubmitting?: boolean;
}

export const SwapOfferForm = ({ onSubmit, isSubmitting }: SwapOfferFormProps) => {
  const [formData, setFormData] = useState<SwapFormData>({
    fromCrypto: '',
    toCrypto: '',
    rateType: 'market',
    rateMargin: '',
    fixedRate: '',
    minAmount: '',
    maxAmount: '',
    terms: '',
    autoReply: false,
    requireVerification: true,
    timeLimit: '30'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Cryptocurrencies Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Cryptocurrency
          </label>
          <select
            value={formData.fromCrypto}
            onChange={(e) => setFormData(prev => ({ ...prev, fromCrypto: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Select cryptocurrency</option>
            {supportedCryptos.map(crypto => (
              <option key={`from-${crypto.symbol}-${crypto.network || ''}`} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Cryptocurrency
          </label>
          <select
            value={formData.toCrypto}
            onChange={(e) => setFormData(prev => ({ ...prev, toCrypto: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          >
            <option value="">Select cryptocurrency</option>
            {supportedCryptos.map(crypto => (
              <option key={`to-${crypto.symbol}-${crypto.network || ''}`} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rate Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Exchange Rate</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="market"
                  checked={formData.rateType === 'market'}
                  onChange={(e) => setFormData(prev => ({ ...prev, rateType: e.target.value as 'market' | 'fixed' }))}
                  className="mr-2"
                />
                Market Rate
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="fixed"
                  checked={formData.rateType === 'fixed'}
                  onChange={(e) => setFormData(prev => ({ ...prev, rateType: e.target.value as 'market' | 'fixed' }))}
                  className="mr-2"
                />
                Fixed Rate
              </label>
            </div>
          </div>

          {formData.rateType === 'market' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rate Margin (%)
              </label>
              <input
                type="number"
                value={formData.rateMargin}
                onChange={(e) => setFormData(prev => ({ ...prev, rateMargin: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 2 for 2% above market"
                step="0.1"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fixed Rate
              </label>
              <div className="flex items-center gap-2">
                <span>1 {formData.fromCrypto || 'XXX'} =</span>
                <input
                  type="number"
                  value={formData.fixedRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, fixedRate: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter rate"
                  step="0.000001"
                  required
                />
                <span>{formData.toCrypto || 'XXX'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trade Limits */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Trade Limits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Amount ({formData.fromCrypto || 'XXX'})
            </label>
            <input
              type="number"
              value={formData.minAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, minAmount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Minimum trade amount"
              step="0.000001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Amount ({formData.fromCrypto || 'XXX'})
            </label>
            <input
              type="number"
              value={formData.maxAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, maxAmount: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Maximum trade amount"
              step="0.000001"
              required
            />
          </div>
        </div>
      </div>

      {/* Trade Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Trade Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.requireVerification}
                onChange={(e) => setFormData(prev => ({ ...prev, requireVerification: e.target.checked }))}
                className="mr-2"
              />
              Require verification from traders
            </label>
          </div>
          
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.autoReply}
                onChange={(e) => setFormData(prev => ({ ...prev, autoReply: e.target.checked }))}
                className="mr-2"
              />
              Enable auto-reply
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              value={formData.timeLimit}
              onChange={(e) => setFormData(prev => ({ ...prev, timeLimit: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      {/* Terms and Instructions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Terms and Instructions</h3>
        <textarea
          value={formData.terms}
          onChange={(e) => setFormData(prev => ({ ...prev, terms: e.target.value }))}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter your swap terms and instructions..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Swap Offer...
          </>
        ) : (
          'Create Swap Offer'
        )}
      </button>
    </form>
  );
};