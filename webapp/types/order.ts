type Product = {
  name: string;
  image: string;
  unit: string;
};

type User = {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
};

type OrderItem = {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: Date;
  products: Product;
};

export type Order = {
  id: string;
  users: User;
  total: number;
  status: "shipping" | "delivered" | "canceled";
  payment_method: "vnpay" | "cod";
  note: string | null;
  created_at: Date;
  updated_at: Date;
  order_items: OrderItem[];
};
