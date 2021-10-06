import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../../components/Inputs/Input";
import { grayColor, primaryColor } from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import purpleBarcode from "../../../../assets/images/purpleBarcode.png";
import purpleBackArrow from "../../../../assets/images/purpleBackArrow.png";
import purpleSave from "../../../../assets/images/purpleSave.png";
import deletePurple from "../../../../assets/images/deletePurple.png";
import purpleCamera from "../../../../assets/images/purpleCamera.png";
import { Text } from "../../../../components/Text/Text";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { colors } from "../../../../helpers/utlils";
import * as ImagePicker from "expo-image-picker";
import { PhotoModal } from "../../../../components/Meals/PhotoModal";
import { ToastError } from "../../../../helpers/Toast";
import * as actions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import { Spinner } from "native-base";

export const AddInventoryPage = () => {
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const isLoading = useSelector(
    (state) => state.inventory.addInventory.isLoading
  );
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [dateOfExpiry, setDateOfExpiry] = useState("");
  const [color, setColor] = useState({});
  const [notes, setNotes] = useState("");
  const [imageUri, setImageUri] = useState([]);
  const [image64, setImage64] = useState([]);
  const [photoModal, setPhotoModal] = useState(false);

  const addInventoryItem = () => {
    if (
      itemName.trim().length === 0 ||
      brand.trim().length === 0 ||
      quantity.trim().length === 0 ||
      unit.trim().length === 0 ||
      dateOfExpiry.trim().length === 0 ||
      dateOfPurchase.trim().length === 0 ||
      !color.color
    ) {
      ToastError("Kindly fill all fields");
      return;
    }

    const data = {
      locationId: defaultLocation.locationId,
      brand,
      quantity,
      units: unit,
      expiryDate: dateOfExpiry,
      purchaseDate: dateOfPurchase,
      color: color.title,
      notes,
      photos: image64,
    };

    dispatch(actions.addInventoryAction(data));
  };

  const removeImage = (i) => {
    const image = imageUri.filter((item, index) => i !== index);
    const imageBase64 = image64.filter((item, index) => i !== index);

    setImage64(imageBase64);
    setImageUri(image);
  };

  const openCamera = async () => {
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
      aspect: [1, 1],
      quality: 1,
      allowsMultipleSelection: false,
      base64: true,
    });

    setPhotoModal(false);

    if (result.cancelled) {
      return;
    }

    setImageUri([...imageUri, result.uri]);
    setImage64([...image64, `data:image/jpeg;base64,${result.base64}`]);
  };

  const pickImage = async () => {
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
      base64: true,
    });

    setPhotoModal(false);

    if (result.cancelled) {
      return;
    }

    setImageUri([...imageUri, result.uri]);
    setImage64([...image64, `data:image/jpeg;base64,${result.base64}`]);
  };

  return (
    <MainScreenContainer
      rightImage={""}
      title={"Inventory Item"}
      onPressRight={() => null}
    >
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          backgroundColor: "white",
          marginVertical: 20,
          borderRadius: 10,
          paddingBottom: 20,
          marginBottom: 300,
        }}
      >
        <View
          style={{
            width: "95%",
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: device === "tablet" ? "row" : "column",
              borderColor: grayColor,
              borderBottomWidth: 2,
            }}
          >
            <Input
              placeholder={"Item Name*"}
              value={itemName}
              setValue={(val) => setItemName(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                flex: 1,
                borderColor: grayColor,
                borderBottomWidth: device === "tablet" ? 0 : 2,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: device === "tablet" ? 0.5 : 1,
                justifyContent: "space-around",
                marginTop: device === "tablet" ? 0 : 10,
                marginBottom: device === "tablet" ? 0 : 10,
              }}
            >
              <Image
                style={{
                  width: device === "tablet" ? 30 : 20,
                  resizeMode: "contain",
                }}
                source={purpleBarcode}
              />
              <Image
                style={{
                  width: device === "tablet" ? 30 : 20,
                  resizeMode: "contain",
                }}
                source={purpleBackArrow}
              />
              <Image
                style={{
                  width: device === "tablet" ? 30 : 20,
                  resizeMode: "contain",
                }}
                source={deletePurple}
              />
              {isLoading ? (
                <Spinner size="large" color={primaryColor} />
              ) : (
                <TouchableOpacity onPress={addInventoryItem}>
                  <Image
                    style={{
                      width: device === "tablet" ? 30 : 20,
                      resizeMode: "contain",
                    }}
                    source={purpleSave}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View
            style={{ width: "95%", flexDirection: "column", marginTop: 20 }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Inventory Details
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Input
                placeholder={"Brand*"}
                value={brand}
                setValue={(val) => setBrand(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
              />
              <Input
                keyboardType={"number-pad"}
                placeholder={"Quantity*"}
                value={quantity}
                setValue={(val) => setQuantity(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
              />
              <Input
                placeholder={"Unit*"}
                value={unit}
                setValue={(val) => setUnit(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
              />
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: device === "tablet" ? "row" : "column",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 10,
              }}
            >
              <Input
                placeholder={"Date of Purchase*"}
                value={dateOfPurchase}
                setValue={(val) => setDateOfPurchase(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                masked
                maskType={"datetime"}
                maskFormat={"DD/MM/YYYY"}
              />
              <Input
                placeholder={"Date of Expiry*"}
                value={dateOfExpiry}
                setValue={(val) => setDateOfExpiry(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  flex: device === "tablet" ? 0.3 : 1,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
                masked
                maskType={"datetime"}
                maskFormat={"DD/MM/YYYY"}
              />
              <Dropdown
                selectedMenu={color.title}
                setMenu={(val) =>
                  setColor(colors.find((item) => item.title === val))
                }
                placeholder={"Color*"}
                menus={colors.map((item) => item.title)}
                style={{ zIndex: 10 }}
                colors={colors}
              />
            </View>

            <View style={{ width: "100%", zIndex: 0 }}>
              <Input
                placeholder={"Notes"}
                value={notes}
                setValue={(val) => setNotes(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  borderColor: grayColor,
                  borderBottomWidth: 2,
                }}
              />
            </View>

            <View style={{ width: "100%", marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontFamily: "openSans_bold",
                }}
              >
                Photos
              </Text>

              <View
                style={{
                  width: "100%",
                  flexWrap: "wrap",
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {imageUri.map((item, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      width: device === "tablet" ? 150 : 140,
                      height: device === "tablet" ? 150 : 140,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      borderColor: grayColor,
                      marginTop: 10,
                    }}
                    onPress={() => removeImage(i)}
                  >
                    <Image
                      style={{
                        width: device === "tablet" ? 150 : 140,
                        height: device === "tablet" ? 150 : 140,
                        resizeMode: "contain",
                      }}
                      source={{ uri: item }}
                    />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={{
                    width: device === "tablet" ? 150 : 140,
                    height: device === "tablet" ? 150 : 140,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: grayColor,
                    marginTop: 10,
                  }}
                  onPress={() => setPhotoModal(true)}
                >
                  <Image
                    style={{ width: 40, resizeMode: "contain" }}
                    source={purpleCamera}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <PhotoModal
        onRequestClose={() => setPhotoModal(false)}
        visible={photoModal}
        onPickImage={() => pickImage(0)}
        isImageTaken={false}
        removeImage={() => null}
        openCamera={() => openCamera(0)}
      />
    </MainScreenContainer>
  );
};
