import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { default as JOIN_MISSION } from './missionsTypes';

export const FETCH_MISSIONS_REQUEST = 'FETCH_MISSIONS_REQUEST';
export const FETCH_MISSIONS_SUCCESS = 'FETCH_MISSIONS_SUCCESS';
export const FETCH_MISSIONS_FAILURE = 'FETCH_MISSIONS_FAILURE';
export const SELECT_MISSION = 'SELECT_MISSION';

export const selectMission = (mission) => ({
  type: SELECT_MISSION,
  payload: mission,
});

export const joinMission = (missionId) => ({
  type: JOIN_MISSION,
  payload: missionId,
});

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


const initialState = {
  missions: [],
  selectedMission: null,
  loading: false,
  error: null,
};

const missionsActions = createAction({
  name: 'missions',
  initialState,
  reducers: {
    joinMission: (state, action) => {
      state.missions = state.missions.map((mission) => {
        if (mission.mission_id !== action.payload) return mission;
        return { ...mission, reserved: true };
      });
    },
    leaveMission: (state, action) => {
      state.missions = state.missions.map((mission) => {
        return { ...mission, reserved: false };
      });
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchMissions.fulfilled, (state, action) => {
      state.missions = action.payload;
    });
  },
});

export const { leaveMission } = missionsActions.actions;
export default missionsActions.reducer;
