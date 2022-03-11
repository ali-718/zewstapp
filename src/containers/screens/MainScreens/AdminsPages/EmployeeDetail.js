import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { chartHeaderColor } from "../../../../theme/colors";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { getEmployeeTimingsHistory } from "../../../../Redux/actions/EmployeeActions/EmployeeActions";
import moment from "moment";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { useNavigation } from "@react-navigation/native";
import { WIDTH } from "../../../../helpers/utlils";

export const EmployeeDetail = (props) => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contact, setContact] = useState("");
  const [pin, setPin] = useState("");
  const [active, setActive] = useState("");
  const [timings, setTimings] = useState([]);

  useEffect(() => {
    const data = props?.route?.params?.data;

    if (data) {
      const {
        lastName = "",
        phone = "",
        firstName = "",
        role = "",
        pin = "",
        active = "",
        employeeId = "",
      } = data;

      getEmployeeTimingsHistory({
        // id: "0a5ba2cc-52ee-4c72-8647-53dc8c4c00f1",
        id: employeeId,
      }).then((res) => setTimings(res));

      setContact(phone);
      setlastName(lastName);
      setfirstName(firstName);
      setSelectedType(role);
      setPin(pin);
      setActive(active);
    }
  }, []);

  console.log("firstName", firstName);

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Employee Details"} />

      <RegularButton
        onPress={() =>
          navigation.navigate("addEmployees", {
            data: props.route.params.data,
          })
        }
        style={{
          width: 150,
          right: 0,
          marginTop: 20,
          position: "absolute",
          zIndex: 10,
        }}
        white
        text={"Edit Employee"}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          alignSelf: "center",
          flex: 1,
          marginTop: 20,
        }}
      >
        <ScrollView style={{ width: "100%" }} horizontal>
          <View style={{ width: "100%" }}>
            <View
              style={{
                width: "100%",
                borderRadius: 10,
                backgroundColor: "white",
                marginTop: 20,
                paddingTop: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                flex: 1,
                minWidth: WIDTH,
              }}
            >
              <View
                style={{
                  width: "100%",
                  marginBottom: 20,
                  marginTop: 10,
                  alignItems: "center",
                }}
              >
                {/* headings start */}
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
                  <View style={{ minWidth: 100, width: "10%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        marginLeft: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      First name
                    </Text>
                  </View>
                  <View style={{ minWidth: 100, width: "10%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      Last Name
                    </Text>
                  </View>
                  <View style={{ minWidth: 150, width: "20%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      Phone
                    </Text>
                  </View>
                  <View style={{ minWidth: 100, width: "10%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      Role
                    </Text>
                  </View>
                  <View style={{ minWidth: 100, width: "10%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      Active
                    </Text>
                  </View>
                  <View style={{ minWidth: 100, width: "10%" }}>
                    <Text
                      style={{
                        fontFamily: "openSans_bold",
                        fontSize: 11,
                        color: "black",
                        textTransform: "uppercase",
                      }}
                    >
                      Pin
                    </Text>
                  </View>
                </View>
                {/* headings ends */}
                <View style={{ backgroundColor: "white", width: "100%" }}>
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
                    <View style={{ minWidth: 100, width: "10%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                          marginLeft: 10,
                        }}
                      >
                        {firstName}
                      </Text>
                    </View>
                    <View style={{ minWidth: 100, width: "10%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {lastName}
                      </Text>
                    </View>
                    <View style={{ minWidth: 150, width: "20%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {contact}
                      </Text>
                    </View>
                    <View style={{ minWidth: 100, width: "10%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {selectedType}
                      </Text>
                    </View>
                    <View style={{ minWidth: 100, width: "10%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {`${active ? "Yes" : "No"}`}
                      </Text>
                    </View>
                    <View style={{ minWidth: 100, width: "10%" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "black",
                        }}
                      >
                        {pin}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ width: "100%", marginTop: 40 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontFamily: "openSans_bold",
                }}
              >
                Timings
              </Text>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  paddingVertical: 15,
                  backgroundColor: "white",
                  borderRadius: 10,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  marginTop: 20,
                }}
              >
                <View style={{ minWidth: 150 }}>
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: 11,
                      color: "black",
                      marginLeft: 10,
                      textTransform: "uppercase",
                    }}
                  >
                    Date
                  </Text>
                </View>
                <View style={{ minWidth: 150, width: "10%" }}>
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: 11,
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    in
                  </Text>
                </View>
                <View style={{ minWidth: 150, width: "20%" }}>
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: 11,
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    out
                  </Text>
                </View>
                <View style={{ minWidth: 150, width: "10%" }}>
                  <Text
                    style={{
                      fontFamily: "openSans_bold",
                      fontSize: 11,
                      color: "black",
                      textTransform: "uppercase",
                    }}
                  >
                    total hours
                  </Text>
                </View>
              </View>

              {timings.length > 0
                ? timings.map((item, i) => (
                    <View style={{ backgroundColor: "white" }}>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          paddingVertical: 15,
                          backgroundColor:
                            i % 2 === 0 ? chartHeaderColor : "white",
                          borderRadius: 10,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                      >
                        <View style={{ minWidth: 150 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                              marginLeft: 10,
                            }}
                          >
                            {moment(item.startTime).format("D MMM YYYY")}
                          </Text>
                        </View>
                        <View style={{ minWidth: 150, width: "10%" }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                            }}
                          >
                            {moment(item.startTime).format("hh:mm a")}
                          </Text>
                        </View>
                        <View style={{ minWidth: 150, width: "20%" }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                            }}
                          >
                            {moment(item.endTime).format("hh:mm a")}
                          </Text>
                        </View>
                        <View style={{ minWidth: 150, width: "10%" }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "black",
                            }}
                          >
                            {item.hoursWorked || item.minutesWorked
                              ? `${item.hoursWorked}h ${item.minutesWorked}m`
                              : ""}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </MainScreenContainer>
  );
};
