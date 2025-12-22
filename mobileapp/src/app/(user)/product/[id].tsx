import AddButton from "@/components/addButton";
import Cart from "@/components/cart";
import Comment from "@/components/comment";
import { getURLBaseBackend } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>([]);
  const [cart, setCart] = useState<[]>([]);

  const refreshCart = async () => {
    const stored = await AsyncStorage.getItem("cart");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCart([...parsed]);
    } else {
      setCart([]);
    }
  };

  const fetchProductById = async (productId: string) => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/products/${productId}`
      );
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id as string);
    }
  }, [id]);
  return (
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
          <Ionicons name="arrow-back-circle-outline" size={35} color="#fff" />
        </Pressable>
        <Ionicons name="arrow-redo-circle-outline" size={35} color="#fff" />
      </View>
      <Image
        style={{
          width: "100%",
          height: 350,
        }}
        source={{
          uri: `${getURLBaseBackend()}/api/v1/uploads/${product.image}`,
        }}
      />

      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 600, paddingVertical: 15 }}>
          {product.name}
        </Text>
        <Text style={{ color: "gray", paddingVertical: 10 }}>
          {product.description}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "gray" }}>10K+ đã bán</Text>
          <Text
            style={{
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "#bbb8b8ff",
              paddingHorizontal: 6,
              color: "gray",
            }}
          >
            999 lượt thích
          </Text>
          <Text style={{ color: "#9e0505ff" }}>1 phần mỗi đơn</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 700, color: "#ff5e00ff" }}>
              {Number(product.sale_price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </Text>
            <Text style={{ textDecorationLine: "line-through", color: "gray" }}>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <AddButton
            id={product.id}
            unit_price={product.price}
            onAdded={refreshCart}
          />
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderColor: "gray",
            marginVertical: 20,
          }}
        ></View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 600, paddingBottom: 20 }}>
            Bình luận
          </Text>
          <Comment comments={product.comments} />
        </View>
      </View>
      {cart.length > 0 && <Cart cart={cart} onClear={refreshCart} />}
    </ScrollView>
  );
}
