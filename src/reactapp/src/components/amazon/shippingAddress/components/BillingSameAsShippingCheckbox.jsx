/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field } from 'formik';
import { bool, string } from 'prop-types';

import {
  ROUTE_PATH_ADDRESS,
  ROUTE_PATH_ADD_NEW_BILLING_ADDR,
} from '../../step/utility';
import {
  isValidCustomerAddressId,
  billingSameAsShippingField,
} from '../../../../utils/address';

import {
  useShippingAddressAppContext,
  useShippingAddressCartContext,
  useShippingAddressFormContext,
} from '../hooks';
import { useStepContext } from '../../step/hooks';
import { BILLING_ADDR_FORM } from '../../../../config';
import LocalStorage from '../../../../utils/localStorage';
import { classNames, _makePromise } from '../../../../utils';

function BillingSameAsShippingCheckbox({ label, useInCard }) {
  const { setStepRoutePath } = useStepContext();
  const { setPageLoader } = useShippingAddressAppContext();
  const { setCartBillingAddress, setCustomerAddressAsBillingAddress } =
    useShippingAddressCartContext();
  const { setFieldValue, isFormSectionValid, shippingValues, addressOnEdit } =
    useShippingAddressFormContext();

  const handleCheckboxClick = async (event) => {
    const isChecked = event.target.checked;
    await setFieldValue(billingSameAsShippingField, isChecked);

    if (isFormSectionValid && isChecked) {
      try {
        let updateBillingAddress = _makePromise(setCartBillingAddress, {
          ...shippingValues,
          isSameAsShipping: true,
        });

        if (isValidCustomerAddressId(addressOnEdit)) {
          updateBillingAddress = _makePromise(
            setCustomerAddressAsBillingAddress,
            Number(addressOnEdit),
            true
          );
        }
        setPageLoader(true);
        await updateBillingAddress();
        await setFieldValue(BILLING_ADDR_FORM, {
          ...shippingValues,
          isSameAsShipping: true,
        });
        setPageLoader(false);
      } catch (error) {
        console.error(error);
        setPageLoader(false);
      }
    }

    LocalStorage.saveBillingSameAsShipping(isChecked);
    setStepRoutePath(
      isChecked ? ROUTE_PATH_ADDRESS : ROUTE_PATH_ADD_NEW_BILLING_ADDR
    );
  };

  return (
    <fieldset className="">
      <legend className="sr-only">Is billing same as shipping</legend>
      <div className="relative flex items-center">
        <div className="flex items-center h-5">
          <Field
            type="checkbox"
            id={billingSameAsShippingField}
            name={billingSameAsShippingField}
            onClick={handleCheckboxClick}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div
          className={classNames(useInCard ? 'text-sm ml-2' : 'text-base ml-3')}
        >
          <label
            htmlFor={billingSameAsShippingField}
            className="font-semibold text-gray-700"
          >
            {label ||
              'I like to keep my billing address same as my delivery address above.'}
          </label>
        </div>
      </div>
    </fieldset>
  );
}

BillingSameAsShippingCheckbox.propTypes = {
  label: string,
  useInCard: bool,
};

BillingSameAsShippingCheckbox.defaultProps = {
  label: '',
  useInCard: false,
};

export default BillingSameAsShippingCheckbox;
