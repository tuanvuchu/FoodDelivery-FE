import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HeaderHome from "@/components/header.home";
import TopList from "@/components/top.list";
import BannerHome from "@/components/banner.home";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import HomeCard from "@/components/homeCard";
import { getURLBaseBackend } from "@/utils/api";

const HomeTab = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [searchValue, setSearchValue] = useState("Bạn muốn thấy thứ gì");

  const [fiveStar, setFiveStar] = useState([]);
  const [fiveStar1, setFiveStar1] = useState([]);
  const [fiveStar2, setFiveStar2] = useState([]);
  const [fiveStar3, setFiveStar3] = useState([]);
  const [aa, setAa] = useState([]);

  const fetchFiveStar = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/restaurants/five-star-restaurants`
      );
      const data = await res.json();
      setFiveStar(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFiveStar1 = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/restaurants/top-rating`
      );
      const data = await res.json();
      setFiveStar1(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFiveStar2 = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/restaurants/top-rating`
      );
      const data = await res.json();
      setFiveStar2(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFiveStar3 = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/restaurants/top-rating`
      );
      const data = await res.json();
      setFiveStar3(data);
    } catch (error) {
      console.error(error);
    }
  };

  const a = async () => {
    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/products/get-all-admin`
      );
      const data = await res.json();
      const random = data.sort(() => 0.5 - Math.random()).slice(0, 15);
      setAa(random);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiveStar();
    fetchFiveStar1();
    fetchFiveStar2();
    fetchFiveStar3();
    a();
    setTimeout(() => {
      router.navigate("/(auth)/popup.sale");
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderHome
        scrollY={scrollY}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <BannerHome />
        <TopList />
        <LinearGradient
          colors={["#e05f5fff", "#fff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            margin: 10,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.searchText}>TRÙM DEAL NGON UFOOD </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#fff" }}>Xem thêm</Text>
              <MaterialIcons name="navigate-next" size={24} color="#fff" />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View
              style={{
                width: 100,
                borderColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: 5,
              }}
            >
              <Image
                style={{ width: 90, height: 90, position: "relative" }}
                source={require("@/assets/images/ga_ran1.png")}
                accessibilityLabel="Google icon"
              />
              <Text
                style={{
                  borderWidth: 1,
                  backgroundColor: "yellow",
                  color: "orange",
                  padding: 2,
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                -30%
              </Text>
              <View style={{ backgroundColor: "#fff" }}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  Gà rán Popeyes
                </Text>
                <Text
                  style={{ fontWeight: "700" }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  COMBO GÀ GIÒN & POPCORN (TRÙM DEAL)
                </Text>
                <Text
                  style={{ color: "#e01616ff" }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  68.000đ{" "}
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "gray",
                    }}
                  >
                    114.000đ
                  </Text>
                </Text>
              </View>
            </View>
            <View style={{ gap: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                }}
              >
                <Image
                  style={{ width: 80, height: 80, position: "relative" }}
                  source={require("@/assets/images/mi_hai_san.png")}
                  accessibilityLabel="Google icon"
                />
                <Text
                  style={{
                    borderWidth: 1,
                    backgroundColor: "yellow",
                    color: "orange",
                    padding: 2,
                    position: "absolute",
                    top: 0,
                    left: 50,
                  }}
                >
                  -30%
                </Text>
                <View style={{ marginLeft: 10, backgroundColor: "#fff" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ maxWidth: 120 }}
                  >
                    Mì cay Sasin
                  </Text>
                  <Text
                    style={{ fontWeight: "700" }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    MÌ KIM CHI HẢI SẢN
                  </Text>
                  <Text
                    style={{ color: "#e01616ff", marginTop: 30 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    21.000đ{" "}
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "gray",
                      }}
                    >
                      30.000đ
                    </Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1,
                }}
              >
                <Image
                  style={{ width: 80, height: 80, position: "relative" }}
                  source={require("@/assets/images/banh_trang1.png")}
                />
                <Text
                  style={{
                    borderWidth: 1,
                    backgroundColor: "yellow",
                    color: "orange",
                    padding: 2,
                    position: "absolute",
                    top: 0,
                    left: 50,
                  }}
                >
                  -30%
                </Text>
                <View style={{ marginLeft: 10, backgroundColor: "#fff" }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ maxWidth: 120 }}
                  >
                    Đạo Bánh Tráng - Ăn Vặt - Phú Nhuận
                  </Text>
                  <Text
                    style={{ fontWeight: "700", maxWidth: 130 }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    Bánh Tráng Tỏi Hành Phi/ Tỏi Phi/ Hành Phi
                  </Text>
                  <Text
                    style={{ color: "#e01616ff", marginTop: 30 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    21.000đ{" "}
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "gray",
                      }}
                    >
                      30.000đ
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            margin: 10,
            borderRadius: 15,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#e24444ff", fontWeight: "700" }}>
              Bộ sưu tập
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#636363ff" }}>Xem thêm</Text>
              <MaterialIcons name="navigate-next" size={24} color="#636363ff" />
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: "33%",
                borderColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: 5,
              }}
            >
              <Image
                style={{ width: 90, height: 90 }}
                source={require("@/assets/images/banh_trung_thu.png")}
              />
              <Text numberOfLines={2} ellipsizeMode="tail">
                Đêm hội trăng rằm
              </Text>
            </View>
            <View
              style={{
                width: "33%",
                borderColor: "#fff",
                borderRadius: 10,
                borderWidth: 1,
                marginLeft: 5,
              }}
            >
              <Image
                style={{ width: 90, height: 90 }}
                source={require("../../assets/images/pepsi.png")}
                accessibilityLabel="Google icon"
              />
              <Text numberOfLines={2} ellipsizeMode="tail">
                Ăn ngon hơn cùng Pepsi
              </Text>
            </View>
            <View>
              <View style={{ alignItems: "center" }}>
                <MaterialIcons
                  name="navigate-next"
                  size={24}
                  color="#e72e2eff"
                  style={{
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: "#e72e2eff",
                  }}
                />
                <Text style={{ color: "#e72e2eff" }}>Xem thêm</Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            margin: 10,
            borderRadius: 15,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: "#e24444ff", fontWeight: "700" }}>
                Flash Sale
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#636363ff" }}>Xem thêm</Text>
              <MaterialIcons name="navigate-next" size={24} color="#636363ff" />
            </View>
          </View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={aa}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.navigate(`/(user)/restaurant/${item.restaurants.id}`)
                }
              >
                <View
                  style={{
                    padding: 5,
                    width: 100,
                    alignItems: "center",
                    margin: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#fff",
                  }}
                >
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${
                        item.image
                      }`,
                    }}
                    style={{ height: 100, width: 100, position: "relative" }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      top: 5,
                      right: -1,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "right",
                        borderWidth: 1,
                        backgroundColor: "yellow",
                        borderColor: "yellow",
                        color: "orange",
                        position: "relative",
                        minWidth: 40,
                      }}
                    >
                      {Math.floor(Math.random() * (90 - 10 + 1)) + 10}%
                    </Text>
                    <MaterialIcons
                      style={{ position: "absolute", top: -5, left: -14 }}
                      name="bolt"
                      size={28}
                      color="#f84949ff"
                    />
                  </View>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ textAlign: "center" }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    {Number(item.price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        borderTopLeftRadius: 30,
                        borderBottomLeftRadius: 30,
                        backgroundColor: "#ff0000ff",
                        marginTop: 5,
                      }}
                    >
                      {"    "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "500",
                        color: "#fff",
                        borderTopRightRadius: 30,
                        borderBottomRightRadius: 30,
                        backgroundColor: "#f87b7bff",
                        marginTop: 5,
                        paddingTop: 3,
                        paddingRight: 5,
                      }}
                    >
                      ĐANG BÁN CHẠY
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
        <HomeCard
          title1="Top Quán Rating 5* Có Gì Hot?"
          title2="Quán xịn chấm 5 sao⭐ - gọi là mê, ăn là ghiền!"
          badge={false}
          data={fiveStar}
        />

        <HomeCard
          title1="Sáng Nắng Chiều Mưa, Món Gì Cũng Có"
          title2="Nắng mưu là chuyện của trời, món ngon giá tốt giao ngay kịp thời"
          data={fiveStar1}
        />
        <HomeCard
          title1="Chú Ý! Giảm Đến 150.000Đ"
          title2="Khi nhập mã OLODO. Nấu nướng thả ga"
          data={fiveStar2}
        />
        <HomeCard
          title1="Ăn Vặt Thả Ga, Không Lo Về Giá"
          title2="Bánh tráng, nem chua rán, chè, cá viên chiên,... giảm 50%"
          data={fiveStar3}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 120,
  },
  searchText: { color: "#fff", fontWeight: "bold" },
  dealsSection: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  collectionsSection: { padding: 10 },
  collectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  collectionItem: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    alignItems: "center",
  },
  collectionImage: { width: 100, height: 100 },
  flashSaleSection: { padding: 10, backgroundColor: "#ff4444" },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
});

export default HomeTab;
