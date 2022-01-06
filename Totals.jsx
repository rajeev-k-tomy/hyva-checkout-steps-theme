import React from 'react';

import { useTotalsCartContext } from '../../code/totals/hooks';

function Totals() {
  const {
    subTotal,
    discounts,
    grandTotal,
    hasSubTotal,
    hasDiscounts,
    hasShippingRate,
    shippingMethodRate: shippingRate,
  } = useTotalsCartContext();

  const totalItems = [
    ...(hasSubTotal ? [{ title: 'Subtotal', price: subTotal }] : []),
    ...(hasShippingRate ? [{ title: 'Shipping', price: shippingRate }] : []),
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
        <li key={item.title} className="flex items-start justify-between">
          <span>{item.title}</span>
          <strong className="text-secondary">{item.price}</strong>
        </li>
      ))}
      <li className="flex items-start justify-between pt-4 text-lg border-t">
        <strong>Grand Total</strong>
        <strong>{grandTotal}</strong>
      </li>
    </ul>
  );
}

export default Totals;
