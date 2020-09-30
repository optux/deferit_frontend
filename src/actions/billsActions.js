import axios from 'axios';
import {
  URL_BILLS_LIST_API,
  GET_BILLS_LIST,
  GET_BILLS_LIST_SUCCESS,
  GET_BILLS_LIST_FAILURE,
  UPDATE_BILL_SELECTION,
  UPDATE_TOOLTIP_TEXT,
  STATUS,
} from '../constants';

/*
 *  This function retrieves the customer's the bills list using axios
 *  and then dispatches corresponding actions.
 *  Omitted the api authentication token for now.
 */
export const getBillsList = (page = 1) => {
  return (dispatch, getState) => {
    dispatch(getBillsListStarted());
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
        dispatch(getBillsListSuccess(uniqueData, page));
      })
      .catch((err) => {
        dispatch(getBillsListFailure(err.message));
      });
  };
};

const getBillsListStarted = () => ({
  type: GET_BILLS_LIST,
});

const getBillsListSuccess = (bills, page) => ({
  type: GET_BILLS_LIST_SUCCESS,
  payload: {
    bills: [...bills],
    page,
  },
});

const getBillsListFailure = (error) => ({
  type: GET_BILLS_LIST_FAILURE,
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
