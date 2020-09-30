import {
  GET_BILLS_LIST,
  GET_BILLS_LIST_SUCCESS,
  GET_BILLS_LIST_FAILURE,
  UPDATE_BILL_SELECTION,
  UPDATE_TOOLTIP_TEXT,
} from '../constants';

// this is the initial state for BillsReducer
const initialState = {
  loading: false,
  fetchedList: [],
  selectedId: -1,
  page: 1,
  error: null,
  tooltipText: null,
};

export default function billsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BILLS_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BILLS_LIST_SUCCESS:
      const {bills, page} = action.payload;
      return {
        ...state,
        loading: false,
        fetchedList: [...state.fetchedList, ...bills],
        page,
      };
    case GET_BILLS_LIST_FAILURE:
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
    default:
      return state;
  }
}
