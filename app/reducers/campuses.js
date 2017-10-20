import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const GOT_NEW_CAMPUS_FROM_SERVER = 'GOT_NEW_CAMPUS_FROM_SERVER';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function gotNewCampusFromServer(campus) {
    return {
        type: GOT_NEW_CAMPUS_FROM_SERVER,
        campus
    };
}

export function deleteCampus(id) {
    return {
        type: DELETE_CAMPUS,
        id
    };
}

export function updateCampus(id) {
    return {
        type: UPDATE_CAMPUS,
        id
    };
}

export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get(`/api/campuses`)
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    }
}

export const destroyCampus = id => dispatch => {
    dispatch(deleteCampus(id));
    axios.delete(`/api/campuses/${id}`)
        .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export function createCampus(newCampus) {
    // console.log('author', author)
    return function (dispatch) {
        axios.post('/api/campuses', { name: newCampus })
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