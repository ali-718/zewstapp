import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { Text } from "../../../components/Text/Text";
import {
  grayTextColor,
  primaryColor,
  primaryShade3,
} from "../../../theme/colors";
import { emailValidator, passwordValidator } from "../../../helpers/rules";
import validator from "validator";
import {
  loginAction,
  loginActionOther,
} from "../../../Redux/actions/AuthActions/authActions";
import { USER } from "../../../Redux/actions/AuthActions/Types";
import { useDispatch, useSelector } from "react-redux";
import { ToastError } from "../../../helpers/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FullPageLoadingModall } from "../../../components/FullPageLoadingModall/FullPageLoadingModall";
import { getEmployeeRoles } from "../../../Redux/actions/EmployeeActions/EmployeeActions";
import Logo from "../../../assets/images/logo.png";
import purpleCashier from "../../../assets/images/loginUser.png";
import passcodeLeft from "../../../assets/images/passcodeLeft.png";
import rightPasscode from "../../../assets/images/rightPasscode.png";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { zIndex } from "styled-system";

const NumberCircle = ({ number, device, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: device === "tablet" ? 70 : 70,
      height: device === "tablet" ? 70 : 70,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      zIndex: 9
    }}
  >
    <Text style={{ fontSize: device === "tablet" ? 30 : 30 }}>{number}</Text>
  </TouchableOpacity>
);

export const EmployeeCodePage = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bottomSheet = useRef();
  const orientation = useSelector((state) => state.system.orientation);
  const device = useSelector((state) => state.system.device);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noBack, setnoBack] = useState(false);
  const [showError, setshowError] = useState(false);
  const [isError, setIsError] = useState({
    email: false,
    password: false,
  });
  const [selectedType, setSelectedType] = useState("");
  const [roles, setRoles] = useState([]);
  const [pin, setPin] = useState([]);

  useEffect(() => {
    getEmployeeRoles().then((res) => setRoles(res));

    const noBack = props.route.params?.noBack;
    const email = props.route.params?.email;

    if (noBack) {
      setnoBack(true);
    }
    if (email) {
      setEmail(email);
    }
  }, []);

  const onLogin = () => {
    setIsLoading(true);

    loginActionOther({ pin: pin.join("") })
      .then((res) => {
        dispatch({
          type: USER,
          payload: { user: res },
        });
        AsyncStorage.removeItem("defaultLocation");
        AsyncStorage.setItem("user", JSON.stringify({ user: res }));
        setIsLoading(false);
      })
      .catch((e) => {
        ToastError(e?.message || "Some error occoured, please try again later");
        setIsLoading(false);
      });
  };

  const onSet = (val) => {
    if (pin.length === 4) return;
    const value = [...pin];

    value.push(val);

    setPin(value);
  };

  const deletePin = () => {
    const value = [...pin];

    value.pop();

    setPin(value);
  };

  useEffect(() => {
    if (pin.length === 4) {
      onLogin();
    }
  }, [pin]);

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        backgroundColor: "#FBFAFB",
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#FBFAFB",
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 440,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            zIndex: 9
          }}
        >
          <Image
            source={Logo}
            style={{ width: 310, height: 65, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: device === "tablet" ? 50 : 40,
              fontFamily: "openSans_bold",
            }}
          >
            {moment().format("h:mm a")}
          </Text>
          <Text
            style={{
              fontSize: device === "tablet" ? 22 : 16,
            }}
          >
            {moment().format("dddd,MMMM D,YYYY")}
          </Text>
          <Text
            style={{
              fontSize: device === "tablet" ? 27 : 18,
              marginTop:  device === "tablet" ?  50 :10,
            }}
          >
            Enter Passcode
          </Text>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            {[1, 2, 3, 4].map((item) => (
              <View
                key={item}
                style={{
                  width: device === "tablet" ? 30 : 30,
                  height: device === "tablet" ? 30 : 30,
                  borderRadius: 100,
                  marginLeft: 20,
                  backgroundColor: pin.length >= item ? "#A461D8" : "#868686",
                }}
              />
            ))}
          </View>

          <View style={{ width: "100%", zIndex: 9 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: 40,
                zIndex: 9
              }}
            >
              <NumberCircle
                onPress={() => onSet(1)}
                number={"1"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(2)}
                number={"2"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(3)}
                number={"3"}
                device={device}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: device === "tablet" ? 30 : 20,
              }}
            >
              <NumberCircle
                onPress={() => onSet(4)}
                number={"4"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(5)}
                number={"5"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(6)}
                number={"6"}
                device={device}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: device === "tablet" ? 30 : 20,
                zIndex: 9
              }}
            >
              <NumberCircle
                onPress={() => onSet(7)}
                number={"7"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(8)}
                number={"8"}
                device={device}
              />
              <NumberCircle
                onPress={() => onSet(9)}
                number={"9"}
                device={device}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: device === "tablet" ? 30 : 20,
              }}
            >
              <TouchableOpacity
                style={{
                  width: device === "tablet" ? 100 : 70,
                  height: device === "tablet" ? 100 : 70,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setPin([])}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 18,
                    color: "#979797",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Clear
                </Text>
              </TouchableOpacity>
              <NumberCircle
                onPress={() => onSet(0)}
                number={"0"}
                device={device}
              />
              <TouchableOpacity
                style={{
                  width: device === "tablet" ? 100 : 70,
                  height: device === "tablet" ? 100 : 70,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={deletePin}
              >
                <Text
                  style={{
                    fontSize: device === "tablet" ? 24 : 18,
                    color: "#979797",
                    fontFamily: "openSans_bold",
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            bottom: device === "tablet" ? 30 : 40,
            zIndex:9
          }}
        >
          <View />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
              backgroundColor: 'white',
              padding: device === "tablet" ? 20 : 15,
              borderRadius: 8,
              zIndex:9
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <Image
              source={purpleCashier}
              style={{
                width: device === "tablet" ? 30 : 20,
                height: device === "tablet" ? 30 : 20,
                marginRight: 20,
                resizeMode: 'contain'
              }}
            />

            <Text
              style={{
                fontSize: device === "tablet" ? 18 : 16,
                color: "#A461D8",
                fontFamily: "openSans_bold",
              }}
            >
              Owner Sign in
            </Text>
          </TouchableOpacity>
        </View>
        <FullPageLoadingModall
          visible={isLoading}
          accessibilityLabel={"Signing you in"}
          text={"Signing you in..."}
        />

        {device === "tablet" &&
          <Image source={passcodeLeft} style={{ position: 'absolute', zIndex: 0, left: 0, width: 200, height: 400, resizeMode: 'contain', bottom: 0 }} />}
       
        {device === "tablet" &&
          <Image source={rightPasscode} style={{ position: 'absolute', zIndex: 0, right: 0, width: 200, height: 400, resizeMode: 'contain', bottom: 0 }} />}

      </View>
    </View>
  );
};
