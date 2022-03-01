import React, { useEffect, useState } from "react";
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
import { colors, inventoryAvailibility } from "../../../../helpers/utlils";
import * as ImagePicker from "expo-image-picker";
import { PhotoModal } from "../../../../components/Meals/PhotoModal";
import { ToastError } from "../../../../helpers/Toast";
import * as actions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import * as actionsVendor from "../../../../Redux/actions/VendorActions/VendorActions";
import { Spinner } from "native-base";
import { useNavigation } from "@react-navigation/core";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { inventoryCategory } from "../../../../helpers/utlils";
import { DateTimeSelector } from "../../../../components/DateTimeSelector/DateTimeSelector";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";

export const AddInventoryPage = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const device = useSelector((state) => state.system.device);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const isLoading = useSelector(
    (state) => state.inventory.addInventory.isLoading
  );
  const deleteLoading = useSelector(
    (state) => state.inventory.deleteInventory.isLoading
  );
  const deleteError = useSelector(
    (state) => state.inventory.deleteInventory.isError
  );
  const vendorsList = useSelector((state) => state.vendor.vendors.list);

  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [threshold, setThreshold] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [dateOfExpiry, setDateOfExpiry] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [color, setColor] = useState({});
  const [notes, setNotes] = useState("");
  const [imageUri, setImageUri] = useState([]);
  const [image64, setImage64] = useState([]);
  const [photoModal, setPhotoModal] = useState(false);
  const [costPerUnit, setCostPerUnit] = useState("");
  const [category, setcategory] = useState("");
  const [availablity, setAvailablity] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState({});
  const [allUnits, setallUnits] = useState([]);
  const [showDateTime, setShowDateTime] = useState(false);
  const [showDateTime2, setShowDateTime2] = useState(false);

  useEffect(() => {
    if (!deleteError) return;
    setdeleteModal(false);
  }, [deleteError]);

  useEffect(() => {
    actions
      .getUnits()
      .then((res) => setallUnits(res))
      .catch((e) => setallUnits([]));
    dispatch(
      actionsVendor.fetchVendorActions({
        locationId: defaultLocation.locationId,
      })
    );
    const data = props?.route?.params?.data;

    if (data) {
      const {
        itemName = "",
        brand = "",
        quantity = "",
        units: unit = "",
        purchaseDate: dateOfPurchase = "",
        expiryDate: dateOfExpiry = "",
        color = "",
        costPerUnit = "",
        threshold = "",
        category = "",
        photos = "",
        notes = "",
        availability = "",
        vendor = "",
      } = props?.route?.params?.data;

      setImageUri(photos);
      setcategory(category);
      setThreshold(`${threshold}`);
      setCostPerUnit(`${costPerUnit}`);
      setColor(colors.find((item) => item.title === color));
      setDateOfPurchase(moment(dateOfPurchase).format("YYYY-MM-DD"));
      setDateOfExpiry(moment(dateOfExpiry).format("YYYY-MM-DD"));
      setUnit(`${unit}`);
      setQuantity(`${quantity}`);
      setItemName(itemName);
      setBrand(brand);
      setIsEdit(true);
      setNotes(notes);
      setAvailablity(
        inventoryAvailibility.find((item) => item.value === availability)
      );
      setSelectedVendor(vendor);
    }
  }, []);

  const deleteInventory = () =>
    dispatch(
      actions.deleteInventoryAction({
        locationId: defaultLocation.locationId,
        itemId: props?.route?.params?.data?.inventoryId,
        navigation,
      })
    );

  const addInventoryItem = () => {
    if (
      itemName.trim().length === 0 ||
      brand.trim().length === 0 ||
      quantity.trim().length === 0 ||
      unit.trim().length === 0 ||
      dateOfExpiry.trim().length === 0 ||
      dateOfPurchase.trim().length === 0 ||
      costPerUnit.trim().length === 0 ||
      category.trim().length === 0 ||
      threshold.trim().length === 0 ||
      !availablity.value ||
      !selectedVendor.name
    ) {
      ToastError("Kindly fill all fields");
      return;
    }

    if (!defaultLocation.locationId) {
      ToastError(
        "Set primary location by long pressing on the desired location "
      );
      return;
    }

    if (isEdit) {
      const data = {
        locationId: defaultLocation.locationId,
        brand,
        quantity,
        units: unit,
        expiryDate: moment(dateOfExpiry),
        purchaseDate: moment(dateOfPurchase),
        notes,
        itemName,
        photos: image64,
        costPerUnit,
        category,
        navigation,
        availability: availablity.value,
        vendor: selectedVendor,
        inventoryId: props?.route?.params?.data?.inventoryId,
        threshold,
      };

      dispatch(actions.updateInventoryAction(data));

      return;
    }

    const data = {
      locationId: defaultLocation.locationId,
      brand,
      quantity,
      units: unit,
      expiryDate: moment(dateOfExpiry),
      purchaseDate: moment(dateOfPurchase),
      notes,
      itemName,
      photos: image64,
      costPerUnit: costPerUnit,
      category,
      navigation,
      availability: availablity.value,
      vendor: selectedVendor,
      threshold,
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
    <MainScreenContainer>
      <HeadingBox heading={isEdit ? "Edit Item" : "Add Item"} />
      <View
        style={{
          width: "95%",
          flex: 1,
          alignItems: "center",
          marginVertical: 20,
          borderRadius: 10,
          paddingBottom: 20,
          marginBottom: 30,
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
              flexDirection: "column",
              zIndex: 12,
            }}
          >
            <Input
              placeholder={"Item Name"}
              value={itemName}
              setValue={(val) => setItemName(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                flex: 1,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: device === "tablet" ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: device === "tablet" ? 0 : 10,
              zIndex: 11,
            }}
          >
            <Input
              placeholder={"Brand"}
              value={brand}
              setValue={(val) => setBrand(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
              }}
            />
            <Input
              keyboardType={"numeric"}
              placeholder={"Quantity"}
              value={quantity}
              setValue={(val) => setQuantity(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
              }}
            />
            <Dropdown
              selectedMenu={unit}
              setMenu={setUnit}
              placeholder={"Unit"}
              menus={allUnits}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
                zIndex: 12,
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
              margin: 0,
            }}
          >
            <Input
              placeholder={"Date of Purchase"}
              value={moment(dateOfPurchase).format("YYYY-MM-DD")}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "48%" : "100%",
              }}
              onPress={() => setShowDateTime(true)}
              masked
              maskType={"datetime"}
              maskFormat={"YYYY-MM-DD"}
              noInput
            />
            <DateTimeSelector
              value={
                dateOfPurchase !== ""
                  ? new Date(moment(dateOfPurchase).valueOf())
                  : new Date(moment().valueOf())
              }
              onChange={(date) =>
                setDateOfPurchase(moment(date).format("YYYY-MM-DD"))
              }
              show={showDateTime}
              onPress={() => setShowDateTime(false)}
            />
            <Input
              noInput
              placeholder={"Date of Expiry"}
              value={moment(dateOfExpiry).format("YYYY-MM-DD")}
              setValue={(val) => setDateOfExpiry(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "48%" : "100%",
              }}
              masked
              maskType={"datetime"}
              onPress={() => setShowDateTime2(true)}
              maskFormat={"YYYY-MM-DD"}
            />
            <DateTimeSelector
              value={
                dateOfExpiry !== ""
                  ? new Date(moment(dateOfExpiry).valueOf())
                  : new Date(moment().valueOf())
              }
              onChange={(date) =>
                setDateOfExpiry(moment(date).format("YYYY-MM-DD"))
              }
              show={showDateTime2}
              onPress={() => setShowDateTime2(false)}
            />
            <View
              style={{
                zIndex: 10,
                flex: device === "tablet" ? 0.3 : 1,
                marginTop: device === "tablet" ? 0 : 10,
              }}
            ></View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: device === "tablet" ? "row" : "column",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 9,
            }}
          >
            <Input
              keyboardType={"numeric"}
              placeholder={"Cost Per Unit"}
              value={costPerUnit}
              setValue={(val) => setCostPerUnit(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
                zIndex: 12,
              }}
              iconName={"dollar"}
              iconType={FontAwesome}
            />

            <Dropdown
              selectedMenu={selectedVendor?.name}
              setMenu={(val) =>
                setSelectedVendor(vendorsList.find((item) => item.name === val))
              }
              placeholder={"Vendor"}
              menus={vendorsList.map((item) => item.name)}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
                zIndex: 14,
              }}
              errMsg={"Looks like there is no vendor present!"}
            />
            <Dropdown
              selectedMenu={category}
              setMenu={setcategory}
              placeholder={"Category"}
              menus={inventoryCategory}
              style={{
                marginTop: 10,
                borderRadius: 0,
                width: device === "tablet" ? "32%" : "100%",
                zIndex: 12,
              }}
            />
          </View>

          <View style={{ width: "100%", zIndex: 1 }}>
            <Input
              placeholder={"Notes"}
              value={notes}
              setValue={(val) => setNotes(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
              }}
              textarea={true}
            />
            <View style={{ width: "100%", marginTop: 10, zIndex: 2 }}>
              <Dropdown
                selectedMenu={availablity?.name}
                setMenu={(val) =>
                  setAvailablity(
                    inventoryAvailibility.find((item) => item.name === val)
                  )
                }
                placeholder={"Availibility"}
                menus={inventoryAvailibility.map((item) => item.name)}
                style={{ zIndex: 10 }}
              />
            </View>
            <View style={{ width: "100%", marginTop: 10, zIndex: 0 }}>
              <Input
                placeholder={"Minimum quantity threshold"}
                value={threshold}
                setValue={(val) => setThreshold(val)}
                style={{
                  marginTop: 10,
                  borderRadius: 0,
                  width: "100%",
                }}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 20, zIndex: 0 }}>
            <Text
              style={{
                fontSize: 16,
                color: primaryColor,
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
                justifyContent:
                  device === "tablet" ? "flex-start" : "space-between",
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
                    marginLeft: device === "tablet" ? (i === 0 ? 0 : 10) : 0,
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
                  borderWidth: 1,
                  borderColor: grayColor,
                  marginTop: 10,
                  marginLeft: device === "tablet" ? 10 : 0,
                  backgroundColor: "white",
                  borderRadius: 5,
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

        <RegularButton
          isLoading={isLoading}
          onPress={addInventoryItem}
          style={{ marginTop: 20 }}
          text={"save item"}
        />
      </View>
      <PhotoModal
        onRequestClose={() => setPhotoModal(false)}
        visible={photoModal}
        onPickImage={() => pickImage(0)}
        isImageTaken={false}
        removeImage={() => null}
        openCamera={() => openCamera(0)}
      />
      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
        isLoading={deleteLoading}
        onDelete={deleteInventory}
        deleteItemText={"this item?"}
        heading={"Delete Inventory?"}
      />
    </MainScreenContainer>
  );
};
