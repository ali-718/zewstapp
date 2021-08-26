import React, { useState } from "react";
import { Image, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import bellIcon from "../../../../assets/images/bellIcon.png";
import { Text } from "../../../../components/Text/Text";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import qrcodeIcon from "../../../../assets/images/qrcodeIcon.png";
import plusBorderIcon from "../../../../assets/images/plusBorderIcon.png";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { grayColor, primaryShade1 } from "../../../../theme/colors";
import { PendingPickUps } from "../../../../components/Meals/PendingPickUps";
import { ScanQrModal } from "../../../../components/Home/ScanQrModal";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { ProgressBarBox } from "../../../../components/ProgressBarBox/ProgressBarBox";

export const HomePage = () => {
  const navigation = useNavigation();
  const [qrModal, setQrModal] = useState(false);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    setQrModal(true);
  };

  return (
    <MainScreenContainer
      leftImage={person}
      rightImage={bellIcon}
      title={"Menu"}
    >
      <View
        style={{
          width: "90%",
          marginBottom: 50,
          alignItems: "center",
          marginTop: 20,
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
          <Text style={{ fontSize: 30, collo: "black" }}>Hello!</Text>

          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 0.9 }}
          >
            <View style={{ width: "85%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 16, fontFamily: "openSans_semiBold" }}>
                Ali Haider
              </Text>
              <Text style={{ fontSize: 13, marginTop: 5 }}>
                Rocco Italian Grill - Arcadia
              </Text>
            </View>

            <View
              style={{
                width: "15%",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <Image
                source={forwardIcon}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 30,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RegularButton
            iconLeft={qrcodeIcon}
            iconStyle={{ width: 20, height: 20, resizeMode: "contain" }}
            style={{ width: "48%" }}
            text={"Scan QR"}
            onPress={openCamera}
          />

          <RegularButton
            iconLeft={plusBorderIcon}
            iconStyle={{ width: 20, height: 20, resizeMode: "contain" }}
            style={{ width: "48%" }}
            text={"Add Meal"}
            onPress={() => navigation.navigate("addMeal")}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <ProgressBarBox
            leftTextTop={"Revenue"}
            leftTextBottom={"This Week"}
            rightText={`$${"434.02"}`}
            leftProgressText={`Cost $${"4,340.19"}`}
            rightProgressText={`Refund ${"10%"}`}
            progressValue={80}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <ProgressBarBox
            leftTextTop={"Meals"}
            leftTextBottom={"Served"}
            rightText={"868"}
            leftProgressText={`Current week ${"868"}`}
            rightProgressText={`Last week ${"1,230"}`}
            progressValue={80}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: 20,
            padding: 15,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              borderColor: grayColor,
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "openSans_bold" }}>
              Pending pickups
            </Text>

            <Text
              style={{
                fontSize: 16,
                fontFamily: "openSans_bold",
                color: primaryShade1,
              }}
            >
              3 pending
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <PendingPickUps
              orderNo={"694-0876"}
              order={"Chicken Alfredo, Beef Bologon"}
              time={"7:30pm"}
              onPress={() =>
                navigation.navigate("orderDetail", {
                  data: {
                    orderNo: "694-0876",
                  },
                })
              }
            />
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <PendingPickUps
              orderNo={"694-0877"}
              order={"Chicken Tikka, Buffalo Wings"}
              time={"9:30pm"}
              onPress={() =>
                navigation.navigate("orderDetail", {
                  data: {
                    orderNo: "694-0877",
                  },
                })
              }
            />
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <PendingPickUps
              orderNo={"694-0879"}
              order={"Chicken Wings, Chicken Sashlik"}
              time={"11:30pm"}
              onPress={() =>
                navigation.navigate("orderDetail", {
                  data: {
                    orderNo: "694-0879",
                  },
                })
              }
            />
          </View>
        </View>
      </View>

      <ScanQrModal visible={qrModal} onRequestClose={() => setQrModal(false)} />
    </MainScreenContainer>
  );
};
