import { getURLBaseBackend } from "@/utils/api";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

interface IProps {
  user_id: string;
  image?: string;
  name: string;
  content?: string;
  created_at?: string | Date;
  users: {
    id: string;
    name: string;
    image?: string;
  };
}

export default function Comment({ comments }: { comments: IProps[] }) {
  if (!comments || comments.length === 0) {
    return (
      <View style={{ alignItems: "center", paddingBottom: 50 }}>
        <Ionicons name="wine-outline" size={100} color="orange" />
        <Text style={{ color: "#b8b2b2ff" }}>Chưa có đánh giá</Text>
        <Text style={{ textAlign: "center", color: "#b8b2b2ff" }}>
          Cùng chia sẻ trải nghiệm đặt hàng của bạn với mọi người nhé!
        </Text>
        <Pressable
          style={{
            marginTop: 20,
            paddingVertical: 12,
            padding: 24,
            borderRadius: 8,
            borderColor: "#c9c9c9ff",
            borderWidth: 1,
            alignItems: "center",
          }}
          onPress={() => console.log("Đặt món!")}
        >
          <Text
            style={{
              color: "#c9c9c9ff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Đặt món ngay
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View>
      {comments.map((item) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            gap: 5,
            marginBottom: 20,
            borderBottomWidth: 1,
            borderColor: "#c4c3c3ff",
          }}
        >
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={{
              uri: `${getURLBaseBackend()}/api/v1/uploads/${item.users.image}`,
            }}
          />

          <View>
            <Text style={{ fontWeight: "bold" }}>{item.users.name}</Text>

            <View
              style={{ gap: 2, flexDirection: "row", alignSelf: "flex-start" }}
            >
              {[...Array(item.rating)].map((_, i) => (
                <AntDesign key={i} name="star" size={15} color="orange" />
              ))}
            </View>

            <Text style={{ marginVertical: 10, width: 310 }}>
              {item.content}
            </Text>
            {item.image && (
              <Image
                style={{ width: 90, height: 90, borderRadius: 10 }}
                source={{
                  uri: `${getURLBaseBackend()}/api/v1/uploads/${item.image}`,
                }}
              />
            )}

            <Text
              style={{ color: "#b6b0b0ff", marginTop: 5, paddingBottom: 5 }}
            >
              {new Date(item.created_at || "").toLocaleString("vi-VN")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
