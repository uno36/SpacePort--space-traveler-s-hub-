import axios from 'axios';
import {
  FETCH_MISSIONS_REQUEST,
  FETCH_MISSIONS_SUCCESS,
  FETCH_MISSIONS_FAILURE,
  SELECT_MISSION,
  JOIN_MISSION,
  LEAVE_MISSION,
} from './missionsTypes';

export const selectMission = (mission) => ({
  type: SELECT_MISSION,
  payload: mission,
});
const getJoinedMissions = () => {
  const joinedMissions = localStorage.getItem('joinedMissions');
  return joinedMissions ? JSON.parse(joinedMissions) : [];
};
export const joinMission = (missionId) => {
  localStorage.setItem('joinedMissions', JSON.stringify([...getJoinedMissions(), missionId]));
  return {
    type: JOIN_MISSION,
    payload: missionId,
  };
};
export const leaveMission = (missionId) => {
  const updatedJoinedMissions = getJoinedMissions().filter((id) => id !== missionId);
  localStorage.setItem('joinedMissions', JSON.stringify(updatedJoinedMissions));
  return {
    type: LEAVE_MISSION,
    payload: missionId,
  };
};
export const fetchMissionsRequest = () => ({
  type: FETCH_MISSIONS_REQUEST,
});
export const fetchMissionsSuccess = (missions) => ({
  type: FETCH_MISSIONS_SUCCESS,
  payload: missions,
});
export const fetchMissionsFailure = (error) => ({
  type: FETCH_MISSIONS_FAILURE,
  payload: error,
});
export const fetchMissions = () => (dispatch) => {
  dispatch(fetchMissionsRequest());
  axios
    .get('https://api.spacexdata.com/v3/missions')
    .then((response) => {
      const missions = response.data;
      dispatch(fetchMissionsSuccess(missions));
    })
    .catch((error) => {
      dispatch(fetchMissionsFailure(error.message));
    });
};
