import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import person from "../../../../assets/images/person.png";
import bellIcon from "../../../../assets/images/bellIcon.png";
import {
  grayColor,
  grayShade1,
  grayShade2,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../../theme/colors";
import purpleCalender from "../../../../assets/images/purpleCalender.png";
import grayCalender from "../../../../assets/images/grayCalender.png";
import { Text } from "../../../../components/Text/Text";
import { ProgressBarBox } from "../../../../components/ProgressBarBox/ProgressBarBox";

export const InsightsPage = ({ setselected }) => {
  const [selectedAnnual, setselectedAnnual] = useState(0);

  return (
    <MainScreenContainer
      leftImage={person}
      rightImage={bellIcon}
      title={"Insights"}
    >
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 50,
        }}
      >
        <View style={{ width: "90%", alignItems: "center" }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              backgroundColor: grayShade2,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(0)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 0 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 0 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Week
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(1)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 1 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 1 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Month
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                height: 50,
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setselectedAnnual(2)}
            >
              <View
                style={{
                  width: "95%",
                  height: 47,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    selectedAnnual === 2 ? "white" : "transparent",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={selectedAnnual === 2 ? purpleCalender : grayCalender}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "openSans_bold",
                    marginLeft: 5,
                    color: primaryShade1,
                  }}
                >
                  Year
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <Text
              style={{
                color: grayTextColor,
                fontSize: 16,
                textTransform: "uppercase",
                fontFamily: "openSans_bold",
                marginLeft: 5,
              }}
            >
              key Numbers
            </Text>

            <View style={{ width: "100%", marginTop: 10 }}>
              <ProgressBarBox
                leftTextTop={"Revenue"}
                rightText={`$${"434.02"}`}
                progressValue={60}
                leftProgressText={`Cost $${"4,340"}`}
                rightProgressText={`Refund ${10}%`}
              />
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "48%",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Meals Served
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 28,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    868
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Cost of Meals
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 28,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    $4,340
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 10 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "48%",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Food Ratings
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 28,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    3.8
                  </Text>
                </View>
                <View
                  style={{
                    width: "48%",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Resturant Ratings
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      fontSize: 28,
                      fontFamily: "openSans_bold",
                    }}
                  >
                    4.1
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  color: grayTextColor,
                  fontSize: 16,
                  textTransform: "uppercase",
                  fontFamily: "openSans_bold",
                  marginLeft: 5,
                }}
              >
                top served item
              </Text>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2021/05/10/0/WU0502H_spicy-roasted-chicken-legs-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1620689296042.jpeg",
                  }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        flex: 0.9,
                        fontSize: 18,
                        fontFamily: "openSans_bold",
                      }}
                    >
                      Chicken Tikka
                    </Text>
                    <View style={{ width: "100%", marginTop: 0 }}>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, color: grayTextColor }}
                      >
                        124 orders
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
