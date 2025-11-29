export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string | string[];
    statusCode: number | string;
    data?: T;
    timestamp?: number;
    author?: string;
  }

  interface IRegister {
    id: string;
  }

  interface IUserLogin {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      image: string | null;
      address: string | null;
    };
    access_token: string;
  }

  interface ITopRestaurant {
    id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    rating: number;
    image: string;
    isActive: true;
    createdAt: Date;
    updatedAt: Date;
  }

  interface IRestaurant {
    id: string;
    name: string;
    type: string;
    image: string;
    address: string;
    averageRating: string;
    isLiked: boolean;
    products: [];
  }

  interface IMenu {
    id: string;
    restaurant: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    menuItem: IMenuItem[];
  }

  interface IMenuItem {
    id: string;
    menu: string;
    title: string;
    description: string;
    basePrice: number;
    image: string;
    options: {
      title: string;
      description: string;
      additionalPrice: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface ICart {
    [key: string]: {
      sum: number;
      quantity: number;
      items: {
        [key: string]: {
          quantity: number;
          data: IMenuItem;
          extra?: {
            [key: string]: number;
          };
        };
      };
    };
  }
  /* 
  cart: {
    "store-1-id": {
      sum: 123000,
      quantity: 3,
      items: {
        "product-1-id": {
          quantity: 2,
          data: {},
          extra: {
            "size L": 1,
            "size M": 2,
          }
        }
      }
    }
  }
  */

  interface IOrderHistory {
    id: string;
    restaurant: IRestaurant;
    user: string;
    status: string;
    totalPrice: number;
    totalQuantity: number;
    orderTime: Date;
    detail: {
      image: string;
      title: string;
      option: string;
      price: number;
      quantity: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    items: T[];
  }
}
