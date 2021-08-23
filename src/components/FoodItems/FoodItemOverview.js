import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../components/Text/Text";
import { grayTextColor, primaryColor } from "../../theme/colors";
import dollarIcon from "../../assets/images/dollarIcon.png";
import walletIcon from "../../assets/images/walletIcon.png";
import switchOn from "../../assets/images/switchOn.png";
import switchOff from "../../assets/images/switchOff.png";
import deleteIcon from "../../assets/images/deleteIcon.png";

export const FoodOverview = ({
  image,
  name,
  desc,
  cost,
  savings,
  available,
  isEdit,
  onClickAvailable,
  onPress,
}) => {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: "white",
        marginTop: 2,
        opacity: available ? 1 : 0.6,
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
        onPress={onPress}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 100,
          }}
          source={image}
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                flex: 0.9,
                fontSize: 18,
                fontFamily: "openSans_bold",
              }}
            >
              {name}
            </Text>

            {!isEdit && (
              <View
                style={{
                  paddingVertical: 3,
                  paddingHorizontal: 5,
                  borderColor: available ? primaryColor : grayTextColor,
                  borderWidth: 1,
                  borderRadius: 50,
                }}
              >
                <Text
                  style={{
                    color: available ? primaryColor : grayTextColor,
                    fontSize: 12,
                    fontFamily: "openSans_semiBold",
                  }}
                >
                  {available ? "Available" : "Hidden"}
                </Text>
              </View>
            )}
          </View>

          <View style={{ width: "100%", marginTop: 5 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 14, color: grayTextColor }}
            >
              {desc}
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 15, height: 20, resizeMode: "contain" }}
                  source={dollarIcon}
                />
                {!isEdit && (
                  <Text style={{ color: "black", marginLeft: 5 }}>Cost</Text>
                )}
              </View>

              <Text
                style={{
                  color: "black",
                  marginLeft: 10,
                  fontFamily: "openSans_bold",
                }}
              >
                ${cost}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 15, height: 20, resizeMode: "contain" }}
                  source={walletIcon}
                />

                {!isEdit && (
                  <Text style={{ color: "black", marginLeft: 5 }}>Savings</Text>
                )}
              </View>

              <Text
                style={{
                  color: "black",
                  marginLeft: 10,
                  fontFamily: "openSans_bold",
                }}
              >
                ${savings}
              </Text>
            </View>
          </View>
        </View>

        {isEdit && (
          <View style={{ width: "30%" }}>
            <View
              style={{
                paddingVertical: 3,
                paddingHorizontal: 5,
                borderColor: available ? primaryColor : grayTextColor,
                borderWidth: 1,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: available ? primaryColor : grayTextColor,
                  fontSize: 12,
                  fontFamily: "openSans_semiBold",
                }}
              >
                {available ? "Available" : "Hidden"}
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={deleteIcon}
                  style={{
                    width: 15,
                    height: 20,
                    marginLeft: 5,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={onClickAvailable}>
                <Image
                  source={available ? switchOn : switchOff}
                  style={{
                    width: 40,
                    height: 30,
                    marginRight: 5,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
