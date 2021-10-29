/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { GeneralSection, WellSection } from '../common/sections';
import { VerticalTabSelector } from '../common/form';

const items = [
  {
    id: 1,
    title: 'FedEx',
    selected: true,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Integer nec odio. Praesent libero. Sed cursus ante dapibus
  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
  Duis sagittis ipsum. Praesent mauris.`,
    price: '$5.00',
  },
  {
    id: 2,
    title: 'Home delivery',
    selected: false,
    description: `Nulla quis sem at nibh elementum imperdiet.
    Duis sagittis ipsum. Praesent mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Integer nec odio. Praesent libero. `,
    price: '$7.00',
  },
  {
    id: 3,
    title: 'Free Shipping',
    selected: false,
    description: `Sed cursus ante dapibus
  diam. Sed nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Integer nec odio.`,
    price: '$0.00',
  },
];

function ShippingMethodList() {
  const [selected, setSelected] = useState();
  const selectedItem = items.find((item) => item.id === selected);

  return (
    <GeneralSection title="Select a shipping method" addTopPadding>
      <WellSection>
        <VerticalTabSelector
          selected={selected}
          actions={{ setSelected }}
          items={items}
        >
          <div className="px-4 py-5 sm:p-6">
            <p>{selectedItem?.description}</p>
            <strong className="inline-block pt-6">{selectedItem?.price}</strong>
          </div>
        </VerticalTabSelector>
      </WellSection>
    </GeneralSection>
  );
}

export default ShippingMethodList;
