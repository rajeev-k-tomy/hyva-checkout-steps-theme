import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

import ItemQtySelector from './components/ItemQtySelector';
import { CartItemsFormManager } from '../../../code/items/components';
import { LOGIN_STEP } from '../step/utility';
import { useStepContext } from '../step/hooks';
import { _objToArray } from '../../../../utils';
import { formikDataShape } from '../../../../utils/propTypes';
import { useItemsCartContext } from '../../../code/items/hooks';

const CartItemListMemorized = React.memo(({ formikData }) => {
  const { currentStep } = useStepContext();
  const { cartItems } = useItemsCartContext();

  return (
    <CartItemsFormManager formikData={formikData}>
      {currentStep !== LOGIN_STEP && (
        <ul className="divide-y divide-gray-200">
          {_objToArray(cartItems).map((cartItem) => (
            <li key={cartItem.id} className="px-4 py-4 sm:px-6">
              <div className="flex flex-wrap space-x-8">
                <div>
                  <img
                    className="w-16 h-auto md:w-20"
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
                        <ul className="space-y-1 text-sm text-gray-400 md:text-base">
                          {cartItem.selectedConfigOptions.map(
                            (configOption) => (
                              <li key={configOption.optionId}>
                                {configOption.label}
                              </li>
                            )
                          )}
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
                    <ItemQtySelector item={cartItem} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </CartItemsFormManager>
  );
});

CartItemListMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CartItemListMemorized;
