// import { combineReducers } from 'redux'

// const initialState = {}

// const rootReducer = function(state = initialState, action) {
//   switch(action.type) {
//     default: return state
//   }
// };

// export default rootReducer


import { combineReducers } from 'redux';
import students from './students';
import campuses from './campuses';

export default combineReducers({ students, campuses });