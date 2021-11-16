/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { bool, func, shape } from 'prop-types';

function BillingSameAsShippingCheckbox({ isBillingSame, actions }) {
  return (
    <fieldset className="">
      <legend className="sr-only">Is billing same as shipping</legend>
      <div className="relative flex items-center">
        <div className="flex items-center h-5">
          <input
            checked={isBillingSame}
            type="checkbox"
            name="billing_sam_as_shipping"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            onClick={() => actions.setIsBillingSame(!isBillingSame)}
          />
        </div>
        <div className="ml-3 text-base">
          <label htmlFor="comments" className="font-semibold text-gray-700">
            Billing address
          </label>
          <p id="comments-description" className="text-sm text-gray-500">
            I like to keep my billing address same as my shipping address.
          </p>
        </div>
      </div>
    </fieldset>
  );
}

BillingSameAsShippingCheckbox.propTypes = {
  isBillingSame: bool.isRequired,
  actions: shape({ setIsBillingSame: func }).isRequired,
};

export default BillingSameAsShippingCheckbox;
