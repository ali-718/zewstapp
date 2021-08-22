import { Dimensions } from "react-native";
import food1 from "../assets/images/food1.png";
import food2 from "../assets/images/food2.png";
import food3 from "../assets/images/food3.png";
import food4 from "../assets/images/food4.png";
import food5 from "../assets/images/food5.png";
import food6 from "../assets/images/food6.png";

export const WIDTH = Dimensions.get("window").width;

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
