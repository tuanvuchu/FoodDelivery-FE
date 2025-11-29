import { APP_COLOR } from "@/utils/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { useCurrentApp } from "@/context/app.context";
import { View } from "react-native";
import Toast from "react-native-root-toast";

interface StickyHeaderProps {
  restaurant_id: string;
  isLiked?: boolean;
}

const backend = process.env.EXPO_PUBLIC_ANDROID_API_URL;

const FavoriteButton = ({ restaurant_id, isLiked }: StickyHeaderProps) => {
  const { appState } = useCurrentApp();
  const user_id = appState?.user.id;
  const [isLike, setIsLike] = useState<boolean>(isLiked || false);

  const handleToggleLike = async () => {
    try {
      const res = await fetch(`${backend}/api/v1/favorites/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, restaurant_id }),
      });

      const data = await res.json();
      Toast.show(data.message, {
        duration: Toast.durations.SHORT,
        textColor: "white",
        position: Toast.positions.CENTER,
        backgroundColor: "#7c7c7cff",
        opacity: 1,
      });
      setIsLike(data.isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      {isLike ? (
        <MaterialIcons
          onPress={handleToggleLike}
          name="favorite"
          size={20}
          color={APP_COLOR.ORANGE}
        />
      ) : (
        <MaterialIcons
          onPress={handleToggleLike}
          name="favorite-outline"
          size={20}
          color={APP_COLOR.GREY}
        />
      )}
    </View>
  );
};

export default FavoriteButton;
