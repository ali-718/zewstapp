import React from "react";
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  grayColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
} from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import { Text } from "../components/Text/Text";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    borderBottomColor: primaryShade1,
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "100%",
  },
  title: {
    fontSize: 35,
    color: primaryShade1,
    fontFamily: "openSans_bold",
    marginTop: 10,
  },
  icon: {
    color: primaryShade1,
    fontSize: 30,
  },
});

export const AuthScreenContainer = ({ title, ...props }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: grayColor,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", flex: 1 }}
      >
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                as={Ionicons}
                name={"arrow-back-outline"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>

          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
