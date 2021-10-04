import { client } from "../client";
import { ADD_NEW_LOCATION } from "../HomeActions/Types";
import { ALL_LOCATION } from "../RecipeActions/Types";

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

    console.log({
      clientId,
      locationName,
      contact_no,
      email,
      address,
      cordinates,
      manager,
      timmings,
      default_location,
      navigation,
      locationId,
    });

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
