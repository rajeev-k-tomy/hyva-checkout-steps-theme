import { useCallback } from 'react';

import {
  addressInitValues,
  isValidCustomerAddressId,
  prepareFormAddressFromCartAddress,
} from '../../../../../utils/address';
import {
  useShippingAddressAppContext,
  useShippingAddressCartContext,
  useShippingAddressFormikContext,
} from '../../../../code/shippingAddress/hooks';
import { __ } from '../../../../../i18n';
import LocalStorage from '../../../../../utils/localStorage';
import { initialAddressValues } from '../../address/utility';
import { _emptyFunc, _makePromise } from '../../../../../utils';
import { BILLING_ADDR_FORM, SHIPPING_ADDR_FORM } from '../../../../../config';

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
    useShippingAddressFormikContext();

  const submitHandler = useCallback(
    async (customerAddressId, isEditForm = false) => {
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

      if (customerAddressId && !isEditForm) {
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
      setFieldValue(SHIPPING_ADDR_FORM, {
        ...initialAddressValues,
        ...addressToSet,
      });

      setPageLoader(false);

      await updateBillingAddress();

      if (isBillingSame) {
        setFieldValue(BILLING_ADDR_FORM, {
          ...addressInitValues,
          ...addressToSet,
          isSameAsShipping: true,
        });
      }
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
    async (addressId, isEditForm = false) => {
      setMessage(false);

      const isCustomerAddress = isValidCustomerAddressId(addressId);
      let updateCustomerAddrPromise = emptyCallback;
      const updateCartAddressPromise = _makePromise(
        submitHandler,
        isCustomerAddress && addressId,
        isEditForm
      );

      if (isLoggedIn && isCustomerAddress && isEditForm) {
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
