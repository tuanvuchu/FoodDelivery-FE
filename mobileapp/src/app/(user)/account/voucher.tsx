import { getURLBaseBackend } from "@/utils/api";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

type VoucherCardProps = {
  id: string;
  title: string;
  discount?: string;
  minSpend?: string;
  expiry: string;
};
const VoucherCard = ({
  id,
  title,
  discount,
  minSpend,
  expiry,
}: VoucherCardProps) => (
  <View style={styles.card}>
    <View>
      <Image
        source={require("@/assets/images/voucher.png")}
        style={{ height: 100, width: 100 }}
      />
    </View>
    <View style={styles.details}>
      <Text style={styles.title}>{title}</Text>
      {minSpend && <Text style={styles.minSpend}>{minSpend}</Text>}
      <Text style={styles.cardNote}>Ưu đãi có hạn</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Text style={styles.expiry}>HSD: {expiry}</Text>
        <Pressable
          onPress={() => router.navigate(`/(user)/account/voucher/${id}`)}
        >
          <Text style={{ fontSize: 12, color: "#1e90ff" }}>Điều kiện</Text>
        </Pressable>
      </View>
    </View>
    <TouchableOpacity style={styles.useButton}>
      <Text style={styles.useText}>Dùng ngay</Text>
    </TouchableOpacity>
  </View>
);

const VoucherPage = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "all", title: "Tất cả" },
    { key: "product", title: "Giảm giá món" },
    { key: "shipping", title: "Phí vận chuyển" },
  ]);

  const [vouchers, setVouchers] = useState<any[]>([]);
  const [vouchers1, setVouchers1] = useState<any[]>([]);
  const [vouchers2, setVouchers2] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch(`${getURLBaseBackend()}/api/v1/vouchers`);
        const data = await res.json();
        setVouchers(data);
        setVouchers1(data.filter((v) => v.category === "product"));
        setVouchers2(data.filter((v) => v.category === "shipping"));
      } catch (err) {
        console.error("Lỗi tải voucher:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const AllTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.voucherList}>
        {vouchers.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            id={voucher.id}
            title={voucher.description || voucher.code}
            discount={`Giảm ${Number(voucher.discount_value).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              },
            )}${voucher.discount_type === "percent" ? "%" : ""}`}
            minSpend={`Đơn từ ${
              Number(voucher.min_order_value).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || "0đ"
            }`}
            expiry={
              voucher.end_date
                ? new Date(voucher.end_date).toLocaleDateString("vi-VN")
                : "Không giới hạn"
            }
          />
        ))}
      </ScrollView>
    </View>
  );

  const ProductTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.voucherList}>
        {vouchers1.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            id={voucher.id}
            title={voucher.description || voucher.code}
            discount={`Giảm ${Number(voucher.discount_value).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              },
            )}${voucher.discount_type === "percent" ? "%" : ""}`}
            minSpend={`Đơn từ ${
              Number(voucher.min_order_value).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || "0đ"
            }`}
            expiry={
              voucher.end_date
                ? new Date(voucher.end_date).toLocaleDateString("vi-VN")
                : "Không giới hạn"
            }
          />
        ))}
      </ScrollView>
    </View>
  );

  const ShippingTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.voucherList}>
        {vouchers2.map((voucher) => (
          <VoucherCard
            key={voucher.id}
            id={voucher.id}
            title={voucher.description || voucher.code}
            discount={`Giảm ${Number(voucher.discount_value).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              },
            )}${voucher.discount_type === "percent" ? "%" : ""}`}
            minSpend={`Đơn từ ${
              Number(voucher.min_order_value).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || "0đ"
            }`}
            expiry={
              voucher.end_date
                ? new Date(voucher.end_date).toLocaleDateString("vi-VN")
                : "Không giới hạn"
            }
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    all: AllTab,
    product: ProductTab,
    shipping: ShippingTab,
  });
  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#E53935", height: 3 }}
      style={{
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
      }}
      labelStyle={{
        fontSize: 14,
        fontWeight: "600",
        textTransform: "none",
      }}
      activeColor="#E53935"
      inactiveColor="#666"
    />
  );
  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff4500",
    padding: 10,
    justifyContent: "space-between",
  },
  cardNote: {
    color: "red",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "red",
    padding: 3,
    alignSelf: "flex-start",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  history: { color: "#fff", fontSize: 16 },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  activeTab: { fontWeight: "bold", color: "#ff4500" },
  tab: { color: "#666" },
  voucherList: { padding: 10 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
  },
  details: { flex: 1, paddingLeft: 10 },
  title: { fontSize: 16, color: "#333" },
  discount: { fontSize: 14, color: "#666" },
  minSpend: { fontSize: 12, color: "#999" },
  expiry: { fontSize: 12, color: "#999", paddingRight: 5 },
  useButton: {
    backgroundColor: "#ff4500",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  useText: { color: "#fff", fontSize: 12 },
});

export default VoucherPage;
