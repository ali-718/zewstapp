import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  drawerHeadingColor,
  grayMenuText,
  grayTextColor,
  primaryColor,
} from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../Text/Text";
import { LogoutAction } from "../../Redux/actions/AuthActions/authActions";
import logoutIcon from "../../assets/images/logoutIcon.png";
import { allMenus } from "../../helpers/utlils";

export const Menu = ({ image, name, setselected, selected, style, noName }) => (
  <TouchableOpacity
    style={{
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderLeftWidth: selected ? 4 : 0,
      borderColor: primaryColor,
      marginTop: 30,
      paddingVertical: 5,
      ...style,
    }}
    onPress={setselected}
  >
    <Image
      source={image}
      style={{
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginLeft: 20,
        tintColor: selected ? primaryColor : grayTextColor,
      }}
    />
    {!noName && (
      <Text
        style={{
          fontSize: 16,
          color: selected ? primaryColor : grayMenuText,
          textAlign: "center",
          marginLeft: 20,
          fontFamily: "openSans_semiBold",
        }}
      >
        {name}
      </Text>
    )}
  </TouchableOpacity>
);

export const DrawerMenu = ({
  state: { index },
  changeMenuIndex = () => null,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);

  const Logout = () => dispatch(LogoutAction(navigation));

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            flex: 1,
            marginBottom: 20,
          }}
        >
          <View style={{ width: "100%", marginTop: 30 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Main
            </Text>
            {allMenus[user.role]?.map((item, i) => {
              if (item.isTablet && device !== "tablet") {
                return null;
              }

              return (
                <Menu
                  selected={index === item.index}
                  setselected={() => {
                    navigation.navigate(item.path);
                    changeMenuIndex(item.index);
                  }}
                  image={item.icon}
                  name={item.name}
                  style={{ marginTop: 20 }}
                />
              );
            })}
          </View>

          <View style={{ width: "100%", marginTop: 40 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Help
            </Text>
            {/* <Menu
              selected={index === 10}
              setselected={() => navigation.navigate("")}
              image={messageIcon}
              name={"Messages"}
              style={{ marginTop: 20 }}
            />
            <Menu
              selected={index === 11}
              setselected={() => navigation.navigate("")}
              image={libraryIcon}
              name={"Library"}
            />
            <Menu
              selected={index === 12}
              setselected={() => navigation.navigate("")}
              image={settingsIcon}
              name={"Settings"}
            /> */}
            {/* <Menu
              selected={index === 13}
              setselected={() => null}
              image={supportIcon}
              name={"Support"}
            /> */}

            <Menu
              image={logoutIcon}
              setselected={Logout}
              name={"Logout"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export const DrawerMenuWithoutNames = ({
  state: { index },
  changeMenuIndex,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            marginBottom: 20,
          }}
        >
          <View style={{ width: "100%", marginTop: 30 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 10,
                fontSize: 16,
              }}
            >
              Main
            </Text>

            {allMenus[user.role]?.map((item, i) => {
              if (item.isTablet && device !== "tablet") {
                return null;
              }

              return (
                <Menu
                  key={i}
                  selected={index === item.index}
                  setselected={() => {
                    navigation.navigate(item.path);
                    changeMenuIndex(item.index);
                  }}
                  image={item.icon}
                  name={item.name}
                  style={{ marginTop: 20 }}
                  noName
                />
              );
            })}
          </View>

          {/* <View style={{ width: "100%", marginTop: 40 }}>
            <Text
              style={{
                textTransform: "uppercase",
                color: drawerHeadingColor,
                marginLeft: 20,
                fontSize: 16,
              }}
            >
              Help
            </Text>
            <Menu
              selected={index === 10}
              setselected={() => navigation.navigate("")}
              image={messageIcon}
              name={"Messages"}
              style={{ marginTop: 20 }}
            />
            <Menu
              selected={index === 11}
              setselected={() => navigation.navigate("")}
              image={libraryIcon}
              name={"Library"}
            />
            <Menu
              selected={index === 12}
              setselected={() => navigation.navigate("")}
              image={settingsIcon}
              name={"Settings"}
            />
            <Menu
              selected={index === 13}
              setselected={() => navigation.navigate("")}
              image={supportIcon}
              name={"Support"}
            />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
