import { Dimensions } from "react-native";
import food1 from "../assets/images/food1.png";
import food2 from "../assets/images/food2.png";
import food3 from "../assets/images/food3.png";
import vegeterian from "../assets/images/categories/vegeterian.png";
import baked from "../assets/images/categories/baked.png";
import lactose from "../assets/images/allergens/lactose.png";
import gluten from "../assets/images/allergens/gluten.png";

export const WIDTH = Dimensions.get("screen").width;
export const HEIGHT = Dimensions.get("screen").height;

export const carouselData = [
  {
    image: food1,
    text: "As a participating restaurant, you will be providing a fresh, nutritious meal to a person in need.",
    heading: "All your favorites",
  },
  {
    image: food2,
    text: "Upload available meals and share some basic information such as unit cost of meals, allergens, etc.",
    heading: "Choose your food",
  },
  {
    image: food3,
    text: "Get access to a comprehensive dashboard that highlights how many meals you’ve donated.",
    heading: "All the data you need",
  },
];

export const MapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

export const categories = [
  { name: "vegeterian", icon: vegeterian },
  { name: "baked", icon: baked },
];

export const allergens = [
  { name: "lactose", icon: lactose },
  { name: "gluten", icon: gluten },
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const categoriesList = [
  "Keto",
  "Paleo",
  "Vegetarian",
  "Vegan",
  "Mediterranean",
  "Raw",
  "Low carb",
  "No sugar",
  "Gluten-free",
  "Kosher",
  "Halal",
  "High protein",
];

export const allergensList = [
  "Lactose",
  "Tree nuts",
  "Eggs",
  "Peanuts",
  "Fish",
  "Wheat",
  "Shellfish",
  "Soybeans",
  "Gluten",
  "Sesame",
];

export const addonsList = [
  "Garlic bread",
  "Bread sticks",
  "Tomato sauce",
  "Mayonaise",
  "BBQ Hickory sauce",
  "Water bottle",
  "Ginger Ale",
];

export const recipePacking = ["Packed", "Fresh"];

export const recipeUnit = ["oz", "tbsp", "cloves", "cup", "tsp", "tbsp"];

export const colors = [
  { color: "#1FDD00", title: "light green" },
  { color: "#DD0000", title: "red" },
  { color: "#DD8500", title: "orange" },
  { color: "#0073DD", title: "blue" },
  { color: "#27C8C8", title: "sea blue" },
];

export const inventoryAvailibility = [
  { name: "Active", value: "ACTIVE" },
  { name: "Draft", value: "DRAFT" },
];
