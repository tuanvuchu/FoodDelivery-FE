import { useCurrentApp } from "@/context/app.context";
import { loginAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-root-toast";

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAppState } = useCurrentApp();

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show("Vui lòng nhập số điện thoại và mật khẩu", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await loginAPI(username, password);
      setIsLoading(false);
      if (res?.access_token && res?.user) {
        setAppState(res);
        await AsyncStorage.setItem("access_token", res.access_token);
        await AsyncStorage.setItem("user", JSON.stringify(res.user));
        router.replace({ pathname: "/(tabs)" });
      } else {
        Toast.show("Số điện thoại hoặc mật khẩu không chính xác", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Toast.show("Đã có lỗi xảy ra. Vui lòng thử lại.", {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
        accessibilityLabel="Logo"
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={username}
        onChangeText={setUsername}
        accessibilityLabel="Số điện thoại"
        editable={!isLoading}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Mật khẩu"
          editable={!isLoading}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          accessibilityLabel={
            isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"
          }
          disabled={isLoading}
        >
          <Text style={{ fontSize: 16 }}>
            {isPasswordVisible ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Tiếp tục</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.orText}>HOẶC</Text>
      <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
        <Image
          style={styles.icon}
          source={require("../../assets/images/google.png")}
          accessibilityLabel="Google icon"
        />
        <Text style={styles.buttonText}>Tiếp tục với Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
        <Image
          style={styles.icon}
          source={require("../../assets/images/facebook.png")}
          accessibilityLabel="Facebook icon"
        />
        <Text style={styles.buttonText}>Tiếp tục với Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialButton} disabled={isLoading}>
        <Image
          style={styles.icon}
          source={require("../../assets/images/apple.png")}
          accessibilityLabel="Apple icon"
        />
        <Text style={styles.buttonText}>Tiếp tục với Apple</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Bạn cần hỗ trợ đăng ký? Xem chính sách quy định của UFood
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  buttonDisabled: { backgroundColor: "#ccc" },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    paddingRight: 45,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    width: "100%",
  },
  orText: {
    marginVertical: 10,
    color: "#666",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    position: "relative",
  },
  icon: {
    width: 20,
    height: 20,
    position: "absolute",
    left: 15,
  },
  footerText: {
    marginTop: 20,
    color: "#007AFF",
    textAlign: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    top: "40%",
    transform: [{ translateY: -12 }],
  },
});

export default LoginScreen;
