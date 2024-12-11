export interface CryptoAsset {
  name: string;
  symbol: string;
  balance: string;
  address: string;
  logo: string;
  network?: string;
}

export interface SupportedCrypto {
  name: string;
  symbol: string;
  network?: string;
}