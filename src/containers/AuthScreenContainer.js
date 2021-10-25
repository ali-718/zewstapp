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
  backgroundGrayColor,
  grayColor,
  primaryColor,
  primaryShade1,
  primaryShade2,
} from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "native-base";
import { Text } from "../components/Text/Text";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "black",
    fontFamily: "openSans_semiBold",
    marginLeft: 20,
  },
  icon: {
    color: "black",
    fontSize: 30,
  },
});

export const AuthScreenContainer = ({ title, noBack, ...props }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: backgroundGrayColor,
      }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginHorizontal: 16,
          }}
        >
          <View style={styles.titleContainer}>
            {!noBack && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon as={Ionicons} name={"chevron-back"} style={styles.icon} />
              </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
          </View>

          {props.children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
