import { getURLBaseBackend } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";

export default function OrderDetailModal({ orderId, open = false, onClose }) {
  const [order, setOrder] = useState(null);
  const test = {
    shipping: "Đang giao",
    delivered: "Đã giao",
    canceled: "Đã hủy",
  };

  useEffect(() => {
    if (!open || !orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${getURLBaseBackend()}/api/v1/orders/get-test?id=${orderId}`
        );
        const json = await res.json();
        setOrder(json);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [open, orderId]);

  if (!order) return null;

  return (
    <Modal animationType="slide" transparent visible={open}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            maxHeight: "90%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 1,
              borderColor: "#eee",
              padding: 12,
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
              Chi tiết đơn hàng
            </Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close-outline" size={26} />
            </Pressable>
          </View>

          <View style={{ padding: 12 }}>
            <Text>Mã đơn: {order.id}</Text>
            <Text>Trạng thái: {test[order.status] || order.status}</Text>
            <Text>Thanh toán: {order.payment_method}</Text>
            <Text>
              Ngày đặt: {new Date(order.created_at).toLocaleString("vi-VN")}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 12, paddingBottom: 10 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
              Thông tin nhận hàng
            </Text>
            <Text>{order.users.name}</Text>
            <Text>{order.users.phone}</Text>
            <Text>
              {order.users.delivery_address?.[0]?.address ||
                order.users.address}
            </Text>
          </View>

          <FlatList
            data={order.order_items}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 10,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: "#eee",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{
                    uri: `${getURLBaseBackend()}/api/v1/uploads/${
                      item.products.image
                    }`,
                  }}
                  style={{ width: 90, height: 90 }}
                />

                <View style={{ flex: 1, padding: 10 }}>
                  <Text numberOfLines={1} style={{ fontWeight: "500" }}>
                    {item.products.name}
                  </Text>

                  <Text>Số lượng: {item.quantity}</Text>

                  <Text style={{ color: "#e74c3c", fontWeight: "bold" }}>
                    {Number(item.total_price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </View>
              </View>
            )}
          />

          <View
            style={{
              padding: 12,
              borderTopWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Tổng tiền:{" "}
              {Number(order.total).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
