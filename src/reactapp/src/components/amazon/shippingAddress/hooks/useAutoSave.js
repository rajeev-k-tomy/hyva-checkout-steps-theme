import { useEffect, useMemo, useState } from 'react';
import { object as YupObject } from 'yup';

import { getShippingUniqueId } from '../utility';
import useSaveAddressAction from './useSaveAddressAction';
import useShippingAddressFormContext from './useShippingAddressFormContext';

export default function useAutoSave() {
  const [lastSavedValues, setLastSavedValues] = useState('');
  const submitHandler = useSaveAddressAction();
  const { shippingValues, validationSchema } = useShippingAddressFormContext();
  const validationRules = useMemo(
    () => YupObject().shape(validationSchema),
    [validationSchema]
  );

  useEffect(() => {
    console.log('effect:autosave');
    validationRules.isValid(shippingValues).then((valid) => {
      if (valid) {
        const newShippingValuesId = getShippingUniqueId(shippingValues);

        if (newShippingValuesId === lastSavedValues) {
          return;
        }

        setLastSavedValues(newShippingValuesId);
        submitHandler();
      }
    });
  }, [validationRules, shippingValues, submitHandler, lastSavedValues]);
}
