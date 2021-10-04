import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import { ADD_NEW_LOCATION, ALL_LOCATION, PRIMARY_LOCATION } from "./Types";

export const AddNewLocation =
  ({
    clientId,
    locationName,
    contact_no,
    email,
    address,
    cordinates = "",
    manager = "",
    timmings = "",
    default_location = false,
    navigation,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_NEW_LOCATION.REQUESTED });

    client
      .post(`/location/add`, {
        clientId,
        locationName,
        contact_no: `+${contact_no}`,
        email,
        address,
        cordinates,
        manager,
        timmings,
        default_location,
      })
      .then((data) => {
        dispatch({
          type: ADD_NEW_LOCATION.SUCCEEDED,
        });
        dispatch(getAllLocations({ userId: clientId }));
        navigation.goBack();
      })
      .catch((e) => {
        dispatch({ type: ADD_NEW_LOCATION.FAILED });
      });
  };

export const getAllUserLocations =
  ({ userId }) =>
  (dispatch) => {
    dispatch({ type: ALL_LOCATION.REQUESTED });
    client
      .get(`/location/findAll/${userId}`)
      .then((data) => {
        const locations = data.data.locations.Items;

        dispatch({
          type: ALL_LOCATION.SUCCEEDED,
          payload: locations,
        });
      })
      .catch((e) => {
        dispatch({ type: ALL_LOCATION.FAILED });
      });
  };

export const updateLocation =
  ({
    clientId,
    locationName,
    contact_no,
    email,
    address,
    cordinates = "",
    manager = "",
    timmings = "",
    default_location = false,
    navigation,
    locationId,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_NEW_LOCATION.REQUESTED });

    client
      .post(`/location/update`, {
        clientId,
        locationName,
        contact_no: `+${contact_no}`,
        email,
        address,
        cordinates,
        manager,
        timmings,
        default_location,
        locationId,
      })
      .then((data) => {
        dispatch({
          type: ADD_NEW_LOCATION.SUCCEEDED,
        });
        dispatch(getAllUserLocations({ userId: clientId }));
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: ADD_NEW_LOCATION.FAILED });
      });
  };

export const setPrimaryLocationAction =
  (payload, noSuccess = false) =>
  (dispatch) => {
    dispatch({ type: PRIMARY_LOCATION, payload });
    AsyncStorage.setItem("defaultLocation", JSON.stringify(payload));

    if (!noSuccess) {
      ToastSuccess("Primary location changed");
    }
  };
