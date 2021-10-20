import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import pdfIcon from "../../../../assets/images/whitePdf.png";
import {
  grayBorderColor,
  grayColor,
  grayShade1,
  grayShade2,
  grayTextColor,
  primaryColor,
  primaryShade1,
} from "../../../../theme/colors";
import profileGray from "../../../../assets/images/profileGray.png";
import purpleWhiteArrow from "../../../../assets/images/purpleWhiteArrow.png";
import recipeVessel from "../../../../assets/images/recipeVessel.png";
import { Text } from "../../../../components/Text/Text";
import { ProgressBarBox } from "../../../../components/ProgressBarBox/ProgressBarBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { useSelector } from "react-redux";
import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";
import { flexDirection } from "styled-system";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

const FoodItemDetail = ({ device }) => (
  <View
    style={{
      width: "100%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: device === "tablet" ? 20 : 10,
      flexDirection: device === "tablet" ? "row" : "column",
      justifyContent: "space-between",
      marginTop: 20,
    }}
  >
    <View
      style={{
        width: device === "tablet" ? "30%" : "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: device === "tablet" ? 20 : 15,
            resizeMode: "contain",
          }}
          source={recipeVessel}
        />
        <Text
          style={{
            fontSize: 16,
            color: "black",
            fontFamily: "openSans_bold",
            marginLeft: 10,
            flex: 1,
          }}
        >
          Food Item Name
        </Text>
      </View>

      <View
        style={{
          width: "20%",
          alignItems: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "black",
            fontFamily: "openSans_bold",
          }}
        >
          4
        </Text>
      </View>
    </View>
    <View
      style={{
        width: device === "tablet" ? "65%" : "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {[1, 2, 3, 4].map((i, index) => (
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            flexDirection: device === "tablet" ? "row" : "column",
            marginTop: index !== 0 ? 10 : 0,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Instructions for {i}:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: device === "tablet" ? 10 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac mi
              aliquet, tristique sem vel, cursus neque. Ut luctus vehicula nibh
              non maximus.
            </Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export const KitchenDetailPage = () => {
  const [selectedAnnual, setselectedAnnual] = useState(0);
  const [search, setSearch] = useState("");
  const [lossInKitchen, setlossInKitchen] = useState([]);
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = [];

    const finalData = realData.filter((item) =>
      item?.item?.toLowerCase()?.includes(keyword)
    );

    setlossInKitchen(finalData);
  };

  return (
    <MainScreenContainer title={"Order 469"}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 50,
        }}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{
              width: "95%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 10,
                padding: device === "tablet" ? 20 : 10,
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: device === "tablet" ? "40%" : "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      fontSize: 22,
                      color: "black",
                      fontFamily: "openSans_bold",
                    }}
                  >
                    Order 469
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: grayTextColor,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    Table 23
                  </Text>
                </View>

                <View
                  style={{
                    width: "50%",
                    alignItems: "flex-end",
                  }}
                >
                  <Image source={purpleWhiteArrow} />
                  <Text
                    style={{
                      fontSize: 16,
                      color: primaryColor,
                      marginTop: 5,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    2 mins ago
                  </Text>
                </View>
              </View>

              <View
                style={{
                  width: device === "tablet" ? "60%" : "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: device === "tablet" ? 0 : 20,
                }}
              >
                <RegularButton
                  colors={["white", "white"]}
                  textStyle={{ color: primaryShade1 }}
                  style={{
                    borderWidth: 2,
                    borderColor: primaryShade1,
                    width: device === "tablet" ? 140 : "48%",
                    height: 50,
                  }}
                  text={"Reject"}
                />

                <RegularButton
                  text={"Accept"}
                  style={{
                    width: device === "tablet" ? 140 : "48%",
                    height: 50,
                    marginLeft: 20,
                  }}
                />
              </View>
            </View>

            <FoodItemDetail device={device} />
            <FoodItemDetail device={device} />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
