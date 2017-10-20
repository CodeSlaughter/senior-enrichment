import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import students from './students';
import campuses from './campuses';
import newStudentEntry from './newStudentEntry';
import newCampusEntry from './newCampusEntry';
import campusSelect from './campusSelect';
import newEmailEntry from './newEmailEntry';

const reducer = combineReducers({
    students, campuses, newStudentEntry, newCampusEntry, campusSelect, newEmailEntry
})

export * from './students';
export * from './campuses';
export * from './newCampusEntry';
export * from './newStudentEntry';
export * from './newEmailEntry';
export * from './campusSelect';


export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
