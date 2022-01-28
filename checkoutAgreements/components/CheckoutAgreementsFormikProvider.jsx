import React, { useEffect, useState, useMemo } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';

import {
  prepareAgreementsFormData,
  updateAgreementValidationSchema,
} from '../utility';
import { useFormSection } from '../../../../../hooks';
import { _emptyFunc, _isObjEmpty } from '../../../../../utils';
import { CHECKOUT_AGREEMENTS_FORM } from '../../../../../config';
import { formikDataShape } from '../../../../../utils/propTypes';
import { useAgreementAppContext } from '../../../../code/checkoutAgreements/hooks';
import { CheckoutAgreementsFormikContext } from '../../../../code/checkoutAgreements/context';

let initialValues = {
  isFormPopulated: false,
};

const isFormPopulatedField = `${CHECKOUT_AGREEMENTS_FORM}.isFormPopulated`;

function CheckoutAgreementFormikProvider({ children, formikData }) {
  const [validationSchema, setValidationSchema] = useState({});
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

      if (!_isObjEmpty(agreementsFormData)) {
        initialValues = agreementsFormData;
        setFieldValue(CHECKOUT_AGREEMENTS_FORM, agreementsFormData);
      }
      setValidationSchema(
        updateAgreementValidationSchema(
          { ...agreementValues, ...agreementsFormData },
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
