import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { PredictionTableItem } from "../../../../components/InventoryPredictions/PredictionTableItem";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { Text } from "../../../../components/Text/Text";
import {
  borderColor2,
  chartHeaderColor,
  grayTextColor,
} from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";

export const WasteItemDetail = () => {
  const device = useSelector((state) => state.system.device);
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = [];
    const finalData = realData.filter((item) =>
      item.recipeTitle?.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Sunfiled Chicken Sliced"} />

      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <View style={{ width: "95%" }}>
          <SearchInput
            search={search}
            setSearch={setSearch}
            searchKeyword={searchKeyword}
          />

          <View
            style={{ width: "100%", marginTop: device === "tablet" ? 20 : 0 }}
          >
            {device === "tablet" ? (
              <View
                style={{
                  width: "100%",
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                {/* headings start */}
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    paddingVertical: 15,
                    backgroundColor: chartHeaderColor,
                    borderRadius: 10,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        marginLeft: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      Recipe
                    </Text>
                  </View>
                  <View style={{ width: 100 }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      total cost
                    </Text>
                  </View>
                  <View style={{ width: 100 }}></View>
                </View>

                {/* headings ends */}
                <View style={{ backgroundColor: "white", width: "100%" }}>
                  {[1, 2, 3].map((item, i) => (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        paddingVertical: 15,
                        backgroundColor:
                          i % 2 === 1 ? chartHeaderColor : "white",
                        borderRadius: 10,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_semiBold",
                            fontSize: 16,
                            color: "black",
                            marginLeft: 10,
                          }}
                        >
                          One-Pan Honey Mustard Chicken
                        </Text>
                      </View>
                      <View style={{ width: 100 }}>
                        <Text
                          style={{
                            fontFamily: "openSans_semiBold",
                            fontSize: 16,
                            color: "black",
                          }}
                        >
                          $ 10,30
                        </Text>
                      </View>
                      <View style={{ width: 100 }}>
                        <Text style={{ fontSize: 12, color: "#868686" }}>
                          View Recipe
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <>
                {[1, 2, 4].map((item, i) => (
                  <View
                    style={{
                      width: "100%",
                      paddingVertical: 15,
                      backgroundColor: "white",
                      borderBottomWidth: 1,
                      borderColor: borderColor2,
                    }}
                  >
                    <View style={{ width: "100%", flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                          }}
                        >
                          <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text
                              style={{
                                flex: 0.9,
                                color: "black",
                                fontFamily: "openSans_semiBold",
                                fontSize: 16,
                              }}
                            >
                              Chicken Piccata
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 0.2,
                            }}
                          >
                            <Text
                              style={{
                                flex: 0.9,
                                color: "black",
                                fontFamily: "openSans_semiBold",
                                fontSize: 16,
                              }}
                              numberOfLines={1}
                            >
                              $122
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                            flex: 1,
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "flex-start",
                              marginLeft: 10,
                            }}
                          >
                            <Text
                              style={{ color: grayTextColor, fontSize: 12 }}
                            >
                              View recipe
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
