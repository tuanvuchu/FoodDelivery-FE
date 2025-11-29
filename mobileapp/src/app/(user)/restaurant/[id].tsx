import AddButton from "@/components/addButton";
import Cart from "@/components/cart";
import FavoriteButton from "@/components/favorite";
import SkeletonProductId from "@/components/skeleton.product.[id]";
import { useCurrentApp } from "@/context/app.context";
import { getRestaurantByIdAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function RestaurantPage() {
  const { appState } = useCurrentApp();

  const refreshCart = async () => {
    const stored = await AsyncStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCart([...parsed]);
    } else {
      setCart([]);
    }
  };

  const { id } = useLocalSearchParams();
  const [ran, setRan] = useState<[]>([]);
  const { setRestaurant } = useCurrentApp();
  const { restaurant } = useCurrentApp();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<[]>([]);

  async function getCart() {
    try {
      const cartItem = await AsyncStorage.getItem("cart");

      if (cartItem) {
        setCart(JSON.parse(cartItem));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchRestaurant = async () => {
    setIsLoading(true);
    const res = await getRestaurantByIdAPI(id, appState?.user.id);
    if (res) {
      setRestaurant(res);
      setRan(res.products.sort(() => Math.random() - 0.5).slice(0, 3));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRestaurant();
    getCart();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <SkeletonProductId />
      ) : (
        <ScrollView style={{ flex: 1, position: "relative" }}>
          <View
            style={{
              position: "absolute",
              top: 30,
              left: 0,
              right: 0,
              zIndex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="arrow-back-circle-outline"
                size={35}
                color="#fff"
              />
            </Pressable>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="people-outline" size={30} color="#fff" />
                <Text style={{ color: "#fff" }}>Đơn nhóm</Text>
              </View>
              <Ionicons name="search-circle-outline" size={35} color="#fff" />
              <Ionicons
                name="arrow-redo-circle-outline"
                size={35}
                color="#fff"
              />
            </View>
          </View>
          <View
            style={{
              height: 180,
            }}
          >
            <Image
              source={{
                uri: `${getURLBaseBackend()}/api/v1/uploads/${
                  restaurant?.image
                }`,
              }}
              style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                height: 60,
                margin: 10,
                padding: 0,
                position: "relative",
              }}
            >
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#fff",
                  backgroundColor: "#ffffffff",
                  position: "absolute",
                  top: -25,
                  right: -5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  onPress={() =>
                    router.navigate(
                      `/(user)/restaurant/restaurant_detail/${restaurant?.id}`,
                    )
                  }
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={25}
                    color="#a5a4a4ff"
                  />
                </Pressable>
              </View>
              <Text
                style={{ lineHeight: 30, paddingTop: 10 }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                <Ionicons name="shield-checkmark" size={20} color="orange" />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {restaurant?.name}
                </Text>
              </Text>
              <View
                style={{
                  gap: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    gap: 3,
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    marginVertical: 5,
                  }}
                >
                  <AntDesign name="star" size={15} color="orange" />
                  <Text>
                    {restaurant?.averageRating || 0} (100+ Bình luận){" "}
                  </Text>
                </View>
                <FavoriteButton
                  restaurant_id={restaurant?.id || ""}
                  isLiked={restaurant?.isLiked || false}
                />
              </View>
            </View>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
            <View style={{ margin: 10, gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Ionicons name="rocket-outline" size={20} color="blue" />
                  <Text>
                    <Text style={{ fontWeight: 500 }}>Giao ngay</Text>
                    {"  "} Dự kiến giao lúc 12:45
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#d6cdcdff" }}>Thay đổi</Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={24}
                    color={APP_COLOR.GREY}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Feather name="dollar-sign" size={20} color="red" />
                  <Text style={{ fontWeight: 500 }}>Ưu đãi dành cho bạn</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#d6cdcdff" }}>Xem thêm</Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={24}
                    color={APP_COLOR.GREY}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    padding: 3,
                    alignSelf: "flex-start",
                  }}
                >
                  Ưu đãi có hạn
                </Text>
              </View>
            </View>
            <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>

            <View
              style={{
                margin: 10,
                borderRadius: 15,
                backgroundColor: "#fff",
              }}
            >
              <Text
                style={{
                  color: "#e24444ff",
                  fontWeight: "700",
                  fontSize: 20,
                  paddingBottom: 15,
                }}
              >
                Món phổ biến
              </Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={ran}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <>
                    <Pressable
                      style={{
                        position: "relative",
                      }}
                      onPress={() =>
                        router.navigate(`/(user)/product/${item.id}`)
                      }
                    >
                      <View
                        style={{
                          borderRadius: 10,
                          width: 250,
                          borderWidth: 1,
                          borderColor: "#e2e2e2ff",
                          flexDirection: "row",
                          marginRight: 30,
                          backgroundColor: "#ddddddff",
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: `${getURLBaseBackend()}/api/v1/uploads/${
                                item.image
                              }`,
                            }}
                            style={{
                              width: 100,
                              height: 100,
                              position: "relative",
                              borderTopLeftRadius: 10,
                              borderBottomLeftRadius: 10,
                            }}
                          />
                          <Text
                            style={{
                              borderTopLeftRadius: 10,
                              borderBottomRightRadius: 5,
                              position: "absolute",
                              top: 0,
                              left: 0,
                              borderWidth: 1,
                              backgroundColor: "yellow",
                              borderColor: "yellow",
                              color: "orange",
                            }}
                          >
                            200+ đã bán
                          </Text>
                        </View>

                        <View
                          style={{
                            justifyContent: "space-between",
                            padding: 10,
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ width: 125 }}
                          >
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#e93434ff" }}>
                              {Number(item.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <View
                      style={{ position: "absolute", bottom: 7, right: 40 }}
                    >
                      <AddButton
                        id={item.id}
                        unit_price={item.price}
                        onAdded={refreshCart}
                      />
                    </View>
                  </>
                )}
              />
            </View>

            <View
              style={{
                margin: 10,
                borderRadius: 15,
                backgroundColor: "#fff",
              }}
            >
              <FlatList
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={restaurant?.products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <>
                    <Pressable
                      onPress={() =>
                        router.navigate(`/(user)/product/${item.id}`)
                      }
                    >
                      <View
                        style={{
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#e2e2e2ff",
                          flexDirection: "row",
                          marginBottom: 20,
                          position: "relative",
                        }}
                      >
                        <View>
                          <Image
                            source={{
                              uri: `${getURLBaseBackend()}/api/v1/uploads/${
                                item.image
                              }`,
                            }}
                            style={{ width: 100, height: 100 }}
                          />
                        </View>

                        <View
                          style={{
                            justifyContent: "space-between",
                            padding: 10,
                          }}
                        >
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ width: 220 }}
                          >
                            {item.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: "#e93434ff" }}>
                              {Number(item.price).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <View
                      style={{ position: "absolute", bottom: 30, right: 10 }}
                    >
                      <AddButton
                        id={item.id}
                        unit_price={item.price}
                        onAdded={refreshCart}
                      />
                    </View>
                  </>
                )}
              />
            </View>
          </View>
        </ScrollView>
      )}
      {cart.length > 0 && <Cart cart={cart} onClear={refreshCart} />}
    </View>
  );
}
