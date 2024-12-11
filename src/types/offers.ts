export interface SwapFormData {
  fromCrypto: string;
  toCrypto: string;
  rateType: 'market' | 'fixed';
  rateMargin: string;
  fixedRate: string;
  minAmount: string;
  maxAmount: string;
  terms: string;
  autoReply: boolean;
  requireVerification: boolean;
  timeLimit: string;
}

// ... rest of the file remains the same