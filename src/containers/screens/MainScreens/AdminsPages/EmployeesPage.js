import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import employeeIcon from "../../../../assets/images/employeeIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { SwipeListView } from "react-native-swipe-list-view";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import updateIcon from "../../../../assets/images/updateIcon.png";
import { Spinner } from "native-base";

export const EmployeesPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const list = useSelector((state) => state.employee.employee.employees);
  const isLoading = useSelector((state) => state.employee.employee.isLoading);
  const isError = useSelector((state) => state.employee.employee.isError);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const deleteLoading = useSelector(
    (state) => state.employee.deleteEmployee.isLoading
  );
  const [search, setSearch] = useState("");
  const [filteredItem, setFiltereditem] = useState([]);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = list;
    const finalData = realData.filter(
      (item) =>
        item?.firstName.toLowerCase()?.includes(keyword) ||
        item?.lastName.toLowerCase()?.includes(keyword)
    );

    setFiltereditem(finalData);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setFiltereditem(list);
  }, [list]);

  const fetchEmployees = () =>
    dispatch(getAllEmployees({ locationId: defaultLocation.locationId }));

  const onDeleteEmployee = (id) =>
    dispatch(
      deleteEmployee({
        locationId: defaultLocation.locationId,
        employeeId: id,
      })
    );

  return (
    <MainScreenContainer title={"Employees"}>
      <HeadingBox heading={"Employees"} />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <RefetchDataError onPress={fetchEmployees} isLoading={isLoading} />
        ) : (
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%", marginTop: 10 }}>
              {list.length > 0 ? (
                <SwipeListView
                  data={filteredItem}
                  renderItem={({ item, index }, i) => (
                    <View style={{ width: "100%", marginTop: 10 }}>
                      <AdminOverviewBox
                        activeOpacity={1}
                        key={i}
                        label={`${item.firstName} ${item.lastName}`}
                        name={item.role}
                        rightText={item.active ? "Active" : "Inactive"}
                        onPress={() =>
                          navigation.navigate("employeeDetail", { data: item })
                        }
                      />
                    </View>
                  )}
                  renderHiddenItem={({ item }, rowMap) => (
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        overflow: "hidden",
                        height: 80,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => onDeleteEmployee(item?.employeeId)}
                        style={{
                          marginTop: 30,
                          backgroundColor: "#EA1A27",
                          marginBottom: 25,
                          justifyContent: "center",
                          width: 150,
                          height: 60,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: 10,
                          alignItems: "center",
                        }}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Spinner size="sm" color={"white"} />
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={deleteIconWhite}
                              style={{ width: 15, height: 18 }}
                            />
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                                fontFamily: "openSans_bold",
                                marginLeft: 15,
                              }}
                            >
                              Delete
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("addEmployees", {
                            data: item,
                          })
                        }
                        style={{
                          marginTop: 30,
                          backgroundColor: "#A561D8",
                          marginBottom: 25,
                          justifyContent: "center",
                          width: 150,
                          height: 60,
                          borderTopRightRadius: 10,
                          borderBottomRightRadius: 10,
                          alignItems: "center",
                        }}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <Spinner size="sm" color={"white"} />
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              source={updateIcon}
                              style={{
                                width: 18,
                                height: 15,
                                resizeMode: "contain",
                              }}
                            />
                            <Text
                              style={{
                                color: "white",
                                fontSize: 14,
                                fontFamily: "openSans_bold",
                                marginLeft: 15,
                              }}
                            >
                              Update
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  leftOpenValue={150}
                  rightOpenValue={-150}
                />
              ) : (
                <NoMealBox
                  image={employeeIcon}
                  text={"No employee added. Click on Add Employee"}
                />
              )}

              <RegularButton
                onPress={() => navigation.navigate("addEmployees")}
                text={"+ Add an employee"}
                style={{ marginTop: 20 }}
              />
            </View>
          </View>
        )}
      </View>
    </MainScreenContainer>
  );
};
