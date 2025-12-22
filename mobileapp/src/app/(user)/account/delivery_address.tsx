import ShareButton from "@/components/share.button";
import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constants";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DeliveryAddress() {
  const { appState } = useCurrentApp();

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Pressable
          onPress={() =>
            router.navigate("/(user)/account/add_delivery_address")
          }
          style={{
            marginHorizontal: 10,
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <View>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Feather name="home" size={20} />
              {appState?.user ? (
                <Text>Nhà</Text>
              ) : (
                <Text>Thêm địa chỉ nhà</Text>
              )}
            </View>
            {appState?.user && (
              <View style={{ marginLeft: 30, width: 250 }}>
                <Text style={{ color: "gray" }}>
                  {appState.user.delivery_address[0].address}
                </Text>
                <Text>
                  {appState.user.name}
                  {"     "}
                  {appState.user.phone}
                </Text>
              </View>
            )}
          </View>
          {appState?.user ? (
            <Text>Sửa</Text>
          ) : (
            <MaterialIcons
              name="navigate-next"
              size={24}
              color={APP_COLOR.GREY}
            />
          )}
        </Pressable>
        <Pressable
          onPress={() =>
            router.navigate("/(user)/account/add_delivery_address")
          }
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: "center",
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="briefcase" size={20} />

            <Text>Thêm địa chỉ Công ty</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        <ShareButton
          title="Thêm địa chỉ mới"
          buttonStyle={{
            justifyContent: "center",
            paddingVertical: 10,
            marginHorizontal: 10,
            backgroundColor: APP_COLOR.ORANGE,
          }}
          textStyle={{
            color: "white",
          }}
          onPress={() =>
            router.navigate("/(user)/account/add_delivery_address")
          }
        />
      </View>
    </View>
  );
}
