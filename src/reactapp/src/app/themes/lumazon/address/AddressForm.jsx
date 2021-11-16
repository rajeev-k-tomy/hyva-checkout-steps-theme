import React from 'react';
import { func, shape, string } from 'prop-types';

import { SelectInput, TextInput } from '../common/form';
import { formikDataShape } from '../../../../utils/propTypes';
import { useCountryState } from '../../../code/address/hooks';

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
      <div className="flex items-start justify-between space-x-3">
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
      <div className="flex items-start justify-between space-x-3">
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
          actions={actions}
          name={fields.zipcode}
          formikData={formikData}
        />
      </div>
      <TextInput
        required
        label="Phone"
        actions={actions}
        name={fields.phone}
        formikData={formikData}
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
