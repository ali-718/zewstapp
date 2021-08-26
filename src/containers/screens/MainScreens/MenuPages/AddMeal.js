import React, { useEffect, useState } from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import leftImage from "../../../../assets/images/backIcon.png";
import addMealRectangle from "../../../../assets/images/addMealRectangle.png";
import cameraIcon from "../../../../assets/images/cameraIcon.png";
import { Input } from "../../../../components/Inputs/Input";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import {
  addonsList,
  allergensList,
  categoriesList,
  days,
  WIDTH,
} from "../../../../helpers/utlils";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ListModal } from "../../../../components/Meals/ListModal";
import { PhotoModal } from "../../../../components/Meals/PhotoModal";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import * as ImagePicker from "expo-image-picker";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";

export const AddMeal = (props) => {
  const [name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [unitCost, setunitCost] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [available, setavailable] = useState(true);
  const [daysModal, setdaysModal] = useState(false);
  const [categoriesModal, setcategoriesModal] = useState(false);
  const [allergensModal, setallergensModal] = useState(false);
  const [addonsModal, setaddonsModal] = useState(false);
  const [photoModal, setphotoModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedDays, setselectedDays] = useState([]);
  const [selectedCategories, setselectedCategories] = useState([]);
  const [selectedAllergens, setselectedAllergens] = useState([]);
  const [selectedAddons, setselectedAddons] = useState([]);
  const [foodImage, setFoodImage] = useState("");

  useEffect(() => {
    if (!props.route?.params?.data) return;

    const {
      name,
      desc,
      cost,
      days,
      categories,
      available,
      allergens,
      addons,
      image,
    } = props.route?.params?.data;

    setIsEdit(true);
    setName(name);
    setdesc(desc);
    setunitCost(String(cost));
    setselectedDays(days);
    setselectedCategories(categories);
    setavailable(available);
    setselectedAllergens(allergens);
    setselectedAddons(addons);
    setFoodImage(image);
  }, []);

  const removeImage = () => {
    setFoodImage("");
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
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    setphotoModal(false);

    if (result.cancelled) {
      return;
    }

    setFoodImage(result.uri);
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
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });
    setphotoModal(false);

    if (result.cancelled) {
      return;
    }

    setFoodImage(result.uri);
  };

  const onSelectDays = (val) => {
    const check = selectedDays.filter((item) => item === val).length > 0;

    if (check) {
      setselectedDays(selectedDays.filter((item) => item !== val));
      return;
    }

    setselectedDays([...selectedDays, val]);
  };

  const onSelectCategories = (val) => {
    const check = selectedCategories.filter((item) => item === val).length > 0;

    if (check) {
      setselectedCategories(selectedCategories.filter((item) => item !== val));
      return;
    }

    setselectedCategories([...selectedCategories, val]);
  };

  const onSelectAllergens = (val) => {
    const check = selectedAllergens.filter((item) => item === val).length > 0;

    if (check) {
      setselectedAllergens(selectedAllergens.filter((item) => item !== val));
      return;
    }

    setselectedAllergens([...selectedAllergens, val]);
  };

  const onSelectAddons = (val) => {
    const check = selectedAddons.filter((item) => item === val).length > 0;

    if (check) {
      setselectedAddons(selectedAddons.filter((item) => item !== val));
      return;
    }

    setselectedAddons([...selectedAddons, val]);
  };

  return (
    <MainScreenContainer
      leftImage={leftImage}
      title={isEdit ? "Edit Meal" : "Add Meal"}
      rightImage={isEdit && deleteIconWhite}
      onPressRight={() => setdeleteModal(true)}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          height: WIDTH > 600 ? 400 : 250,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => setphotoModal(true)}
      >
        <ImageBackground
          source={foodImage.length > 0 ? { uri: foodImage } : addMealRectangle}
          style={{
            width: "100%",
            height: WIDTH > 600 ? 400 : 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {foodImage.length > 0 && (
            <View
              style={{
                width: "100%",
                height: WIDTH > 600 ? 400 : 250,
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
              }}
            ></View>
          )}
          <Image
            style={{ width: 50, height: 50, resizeMode: "contain" }}
            source={cameraIcon}
          />
        </ImageBackground>
      </TouchableOpacity>

      <View style={{ width: "90%", marginTop: 10, marginBottom: 40 }}>
        <View style={{ width: "100%" }}>
          <Input
            isEdit={isEdit}
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder={"Title*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            isEdit={isEdit}
            value={desc}
            onChangeText={(val) => setdesc(val)}
            placeholder={"Description*"}
            textarea
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Input
            isEdit={isEdit}
            value={unitCost}
            onChangeText={(val) => setunitCost(val)}
            placeholder={"Unit Cost $*"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Availability*"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Days Available*"}
            text={JSON.stringify(selectedDays.map((item) => item.slice(0, 3)))
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            onIconClick={() => setavailable(!available)}
            touchable
            onPress={() => setdaysModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Categories*"}
            text={JSON.stringify(selectedCategories)
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            onIconClick={() => setselectedCategories(!available)}
            touchable
            onPress={() => setcategoriesModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Allergens*"}
            text={JSON.stringify(selectedAllergens)
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            onIconClick={() => setselectedAllergens(!available)}
            touchable
            onPress={() => setallergensModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 10 }}>
          <MealItem
            label={"Add-ons"}
            text={JSON.stringify(selectedAddons)
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            onIconClick={() => setselectedAddons(!available)}
            touchable
            onPress={() => setaddonsModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            style={{ borderRadius: 100 }}
            text={isEdit ? "SAVE" : "ADD"}
          />
        </View>
      </View>

      <ListModal
        onRequestClose={() => setdaysModal(false)}
        visible={daysModal}
        title={"Days Available"}
        onSelect={(item) => onSelectDays(item)}
        selected={selectedDays}
        list={days}
      />

      <ListModal
        onRequestClose={() => setcategoriesModal(false)}
        visible={categoriesModal}
        title={"Categories"}
        onSelect={(item) => onSelectCategories(item)}
        selected={selectedCategories}
        list={categoriesList}
      />

      <ListModal
        onRequestClose={() => setallergensModal(false)}
        visible={allergensModal}
        title={"Allergens"}
        onSelect={(item) => onSelectAllergens(item)}
        selected={selectedAllergens}
        list={allergensList}
      />

      <ListModal
        onRequestClose={() => setaddonsModal(false)}
        visible={addonsModal}
        title={"Add-ons"}
        onSelect={(item) => onSelectAddons(item)}
        selected={selectedAddons}
        list={addonsList}
      />

      <PhotoModal
        onRequestClose={() => setphotoModal(false)}
        visible={photoModal}
        onPickImage={pickImage}
        isImageTaken={foodImage.length > 0}
        removeImage={removeImage}
        openCamera={openCamera}
      />

      <DeleteModal
        onRequestClose={() => setdeleteModal(false)}
        visible={deleteModal}
      />
    </MainScreenContainer>
  );
};
