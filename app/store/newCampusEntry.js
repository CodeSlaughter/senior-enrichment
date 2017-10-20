import axios from 'axios';

const WRITE_CAMPUS = 'WRITE_CAMPUS';

export const writeCampus = (inputContent) => {
    return {
        type: WRITE_CAMPUS,
        newCampusEntry: inputContent
    };
}

export const newCampusReducer = (campusText = '', action) => {
    switch (action.type) {
        case WRITE_CAMPUS:
            return action.newCampusEntry;
        default:
            return campusText;
    }
}

export default newCampusReducer
