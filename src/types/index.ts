export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Wedding {
  id: number;
  userId: number;
  title: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  location: string;
  isPublished: boolean;
  slug: string;
  theme?: string;
  description?: string;
  tierId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  id: number;
  weddingId: number;
  name: string;
  email?: string;
  phone?: string;
  relationship?: string;
  dietaryRequirements?: string;
  address?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  rsvpCount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  vendorId?: number;
  isOwnProduct: boolean;
  customizable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  customizationDetails?: any;
}

export interface SubscriptionTier {
  id: number;
  name: string;
  price: number;
  maxGuests: number;
  features: string[];
}

export interface Timeline {
  id: number;
  weddingId: number;
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  location?: string;
  category: string;
}

export interface Checklist {
  id: number;
  weddingId: number;
  itemName: string;
  category: string;
  isCompleted: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface GuestStats {
  totalGuests: number;
  confirmedCount: number;
  declinedCount: number;
  pendingCount: number;
}
