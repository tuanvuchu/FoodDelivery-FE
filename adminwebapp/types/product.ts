export type Product = {
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
  categories: string[];
  pre: {
    slug: string;
    name: string;
    price: string;
    image: string;
  } | null;
  next: {
    slug: string;
    name: string;
    price: string;
    image: string;
  } | null;
};
