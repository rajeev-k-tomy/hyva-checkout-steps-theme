import {
  useBillingAddressAppContext,
  useBillingAddressCartContext,
  useBillingAddressFormikContext,
} from '../../../billingAddress/hooks';
import {
  isValidCustomerAddressId,
  billingSameAsShippingField,
} from '../../../../utils/address';
import { __ } from '../../../../i18n';
import { _makePromise } from '../../../../utils';
import LocalStorage from '../../../../utils/localStorage';

const isBillingSame = false;

export default function useSaveAddressAction() {
  const { setCartBillingAddress, setCustomerAddressAsBillingAddress } =
    useBillingAddressCartContext();
  const { setMessage, setPageLoader, setErrorMessage, setSuccessMessage } =
    useBillingAddressAppContext();
  const { setFieldValue, isFormSectionValid, billingValues, addressOnEdit } =
    useBillingAddressFormikContext();

  return async () => {
    setMessage(false);

    if (!isFormSectionValid) {
      return;
    }

    try {
      let updateBillingAddress = _makePromise(setCartBillingAddress, {
        ...billingValues,
        isSameAsShipping: isBillingSame,
      });

      if (isValidCustomerAddressId(addressOnEdit)) {
        updateBillingAddress = _makePromise(
          setCustomerAddressAsBillingAddress,
          Number(addressOnEdit),
          isBillingSame
        );
      }
      setPageLoader(true);
      await updateBillingAddress();
      LocalStorage.saveCustomerAddressInfo(addressOnEdit, isBillingSame, false);

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
