import axios from 'axios'

const SELECT_CAMPUS = 'SELECT_CAMPUS';

export function selectCampus (campusid) {
    return {
      type: SELECT_CAMPUS,
      selectCampus: campusid
    };
  }

const selectCampusReducer = (campus = 0, action) => {
    switch (action.type) {
        case SELECT_CAMPUS:
            return action.selectCampus;
        default:
            return campus;
    }
}

export default selectCampusReducer;