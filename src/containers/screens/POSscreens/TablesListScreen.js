import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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
  occupiedTableColor,
  primaryColor,
  reservedTableColor,
} from "../../../theme/colors";
import { HEIGHT } from "../../../helpers/utlils";
import * as actions from "../../../Redux/actions/PosActions/OrderActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError } from "../../../helpers/Toast";
import { Spinner } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { setIsMenuSmall } from "../../../Redux/actions/SystemActions/SystemActions";

const TableComponent = ({
  width,
  tableNo,
  status,
  isLoading,
  navigation,
  tableId,
  table,
}) => (
  <TouchableOpacity
    onPress={
      status === "AVAILABLE"
        ? () => navigation.navigate("orderTaking", { tableNo, tableId, table })
        : status === "RESERVED"
        ? () =>
            navigation.navigate("orderTaking", {
              tableNo,
              tableId,
              table,
              isReserved: true,
            })
        : () => null
    }
    style={{
      width: width || "30%",
      borderRadius: 20,
      padding: 15,
      backgroundColor: "white",
      borderWidth: 1,
      borderColor:
        status === "AVAILABLE"
          ? availableTableColor
          : status === "RESERVED"
          ? reservedTableColor
          : occupiedTableColor,
    }}
  >
    <Text style={{ fontSize: 24, fontFamily: "openSans_semiBold" }}>
      {tableNo}
    </Text>

    {isLoading ? (
      <Spinner size={"large"} color={primaryColor} />
    ) : (
      <Text
        style={{
          fontSize: 12,
          color:
            status === "AVAILABLE"
              ? availableTableColor
              : status === "RESERVED"
              ? reservedTableColor
              : occupiedTableColor,
          marginTop: 20,
        }}
      >
        {status.toLowerCase()}
      </Text>
    )}
  </TouchableOpacity>
);

export const TablesListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insideRef = useRef();
  const outsideRef = useRef();
  const isScreenFocused = useIsFocused();
  const device = useSelector((state) => state.system.device);
  const { insideTables, outsideTables, isLoading, isError } = useSelector(
    (state) => state.pos.tables
  );
  const [insidetablesToShow, setInsidetablesToShow] = useState([]);
  const [outsidetablesToShow, setOutsidetablesToShow] = useState([]);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const [isDefaultLocation, setIsDefaultLocation] = useState(false);

  useEffect(() => {
    setInsidetablesToShow(insideTables);
  }, [insideTables]);

  useEffect(() => {
    setOutsidetablesToShow(outsideTables);
  }, [outsideTables]);

  useEffect(() => {
    if (!isScreenFocused) return;
    checkDefaultLocation();
    fetchAllTables();

    if (device === "tablet") {
      dispatch(setIsMenuSmall({ isSmall: true }));
    } else {
      dispatch(setIsMenuSmall({ isSmall: false }));
    }

    return () => {
      dispatch(setIsMenuSmall({ isSmall: false }));
    };
  }, [isScreenFocused]);

  const checkDefaultLocation = async () => {
    const location = defaultLocation.locationId;

    if (!!location == false) {
      setIsDefaultLocation(false);
      return;
    }

    setIsDefaultLocation(true);
  };

  const fetchAllTables = async () => {
    const location = defaultLocation.locationId;

    if (!!location == false) return;

    dispatch(
      actions.fetchTablesAction({
        locationId: location,
      })
    );
  };

  const addNewTable = async (type, location) => {
    const constlocation = defaultLocation.locationId;
    const checkLoading =
      [...insidetablesToShow, ...outsidetablesToShow].filter(
        (item) => item.isLoading
      ).length > 0;

    if (checkLoading) {
      console.log(checkLoading);
      return;
    }

    if (location === "INSIDE") {
      insideRef.current.scrollToEnd();

      setInsidetablesToShow([
        ...insidetablesToShow,
        {
          name: insidetablesToShow.length + 1,
          stature: "AVAILABLE",
          isLoading: true,
        },
      ]);

      actions
        .addTableAction({
          locationId: constlocation,
          name: insidetablesToShow.length + 1,
          location,
        })
        .then((res) => {
          dispatch(
            actions.fetchTablesAction({
              locationId: res.locationId,
              reload: false,
            })
          );
        })
        .catch((e) => {
          const arr = [...insidetablesToShow];

          setInsidetablesToShow(arr);
        });
    }
    if (location === "OUTSIDE") {
      outsideRef.current.scrollToEnd();

      setOutsidetablesToShow([
        ...outsidetablesToShow,
        {
          name: outsidetablesToShow.length + 1,
          stature: "AVAILABLE",
          isLoading: true,
        },
      ]);

      actions
        .addTableAction({
          locationId: constlocation,
          name: outsidetablesToShow.length + 1,
          location,
        })
        .then((res) => {
          dispatch(
            actions.fetchTablesAction({
              locationId: res.locationId,
              reload: false,
            })
          );
        })
        .catch((e) => {
          const arr = [...outsidetablesToShow];

          setOutsidetablesToShow(arr);
        });
    }
  };

  if (device === "tablet") {
    return (
      <MainScreenContainer noScroll>
        <HeadingBox heading={"Orders"} noBack />

        <View style={{ width: "90%", marginTop: 20 }}>
          <Text style={{ color: "black", fontSize: 18 }}>Tables</Text>
        </View>

        {isDefaultLocation ? (
          <View
            style={{
              width: "90%",
              marginTop: 20,
              height: "100%",
              flex: 1,
            }}
          >
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
            ) : (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <View style={{ width: "55%" }}>
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
                        color: grayMenuText,
                        textTransform: "uppercase",
                        fontSize: 16,
                      }}
                    >
                      Inside
                    </Text>
                    <TouchableOpacity
                      onPress={() => addNewTable(insidetablesToShow, "INSIDE")}
                    >
                      <Text
                        style={{
                          color: "black",
                          textDecorationLine: "underline",
                        }}
                      >
                        + Add a table
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ width: "100%", flex: 1 }}>
                    <FlatList
                      ref={insideRef}
                      data={insidetablesToShow}
                      numColumns={3}
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
                        <TableComponent
                          key={item.name}
                          tableNo={item.name}
                          status={item.stature}
                          isLoading={item?.isLoading}
                          navigation={navigation}
                          tableId={item?.tableId}
                          table={item}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={{ width: "35%" }}>
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
                        color: grayMenuText,
                        textTransform: "uppercase",
                        fontSize: 16,
                      }}
                    >
                      Outside
                    </Text>
                    <TouchableOpacity
                      onPress={() => addNewTable(outsideTables, "OUTSIDE")}
                    >
                      <Text
                        style={{
                          color: "black",
                          textDecorationLine: "underline",
                        }}
                      >
                        + Add a table
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    ref={outsideRef}
                    data={outsidetablesToShow}
                    numColumns={2}
                    style={{
                      marginTop: 20,
                      width: "100%",
                      marginBottom: 50,
                    }}
                    columnWrapperStyle={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                    renderItem={({ item }) => (
                      <TableComponent
                        width={"45%"}
                        key={item.name}
                        tableNo={item.name}
                        status={item.stature}
                        isLoading={item?.isLoading}
                        navigation={navigation}
                        tableId={item?.tableId}
                        table={item}
                      />
                    )}
                  />
                </View>
              </View>
            )}
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
      <HeadingBox heading={"Orders"} noBack />

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
      ) : (
        <View style={{ width: "90%", height: "100%" }}>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text style={{ color: "black", fontSize: 20 }}>Tables</Text>
          </View>

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
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 0 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>INSIDE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(1)}
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                height: 40,
                borderBottomWidth: tab === 1 ? 2 : 0,
                borderColor: primaryColor,
              }}
            >
              <Text>OUTSIDE</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20 }}>
            <TouchableOpacity
              onPress={() =>
                addNewTable(
                  tab === 1 ? outsidetablesToShow : insidetablesToShow,
                  tab === 1 ? "OUTSIDE" : "INSIDE"
                )
              }
            >
              <Text
                style={{
                  color: "black",
                  textDecorationLine: "underline",
                }}
              >
                + Add a table
              </Text>
            </TouchableOpacity>

            <FlatList
              key={tab}
              ref={tab === 1 ? outsideRef : insideRef}
              data={tab === 1 ? outsidetablesToShow : insidetablesToShow}
              numColumns={2}
              style={{
                marginTop: 20,
                width: "100%",
                marginBottom: 50,
              }}
              columnWrapperStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 20,
              }}
              renderItem={({ item }) => (
                <TableComponent
                  width={"45%"}
                  key={item.name}
                  tableNo={item.name}
                  status={item.stature}
                  isLoading={item?.isLoading}
                  navigation={navigation}
                  tableId={item?.tableId}
                  table={item}
                />
              )}
            />
          </View>
        </View>
      )}
    </MainScreenContainer>
  );
};
