import React from "react";
import { View, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { backgroundGrayColor, grayColor } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Headers/Header";
import back from "../assets/images/backIcon.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerActions } from "@react-navigation/routers";

import menuIcon from "../assets/images/menuIcon.png";

export const MainScreenContainer = ({
  leftImage,
  rightImage,
  title,
  onPressLeft,
  noScroll,
  onPressRight = () => null,
  mainPage,
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
        backgroundColor: backgroundGrayColor,
      }}
    >
      <Header
        heading={title}
        leftImage={leftImage ?? (mainPage ? menuIcon : back)}
        rightImage={rightImage}
        onPressLeft={() =>
          onPressLeft ??
          (mainPage
            ? navigation.dispatch(DrawerActions.openDrawer())
            : navigation.goBack())
        }
        onPressRight={onPressRight}
      />
      {noScroll ? (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          {props.children}
        </View>
      ) : (
        <KeyboardAwareScrollView style={{ width: "100%", flex: 1 }}>
          <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            {props.children}
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
