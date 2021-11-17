import React, { useMemo } from 'react';

import { CART_ITEMS_FORM } from '../../../../config';
import { useFormikMemorizer } from '../../../../hooks';
import CartItemListMemorized from './CartItemListMemorized';

/**
 * Entry point Cart Items Form Section
 *
 * We are preparing any data related to formik state here and memorizing it.
 * After that, these info will be fed to all other child components.
 *
 * So child components DO NOT access formik states using `useFormikContext` hook
 * inside them unless it is totally unavoidable.
 *
 * Using useFormikContext hook render the component almost always. So use the
 * memorized data here inside the child components.
 */
function CartItemList() {
  const formikSectionData = useFormikMemorizer(CART_ITEMS_FORM);

  const cartItemsFormikData = useMemo(
    () => ({
      ...formikSectionData,
      cartItemsValue: formikSectionData.formSectionValues,
      cartItemsTouched: formikSectionData.formSectionTouched,
    }),
    [formikSectionData]
  );

  return <CartItemListMemorized formikData={cartItemsFormikData} />;
}

export default CartItemList;
