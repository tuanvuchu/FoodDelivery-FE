import StickyHeader from "@/components/favorite";
import { useCurrentApp } from "@/context/app.context";
import { getLikeRestaurantAPI, getURLBaseBackend } from "@/utils/api";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LikeTab = () => {
  const { appState } = useCurrentApp();
  const [likeRestaurant, setLikeRestaurant] = useState<IRestaurant[]>([]);
  //refresh
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchRestaurants = async () => {
    const res = await getLikeRestaurantAPI(appState?.user.id);
    if (res) setLikeRestaurant(res);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRestaurants();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 12,
          }}
        >
          Yêu thích
        </Text>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={
            likeRestaurant.length === 0
              ? {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {}
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {likeRestaurant.length === 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="restaurant-outline"
                size={100}
                color="#ff5100ff"
              />
              <Text style={{ fontWeight: "bold" }}>
                Yêu Quán từ món đầu tiên
              </Text>
              <Text style={{ maxWidth: 290, textAlign: "center" }}>
                Món ngon hấp dẫn chiếm trọn trái tim! Thả tim ngay để lưu quán
                bạn yêu nhé.
              </Text>
            </View>
          ) : (
            likeRestaurant.map((fav) => {
              const restaurant = fav.restaurants;
              return (
                <View
                  key={fav.id}
                  style={{
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: "#fff",
                    backgroundColor: "#fff",
                  }}
                >
                  <Pressable
                    onPress={() =>
                      router.navigate(`/(user)/restaurant/${restaurant.id}`)
                    }
                  >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                      <Image
                        style={{ height: 100, width: 100 }}
                        source={{
                          uri: `${getURLBaseBackend()}/api/v1/uploads/${
                            restaurant.image
                          }`,
                        }}
                      />
                      <View style={{ gap: 10 }}>
                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{
                            fontWeight: "700",
                            fontSize: 20,
                            maxWidth: 200,
                          }}
                        >
                          {restaurant.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text>
                            <AntDesign name="star" size={15} color="orange" />
                            {"  "}
                            {restaurant.average_rating}
                          </Text>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              borderLeftWidth: 1,
                              borderRightWidth: 1,
                              borderColor: "#bbb8b8ff",
                            }}
                          >
                            2,9km
                          </Text>
                          <Text>27 phút</Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Text style={styles.cardNote}>Ưu đãi có hạn</Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>

                  <View style={{ alignItems: "flex-end", marginTop: 8 }}>
                    <StickyHeader
                      restaurant_id={restaurant.id}
                      isLiked={true}
                    />
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardNote: {
    color: "red",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "red",
    padding: 3,
    alignSelf: "flex-start",
  },
});
export default LikeTab;
