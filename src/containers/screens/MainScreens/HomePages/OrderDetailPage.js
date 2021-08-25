import React, { useState } from "react";
import { View, Image } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import leftImage from "../../../../assets/images/backIcon.png";
import {
  grayColor,
  grayTextColor,
  primaryColor,
  primaryShade1,
  redShade1,
} from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { Chip } from "../../../../components/Chip/Chip";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

export const OrderDetailPage = (props) => {
  const { orderNo } = props?.route?.params?.data;
  const [isApproved, setisApproved] = useState(false);
  const [isDeclined, setisDeclined] = useState(false);

  return (
    <MainScreenContainer
      leftImage={leftImage}
      title={`Order  ${orderNo || "694-0879"}`}
    >
      <View
        style={{
          width: "100%",
          marginTop: 10,
          marginBottom: 30,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "white",
              marginTop: 100,
              paddingBottom: 20,
            }}
          >
            <Image
              style={{
                width: 130,
                height: 130,
                borderRadius: 150,
                borderWidth: 6,
                borderColor: primaryColor,
                marginTop: -60,
              }}
              source={{
                uri: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t1.6435-1/s480x480/66773205_2450461051842661_6209794807548608512_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeEcynmLmmwi69IIKTc3JYBP9Tw0RnEUYjL1PDRGcRRiMisNhVbORWXZMJDUlpF4cUini6e3nxUssWotuTmzg6Ef&_nc_ohc=kV-BSuT6TcYAX-sPQ0r&_nc_ht=scontent.fkhi2-2.fna&oh=ce0cf49db4a4e8e47ad035f106ae75e0&oe=614CBB60",
              }}
            />

            <Text
              style={{
                width: "90%",
                fontFamily: "openSans_bold",
                fontSize: 24,
                color: "black",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Ali Haider
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: grayTextColor,
                marginTop: 5,
              }}
            >
              Driving license #7034985730
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: grayTextColor,
                marginTop: 5,
              }}
            >
              (030) 6-2888544
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontFamily: "openSans_bold",
                  fontSize: 14,
                  textTransform: "uppercase",
                }}
              >
                Requested Meal
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                }}
              >
                Quantity
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Image
                    source={{
                      uri: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t1.6435-1/s480x480/66773205_2450461051842661_6209794807548608512_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeEcynmLmmwi69IIKTc3JYBP9Tw0RnEUYjL1PDRGcRRiMisNhVbORWXZMJDUlpF4cUini6e3nxUssWotuTmzg6Ef&_nc_ohc=kV-BSuT6TcYAX-sPQ0r&_nc_ht=scontent.fkhi2-2.fna&oh=ce0cf49db4a4e8e47ad035f106ae75e0&oe=614CBB60",
                    }}
                    style={{
                      aspectRatio: 1 / 1,
                      borderRadius: 100,
                      borderWidth: 3,
                      borderColor: primaryColor,
                    }}
                  />
                </View>
                <View style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontFamily: "openSans_semiBold",
                      fontSize: 22,
                      color: "black",
                    }}
                  >
                    Grilled Mediterranean
                  </Text>

                  <View style={{ width: 80, marginTop: 10 }}>
                    <Chip text={"Available"} />
                  </View>
                </View>
                <View style={{ width: "15%", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "black",
                    }}
                  >
                    2
                  </Text>
                </View>
              </View>
            </View>

            {isApproved || isDeclined ? (
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: isApproved ? grayTextColor : redShade1,
                    borderWidth: isDeclined ? 2 : 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: 22,
                      color: isApproved ? "black" : redShade1,
                    }}
                  >
                    {isApproved ? "Approved" : "Declined"}
                  </Text>

                  <View>
                    <Text
                      style={{ fontSize: 16, fontFamily: "openSans_semiBold" }}
                    >
                      on July 27 10:31pm
                    </Text>
                    <Text style={{ fontSize: 13, marginTop: 5 }}>
                      by Ali Haider
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <RegularButton
                  onPress={() => setisApproved(true)}
                  text={"Approve"}
                />
                <View style={{ width: "100%", marginTop: 10 }}>
                  <RegularButton
                    onPress={() => setisDeclined(true)}
                    colors={["white", "white"]}
                    textStyle={{ color: primaryShade1 }}
                    style={{ borderWidth: 2, borderColor: primaryShade1 }}
                    text={"Decline"}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
