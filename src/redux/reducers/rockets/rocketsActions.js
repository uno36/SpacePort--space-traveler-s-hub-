import axios from 'axios';
import { default as RESERVE_ROCKET } from './rocketsTypes';

export const FETCH_ROCKETS_REQUEST = 'FETCH_ROCKETS_REQUEST';
export const FETCH_ROCKETS_SUCCESS = 'FETCH_ROCKETS_SUCCESS';
export const FETCH_ROCKETS_FAILURE = 'FETCH_ROCKETS_FAILURE';
export const SELECT_ROCKET = 'SELECT_ROCKET';
export const reserveRocket = (rocketId) => ({
  type: RESERVE_ROCKET,
  payload: rocketId,
});
export const fetchRocketsRequest = () => ({
  type: FETCH_ROCKETS_REQUEST,
});
export const fetchRocketsSuccess = (rockets) => ({
  type: FETCH_ROCKETS_SUCCESS,
  payload: rockets,
});
export const fetchRocketsFailure = (error) => ({
  type: FETCH_ROCKETS_FAILURE,
  payload: error,
});
export const selectRocket = (rocket) => ({
  type: SELECT_ROCKET,
  payload: rocket,
});
export const fetchRockets = () => (dispatch) => {
  dispatch(fetchRocketsRequest());
  axios
    .get('https://api.spacexdata.com/v4/rockets')
    .then((response) => {
      const rockets = response.data;
      dispatch(fetchRocketsSuccess(rockets));
    })
    .catch((error) => {
      dispatch(fetchRocketsFailure(error.message));
    });
};
