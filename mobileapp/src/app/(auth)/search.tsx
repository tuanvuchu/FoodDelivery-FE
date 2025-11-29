import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import debounce from "debounce";
import { getRestaurantsByNameAPI, getURLBaseBackend } from "@/utils/api";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { APP_COLOR } from "@/utils/constants";
import DefaultResult from "@/components/default.result";

const SearchPage = () => {
  const [visible, setVisible] = useState(false);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTerm1, setSearchTerm1] = useState<string>("");
  const [restaurants1, setRestaurants1] = useState<[]>([]);

  const handleSearch = debounce(async (text: string) => {
    setSearchTerm(text);
    if (!text) return;
    const res = await getRestaurantsByNameAPI(text);
    if (res.items) setRestaurants(res.items);
  }, 500);

  const handleSearch1 = debounce(async (text: string) => {
    if (!text) return;
    try {
      const res = await fetch("http://192.168.1.77:8002/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });
      const data = await res.json();
      setRestaurants1(data);
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          padding: 10,
        }}
      >
        <MaterialIcons
          onPress={() => router.back()}
          name="arrow-back"
          size={24}
          color={APP_COLOR.ORANGE}
        />
        <TextInput
          placeholder="Tìm kiếm..."
          onChangeText={(text: string) => handleSearch(text)}
          autoFocus
          style={{
            flex: 1,
            backgroundColor: "#eee",
            padding: 7,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ff5e00ff",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#eee", flex: 1, position: "relative" }}>
        {searchTerm.length === 0 ? (
          <DefaultResult />
        ) : (
          <View style={{ backgroundColor: "white", gap: 10 }}>
            {restaurants?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item.id },
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                  }}
                >
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${
                        item.image
                      }`,
                    }}
                  />
                  <Text>{item.name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
      <Pressable onPress={() => setVisible(true)}>
        <MaterialIcons
          style={{ position: "absolute", bottom: 50, right: 5 }}
          name="chat-bubble"
          size={35}
          color="#3700ffff"
        />
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              Xin chào 👋
            </Text>
            <Text style={{ marginBottom: 20 }}>
              Bạn muốn ăn món gì? Nhập vào bên dưới để tôi gợi ý nhé!
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                paddingHorizontal: 10,
                marginBottom: 20,
              }}
            >
              <TextInput
                placeholder="Nhập món ăn..."
                onChangeText={(text: string) => setSearchTerm1(text)}
                value={searchTerm1}
                style={{
                  flex: 1,
                  height: 45,
                }}
              />
              <Pressable
                onPress={() => {
                  handleSearch1(searchTerm1);
                }}
                style={{
                  backgroundColor: "#007bff",
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 6,
                  marginLeft: 8,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Gửi</Text>
              </Pressable>
            </View>
            {restaurants1?.results?.length > 0 &&
              restaurants1.results.map((item) => (
                <View
                  key={item.id}
                  style={{ marginVertical: 8, flexDirection: "row" }}
                >
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${
                        item.image
                      }`,
                    }}
                    style={{ width: 100, height: 100, borderRadius: 8 }}
                  />
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                </View>
              ))}

            <Pressable
              style={{
                backgroundColor: "#ccc",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => {
                setRestaurants1([]);
                setVisible(false);
              }}
            >
              <Text style={{ color: "#333", fontWeight: "bold" }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchPage;
