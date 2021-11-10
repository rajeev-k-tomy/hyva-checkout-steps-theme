export const TOTAL_STEPS = 4;
export const ROUTE_PATH_SIGN_IN = '#sign-in';
export const ROUTE_PATH_PAYMENT = '#payment';
export const ROUTE_PATH_ADDRESS = '#address';
export const ROUTE_PATH_SHIPPING = '#shipping';
export const ROUTE_PATH_NEW_CUSTOMER = '#new-customer';
export const ROUTE_PATH_CREATE_ACCOUNT = '#create-account';
export const ROUTE_PATH_EDIT_DELIVERY_ADDR = '#edit-delivery-address';
export const ROUTE_PATH_ADD_NEW_BILLING_ADDR = '#add-new-billing-address';

export const ROUTE_PATH_ADD_NEW_DELIVERY_ADDR = '#add-new-delivery-address';

export const pathStepRelation = {
  [ROUTE_PATH_SIGN_IN]: 1,
  [ROUTE_PATH_NEW_CUSTOMER]: 1,
  [ROUTE_PATH_CREATE_ACCOUNT]: 1,
  [ROUTE_PATH_ADDRESS]: 2,
  [ROUTE_PATH_ADD_NEW_BILLING_ADDR]: 2,
  [ROUTE_PATH_ADD_NEW_DELIVERY_ADDR]: 2,
  [ROUTE_PATH_EDIT_DELIVERY_ADDR]: 2,
  [ROUTE_PATH_SHIPPING]: 3,
  [ROUTE_PATH_PAYMENT]: 4,
};

export const defaultStepRoutePath = {
  1: ROUTE_PATH_NEW_CUSTOMER,
  2: ROUTE_PATH_ADDRESS,
  3: ROUTE_PATH_SHIPPING,
  4: ROUTE_PATH_PAYMENT,
};

export function stepTitles(currentStep) {
  return [
    { title: 'Login', active: true, path: ROUTE_PATH_NEW_CUSTOMER },
    { title: 'Address', active: currentStep >= 2, path: ROUTE_PATH_ADDRESS },
    { title: 'Shipping', active: currentStep >= 3, path: ROUTE_PATH_SHIPPING },
    { title: 'Payment', active: currentStep >= 4, path: ROUTE_PATH_PAYMENT },
  ];
}

export const initialStepId = pathStepRelation[window.location.hash] || 1;
