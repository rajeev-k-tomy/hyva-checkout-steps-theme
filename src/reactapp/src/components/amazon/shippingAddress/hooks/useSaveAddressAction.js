import { useCallback } from 'react';

import {
  isValidCustomerAddressId,
  prepareFormAddressFromCartAddress,
} from '../../../../utils/address';
import { __ } from '../../../../i18n';
import { BILLING_ADDR_FORM } from '../../../../config';
import LocalStorage from '../../../../utils/localStorage';
import { _emptyFunc, _makePromise } from '../../../../utils';
import { billingAddressFormInitValues } from '../../../billingAddress/utility';
import useShippingAddressFormContext from './useShippingAddressFormContext';
import useShippingAddressCartContext from '../../../shippingAddress/hooks/useShippingAddressCartContext';
import { useShippingAddressAppContext } from '../../../shippingAddress/hooks';

const isBillingSame = true;

export default function useSaveAddressAction() {
  const { setFieldValue, shippingValues } = useShippingAddressFormContext();
  const { setMessage, setPageLoader, setErrorMessage, setSuccessMessage } =
    useShippingAddressAppContext();
  const {
    setCartBillingAddress,
    addCartShippingAddress,
    setCustomerAddressAsBillingAddress,
    setCustomerAddressAsShippingAddress,
  } = useShippingAddressCartContext();

  const submitHandler = useCallback(
    async (customerAddressId) => {
      let updateBillingAddress = _makePromise(setCartBillingAddress, {
        ...shippingValues,
        isSameAsShipping: true,
      });
      let updateShippingAddress = _makePromise(
        addCartShippingAddress,
        shippingValues,
        isBillingSame
      );

      if (customerAddressId) {
        updateShippingAddress = _makePromise(
          setCustomerAddressAsShippingAddress,
          Number(customerAddressId),
          isBillingSame
        );
        updateBillingAddress = _makePromise(
          setCustomerAddressAsBillingAddress,
          Number(customerAddressId),
          isBillingSame
        );
      }

      const shippingAddrResponse = await updateShippingAddress();

      const addressToSet = prepareFormAddressFromCartAddress(
        shippingAddrResponse?.shipping_address,
        customerAddressId
      );
      setFieldValue(BILLING_ADDR_FORM, {
        ...billingAddressFormInitValues,
        ...addressToSet,
        isSameAsShipping: true,
      });

      setPageLoader(false);

      updateBillingAddress();
    },
    [
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
      const updateCustomerAddrPromise = _emptyFunc();
      const updateCartAddressPromise = _makePromise(
        submitHandler,
        isCustomerAddress && addressId
      );

      // if (isLoggedIn && customerAddressSelected && editMode) {
      //   updateCustomerAddrPromise = _makePromise(
      //     updateCustomerAddress,
      //     addressIdContext,
      //     shippingAddressToSave,
      //     regionData
      //   );
      // }

      try {
        setPageLoader(true);
        await updateCartAddressPromise();

        // we don't need to await customer address update operation;
        // it can happen in background
        updateCustomerAddrPromise();

        LocalStorage.saveCustomerAddressInfo(addressId, isBillingSame);
        setSuccessMessage(__('Shipping address updated successfully.'));
        setPageLoader(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(__('Shipping address update failed. Please try again'));
        setPageLoader(false);
      }
    },
    [
      setMessage,
      submitHandler,
      setPageLoader,
      setErrorMessage,
      setSuccessMessage,
    ]
  );
}
