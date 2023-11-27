// components/Redux/reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './user';

const rootReducer = combineReducers({
  userState: userReducer, // Use the 'userReducer' for 'userState'
});

export default rootReducer;