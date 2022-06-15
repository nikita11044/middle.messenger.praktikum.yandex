import { Block } from '../../core';
import './userDataElement.css';
import { errorInField } from '../../utils';

interface UserDataElementProps {
  isFormField: boolean;
  label: string;
  formValue: string;
  inputType: InputTypeAttribute;
  placeholder?: string;
  elementValue?: string;
}

export class UserDataElement extends Block {
  constructor({
    isFormField, label, elementValue, formValue, placeholder, inputType,
  }: UserDataElementProps) {
    const events = isFormField
      ? {
        children: {
          formField: {
            focus: () => {
              this.getContent().classList.remove('empty-field');
              Object.values(this.children)[0].setProps({ error: '' });
            },
            blur: (e: FocusEvent) => {
              const targetInput = e.target as HTMLInputElement;
              if (targetInput.value !== '') {
                Object.values(this.children)[0].setProps({ error: errorInField(formValue, targetInput.value) });
              }
            },
          },
        },
      }
      : {};

    super({
      isFormField, label, elementValue, formValue, placeholder, inputType, events,
    });
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
            {{{ErrorText}}}  
        {{else}}
                <div class="user-data-element__name">{{label}}</div>
                <div class="user-data-element__value">{{elementValue}}</div>
        {{/if}}          
      </div>
    `;
  }
}
