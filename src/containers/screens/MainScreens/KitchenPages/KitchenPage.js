import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { width } from "styled-system";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Text } from "../../../../components/Text/Text";
import { kitchenMenuColor, primaryColor } from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { SpikeOrder } from "../../../../components/SpikeOrder/SpikeOrder";
import { MainOrder } from "../../../../components/MainOrder/MainOrder";
import { Chip } from "../../../../components/Chip/Chip";
import { useIsFocused } from "@react-navigation/native";
import * as actions from "../../../../Redux/actions/PosActions/OrderActions";
import { HEIGHT } from "../../../../helpers/utlils";
import { Spinner } from "native-base";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";

export const KitchenPage = () => {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const { isLoading, isError, orders } = useSelector(
    (state) => state.pos.orders
  );
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState("");
  const screenFocused = useIsFocused();
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );

  useEffect(() => {
    if (!screenFocused) return;

    dispatch(
      actions.fetchAllOrders({ locationId: defaultLocation.locationId })
    );
  }, [screenFocused]);

  const updateOrder = (orderId) =>
    dispatch(
      actions.orderUpdateAction({
        locationId: defaultLocation.locationId,
        orderId,
      })
    );

  if (device === "tablet") {
    return (
      <MainScreenContainer>
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
                    style={{ marginLeft: 10 }}
                    onPress={() => setSelected(1)}
                  >
                    <Chip text={"Ticket Spike"} selected={selected === 1} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => setSelected(2)}
                  >
                    <Chip text={"Waiting Orders"} selected={selected === 2} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => setSelected(3)}
                  >
                    <Chip text={"All orders"} selected={selected === 3} />
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.2, zIndex: 10 }}>
                  <Dropdown
                    selectedMenu={category}
                    menus={["Show all", "ali"]}
                    setMenu={(val) => setCategory(val)}
                    placeholder={"Quantity"}
                    style={{ zIndex: 10 }}
                  />
                </View>
              </View>

              <View style={{ marginTop: 20, zIndex: 0 }} />

              <FlatList
                ListEmptyComponent={() => (
                  <NoMealBox text={"There are no orders available"} />
                )}
                data={orders ?? []}
                numColumns={3}
                columnWrapperStyle={{ marginLeft: -10, marginTop: 10 }}
                renderItem={
                  selected === 3
                    ? ({ item, index }) => <SpikeOrder />
                    : selected === 0
                    ? ({ item, index }) => (
                        <MainOrder updateOrder={updateOrder} data={item} />
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
