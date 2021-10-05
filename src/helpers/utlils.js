import { Dimensions } from "react-native";
import food1 from "../assets/images/food1.png";
import food2 from "../assets/images/food2.png";
import food3 from "../assets/images/food3.png";
import food4 from "../assets/images/food4.png";
import food5 from "../assets/images/food5.png";
import food6 from "../assets/images/food6.png";
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
  },
  {
    image: food2,
    text: "You decide what meal you’d like to donate.",
  },
  {
    image: food3,
    text: "Upload available meals and share some basic information such as unit cost of meals, allergens, etc.",
  },
  {
    image: food4,
    text: "Get access to a comprehensive dashboard that highlights how many meals you’ve donated.",
  },
  {
    image: food5,
    text: "Receive tax deductions and monetary rewards.",
  },
  {
    image: food6,
    text: "Help your community by reducing hunger and food wastage.",
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
