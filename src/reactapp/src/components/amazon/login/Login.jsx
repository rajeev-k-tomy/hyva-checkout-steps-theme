import React, { useMemo } from 'react';
import { LOGIN_FORM } from '../../../config';
import useFormikMemorizer from '../../../hook/useFormikMemorizer';
import LoginMemorized from './LoginMemorized';

function Login() {
  const formikSectionData = useFormikMemorizer(LOGIN_FORM);

  const loginFormikData = useMemo(
    () => ({
      ...formikSectionData,
      loginFormValues: formikSectionData.formSectionValues,
    }),
    [formikSectionData]
  );

  return <LoginMemorized formikData={loginFormikData} />;
}

export default Login;
