import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { backgroundGrayColor } from "../theme/colors";
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { Header } from "../components/Headers/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { DrawerActions } from "@react-navigation/routers";
import menuIcon from "../assets/images/menuIcon.png";
import {
  DrawerMenu,
  DrawerMenuWithoutNames,
} from "../components/Drawer/Drawer";
import { changeMenuIndex } from "../Redux/actions/SystemActions/SystemActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HEIGHT } from "../helpers/utlils";

export const MainScreenContainer = ({
  noScroll,
  onPressRight = () => null,
  noHeader,
  scrollRef = () => null,
  isDrawer,
  shortDrawer,
  ...props
}) => {
  const index = useSelector((state) => state.system.menuIndex);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);

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
        <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
          {isDrawer ? (
            device === "tablet" ? (
              shortDrawer ? (
                <View style={{ width: 70 }}>
                  <DrawerMenuWithoutNames
                    changeMenuIndex={(index) =>
                      dispatch(changeMenuIndex({ index }))
                    }
                    {...{ state: { index } }}
                  />
                </View>
              ) : (
                <View style={{ width: 230, minHeight: HEIGHT }}>
                  <DrawerMenu
                    changeMenuIndex={(index) =>
                      dispatch(changeMenuIndex({ index }))
                    }
                    {...{ state: { index } }}
                  />
                </View>
              )
            ) : null
          ) : null}
          <View style={{ flex: 1 }}>
            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
              {props.children}
            </View>
          </View>
        </View>
      ) : (
        <KeyboardAwareScrollView style={{ width: "100%", flex: 1 }}>
          <View style={{ width: "100%", flexDirection: "row", flex: 1 }}>
            {isDrawer ? (
              device === "tablet" ? (
                shortDrawer ? (
                  <View style={{ width: 70 }}>
                    <DrawerMenuWithoutNames
                      changeMenuIndex={(index) =>
                        dispatch(changeMenuIndex({ index }))
                      }
                      {...{ state: { index } }}
                    />
                  </View>
                ) : (
                  <View style={{ width: 230, minHeight: HEIGHT }}>
                    <DrawerMenu
                      changeMenuIndex={(index) =>
                        dispatch(changeMenuIndex({ index }))
                      }
                      {...{ state: { index } }}
                    />
                  </View>
                )
              ) : null
            ) : null}
            <View style={{ flex: 1 }}>
              <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                {props.children}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
