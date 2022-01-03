import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { width } from "styled-system";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Text } from "../../../../components/Text/Text";
import {
  chartHeaderColor,
  kitchenMenuColor,
  primaryColor,
} from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { SpikeOrder } from "../../../../components/SpikeOrder/SpikeOrder";
import { MainOrder } from "../../../../components/MainOrder/MainOrder";
import { Chip } from "../../../../components/Chip/Chip";
import { useIsFocused } from "@react-navigation/native";
import * as actions from "../../../../Redux/actions/PosActions/OrderActions";
import * as systemAction from "../../../../Redux/actions/SystemActions/SystemActions";
import { HEIGHT } from "../../../../helpers/utlils";
import { Spinner } from "native-base";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import { ToastError } from "../../../../helpers/Toast";

export const KitchenPage = () => {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const orientation = useSelector((state) => state.system.orientation);
  const { isLoading, isSuccess, orders, doneOrders, createdOrders } =
    useSelector((state) => state.pos.orders);
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState("");
  const screenFocused = useIsFocused();
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [orderstOserve, setOrderstOserve] = useState([]);
  const [checkedMeals, setCheckedMeals] = useState([]);

  useEffect(() => {
    if (!screenFocused) return;
    if (device === "tablet") {
      dispatch(systemAction.setIsMenuSmall({ isSmall: true }));
    } else {
      dispatch(systemAction.setIsMenuSmall({ isSmall: false }));
    }

    dispatch(
      actions.fetchAllOrders({ locationId: defaultLocation.locationId })
    );

    return () => {
      dispatch(systemAction.setIsMenuSmall({ isSmall: false }));
    };
  }, [screenFocused]);

  const updateOrder = (orderId) => {
    const meal = orderstOserve.filter((item) => item.orderId === orderId);
    const mainOrder = createdOrders?.find((item) => item?.orderId === orderId);

    if (meal.length === 0) {
      ToastError("Kindly select a meal to serve!");
      return;
    }

    if (meal[0]?.meals?.length === 0) {
      ToastError("Kindly select a meal to serve!");
      return;
    }

    console.log(meal);

    // if (
    //   meal[0].meals?.length ===
    //     createdOrders
    //       .filter((item) => item.orderId === orderId)[0]
    //       .catalog.filter((item) => !item.served).length ||
    //   meal[0].meals?.length ===
    //     createdOrders.filter((item) => item.orderId === orderId)[0].catalog
    //       .length
    // ) {
    //   dispatch(
    //     actions.orderUpdateAction({
    //       locationId: defaultLocation.locationId,
    //       orderId,
    //     })
    //   );
    //   return;
    // }

    dispatch(
      actions.orderMarkServedAction({
        locationId: defaultLocation.locationId,
        orderId,
        ticketNo: meal[0]?.ticketNo,
        meals: meal[0].meals?.map((item) => item?.mealName),
      })
    );
  };

  const completeOrder = (orderId) => {
    dispatch(
      actions.orderUpdateAction({
        locationId: defaultLocation.locationId,
        orderId,
        isLoading: false,
      })
    );
  };

  const onClickCheckBox = (val, meal) => {
    console.log(meal);
    const mealPresent =
      orderstOserve.filter((item) => item.orderId === meal.orderId).length > 0;
    if (mealPresent) {
      const allOrders = [...orderstOserve];
      const index = allOrders.findIndex(
        (item) => item.orderId === meal.orderId
      );
      allOrders[index] = {
        ...allOrders[index],
        meals: val
          ? [
              ...allOrders[index].meals,
              { mealName: meal.mealName, index: meal?.index },
            ]
          : allOrders[index].meals?.filter((item) => item.index !== meal.index),
      };
      setCheckedMeals([...checkedMeals.filter((item) => item !== meal.index)]);
      setOrderstOserve(allOrders);
      return;
    }
    const allOrders = [...orderstOserve];
    setCheckedMeals([...checkedMeals, meal?.index]);
    allOrders.push({
      orderId: meal.orderId,
      meals: [{ mealName: meal.mealName, index: meal?.index }],
      ticketNo: meal.ticketNo,
    });
    setOrderstOserve(allOrders);
  };

  if (device === "tablet") {
    return (
      <MainScreenContainer shortDrawer isDrawer>
        {defaultLocation?.locationId ? (
          isLoading ? (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                paddingVertical: 20,
              }}
            >
              <Spinner size={"large"} color={primaryColor} />
            </View>
          ) : (
            <View style={{ width: "95%" }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                  zIndex: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 0.7,
                  }}
                >
                  <TouchableOpacity onPress={() => setSelected(0)}>
                    <Chip text={"KDS/Tickets"} selected={selected === 0} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => setSelected(1)}
                  >
                    <Chip text={"Ticket Spike"} selected={selected === 1} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => setSelected(2)}
                  >
                    <Chip text={"Waiting Orders"} selected={selected === 2} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => setSelected(3)}
                  >
                    <Chip text={"All orders"} selected={selected === 3} />
                  </TouchableOpacity>
                </View>

                {/* <View style={{ flex: 0.2, zIndex: 10 }}>
                  <Dropdown
                    selectedMenu={category}
                    menus={["Show all", "ali"]}
                    setMenu={(val) => setCategory(val)}
                    placeholder={"Quantity"}
                    style={{ zIndex: 10 }}
                  />
                </View> */}
              </View>

              <View style={{ marginTop: 20, zIndex: 0 }} />

              <FlatList
                key={selected}
                ListEmptyComponent={() => (
                  <NoMealBox text={"There are no orders available"} />
                )}
                data={
                  selected === 0
                    ? createdOrders
                    : selected === 1
                    ? doneOrders
                    : selected === 3
                    ? [...orders, ...doneOrders, ...createdOrders].length > 0
                      ? [1]
                      : []
                    : []
                }
                numColumns={3}
                columnWrapperStyle={{
                  marginLeft: -10,
                  marginTop: 10,
                }}
                style={{
                  marginBottom: 20,
                }}
                renderItem={
                  selected === 1
                    ? ({ item, index }) => <SpikeOrder data={item} />
                    : selected === 0
                    ? ({ item, index }) => (
                        <MainOrder
                          meals={
                            orderstOserve.filter(
                              (meal) => meal.orderId === item.orderId
                            ).length > 0
                              ? orderstOserve.filter(
                                  (meal) => meal.orderId === item.orderId
                                )[0]?.meals
                              : []
                          }
                          updateOrder={updateOrder}
                          data={item}
                          onChange={onClickCheckBox}
                          completeOrder={completeOrder}
                          checkedMeals={checkedMeals}
                        />
                      )
                    : selected === 3
                    ? ({ item, index }) => (
                        <ScrollView horizontal style={{ flex: 1 }}>
                          <View
                            style={{
                              width: "100%",
                              marginBottom: 20,
                              marginTop: 10,
                              backgroundColor: "white",
                              padding: 30,
                              borderRadius: 38,
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
                              <View style={{ width: 270 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "black",
                                    marginLeft: 10,
                                  }}
                                >
                                  Items
                                </Text>
                              </View>
                              <View
                                style={{ width: 150, alignItems: "center" }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "black",
                                  }}
                                >
                                  Quantity
                                </Text>
                              </View>
                              <View style={{ width: 150 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "black",
                                  }}
                                >
                                  Menu price
                                </Text>
                              </View>
                              <View style={{ width: 150 }}>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: "black",
                                  }}
                                >
                                  Time
                                </Text>
                              </View>
                            </View>
                            {/* headings ends */}
                            <View style={{ backgroundColor: "white" }}>
                              {[
                                ...orders.map((item) => item.catalog),
                                ...doneOrders.map((item) => item.catalog),
                                ...createdOrders.map((item) => item.catalog),
                              ]
                                .flat(Infinity)
                                .map((meal, i) => (
                                  <View
                                    style={{
                                      width: "100%",
                                      flexDirection: "row",
                                      paddingVertical: 15,
                                      backgroundColor: "white",
                                      borderRadius: 10,
                                      borderBottomLeftRadius: 0,
                                      borderBottomRightRadius: 0,
                                    }}
                                  >
                                    {/* {console.log(meal)} */}
                                    <View style={{ width: 270 }}>
                                      <Text
                                        style={{
                                          fontFamily: "openSans_semiBold",
                                          fontSize: 16,
                                          color: "black",
                                          marginLeft: 10,
                                        }}
                                      >
                                        {meal?.mealName}
                                      </Text>
                                    </View>
                                    <View
                                      style={{
                                        width: 150,
                                        alignItems: "center",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontFamily: "openSans_semiBold",
                                          fontSize: 16,
                                          color: "black",
                                        }}
                                      >
                                        {meal.quantity}
                                      </Text>
                                    </View>
                                    <View style={{ width: 150 }}>
                                      <Text
                                        style={{
                                          fontFamily: "openSans_semiBold",
                                          fontSize: 16,
                                          color: "black",
                                        }}
                                      >
                                        ${meal.mealPrice}
                                      </Text>
                                    </View>
                                    <View style={{ width: 150 }}>
                                      <Text
                                        style={{
                                          fontFamily: "openSans_semiBold",
                                          fontSize: 16,
                                          color: "black",
                                        }}
                                      >
                                        {meal.mealTime}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                            </View>
                          </View>
                        </ScrollView>
                      )
                    : () => <View />
                }
              />
            </View>
          )
        ) : (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: HEIGHT - 100,
            }}
          >
            <Text style={{ fontSize: 20, width: "80%", textAlign: "center" }}>
              You need to add atleast one location to start order 😃
            </Text>
          </View>
        )}
      </MainScreenContainer>
    );
  }

  return <View />;
};
