import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import { ADD_VENDOR, DELETE_VENDOR, FETCH_DEPOT, FETCH_VENDOR } from "./Types";

export const fetchVendorActions =
  ({ locationId }) =>
  (dispatch) => {
    dispatch({ type: FETCH_VENDOR.REQUESTED });
    client
      .get(`/vendors/findAll/${locationId}`)
      .then((res) => {
        dispatch({
          type: FETCH_VENDOR.SUCCEEDED,
          payload: res.data.data.Items,
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_VENDOR.FAILED });
      });
  };

export const fetchDepotActions =
  ({ locationId, clientId }) =>
  (dispatch) => {
    dispatch({ type: FETCH_DEPOT.REQUESTED });
    console.log({ locationId, clientId })
    client
      .get(`/restaurant-depo/find/${locationId}/${clientId}`)
      .then((res) => {
        dispatch({
          type: FETCH_DEPOT.SUCCEEDED,
          payload: res.data.Items,
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_DEPOT.FAILED });
      });
  };

export const addVendorActions =
  ({
    locationId,
    name,
    email,
    address,
    phoneNo,
    navigation,
    countryCode,
    country,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_VENDOR.REQUESTED });
    client
      .post(`/vendors/add`, {
        locationId,
        name,
        email,
        address,
        phoneNo,
        countryCode,
        country,
      })
      .then((res) => {
        ToastSuccess("Success", "Vendor added successfully");
        dispatch(fetchVendorActions({ locationId }));
        dispatch({ type: ADD_VENDOR.SUCCEEDED });
        navigation.goBack();
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_VENDOR.FAILED });
      });
  };

export const updateVendorActions =
  ({
    locationId,
    name,
    email,
    address,
    phoneNo,
    navigation,
    vendorId,
    countryCode,
    country,
  }) =>
  (dispatch) => {
    console.log({
      locationId,
      name,
      email,
      address,
      phoneNo,
      navigation,
      vendorId,
      countryCode,
      country,
    });
    dispatch({ type: ADD_VENDOR.REQUESTED });
    client
      .post(`/vendors/update`, {
        locationId,
        name,
        email,
        address,
        phoneNo,
        vendorId,
      })
      .then((res) => {
        ToastSuccess("Success", "Vendor added successfully");
        dispatch(fetchVendorActions({ locationId }));
        dispatch({ type: ADD_VENDOR.SUCCEEDED });
        navigation.goBack();
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_VENDOR.FAILED });
      });
  };

export const deleteVendorActions =
  ({ locationId, vendorId }) =>
  (dispatch) => {
    console.log({ locationId, vendorId });
    dispatch({ type: DELETE_VENDOR.REQUESTED });
    client
      .post(`/vendors/delete/${locationId}/${vendorId}`)
      .then((res) => {
        ToastSuccess("Success", "Vendor deleted successfully");
        dispatch(fetchVendorActions({ locationId }));
        dispatch({ type: DELETE_VENDOR.SUCCEEDED });
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: DELETE_VENDOR.FAILED });
      });
  };

export const deleteDepotActions =
  ({ locationId, depoId, clientId }) =>
  (dispatch) => {
    console.log({ locationId, depoId });
    dispatch({ type: DELETE_VENDOR.REQUESTED });
    client
      .get(`/restaurant-depo/delete/${locationId}/${depoId}`)
      .then((res) => {
        ToastSuccess("Success", "Vendor deleted successfully");
        dispatch(fetchDepotActions({ locationId, clientId }));
        dispatch({ type: DELETE_VENDOR.SUCCEEDED });
      })
      .catch((e) => {
        console.log(e.response)
        ToastError("Some error occoured, please try again later");
        dispatch({ type: DELETE_VENDOR.FAILED });
      });
  };
