import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rocketsReducer from './reducers/rockets/rocketsReducers';
import missionsReducer from './reducers/missions/missionsReducers';

const rootReducer = combineReducers({
  rockets: rocketsReducer,
  missions: missionsReducer,
});

const middleware = [thunk];
const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
