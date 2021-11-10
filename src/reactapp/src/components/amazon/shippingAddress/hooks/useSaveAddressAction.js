import { useCallback } from 'react';

import {
  isValidCustomerAddressId,
  prepareFormAddressFromCartAddress,
} from '../../../../utils/address';
import {
  useShippingAddressAppContext,
  useShippingAddressCartContext,
} from '../../../shippingAddress/hooks';
import { __ } from '../../../../i18n';
import { BILLING_ADDR_FORM } from '../../../../config';
import LocalStorage from '../../../../utils/localStorage';
import { _emptyFunc, _makePromise } from '../../../../utils';
import useShippingAddressFormContext from './useShippingAddressFormContext';
import { billingAddressFormInitValues } from '../../../billingAddress/utility';

const emptyCallback = _emptyFunc();

export default function useSaveAddressAction() {
  const {
    isLoggedIn,
    setMessage,
    setPageLoader,
    setErrorMessage,
    setSuccessMessage,
    updateCustomerAddress,
  } = useShippingAddressAppContext();
  const {
    setCartBillingAddress,
    addCartShippingAddress,
    setCartSelectedShippingAddress,
    setCustomerAddressAsBillingAddress,
    setCustomerAddressAsShippingAddress,
  } = useShippingAddressCartContext();
  const { isBillingSame, setFieldValue, shippingValues, regionData } =
    useShippingAddressFormContext();

  const submitHandler = useCallback(
    async (customerAddressId) => {
      let updateBillingAddress = emptyCallback;
      let updateShippingAddress = _makePromise(
        addCartShippingAddress,
        shippingValues,
        isBillingSame
      );

      if (isBillingSame) {
        updateBillingAddress = _makePromise(setCartBillingAddress, {
          ...shippingValues,
          isSameAsShipping: true,
        });
      }

      if (customerAddressId) {
        updateShippingAddress = _makePromise(
          setCustomerAddressAsShippingAddress,
          Number(customerAddressId),
          isBillingSame
        );

        if (isBillingSame) {
          updateBillingAddress = _makePromise(
            setCustomerAddressAsBillingAddress,
            Number(customerAddressId),
            isBillingSame
          );
        }
      }

      const shippingAddrResponse = await updateShippingAddress();

      const addressToSet = prepareFormAddressFromCartAddress(
        shippingAddrResponse?.shipping_address,
        customerAddressId
      );

      if (isBillingSame) {
        setFieldValue(BILLING_ADDR_FORM, {
          ...billingAddressFormInitValues,
          ...addressToSet,
          isSameAsShipping: true,
        });
      }

      setPageLoader(false);

      updateBillingAddress();
    },
    [
      isBillingSame,
      setPageLoader,
      shippingValues,
      setCartBillingAddress,
      addCartShippingAddress,
      setCustomerAddressAsBillingAddress,
      setCustomerAddressAsShippingAddress,
    ]
  );

  return useCallback(
    async (addressId) => {
      setMessage(false);

      const isCustomerAddress = isValidCustomerAddressId(addressId);
      let updateCustomerAddrPromise = emptyCallback;
      const updateCartAddressPromise = _makePromise(
        submitHandler,
        isCustomerAddress && addressId
      );

      if (isLoggedIn && isCustomerAddress) {
        updateCustomerAddrPromise = _makePromise(
          updateCustomerAddress,
          addressId,
          shippingValues,
          regionData
        );
      }

      try {
        setPageLoader(true);
        await updateCartAddressPromise();

        // we don't need to await customer address update operation;
        // it can happen in background
        updateCustomerAddrPromise();

        if (isCustomerAddress) {
          setCartSelectedShippingAddress(addressId);
        }

        LocalStorage.saveCustomerAddressInfo(addressId, isBillingSame);
        setSuccessMessage(__('Shipping address updated successfully.'));
        setPageLoader(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(__('Shipping address update failed. Please try again'));
        setPageLoader(false);
        throw error;
      }
    },
    [
      setMessage,
      isLoggedIn,
      regionData,
      isBillingSame,
      submitHandler,
      setPageLoader,
      shippingValues,
      setErrorMessage,
      setSuccessMessage,
      updateCustomerAddress,
    ]
  );
}
