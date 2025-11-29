import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { format, parseISO } from "date-fns";

const backend = process.env.EXPO_PUBLIC_ANDROID_API_URL;
const VoucherDetail = () => {
  const { id } = useLocalSearchParams();
  const [voucher, setVouchers] = useState<any>(null);

  function convertDate(dateIp: string) {
    const date = parseISO(dateIp);
    const formatted = format(date, "dd/MM/yyyy HH:mm:ss");
    return formatted;
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch(`${backend}/api/v1/vouchers/${id}`);
        const data = await res.json();
        setVouchers(data);
      } catch (err) {
        console.error("Lỗi tải voucher:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.voucherCard}>
        <View style={styles.cardHeader}>
          <Image
            source={require("@/assets/images/voucher.png")}
            style={{ height: 100, width: 100 }}
          />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{voucher.description}</Text>
            <Text style={styles.cardNote}>Ưu đãi có hạn</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Mã voucher</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
            }}
          >
            <Text style={styles.detailValue}>{voucher.code}</Text>
            <TouchableOpacity>
              <Text style={styles.copyText}>Sao chép</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.detailLabel}>Hạn sử dụng</Text>
          <Text style={styles.detailValue}>
            {convertDate(voucher.start_date)} - {convertDate(voucher.end_date)}
          </Text>

          <Text style={styles.detailLabel}>Quán áp dụng</Text>
          <Text style={styles.detailValue}>QUÁN CHỌN LỌC</Text>

          <Text style={styles.detailLabel}>Phương thức giao hàng</Text>
          <Text style={styles.detailValue}>Giao hàng</Text>

          <Text style={styles.detailLabel}>Điều kiện</Text>
          <Text style={styles.detailValue}>{voucher.min_order_value}đ</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.useText}>Dùng ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  voucherCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  cardText: { marginLeft: 10, justifyContent: "center", width: "70%" },
  cardTitle: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  cardNote: {
    color: "red",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "red",
    padding: 3,
    alignSelf: "flex-start",
  },
  detailsContainer: { padding: 10 },
  detailValue: {
    fontSize: 14,
    color: "#666",
    paddingRight: 10,
    marginVertical: 6,
  },
  copyText: { color: "#1e90ff", fontSize: 14 },

  detailLabel: { fontSize: 16, color: "#333", marginTop: 5 },
  useButton: {
    backgroundColor: "#ff4500",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    margin: 8,
  },
  useText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default VoucherDetail;
