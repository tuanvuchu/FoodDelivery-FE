import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable, View } from "react-native";

export default function AddButton({ id, quantity = 1, unit_price, onAdded }) {
  async function addToCart(id, quantity, unit_price) {
    try {
      const existingCart = await AsyncStorage.getItem("cart");
      let cart = existingCart ? JSON.parse(existingCart) : [];

      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({ id, quantity, unit_price });
      }

      const newCart = [...cart];

      await AsyncStorage.setItem("cart", JSON.stringify(newCart));
      onAdded && onAdded();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Pressable onPress={() => addToCart(id, quantity, unit_price)}>
      <View
        style={{
          backgroundColor: "red",
          borderRadius: 2,
        }}
      >
        <Feather name="plus" size={25} color="#fff" />
      </View>
    </Pressable>
  );
}
