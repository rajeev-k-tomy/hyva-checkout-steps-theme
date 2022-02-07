import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { boolean as YupBoolean } from 'yup';

import {
  isFormPopulatedField,
  prepareAgreementsFormData,
  updateAgreementValidationSchema,
  getAgreementsDataFromLocalStorage,
} from '../utility';
import { useFormSection } from '../../../../../hooks';
import { _emptyFunc, _isObjEmpty } from '../../../../../utils';
import { CHECKOUT_AGREEMENTS_FORM } from '../../../../../config';
import { formikDataShape } from '../../../../../utils/propTypes';
import { useAgreementAppContext } from '../../../../code/checkoutAgreements/hooks';
import { checkoutAgreementsInitialValues } from '../../step/utility/initialValues';
import { CheckoutAgreementsFormikContext } from '../../../../code/checkoutAgreements/context';

let initialValues = checkoutAgreementsInitialValues;

const initValidationSchema = {
  isFormPopulated: YupBoolean(),
};

function CheckoutAgreementFormikProvider({ children, formikData }) {
  const [validationSchema, setValidationSchema] =
    useState(initValidationSchema);
  const { checkoutAgreements } = useAgreementAppContext();
  const { setFieldValue } = formikData;
  const agreementValues = formikData?.agreementsValues;
  const isFormPopulated = agreementValues?.isFormPopulated;

  // updating formik values and validation after fetching checkout agreements.
  // this needs to be happened only once.
  useEffect(() => {
    if (!isFormPopulated && !_isObjEmpty(checkoutAgreements)) {
      const agreementsFormData = prepareAgreementsFormData(
        checkoutAgreements,
        agreementValues
      );
      const fullAgreementsFormData = {
        ...agreementValues,
        ...agreementsFormData,
        ...getAgreementsDataFromLocalStorage(),
      };

      if (!_isObjEmpty(agreementsFormData)) {
        initialValues = fullAgreementsFormData;
        setFieldValue(CHECKOUT_AGREEMENTS_FORM, fullAgreementsFormData);
      }
      setValidationSchema(
        updateAgreementValidationSchema(
          fullAgreementsFormData,
          validationSchema
        )
      );
      setFieldValue(isFormPopulatedField, true);
    }
  }, [
    setFieldValue,
    isFormPopulated,
    agreementValues,
    validationSchema,
    checkoutAgreements,
  ]);

  // registering checkout agreements into the global formik state
  const formContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    submitHandler: _emptyFunc(),
    id: CHECKOUT_AGREEMENTS_FORM,
  });

  const context = useMemo(
    () => ({ ...formContext, ...formikData, formikData }),
    [formContext, formikData]
  );

  return (
    <CheckoutAgreementsFormikContext.Provider value={context}>
      <Form id={CHECKOUT_AGREEMENTS_FORM}>{children}</Form>
    </CheckoutAgreementsFormikContext.Provider>
  );
}

CheckoutAgreementFormikProvider.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default CheckoutAgreementFormikProvider;
