import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components/Text/Text";
import { WIDTH } from "../../../../helpers/utlils";
import { MainScreenContainer } from "../../../MainScreenContainers";
import camera from "../../../../assets/images/cameraPurple.png";
import { grayColor } from "../../../../theme/colors";
import { PhotoModal } from "../../../../components/Meals/PhotoModal";
import * as ImagePicker from "expo-image-picker";

export const ResturantLogo = () => {
  const [squareLogo, setSquareLogo] = useState("");
  const [horizontalLogo, setHorizontalLogo] = useState("");
  const [squarephotoModal, setsquarephotoModal] = useState(false);
  const [horizontalphotoModal, sethorizontalphotoModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState(0);

  const removeImage = (mode) => {
    if (mode === 0) {
      setSquareLogo("");
      return;
    }

    setHorizontalLogo("");
  };

  const openCamera = async (mode) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    if (cameraStatus !== "granted") {
      alert("Sorry, we need camera permission to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    setsquarephotoModal(false);
    sethorizontalphotoModal(false);

    if (result.cancelled) {
      return;
    }

    if (mode === 0) {
      setSquareLogo(result.uri);
      return;
    }

    setHorizontalLogo(result.uri);
  };

  const pickImage = async (mode) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
    });

    setsquarephotoModal(false);
    sethorizontalphotoModal(false);

    if (result.cancelled) {
      return;
    }

    if (mode === 0) {
      setSquareLogo(result.uri);
      return;
    }

    setHorizontalLogo(result.uri);
  };

  return (
    <MainScreenContainer title={"Logo"}>
      <View style={{ width: "90%", marginVertical: 20 }}>
        <View
          style={{
            width: "100%",
            padding: 15,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <Text>Square logo</Text>

          <TouchableOpacity
            style={{
              width: "100%",
              height: WIDTH > 600 ? 400 : 250,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: grayColor,
              marginTop: 20,
            }}
            onPress={() => {
              setsquarephotoModal(true);
              setSelectedMode(0);
            }}
          >
            <Image
              source={squareLogo ? { uri: squareLogo } : camera}
              style={{
                width: squareLogo ? "100%" : 50,
                height: squareLogo ? "100%" : 50,
                resizeMode: squareLogo ? "cover" : "contain",
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            padding: 15,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text>Horizontal logo</Text>

          <TouchableOpacity
            style={{
              width: "100%",
              height: WIDTH > 600 ? 250 : 70,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              backgroundColor: grayColor,
              marginTop: 20,
            }}
            onPress={() => {
              sethorizontalphotoModal(true);
              setSelectedMode(1);
            }}
          >
            <Image
              source={horizontalLogo ? { uri: horizontalLogo } : camera}
              style={{
                width: horizontalLogo ? "100%" : 50,
                height: horizontalLogo ? "100%" : 50,
                resizeMode: horizontalLogo ? "stretch" : "contain",
              }}
            />
          </TouchableOpacity>
        </View>

        <PhotoModal
          onRequestClose={() => setsquarephotoModal(false)}
          visible={squarephotoModal}
          onPickImage={() => pickImage(0)}
          isImageTaken={squareLogo.length > 0}
          removeImage={() => removeImage(0)}
          openCamera={() => openCamera(0)}
        />

        <PhotoModal
          onRequestClose={() => sethorizontalphotoModal(false)}
          visible={horizontalphotoModal}
          onPickImage={() => pickImage(1)}
          isImageTaken={horizontalLogo.length > 0}
          removeImage={() => removeImage(1)}
          openCamera={() => openCamera(1)}
        />
      </View>
    </MainScreenContainer>
  );
};
