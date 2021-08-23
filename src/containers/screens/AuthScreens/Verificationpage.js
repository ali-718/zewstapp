import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Input } from "../../../components/Inputs/Input";
import { AuthScreenContainer } from "../../AuthScreenContainer";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../../../components/Text/Text";
import {
  grayColor,
  grayShade1,
  grayTextColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
} from "../../../theme/colors";
import { PasswordInput } from "../../../components/Inputs/PasswordInput";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import moment from "moment";

const time = 60;

export const VerificationPage = (props) => {
  const [isEdit, setIsEdit] = useState(false);

  const [phone, setPhone] = useState(props.route.params.phone || "");
  const [isResendDisabled, setResendDisabled] = useState(true);
  const [duration, setDuration] = useState(
    moment.duration(time * 1000, "milliseconds")
  );
  let timer;

  useEffect(() => {
    countDown();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const countDown = () => {
    timer = setInterval(() => {
      setDuration((prev) => {
        if (prev.asMilliseconds() - 1000 === 0) {
          clearInterval(timer);
          setResendDisabled(false);
          return moment.duration(0, "milliseconds");
        }
        return moment.duration(prev.asMilliseconds() - 1000, "milliseconds");
      });
    }, 1000);
  };

  const resetCountDown = () => {
    setDuration(moment.duration(time * 1000, "milliseconds"));
    setResendDisabled(true);
    setIsEdit(false);
    countDown();
  };

  return (
    <AuthScreenContainer title={"Verify"}>
      <View style={{ width: "90%", marginVertical: 20, marginBottom: 40 }}>
        <Input
          value={phone}
          onChangeText={(val) => setPhone(val)}
          placeholder={"Code sent on"}
          iconName={"edit"}
          iconType={FontAwesome}
          editable={isEdit}
          keyboardType={"number-pad"}
          onIconClick={() => setIsEdit(true)}
        />

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            height: 70,
            marginTop: 20,
          }}
        >
          <Text style={{ marginBottom: 5, color: "gray" }}>
            Verification code
          </Text>
          <TextInput
            placeholder={"_ _ _ _ _ _"}
            maxLength={6}
            keyboardType={"number-pad"}
            editable={true}
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              letterSpacing: 10,
            }}
            placeholderTextColor={"black"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton text={"Verify"} style={{ borderRadius: 50 }} />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            backgroundColor: grayShade1,
            borderRadius: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, color: grayTextColor }}>
              Resending code in
            </Text>

            <Text style={{ fontSize: 15, color: "black", marginTop: 5 }}>
              {moment(duration.asMilliseconds()).format("mm:ss")}
            </Text>
          </View>

          <RegularButton
            text={"Re-send"}
            style={{
              width: "40%",
              height: 40,
              backgroundColor: grayShade1,
              borderColor: primaryColor,
              borderWidth: 2,
              opacity: isResendDisabled ? 0.4 : 1,
            }}
            colors={[grayShade1, grayShade1]}
            textStyle={{ fontWeight: "bold", color: primaryColor }}
            disabled={isResendDisabled}
            onPress={() => resetCountDown()}
          />
        </View>
      </View>
    </AuthScreenContainer>
  );
};