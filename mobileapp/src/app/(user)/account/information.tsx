import ShareInput from "@/components/share.input";
import { useCurrentApp } from "@/context/app.context";
import { UpdateUserSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import ShareButton from "@/components/share.button";
import { APP_COLOR } from "@/utils/constants";
import { useState } from "react";
import Toast from "react-native-root-toast";
import { getURLBaseBackend, updateUserAPI } from "@/utils/api";

const InformationPage = () => {
  const { appState, setAppState } = useCurrentApp();
  const handleUpdateUserInfo = async (
    name: string,
    email: string,
    phone: string,
  ) => {
    if (appState?.user.id) {
      setIsLoading(true);
      const res = await updateUserAPI(appState?.user.id, name, phone);
      if (res.data) {
        Toast.show("Updated information user successfully!", {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });

        setAppState({
          ...appState,
          user: {
            ...appState.user,
            name: name,
            phone: phone,
          },
        });
      } else {
        const m = Array.isArray(res.message) ? res.message[0] : res.message;
        Toast.show(m, {
          duration: Toast.durations.LONG,
          textColor: "white",
          backgroundColor: APP_COLOR.ORANGE,
          opacity: 1,
        });
      }
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Formik
            validationSchema={UpdateUserSchema}
            initialValues={{
              name: appState?.user.name || "",
              email: appState?.user.email || "",
              phone: appState?.user.phone || "",
            }}
            onSubmit={(values) =>
              handleUpdateUserInfo(
                values?.name ?? "",
                values?.email ?? "",
                values?.phone ?? "",
              )
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{ gap: 10 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#da4500ff",
                    minHeight: 180,
                  }}
                >
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={{
                      uri: `${getURLBaseBackend()}/api/v1/uploads/${
                        appState?.user.image
                      }`,
                    }}
                  />
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <ShareInput
                    title="Tên"
                    onTextChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <ShareInput
                    title="Số điện thoại"
                    onTextChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                  />
                  <ShareInput
                    title="Email"
                    onTextChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    keyboardType="email-address"
                    editable={false}
                  />
                  <View style={{ paddingVertical: 10 }}></View>
                  <ShareButton
                    title="Lưu"
                    onPress={handleSubmit}
                    textStyle={{ color: "#fff", fontSize: 19 }}
                    buttonStyle={{
                      justifyContent: "center",
                      borderRadius: 30,
                      backgroundColor: APP_COLOR.ORANGE,
                      paddingVertical: 15,
                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                    isLoading={isLoading}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default InformationPage;
