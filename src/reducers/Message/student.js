import * as Types from './../../constants/ActionTypes';

const initialState = [];

const students = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_STUDENTS:
            state = action.students;
            return [...state];
        default: return [...state];
    }
};

export default students;