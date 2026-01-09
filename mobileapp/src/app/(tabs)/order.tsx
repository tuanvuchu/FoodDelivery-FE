// screens/OrderScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import EmptyOrder from "@/components/orderEmpty";
import { SafeAreaView } from "react-native-safe-area-context";
import { getURLBaseBackend } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import Order from "@/components/order";

const OrderScreen = () => {
  const layout = useWindowDimensions();

  const [shippingOrders, setShippingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const { appState } = useCurrentApp();
  const fetchVouchers = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/orders/${appState?.user.id}`
      );
      const data = await res.json();
      setShippingOrders(data.filter((order) => order.status === "shipping"));
      setDeliveredOrders(data.filter((order) => order.status === "delivered"));
      setCanceledOrders(data.filter((order) => order.status === "canceled"));
    } catch (err) {
      console.error("Lỗi tải voucher:", err);
    }
  };
  const onRefresh = async () => {
    await fetchVouchers();
  };

  useEffect(() => {
    fetchVouchers();
  }, [appState?.user.id]);

  const renderScene = SceneMap({
    shipping: () =>
      appState?.user?.id && shippingOrders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <Order data={shippingOrders} onRefreshData={onRefresh} />
      ),

    delivered: () =>
      appState?.user?.id && deliveredOrders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <Order data={deliveredOrders} onRefreshData={onRefresh} />
      ),

    canceled: () =>
      appState?.user?.id && canceledOrders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <Order data={canceledOrders} onRefreshData={onRefresh} />
      ),
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "shipping", title: "Đang đến" },
    { key: "delivered", title: "Deal đã mua" },
    { key: "canceled", title: "Đã hủy" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      labelStyle={styles.label}
      activeColor="#E53935"
      inactiveColor="#666"
      tabStyle={styles.tabStyle}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  tabbar: {
    backgroundColor: "white",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  indicator: {
    backgroundColor: "#E53935",
    height: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "none",
  },
  tabStyle: {
    width: "auto",
    paddingHorizontal: 10,
  },
});

export default OrderScreen;
