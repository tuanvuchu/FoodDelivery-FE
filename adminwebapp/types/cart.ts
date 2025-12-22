type Product = {
  id: string;
  name: string;
  description: string;
  additional_information: {
    weight: string;
  };
  price: string;
  unit: string;
  quantity: number;
  image: string;
  sku: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type Cart = {
  id: string;
  cart_id: string;
  created_at: string;
  updated_at: string;
  count: number;
  products: Product[];
};
