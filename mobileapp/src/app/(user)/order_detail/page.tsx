import { getURLBaseBackend } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const pricing = {
  deliveryFee: 16000,
  serviceFee: 6000,
  discount: -2320,
};

const OrderDetailsScreen = () => {
  const [orderData, setOrderData] = useState<any>(null);

  async function get() {
    try {
      const res = await fetch(`${getURLBaseBackend()}/api/v1/orders/new`);
      const data = await res.json();
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  if (!orderData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  const totalItems = orderData.order_items?.length || 0;
  const subtotal = orderData.total || 0;
  const finalTotal =
    subtotal + pricing.deliveryFee + pricing.serviceFee + pricing.discount;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.deliveryTime}>Dự kiến giao lúc 11h</Text>
        <Text style={styles.orderStatusTitle}>
          {orderData.status === "shipping" ? "Đang giao hàng" : "Đã đặt đơn"}
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressIconContainer, styles.activeStep]}>
            <Ionicons name="receipt-outline" size={20} color="#fff" />
          </View>
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressIconContainer,
              orderData.status === "shipping" && styles.activeStep,
            ]}
          >
            <Ionicons name="cube-outline" size={20} color="#fff" />
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressIconContainer}>
            <Ionicons name="bicycle-outline" size={20} color="#ccc" />
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressIconContainer}>
            <Ionicons name="home-outline" size={20} color="#ccc" />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.locationRow}>
          <Ionicons
            name="ellipse"
            size={12}
            color="#E53935"
            style={styles.locationIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Từ</Text>
            <Text style={styles.locationName}>
              Highlands Coffee - Hateco Apollo
            </Text>
            <Text style={styles.locationAddress}>
              BT02 Hateco Apollo, Xuân Phương, Nam Từ Liêm, Hà Nội
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>

        <View style={styles.dottedLine} />

        <View style={styles.locationRow}>
          <Ionicons
            name="ellipse"
            size={12}
            color="#4CAF50"
            style={styles.locationIcon}
          />
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>Đến</Text>
            <Text style={styles.locationName}>
              38 Đ. Đi Ái, Xuân Phương, Từ Liêm, Hà Nội
            </Text>
            <Text style={styles.locationAddress}>0.......36</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chi tiết đơn hàng</Text>
        {orderData.order_items.map((item, i) => (
          <View key={i} style={styles.itemRow}>
            <Image
              source={{
                uri: `${getURLBaseBackend()}/api/v1/uploads/${
                  item.products?.image
                }`,
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                {item.quantity} x {item.products?.name}
              </Text>
            </View>
            <Text style={styles.itemPrice}>
              {Number(item.unit_price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Tổng ({totalItems} món)</Text>
          <Text style={styles.priceValue}>
            {subtotal.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Phí giao hàng (1.6 km)</Text>
          <Text style={styles.priceValue}>
            {pricing.deliveryFee.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            Phí áp dụng{" "}
            <Ionicons
              name="information-circle-outline"
              size={14}
              color="#888"
            />
          </Text>
          <Text style={styles.priceValue}>
            {pricing.serviceFee.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Giảm giá</Text>
          <Text style={styles.priceValue}>
            {pricing.discount.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Thanh toán</Text>
          <Text style={styles.totalValue}>
            {finalTotal.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  orderStatusTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 20,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  progressIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    backgroundColor: "#D32F2F",
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E0E0E0",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  locationIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#888",
  },
  locationName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },
  locationAddress: {
    fontSize: 14,
    color: "#666",
  },
  dottedLine: {
    height: 20,
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#CCC",
    borderStyle: "dashed",
    marginLeft: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "500",
  },
  itemSize: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "500",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 15,
    color: "#666",
  },
  priceValue: {
    fontSize: 15,
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D32F2F",
  },
});

export default OrderDetailsScreen;
