//action types
const WRITE_EMAIL = 'WRITE_EMAIL';

//action creators
export const writeEmail = (inputContent) => {
    return {
        type: WRITE_EMAIL,
        newEmailEntry: inputContent
    };
}

//reducer
const newEmailReducer = (emailText = '', action) => {
    switch (action.type) {
        case WRITE_EMAIL:
            return action.newEmailEntry;
        default:
            return emailText;
    }
}

export default newEmailReducer;
