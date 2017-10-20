import axios from 'axios';

//action types
const GET_STUDENTS = 'GET_STUDENTS';
const GOT_NEW_STUDENT_FROM_SERVER = 'GOT_NEW_STUDENT_FROM_SERVER';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

//action creators
export const getStudents = (students) => {
    const action = {
        type: GET_STUDENTS,
        students
    };
    return action;
}

export const gotNewStudentFromServer = (student) => {
    return {
        type: GOT_NEW_STUDENT_FROM_SERVER,
        student
    };
}

export const deleteStudent = (id) => {
    return {
        type: DELETE_STUDENT,
        id
    };
}

export const updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    };
}

//thunk creators
export const fetchStudents = () => (dispatch) => {
    return axios.get(`/api/students`)
        .then(res => res.data)
        .then(students => {
            const action = getStudents(students);
            dispatch(action);
        })
        .catch();
}

export const createStudent = (newStudent, email, campusid, photo) => (dispatch) => {
    axios.post('/api/students', { name: newStudent, email: email, campusId: campusid, photo: photo })
        .then((res) => {
            return res.data
        })
        .then(student => {
            return student.id
        })
        .then(function (id) {
            axios.get(`/api/students/${id}`)
                .then(res => res.data)
                .then((student) => {
                    const action = gotNewStudentFromServer(student);
                    dispatch(action);
                })
                .catch()
        })
        .catch();
}

export const putStudent = (studentid, newStudent, email, campusid, history) => {
    console.log(studentid);
    return function (dispatch) {
        axios.put(`/api/students/${studentid}`, { name: newStudent, email: email, campusId: campusid })
            .then(() => {
                axios.get(`/api/students/${studentid}`)
                    .then(res => res.data)
                    .then((student) => {
                        //const action = updateStudent({ id: studentid, name: newStudent, email: email, campusId: campusid });
                        const action = updateStudent(student);
                        dispatch(action);
                        history.push(`/students`);
                    })
                    .catch()
            })
            .catch()
    }
}

export const destroyStudent = (id) => (dispatch) => {
    dispatch(deleteStudent(id));
    axios.delete(`/api/students/${id}`)
    .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

const studentReducer = (students = [], action) => {
    switch (action.type) {
        case GET_STUDENTS:
            return action.students
        case DELETE_STUDENT:
            return students.filter(student => student.id !== action.id);
        case GOT_NEW_STUDENT_FROM_SERVER:
            return students.concat(action.student);
        case UPDATE_STUDENT:
            return students.map((student) => {
                return action.student.id === student.id ? action.student : student})
        default:
            return students;
    }
}

export default studentReducer
