import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import {
  ADD_NEW_LOCATION,
  ALL_LOCATION,
  EDIT_LOCATION,
  PRIMARY_LOCATION,
} from "./Types";

export const AddNewLocation =
  ({
    clientId,
    country,
    streetInfo,
    name,
    townCity,
    district,
    navigation,
    taxRate,
    longitude,
    latitude,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_NEW_LOCATION.REQUESTED });

    client
      .post(`/location/add`, {
        clientId,
        country,
        streetInfo,
        name,
        townCity,
        district,
        mode: "Manual",
        default_location: true,
        taxRate,
        longitude,
        latitude,
      })
      .then((data) => {
        // dispatch(setPrimaryLocationAction({}));
        dispatch({
          type: ADD_NEW_LOCATION.SUCCEEDED,
        });
        dispatch(getAllUserLocations({ userId: clientId }));
        navigation.goBack();
        ToastSuccess("Success", "New location sucessfully");
      })
      .catch((e) => {
        dispatch({ type: ADD_NEW_LOCATION.FAILED });

        ToastError("Some error occoured, please try again later");
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
    country,
    streetInfo,
    name,
    townCity,
    district,
    default_location = false,
    navigation,
    locationId,
    taxRate,
    longitude,
    latitude,
  }) =>
  (dispatch) => {
    dispatch({ type: EDIT_LOCATION.REQUESTED });
    client
      .post(`/location/update`, {
        clientId,
        country,
        streetInfo,
        name,
        townCity,
        district,
        default_location,
        locationId,
        mode: "Manual",
        taxRate,
        longitude,
        latitude,
      })
      .then((data) => {
        dispatch({
          type: EDIT_LOCATION.SUCCEEDED,
        });
        dispatch(getAllUserLocations({ userId: clientId }));
        ToastSuccess("Success", "Location edited sucessfully");
        navigation.goBack();
      })
      .catch((e) => {
        dispatch({ type: EDIT_LOCATION.FAILED });
        ToastError("Some error occoured, please try again later");
      });
  };

export const setPrimaryLocationAction = (payload) => (dispatch) => {
  console.log("set primary location");
  client
    .post(`/location/setDefaultLocation`, {
      clientId: payload?.clientId,
      locationId: payload?.locationId,
    })
    .then((data) => {
      console.log(data?.data);
      dispatch({
        type: PRIMARY_LOCATION,
        payload: {
          locationId: payload?.locationId,
          location: data?.data?.location,
        },
      });
      dispatch(getAllUserLocations({ userId: payload?.clientId }));
      ToastSuccess("Success", "Location set to primary.");
    })
    .catch((e) => {
      ToastError("Some error occoured, please try again later");
    });
};

export const getPrimaryLocationAction = (clientId) => (dispatch) => {
  client
    .get(`/location/getDefaultLocation/${clientId}`)
    .then((data) => {
      dispatch({
        type: PRIMARY_LOCATION,
        payload: {
          locationId: data?.data?.default_location,
          location: data?.data?.location,
        },
      });
    })
    .catch((e) => {
      console.log(e?.response?.data);
      ToastError(
        e?.response?.data?.message ||
          "Some error occoured, unable to fetch primary location"
      );
    });
};
