import { Block } from '../../core';
import './accessFormField.css';
import { errorInField } from '../../utils';

interface AccessFormFieldProps {
  value?: string;
  formValue: string;
  label: string;
  inputType: InputTypeAttribute;
  error?: string;
}

export class AccessFormField extends Block {
  constructor({
    formValue, value = '', label, inputType,
  }: AccessFormFieldProps) {
    super({
      formValue,
      value,
      label,
      inputType,
      events: {
        children:
          {
            fieldInput: {
              focus: () => {
                this.getContent().classList.remove('access__field_is-empty');
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
      },
    });
  }

  protected render(): string {
    return `
      <div class="access__field">
        <label class="access__label" for="{{formValue}}">{{label}}</label>
        <input class="access__input" data-append-event="fieldInput" 
        name="{{formValue}}" value="{{value}}" type="{{inputType}}" />
        {{{ErrorText}}}
      </div>
    `;
  }
}
