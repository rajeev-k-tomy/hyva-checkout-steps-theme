import React from 'react';

import { TextInput } from '../common/form';

function AddressForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-3">
        <TextInput name="shipping.firstname" label="First name" />
        <TextInput name="shipping.lastname" label="Last name" />
      </div>
      <TextInput name="shipping.company" label="Company" />
      <div className="flex items-center justify-between space-x-3">
        <TextInput name="shipping.street[0]" label="Street 1" />
        <TextInput name="shipping.street[1]" label="Street 2" />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <TextInput name="shipping.city" label="Town/City" />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <TextInput name="shipping.state" label="State / Province" />
        <TextInput name="shipping.zipcode" label="PIN code" />
      </div>
      <TextInput name="shipping.telephone" label="Phone" />
    </div>
  );
}

export default AddressForm;
