import {
  FETCH_ROCKETS_REQUEST,
  FETCH_ROCKETS_SUCCESS,
  FETCH_ROCKETS_FAILURE,
  SELECT_ROCKET,
} from './rocketsActions';
import { default as RESERVE_ROCKET } from './rocketsTypes';

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
    case RESERVE_ROCKET:
      return {
        ...state,
        rockets: state.rockets.map((rocket) => (rocket.id === action.payload
          ? { ...rocket, reserved: true } : rocket)),
      };
    case FETCH_ROCKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        rockets: action.payload,
      };
    case FETCH_ROCKETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SELECT_ROCKET':
      const { rocketId } = action.payload;
      return {
        ...state,
        rockets: state.rockets.map((rocket) => (rocket.id === rocketId
          ? { ...rocket, reserved: true } : rocket)),
      };
    default:
      return state;
  }
};
export default rocketsReducer;
