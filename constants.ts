
import { Transaction, UserWallet } from './types';

export const INITIAL_WALLET: UserWallet = {
  balance: 12450.75,
  currency: 'USD',
  cardLastFour: '8842',
  owner: 'Alex Rivera',
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'outgoing', amount: 45.00, recipient: 'Starbucks Coffee', category: 'Food', date: '2023-10-24T10:30:00Z' },
  { id: '2', type: 'incoming', amount: 2500.00, recipient: 'Stripe Payout', category: 'Income', date: '2023-10-23T09:00:00Z' },
  { id: '3', type: 'outgoing', amount: 120.50, recipient: 'Amazon Services', category: 'Shopping', date: '2023-10-22T15:45:00Z' },
  { id: '4', type: 'outgoing', amount: 15.99, recipient: 'Netflix Premium', category: 'Entertainment', date: '2023-10-21T00:00:00Z' },
  { id: '5', type: 'outgoing', amount: 200.00, recipient: 'Shell Gas Station', category: 'Transport', date: '2023-10-20T18:20:00Z' },
];

export const CATEGORIES = ['Food', 'Shopping', 'Entertainment', 'Transport', 'Utilities', 'Income', 'Others'];
