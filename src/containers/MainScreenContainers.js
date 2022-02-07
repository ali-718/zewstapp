import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  SectionList,
} from "react-native";
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
import Clock from "../assets/images/blackClock.png";
import notificationCheck from "../assets/images/notificationCheck.png";
import { Text } from "../components/Text/Text";
import { Progress } from "native-base";
import { RegularButton } from "../components/Buttons/RegularButton";
import moment from "moment";

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
  const notificationData = useSelector((state) => state.auth.notificationData);
  const user = useSelector((state) => state.auth.user.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (notificationData.itemNames) {
      setShowModal(true);
    }
  }, [notificationData]);

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

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        transparent
        animationType="slide"
      >
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              flex: 1,
            }}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          ></TouchableOpacity>
          <View
            style={{
              width: "90%",
              maxWidth: 320,
              borderRadius: 8,
              backgroundColor: "white",
              padding: 15,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Image source={Clock} style={{ width: 12, height: 12 }} />

                <Text style={{ fontSize: 12, color: "#000000", marginLeft: 7 }}>
                  {notificationData.createdAt}
                </Text>
              </View>
            </View>

            <Progress
              size={"xs"}
              style={{ marginTop: 10 }}
              colorScheme={"green"}
              value={100}
            />

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <Image
                style={{ width: 115, height: 105, resizeMode: "contain" }}
                source={notificationCheck}
              />
            </View>

            <View style={{ marginTop: 15 }}>
              <Text style={{ fontSize: 18, color: "#868686" }}>
                Hey, {user?.owner_name}!
              </Text>

              <Text
                style={{
                  fontSize: 24,
                  color: "#A461D8",
                  fontFamily: "openSans_bold",
                  marginTop: 10,
                }}
              >
                Your Order is Ready!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  marginTop: 20,
                }}
              >
                {notificationData.body}
              </Text>

              <View
                style={{
                  backgroundColor: "gainsboro",
                  borderRadius: 27,
                  padding: 25,
                  marginTop: 21,
                  maxHeight: 200,
                }}
              >
                <Text style={{ fontSize: 16, color: "#868686" }}>
                  Order detail:
                </Text>

                <ScrollView>
                  {notificationData?.itemNames?.map((item, i) => (
                    <Text
                      key={i}
                      style={{ color: "#000000", fontSize: 16, marginTop: 15 }}
                    >
                      <Text>{"\u2022"}</Text> {item}
                    </Text>
                  ))}
                </ScrollView>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 50,
                }}
              >
                <RegularButton
                  style={{ width: "48%" }}
                  white
                  text={"REMIND ME"}
                  onPress={() => setShowModal(false)}
                />

                <RegularButton
                  onPress={() => setShowModal(false)}
                  style={{ width: "48%" }}
                  text={"OK"}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
