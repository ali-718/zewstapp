import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { grayColor, primaryColor, primaryShade1 } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import person from "../assets/images/person.png";
import plus from "../assets/images/plus.png";
import { Text } from "../components/Text/Text";

export const MainScreenContainer = ({ title, ...props }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: grayColor,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", flex: 1 }}
      >
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          <LinearGradient
            colors={[primaryColor, primaryShade1]}
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                padding: 15,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Image
                  source={person}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Menu
              </Text>

              <TouchableOpacity>
                <Image
                  source={plus}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
