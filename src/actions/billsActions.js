import axios from 'axios';
import {
  URL_BILLS_LIST_API,
  SET_BILLS_LIST_STARTED,
  SET_BILLS_LIST_SUCCESS,
  SET_BILLS_LIST_FAILURE,
  SET_BILLS_LIST_END_REACHED,
  UPDATE_BILL_SELECTION,
  UPDATE_TOOLTIP_TEXT,
  RESET_BILLS_ERROR,
  STATUS,
  END_OF_LIST_MSG,
} from '../constants';

/*
 *  This function retrieves the customer's bills list using axios
 *  and then dispatches a corresponding action.
 *  Omitted the api authentication token for now.
 */
export const getBillsList = (page = 1) => {
  return (dispatch, getState) => {
    dispatch(setBillsListStarted());
    const prevFetchedList = getState().bills.fetchedList;
    const billsListQueryUrl = `${URL_BILLS_LIST_API}?page=${page}`;
    axios
      .get(billsListQueryUrl)
      .then((res) => {
        // once data is fetched, filter out any duplicated data
        // by comparing primary key of each bill
        const uniqueData = res.data.results.filter(
          (newBill) =>
            prevFetchedList.findIndex(
              (prevBill) => prevBill.id === newBill.id,
            ) === -1,
        );
        // then dispatch additional data
        dispatch(setBillsListSuccess(uniqueData, page));
      })
      .catch((err) => {
        console.log('getBillsList', err);
        // should use a specific code for the end of records error
        if (err.message.includes(404)) {
          dispatch(setBillsListEndReached(END_OF_LIST_MSG));
        } else {
          dispatch(setBillsListFailure(err.message));
        }
      });
  };
};

const setBillsListStarted = () => ({
  type: SET_BILLS_LIST_STARTED,
});

const setBillsListSuccess = (bills, page) => ({
  type: SET_BILLS_LIST_SUCCESS,
  payload: {
    bills: [...bills],
    page,
  },
});

const setBillsListFailure = (error) => ({
  type: SET_BILLS_LIST_FAILURE,
  payload: error,
});

const setBillsListEndReached = (error) => ({
  type: SET_BILLS_LIST_END_REACHED,
  payload: error,
});

export const updateBillSelection = (id) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BILL_SELECTION,
      payload: id,
    });
  };
};

export const updateTooltipText = (status) => {
  let tooltipText;
  switch (status) {
    case 'Processing':
      tooltipText = STATUS.PROCESSING;
      break;
    case 'Scheduled':
      tooltipText = STATUS.SCHEDULED;
      break;
    case 'Unable to Pay':
      tooltipText = STATUS.UNABLE_TO_PAY;
      break;
    case 'Paid':
      tooltipText = STATUS.PAID;
      break;
    default:
      tooltipText = null;
  }
  return (dispatch) => {
    dispatch({
      type: UPDATE_TOOLTIP_TEXT,
      payload: tooltipText,
    });
  };
};

export const resetBillsError = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_BILLS_ERROR,
    });
  };
};
