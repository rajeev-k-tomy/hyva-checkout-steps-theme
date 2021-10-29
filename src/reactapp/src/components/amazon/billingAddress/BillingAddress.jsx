import React from 'react';

import { AddressForm } from '../address';
import { SubSection } from '../common/sections';

function BillingAddress() {
  return (
    <SubSection title="Add a new billing address">
      <AddressForm />
    </SubSection>
  );
}

export default BillingAddress;
