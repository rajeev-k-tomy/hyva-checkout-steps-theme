import {
  LOGIN_FORM,
  CART_ITEMS_FORM,
  SHIPPING_METHOD,
  COUPON_CODE_FORM,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../../../config';
import LocalStorage from '../../../../../utils/localStorage';
import { initialCountry } from '../../../../../utils/address';
import { getAgreementsDataFromLocalStorage } from '../../checkoutAgreements/utility';

export const loginInitialValues = {
  email: '',
  password: '',
  formType: 'guest',
};

export const cartItemsInitialValues = {};

export const paymentMethodsInitialValues = {
  code: '',
};

const shippingMethodInitialValues = {
  methodCode: '',
  carrierCode: '',
};

export const shippingAddressInitialValues = {
  company: '',
  firstname: '',
  lastname: '',
  street: [''],
  phone: '',
  zipcode: '',
  city: '',
  region: '',
  country: initialCountry,
};

export const billingAddressInitialValues = {
  ...shippingAddressInitialValues,
  isSameAsShipping: LocalStorage.getBillingSameAsShippingInfo(),
};

export const checkoutAgreementsInitialValues = {
  isFormPopulated: false,
  ...getAgreementsDataFromLocalStorage(),
};

export const couponCodeInitialValues = {
  couponCode: '',
};

const initialValues = {
  [LOGIN_FORM]: loginInitialValues,
  [CART_ITEMS_FORM]: cartItemsInitialValues,
  [SHIPPING_ADDR_FORM]: shippingAddressInitialValues,
  [BILLING_ADDR_FORM]: billingAddressInitialValues,
  [SHIPPING_METHOD]: shippingMethodInitialValues,
  [PAYMENT_METHOD_FORM]: paymentMethodsInitialValues,
  [CHECKOUT_AGREEMENTS_FORM]: checkoutAgreementsInitialValues,
  [COUPON_CODE_FORM]: couponCodeInitialValues,
};

export default initialValues;
