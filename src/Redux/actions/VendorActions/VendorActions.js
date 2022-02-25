import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import { ADD_VENDOR, DELETE_VENDOR, FETCH_VENDOR } from "./Types";

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

export const addVendorActions =
  ({ locationId, name, email, address, phoneNo, navigation }) =>
  (dispatch) => {
    dispatch({ type: ADD_VENDOR.REQUESTED });
    client
      .post(`/vendors/add`, { locationId, name, email, address, phoneNo })
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
  ({ locationId, name, email, address, phoneNo, navigation, vendorId }) =>
  (dispatch) => {
    console.log({
      locationId,
      name,
      email,
      address,
      phoneNo,
      navigation,
      vendorId,
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
