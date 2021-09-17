import { Spinner } from "native-base";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { primaryShade1 } from "../../../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenAction } from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";

export const SigningCheck = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getData = async () => {
    const user = await AsyncStorage.getItem("user");

    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("refreshToken");
    if (user) {
      const data = JSON.parse(user);
      refreshTokenAction({
        refreshToken: data.token?.refreshToken?.token,
        email: data.user.email,
      })
        .then((res) => {
          dispatch({ type: USER, payload: res });
        })
        .catch((e) => {
          navigation.navigate("OnBoardingPage");
        });
      return;
    }

    navigation.navigate("OnBoardingPage");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner size={"large"} color={primaryShade1} />
      <Text style={{ marginTop: 20 }}>Checking status</Text>
    </View>
  );
};
