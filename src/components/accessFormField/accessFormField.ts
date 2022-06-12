import { Block } from '../../core';
import './accessFormField.css';

interface AccessFormFieldProps {
  value?: string;
  formValue: string;
  label: string;
  error?: string;
  inputType: InputTypeAttribute;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class AccessFormField extends Block {
  constructor({
    formValue, value = '', label, error, inputType, onFocus, onBlur,
  }: AccessFormFieldProps) {
    super({
      formValue,
      value,
      label,
      error,
      inputType,
      events: { children: { fieldInput: { focus: onFocus, blur: onBlur } } },
    });
  }

  protected render(): string {
    return `
      <div class="access__field">
        <label class="access__label" for="{{formValue}}">{{label}}</label>
        <input class="access__input" data-append-event="fieldInput" 
        name="{{formValue}}" value="{{value}}" type="{{inputType}}" />
        <div style="margin-top: 10px">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `;
  }
}
