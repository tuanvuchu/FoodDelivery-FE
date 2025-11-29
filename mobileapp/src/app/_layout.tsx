import AppProvider from "context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, ErrorBoundaryProps } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { APP_COLOR } from "@/utils/constants";
import { SafeAreaView } from "react-native-safe-area-context";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F8" }}>
      <View
        style={{
          flex: 1,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#FEE2E2",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 50 }}>❌</Text>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 15,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
            marginBottom: 30,
            borderWidth: 1,
            borderColor: "#FECACA",
          }}
        >
          <Text
            style={{
              color: "#B91C1C",
              fontSize: 22,
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Không thể kết nối
          </Text>

          <Text
            style={{
              color: "#4B5563",
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Lỗi mạng
          </Text>

          <View
            style={{
              backgroundColor: "#FEF2F2",
              padding: 12,
              borderRadius: 8,
              borderLeftWidth: 4,
              borderLeftColor: "#EF4444",
            }}
          >
            <Text style={{ color: "#7F1D1D", fontSize: 14 }}>
              {props.error.message}
            </Text>
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#EF4444",
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
            onPress={props.retry}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Thử lại
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const RootLayout = () => {
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      Background: "white",
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <AppProvider>
          <ThemeProvider value={navTheme}>
            <Stack
              screenOptions={{
                headerTintColor: APP_COLOR.ORANGE,
                headerTitleStyle: {
                  color: "black",
                },
                headerTitleAlign: "center",
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/authentication"
                options={{ headerTitle: "Đăng nhập / Đăng ký" }}
              />
              <Stack.Screen
                name="(auth)/search"
                options={{ headerShown: false, animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="(auth)/restaurants"
                options={{ headerShown: false, animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="(auth)/popup.sale"
                options={{
                  headerShown: false,
                  animation: "fade",
                  presentation: "transparentModal",
                }}
              />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(user)/product/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(user)/account/information"
                options={{ headerTitle: "Sửa Hồ sơ" }}
              />
              <Stack.Screen
                name="(user)/account/setting"
                options={{ headerTitle: "Cài đặt" }}
              />
              <Stack.Screen
                name="(user)/checkout/payment_method/page"
                options={{ headerTitle: "Phương thức thanh toán" }}
              />
              <Stack.Screen
                name="(user)/checkout/page"
                options={{ headerTitle: "Xác nhận đơn hàng" }}
              />
              <Stack.Screen
                name="(user)/order_detail/page"
                options={{ headerTitle: "Chi tiết đơn hàng" }}
              />
              <Stack.Screen
                name="(user)/account/voucher"
                options={{ headerTitle: "Ví Voucher" }}
              />
              <Stack.Screen
                name="(user)/account/voucher/[id]"
                options={{ headerTitle: "Chi tiết voucher" }}
              />
              <Stack.Screen
                name="(user)/restaurant/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(user)/restaurant/restaurant_detail/[id]"
                options={{ headerTitle: "Thông tin" }}
              />
            </Stack>
          </ThemeProvider>
        </AppProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
