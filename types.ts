
export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  recipient: string;
  category: string;
  date: string;
  note?: string;
}

export interface UserWallet {
  balance: number;
  currency: string;
  cardLastFour: string;
  owner: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
