import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constants";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Linking, Pressable, Text, View } from "react-native";
import MapView from "react-native-maps";

export default function RestaurantDetailPage() {
  const { restaurant } = useCurrentApp();

  return (
    <>
      <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>
          {restaurant?.name}
        </Text>
        <View
          style={{
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
          }}
        >
          <View
            style={{ gap: 3, flexDirection: "row", alignSelf: "flex-start" }}
          >
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <AntDesign name="star" size={15} color="orange" />
            <Text>{restaurant?.averageRating} (100+ Bình Luận) </Text>
          </View>
          <Text style={{ borderLeftWidth: 1, borderColor: "#b1b1b1ff" }}>
            {"  "}
            <Ionicons name="time-outline" size={15} /> 25 phút
          </Text>
        </View>
        <View style={{ maxHeight: 120 }}>
          <MapView
            initialRegion={{
              latitude: 10.7769,
              longitude: 106.7009,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            rotateEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            pointerEvents="none"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Pressable
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                restaurant?.address,
              )}`,
            );
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Ionicons name="navigate" size={20} color="#3e41f1ff" />
              <Text style={{ maxWidth: 290 }}>{restaurant?.address}</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={24}
              color={APP_COLOR.GREY}
            />
          </View>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <Ionicons name="layers" size={20} color="#3e41f1ff" />
          <Text>Phân loại: {restaurant?.type}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            gap: 10,
          }}
        >
          <Ionicons name="time-outline" size={20} color="#3e41f1ff" />
          <Text>Giờ mở cửa: </Text>
        </View>
        {restaurant.restaurant_opening_hours.map((time) => (
          <View
            key={time.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              paddingLeft: 30,
            }}
          >
            <View style={{ flexDirection: "row", gap: 60 }}>
              <Text style={{ minWidth: 100, color: "#a7a6a6ff" }}>
                {time.day}
              </Text>
              <Text style={{ color: "#a7a6a6ff" }}>
                {new Date(time.open_time).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Ho_Chi_Minh",
                })}{" "}
                -{" "}
                {new Date(time.close_time).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: "Asia/Ho_Chi_Minh",
                })}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
