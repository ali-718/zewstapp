import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { MaterialIcons } from "@expo/vector-icons";
import { AdminOverviewBox } from "../../../../components/AdminComponents/AdminOverviewBox";
import employeeIcon from "../../../../assets/images/employeeIcon.png";
import { primaryColor } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";
import { useNavigation } from "@react-navigation/native";

const dummyEmployees = [
  {
    name: "Ali Haider",
    type: "Host",
  },
  {
    name: "Fahad Khan",
    type: "Manager",
  },
  {
    name: "Zainab Khan",
    type: "Cashier",
  },
  {
    name: "Kanwal Allijah",
    type: "Host",
  },
];

export const EmployeesPage = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [employees, setLocations] = useState(dummyEmployees);

  const searchKeyword = (text) => {
    const keyword = text?.toLowerCase();
    const realData = dummyEmployees;
    const finalData = realData.filter((item) =>
      item?.name.toLowerCase()?.includes(keyword)
    );

    setLocations(finalData);
  };

  return (
    <MainScreenContainer title={"employees"}>
      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <View style={{ width: "100%" }}>
          <Input
            placeholder={"Search"}
            iconName={"search"}
            iconType={MaterialIcons}
            value={search}
            onChangeText={(val) => {
              setSearch(val);
              searchKeyword(val);
            }}
            style={{ height: 60 }}
            iconStyle={{ fontSize: 30 }}
            inputStyle={{ fontSize: 20 }}
          />

          <View style={{ width: "100%", marginTop: 10 }}>
            {employees.map((item, i) => (
              <View style={{ width: "100%", marginTop: 10 }}>
                <AdminOverviewBox
                  key={i}
                  label={item.type}
                  name={item.name}
                  rightText={"Active"}
                  image={employeeIcon}
                  onPress={() => navigation.navigate("addEmployees")}
                />
              </View>
            ))}

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
      </View>
    </MainScreenContainer>
  );
};
