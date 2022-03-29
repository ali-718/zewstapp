import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { primaryColor } from "../../theme/colors";
import belliconGray from "../../assets/images/belliconGray.png";
import personGrayIcon from "../../assets/images/personGrayIcon.png";
import { Text } from "../Text/Text";
import { useNavigation } from "@react-navigation/native";
import posIcon from "../../assets/images/MenuIcons/posIcon.png";

export const Header = ({ leftImage, onPressLeft, mainHeading }) => {
  const navigation = useNavigation();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);

  return (
    <LinearGradient
      colors={["white", "white"]}
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: device === "tablet" ? 15 : 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={onPressLeft}>
            <Image
              source={leftImage}
              style={{
                width: 22,
                height: 18,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>

          <View
            style={{
              marginLeft: 35,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                color: "black",
                fontFamily: "openSans_semiBold",
              }}
            >
              {mainHeading}
            </Text>
          </View>

          {device === "tablet" && (
            <TouchableOpacity
              style={{
                padding: 10,
                paddingHorizontal: 15,
                backgroundColor: primaryColor,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                minWidth: 150,
              }}
              onPress={() => navigation.navigate("Pos")}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                  tintColor: "white",
                }}
                source={posIcon}
              />

              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginLeft: 10,
                  fontFamily: "openSans_bold",
                }}
              >
                POS
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            marginLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity disabled onPress={() => null}>
            <Image
              source={belliconGray}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                opacity: 0.5,
              }}
            />
          </TouchableOpacity>
          {device === "tablet" ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => null}
            >
              <Image
                source={personGrayIcon}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  marginLeft: 20,
                }}
              />

              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: "black",
                    fontFamily: "openSans_semiBold",
                    marginLeft: 10,
                  }}
                >
                  {user.owner_name}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => null}>
              <Image
                source={personGrayIcon}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                  marginLeft: 20,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

{
  /* <Text
          style={{
            color: "white",
            fontSize: device === "tablet" ? 25 : 20,
            fontFamily: "openSans_semiBold",
            width: "80%",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {heading}
        </Text> */
}
