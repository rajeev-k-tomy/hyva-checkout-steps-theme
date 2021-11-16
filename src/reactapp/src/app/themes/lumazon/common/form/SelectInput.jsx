/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import _get from 'lodash.get';
import { ErrorMessage, Field } from 'formik';
import { arrayOf, bool, func, shape, string } from 'prop-types';

import { __ } from '../../../../i18n';
import { classNames, _replace } from '../../../../utils';
import { formikDataShape } from '../../../../utils/propTypes';

function SelectInput({
  id,
  name,
  label,
  options,
  actions,
  required,
  formikData,
  placeholder,
}) {
  const {
    setFieldValue,
    formSectionId,
    setFieldTouched,
    formSectionErrors,
    formSectionTouched,
  } = formikData;
  const inputId = id || name;
  const relativeFieldName = _replace(name, formSectionId).replace('.', '');
  const hasFieldError = !!_get(formSectionErrors, relativeFieldName);
  const hasFieldTouched = !!_get(formSectionTouched, relativeFieldName);
  const hasError = hasFieldError && hasFieldTouched;
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={classNames(
          hasError ? 'text-red-600' : 'text-gray-700',
          'text-sm font-medium block'
        )}
      >
        <span>{label}</span>
        {required && <sup className="pl-1 text-red-600 -top-1">*</sup>}
      </label>
      <Field
        as="select"
        id={id}
        name={name}
        className={classNames(
          hasError
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500',
          'block w-full py-2 pl-3 pr-10 mt-1 text-base rounded-md sm:text-sm'
        )}
        onChange={(event) => {
          const newValue = event.target.value;
          setFieldTouched(name, newValue);
          setFieldValue(name, newValue);
          if (actions?.change) {
            actions.change(event);
          }
        }}
      >
        <option value="">{placeholder || __('Choose your option')}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      {hasError && (
        <p className="mt-2 text-sm text-red-600" id={`${inputId}-error`}>
          <ErrorMessage name={name}>
            {(msg) => msg.replace('%1', label)}
          </ErrorMessage>
        </p>
      )}
    </div>
  );
}

SelectInput.propTypes = {
  id: string,
  actions: shape({ change: func }),
  required: bool,
  placeholder: string,
  name: string.isRequired,
  label: string.isRequired,
  formikData: formikDataShape.isRequired,
  options: arrayOf(
    shape({
      value: string,
      options: string,
    })
  ),
};

SelectInput.defaultProps = {
  id: '',
  options: [],
  required: false,
  actions: {},
  placeholder: '',
};

export default SelectInput;
