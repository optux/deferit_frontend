// sample app package IDs
export const ANDROID_PACKAGE_ID = 'com.deferit';
export const APPSTORE_LINK_ID = '99999999';

// this is the settings for the test server on AWS EC2
export const API_HOST = 'http://3.26.0.97:8000/api';
export const API_VERSION = 'v1';

export const URL_BILLS_LIST_API = `${API_HOST}/${API_VERSION}/billslist/`;

export const STATUS = {
  PROCESSING:
    'The bill is currently in processing, it can take approx. 1-2hours depending on the time of day.',
  SCHEDULED: `The bill is scheduled to be paid, and will be paid on the due date. you're in a good hands.`,
  UNABLE_TO_PAY:
    'We are unable to pay the bill. Please contact our customer support team.',
  PAID: 'The bill has been paid on time.',
};
