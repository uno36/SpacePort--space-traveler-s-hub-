import axios from 'axios';

export const FETCH_ROCKETS_REQUEST = 'FETCH_ROCKETS_REQUEST';
export const FETCH_ROCKETS_SUCCESS = 'FETCH_ROCKETS_SUCCESS';
export const FETCH_ROCKETS_FAILURE = 'FETCH_ROCKETS_FAILURE';
export const SELECT_ROCKET = 'SELECT_ROCKET';
export const RESERVE_ROCKET = 'RESERVE_ROCKET';

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

export const reserveRocket = (rocketId) => (dispatch) => {
  const reservedRocketIds = JSON.parse(localStorage.getItem('reservedRocketIds')) || [];
  if (!reservedRocketIds.includes(rocketId)) {
    reservedRocketIds.push(rocketId);
  } else {
    const index = reservedRocketIds.indexOf(rocketId);
    reservedRocketIds.splice(index, 1);
  }
  localStorage.setItem('reservedRocketIds', JSON.stringify(reservedRocketIds));

  dispatch({
    type: RESERVE_ROCKET,
    payload: rocketId,
  });
};

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
