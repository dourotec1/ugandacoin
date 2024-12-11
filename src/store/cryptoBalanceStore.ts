import { create } from 'zustand';
import { cryptoAssets } from '../data/cryptoAssets';

interface CryptoBalanceState {
  balances: Record<string, string>;
  getBalance: (symbol: string) => string;
  updateBalance: (symbol: string, balance: string) => void;
}

export const useCryptoBalanceStore = create<CryptoBalanceState>((set, get) => ({
  balances: cryptoAssets.reduce((acc, asset) => ({
    ...acc,
    [asset.symbol]: asset.balance
  }), {}),

  getBalance: (symbol: string) => {
    return get().balances[symbol] || '0.00';
  },

  updateBalance: (symbol: string, balance: string) => {
    set(state => ({
      balances: {
        ...state.balances,
        [symbol]: balance
      }
    }));
  }
}));