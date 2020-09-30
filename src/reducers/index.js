import {combineReducers} from 'redux';
import billsReducer from './billsReducer';

const rootReducer = combineReducers({
  bills: billsReducer,
});

export default rootReducer;
