import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const GOT_NEW_STUDENT_FROM_SERVER = 'GOT_NEW_STUDENT_FROM_SERVER';
const UPDATE_STUDENT = 'UPDATE_STUDENT'

//ACTION CREATORS
export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function gotNewStudentFromServer(student) {
    return {
        type: GOT_NEW_STUDENT_FROM_SERVER,
        student
    };
}

export function deleteStudent(id) {
    return {
        type: DELETE_STUDENT,
        id
    };
}

export function updateStudent(id) {
    return {
        type: UPDATE_STUDENT,
        id
    };
}

export default function students(state = [], action) {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students
        case DELETE_STUDENT:
            return state.students.filter(student => student.id !== action.id)
        case GOT_NEW_STUDENT_FROM_SERVER:
            return state.students.concat(action.student)
        default:
            return state
    }
}

//THUNKS

export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get(`/api/students`)
            .then(res => res.data)
            .then(students => {
                //console.log(students);
                const action = getStudents(students);
                dispatch(action);
            });
    }
}

export function createStudent(newStudent, email, campusid) {
    // console.log('author', author)
    return function (dispatch) {
        axios.post('/api/students', { name: newStudent, email: email, campusId: campusid })
            .then((res) => {
                console.log(res.data)
                return res.data
            })
            .then(student => {
                return student.id
                //socket.emit("new-message", message)
            })
            .then(function (id) {
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

// export function updateStudent(studentid, newStudent, email, campusid) {
//     // console.log('author', author)
//     return function (dispatch) {
//         axios.post(`/api/students${studentid}`, { name: newStudent, email: email, campusId: campusid })
//             .then((res) => {
//                 console.log(res.data)
//                 return res.data
//             })
//             .then(student => {
//                 console.log('student', student)
//                 const action = gotNewStudentFromServer(student);
//                 dispatch(action);
//                 //socket.emit("new-message", message)
//             });
//     }
// }

export const destroyStudent = id => dispatch => {
    dispatch(deleteStudent(id));
    axios.delete(`/api/students/${id}`)
        .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};