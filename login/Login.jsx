import React, { useMemo } from 'react';

import LoginMemorized from './LoginMemorized';
import { LOGIN_FORM } from '../../../../config';
import { useFormikMemorizer } from '../../../../hooks';

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
