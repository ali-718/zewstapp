import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Input } from "../../../../components/Inputs/Input";
import {
  borderColor2,
  grayColor,
  primaryColor,
} from "../../../../theme/colors";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { Text } from "../../../../components/Text/Text";
import { Dropdown } from "../../../../components/Inputs/DropDown";
import { Entypo } from "@expo/vector-icons";
import { Icon } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { recipePacking, recipeUnit } from "../../../../helpers/utlils";
import deleteIcon from "../../../../assets/images/deleteIcon.png";
import { RegularButton } from "../../../../components/Buttons/RegularButton";
import { ToastError } from "../../../../helpers/Toast";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import * as actions from "../../../../Redux/actions/RecipeActions/RecipeActions";
import * as inventoryActions from "../../../../Redux/actions/InventoryAction/InventoryActions";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { IngredientAccordionList } from "../../../../components/IngredientsAccordion/IngredientAccordionList";
import { RecipeStepsAccordion } from "../../../../components/IngredientsAccordion/RecipeStepsAccordion";

export const RecipeAdd = (props) => {
  const device = useSelector((state) => state.system.device);
  const user = useSelector((state) => state.auth.user.user);
  const inventoryList = useSelector((state) => state.inventory.inventory.list);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [recipeCategories, setRecipeCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [macroIngredient, setMacroIngredient] = useState({});
  const [quantity, setquantity] = useState("");
  const [serving, setServing] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [type, settype] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [mixtures, setMixtures] = useState([]);
  const [coveredIngredients, setcoveredIngredients] = useState([]);
  const [recipeList, setrecipeList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [allUnits, setallUnits] = useState([]);
  const isLoading = useSelector((state) => state.recipe.addRecipe.isLoading);
  const mixtureList = useSelector((state) => state.recipe.mixture.list);
  const defaultLocation = useSelector(
    (state) => state.locations.defaultLocation
  );
  const screenFocused = useIsFocused();

  useEffect(() => {
    if (!screenFocused) return;
    inventoryActions
      .getUnits()
      .then((res) => setallUnits(res))
      .catch((e) => setallUnits([]));

    const data = props.route?.params?.data;

    Promise.all([
      dispatch(
        inventoryActions.fetchInventoryAction({
          locationId: defaultLocation.locationId,
        })
      ),
      dispatch(
        actions.fetchMixtureActions({ locationId: defaultLocation.locationId })
      ),
    ]);

    actions.fetchRecipeCategoryActions().then((res) => {
      setRecipeCategories(res);
    });

    if (!data) return;

    setIsEdit(true);

    const {
      clientId,
      locationId,
      recipeTitle = "",
      macroIngredient = "",
      serving = "",
      recipeType = "",
      cookingTime = "",
      ingredients = [],
      recipeSteps = "",
      recipeCategory = "",
      mixtures = []
    } = data;

    setMixtures(mixtures)
    setTitle(recipeTitle);
    setMacroIngredient(macroIngredient);
    setServing(serving);
    setCookingTime(cookingTime);
    settype(recipeType);
    setIngredients(ingredients);
    setrecipeList(recipeSteps);
    setquantity(macroIngredient?.quantity);
    setSelectedCategory(recipeCategory);
  }, [screenFocused]);

  const onAddData = () => {
    if (!defaultLocation.locationId) {
      ToastError(
        "Set primary location by long pressing on the desired location "
      );
      return;
    }

    if (
      title.trim().length === 0 ||
      !macroIngredient.itemName ||
      serving.trim().length === 0 ||
      cookingTime.trim().length === 0 ||
      selectedCategory.trim().length === 0
    ) {
      ToastError("Please fill all fields");
      return;
    }

    if (ingredients.length === 0) {
      ToastError("Please add atleast 1 ingredient");
      return;
    }

    if (recipeList.length === 0) {
      ToastError("Please add atleast 1 Step");
      return;
    }

    if (isEdit) {
      const data = {
        clientId: user.clientId,
        locationId: defaultLocation?.locationId,
        recipeTitle: title,
        macroIngredient: { ...macroIngredient },
        serving,
        recipeType: type,
        cookingTime: cookingTime,
        ingredients,
        recipeSteps: recipeList,
        navigation,
        catalogId: props.route?.params?.data?.catalogId,
        recipeCategory: selectedCategory,
        mixtures
      };

      dispatch(actions.updateRecipeAction(data));
      return;
    }

    const data = {
      clientId: user.clientId,
      locationId: defaultLocation?.locationId,
      recipeTitle: title,
      macroIngredient: { ...macroIngredient },
      serving,
      recipeType: type,
      cookingTime: cookingTime,
      ingredients,
      recipeSteps: recipeList,
      navigation,
      recipeCategory: selectedCategory,
      mixtures
    };

    dispatch(actions.addRecipeAction(data));
  };

  const addRecipe = (id) => {
    setrecipeList([...recipeList, { id, order: id, description: "" }]);
  };

  const addRecipeDescription = (value, index) => {
    const data = [...recipeList];

    data[index] = { ...data[index], description: value };

    setrecipeList(data);
  };

  const deleteRecipe = (index) => {
    const data = [...recipeList];

    data.splice(index, 1);

    setrecipeList([...data]);
  };

  const addIngredients = () => {
    setIngredients([
      ...ingredients,
      { microIngredient: "", quantity: "", units: "", type: "" },
    ]);
  };

  const updateUnit = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], units: value, quantity: "" };

    setIngredients(data);
  };

  const deleteIngredient = (index) => {
    const data = [...ingredients];

    data.splice(index, 1);

    setIngredients(data);
  };

  const updateQuantity = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], quantity: value };

    setIngredients(data);
  };

  const updatePacking = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], type: value };

    setIngredients(data);
  };

  const updateName = (value, index) => {
    const data = [...ingredients];

    data[index] = { ...data[index], ...value };
    coveredIngredients[index] = { name: value.itemName };

    setIngredients(data);
  };

  const addMixture = () => {
    setMixtures([
      ...mixtures,
      { microIngredient: "", weight: "", units: "", type: "" },
    ]);
  };

  const updateMixtureUnit = (value, index) => {
    const data = [...mixtures];

    data[index] = { ...data[index], units: value, weight: "" };

    setMixtures(data);
  };

  const deleteMixture = (index) => {
    const data = [...mixtures];

    data.splice(index, 1);

    setMixtures(data);
  };

  const updateMixtureWeight = (value, index) => {
    const data = [...mixtures];

    data[index] = { ...data[index], weight: value };

    setMixtures(data);
  };

  const updateMixturePacking = (value, index) => {
    const data = [...mixtures];

    data[index] = { ...data[index], type: value };

    setMixtures(data);
  };

  const updateMixtureName = (value, index) => {
    const data = [...mixtures];

    data[index] = { ...data[index], ...value };

    setMixtures(data);
  };

  return (
    <MainScreenContainer>
      <HeadingBox heading={isEdit ? "Edit recipe" : "Add recipe"} />
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          marginVertical: 20,
          borderRadius: 10,
          paddingBottom: 20,
          marginBottom: 200,
          marginTop: 0,
        }}
      >
        <View
          style={{
            width: "95%",
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <Input
            placeholder={"Recipe Title"}
            value={title}
            setValue={(val) => setTitle(val)}
            style={{
              marginTop: 10,
              borderRadius: 0,
            }}
          />

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 20,
              zIndex: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
              }}
            >
              Recipe Details
            </Text>

            <Dropdown
              selectedMenu={macroIngredient.itemName}
              errMsg={"Looks like there are no items left in inventory 😞"}
              setMenu={(val) =>
                setMacroIngredient(
                  inventoryList
                    .map((item) => ({
                      ...item,
                      totalQuantity: item.quantity,
                      quantity: undefined,
                    }))
                    .find((item) => item.itemName === val)
                )
              }
              placeholder={"Macro Ingredients"}
              menus={inventoryList.map((item) => item.itemName)}
              style={{ zIndex: 3, marginTop: 10 }}
            />

            <Input
              keyboardType={"number-pad"}
              placeholder={"Serving"}
              value={serving}
              setValue={(val) => setServing(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
              }}
            />

            <Input
              keyboardType={"number-pad"}
              placeholder={"Cooking time (mins)"}
              value={cookingTime}
              setValue={(val) => setCookingTime(val)}
              style={{
                marginTop: 10,
                borderRadius: 0,
              }}
            />

            <Dropdown
              selectedMenu={selectedCategory}
              errMsg={"Looks like there are no category available"}
              setMenu={setSelectedCategory}
              placeholder={"Category"}
              menus={recipeCategories}
              style={{ zIndex: 4, marginTop: 10 }}
            />

            {/* <Dropdown
              selectedMenu={type}
              setMenu={settype}
              placeholder={"Type"}
              menus={["completed", "pending"]}
              style={{ zIndex: 3 }}
            /> */}
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 20,
              zIndex: 3,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
                marginBottom: 20,
              }}
            >
              Ingredients
            </Text>
            {ingredients.map((item, i) => (
              <View
                key={i}
                style={{
                  width: "100%",
                  zIndex: ingredients.length - i,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: borderColor2,
                }}
              >
                <IngredientAccordionList
                  ingredients={ingredients}
                  inventoryList={inventoryList}
                  macroIngredient={macroIngredient}
                  i={i}
                  item={item}
                  updateQuantity={updateQuantity}
                  updatePacking={updatePacking}
                  updateName={updateName}
                  deleteIngredient={deleteIngredient}
                  updateUnit={updateUnit}
                  allUnits={allUnits}
                />
              </View>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: borderColor2,
              }}
              onPress={addIngredients}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: primaryColor,
                  fontFamily: "openSans_bold",
                  marginLeft: 10,
                  flex: 1,
                }}
              >
                Add Ingredients
              </Text>
              <Icon
                name={"plus"}
                as={Entypo}
                style={{
                  fontSize: device === "tablet" ? 30 : 20,
                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 20,
              zIndex: 2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
                marginBottom: 20,
              }}
            >
              Mixture
            </Text>
            {mixtures.map((item, i) => (
              <View
                key={i}
                style={{
                  width: "100%",
                  zIndex: mixtures.length - i,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: borderColor2,
                }}
              >
                <IngredientAccordionList
                  ingredients={mixtures}
                  inventoryList={mixtureList.map(rec => ({...rec,originalUnit:rec.mixtureUnit}))}
                  macroIngredient={{}}
                  i={i}
                  item={item}
                  updateQuantity={updateMixtureWeight}
                  updatePacking={updateMixturePacking}
                  updateName={updateMixtureName}
                  deleteIngredient={deleteMixture}
                  updateUnit={updateMixtureUnit}
                  allUnits={allUnits}
                  isMixture
                />
              </View>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: borderColor2,
              }}
              onPress={addMixture}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: primaryColor,
                  fontFamily: "openSans_bold",
                  marginLeft: 10,
                  flex: 1,
                }}
              >
                Add Mixture
              </Text>
              <Icon
                name={"plus"}
                as={Entypo}
                style={{
                  fontSize: device === "tablet" ? 30 : 20,
                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginTop: 20,
              zIndex: 0,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontFamily: "openSans_bold",
                marginBottom: 20,
                zIndex: 0,
              }}
            >
              Recipe steps
            </Text>
            {recipeList.map((item, i) => (
              <RecipeStepsAccordion
                key={i}
                i={i}
                item={item}
                deleteRecipe={deleteRecipe}
                addRecipeDescription={addRecipeDescription}
              />
            ))}

            <TouchableOpacity
              style={{
                marginTop: 0,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                paddingVertical: 10,
                borderWidth: 2,
                borderColor: borderColor2,
              }}
              onPress={() => addRecipe(recipeList.length + 1)}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: primaryColor,
                  fontFamily: "openSans_bold",
                  marginLeft: 10,
                  flex: 1,
                }}
              >
                Add Step
              </Text>
              <Icon
                name={"plus"}
                as={Entypo}
                style={{
                  fontSize: device === "tablet" ? 30 : 20,
                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", marginTop: 20, zIndex: -1 }}>
            <RegularButton
              isLoading={isLoading}
              onPress={onAddData}
              text={isEdit ? "Update" : "Add"}
              style={{ borderRadius: 10 }}
            />
          </View>
        </View>
      </View>
    </MainScreenContainer>
  );
};
