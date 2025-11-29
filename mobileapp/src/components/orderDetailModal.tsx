import { getURLBaseBackend } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";

export default function OrderDetailModal({ data = [], open = false, onClose }) {
  return (
    <Modal animationType="slide" transparent visible={open}>
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
            minHeight: 400,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: "#dadadaff",
              borderBottomWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 10,
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

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  margin: 5,
                  borderRadius: 10,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#eee",
                }}
              >
                <Image
                  source={{
                    uri: `${getURLBaseBackend()}/api/v1/uploads/${item.image}`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />

                <View
                  style={{ flex: 1, padding: 10, justifyContent: "center" }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: "500",
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ fontWeight: "bold", color: "#e74c3c" }}>
                    {Number(item.total).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
