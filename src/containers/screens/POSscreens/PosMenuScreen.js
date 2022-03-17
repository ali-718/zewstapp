import { TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { Text } from "../../../components/Text/Text";
import { MainScreenContainer } from "../../MainScreenContainers";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "../../../components/Modal/Modal";
import { Input } from "../../../components/Inputs/Input";
import PhoneInput from "react-native-phone-number-input";

export const PosMenuScreen = () => {
  const navigation = useNavigation();
  const phonneRef = useRef();
  const [isModal, setIsModal] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [unFormatted, setUnFormatted] = useState("");

  return (
    <MainScreenContainer isDrawer shortDrawer noScroll>
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "95%", maxWidth: 900 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#0184E9",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("tableList")}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                Table Service
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#0184E9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                To Go
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#876FFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                Delivery
              </Text>
            </View>
            <View
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#2936A3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                Current Orders
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#876FFF",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                }}
              >
                Text
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: "48%",
                height: 150,
                borderRadius: 12,
                backgroundColor: "#2936A3",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPressIn={() => setIsModal(true)}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: "openSans_bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Register a new customer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal onRequestClose={() => setIsModal(false)} visible={isModal}>
        <View
          style={{
            width: "90%",
            maxWidth: 700,
            borderWidth: 1,
            padding: 20,
            backgroundColor: "#FBFAFB",
            paddingVertical: 30,
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
            <TouchableOpacity>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 22,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: "#000000",
                fontSize: 28,
                fontFamily: "openSans_semiBold",
              }}
            >
              New Customer
            </Text>

            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 22,
                  fontFamily: "openSans_semiBold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <Input
              value={firstName}
              setValue={(val) => setfirstName(val)}
              placeholder={"First name"}
              style={{ width: "48%" }}
            />
            <Input
              value={lastName}
              setValue={(val) => setlastName(val)}
              placeholder={"Last name"}
              style={{ width: "48%" }}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <PhoneInput
              defaultCode={"US"}
              ref={phonneRef}
              layout="first"
              onChangeText={(text) => {
                setUnFormatted(text);
              }}
              onChangeFormattedText={(text) => {
                setContact(text);
              }}
              containerStyle={{
                backgroundColor: "white",
                width: "48%",
                borderRadius: 10,
              }}
              flagButtonStyle={{
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 15,
                paddingLeft: 10,
              }}
              textContainerStyle={{
                backgroundColor: "white",
                flex: 1,
                borderRadius: 10,
              }}
            />
            <Input
              value={email}
              setValue={(val) => setEmail(val)}
              placeholder={"Email address"}
              style={{ width: "48%" }}
            />
          </View>

          <Input
            value={address}
            setValue={(val) => setAddress(val)}
            textarea
            placeholder={"Address"}
            style={{ marginTop: 30 }}
          />
        </View>
      </Modal>
    </MainScreenContainer>
  );
};
