import { Block } from '../../core';
import './formField.css';
import { errorInField } from '../../utils';

interface AccessFormFieldProps {
  value?: string;
  formValue: string;
  customValidationOption?: string;
  label: string;
  inputType: InputTypeAttribute;
  error?: string;
}

export class FormField extends Block<AccessFormFieldProps> {
  constructor(props: AccessFormFieldProps) {
    const events = {
      children:
          {
            fieldInput: {
              focus: () => {
                this.getContent().classList.remove('form__field_is-empty');
                this.refs.errorText.setProps({ error: '' });
              },
              blur: (e: Event) => {
                const targetInput = e.target as HTMLInputElement;
                if (targetInput.value !== '') {
                  this.refs.errorText.setProps({ error: errorInField(props.customValidationOption || props.formValue, targetInput.value) });
                }
              },
            },
          },
    };

    super(props, events);
  }

  protected render(): string {
    return `
      <div class="form__field">
        <label class="access__label" for="{{formValue}}">{{label}}</label>
        <input class="access__input" data-append-event="fieldInput" 
        name="{{formValue}}" value="{{value}}" type="{{inputType}}" />
        {{{ErrorText ref="errorText"}}}
      </div>
    `;
  }
}
