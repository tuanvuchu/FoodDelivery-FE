import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

const backend = process.env.EXPO_PUBLIC_ANDROID_API_URL;

const AccountTab = () => {
  const { appState } = useCurrentApp();
  const baseImage = `${getURLBaseBackend()}/api/v1/uploads`;
  const [vouchers, setVouchers] = useState<number>(0);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch(`${backend}/api/v1/vouchers/count`);
        const data = await res.json();
        setVouchers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVouchers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: 70,
          paddingHorizontal: 20,
          paddingBottom: 20,
          backgroundColor: APP_COLOR.ORANGE,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.navigate("/(user)/account/information")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            alignSelf: "flex-start",
          }}
        >
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={{ uri: `${baseImage}/${appState?.user.image}` }}
          />
          <View>
            <Text style={{ color: "white", fontSize: 20 }}>
              {appState?.user.name}
            </Text>
          </View>
        </Pressable>
        {!appState?.user && (
          <Pressable
            onPress={() => router.navigate("/(auth)/authentication")}
            style={{
              borderRadius: 1,
              borderWidth: 1,
              borderColor: "#fff",
              backgroundColor: "#fff",
              padding: 5,
            }}
          >
            <Text
              style={{
                color: APP_COLOR.ORANGE,
              }}
            >
              Đăng ký / Đăng nhập
            </Text>
          </Pressable>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Pressable
          style={{
            marginTop: 10,
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
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="slack" size={20} color="red" />
            <Text>Trùm Deal</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>

        {appState?.user && (
          <Pressable
            onPress={() => router.navigate("/(user)/account/voucher")}
            style={{
              padding: 10,
              marginHorizontal: 10,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: APP_COLOR.WHITE,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Feather name="gift" size={20} color="darkred" />
              <Text>Ví Voucher</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Text>{vouchers} voucher</Text>
              <MaterialIcons
                name="navigate-next"
                size={24}
                color={APP_COLOR.GREY}
              />
            </View>
          </Pressable>
        )}
        <Pressable
          style={{
            marginHorizontal: 10,
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
            <Feather name="dollar-sign" size={20} color="gold" />
            <Text>Xu</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>

        <Pressable
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="credit-card" size={20} color="darkblue" />
            <Text>Thanh toán</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        <Pressable
          style={{
            marginHorizontal: 10,
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
            <Feather name="map-pin" size={20} color="aqua" />
            <Text>Địa chỉ</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        <Pressable
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            padding: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="mail" size={20} color="blue" />
            <Text>Mời bạn bè</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        <Pressable
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
            <Feather name="shopping-bag" size={20} color="gold" />
            <Text>Ứng dụng cho chủ quán</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        <Pressable
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
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Feather name="help-circle" size={20} color="aqua" />
            <Text>Trung tâm trợ giúp</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
        <Pressable
          onPress={() => router.navigate("/(user)/account/setting")}
          style={{
            marginHorizontal: 10,
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
            <Feather name="settings" size={20} color="blue" />
            <Text>Cài đặt</Text>
          </View>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default AccountTab;
