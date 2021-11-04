import React from 'react';
import { TrashIcon } from '@heroicons/react/solid';

import { formikDataShape } from '../../../utils/propTypes';
import CartItemsFormManager from '../../items/components/CartItemsFormManager';
import useItemsCartContext from '../../items/hooks/useItemsCartContext';
import { _objToArray, _range } from '../../../utils';

const CartItemListMemorized = React.memo(({ formikData }) => {
  const { cartItems } = useItemsCartContext();

  return (
    <CartItemsFormManager formikData={formikData}>
      <ul className="divide-y divide-gray-200">
        {_objToArray(cartItems).map((cartItem) => (
          <li key={cartItem.id} className="px-4 py-4 sm:px-6">
            <div className="flex flex-wrap space-x-8">
              <div>
                <img
                  className="w-20 h-auto"
                  alt={cartItem.productName}
                  src={cartItem.productSmallImgUrl}
                />
              </div>
              <div className="flex-1">
                <div
                  className="flex items-start justify-between"
                  style={{ minHeight: 96 }}
                >
                  <div className="pb-4 space-y-1">
                    <h3 className="font-semibold text-primary-lighter">
                      {cartItem.productName}
                    </h3>
                    {cartItem.isConfigurable ? (
                      <ul className="space-y-1 text-gray-400">
                        {cartItem.selectedConfigOptions.map((configOption) => (
                          <li key={configOption.optionId}>
                            {configOption.label}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="space-y-1 text-gray-400">
                        <li>{`SKU: ${cartItem.productSku}`}</li>
                      </ul>
                    )}
                  </div>
                  <div className="cursor-pointer">
                    <TrashIcon className="w-4 h-4 text-secondary-lighter hover:text-red-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <strong className="text-base text-secondary">
                    {cartItem.price}
                  </strong>
                  <select className="text-sm border-gray-300 rounded-md">
                    {_range(1, cartItem.quantity + 9).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </CartItemsFormManager>
  );
});

CartItemListMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CartItemListMemorized;
