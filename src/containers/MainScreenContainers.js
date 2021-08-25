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
import { Header } from "../components/Headers/Header";

export const MainScreenContainer = ({
  leftImage,
  rightImage,
  title,
  onPressLeft,
  onPressRight = () => null,
  ...props
}) => {
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
      <Header
        heading={title}
        leftImage={leftImage}
        rightImage={rightImage}
        onPressLeft={() => onPressLeft ?? navigation.goBack()}
        onPressRight={onPressRight}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", flex: 1 }}
      >
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
