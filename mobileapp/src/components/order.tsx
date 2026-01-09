import { getURLBaseBackend } from "@/utils/api";
import { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import OrderDetailModal from "./orderDetailModal";

export default function Order({ data = [], onRefreshData }) {
  const [open, setOpen] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  return (
    <>
      <OrderDetailModal
        open={open}
        orderId={selectedOrderId}
        onClose={() => setOpen(false)}
      />

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await onRefreshData?.();
              setRefreshing(false);
            }}
          />
        }
        renderItem={({ item }) => {
          const orderItem = item?.order_items?.[0];
          const product = orderItem?.products;
          const restaurant = product?.restaurants;

          return (
            <Pressable
              onPress={() => {
                setSelectedOrderId(item.id);
                setOpen(true);
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  flexDirection: "row",
                  backgroundColor: "#ffffffff",
                  margin: 5,
                }}
              >
                <Image
                  source={{
                    uri: `${getURLBaseBackend()}/api/v1/uploads/${
                      restaurant.image
                    }`,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                />

                <View
                  style={{
                    justifyContent: "space-between",
                    padding: 10,
                    flex: 1,
                  }}
                >
                  <Text ellipsizeMode="tail" style={{ fontWeight: "500" }}>
                    {restaurant?.name}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 12, color: "#555" }}
                  >
                    {restaurant?.address}
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {Number(item.total).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>

                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      ({item.order_items.length} món)
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </>
  );
}
