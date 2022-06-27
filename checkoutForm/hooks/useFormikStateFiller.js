import { useCallback } from 'react';
import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';

import {
  LOGIN_FORM,
  SHIPPING_METHOD,
  COUPON_CODE_FORM,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
} from '../../../../../config';
import { useCartContext } from '../../../../../hooks';
import LocalStorage from '../../../../../utils/localStorage';
import { loginInitialValues } from '../../step/utility/initialValues';

/**
 * Fill checkout formik states with the given details.
 */
export default function useFormikStateFiller() {
  const { values, setFieldValue } = useFormikContext();
  const { setCartSelectedShippingAddress } = useCartContext();
  const loginFormValues = _get(values, LOGIN_FORM, {});
  const billingAddressValues = _get(values, BILLING_ADDR_FORM, {});
  const shippingAddressValues = _get(values, SHIPPING_ADDR_FORM, {});

  const fillFormikStates = useCallback(
    async (initialData) => {
      const { cart, customer } = initialData;
      const {
        email,
        appliedCoupon,
        billing_address: billingAddress = {},
        shipping_address: shippingAddress = {},
        selected_payment_method: paymentMethod = {},
        selected_shipping_method: shippingMethod = {},
      } = cart || {};
      const saveInBook = !!customer?.customer?.email;
      setCartSelectedShippingAddress(
        LocalStorage.getCustomerShippingAddressId() ||
          customer?.defaultShippingAddress ||
          ''
      );

      await setFieldValue(LOGIN_FORM, { ...loginInitialValues, email });
      await setFieldValue(SHIPPING_ADDR_FORM, {
        ...shippingAddressValues,
        ...shippingAddress,
        saveInBook,
      });
      await setFieldValue(SHIPPING_METHOD, {
        methodCode: shippingMethod.methodCode || '',
        carrierCode: shippingMethod.carrierCode || '',
      });
      await setFieldValue(BILLING_ADDR_FORM, {
        ...billingAddressValues,
        ...billingAddress,
        saveInBook,
      });
      await setFieldValue(`${PAYMENT_METHOD_FORM}.code`, paymentMethod.code);
      await setFieldValue(`${COUPON_CODE_FORM}.couponCode`, appliedCoupon);
    },
    [
      setFieldValue,
      loginFormValues,
      billingAddressValues,
      shippingAddressValues,
      setCartSelectedShippingAddress,
    ]
  );

  return { fillFormikStates };
}
