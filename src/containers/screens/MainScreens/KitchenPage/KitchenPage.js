import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import {
  grayShade2,
  grayTextColor,
  primaryColor,
} from "../../../../theme/colors";
import profileGray from "../../../../assets/images/profileGray.png";
import purpleWhiteArrow from "../../../../assets/images/purpleWhiteArrow.png";
import { Text } from "../../../../components/Text/Text";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const KitchenOrder = ({ device }) => (
  <View
    style={{
      width: "100%",
      backgroundColor: "white",
      borderRadius: 10,
    }}
  >
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: grayShade2,
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
      <View style={{ width: "50%", alignItems: "flex-end" }}>
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
        width: "100%",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: grayShade2,
      }}
    >
      {[1, 2, 3, 4].map(() => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontFamily: "openSans_semiBold",
              flex: 0.9,
            }}
            numberOfLines={1}
          >
            Food Item Name
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: "black",
              fontFamily: "openSans_semiBold",
            }}
          >
            5
          </Text>
        </View>
      ))}
    </View>

    <View
      style={{
        width: "100%",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: device === "tablet" ? 25 : 15,
            resizeMode: "contain",
          }}
          source={profileGray}
        />
        <Text
          style={{
            fontSize: 18,
            color: grayTextColor,
            marginLeft: 10,
            fontFamily: "openSans_bold",
          }}
          numberOfLines={1}
        >
          Susan
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          color: grayTextColor,
          marginLeft: 10,
        }}
      >
        Preparing
      </Text>
    </View>
  </View>
);

export const KitchenPage = () => {
  const navigation = useNavigation();
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
    <MainScreenContainer title={"Kitchen"}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 50,
        }}
      >
        <View style={{ width: "95%", alignItems: "center" }}>
          <View
            style={{
              width: "100%",
            }}
          >
            {/* <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
              style={{
                borderWidth: 2,
                borderColor: grayColor,
                marginTop: 0,
                width: device === "tablet" ? "50%" : "100%",
              }}
            /> */}

            <View
              style={{
                width: "100%",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <FlatList
                key={orientation === "portrait" ? 1 : 2}
                numColumns={
                  device === "tablet" ? (orientation === "portrait" ? 3 : 4) : 1
                }
                style={{
                  width: "100%",
                  overflow: "hidden",
                }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11]}
                keyExtractor={(item) => `${item}`}
                renderItem={() => (
                  <TouchableOpacity
                    style={{
                      width:
                        device === "tablet"
                          ? orientation === "portrait"
                            ? "31%"
                            : "22%"
                          : "100%",
                      marginTop: 20,
                      marginHorizontal: device === "tablet" ? 10 : 0,
                    }}
                    onPress={() => navigation.navigate("KitchenDetailPage")}
                  >
                    <KitchenOrder />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
