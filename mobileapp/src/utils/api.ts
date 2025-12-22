import instance from "@/utils/axios.customize";

const backend = process.env.EXPO_PUBLIC_API_URL;
export const registerAPI = (name: string, email: string, password: string) => {
  const url = `${backend}/api/v1/auth/register`;
  return instance.post<IBackendRes<IRegister>>(url, {
    name,
    email,
    password,
  });
};

export const loginAPI = async (username: string, password: string) => {
  const url = `${backend}/api/v1/auth/login`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    return data as IUserLogin;
  } catch (error) {
    throw error;
  }
};

export const getAccountAPI = () => {
  const url = `${backend}/api/v1/auth/account`;
  return instance.get<IBackendRes<IUserLogin>>(url);
};

export const getTopRestaurantAPI = (ref: string) => {
  const url = `${backend}/api/v1/restaurants/${ref}`;
  return instance.get<IBackendRes<ITopRestaurant[]>>(url, {
    headers: { delay: 2000 },
  });
};

export const getRestaurantByIdAPI = (id: string, user_id: string) => {
  const url = `${backend}/api/v1/restaurants/${id}/${user_id}`;
  return instance.get<IBackendRes<IRestaurant>>(url, {
    headers: { delay: 2000 },
  });
};

export const getOrderHistoryAPI = () => {
  const url = `${backend}/api/v1/orders`;
  return instance.get<IBackendRes<IOrderHistory[]>>(url);
};

export const placeOrderAPI = (data: any) => {
  const url = `/api/v1/orders`;
  return instance.post(url, { ...data });
};

export const updateUserAPI = (id: string, name: string, phone: string) => {
  const url = `${backend}/api/v1/users`;
  return instance.patch(
    url,
    { id, name, phone },
    {
      headers: { delay: 2000 },
    }
  );
};

export const changePasswordAPI = (
  currentPassword: string,
  newPassword: string
) => {
  const url = `${backend}/api/v1/users/password`;
  return instance.post(
    url,
    { currentPassword, newPassword },
    {
      headers: { delay: 2000 },
    }
  );
};

export const toggleLikeAPI = (restaurant: string, quantity: number) => {
  const url = `${backend}/api/v1/likes`;
  return instance.post(url, {
    restaurant,
    quantity,
  });
};

export const getLikeRestaurantAPI = (user_id?: string) => {
  const url = `${backend}/api/v1/favorites?user_id=${user_id}`;
  return instance.get<IBackendRes<IRestaurant[]>>(url, {
    headers: { delay: 2000 },
  });
};

export const getURLBaseBackend = () => {
  return process.env.EXPO_PUBLIC_API_URL;
};

export const processDataRestaurantMenu = (restaurant: IRestaurant | null) => {
  if (!restaurant) return [];
  return restaurant?.menu?.map((menu, index) => {
    return {
      index,
      key: menu.id,
      title: menu.title,
      data: menu.menuItem,
    };
  });
};

export const currencyFormatter = (value: any) => {
  const options = {
    significantDigits: 2,
    thousandsSeparator: ".",
    decimalSeparator: ",",
    symbol: "đ",
  };
  if (typeof value !== "number") value = 0.0;
  value = value.toFixed(options.significantDigits);
  const [currency] = value.split(".");
  return `${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )} ${options.symbol}`;
};

export const getRestaurantsByNameAPI = (name: string) => {
  const url = `${backend}/api/v1/restaurants?current=1&pageSize=10&name=${name}`;
  return instance.get<IRestaurant>(url);
};

export const filterRestaurantAPI = (query: string) => {
  const url = `${backend}/api/v1/restaurants?${query}`;
  return instance.get<IBackendRes<IModelPaginate<IRestaurant>>>(url, {
    headers: { delay: 2000 },
  });
};
