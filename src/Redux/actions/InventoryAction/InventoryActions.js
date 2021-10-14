import { ADD_INVENTORY, DELETE_INVENTORY, FETCH_INVENTORY } from "./Types";
import { client } from "../client";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";

export const deleteInventoryAction =
  ({ locationId, itemId, navigation }) =>
  (dispatch) => {
    dispatch({ type: DELETE_INVENTORY.REQUESTED });

    client
      .post(`/inventory/delete/${locationId}/${itemId}`)
      .then(() => {
        ToastSuccess("Item deleted successfully");
        dispatch({
          type: DELETE_INVENTORY.SUCCEEDED,
        });
        dispatch(fetchInventoryAction({ locationId }));
        navigation.pop(2);
      })
      .catch((e) => {
        console.log(e.response);
        ToastError("Some error occoured please try again later!");
        dispatch({ type: DELETE_INVENTORY.FAILED });
      });
  };

export const fetchInventoryAction =
  ({ locationId }) =>
  (dispatch) => {
    dispatch({ type: FETCH_INVENTORY.REQUESTED });

    client
      .get(`inventory/findAll/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_INVENTORY.SUCCEEDED,
          payload: data.inventory.Items,
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_INVENTORY.FAILED });
      });
  };

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
    itemName,
    costPerUnit,
    threshold,
    category,
    navigation,
    availability,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_INVENTORY.REQUESTED });

    client
      .post("/inventory/add", {
        locationId,
        brand,
        category,
        quantity: parseInt(quantity),
        units: units,
        costPerUnit: parseInt(costPerUnit),
        currency: "USD",
        threshold: parseInt(threshold),
        expiryDate,
        purchaseDate,
        color,
        notes,
        photos,
        itemName,
        availability,
      })
      .then(() => {
        dispatch({ type: ADD_INVENTORY.SUCCEEDED });
        dispatch(fetchInventoryAction({ locationId }));
        navigation.goBack();
        ToastSuccess("Success", "Inventory item added successfully!");
      })
      .catch((e) => {
        dispatch({ type: ADD_INVENTORY.FAILED });
        ToastError("Some error occoured, please try again later");
      });
  };
