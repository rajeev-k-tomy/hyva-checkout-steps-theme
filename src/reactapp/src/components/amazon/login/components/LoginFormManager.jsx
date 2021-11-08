import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { string as YupString } from 'yup';
import { Form } from 'formik';

import { __ } from '../../../../i18n';
import { LOGIN_FORM } from '../../../../config';
import { useAppContext, useCheckoutFormContext } from '../../../../hook';
import LoginFormContext from '../context/LoginFormContext';
import { formikDataShape } from '../../../../utils/propTypes';
import { formTypeFieldName } from '../utility/field';
import { useStepContext } from '../../step/hooks';

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
  const [activeSection, setActiveSection] = useState('guest');
  const [createAccount, setCreateAccount] = useState(false);
  const { isLoggedIn } = useAppContext();
  const { goToNextStep } = useStepContext();
  const { registerFormSection } = useCheckoutFormContext();
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
