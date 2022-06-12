import { Block } from '../../core';
import './userDataElement.css';

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
    super({
      isFormField, label, elementValue, formValue, placeholder, inputType,
    });
  }

  protected render(): string {
    return `
      <div class="user-data-element">
        {{#if isFormField}}
            <label
                for="{{formValue}}" 
                class="user-data-element__name">{{label}}</label>
            <input 
                class="user-data-element__input" 
                name="{{formValue}}"
                type="{{inputType}}"
                {{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
                {{#if elementValue}} value="{{elementValue}}" {{/if}}/>
                {{else}}
                <div class="user-data-element__name">{{label}}</div>
                <div class="user-data-element__value">{{elementValue}}</div>
                {{/if}}
      </div>
    `;
  }
}
