import React, { useEffect, useState } from 'react';
import { Form } from 'formik';
import { node } from 'prop-types';
import { string as YupString } from 'yup';

import { __ } from '../../../../i18n';
import { LOGIN_FORM } from '../../../../config';
import { useStepContext } from '../../step/hooks';
import { formTypeFieldName } from '../utility/field';
import LoginFormContext from '../context/LoginFormContext';
import { formikDataShape } from '../../../../utils/propTypes';
import { useAppContext, useCheckoutFormContext } from '../../../../hook';

const initialValues = {
  email: '',
  password: '',
  formType: 'guest',
};

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
  const { isLoggedIn } = useAppContext();
  const { registerFormSection } = useCheckoutFormContext();
  const { goToNextStep } = useStepContext();
  const { setFieldValue } = formikData;

  const updateSection = (section) => {
    setActiveSection(section);
    setFieldValue(formTypeFieldName, section);
  };

  useEffect(() => {
    registerFormSection({
      id: LOGIN_FORM,
      initialValues,
      validationSchema,
    });
  }, [initialValues, validationSchema, registerFormSection]);

  useEffect(() => {
    if (isLoggedIn) {
      goToNextStep();
    }
  }, [isLoggedIn]);

  const context = {
    formikData,
    ...formikData,
    activeSection,
    createAccount,
    setCreateAccount,
    setActiveSection: updateSection,
  };

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
