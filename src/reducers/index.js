import { combineReducers } from 'redux';
import students from './Message/student';
import studentItem from './Message/studentItem';

const appReducers = combineReducers({
    students,
    studentItem
});

export default appReducers;