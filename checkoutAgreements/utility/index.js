import { get as _get } from 'lodash-es';
import { set as _set } from 'lodash-es';
import { bool as YupBool } from 'yup';

import { __ } from '../../../../../i18n';
import { _keys, _objToArray } from '../../../../../utils';
import LocalStorage from '../../../../../utils/localStorage';
import { CHECKOUT_AGREEMENTS_FORM, config } from '../../../../../config';

export const isFormPopulatedField = `${CHECKOUT_AGREEMENTS_FORM}.isFormPopulated`;

export function getFormikFieldNameById(agreementId) {
  return `isAgreement${agreementId}Agreed`;
}

export function prepareAgreementsFormData(
  checkoutCartAgreements,
  checkoutFormikAgreements
) {
  return _objToArray(checkoutCartAgreements).reduce(
    (accumulator, agreement) => {
      const { isAutomatic, id } = agreement;
      const agreementId = getFormikFieldNameById(id);

      if (!_get(checkoutFormikAgreements, agreementId)) {
        accumulator[getFormikFieldNameById(id)] = isAutomatic;
      }

      return accumulator;
    },
    {}
  );
}

export function updateAgreementValidationSchema(
  agreementsFormData,
  validationSchema
) {
  const requiredMessage = __('Please agree with the terms & conditions');

  const agreementFields = _keys(agreementsFormData).filter(
    (formField) => !['isFormPopulated'].includes(formField)
  );

  agreementFields.forEach((agreementFormikId) => {
    _set(
      validationSchema,
      agreementFormikId,
      YupBool().oneOf([true], requiredMessage)
    );
  });

  return validationSchema;
}

const hyvaStorageKey = config.hyvaStorageSource.storageKey;
const agreementStorageKey = `${hyvaStorageKey}.cart.checkoutAgreements`;

export function getAgreementsDataFromLocalStorage() {
  return _get(LocalStorage.getHyvaCheckoutStorage(), agreementStorageKey) || {};
}

export function updateAgreementIntoLocalStorage(agreementDataToUpdate) {
  const existingAgreementStorageData = getAgreementsDataFromLocalStorage();
  const storageData = _set(
    LocalStorage.getHyvaCheckoutStorage(),
    agreementStorageKey,
    {
      ...existingAgreementStorageData,
      ...agreementDataToUpdate,
    }
  );

  window.localStorage.setItem(hyvaStorageKey, JSON.stringify(storageData));
}
