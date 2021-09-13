import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import leftImage from "../../assets/images/backIcon.png";
import { Text } from "../../components/Text/Text";
import check from "../../assets/images/check.png";
import { Header } from "../../components/Headers/Header";
import { grayColor, primaryColor } from "../../theme/colors";
import { Spinner } from "native-base";
import { RegularButton } from "../Buttons/RegularButton";

export const ListModal = ({
  onRequestClose,
  visible,
  title,
  selected,
  onSelect,
  onPress,
  list,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(list.length === 0);

  const OnClick = () => {
    setIsLoading(true);
    onPress();
  };

  useEffect(() => {
    if (list.length === 0) return;

    setIsLoading(false);
    setIsError(false);
  }, [list]);

  return (
    <Modal
      onRequestClose={onRequestClose}
      visible={visible}
      animationType="slide"
    >
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          backgroundColor: grayColor,
        }}
      >
        <View style={{ width: "100%" }}>
          <Header
            heading={title}
            leftImage={leftImage}
            onPressLeft={onRequestClose}
          />
        </View>
        {!isLoading && !isError ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", flex: 1 }}
          >
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "90%", marginTop: 20, marginBottom: 30 }}>
                {list?.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      borderRadius: 10,
                      padding: 10,
                      height: 60,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 2,
                    }}
                    onPress={() => onSelect(item)}
                  >
                    <View style={{ flex: 0.9 }}>
                      <Text
                        style={{
                          marginTop: 5,
                          color:
                            selected?.filter((day) => day === item)?.length > 0
                              ? "black"
                              : "gray",
                          fontSize: 16,
                          fontFamily:
                            selected?.filter((day) => day === item)?.length > 0
                              ? "openSans_bold"
                              : "openSans_regular",
                        }}
                        numberOfLines={1}
                      >
                        {item}
                      </Text>
                    </View>

                    {selected?.filter((day) => day === item)?.length > 0 && (
                      <TouchableOpacity onPress={() => null}>
                        <Image
                          source={check}
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : isLoading ? (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size="large" color={primaryColor} />
          </View>
        ) : isError ? (
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Unable to fetch data!</Text>
            <RegularButton
              isLoading={isLoading}
              onPress={OnClick}
              text={"Retry"}
              style={{ borderRadius: 10, width: "50%", marginTop: 20 }}
            />
          </View>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};
