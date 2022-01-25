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
        ToastError("Some error occoured please try again later!");
        dispatch({ type: DELETE_INVENTORY.FAILED });
      });
  };

export const fetchInventoryAction =
  ({ locationId }) =>
  (dispatch) => {
    dispatch({ type: FETCH_INVENTORY.REQUESTED });

    client
      .get(`/inventory/findAll/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_INVENTORY.SUCCEEDED,
          payload: data.inventory.data,
        });
      })
      .catch((e) => {
        console.log(e.response.data);
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
    notes,
    photos,
    itemName,
    costPerUnit,
    category,
    navigation,
    availability,
    vendor,
    threshold,
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
        expiryDate,
        purchaseDate,
        notes,
        photos,
        itemName,
        availability,
        vendor,
        threshold,
      })
      .then(() => {
        dispatch({ type: ADD_INVENTORY.SUCCEEDED });
        dispatch(fetchInventoryAction({ locationId }));
        navigation.goBack();
        ToastSuccess("Success", "Inventory item added successfully!");
      })
      .catch((e) => {
        dispatch({ type: ADD_INVENTORY.FAILED });
        console.log(e.response.data);
        ToastError("Some error occoured, please try again later");
      });
  };
export const updateInventoryAction =
  ({
    locationId,
    brand,
    quantity,
    units,
    expiryDate,
    purchaseDate,
    notes,
    photos,
    itemName,
    costPerUnit,
    category,
    navigation,
    availability,
    vendor,
    inventoryId,
    threshold,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_INVENTORY.REQUESTED });

    client
      .post("/inventory/update", {
        inventoryId,
        locationId,
        brand,
        category,
        quantity: parseInt(quantity),
        units: units,
        costPerUnit: parseInt(costPerUnit),
        currency: "USD",
        expiryDate,
        purchaseDate,
        notes,
        photos,
        itemName,
        availability,
        vendor,
        threshold,
      })
      .then(() => {
        dispatch({ type: ADD_INVENTORY.SUCCEEDED });
        dispatch(fetchInventoryAction({ locationId }));
        navigation.pop();
        ToastSuccess("Success", "Inventory item updated successfully!");
      })
      .catch((e) => {
        dispatch({ type: ADD_INVENTORY.FAILED });
        console.log(e.response.data);
        ToastError("Some error occoured, please try again later");
      });
  };

export const getUnits = () =>
  new Promise((resolve, reject) => {
    client
      .get("/inventory/getWeightUnits")
      .then(({ data }) => {
        resolve(data.units);
      })
      .catch((e) => {
        reject();
      });
  });
