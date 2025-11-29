import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  async function prepare() {
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      if (!access_token) {
        // router.replace("/(auth)/authentication");
        router.replace("/(tabs)");
      } else {
        router.replace("/(tabs)");
      }
    } catch (e) {
      throw new Error(e);
    } finally {
      SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  return <></>;
};

export default RootPage;
