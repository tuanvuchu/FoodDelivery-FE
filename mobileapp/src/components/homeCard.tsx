import { getURLBaseBackend } from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Image, Pressable, Text, View } from "react-native";
const baseImage = `${getURLBaseBackend()}/api/v1/uploads`;

interface IProps {
  title1: string;
  title2?: string;
  badge?: boolean;
  data: {};
}

export default function HomeCard({
  title1,
  title2,
  badge = true,
  data,
}: IProps) {
  return (
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
        <View style={{ maxWidth: 220 }}>
          <Text
            style={{ color: "#e24444ff", fontWeight: "700" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title1}
          </Text>
          <Text style={{ fontSize: 10 }} numberOfLines={1} ellipsizeMode="tail">
            {title2}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "#636363ff" }}>Xem tất cả</Text>
          <MaterialIcons name="navigate-next" size={24} color="#636363ff" />
        </View>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.navigate(`/(user)/restaurant/${item.id}`)}
          >
            <View
              style={{
                padding: 5,
                width: 120,
                alignItems: "center",
                margin: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#fff",
              }}
            >
              <Image
                source={{ uri: `${baseImage}/${item.image}` }}
                style={{
                  height: 120,
                  width: 120,
                  position: badge ? "relative" : undefined,
                }}
              />
              {badge && (
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 10,
                    borderWidth: 1,
                    borderColor: "#eb5555ef",
                    backgroundColor: "#eb5555ef",
                    padding: 3,
                    alignSelf: "flex-start",
                    position: "absolute",
                    top: 5,
                    left: -1,
                  }}
                >
                  Yêu thích
                </Text>
              )}

              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ alignSelf: "flex-start" }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  maxWidth: 90,
                  overflow: "hidden",
                  alignSelf: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    padding: 3,
                    alignSelf: "flex-start",
                  }}
                >
                  Ưu đãi có hạn
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: 10,
                    borderWidth: 1,
                    borderColor: "red",
                    padding: 3,
                    alignSelf: "flex-start",
                  }}
                >
                  Ưu đãi có hạn
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
