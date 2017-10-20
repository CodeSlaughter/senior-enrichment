import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';


//INITIAL STATE

const initialState = {
    students: [],
    newStudentEntry: '',
    newEmailEntry: '',
    newCampusEntry: '',
    campuses: [],
    selectCampus: 1,
    selectStudent: 0,
}

//ACTION TYPES
//..STUDENTS
const GET_STUDENT = 'GET_STUDENT';
const WRITE_STUDENT = 'WRITE_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const GOT_NEW_STUDENT_FROM_SERVER = 'GOT_NEW_STUDENT_FROM_SERVER';
const WRITE_EMAIL = 'WRITE_EMAIL';
const SELECT_STUDENT = 'SELECT_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';


//..CAMPUSES
const SELECT_CAMPUS = 'SELECT_CAMPUS';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const GOT_NEW_CAMPUS_FROM_SERVER = 'GOT_NEW_CAMPUS_FROM_SERVER';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';


//ACTION CREATORS
export function getStudents (students) {
    const action = { type: GET_STUDENTS, students };
    return action;
  }

  export function getCampuses (campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
  }

  export function writeStudent (inputContent) {
    return {
      type: WRITE_STUDENT,
      newStudentEntry: inputContent
    };
  }

  export function writeEmail (inputContent) {
    return {
      type: WRITE_EMAIL,
      newEmailEntry: inputContent
    };
  }
  export function gotNewStudentFromServer (student) {
    return {
      type: GOT_NEW_STUDENT_FROM_SERVER,
      student
    };
  }

  export function selectCampus (campusid) {
    return {
      type: SELECT_CAMPUS,
      selectCampus: campusid
    };
  }

  export function getStudent (studentid) {
    return {
      type: GET_STUDENT,
      selectStudent: studentid
    };
  }

  export function writeCampus (inputContent) {
    return {
      type: WRITE_CAMPUS,
      newCampusEntry: inputContent
    };
  }
  export function gotNewCampusFromServer (campus) {
    return {
      type: GOT_NEW_CAMPUS_FROM_SERVER,
      campus
    };
  }

  export function deleteStudent(id) {
    return {
      type: DELETE_STUDENT,
      id
  };
}

export function deleteCampus(id) {
    return {
      type: DELETE_CAMPUS,
      id
  };
}

export function updateStudent(student) {
    return {
      type: UPDATE_STUDENT,
      student
  };
}

export function updateCampus(campus) {
    return {
      type: UPDATE_CAMPUS,
      campus
  };
}

//THUNKS

export function fetchStudents () {
    
      return function thunk (dispatch) {
        return axios.get(`/api/students`)
          .then(res => res.data)
          .then(students => {
              //console.log(students);
            const action = getStudents(students);
            dispatch(action);
          });
      }
    }
  export function fetchStudent (studentid) {
    
      return function thunk (dispatch) {
        return axios.get(`/api/students/${studentid}`)
          .then(res => res.data)
          .then(student => {
              //console.log(students);
            const action = getStudent(student);
            dispatch(action);
          })
          .catch(console.error);
      }
    }

export function fetchCampuses () {
    
        return function thunk (dispatch) {
        return axios.get(`/api/campuses`)
            .then(res => res.data)
            .then(campuses => {
            const action = getCampuses(campuses);
            dispatch(action);
            });
        }
    }

    export function createStudent(newStudent, email, campusid){
        // console.log('author', author)
        return function(dispatch){
            axios.post('/api/students', {name: newStudent, email: email, campusId: campusid})
            .then((res) => {
              console.log(res.data)
              return res.data
            })
            .then(student => {
              return student.id
             //socket.emit("new-message", message)
            })
            .then(function(id){
              axios.get(`/api/students/${id}`)
              .then(res => res.data)
              .then((student) => {
                const action = gotNewStudentFromServer(student);
                dispatch(action);
              })
              .catch()
            });
        }
    }

    export function putStudent(studentid, newStudent, email, campusid, history){
       console.log(studentid);
      return function(dispatch){
          axios.put(`/api/students/${studentid}`, {name: newStudent, email: email, campusId: campusid})
          .then(() => {
            const action = updateStudent({id:studentid, name: newStudent, email: email, campusId: campusid});
            dispatch(action);
            history.push(`/students`);
           //socket.emit("new-message", message)
          });
      }
  }

  export function putCampus(campusid, campusName, history){
       console.log(campusid);
      return function(dispatch){
          axios.put(`/api/campuses/${campusid}`, {name: campusName })
          .then(() => {
            const action = updateCampus({id:campusid, name: campusName});
            dispatch(action);
            history.push(`/campuses`);
           //socket.emit("new-message", message)
          });
      }
  }

    
  //   export function destroyStudent(studentid){
  //     // console.log('author', author)
  //     const action = deleteStudent(studentid);
  //     dispatch(action);
  //         axios.delete(`/api/students/${studentid}`)
  //         .then((res) => {
  //           console.log(res.data)
  //           return res.data
  //         })
  //         .then(student => {
  //           console.log('thunk', student)
  //           ;
  //          //socket.emit("new-message", message)
  //         });
      
  // }

  export const destroyStudent = id => dispatch => {
    dispatch(deleteStudent(id));
    axios.delete(`/api/students/${id}`)
         .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
  };
  
  export function destroyCampus(campusid){
    // console.log('author', author)
    return function(dispatch){
        axios.delete(`/api/campuses/${campusid}`)
        .then((res) => {
          console.log(res.data)
          return res.data
        })
        .then(campus => {
          console.log('campus', campus)

         //socket.emit("new-message", message)
        });
    }
}

    export function createCampus(newCampus){
      // console.log('author', author)
      return function(dispatch){
          axios.post('/api/campuses', {name: newCampus})
          .then((res) => {
            console.log(res.data)
            return res.data
          })
          .then(campus => {
            console.log('campus', campus)
            const action = gotNewCampusFromServer(campus);
            dispatch(action);
           //socket.emit("new-message", message)
          });
      }
  }
//REDUCER

export function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return Object.assign({}, state, { students: action.students });
        case DELETE_STUDENT:
            return Object.assign({}, state, { students: state.students.filter(student => student.id !== action.id)});
        case GET_CAMPUSES:
           return Object.assign({}, state, { campuses: action.campuses });
        // case GET_CAMPUS:
        //    return Object.assign({}, state, { campuses: action.campuses });
        case WRITE_STUDENT:
           return Object.assign({}, state, { newStudentEntry: action.newStudentEntry });
        case GOT_NEW_STUDENT_FROM_SERVER:
           return Object.assign({}, state, {students: state.students.concat(action.student)});
        case WRITE_EMAIL:
           return Object.assign({}, state, { newEmailEntry: action.newEmailEntry });
        case SELECT_CAMPUS:
           return Object.assign({}, state, { selectCampus: action.selectCampus });
        case GET_STUDENT:
           return Object.assign({}, state, { selectStudent: action.selectStudent });
        case WRITE_CAMPUS:
           return Object.assign({}, state, { newCampusEntry: action.newCampusEntry });
        case GOT_NEW_CAMPUS_FROM_SERVER:
           return Object.assign({}, state, {campuses: state.campuses.concat(action.campus)});
        case UPDATE_STUDENT:
          return Object.assign({}, state, {students: state.students.map((student) => {
            return action.student.id === student.id ? action.student : student
          })});
        case UPDATE_CAMPUS:
          return Object.assign({}, state, {campuses: state.campuses.map((campus) => {
            return action.campus.id === campus.id ? action.campus : campus
          })});
        default:
          return state;
      }
} 
//MIDDLEWARE


// STORE


export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))