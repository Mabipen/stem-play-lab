export type Role = 'parent' | 'staff' | 'admin' | 'superadmin';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Child {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  allergies: string | null;
  medical_notes: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  type: 'class' | 'workshop' | 'camp' | 'party' | 'subscription';
  plan_type: 'monthly_kit' | 'membership' | null;
  description: string | null;
  base_price: string;
  min_age: number;
  max_age: number;
  is_active: boolean;
}

export interface ClassSession {
  id: number;
  service_id: number;
  start_time: string;
  end_time: string;
  max_capacity: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  spots_remaining: number;
  service?: Service;
}

export interface Booking {
  id: number;
  user_id: number;
  class_session_id: number;
  total_amount: string;
  payment_status: 'pending' | 'paid' | 'refunded' | 'failed';
  status: 'reserved' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  class_session?: ClassSession;
  bookingItems?: BookingItem[];
  user?: User;
}

export interface Product {
  id: number;
  title: string;
  sku: string;
  price: string;
  stock_quantity: number;
  images: string[] | null;
  category: string | null;
  min_age: number | null;
  max_age: number | null;
  is_featured: boolean;
  rating: string | null;
  review_count: number;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: string;
  product?: Product;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  status: 'pending' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
  created_at: string;
  order_items?: OrderItem[];
  orderItems?: OrderItem[];
  user?: User;
}

export interface BookingItem {
  id: number;
  booking_id: number;
  child_id: number;
  attendance_status: 'pending' | 'checked_in' | 'absent';
  child?: Child;
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_type: 'monthly_kit' | 'membership';
  status: 'active' | 'past_due' | 'cancelled' | 'unpaid';
  created_at: string;
}

export interface CheckoutResponse {
  checkout_url: string;
}

export type InviteStatus = 'pending' | 'accepted' | 'revoked' | 'expired';

export interface Invite {
  id: number;
  email: string;
  role: 'staff' | 'admin';
  status: 'pending' | 'accepted' | 'revoked';
  effective_status: InviteStatus;
  invited_by_user_id: number;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
}

export interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}
