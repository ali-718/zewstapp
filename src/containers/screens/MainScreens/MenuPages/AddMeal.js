import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import leftImage from "../../../../assets/images/backIcon.png";
import addMealRectangle from "../../../../assets/images/addMealRectangle.png";
import cameraIcon from "../../../../assets/images/cameraIcon.png";
import { Input } from "../../../../components/Inputs/Input";
import switchOn from "../../../../assets/images/switchOn.png";
import switchOff from "../../../../assets/images/switchOff.png";
import forwardIcon from "../../../../assets/images/forwardIcon.png";
import deleteIconWhite from "../../../../assets/images/deleteIconWhite.png";
import { days, WIDTH } from "../../../../helpers/utlils";
import { MealItem } from "../../../../components/Meals/MealItem";
import { ListModal } from "../../../../components/Meals/ListModal";
import { PhotoModal } from "../../../../components/Meals/PhotoModal";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import * as ImagePicker from "expo-image-picker";
import { DeleteModal } from "../../../../components/Meals/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { getMealCategories } from "../../../../Redux/actions/HomeActions/MealActions";
import { nameValidator } from "../../../../helpers/rules";
import { ToastError } from "../../../../helpers/Toast";
import * as actions from "../../../../Redux/actions/HomeActions/MealActions";
import * as recipeActions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import { useNavigation } from "@react-navigation/core";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { primaryColor, redShade1, redShade2 } from "../../../../theme/colors";
import { Text } from "../../../../components/Text/Text";

export const AddMeal = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user.user);
  const categories = useSelector((state) => state.meal.categories);
  const allergens = useSelector((state) => state.meal.allergens);
  const addons = useSelector((state) => state.meal.addons);
  const isLoading = useSelector((state) => state.meal.addMeal.isLoading);
  const deleteMealLoading = useSelector(
    (state) => state.meal.deleteMeal.isLoading
  );
  const deleteMealError = useSelector((state) => state.meal.deleteMeal.isError);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const recipeList = useSelector((state) => state.recipe.recipe.list);
  const device = useSelector((state) => state.system.device);
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
  const [selectedCategories, setselectedCategories] = useState("");
  const [selectedAllergens, setselectedAllergens] = useState([]);
  const [selectedAddons, setselectedAddons] = useState([]);
  const [foodImage, setFoodImage] = useState("");
  const [foodImageBase64, setfoodImageBase64] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [taxWithPrice, setTaxWithPrice] = useState("0.00");
  const [Profit, setProfit] = useState("0.00");
  const [menuPrice, setMenuPrice] = useState("");

  useEffect(() => {
    if (!deleteMealError) return;

    setdeleteModal(false);
  }, [deleteMealError]);

  useEffect(() => {
    dispatch(
      recipeActions.fetchRecipeActions({
        locationId: defaultLocation.locationId,
      })
    );
    dispatch(getMealCategories());

    if (!props.route?.params?.data) return;

    const {
      mealName: name = "",
      mealDescription: desc = "",
      mealPrice: cost = "",
      mealDaysAvailable: days = "",
      mealCategory: categories = "",
      mealAvailability: available = "",
      mealAllergens: allergens = "",
      mealAddons: addons = "",
      mealMedia: image = "",
      mealRecipes = "",
    } = props.route?.params?.data;

    console.log(props.route?.params?.data);

    setIsEdit(true);
    setName(name);
    setdesc(desc);
    setunitCost(String(cost));
    // setselectedDays(days);
    setselectedCategories(categories);
    setavailable(available);
    // setselectedAllergens(allergens);
    // setselectedAddons(addons);
    setFoodImage(image[0] ?? "");
    setSelectedRecipe(mealRecipes ? mealRecipes[0] : {});
  }, []);

  const removeImage = () => {
    setFoodImage("");
    setfoodImageBase64("");
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
      base64: true,
    });

    setphotoModal(false);

    if (result.cancelled) {
      return;
    }

    setFoodImage(result.uri);
    setfoodImageBase64(result.base64);
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
      base64: true,
    });
    setphotoModal(false);

    if (result.cancelled) {
      return;
    }

    setFoodImage(result.uri);
    setfoodImageBase64(result.base64);
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
    setselectedCategories(val);
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

  const onSaveMeal = () => {
    if (
      name.trim().length === 0 ||
      desc.trim().length === 0 ||
      selectedCategories.trim().length === 0 ||
      unitCost.length === 0 ||
      !selectedRecipe.recipeTitle
    ) {
      ToastError("Fill all fields marked");
      return;
    }

    if (unitCost - selectedRecipe?.totalUnitCost < 0) {
      ToastError("Meal cost cannot be less than unit cost!");
      return;
    }

    if (isEdit) {
      dispatch(
        actions.editMeal({
          locationId: defaultLocation?.locationId,
          mealName: name,
          mealDescription: desc,
          mealPrice: parseFloat(unitCost),
          mealAvailability: available,
          mealCategory: selectedCategories,
          navigation,
          mealId: props.route?.params?.data?.mealId,
          mealRecipes: [selectedRecipe],
          unitCost: selectedRecipe?.totalUnitCost,
          taxPrice: defaultLocation?.location?.taxRate
            ? `${
                parseFloat(unitCost).toFixed(2) *
                  (parseFloat(defaultLocation?.location?.taxRate).toFixed(2) /
                    100) +
                  parseFloat(unitCost) || "0.00"
              }`
            : "0.00",
          profitPrice:
            selectedRecipe?.totalUnitCost > 0 && unitCost.length > 0
              ? `${unitCost - selectedRecipe?.totalUnitCost}`
              : "0.00",
        })
      );
      return;
    }

    dispatch(
      actions.addNewMeal({
        locationId: defaultLocation?.locationId,
        mealName: name,
        mealDescription: desc,
        mealPrice: parseFloat(unitCost),
        mealAvailability: available,
        mealCategory: selectedCategories,
        navigation,
        selectedRecipe,
        mealRecipes: [selectedRecipe],
        unitCost: selectedRecipe?.totalUnitCost,
        taxPrice: defaultLocation?.location?.taxRate
          ? `${
              parseFloat(unitCost).toFixed(2) *
                (parseFloat(defaultLocation?.location?.taxRate).toFixed(2) /
                  100) +
                parseFloat(unitCost) || "0.00"
            }`
          : "0.00",
        profitPrice:
          selectedRecipe?.totalUnitCost > 0 && unitCost.length > 0
            ? `${unitCost - selectedRecipe?.totalUnitCost}`
            : "0.00",
      })
    );
  };

  const onDeleteMeal = () => {
    dispatch(
      actions.deleteSpecificMeal({
        locationId: defaultLocation?.locationId,
        mealId: props.route?.params?.data?.mealId,
        navigation,
      })
    );
  };

  const TextBoxInput = ({ label, disabled = false, value, onChange }) => {
    const ref = useRef();
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#E0DFDF",
          borderRadius: 8,
          padding: 15,
          backgroundColor: "white",
          width: 140,
          height: 89,
          marginTop: 20,
        }}
        onPress={() => ref?.current?.focus()}
        activeOpacity={1}
      >
        <Text style={{ fontSize: 16, color: "#1A1A1A" }}>{label}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: primaryColor }}>$</Text>
          <TextInput
            ref={ref}
            editable={!disabled}
            style={{
              fontSize: 30,
              color: primaryColor,
              fontWeight: "bold",
              flex: 1,
            }}
            value={value}
            onChangeText={(val) => onChange(val)}
            keyboardType="numeric"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainScreenContainer title={isEdit ? "Edit Meal" : "Add Meal"}>
      <HeadingBox heading={isEdit ? "Edit menu item" : "Add menu item"} />

      <View style={{ width: "100%", marginTop: 20, marginBottom: 120 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <View style={{ marginLeft: device === "tablet" ? 0 : 20 }}>
            <TextBoxInput
              value={`${selectedRecipe?.totalUnitCost ?? "0.00"}`}
              label={"Cost"}
              disabled
            />
          </View>

          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E0DFDF",
                borderRadius: 8,
                padding: 15,
                backgroundColor: "white",
                width: 140,
                height: 89,
                marginTop: 20,
              }}
              activeOpacity={1}
            >
              <Text style={{ fontSize: 16, color: "#1A1A1A" }}>Menu Price</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 30, color: primaryColor }}>$</Text>
                <TextInput
                  style={{
                    fontSize: 30,
                    color: primaryColor,
                    fontWeight: "bold",
                    flex: 1,
                  }}
                  value={unitCost}
                  onChangeText={(val) => setunitCost(val)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 20 }}>
            <TextBoxInput
              value={
                defaultLocation?.location?.taxRate
                  ? `${
                      parseFloat(unitCost).toFixed(2) *
                        (parseFloat(defaultLocation?.location?.taxRate).toFixed(
                          2
                        ) /
                          100) +
                        parseFloat(unitCost) || "0.00"
                    }`
                  : "0.00"
              }
              label={"Price with tax"}
              disabled
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <TextBoxInput
              value={
                selectedRecipe?.totalUnitCost > 0 && unitCost.length > 0
                  ? `${unitCost - selectedRecipe?.totalUnitCost}`
                  : "0.00"
              }
              label={"Profit"}
              disabled
            />
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 30, zIndex: 1 }}>
          <Dropdown
            selectedMenu={selectedRecipe.recipeTitle}
            setMenu={(val) =>
              setSelectedRecipe(
                recipeList.find((item) => item.recipeTitle === val)
              )
            }
            errMsg={"Looks like you have not added any recipe yet 😀"}
            placeholder={"Choose recipe"}
            menus={recipeList.map((item) => item.recipeTitle)}
            style={{ zIndex: 3 }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 12 }}>
          <Input
            isEdit={isEdit}
            value={name}
            setValue={(val) => setName(val)}
            placeholder={"Name of menu item"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 12 }}>
          <Input
            isEdit={isEdit}
            value={desc}
            setValue={(val) => setdesc(val)}
            placeholder={"Description of menu item"}
            textarea
          />
        </View>

        <View style={{ width: "100%", marginTop: 12 }}>
          <Input
            isEdit={isEdit}
            value={unitCost}
            setValue={(val) => setunitCost(val)}
            placeholder={"Price in $"}
            keyboardType={"numeric"}
          />
        </View>

        <View style={{ width: "100%", marginTop: 12 }}>
          <MealItem
            label={"Availability*"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View>

        <View style={{ width: "100%", marginTop: 12, zIndex: 3 }}>
          <Dropdown
            selectedMenu={selectedCategories}
            setMenu={setselectedCategories}
            placeholder={"Categories"}
            menus={categories}
          />
        </View>

        {/* <View style={{ width: "100%", marginTop: 12 }}>
          <MealItem
            label={"Availability*"}
            text={available ? "Available" : "Hidden"}
            icon={available ? switchOn : switchOff}
            onIconClick={() => setavailable(!available)}
          />
        </View> */}

        {/* <View style={{ width: "100%", marginTop: 12 }}>
          <Input
            editable={false}
            value={`${selectedRecipe?.totalUnitCost ?? ""}`}
            placeholder={"Meal Unit Cost"}
            style={{ opacity: 0.5 }}
          />
        </View> */}

        {/* <View style={{ width: "100%", marginTop: 12, zIndex: 0 }}>
          <MealItem
            label={"Days Available*"}
            text={JSON.stringify(selectedDays.map((item) => item.slice(0, 3)))
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            touchable
            onPress={() => setdaysModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

        {/* <View style={{ width: "100%", marginTop: 12 }}>
          <MealItem
            label={"Categories*"}
            text={selectedCategories}
            icon={forwardIcon}
            touchable
            onPress={() => setcategoriesModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

        {/* <View style={{ width: "100%", marginTop: 12 }}>
          <MealItem
            label={"Allergens"}
            text={JSON.stringify(selectedAllergens)
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            touchable
            onPress={() => setallergensModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

        {/* <View style={{ width: "100%", marginTop: 12 }}>
          <MealItem
            label={"Add-ons"}
            text={JSON.stringify(selectedAddons)
              .replace("[", "")
              .replace("]", "")
              .replace(/["']/g, "")
              .replace(",", ", ")}
            icon={forwardIcon}
            touchable
            onPress={() => setaddonsModal(true)}
            iconStyle={{ width: 20, height: 20 }}
          />
        </View> */}

        <View style={{ width: "100%", marginTop: 20 }}>
          <RegularButton
            text={"SAVE"}
            onPress={onSaveMeal}
            isLoading={isLoading}
          />
        </View>
        {isEdit ? (
          <View style={{ width: "100%", marginTop: 10 }}>
            <RegularButton
              red
              textStyle={{ color: "white" }}
              text={"Delete"}
              onPress={() => setdeleteModal(true)}
            />
          </View>
        ) : null}
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
        list={categories}
        onPress={() => dispatch(getMealCategories())}
        string
      />

      <ListModal
        onRequestClose={() => setallergensModal(false)}
        visible={allergensModal}
        title={"Allergens"}
        onSelect={(item) => onSelectAllergens(item)}
        selected={selectedAllergens}
        list={allergens}
        onPress={() => dispatch(actions.getMealAllergens())}
      />

      <ListModal
        onRequestClose={() => setaddonsModal(false)}
        visible={addonsModal}
        title={"Add-ons"}
        onSelect={(item) => onSelectAddons(item)}
        selected={selectedAddons}
        list={addons}
        onPress={() => dispatch(actions.getMealAddons())}
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
        isLoading={deleteMealLoading}
        onDelete={onDeleteMeal}
        deleteItemText={"this meal?"}
      />
    </MainScreenContainer>
  );
};
