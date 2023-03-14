import React from 'react';
import { get as _get } from 'lodash-es';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import { Checkbox } from '../../../../code/common/Form';
import {
  getFormikFieldNameById,
  updateAgreementIntoLocalStorage,
} from '../utility';
import {
  useAgreementAppContext,
  useAgreementModalContext,
  useAgreementFormikContext,
} from '../../../../code/checkoutAgreements/hooks';
import { _objToArray } from '../../../../../utils';
import { CHECKOUT_AGREEMENTS_FORM } from '../../../../../config';

function CheckoutAgreementsForm() {
  const { checkoutAgreements } = useAgreementAppContext();
  const { setActiveModalId } = useAgreementModalContext();
  const { fields, agreementsValues, setFieldValue } =
    useAgreementFormikContext();

  const handleAgreementChange = (event, fieldName) => {
    const isChecked = event.target.checked;
    const localStorageField = fieldName.replace(
      `${CHECKOUT_AGREEMENTS_FORM}.`,
      ''
    );
    setFieldValue(fieldName, isChecked);
    updateAgreementIntoLocalStorage({ [localStorageField]: isChecked });
  };

  return _objToArray(checkoutAgreements).map((agreement, index) => {
    const { id: agreementId, isAutomatic, label } = agreement;
    const fieldName = getFormikFieldNameById(agreement.id);
    const isAgreed = !!_get(agreementsValues, fieldName);

    if (!isAutomatic) {
      return (
        <div key={agreementId} className="flex justify-between mt-3">
          <div>
            {fields[fieldName] && (
              <Checkbox
                required
                label={label}
                isChecked={isAgreed}
                name={fields[fieldName]}
                onChange={(event) =>
                  handleAgreementChange(event, fields[fieldName])
                }
              />
            )}
          </div>
          <div className="mt-3 ml-2 cursor-pointer">
            <InformationCircleIcon
              className="w-4 h-4 text-primary-600"
              onClick={() => setActiveModalId(agreementId)}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={agreementId} className="flex justify-between mt-2">
        <div
          role="button"
          tabIndex={index}
          onClick={() => setActiveModalId(agreementId)}
          className="mt-3 ml-6 text-sm cursor-pointer"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setActiveModalId(agreementId);
            }
          }}
        >
          {label}
        </div>
        <div className="mt-4 ml-2 cursor-pointer">
          <InformationCircleIcon
            className="w-4 h-4 text-primary-600"
            onClick={() => setActiveModalId(agreementId)}
          />
        </div>
      </div>
    );
  });
}

export default CheckoutAgreementsForm;
