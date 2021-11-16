import {
  useBillingAddressAppContext,
  useBillingAddressCartContext,
  useBillingAddressFormikContext,
} from '../../../../code/billingAddress/hooks';
import {
  isValidCustomerAddressId,
  billingSameAsShippingField,
  prepareFormAddressFromCartAddress,
} from '../../../../../utils/address';
import { __ } from '../../../../../i18n';
import { _makePromise } from '../../../../../utils';
import { BILLING_ADDR_FORM } from '../../../../../config';
import LocalStorage from '../../../../../utils/localStorage';

const isBillingSame = false;

export default function useSaveAddressAction() {
  const {
    setMessage,
    setPageLoader,
    setErrorMessage,
    setSuccessMessage,
    customerAddressList,
  } = useBillingAddressAppContext();
  const { setCartBillingAddress, setCustomerAddressAsBillingAddress } =
    useBillingAddressCartContext();
  const { setFieldValue, isFormSectionValid, billingValues, setAddressOnEdit } =
    useBillingAddressFormikContext();

  return async (addressId) => {
    setMessage(false);

    if (!isFormSectionValid) {
      return;
    }

    try {
      let updateBillingAddress = _makePromise(setCartBillingAddress, {
        ...billingValues,
        isSameAsShipping: isBillingSame,
      });

      if (isValidCustomerAddressId(addressId)) {
        updateBillingAddress = _makePromise(
          setCustomerAddressAsBillingAddress,
          Number(addressId),
          isBillingSame
        );
      }
      setPageLoader(true);
      await updateBillingAddress();
      setAddressOnEdit(addressId);
      LocalStorage.saveCustomerAddressInfo(addressId, isBillingSame, false);

      if (isValidCustomerAddressId(addressId)) {
        setFieldValue(BILLING_ADDR_FORM, {
          ...billingValues,
          ...prepareFormAddressFromCartAddress(customerAddressList[addressId]),
        });
      }

      // When we switch address from billing address section, there is chance to
      // set same customer address which is been used as the current shipping address.
      // In this case, we will force set billing === shipping
      const billingIdInStorage = LocalStorage.getCustomerBillingAddressId();
      const shippingIdInStorage = LocalStorage.getCustomerShippingAddressId();
      if (billingIdInStorage === shippingIdInStorage) {
        setFieldValue(billingSameAsShippingField, true);
      }

      setSuccessMessage(__('Billing address updated successfully.'));
      setPageLoader(false);
      setPageLoader(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(__('Billing address update failed. Please try again.'));
      setPageLoader(false);
    }
  };
}
