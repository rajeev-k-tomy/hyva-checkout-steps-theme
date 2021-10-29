import React, { useState } from 'react';

import { VerticalTabSelector } from '../common/form';
import { GeneralSection, WellSection } from '../common/sections';
import HorizontalLineSeparator from '../common/HorizontalLineSeparator';
import BillingSameAsShippingCheckbox from './BillingSameAsShippingCheckbox';

const items = [
  {
    id: 1,
    title: 'Check/ Money order',
    selected: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Integer nec odio. Praesent libero. Sed cursus ante dapibus
  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
  Duis sagittis ipsum. Praesent mauris.`,
  },
];

function PaymentMethodList() {
  const [selected, setSelected] = useState('');
  const [isBillingSame, setIsBillingSame] = useState(true);

  return (
    <GeneralSection title="Select a payment method">
      <BillingSameAsShippingCheckbox
        isBillingSame={isBillingSame}
        actions={{ setIsBillingSame }}
      />
      <WellSection>
        <VerticalTabSelector
          items={items}
          selected={selected}
          actions={{ setSelected }}
        />
      </WellSection>
      <HorizontalLineSeparator />
    </GeneralSection>
  );
}

export default PaymentMethodList;
