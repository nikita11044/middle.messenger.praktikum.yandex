import { Block } from '../core';
import { errorInField } from './errorInField';

export function fieldValidation<T>(changeData: T, refs: { [key: string]: Block }) {
  let hasEmptyFields;
  let hasErrors;

  Object.entries(changeData).forEach(([field, value]) => {
    if (value === '' && field !== 'display_name') {
      hasEmptyFields = true;
      refs[field].getContent().classList.add('empty-field');
    }
    if (errorInField(field, value)) {
      hasErrors = true;
    }
  });

  return [hasEmptyFields, hasErrors];
}
