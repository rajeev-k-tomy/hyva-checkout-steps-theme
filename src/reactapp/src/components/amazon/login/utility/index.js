import {
  ROUTE_PATH_CREATE_ACCOUNT,
  ROUTE_PATH_NEW_CUSTOMER,
  ROUTE_PATH_SIGN_IN,
} from '../../step/utility';

export function loginSections(isCreateAccount) {
  return [
    {
      id: 'guest',
      name: isCreateAccount ? 'Create Account' : 'New customer',
      href: isCreateAccount
        ? ROUTE_PATH_CREATE_ACCOUNT
        : ROUTE_PATH_NEW_CUSTOMER,
    },
    { id: 'sign_in', name: 'Sign-in', href: ROUTE_PATH_SIGN_IN },
  ];
}

export function isNewCustomerSection(section) {
  return section === loginSections()[0].id;
}

export function isSignInSection(section) {
  return section === loginSections()[1].id;
}
