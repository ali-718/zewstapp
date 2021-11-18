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
import { useIsFocused } from "@react-navigation/core";

const TableComponent = ({ width, tableNo, status, isLoading }) => (
  <View
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
          fontSize: 16,
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
  </View>
);

export const TablesListScreen = () => {
  const dispatch = useDispatch();
  const insideRef = useRef();
  const outsideRef = useRef();
  const isScreenFocused = useIsFocused();
  const device = useSelector((state) => state.system.device);
  const { insideTables, outsideTables, isLoading, isError } = useSelector(
    (state) => state.pos.tables
  );
  const [insidetablesToShow, setInsidetablesToShow] = useState([]);
  const [outsidetablesToShow, setOutsidetablesToShow] = useState([]);

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
  }, [isScreenFocused]);

  const checkDefaultLocation = async () => {
    const location = await AsyncStorage.getItem("defaultLocation");

    if (location === null) {
      setIsDefaultLocation(false);
      return;
    }

    setIsDefaultLocation(true);
  };

  const fetchAllTables = async () => {
    const location = await AsyncStorage.getItem("defaultLocation");

    if (location === null) return;

    dispatch(
      actions.fetchTablesAction({
        locationId: JSON.parse(location)?.locationId,
      })
    );
  };

  const addNewTable = async (type, location) => {
    const defaultLocation = await AsyncStorage.getItem("defaultLocation");

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
          locationId: JSON.parse(defaultLocation).locationId,
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
          locationId: JSON.parse(defaultLocation).locationId,
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
          <Text style={{ color: "black", fontSize: 25 }}>Tables</Text>
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

  return <View />;
};
