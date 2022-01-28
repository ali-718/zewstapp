import { Progress, Checkbox } from "native-base";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { grayTextColor, kitchenMenuColor } from "../../theme/colors";
import { RegularButton } from "../Buttons/RegularButton";
import { Text } from "../Text/Text";
import moment from "moment";
import uuid from "react-native-uuid";

export const MainOrder = ({
  data,
  updateOrder,
  onChange,
  meals,
  completeOrder,
  isSuccess,
}) => {
  const {
    timestamp = "",
    ticketNo = "",
    price = "",
    stature = "",
    tableInfo = {},
    catalog = [],
    loading = false,
    orderId = "",
    isdoneLoading = false,
  } = data;

  let allCategories = catalog?.map((item) => item.recipe.recipeCategory);
  allCategories = [...new Set(allCategories)];

  return (
    <View
      style={{
        backgroundColor: "white",
        borderColor: kitchenMenuColor,
        borderWidth: 1,
        marginLeft: 10,
        width: "32%",
        padding: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            backgroundColor: kitchenMenuColor,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>
            {tableInfo?.orderId ? "Table" : "Ticket"}{" "}
            {tableInfo?.orderId ? tableInfo?.name : ticketNo}
          </Text>
        </View>
        <Text style={{ color: "black", marginLeft: 15, fontSize: 12 }}>
          {moment(timestamp).format("h:m a")}
        </Text>
      </View>

      <Progress
        size={"xs"}
        style={{ marginTop: 20 }}
        colorScheme={
          stature === "CREATED" || stature === "PAID"
            ? "green"
            : stature === "DONE"
            ? "red"
            : "yellow"
        }
        value={35}
      />

      <Text style={{ color: grayTextColor, marginTop: 10, fontSize: 12 }}>
        {timestamp}
      </Text>
      {/* <Text style={{ color: grayTextColor, marginTop: 10 }}>Order by Sara</Text> */}
      <View style={{ marginTop: 10 }} />

      <View style={{ width: "100%", flex: 1, justifyContent: "space-between" }}>
        <View style={{ width: "100%" }}>
          {catalog
            .filter((data) => !data.served)
            .map((item, index) => (
              <View
                key={index}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                {console.log(meals)}
                <Checkbox
                  onChange={(val) => onChange(val, { ...item, ...data, index })}
                  value="info"
                  colorScheme="green"
                  size="sm"
                  isChecked={
                    meals.filter((meal) => meal.index === index).length > 0
                  }
                />
                <Text
                  style={{
                    color: grayTextColor,
                    marginLeft: 10,
                    fontSize: 16,
                  }}
                >
                  {item.mealName}

                  {item?.new ? (
                    <Text
                      style={{
                        color: "#F90000",
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      NEW
                    </Text>
                  ) : null}
                </Text>
              </View>
            ))}
          {/* {allCategories
            .filter((item) => {
              return (
                catalog.filter(
                  (data) => !data.served && item === data.recipe.recipeCategory
                ).length > 0
              );
            })
            .map((category, i) => (
              <View
                key={i}
                style={{
                  width: "100%",
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "openSans_semiBold",
                    marginVertical: 10,
                  }}
                >
                  {category}
                </Text>
                {catalog
                  .filter(
                    (data) =>
                      !data.served && category === data.recipe.recipeCategory
                  )
                  .map((item, index) => (
                    <View
                      key={index}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        marginTop: 5,
                      }}
                    >
                      {console.log(meals)}
                      <Checkbox
                        onChange={(val) =>
                          onChange(val, { ...item, ...data, index })
                        }
                        value="info"
                        colorScheme="green"
                        size="sm"
                        isChecked={
                          meals.filter((meal) => meal.index === index).length >
                          0
                        }
                      />
                      <Text
                        style={{
                          color: grayTextColor,
                          marginLeft: 10,
                          fontSize: 16,
                        }}
                      >
                        {item.mealName}

                        {item?.new ? (
                          <Text
                            style={{
                              color: "#F90000",
                              fontSize: 12,
                            }}
                          >
                            {" "}
                            NEW
                          </Text>
                        ) : null}
                      </Text>
                    </View>
                  ))}
              </View>
            ))} */}

          {/* {catalog
            .filter((item) => {
              return (
                !item.served &&
                allCategories.filter(
                  (data) => data === item.recipe.recipeCategory
                ).length > 0
              );
            })

            .map((item) => (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <Checkbox
                  onChange={(val) => onChange(val, { ...item, ...data })}
                  value="info"
                  colorScheme="green"
                  size="sm"
                  isChecked={
                    meals.filter((meal) => item.mealName === meal).length > 0
                  }
                />
                <Text
                  style={{ color: grayTextColor, marginLeft: 10, fontSize: 16 }}
                >
                  {item.mealName}
                </Text>
              </View>
            ))} */}
        </View>
        {/* {[1, 2, 3].map((item, i) => (
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              value="info"
              colorScheme="green"
              defaultIsChecked
              size="sm"
              style={{ opacity: 0 }}
            />

            <Text
              style={{
                color: "black",
                marginLeft: 10,
                fontSize: 18,
                fontFamily: "openSans_semiBold",
              }}
            >
              Margarita
            </Text>
          </View>
          {[1, 2, 3].map((item) => (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                marginTop: 5,
              }}
            >
              <Checkbox
                value="info"
                colorScheme="green"
                defaultIsChecked
                size="sm"
              />
              <Text
                style={{ color: grayTextColor, marginLeft: 10, fontSize: 16 }}
              >
                Margarita
              </Text>
            </View>
          ))}
        </View>
      ))} */}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <RegularButton
            onPress={() => {
              completeOrder(orderId);
            }}
            white
            text={"Done"}
            style={{ width: "45%", height: 40 }}
            isLoading={isdoneLoading}
          />
          <RegularButton
            isLoading={loading}
            onPress={() => updateOrder(orderId)}
            text={"serve"}
            style={{ width: "45%", height: 40 }}
          />
        </View>
      </View>
    </View>
  );
};
