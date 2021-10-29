import React from 'react';

import { AddressForm } from '../address';
import { GeneralSection } from '../common/sections';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';

function ShippingAddress() {
  return (
    <GeneralSection title="Add a new delivery address" addTopPadding>
      <AddressForm />
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default ShippingAddress;
