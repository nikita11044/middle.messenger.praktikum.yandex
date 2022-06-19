import { Block } from '../../core';
import './accessFormField.css';
import { errorInField } from '../../utils';

interface AccessFormFieldProps {
  value?: string;
  formValue: string;
  customValidationOption?: string;
  label: string;
  inputType: InputTypeAttribute;
  error?: string;
  events?: { children?: Record<string, Record<string, (e: FocusEvent) => void>> }
}

export class AccessFormField extends Block<AccessFormFieldProps> {
  constructor(props: AccessFormFieldProps) {
    super({
      ...props,
      events: {
        children:
          {
            fieldInput: {
              focus: () => {
                this.getContent().classList.remove('access__field_is-empty');
                this.refs.errorText.setProps({ error: '' });
              },
              blur: (e: FocusEvent) => {
                const targetInput = e.target as HTMLInputElement;
                if (targetInput.value !== '') {
                  this.refs.errorText.setProps({ error: errorInField(props.customValidationOption || props.formValue, targetInput.value) });
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
        {{{ErrorText ref="errorText"}}}
      </div>
    `;
  }
}
