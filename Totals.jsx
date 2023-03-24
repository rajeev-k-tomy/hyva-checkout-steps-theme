import React from 'react';

import { __ } from '../../../i18n';
import { useTotalsCartContext } from '../../code/totals/hooks';

function Totals() {
  const {
    discounts,
    grandTotal,
    hasSubTotal,
    subTotalIncl,
    appliedTaxes,
    hasDiscounts,
    hasAppliedTaxes,
    hasShippingRate,
    shippingMethodRate: shippingRate,
  } = useTotalsCartContext();

  const totalItems = [
    ...(hasSubTotal ? [{ title: __('Subtotal'), price: subTotalIncl }] : []),
    ...(hasShippingRate
      ? [{ title: __('Shipping'), price: shippingRate }]
      : []),
    ...(hasAppliedTaxes
      ? [
          {
            title: __('Tax'),
            items: appliedTaxes.map((tax) => ({ ...tax, title: tax?.label })),
          },
        ]
      : []),
    ...(hasDiscounts
      ? (discounts || []).map((discount) => ({
          title: discount.label,
          price: discount.price,
        }))
      : []),
  ];

  return (
    <ul className="px-8 pt-8 pb-4 space-y-4 border-t">
      {totalItems.map((item) => (
        <li
          key={item.title}
          className={item.items ? '' : 'flex items-start justify-between'}
        >
          <span>{item.title}</span>
          {item.items ? (
            <ul className="pt-3 pl-4">
              {item.items.map((subItem) => (
                <li
                  key={subItem.title}
                  className="flex items-start justify-between"
                >
                  <span className="text-sm">{subItem.title}</span>
                  <strong className="text-secondary">{subItem.price}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <strong className="text-secondary">{item.price}</strong>
          )}
        </li>
      ))}
      <li className="flex items-start justify-between pt-4 text-lg border-t">
        <strong>{__('Grand Total')}</strong>
        <strong>{grandTotal}</strong>
      </li>
    </ul>
  );
}

export default Totals;
