export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  age: number;
  text: string;
}

export interface Appointment {
  id: string;
  type: 'online' | 'offline' | 'package';
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  comment?: string;
  createdAt: string;
}

export interface PriceCard {
  id: string;
  title: string;
  subtitle: string;
  duration?: string;
  price: string;
  rawPrice: number;
  type: 'online' | 'offline' | 'package';
}
