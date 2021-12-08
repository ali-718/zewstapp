import React from "react";
import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { backgroundGrayColor } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../components/Headers/Header";
import back from "../assets/images/backIcon.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerActions } from "@react-navigation/routers";
import menuIcon from "../assets/images/MenuIcon.png";

export const MainScreenContainer = ({
  noScroll,
  onPressRight = () => null,
  noHeader,
  scrollRef = () => null,
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
      {!noHeader && (
        <Header
          leftImage={menuIcon}
          onPressLeft={() => navigation.dispatch(DrawerActions.openDrawer())}
          onPressRight={onPressRight}
        />
      )}
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
