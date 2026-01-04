import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import debounce from "debounce";
import { getRestaurantsByNameAPI, getURLBaseBackend } from "@/utils/api";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { APP_COLOR } from "@/utils/constants";
import DefaultResult from "@/components/default.result";

const SearchPage = () => {
  const [lastFoundProducts, setLastFoundProducts] = useState<any[]>([]);
  const [awaitingAddToCart, setAwaitingAddToCart] = useState(false);

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

  const handleAddToCart = (text: string) => {
    let quantity = 1;
    const matchQty = text.match(/\b(\d+)\b/);
    if (matchQty) quantity = parseInt(matchQty[1], 10);
    console.log(lastFoundProducts);

    const product = lastFoundProducts.find((p) =>
      text.toLowerCase().includes(p.name.toLowerCase())
    );
    if (!product) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + "-bot",
          role: "bot",
          text: "Bạn muốn thêm món nào trong danh sách tôi vừa gợi ý?",
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + "-bot",
        role: "bot",
        text: `Đã thêm ${quantity} ${product.name} vào giỏ hàng.`,
      },
    ]);

    setAwaitingAddToCart(false);
  };

  const handleSearch1 = debounce(async (text: string) => {
    setSearchTerm1("");
    if (!text.trim()) return;
    const isAddCommand =
      awaitingAddToCart &&
      (text.includes("thêm") ||
        text.includes("mua") ||
        text.includes("cho vào"));

    if (isAddCommand) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + "", role: "user", text },
      ]);

      handleAddToCart(text);
      return;
    }
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + "", role: "user", text },
    ]);

    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        id: "loading",
        role: "bot",
        text: "Đang tìm món phù hợp cho bạn...",
      },
    ]);

    try {
      const res = await fetch(
        `${getURLBaseBackend()}/api/v1/products/search-by-ingredients?q=${encodeURIComponent(
          text
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      setRestaurants1(data);
      setLastFoundProducts(data);
      setAwaitingAddToCart(data.length > 0);

      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "loading")
          .concat({
            id: Date.now() + "-bot",
            role: "bot",
            text:
              data.length > 0
                ? `Tôi tìm được ${data.length} món phù hợp`
                : "Xin lỗi, tôi chưa tìm được món phù hợp",
          })
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "loading")
          .concat({
            id: Date.now() + "-error",
            role: "bot",
            text: "Có lỗi xảy ra, bạn thử lại nhé.",
          })
      );
    } finally {
      setLoading(false);
    }
  }, 500);

  const [messages, setMessages] = useState<
    { id: string; role: "bot" | "user"; text: string }[]
  >([
    {
      id: "bot-hello",
      role: "bot",
      text: "Xin chào 👋 Bạn muốn ăn món gì hôm nay?",
    },
  ]);

  const [loading, setLoading] = useState(false);

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
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 16,
          zIndex: 999,
        }}
      >
        <MaterialIcons name="chat-bubble" size={36} color="#3700ff" />
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }}>
          <View
            style={{
              marginTop: "auto",
              height: "80%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                padding: 14,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Trợ lý ăn uống 🍔
              </Text>
              <Text style={{ color: "#666", marginTop: 4 }}>
                Bạn muốn ăn gì hôm nay?
              </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
              {messages.map((m) => (
                <View
                  key={m.id}
                  style={{
                    alignSelf: m.role === "bot" ? "flex-start" : "flex-end",
                    backgroundColor: m.role === "bot" ? "#f1f1f1" : "#3700ff",
                    padding: 12,
                    borderRadius: 12,
                    marginBottom: 10,
                    maxWidth: "80%",
                  }}
                >
                  <Text style={{ color: m.role === "bot" ? "#000" : "#fff" }}>
                    {m.text}
                  </Text>
                </View>
              ))}

              {restaurants1.map((item) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: "#fafafa",
                    borderRadius: 12,
                    padding: 10,
                    marginBottom: 12,
                  }}
                >
                  <Image
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${
                        item.image
                      }`,
                    }}
                    style={{ width: "100%", height: 120, borderRadius: 8 }}
                  />
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", marginTop: 6 }}
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                padding: 12,
                borderTopWidth: 1,
                borderColor: "#eee",
              }}
            >
              <TextInput
                editable={!loading}
                placeholder="Ví dụ: tôi muốn ăn thịt lợn"
                value={searchTerm1}
                onChangeText={setSearchTerm1}
                style={{
                  flex: 1,
                  backgroundColor: "#f1f1f1",
                  borderRadius: 20,
                  paddingHorizontal: 16,
                  height: 44,
                }}
              />

              <Pressable
                onPress={() => handleSearch1(searchTerm1)}
                style={{
                  marginLeft: 8,
                  backgroundColor: "#3700ff",
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>➤</Text>
              </Pressable>
            </View>

            <Pressable
              onPress={() => {
                setRestaurants1([]);
                setSearchTerm1("");
                setVisible(false);
              }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchPage;
