import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { MainScreenContainer } from "../../MainScreenContainers";
import { HeadingBox } from "../../../components/HeadingBox/HeadingBox";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../../components/Text/Text";
import {
  availableTableColor,
  grayColor,
  grayMenuText,
  grayShade2,
  occupiedTableColor,
  orderBillBackground,
  primaryColor,
  reservedTableColor,
} from "../../../theme/colors";
import { categoriesList, HEIGHT } from "../../../helpers/utlils";
import * as actions from "../../../Redux/actions/PosActions/OrderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError } from "../../../helpers/Toast";
import { Spinner } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { getRandomColor } from "../../../helpers/utlils";
import { order } from "styled-system";
import { RegularButton } from "../../../components/Buttons/RegularButton";
import deleteIcon from "../../../assets/images/deleteIcon.png";
import { Chip } from "../../../components/Chip/Chip";

const CategoryComponent = ({ width, name, onPress }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (color === "") {
      setColor(getRandomColor());
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: width || "30%",
        borderRadius: 20,
        backgroundColor: color,
        minHeight: 120,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          color: "white",
          margin: 10,
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const MealComponent = ({ meal, onPress, width }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (color === "") {
      setColor(getRandomColor());
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        width: width || "30%",
        borderRadius: 20,
        backgroundColor: color,
        minHeight: 100,
        marginLeft: "2%",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 25,
          color: "white",
          margin: 10,
          fontFamily: "openSans_semiBold",
          textAlign: "center",
        }}
      >
        {meal.selected}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "white",
          margin: 10,
          marginTop: 0,
        }}
      >
        {meal.mealName}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "white",
          margin: 10,
          marginTop: 0,
        }}
      >
        ${meal.mealPrice}
      </Text>
    </TouchableOpacity>
  );
};

export const OrderTakingScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const { categories, meals, isLoading, isError } = useSelector(
    (state) => state.pos.meal
  );
  const {
    isSuccess,
    orderId,
    isLoading: orderLoading,
    isError: orderError,
  } = useSelector((state) => state.pos.createOrder);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDefaultLocation, setIsDefaultLocation] = useState(false);
  const [mealsToShow, setMealsToShow] = useState([]);
  const [tableNo, setTableNo] = useState(props.route?.params?.tableNo ?? "");
  const [orderList, setOrderList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [charge, setCharge] = useState(false);
  const [createOrderLoading, setcreateOrderLoading] = useState(orderLoading);
  const [loadingLabel, setLoadingLabel] = useState("Loading");
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (!orderError) return;

    setcreateOrderLoading(orderLoading);
  }, [orderError]);

  useEffect(() => {
    if (!isSuccess) return;
    if (firstTime) return;

    setcreateOrderLoading(true);
    setLoadingLabel("Confirming payment");

    actions
      .payOrderAction({
        orderId,
        locationId: defaultLocation.locationId,
      })
      .then((res) => {
        setLoadingLabel("Attaching order to table");
        actions
          .attachOrderToTableAction({
            table: props.route.params.table,
            orderId,
          })
          .then((res) => {
            setLoadingLabel("Reserving table for customer");
            actions
              .changeTableStatusAction({
                locationId: defaultLocation.locationId,
                tableId: props.route.params.tableId,
                stature: "RESERVED",
              })
              .then(() => {
                navigation.goBack();
                setcreateOrderLoading(false);
              })
              .catch((res) => {
                setcreateOrderLoading(false);
              });
          })
          .catch((res) => {
            setcreateOrderLoading(false);
          });
      })
      .catch((res) => {
        setcreateOrderLoading(false);
      });
  }, [isSuccess]);

  const createOrder = () => {
    if (orderList.length === 0) {
      ToastError("Select any menu item first!");
      return;
    }

    setFirstTime(false);
    setcreateOrderLoading(true);
    setLoadingLabel("Confirming order");

    const data = {
      client_id: user.clientId,
      locationId: defaultLocation.locationId,
      catalog: [
        ...orderList.map((item) => ({
          quantity: item.selected,
          recipe: item.mealRecipes[0],
          mealName: item.mealName,
          mealPrice: item.mealPrice,
        })),
      ],
      price: totalPrice,
      discount: 0,
      customerId: "12345",
    };

    dispatch(actions.createOrder(data));
  };

  useEffect(() => {
    setMealsToShow(meals.map((item) => ({ ...item, selected: 0 })));
  }, [meals]);

  useEffect(() => {
    if (!isScreenFocused) return;
    checkDefaultLocation();
    fetchAllMeals();
  }, [isScreenFocused]);

  const checkDefaultLocation = async () => {
    const location = defaultLocation.locationId;

    if (location === null) {
      setIsDefaultLocation(false);
      return;
    }

    setIsDefaultLocation(true);
  };

  const fetchAllMeals = async () => {
    const location = defaultLocation.locationId;

    if (location === null) return;

    dispatch(
      actions.fetchMealsAction({
        locationId: location,
      })
    );
  };

  const incrementMealItem = (id) => {
    const allMeals = [...mealsToShow];
    const index = allMeals.findIndex((item) => item.mealId === id);

    if (index > -1) {
      allMeals[index] = {
        ...allMeals[index],
        selected: allMeals[index].selected + 1,
      };

      setMealsToShow(allMeals);
    }
  };

  const createOrderList = (meal) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];

    setTotalPrice(totalPrice + meal.mealPrice);

    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);

      if (index > -1) {
        list[index] = {
          ...list[index],
          selected: list[index].selected + 1,
          totalPrice: list[index].totalPrice + meal.mealPrice,
        };
        setOrderList(list);
      }
      return;
    }

    list.push({ ...meal, selected: 1, totalPrice: meal.mealPrice });

    setOrderList(list);
  };

  const deleteOrderList = (meal) => {
    const check =
      orderList.filter((item) => item.mealId === meal.mealId).length > 0;

    const list = [...orderList];
    const allList = [...mealsToShow];

    setTotalPrice(totalPrice - meal.mealPrice);

    if (check) {
      const index = list.findIndex((item) => item.mealId === meal.mealId);
      const allIndex = mealsToShow.findIndex(
        (item) => item.mealId === meal.mealId
      );

      if (index > -1) {
        if (list[index].selected === 1) {
          list.splice(index, 1);
        } else {
          list[index] = {
            ...list[index],
            selected: list[index].selected - 1,
            totalPrice: list[index].totalPrice - meal.mealPrice,
          };
        }

        setOrderList(list);
      }

      if (allIndex > -1) {
        allList[allIndex] = {
          ...allList[index],
          selected: allList[allIndex].selected - 1,
        };

        setMealsToShow(allList);
      }
      return;
    }
  };

  if (device === "tablet") {
    return (
      <MainScreenContainer noScroll>
        <HeadingBox heading={""} />

        {isDefaultLocation ? (
          <View
            style={{
              width: "98%",
              marginTop: 20,
              height: "100%",
              flex: 1,
            }}
          >
            <ScrollView style={{ flex: 1 }}>
              {isLoading ? (
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
              ) : categories.length > 0 ? (
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <View style={{ width: "60%" }}>
                    <View style={{ width: "100%", marginTop: 20 }}>
                      <View
                        style={{
                          flex: 1,
                          flexWrap: "wrap",
                          flexDirection: "row",
                        }}
                      >
                        {categories.map((item) => (
                          <TouchableOpacity
                            onPress={() => setSelectedCategory(item)}
                            style={{ marginLeft: 10, marginTop: 10 }}
                          >
                            <Chip
                              selected={selectedCategory === item}
                              text={item}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>

                      {selectedCategory.length > 0 ? (
                        <View style={{ width: "100%", marginTop: 30 }}>
                          <FlatList
                            scrollEnabled={false}
                            data={mealsToShow.filter(
                              (item) => item.mealCategory === selectedCategory
                            )}
                            numColumns={3}
                            style={{
                              marginTop: 20,
                              width: "100%",
                              marginBottom: 50,
                            }}
                            renderItem={({ item }) => (
                              <MealComponent
                                onPress={() => {
                                  incrementMealItem(item.mealId);
                                  createOrderList(item);
                                }}
                                meal={item}
                              />
                            )}
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>

                  {selectedCategory.length > 0 ? (
                    <View
                      style={{
                        width: "40%",
                        backgroundColor: orderBillBackground,
                        padding: 10,
                        borderRadius: 10,
                        flexDirection: "column",
                        justifyContent: "space-between",
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
                        <Text
                          style={{
                            color: "black",
                            fontSize: device === "tablet" ? 28 : 22,
                            fontFamily: "openSans_semiBold",
                          }}
                        >
                          Table {tableNo}
                        </Text>
                      </View>

                      <View style={{ width: "100%", marginTop: 20 }}>
                        {orderList.map((item) => (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: 20,
                              width: "100%",
                            }}
                            key={item.mealId}
                          >
                            <Text style={{ flex: 0.9, fontSize: 18 }}>
                              x{item.selected} {item.mealName}
                            </Text>

                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontSize: 18 }}>
                                ${item.totalPrice?.toFixed(2)}
                              </Text>
                              <TouchableOpacity
                                onPress={() => deleteOrderList(item)}
                              >
                                <Image
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                    resizeMode: "contain",
                                  }}
                                  source={deleteIcon}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}

                        <View
                          style={{
                            width: "100%",
                            borderTopWidth: 1,
                            borderColor: grayShade2,
                            marginTop: 20,
                            paddingTop: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: "openSans_semiBold",
                            }}
                          >
                            Total:
                          </Text>

                          <Text
                            style={{
                              fontSize: 20,
                              fontFamily: "openSans_semiBold",
                            }}
                          >
                            ${totalPrice}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: "100%",
                            marginTop: 20,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {charge ? (
                            <RegularButton
                              isLoading={orderLoading || createOrderLoading}
                              colors={["white", "white"]}
                              style={{
                                borderWidth: 1,
                                borderColor: primaryColor,
                              }}
                              white
                              textStyle={{ color: primaryColor }}
                              onPress={createOrder}
                              text={`Cash`}
                              fullPageLoad
                              loadingLabel={loadingLabel}
                            />
                          ) : (
                            <RegularButton
                              onPress={() => setCharge(true)}
                              text={`Charge $${totalPrice}`}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
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
                  <Text
                    style={{ fontSize: 20, width: "80%", textAlign: "center" }}
                  >
                    You need to add atleast one meal added to start order 😃
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
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

  const [tab, setTab] = useState(0);

  return (
    <MainScreenContainer>
      <HeadingBox heading={""} />

      {isDefaultLocation ? (
        <View style={{ width: "90%", height: "100%" }}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => setTab(0)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 0 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>CATEGORIES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(1)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 1 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>MENU</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(2)}
              style={{
                width: "33%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 2 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>TABLE</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            {tab === 0 ? (
              <FlatList
                data={categories}
                numColumns={2}
                style={{
                  marginTop: 20,
                  width: "100%",
                  height: "100%",
                  paddingBottom: 20,
                }}
                columnWrapperStyle={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 10,
                }}
                renderItem={({ item }) => (
                  <CategoryComponent
                    onPress={() => setSelectedCategory(item)}
                    width={"48%"}
                    key={item}
                    name={item}
                  />
                )}
              />
            ) : tab === 1 ? (
              <FlatList
                data={mealsToShow.filter(
                  (item) => item.mealCategory === selectedCategory
                )}
                numColumns={2}
                style={{
                  marginTop: 20,
                  width: "100%",
                  marginBottom: 50,
                }}
                columnWrapperStyle={{
                  marginTop: 20,
                }}
                renderItem={({ item }) => (
                  <MealComponent
                    width={"45%"}
                    onPress={() => {
                      incrementMealItem(item.mealId);
                      createOrderList(item);
                    }}
                    meal={item}
                  />
                )}
              />
            ) : (
              <View style={{ width: "100%", marginTop: 20 }}>
                {orderList.map((item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                      width: "100%",
                    }}
                    key={item.mealId}
                  >
                    <Text style={{ flex: 0.9, fontSize: 18 }}>
                      x{item.selected} {item.mealName}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>${item.totalPrice}</Text>
                      <TouchableOpacity onPress={() => deleteOrderList(item)}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            marginLeft: 10,
                            resizeMode: "contain",
                          }}
                          source={deleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                <View
                  style={{
                    width: "100%",
                    borderTopWidth: 1,
                    borderColor: grayShade2,
                    marginTop: 20,
                    paddingTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    Total:
                  </Text>

                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "openSans_semiBold",
                    }}
                  >
                    ${totalPrice}
                  </Text>
                </View>

                <View
                  style={{
                    width: "100%",
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {charge ? (
                    <RegularButton
                      isLoading={orderLoading || createOrderLoading}
                      colors={["white", "white"]}
                      style={{
                        borderWidth: 1,
                        borderColor: primaryColor,
                      }}
                      textStyle={{ color: primaryColor }}
                      onPress={createOrder}
                      text={`Cash`}
                      white
                    />
                  ) : (
                    <RegularButton
                      onPress={() => setCharge(true)}
                      text={`Charge $${totalPrice}`}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
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
};
