import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { string as YupString } from 'yup';
import { Form } from 'formik';

import { __ } from '../../../../i18n';
import { LOGIN_FORM } from '../../../../config';
import { useCheckoutFormContext } from '../../../../hook';
import LoginFormContext from '../context/LoginFormContext';
import { formikDataShape } from '../../../../utils/propTypes';

const initialValues = {
  email: '',
};

const validationSchema = {
  email: YupString()
    .nullable()
    .required(__('Email is required'))
    .email(__('Email is invalid')),
};

function LoginFormManager({ children, formikData }) {
  const [activeSection, setActiveSection] = useState('guest');
  const [createAccount, setCreateAccount] = useState(false);
  const { registerFormSection } = useCheckoutFormContext();

  useEffect(() => {
    registerFormSection({
      id: LOGIN_FORM,
      initialValues,
      validationSchema,
    });
  }, [initialValues, validationSchema, registerFormSection]);

  const context = {
    formikData,
    ...formikData,
    activeSection,
    createAccount,
    setActiveSection,
    setCreateAccount,
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
