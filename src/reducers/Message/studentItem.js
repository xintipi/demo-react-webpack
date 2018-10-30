import * as Types from './../../constants/ActionTypes';

const initialState = {};

const studentItem = (state = initialState, action) => {
    switch (action.type) {
        case Types.APPLY_QUOTE:
            if (action.student) {
                state = action.student;
            } else {
                state = {
                    id: '',
                    management_name: '',
                    total_message_sent: '',
                    sent_date: '',
                    message: '',
                }
            }
            return state;
        default: return [...state];
    }
};

export default studentItem;