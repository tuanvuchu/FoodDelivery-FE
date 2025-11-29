import { APP_COLOR } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const getIcons = (routeName: string, focused: boolean, size: number) => {
  let iconName: keyof typeof Ionicons.glyphMap;

  switch (routeName) {
    case "index":
      iconName = focused ? "home" : "home-outline";
      break;
    case "order":
      iconName = focused ? "receipt" : "receipt-outline";
      break;
    case "like":
      iconName = focused ? "heart" : "heart-outline";
      break;
    case "notification":
      iconName = focused ? "notifications" : "notifications-outline";
      break;
    case "account":
      iconName = focused ? "person" : "person-outline";
      break;
    default:
      iconName = "help-circle";
  }

  return (
    <Ionicons
      name={iconName}
      size={size}
      color={focused ? APP_COLOR.ORANGE : "gray"}
    />
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingBottom: 5,
          backgroundColor: "#fff",
        },
        tabBarIcon: ({ focused, size }) => {
          return getIcons(route.name, focused, size);
        },
        tabBarLabelStyle: { paddingBottom: 5 },
        tabBarActiveTintColor: APP_COLOR.ORANGE,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Về đầu trang" }} />
      <Tabs.Screen name="order" options={{ title: "Đơn hàng" }} />
      <Tabs.Screen name="like" options={{ title: "Yêu thích" }} />
      <Tabs.Screen name="notification" options={{ title: "Thông báo" }} />
      <Tabs.Screen name="account" options={{ title: "Tôi" }} />
    </Tabs>
  );
};

export default TabLayout;
