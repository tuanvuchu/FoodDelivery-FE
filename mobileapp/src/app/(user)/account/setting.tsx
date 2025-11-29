import ShareButton from "@/components/share.button";
import { APP_COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

const SettingPage = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      router.replace("/(auth)/authentication");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={{ paddingLeft: 10, paddingVertical: 6 }}>
        Cài đặt ứng dụng
      </Text>
      <Pressable
        style={{
          marginHorizontal: 10,
          padding: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          borderRadius: 10,
          alignItems: "center",
          backgroundColor: APP_COLOR.WHITE,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text>Đổi ngôn ngữ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              paddingBottom: 3,
            }}
          >
            Tiếng Việt
          </Text>
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </View>
      </Pressable>
      <Text style={{ paddingLeft: 10, paddingVertical: 6 }}>
        Chính sách quy định
      </Text>
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
          <Text>Chính sách bảo mật</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>
      <Pressable
        style={{
          marginHorizontal: 10,
          padding: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: APP_COLOR.WHITE,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text>Quy chế</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>
      <Pressable
        style={{
          marginHorizontal: 10,
          padding: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: APP_COLOR.WHITE,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Text>Điều khoản sử dụng</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
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
          <Text>Chính sách giải quyết tranh chấp</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>
      <Text style={{ paddingLeft: 10, paddingVertical: 6 }}>Hỗ trợ</Text>
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
          <Text>Yêu cầu xóa tài khoản</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
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
          <Text>Về UFood</Text>
        </View>
        <MaterialIcons name="navigate-next" size={24} color={APP_COLOR.GREY} />
      </Pressable>

      <View style={{ gap: 15 }}>
        <ShareButton
          title="Đăng xuất"
          buttonStyle={{
            justifyContent: "center",
            paddingVertical: 10,
            marginHorizontal: 10,
          }}
          onPress={handleLogout}
        />
        <Text style={{ textAlign: "center", color: APP_COLOR.GREY }}>
          Phiên bản: 1.0.0
        </Text>
      </View>
    </View>
  );
};

export default SettingPage;
