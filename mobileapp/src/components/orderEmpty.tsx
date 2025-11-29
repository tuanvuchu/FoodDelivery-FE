import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const EmptyOrder = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/icons/flash-deals.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Quên chưa đặt món rồi nè bạn ơi?</Text>
      <Text style={styles.subtitle}>
        Bạn sẽ nhìn thấy các món đang được chuẩn bị hoặc giao đi tại đây để kiểm
        tra đơn hàng nhanh hơn!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 40,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default EmptyOrder;
