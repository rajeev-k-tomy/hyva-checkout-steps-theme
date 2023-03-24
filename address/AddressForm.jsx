import React from 'react';
import { func, shape, string, node } from 'prop-types';

import { SelectInput, TextInput } from '../common/form';
import { __ } from '../../../../i18n';
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
          formikData={formikData}
          name={fields.firstname}
          label={__('First name')}
        />
        <TextInput
          required
          actions={actions}
          name={fields.lastname}
          label={__('Last name')}
          formikData={formikData}
        />
      </div>
      <TextInput
        actions={actions}
        label={__('Company')}
        name={fields.company}
        formikData={formikData}
      />
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        <TextInput
          required
          actions={actions}
          formikData={formikData}
          label={__('Street %1', '1')}
          name={`${fields.street}[0]`}
        />
        <TextInput
          actions={actions}
          formikData={formikData}
          label={__('Street %1', '2')}
          name={`${fields.street}[1]`}
        />
      </div>
      <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-3 md:space-y-4 sm:space-y-0 sm:items-start sm:justify-between sm:space-x-3 sm:flex md:block md:space-x-0">
        <TextInput
          required
          actions={actions}
          name={fields.city}
          formikData={formikData}
          label={__('Town / City')}
        />
        <SelectInput
          required
          label={__('Country')}
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
            label={__('State / Province')}
          />
        ) : (
          <TextInput
            required
            actions={actions}
            name={fields.zipcode}
            label={__('PIN code')}
            formikData={formikData}
          />
        )}
        {hasStateOptions ? (
          <TextInput
            required
            actions={actions}
            name={fields.zipcode}
            label={__('PIN code')}
            formikData={formikData}
          />
        ) : (
          <TextInput
            required
            label={__('Phone')}
            actions={actions}
            name={fields.phone}
            formikData={formikData}
          />
        )}
      </div>
      {hasStateOptions && (
        <TextInput
          required
          actions={actions}
          label={__('Phone')}
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
