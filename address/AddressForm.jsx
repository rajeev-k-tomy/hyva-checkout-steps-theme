import React from 'react';
import { func, shape, string, node } from 'prop-types';

import { SelectInput, TextInput } from '../common/form';
import { formikDataShape } from '../../../../utils/propTypes';
import { useCountryState } from '../../../code/address/hooks';

function AddressForm({ formikData, fields, actions, children }) {
  const { countryOptions, stateOptions, hasStateOptions } = useCountryState({
    formikData,
    fields,
  });
  const { setFieldTouched, setFieldValue } = formikData;

  const handleCountryChange = (event) => {
    const newValue = event.target.value;
    setFieldTouched(fields.country, newValue);
    setFieldValue(fields.country, newValue);
    // when country is changed, then always reset region field.
    setFieldValue(fields.region, '');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        <TextInput
          required
          actions={actions}
          label="First name"
          formikData={formikData}
          name={fields.firstname}
        />
        <TextInput
          required
          label="Last name"
          actions={actions}
          name={fields.lastname}
          formikData={formikData}
        />
      </div>
      <TextInput
        label="Company"
        actions={actions}
        name={fields.company}
        formikData={formikData}
      />
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        <TextInput
          required
          label="Street 1"
          actions={actions}
          formikData={formikData}
          name={`${fields.street}[0]`}
        />
        <TextInput
          label="Street 2"
          actions={actions}
          formikData={formikData}
          name={`${fields.street}[1]`}
        />
      </div>
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        <TextInput
          required
          actions={actions}
          name={fields.city}
          label="Town / City"
          formikData={formikData}
        />
        <SelectInput
          required
          label="Country"
          name={fields.country}
          formikData={formikData}
          options={countryOptions}
          onChange={handleCountryChange}
        />
      </div>
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        {hasStateOptions ? (
          <SelectInput
            required
            name={fields.region}
            options={stateOptions}
            formikData={formikData}
            label="State / Province"
          />
        ) : (
          <TextInput
            required
            label="PIN code"
            actions={actions}
            name={fields.zipcode}
            formikData={formikData}
          />
        )}
        {hasStateOptions ? (
          <TextInput
            required
            label="PIN code"
            actions={actions}
            name={fields.zipcode}
            formikData={formikData}
          />
        ) : (
          <TextInput
            required
            label="Phone"
            actions={actions}
            name={fields.phone}
            formikData={formikData}
          />
        )}
      </div>
      {hasStateOptions && (
        <TextInput
          required
          label="Phone"
          actions={actions}
          name={fields.phone}
          formikData={formikData}
        />
      )}
      {children}
    </div>
  );
}

AddressForm.propTypes = {
  children: node,
  formikData: formikDataShape.isRequired,
  actions: shape({ handleKeyDown: func }).isRequired,
  fields: shape({ firstname: string, lastname: string }).isRequired,
};

AddressForm.defaultProps = {
  children: null,
};

export default AddressForm;
