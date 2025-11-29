import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import ShareButton from "./share.button";
import { useState } from "react";

type CartDrawerProps = {
  Screen: React.ComponentType<any>;
};
export default function CartDrawer({ Screen }: CartDrawerProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                fontWeight: "600",
                textAlign: "center",
                borderBottomWidth: 1,
              }}
            >
              Thêm món mới
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
              }}
            >
              <View>
                <Image
                  source={require("../assets/images/apple.png")}
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
                  style={{ width: 125 }}
                >
                  name
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ width: 125 }}
                >
                  mô tả
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#e93434ff" }}>9999 đồng</Text>
                  <Pressable
                    onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    <Feather name="minus-square" size={30} color="#e93434ff" />
                  </Pressable>
                  <Text>{quantity}</Text>
                  <Pressable onPress={() => setQuantity(quantity + 1)}>
                    <Feather name="plus-square" size={30} color="#e93434ff" />
                  </Pressable>
                </View>
              </View>
            </View>

            <Text>SIZE</Text>
            <View></View>
          </View>

          <ShareButton
            title="Thêm vào giỏ hàng"
            textStyle={{ color: "#fff" }}
            buttonStyle={{
              justifyContent: "center",
              paddingVertical: 5,
              marginHorizontal: 5,
              backgroundColor: "#ff4800ff",
            }}
          />
        </View>
      )}
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: { width: "80%" },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Cart" component={Screen} />
    </Drawer.Navigator>
  );
}
