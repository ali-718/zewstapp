import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import employeeIcon from "../../../../assets/images/employeeIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { NoMealBox } from "../../../../components/NoMealBox/NoMealBox";
import { SearchInput } from "../../../../components/SearchInput/SearchInput";

export const EmployeesPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const list = useSelector((state) => state.employee.employee.employees);
  const isLoading = useSelector((state) => state.employee.employee.isLoading);
  const isError = useSelector((state) => state.employee.employee.isError);
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
    dispatch(getAllEmployees({ clientId: user.clientId }));

  return (
    <MainScreenContainer title={"Employees"}>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <RefetchDataError onPress={fetchEmployees} isLoading={isLoading} />
        ) : (
          <View style={{ width: "100%" }}>
            <SearchInput
              search={search}
              setSearch={setSearch}
              searchKeyword={searchKeyword}
            />

            <View style={{ width: "100%", marginTop: 10 }}>
              {list.length > 0 ? (
                filteredItem.map((item, i) => (
                  <View style={{ width: "100%", marginTop: 10 }}>
                    <AdminOverviewBox
                      key={i}
                      label={item.type}
                      name={`${item.firstName} ${item.lastName}`}
                      rightText={item.active ? "Active" : "Inactive"}
                      image={employeeIcon}
                      onPress={() =>
                        navigation.navigate("addEmployees", { data: item })
                      }
                    />
                  </View>
                ))
              ) : (
                <NoMealBox
                  image={employeeIcon}
                  text={"No employee added. Click on Add Employee"}
                />
              )}

              <TouchableOpacity
                style={{
                  width: "100%",
                  marginTop: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                  padding: 15,
                }}
                onPress={() => navigation.navigate("addEmployees")}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "openSans_bold",
                    color: primaryColor,
                  }}
                >
                  Add Employee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </MainScreenContainer>
  );
};
