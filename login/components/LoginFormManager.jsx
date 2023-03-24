import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { string as YupString } from 'yup';

import { __ } from '../../../../../i18n';
import { useStepContext } from '../../step/hooks';
import { LOGIN_FORM } from '../../../../../config';
import { formTypeFieldName } from '../utility/field';
import LoginFormContext from '../context/LoginFormContext';
import { formikDataShape } from '../../../../../utils/propTypes';
import { loginInitialValues } from '../../step/utility/initialValues';
import { useAppContext, useCheckoutFormContext } from '../../../../../hooks';

const validationSchema = {
  email: YupString()
    .nullable()
    .required(__('Email is required'))
    .email(__('Email is invalid')),
  password: YupString().test(
    'requiredIfSignIn',
    __('Password is required'),
    (value, context) => {
      const formType = context?.parent?.formType;

      if (formType === 'sign_in') {
        return !!value;
      }

      return true;
    }
  ),
};

function LoginFormManager({ children, formikData }) {
  const [createAccount, setCreateAccount] = useState(false);
  const [activeSection, setActiveSection] = useState('guest');
  const [initialValues, setInitialValues] = useState(loginInitialValues);
  const { isLoggedIn } = useAppContext();
  const { goToNextStep } = useStepContext();
  const { aggregatedData } = useCheckoutFormContext();
  const { registerFormSection } = useCheckoutFormContext();
  const { setFieldValue } = formikData;

  const updateSection = useCallback(
    (section) => {
      setActiveSection(section);
      setFieldValue(formTypeFieldName, section);
    },
    [setFieldValue]
  );

  useEffect(() => {
    registerFormSection({
      id: LOGIN_FORM,
      initialValues,
      validationSchema,
    });
  }, [initialValues, registerFormSection]);

  useEffect(() => {
    if (isLoggedIn) {
      goToNextStep();
    }
  }, [goToNextStep, isLoggedIn]);

  // Update initialvalues based on the initial cart data fetch.
  useEffect(() => {
    if (aggregatedData) {
      const email = aggregatedData?.cart?.email || '';
      setInitialValues({ ...loginInitialValues, email });
    }
  }, [aggregatedData]);

  const context = useMemo(
    () => ({
      formikData,
      ...formikData,
      activeSection,
      createAccount,
      setCreateAccount,
      setActiveSection: updateSection,
    }),
    [activeSection, createAccount, formikData, updateSection]
  );

  return (
    <LoginFormContext.Provider value={context}>
      <Form id={LOGIN_FORM}>{children}</Form>
    </LoginFormContext.Provider>
  );
}

LoginFormManager.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default LoginFormManager;
