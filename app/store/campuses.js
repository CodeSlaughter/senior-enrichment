import axios from 'axios'

const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const GOT_NEW_CAMPUS_FROM_SERVER = 'GOT_NEW_CAMPUS_FROM_SERVER';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export const getCampuses = (campuses) => {
    const action = {
        type: GET_CAMPUSES, campuses
    };
    return action;
}

export const gotNewCampusFromServer = (campus) => {
    return {
      type: GOT_NEW_CAMPUS_FROM_SERVER,
      campus
    };
  }

export const deleteCampus = (id) => {
    return {
      type: DELETE_CAMPUS,
      id
  };
}

export const updateCampus = (campus) => {
    return {
      type: UPDATE_CAMPUS,
      campus
  };
}

export const fetchCampuses = () => (dispatch) => {
    return axios.get(`/api/campuses`)
        .then(res => res.data)
        .then(campuses => {
            const action = getCampuses(campuses);
            dispatch(action);
        })
        .catch();
}

export const putCampus = (campusid, campusName, history) => (dispatch) => {
    console.log('put running!!', campusid, campusName);
    axios.put(`/api/campuses/${campusid}`, {name: campusName })
    .then(() => {
        const action = updateCampus({id:campusid, name: campusName});
        dispatch(action);
        history.push(`/campuses`);
    })
    .catch();
}

export const destroyCampus = (campusid) => (dispatch) => {
    dispatch(deleteCampus(campusid));
    axios.delete(`/api/campuses/${campusid}`)
    .catch();
}

export const createCampus = (newCampus) => (dispatch) => {
    axios.post('/api/campuses', {name: newCampus})
    .then((res) => {
        return res.data
    })
    .then(campus => {
        const action = gotNewCampusFromServer(campus);
        dispatch(action);
    });
}

const campusReducer = (campuses = [], action) => {
    switch (action.type) {
        case GET_CAMPUSES:
            return action.campuses
        case DELETE_CAMPUS:
            return campuses.filter(campus => campus.id !== action.id);
        case GOT_NEW_CAMPUS_FROM_SERVER:
            return campuses.concat(action.campus);
        case UPDATE_CAMPUS:
            return campuses.map((campus) => {
                    return action.campus.id === campus.id ? action.campus : campus})
        default:
            return campuses;
    }
}

export default campusReducer;
