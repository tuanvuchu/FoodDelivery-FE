import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ToggleButton } from "react-native-paper";
import * as Linking from "expo-linking";

import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getURLBaseBackend } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";

export default function Page() {
  const { appState } = useCurrentApp();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [note, setNote] = useState("");
  const [noteTmp, setNoteTmp] = useState("");
  const [noteLabel, setNoteLabel] = useState("Không có");
  const [value, setValue] = useState("cash");

  const [a] = useState(20000);
  const [b] = useState(3000);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [products, setProducts] = useState<[]>([]);
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      const matchedProducts = cart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean);
      setCartItems(matchedProducts);
      const totalQ = cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalP = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);

      setTotalQuantity(totalQ);
      setTotalPrice(totalP);
    } catch (error) {
      console.error(error);
    }
  };

  const momo = async (amount, info) => {
    try {
      const body = {
        amount: amount,
        info: info,
      };
      const response = await fetch(
        `${getURLBaseBackend()}/api/v1/payment-url-momo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể đặt đơn, vui lòng thử lại");
      }
      const data = await response.json();
      await Linking.openURL(data.deeplink);
      await AsyncStorage.removeItem("cart");
      // Alert.alert("Thành công", "Đơn hàng đã được đặt!");
      router.push("/(user)/order_detail/page");
    } catch (error) {
      console.error(error);
    }
  };

  const zalopay = async (amount, info) => {
    try {
      const body = {
        amount: amount,
        info: info,
      };
      const response = await fetch(
        `${getURLBaseBackend()}/api/v1/payment-url-zalopay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể đặt đơn, vui lòng thử lại");
      }
      const data = await response.json();
      await Linking.openURL(data.order_url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    if (!appState?.user.id) {
      router.push("/(auth)/authentication");
      return;
    }
    try {
      const body = {
        user_id: appState?.user.id,
        payment_method: value,
        note,
        total: totalPrice,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };

      const res = await fetch(`${getURLBaseBackend()}/api/v1/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Không thể đặt đơn");

      if (value === "momo") {
        await momo(totalPrice, "test");
        return;
      }

      if (value === "zalopay") {
        await zalopay(totalPrice, "test");
        return;
      }

      await AsyncStorage.removeItem("cart");
      Alert.alert("Thành công", "Đơn hàng đã được đặt!");
      router.push("/(user)/order_detail/page");
    } catch (err) {
      console.error(err);
      Alert.alert("Lỗi", err.message || "Đặt đơn thất bại");
    }
  };

  const fetchProducts = async () => {
    const res = await fetch(
      `${getURLBaseBackend()}/api/v1/products/get-all-admin`
    );
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadCart();
    fetchProducts();
  }, [loadCart]);

  return (
    <>
      <ScrollView style={{ marginHorizontal: 10, marginTop: 10 }}>
        <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Ionicons name="location-outline" size={20} color="#ec5712ff" />
              <Text style={{ borderRightWidth: 1, paddingRight: 10 }}>
                Chu Tuấn Vũ
              </Text>
              <Text>0967785311</Text>
            </View>
            <Pressable>
              <Text style={{ color: "#0d11ecff" }}>Chỉnh sửa</Text>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Ionicons name="time-outline" size={20} color="#ec5712ff" />
              <Text>Giao ngay</Text>
              <Ionicons name="alert-outline" size={20} color="#3e41f1ff" />
            </View>
            <Pressable>
              <Text style={{ color: "#0d11ecff" }}>Đổi sang hẹn giờ</Text>
            </Pressable>
          </View>
          <Pressable
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#f55516ff",
                fontSize: 16,
              }}
            >
              Tiêu chuẩn - 22:30
            </Text>
          </Pressable>
          <Pressable
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#f55516ff",
                fontSize: 16,
              }}
            >
              Tiết kiệm - 22:40
            </Text>
          </Pressable>
        </View>

        <View
          style={{ backgroundColor: "#fff", marginBottom: 15, padding: 10 }}
        >
          {cartItems.map((p, i) => (
            <View key={i}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons
                  name="storefront-outline"
                  size={20}
                  color="#ec5712ff"
                />
                <Text style={{ fontWeight: 500, fontSize: 18 }}>
                  {p.restaurants.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 45, height: 45 }}
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${p.image}`,
                    }}
                  />
                  <Text style={{ fontWeight: 500 }}>
                    {p.quantity} x {p.name}
                  </Text>
                </View>
                <Text style={{ fontWeight: 500 }}>
                  {Number(p.price * p.quantity).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            marginBottom: 15,
            gap: 10,
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 500, fontSize: 16 }}>
            Chi tiết thanh toán
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Tổng giá món ({cartItems.length} món)</Text>
            <Text>
              {" "}
              {Number(totalPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Phí giao hàng</Text>
            <Text>
              {Number(a).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d4d3d3ff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text>Phí áp dụng</Text>
              <Pressable onPress={() => setModalVisible(true)}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#b7b7bdff"
                />
              </Pressable>
            </View>
            <Text>
              {Number(b).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: 500, fontSize: 18 }}>
              Tổng thanh toán
            </Text>
            <Text style={{ color: "#ec5712ff", fontWeight: 500, fontSize: 18 }}>
              {Number(a + b + totalPrice).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <Text style={{ alignSelf: "flex-end", color: "#d6d1d1ff" }}>
            Đã bao gồm thuế
          </Text>
        </View>

        <View
          style={{ backgroundColor: "#fff", padding: 10, borderRadius: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d6d3d3ff",
              paddingVertical: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ticket-outline" size={18} color="#fa3605ff" />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Thêm voucher
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => setModalVisible4(true)}>
                <Text style={{ color: "#d1cdcdff", fontSize: 16 }}>
                  Chọn voucher
                </Text>
              </Pressable>

              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#d1cdcdff"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d6d3d3ff",
              paddingVertical: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Ionicons name="cash-outline" size={18} color="#fa3605ff" />
                <Text style={{ fontWeight: 500, fontSize: 16 }}>
                  Không đủ Xu
                </Text>
                <Pressable>
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color="#b1aeaeff"
                  />
                </Pressable>
              </View>
            </View>
            <Switch onValueChange={toggleSwitch2} value={isEnabled2}></Switch>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d6d3d3ff",
              paddingVertical: 20,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Ionicons name="home-outline" size={18} color="#fa3605ff" />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Giao tận cửa
              </Text>
              <Pressable onPress={() => setModalVisible3(true)}>
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#b1aeaeff"
                />
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#d1cdcdff" }}>[5.000đ]</Text>
              <Switch onValueChange={toggleSwitch1} value={isEnabled1}></Switch>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d6d3d3ff",
              paddingVertical: 20,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Ionicons
                  name="restaurant-outline"
                  size={18}
                  color="#fa3605ff"
                />
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <Text style={{ fontWeight: 500, fontSize: 16 }}>
                      Lấy dụng cụ ăn uống
                    </Text>
                    <Pressable onPress={() => setModalVisible2(true)}>
                      <Ionicons
                        name="help-circle-outline"
                        size={20}
                        color="#b1aeaeff"
                      />
                    </Pressable>
                  </View>
                  <Text style={{ color: "#c5c2c2ff", maxWidth: 240 }}>
                    Quán sẽ cung cấp dụng cụ ăn uống. Hãy chung tay bảo vệ môi
                    trường trong những đơn hàng tới nhé!
                  </Text>
                </View>
              </View>
            </View>
            <Switch onValueChange={toggleSwitch} value={isEnabled}></Switch>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderColor: "#d6d3d3ff",
              paddingVertical: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="clipboard-outline" size={18} color="#fa3605ff" />
              <Text style={{ fontWeight: 500, fontSize: 16 }}>Ghi chú</Text>
            </View>
            <Pressable
              onPress={() => setModalVisible1(true)}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Text style={{ color: "#d1cdcdff", fontSize: 16 }}>
                {noteLabel}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#d1cdcdff"
              />
            </Pressable>
          </View>
        </View>

        <Text style={{ marginVertical: 10 }}>
          Bằng việc nhấn &quot;Đặt đơn&quot;, bạn đồng ý tuân thủ theo{" "}
          <Text
            style={{ color: "#0040caff" }}
            onPress={() =>
              router.navigate(`/(user)/checkout/terms_of_service/page`)
            }
          >
            Điều khoản dịch vụ
          </Text>{" "}
          và{" "}
          <Text
            style={{ color: "#0040caff" }}
            onPress={() => router.navigate(`/(user)/checkout/regulation/page`)}
          >
            Quy chế
          </Text>
        </Text>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                minHeight: 400,
                borderTopRightRadius: 12,
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
                  Phí áp dụng
                </Text>

                <Pressable onPress={() => setModalVisible(false)}>
                  <Ionicons name="close-outline" size={24} />
                </Pressable>
              </View>
              <View style={{ margin: 10, gap: 15 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderColor: "#dadadaff",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Phí đơn hàng nhỏ</Text>
                    <Text style={{ fontWeight: "bold" }}>3.000đ</Text>
                  </View>
                  <Text style={{ color: "#aaaaaaff" }}>
                    Phí đơn hàng nhỏ áp dụng cho đơn hàng thấp hơn 50.000đ. Bạn
                    vui lòng đặt thêm 15.000đ để loại bỏ phí này.
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Phí dịch vụ</Text>
                    <Text style={{ fontWeight: "bold" }}>3.000đ</Text>
                  </View>
                  <Text style={{ color: "#aaaaaaff" }}>
                    Phí này giúp duy trì và nâng cao chất lượng dịch vụ cũng như
                    cải thiện dịch vụ giao hàng, nâng cấp trải nghiệm ứng dụng
                    và đa dạng quán ăn hơn.
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tổng cộng</Text>
                  <Text style={{ fontWeight: "bold" }}>6.000đ</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible1}>
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

        <Modal animationType="slide" transparent={true} visible={modalVisible2}>
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
                  Dụng cụ ăn uống
                </Text>

                <Pressable onPress={() => setModalVisible2(false)}>
                  <Ionicons name="close-outline" size={24} />
                </Pressable>
              </View>
              <View style={{ margin: 10, gap: 15, alignItems: "center" }}>
                <Image
                  style={{ width: 105, height: 105, borderRadius: 50 }}
                  source={require("@/assets/images/no-plastic.png")}
                />
                <Text style={{ fontWeight: 400, fontSize: 18 }}>
                  Hãy chung tay giảm rác thải!
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#868686ff",
                    fontSize: 15,
                  }}
                >
                  Dù là nhựa, giấy, tre, gỗ hay bất cứ loại chất liệu nào khác,
                  việc sử dụng1 lần rồi bỏ đi sẽ gây tổn hại đến môi trường. Bạn
                  có thể chọn &apos;Không lấy dụng cụ ăn uống&apos; để giảm
                  thiểu rác thải ra môi trường bạn nhé!
                </Text>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible3}>
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
                minHeight: 400,
                borderTopRightRadius: 12,
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
                  Giao tận cửa
                </Text>

                <Pressable onPress={() => setModalVisible3(false)}>
                  <Ionicons name="close-outline" size={24} />
                </Pressable>
              </View>
              <View style={{ margin: 10, gap: 15 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#dadadaff",
                    paddingBottom: 10,
                    minWidth: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Phí gửi xe tại địa chỉ của bạn
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>0đ</Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#dadadaff",
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Phí giao tận cửa</Text>
                    <Text style={{ fontWeight: "bold" }}>5.000đ</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "#dadadaff",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tổng cộng</Text>
                  <Text style={{ fontWeight: "bold" }}>5.000đ</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal animationType="slide" transparent={true} visible={modalVisible4}>
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
                minHeight: 400,
                borderTopRightRadius: 12,
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
                  Giao tận cửa
                </Text>

                <Pressable onPress={() => setModalVisible4(false)}>
                  <Ionicons name="close-outline" size={24} />
                </Pressable>
              </View>
              <View style={{ margin: 10, gap: 15 }}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#dadadaff",
                    paddingBottom: 10,
                    minWidth: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Phí gửi xe tại địa chỉ của bạn
                    </Text>
                    <Text style={{ fontWeight: "bold" }}>0đ</Text>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottomWidth: 1,
                      borderColor: "#dadadaff",
                      paddingBottom: 10,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Phí giao tận cửa</Text>
                    <Text style={{ fontWeight: "bold" }}>5.000đ</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 1,
                    borderColor: "#dadadaff",
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Tổng cộng</Text>
                  <Text style={{ fontWeight: "bold" }}>5.000đ</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View>
          <ToggleButton.Row onValueChange={setValue} value={value}>
            <ToggleButton
              style={{
                flex: 1,
                justifyContent: "center",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#e9e5e5ff",
              }}
              value="cash"
              icon={() => <Text style={{ fontSize: 16 }}>Tiền mặt</Text>}
            />
            <ToggleButton
              style={{
                flex: 1,
                justifyContent: "center",
                borderColor: "#e9e5e5ff",
              }}
              value="momo"
              icon={() => <Text style={{ fontSize: 16 }}>Momo</Text>}
            />
            <ToggleButton
              style={{
                flex: 1,
                justifyContent: "center",
                borderWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderColor: "#e9e5e5ff",
              }}
              value="zalopay"
              icon={() => <Text style={{ fontSize: 16 }}>ZaloPay</Text>}
            />
          </ToggleButton.Row>
        </View>

        <Pressable
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            alignItems: "center",
          }}
          onPress={() =>
            router.navigate(`/(user)/checkout/payment_method/page`)
          }
        >
          <Text
            style={{
              color: "#2b51f8ff",
              fontSize: 16,
              marginVertical: 10,
              fontWeight: "bold",
            }}
          >
            Phương thức thanh toán khác
          </Text>
        </Pressable>

        <Pressable
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: "#ff5f1f",
            alignItems: "center",
          }}
          onPress={handleCheckout}
        >
          <Text
            style={{
              color: "#ffffffff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đặt đơn -{" "}
            {Number(a + b + totalPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
