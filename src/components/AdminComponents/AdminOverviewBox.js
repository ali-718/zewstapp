import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  borderColor2,
  grayColor,
  grayTextColor,
  primaryColor,
} from "../../theme/colors";
import { Text } from "../Text/Text";
import forwardIcon from "../../assets/images/forwardIcon.png";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Feather";

export const AdminOverviewBox = ({
  label,
  name,
  rightText,
  image,
  iconStyle,
  onPress,
  recipe,
  inventory,
  borderLeftColor,
  rightIcon,
  onLongPress = () => null,
  noTint,
  noLeftMargin,
  primary = null,
}) => {
  const device = useSelector((state) => state.system.device);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        padding: device === "tablet" ? 20 : 10,
        borderRadius: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: borderColor2,
        paddingBottom: 20,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {image ? (
        <Image
          source={image}
          style={[
            {
              width: device === "tablet" ? 40 : 30,
              height: device === "tablet" ? 40 : 30,
              resizeMode: "contain",
            },
            !noTint && { tintColor: primaryColor },
          ]}
        />
      ) : null}
      <View
        style={{
          flex: 1,
          marginLeft: device === "tablet" ? 20 : noLeftMargin ? 0 : 15,
          marginRight: 10,
        }}
      >
        <Text
          style={
            recipe || inventory
              ? {
                  fontSize: device === "tablet" ? 20 : 20,
                  fontFamily: "openSans_bold",
                  color: "black",
                }
              : {
                  fontSize: device === "tablet" ? 20 : 18,
                  fontFamily: "openSans_semiBold",
                  color: "black",
                }
          }
        >
          {label}
        </Text>
        <Text
          numberOfLines={1}
          style={
            recipe || inventory
              ? {
                  fontSize: device === "tablet" ? 20 : 16,
                  fontFamily: "openSans_bold",
                  color: grayTextColor,
                }
              : {
                  fontSize: device === "tablet" ? 18 : 14,
                  color: grayTextColor,
                }
          }
        >
          {name}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {rightText ? (
          <Text
            numberOfLines={1}
            style={{
              fontSize: device === "tablet" ? 18 : 14,
              color: grayTextColor,
            }}
          >
            {rightText}
          </Text>
        ) : null}
        {primary ? (
          <Icon name="check-circle" color={primaryColor} size={25} />
        ) : !rightText ? (
          <Icon name="check-circle" color={"black"} size={25} />
        ) : null}
        <Image
          source={rightIcon ?? forwardIcon}
          style={{
            width: 15,
            height: 15,
            resizeMode: "contain",
            marginLeft: 5,
            ...iconStyle,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
