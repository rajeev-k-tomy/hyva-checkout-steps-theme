import React from 'react';

function Totals() {
  return (
    <ul className="px-8 pt-8 pb-4 space-y-4 border-t">
      {[
        { title: 'Subtotal', price: '$64.00' },
        { title: 'Shipping', price: '$5.00' },
        { title: 'Taxes', price: '$5.52' },
      ].map((item) => (
        <li key={item.title} className="flex items-start justify-between">
          <span>{item.title}</span>
          <strong className="text-secondary">{item.price}</strong>
        </li>
      ))}
      <li className="flex items-start justify-between pt-4 text-lg border-t">
        <strong>Grand Total</strong>
        <strong>$75.52</strong>
      </li>
    </ul>
  );
}

export default Totals;
