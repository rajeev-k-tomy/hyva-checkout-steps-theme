import React from 'react';
import { get as _get } from 'lodash-es';
import { string, shape } from 'prop-types';

import {
  useItemsAppContext,
  useItemsCartContext,
  useItemsFormContext,
} from '../../../../code/items/hooks';
import {
  validate,
  prepareCartDataToUpdate,
} from '../../../../code/items/components/utility';
import { __ } from '../../../../../i18n';
import { _range } from '../../../../../utils';
import { CART_ITEMS_FORM } from '../../../../../config';

function ItemQtySelector({ item }) {
  const { updateCartItem } = useItemsCartContext();
  const { setFieldValue, cartItemsValue, validationSchema } =
    useItemsFormContext();
  const { setMessage, setPageLoader, setSuccessMessage, setErrorMessage } =
    useItemsAppContext();
  const itemField = `${item.id}_qty`;
  const fullItemField = `${CART_ITEMS_FORM}.${itemField}`;
  const itemQty = _get(cartItemsValue, itemField);

  const handleItemChange = async (event) => {
    setMessage(false);
    const qty = Number(event.target.value);
    const updatedValue = { ...cartItemsValue, [itemField]: qty };
    await setFieldValue(fullItemField, qty);

    try {
      const isValid = await validate(validationSchema, updatedValue);
      const cartItemsToUpdate = prepareCartDataToUpdate(updatedValue);

      if (!isValid) {
        return;
      }

      if (cartItemsToUpdate.length) {
        setPageLoader(true);
        await updateCartItem({ cartItems: cartItemsToUpdate });
        setSuccessMessage(__('Cart updated successfully.'));
        setPageLoader(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setPageLoader(false);
    }
  };

  return (
    <select
      value={itemQty}
      name={fullItemField}
      onChange={handleItemChange}
      className="w-16 text-sm border-gray-300 rounded-md"
    >
      {_range(1, item.quantity + 9).map((qty) => (
        <option key={qty} value={qty}>
          {qty}
        </option>
      ))}
    </select>
  );
}

ItemQtySelector.propTypes = {
  item: shape({ id: string }).isRequired,
};

export default ItemQtySelector;
