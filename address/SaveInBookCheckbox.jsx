import React from 'react';
import { get as _get } from 'lodash-es';
import { shape, string, func } from 'prop-types';

import { Checkbox } from '../../../code/common/Form';
import { __ } from '../../../../i18n';
import { useAppContext } from '../../../../hooks';
import { formikDataShape } from '../../../../utils/propTypes';

function SaveInBookCheckbox({ fields, formikData, actions }) {
  const { isLoggedIn, customer } = useAppContext();
  const { setFieldValue } = formikData;
  const saveInAddressBook = !!_get(formikData, 'formSectionValues.saveInBook');

  const handleChange = (event) => {
    const isChecked = event?.target?.checked;
    setFieldValue(fields.saveInBook, isChecked);
  };

  if (!isLoggedIn || !customer?.hasAddress) {
    return null;
  }

  return (
    <div className="mt-4">
      <Checkbox
        actions={actions}
        name={fields.saveInBook}
        checked={saveInAddressBook}
        label={__('Save in address book')}
        onChange={actions?.handleChange || handleChange}
      />
    </div>
  );
}

SaveInBookCheckbox.propTypes = {
  formikData: formikDataShape.isRequired,
  actions: shape({ handleBlur: func }),
  fields: shape({ saveInBook: string }).isRequired,
};

SaveInBookCheckbox.defaultProps = {
  actions: {},
};

export default SaveInBookCheckbox;
