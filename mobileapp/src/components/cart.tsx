import { useEffect, useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getURLBaseBackend } from "@/utils/api";
import { router } from "expo-router";

type CartItem = { id: string; quantity: number };
type Product = { id: string; name: string; price: number };

export default function Cart({ cart, onClear }: { cart: CartItem[] }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<[]>([]);

  const [modalVisible1, setModalVisible1] = useState(false);
  const [note, setNote] = useState("");
  const [noteTmp, setNoteTmp] = useState("");
  const [noteLabel, setNoteLabel] = useState(" Thêm ghi chú...");
  const [modalVisible, setModalVisible] = useState(false);

  const increaseQuantity = (index) => {
    const updated = [...selectedProduct];
    updated[index].quantity += 1;
    setSelectedProduct(updated);
    updateCartInStorage(
      updated.map((p) => ({
        id: p.id,
        quantity: p.quantity,
        unit_price: p.price,
      })),
    );
  };

  const decreaseQuantity = (index) => {
    const updated = [...selectedProduct];
    updated[index].quantity = Math.max(1, updated[index].quantity - 1);
    setSelectedProduct(updated);
    updateCartInStorage(
      updated.map((p) => ({
        id: p.id,
        quantity: p.quantity,
        unit_price: p.price,
      })),
    );
  };

  const fetchProducts = async () => {
    const res = await fetch(
      `${getURLBaseBackend()}/api/v1/products/get-all-admin`,
    );
    const data = await res.json();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const updateCartInStorage = async (updatedCart) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (cart?.length > 0 && products?.length > 0) {
      const matchedProducts = cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);
      setSelectedProduct(matchedProducts);
      const totalQ = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalP = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      setTotalQuantity(totalQ);
      setTotalPrice(totalP);
    }
  }, [cart, products]);

  return (
    <>
      {cart?.length > 0 && (
        <View>
          <View
            style={{
              flexDirection: "row",
              padding: 5,
              borderTopWidth: 1,
              borderColor: "#e6e3e3ff",
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-between",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons
                style={{ position: "relative" }}
                name="cart-outline"
                size={25}
                color="#ff5f1f"
              />

              {totalQuantity > 0 && (
                <View
                  style={{
                    backgroundColor: "#ff5f1f",
                    borderRadius: 50,
                    width: 16,
                    height: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: -4,
                    left: 18,
                  }}
                >
                  <Text style={{ fontSize: 10, color: "#fff" }}>
                    {totalQuantity}
                  </Text>
                </View>
              )}

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text>
                  {Number(totalPrice).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: "#ff5f1f",
                alignItems: "center",
              }}
              onPress={() => router.navigate(`/(user)/checkout/page`)}
            >
              <Text
                style={{
                  color: "#ffffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Giao hàng
              </Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  minWidth: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: "#dadadaff",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ color: "#e40c0cff" }}
                    onPress={async () => {
                      Alert.alert(
                        "Xóa tất cả món",
                        "Bạn muốn xóa tất cả các món trong giỏ hảng?",
                        [
                          { text: "Hủy", style: "cancel" },
                          {
                            text: "Xóa tất cả",
                            style: "destructive",
                            onPress: async () => {
                              await AsyncStorage.removeItem("cart");
                              onClear && onClear();
                              setModalVisible(false);
                            },
                          },
                        ],
                      );
                    }}
                  >
                    Xóa tất cả
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Giỏ hàng
                  </Text>
                  <Ionicons
                    onPress={() => setModalVisible(false)}
                    name="close-outline"
                    size={24}
                  />
                </View>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#d1cfcfff",
                    marginHorizontal: 10,
                    paddingBottom: 5,
                  }}
                >
                  {selectedProduct?.map((p, i) => {
                    return (
                      <View key={i}>
                        <View
                          style={{
                            flexDirection: "row",
                            marginHorizontal: 10,
                            gap: 5,
                          }}
                        >
                          <Image
                            source={{
                              uri: `${getURLBaseBackend()}/api/v1/uploads/${
                                p?.image
                              }`,
                            }}
                            style={{ width: 60, height: 60, borderRadius: 5 }}
                          />
                          <View>
                            <Text>{p.name}</Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Ionicons name="clipboard-outline" size={15} />
                              <Text
                                onPress={() => setModalVisible1(true)}
                                style={{ color: "#d1cdcdff", fontSize: 16 }}
                              >
                                {noteLabel}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: 75,
                          }}
                        >
                          <Text style={{ color: "#e93434ff" }}>
                            {Number(p.price).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Pressable onPress={() => decreaseQuantity(i)}>
                              <Feather
                                name="minus-square"
                                size={30}
                                color="#e93434ff"
                              />
                            </Pressable>
                            <Text>{p.quantity}</Text>
                            <Pressable onPress={() => increaseQuantity(i)}>
                              <Feather
                                name="plus-square"
                                size={30}
                                color="#e93434ff"
                              />
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
                <Text
                  style={{
                    color: "#868686ff",
                    fontSize: 15,
                  }}
                >
                  Giá món đã bao gôm thuế, nhưng chưa bao gồm chi phí giao hàng
                  và các chi phí khác.
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    borderTopWidth: 1,
                    borderColor: "#e6e3e3ff",
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                  }}
                >
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Ionicons
                      style={{ position: "relative" }}
                      name="cart-outline"
                      size={25}
                      color="#ff5f1f"
                    />

                    {totalQuantity > 0 && (
                      <View
                        style={{
                          backgroundColor: "#ff5f1f",
                          borderRadius: 50,
                          width: 16,
                          height: 16,
                          alignItems: "center",
                          justifyContent: "center",
                          position: "absolute",
                          top: -4,
                          left: 18,
                        }}
                      >
                        <Text style={{ fontSize: 10, color: "#fff" }}>
                          {totalQuantity}
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Text>
                        {Number(totalPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      backgroundColor: "#ff5f1f",
                      alignItems: "center",
                    }}
                    onPress={() => router.navigate(`/(user)/checkout/page`)}
                  >
                    <Text
                      style={{
                        color: "#ffffffff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Giao hàng
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  minWidth: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderColor: "#dadadaff",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Thêm ghi chú
                  </Text>

                  <Pressable onPress={() => setModalVisible1(false)}>
                    <Ionicons name="close-outline" size={24} />
                  </Pressable>
                </View>
                <View style={{ margin: 10, gap: 15 }}>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      textAlignVertical: "top",
                      borderColor: "#c2bfbfff",
                    }}
                    placeholder="Việc thực hiện yêu cầu theo ghi chú sẽ tùy thuộc vào quán."
                    value={noteTmp}
                    onChangeText={setNoteTmp}
                    multiline={true}
                  ></TextInput>
                  <Pressable
                    style={{
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 8,
                      backgroundColor: "#ff5f1f",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setNote(noteTmp);
                      if (noteTmp === "") {
                        setNoteLabel("Không có");
                      } else {
                        setNoteLabel(noteTmp);
                      }
                      setModalVisible1(false);
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffffff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Xác nhận
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
}
