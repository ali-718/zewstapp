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
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";

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

  return (
    <MainScreenContainer title={"Employees"}>
      <HeadingBox heading={"Employees"} />
      <View
        style={{
          width: "90%",
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
                filteredItem.map((item, i) => (
                  <View style={{ width: "100%", marginTop: 10 }}>
                    <AdminOverviewBox
                      key={i}
                      label={`${item.firstName} ${item.lastName}`}
                      name={item.role}
                      rightText={item.active ? "Active" : "Inactive"}
                      onPress={() =>
                        navigation.navigate("employeeDetail", { data: item })
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
