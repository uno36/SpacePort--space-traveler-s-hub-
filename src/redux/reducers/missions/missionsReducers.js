import {
  FETCH_MISSIONS_REQUEST,
  FETCH_MISSIONS_SUCCESS,
  FETCH_MISSIONS_FAILURE,
  SELECT_MISSION,
  JOIN_MISSION,
  LEAVE_MISSION,
} from './missionsTypes';

const initialState = {
  missions: [],
  selectedMission: null,
  loading: false,
  error: null,
  joinedMissions: JSON.parse(localStorage.getItem('joinedMissions')) || [],
};
const missionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        missions: action.payload,
      };
    case JOIN_MISSION:
      return {
        ...state,
        joinedMissions: [...state.joinedMissions, action.payload],
      };
    case LEAVE_MISSION:
      return {
        ...state,
        joinedMissions: state.joinedMissions.filter(
          (missionId) => missionId !== action.payload,
        ),
      };
    case FETCH_MISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SELECT_MISSION:
      return {
        ...state,
        selectedMission: action.payload,
      };
    default:
      return state;
  }
};
export default missionsReducer;
