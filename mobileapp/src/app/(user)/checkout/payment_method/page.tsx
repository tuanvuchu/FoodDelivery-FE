import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const [method, setMethod] = useState("vnpay");

  const methods = [
    {
      id: "vnpay",
      title: "VNPay",
      icon: "wallet-outline",
      color: "",
      selected: method === "vnpay",
    },
    {
      id: "cash",
      title: "Tiền mặt",
      icon: "cash-outline",
      color: "#ec3305ff",
      selected: method === "cash",
    },
    {
      id: "creditcard",
      title: "Thẻ tín dụng/Ghi nợ",
      icon: "card-outline",
      color: "#0400ffff",
      selected: method === "creditcard",
    },
    {
      id: "atm",
      title: "ATM/Internet Banking",
      icon: "wallet-outline",
      color: "",
      selected: method === "atm",
    },
  ];

  const handleConfirm = () => {
    Alert.alert("Xác nhận", "Thanh toán thành công!");
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={{ flex: 1, padding: 16 }}>
        {methods.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => setMethod(item.id)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#f0f0f0ff",
              }}
            >
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text>{item.title}</Text>
              </View>

              {method === item.id && (
                <Ionicons name="checkmark-circle" size={20} color="#ec5712ff" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
        }}
      >
        <Pressable
          style={{
            paddingVertical: 12,
            borderRadius: 2,
            backgroundColor: "#c90303ff",
            alignItems: "center",
          }}
          onPress={handleConfirm}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Xác nhận
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
