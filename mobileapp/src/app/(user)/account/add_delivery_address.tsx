import ShareButton from "@/components/share.button";
import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

export default function DeliveryAddress() {
  const { appState } = useCurrentApp();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [build, setBuild] = useState("");
  const [gate, setGate] = useState("");
  const [type, setType] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (appState?.user) {
      setUsername(appState.user.name);
      setPhone(appState.user.phone);
    }
  }, [appState]);
  return (
    <View
      style={{
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <TextInput
            style={{
              width: "100%",
            }}
            placeholder="Tên người dùng"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View
          style={{
            marginVertical: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <TextInput
            style={{
              width: "100%",
            }}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            accessibilityLabel="Số điện thoại"
          />
        </View>
      </View>

      <View
        style={{
          marginBottom: 10,
        }}
      >
        <View
          style={{
            marginVertical: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: APP_COLOR.WHITE,
            justifyContent: "space-between",
            flexDirection: "row",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              width: "85%",
            }}
            placeholder="Chọn địa chỉ"
            value={address}
            onChangeText={setAddress}
          />
          <MaterialIcons
            name="navigate-next"
            size={24}
            color={APP_COLOR.GREY}
          />
        </View>
        <View
          style={{
            marginVertical: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <TextInput
            style={{
              width: "100%",
            }}
            placeholder="Tòa nhà, Số tầng (Không bắt buộc)"
            value={build}
            onChangeText={setBuild}
          />
        </View>
        <View
          style={{
            marginVertical: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: APP_COLOR.WHITE,
          }}
        >
          <TextInput
            style={{
              width: "100%",
            }}
            placeholder="Cổng (Không bắt buộc)"
            value={gate}
            onChangeText={setGate}
          />
        </View>
      </View>

      <View
        style={{
          marginVertical: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: "row",
          gap: 10,
          borderRadius: 10,
          marginBottom: 10,
          backgroundColor: APP_COLOR.WHITE,
        }}
      >
        <ShareButton
          title="Nhà"
          buttonStyle={{
            marginTop: 10,
            justifyContent: "center",
            paddingVertical: 10,
            width: "auto",
          }}
        />
        <ShareButton
          title="Công ty"
          buttonStyle={{
            marginTop: 10,
            justifyContent: "center",
            width: "auto",
            paddingVertical: 10,
          }}
        />
        <ShareButton
          title="Khác"
          buttonStyle={{
            marginTop: 10,
            justifyContent: "center",
            width: "auto",
            paddingVertical: 10,
          }}
        />
      </View>

      <View
        style={{
          marginVertical: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          backgroundColor: APP_COLOR.WHITE,
        }}
      >
        <TextInput
          style={{
            width: "100%",
          }}
          placeholder="Ghi chú cho tài xế (Không bắt buộc)"
          value={note}
          onChangeText={setNote}
        />
      </View>
      <View style={{ gap: 15 }}>
        <ShareButton
          title="Lưu"
          buttonStyle={{
            marginTop: 10,
            justifyContent: "center",
            paddingVertical: 10,
          }}
          onPress={() => router.navigate("/(user)/account/setting")}
        />
      </View>
    </View>
  );
}
