import * as Types from './../constants/ActionTypes';
import callApi from './../utils/callApi';

export const actFetchStudentsRequest = () => {
    return (dispatch) => {
        return callApi('line_messages', 'GET', null).then((res) => {
            dispatch(actFetchStudents(res.data.data));
            sessionStorage.setItem('students', JSON.stringify(res.data.data))
        })
    }
};

export const actFetchStudents = (students) => {
    return {
        type: Types.FETCH_STUDENTS,
        students
    }
};

export const actApplyQuote = (student) => {
    return {
        type: Types.APPLY_QUOTE,
        student
    }
};

export const actSavePreview = (info) => {
    return {
        type: Types.SAVE_PREVIEW,
        info
    }
};