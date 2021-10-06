import { ADD_INVENTORY } from "./Types";
import { client } from "../client";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";

export const addInventoryAction =
  ({
    locationId,
    brand,
    quantity,
    units,
    expiryDate,
    purchaseDate,
    color,
    notes,
    photos,
  }) =>
  (dispatch) => {
    console.log({
      locationId,
      brand,
      quantity,
      units,
      expiryDate,
      purchaseDate,
      color,
      notes,
      photos,
    });
    dispatch({ type: ADD_INVENTORY.REQUESTED });

    client
      .post("/inventory/add", {
        locationId,
        brand,
        category: "ali",
        quantity: parseInt(quantity),
        units: units,
        costPerUnit: 100,
        currency: "USD",
        threshold: 40,
        expiryDate,
        purchaseDate,
        color,
        notes,
        photos,
      })
      .then(() => {
        dispatch({ type: ADD_INVENTORY.SUCCEEDED });
        ToastSuccess("Success", "Inventory item added successfully!");
      })
      .catch((e) => {
        console.log(e.response);
        dispatch({ type: ADD_INVENTORY.FAILED });
        ToastError("Some error occoured, please try again later");
      });
  };
