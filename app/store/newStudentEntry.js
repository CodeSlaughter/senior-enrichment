//action types
const WRITE_STUDENT = 'WRITE_STUDENT';

//action creators
export function writeStudent (inputContent) {
    return {
      type: WRITE_STUDENT,
      newStudentEntry: inputContent
    };
  }

//reducers
const newStudentReducer = (studentText = '', action) => {
    switch (action.type) {
    case WRITE_STUDENT:
        return  action.newStudentEntry;
    default:
        return studentText;
    }
  }

export default newStudentReducer
