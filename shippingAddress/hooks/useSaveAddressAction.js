import {
  prepareAddressForSaving,
  isValidCustomerAddressId,
  prepareFormAddressFromCartAddress,
} from '../../../../../utils/address';
import {
  useShippingAddressAppContext,
  useShippingAddressCartContext,
  useShippingAddressFormikContext,
} from '../../../../code/shippingAddress/hooks';
import { __ } from '../../../../../i18n';
import { BILLING_ADDR_FORM } from '../../../../../config';
import LocalStorage from '../../../../../utils/localStorage';
import { _emptyFunc, _makePromise } from '../../../../../utils';
import { billingAddressInitialValues } from '../../step/utility/initialValues';

const emptyCallback = _emptyFunc();

export default function useSaveAddressAction() {
  const {
    setCartBillingAddress,
    addCartShippingAddress,
    setCartSelectedShippingAddress,
    setCustomerAddressAsBillingAddress,
    setCustomerAddressAsShippingAddress,
  } = useShippingAddressCartContext();
  const {
    regionData,
    isBillingSame,
    setFieldValue,
    shippingValues,
    setShippingAddressFormFields,
  } = useShippingAddressFormikContext();
  const { setMessage, setPageLoader, setErrorMessage, setSuccessMessage } =
    useShippingAddressAppContext();

  const submitHandler = async (customerAddressId) => {
    const addressToSave = prepareAddressForSaving(shippingValues, regionData);
    const useCustomerAddressInSave =
      isValidCustomerAddressId(customerAddressId);
    let updateBillingAddress = emptyCallback;
    let updateShippingAddress = _makePromise(
      addCartShippingAddress,
      addressToSave,
      isBillingSame
    );

    if (useCustomerAddressInSave) {
      updateShippingAddress = _makePromise(
        setCustomerAddressAsShippingAddress,
        Number(customerAddressId),
        isBillingSame
      );
    }

    if (isBillingSame) {
      updateBillingAddress = _makePromise(setCartBillingAddress, {
        ...addressToSave,
        isSameAsShipping: true,
      });
      if (useCustomerAddressInSave) {
        updateBillingAddress = _makePromise(
          setCustomerAddressAsBillingAddress,
          Number(customerAddressId),
          isBillingSame
        );
      }
    }

    const shippingAddrResponse = await updateShippingAddress();
    await updateBillingAddress();

    const addressToSet = {
      ...prepareFormAddressFromCartAddress(
        shippingAddrResponse?.shipping_address,
        customerAddressId
      ),
      saveInBook: addressToSave?.saveInBook,
    };
    setShippingAddressFormFields(addressToSet);

    setPageLoader(false);

    if (isBillingSame) {
      setFieldValue(BILLING_ADDR_FORM, {
        ...billingAddressInitialValues,
        ...addressToSet,
        isSameAsShipping: true,
      });
    }
  };

  return async (addressId, isEditForm = false) => {
    setMessage(false);

    const isCustomerAddress = isValidCustomerAddressId(addressId);
    const updateCartAddressPromise = _makePromise(
      submitHandler,
      addressId,
      isEditForm
    );

    try {
      setPageLoader(true);
      await updateCartAddressPromise();

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
  };
}
