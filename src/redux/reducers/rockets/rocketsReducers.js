import {
  FETCH_ROCKETS_REQUEST,
  FETCH_ROCKETS_SUCCESS,
  FETCH_ROCKETS_FAILURE,
  SELECT_ROCKET,
  RESERVE_ROCKET,
} from './rocketsActions';

const isRocketReserved = (rocketId) => {
  const reservedRocketIds = JSON.parse(localStorage.getItem('reservedRocketIds')) || [];
  return reservedRocketIds.includes(rocketId);
};

const initialState = {
  rockets: [],
  selectedRocket: null,
  loading: false,
  error: null,
};

const rocketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROCKETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ROCKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        rockets: action.payload.map((rocket) => ({
          ...rocket,
          reserved: isRocketReserved(rocket.id),
        })),
      };
    case FETCH_ROCKETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_ROCKET:
      const { rocketId } = action.payload;
      return {
        ...state,
        rockets: state.rockets.map((rocket) => (rocket.id === rocketId
          ? { ...rocket, reserved: true } : rocket)),
      };
    case RESERVE_ROCKET:
      return {
        ...state,
        rockets: state.rockets.map((rocket) => (rocket.id === action.payload
          ? { ...rocket, reserved: !rocket.reserved } : rocket)),
      };
    default:
      return state;
  }
};

export default rocketsReducer;
