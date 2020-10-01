import {
  SET_BILLS_LIST_STARTED,
  SET_BILLS_LIST_SUCCESS,
  SET_BILLS_LIST_FAILURE,
  SET_BILLS_LIST_END_REACHED,
  UPDATE_BILL_SELECTION,
  UPDATE_TOOLTIP_TEXT,
  RESET_BILLS_ERROR,
} from '../constants';

// this is the initial state for BillsReducer
const initialState = {
  loading: false,
  fetchedList: [],
  selectedId: -1,
  page: 1,
  error: null,
  tooltipText: null,
  endReached: false,
};

export default function billsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BILLS_LIST_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_BILLS_LIST_SUCCESS:
      const {bills, page} = action.payload;
      return {
        ...state,
        loading: false,
        fetchedList: [...state.fetchedList, ...bills],
        page,
      };
    case SET_BILLS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BILL_SELECTION:
      return {
        ...state,
        selectedId: action.payload,
      };
    case UPDATE_TOOLTIP_TEXT:
      return {
        ...state,
        tooltipText: action.payload,
      };
    case SET_BILLS_LIST_END_REACHED:
      return {
        ...state,
        error: action.payload,
        endReached: true,
      };
    case RESET_BILLS_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
