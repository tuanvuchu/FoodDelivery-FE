import { APP_COLOR } from "@/utils/constants";
import { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    borderColor: APP_COLOR.GREY,
  },
});

interface IProps {
  title: string;
  onPress?: () => void;
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  pressStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isLoading?: boolean;
}

const ShareButton = (props: IProps) => {
  const {
    title,
    onPress,
    icon,
    textStyle,
    buttonStyle,
    pressStyle,
    disabled = false,
    isLoading = false,
  } = props;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed === true || isLoading || disabled ? 0.5 : 1,
        },
        pressStyle,
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      <View style={[styles.btnContainer, buttonStyle]}>
        {icon}
        {isLoading && <ActivityIndicator color="black" />}
        <Text style={textStyle}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default ShareButton;
