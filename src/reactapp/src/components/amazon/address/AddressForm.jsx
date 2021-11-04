import React from 'react';
import { func, shape, string } from 'prop-types';

import { SelectInput, TextInput } from '../common/form';
import { formikDataShape } from '../../../utils/propTypes';
import useCountryState from '../../address/hooks/useCountryState';

function AddressForm({ formikData, fields, actions }) {
  const { countryOptions, stateOptions } = useCountryState({
    formikData,
    fields,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between space-x-3">
        <TextInput
          required
          label="First name"
          formikData={formikData}
          name={fields.firstname}
          actions={actions}
        />
        <TextInput
          required
          label="Last name"
          name={fields.lastname}
          formikData={formikData}
          actions={actions}
        />
      </div>
      <TextInput
        label="Company"
        name={fields.company}
        formikData={formikData}
        actions={actions}
      />
      <div className="flex items-start justify-between space-x-3">
        <TextInput
          required
          label="Street 1"
          formikData={formikData}
          actions={actions}
          name={`${fields.street}[0]`}
        />
        <TextInput
          label="Street 2"
          formikData={formikData}
          actions={actions}
          name={`${fields.street}[1]`}
        />
      </div>
      <div className="flex items-start justify-between space-x-3">
        <TextInput
          formikData={formikData}
          name={fields.city}
          label="Town / City"
          required
          actions={actions}
        />
        <SelectInput
          label="Country"
          name={fields.country}
          formikData={formikData}
          options={countryOptions}
          required
        />
      </div>
      <div className="flex items-start justify-between space-x-3">
        <SelectInput
          required
          name={fields.region}
          options={stateOptions}
          formikData={formikData}
          label="State / Province"
        />
        <TextInput
          required
          label="PIN code"
          name={fields.zipcode}
          formikData={formikData}
          actions={actions}
        />
      </div>
      <TextInput
        required
        label="Phone"
        name={fields.phone}
        formikData={formikData}
        actions={actions}
      />
    </div>
  );
}

AddressForm.propTypes = {
  formikData: formikDataShape.isRequired,
  actions: shape({ handleKeyDown: func }).isRequired,
  fields: shape({ firstname: string, lastname: string }).isRequired,
};

export default AddressForm;
