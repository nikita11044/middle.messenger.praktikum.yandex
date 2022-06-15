import { Block } from '../../core';
import './userDataElement.css';
import { errorInField } from '../../utils';

interface UserDataElementProps {
  isFormField: boolean;
  label: string;
  formValue: string;
  customValidationOption?: string;
  inputType: InputTypeAttribute;
  placeholder?: string;
  elementValue?: string;
}

export class UserDataElement extends Block {
  constructor({
    isFormField, label, elementValue, customValidationOption, formValue, placeholder, inputType,
  }: UserDataElementProps) {
    const events = isFormField
      ? {
        children: {
          formField: {
            focus: () => {
              this.getContent().classList.remove('empty-field');
              this.refs.errorText.setProps({ error: '' });
            },
            blur: (e: FocusEvent) => {
              const targetInput = e.target as HTMLInputElement;
              if (targetInput.value !== '') {
                this.refs.errorText.setProps({ error: errorInField(customValidationOption || formValue, targetInput.value) });
              }
            },
          },
        },
      }
      : {};

    super({
      isFormField, label, elementValue, customValidationOption, formValue, placeholder, inputType, events,
    });
  }

  showError(error: string): void {
    this.refs.errorText.setProps({ error });
  }

  protected render(): string {
    return `
      <div class="user-data-element {{#if isFormField}}user-data-element_form-field{{/if}}">
        {{#if isFormField}}
            <div class="user-data-element__input-wrapper">
                <label
                    for="{{formValue}}" 
                    class="user-data-element__name">{{label}}</label>
                <input 
                    class="user-data-element__input" 
                    data-data-element-input
                    data-append-event="formField"
                    name="{{formValue}}"
                    type="{{inputType}}"
                    {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
                    {{#if elementValue}} value="{{elementValue}}" {{/if}}/>
            </div>
            {{{ErrorText ref="errorText"}}}  
        {{else}}
                <div class="user-data-element__name">{{label}}</div>
                <div class="user-data-element__value">{{elementValue}}</div>
        {{/if}}          
      </div>
    `;
  }
}
