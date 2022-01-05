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

export const allCountries = [
  "Afghanistan",
  "land Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "AndorrA",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, The Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  'Cote D"Ivoire',
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and Mcdonald Islands",
  "Holy See (Vatican City State)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran, Islamic Republic Of",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  'Korea, Democratic People"S Republic of',
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  'Lao People"S Democratic Republic',
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libyan Arab Jamahiriya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Macedonia, The Former Yugoslav Republic of",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia, Federated States of",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestinian Territory, Occupied",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russian Federation",
  "RWANDA",
  "Saint Helena",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands, British",
  "Virgin Islands, U.S.",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const randomColors = [
  "#21D19F",
  "#E2856E",
  "#E74A69",
  "#03256C",
  "#FF5154",
  "#2A4D14",
  "#DB4AD5",
  "#D33DC4",
  "#36827F",
  "#664E4C",
  "#5642E0",
  "#F42C04",
];

export const inventoryCategory = [
  "Grains",
  "Fruits",
  "Meat",
  "Vegetables",
  "Canned",
  "Other",
];

export const getRandomColor = () => {
  var item = randomColors[Math.floor(Math.random() * randomColors.length)];

  return item;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const currencyDisplay = (number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
};

export const STRIPE_PUBLISH_KEY =
  "pk_test_51Jk5lYHGLGO7qAwS0yREd2JCrAwLLT7Pnm2GgLqwRJGwdx2fFdDqmY0fBmUctZGmnN9CHjcCAkoatqJ6Ufr8dqCY00nUxiFs72";

export const getUpdatedQuantitynUnit = (
  originalUnit,
  newUnit,
  originalQuantity
) => {
  let obj = {};

  // Getting conversions for kg to other units
  if (originalUnit === "kg") {
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 1000), unit: "grams" };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity * 2.2), unit: "pounds" };
    }
    if (newUnit === "ounces") {
      obj = { quantity: Math.floor(originalQuantity * 35.274), unit: "ounces" };
    }
    if (newUnit === "liters") {
      obj = { quantity: Math.floor(originalQuantity), unit: "liters" };
    }
    if (newUnit === "teaspoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 202.88),
        unit: "teaspoon",
      };
    }
    if (newUnit === "tablespoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 67.62),
        unit: "tablespoon",
      };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity), unit: "kg" };
    }
  }

  // Getting conversions for pounds to other units
  if (originalUnit === "pounds") {
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 453.592), unit: "grams" };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity * 0.453592), unit: "kg" };
    }
    if (newUnit === "ounces") {
      obj = { quantity: Math.floor(originalQuantity * 16), unit: "ounces" };
    }
    if (newUnit === "liters") {
      obj = { quantity: Math.floor(originalQuantity * 0.4535), unit: "liters" };
    }
    if (newUnit === "teaspoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 92.02),
        unit: "teaspoon",
      };
    }
    if (newUnit === "tablespoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 30.675),
        unit: "tablespoon",
      };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity), unit: "pounds" };
    }
  }

  // Getting conversions for ounces to other units
  if (originalUnit === "ounces") {
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 28.3495), unit: "grams" };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity * 0.0283495), unit: "kg" };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity * 0.0625), unit: "pounds" };
    }
    if (newUnit === "liters") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.0295735),
        unit: "liters",
      };
    }
    if (newUnit === "teaspoon") {
      obj = { quantity: Math.floor(originalQuantity * 6), unit: "teaspoon" };
    }
    if (newUnit === "tablespoon") {
      obj = { quantity: Math.floor(originalQuantity * 2), unit: "tablespoon" };
    }
    if (newUnit === "ounces") {
      obj = { quantity: Math.floor(originalQuantity), unit: "ounces" };
    }
  }

  // Getting conversions for liters to other units
  if (originalUnit === "liters") {
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 1000), unit: "grams" };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity), unit: "kg" };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity * 2.2), unit: "pounds" };
    }
    if (newUnit === "ounces") {
      obj = { quantity: Math.floor(originalQuantity * 33.814), unit: "ounces" };
    }
    if (newUnit === "teaspoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 202.884),
        unit: "teaspoon",
      };
    }
    if (newUnit === "tablespoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 67.628),
        unit: "tablespoon",
      };
    }
    if (newUnit === "liters") {
      obj = { quantity: Math.floor(originalQuantity), unit: "liters" };
    }
  }

  // Getting conversions for grans to other units
  if (originalUnit === "grams") {
    if (newUnit === "liters") {
      obj = { quantity: Math.floor(originalQuantity * 0.001), unit: "liters" };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity * 0.001), unit: "kg" };
    }
    if (newUnit === "pounds") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.00220462),
        unit: "pounds",
      };
    }
    if (newUnit === "ounces") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.035274),
        unit: "ounces",
      };
    }
    if (newUnit === "teaspoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.20288),
        unit: "teaspoon",
      };
    }
    if (newUnit === "tablespoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.06666),
        unit: "tablespoon",
      };
    }
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity), unit: "grams" };
    }
  }

  // Getting conversions for teaspoon to other units
  if (originalUnit === "teaspoon") {
    if (newUnit === "liters") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.00492892),
        unit: "liters",
      };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity * 0.005), unit: "kg" };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity * 0.0109), unit: "pounds" };
    }
    if (newUnit === "ounces") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.166667),
        unit: "ounces",
      };
    }
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 4.2), unit: "grams" };
    }
    if (newUnit === "tablespoon") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.333333),
        unit: "tablespoon",
      };
    }
    if (newUnit === "teaspoon") {
      obj = { quantity: Math.floor(originalQuantity), unit: "teaspoon" };
    }
  }

  // Getting conversions for tablespoon to other units
  if (originalUnit === "tablespoon") {
    if (newUnit === "liters") {
      obj = {
        quantity: Math.floor(originalQuantity * 0.0147868),
        unit: "liters",
      };
    }
    if (newUnit === "kg") {
      obj = { quantity: Math.floor(originalQuantity * 0.0148), unit: "kg" };
    }
    if (newUnit === "pounds") {
      obj = { quantity: Math.floor(originalQuantity * 0.0326), unit: "pounds" };
    }
    if (newUnit === "ounces") {
      obj = { quantity: Math.floor(originalQuantity * 0.5), unit: "ounces" };
    }
    if (newUnit === "grams") {
      obj = { quantity: Math.floor(originalQuantity * 14.8), unit: "grams" };
    }
    if (newUnit === "teaspoon") {
      obj = { quantity: Math.floor(originalQuantity * 3), unit: "teaspoon" };
    }
    if (newUnit === "tablespoon") {
      obj = { quantity: Math.floor(originalQuantity), unit: "tablespoon" };
    }
  }

  // Getting conversions for number/pieces to other units
  if (originalUnit === "number/pieces") {
    if (newUnit === "number/pieces") {
      obj = { quantity: Math.floor(originalQuantity), unit: "number/pieces" };
    }
  }

  return obj;
};

export const validConversionUnits = (originalUnit) => {
  let units = [];

  if (originalUnit === "number/pieces") {
    units = ["number/pieces"];
  }
  if (originalUnit === "kg") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "pounds") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "grams") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "ounces") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "liters") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "teaspoon") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }
  if (originalUnit === "tablespoon") {
    units = [
      "kg",
      "pounds",
      "grams",
      "ounces",
      "liters",
      "teaspoon",
      "tablespoon",
    ];
  }

  return units;
};
