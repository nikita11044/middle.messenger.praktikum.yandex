import { Block } from '../../core';
import { errorInField } from '../../utils';
import { Store } from '../../store';
import UserDataElement from '../../components/user-data-element';

interface ChangePasswordProps {
  events?: { children?: Record<string, Record<string, (e: SubmitEvent) => void>> }
}

export class ChangePassword extends Block<ChangePasswordProps> {
  constructor() {
    super({
      events: {
        children:
          {
            changePasswordForm: {
              submit: (e: SubmitEvent) => {
                e.preventDefault();
                let hasEmptyFields;
                let hasErrors;

                const changePasswordData: Record<string, string> = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                  acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
                  return acc;
                }, {} as any);

                Object.entries(changePasswordData).forEach(([field, value]) => {
                  if (value === '') {
                    hasEmptyFields = true;
                    this.refs[field].getContent().classList.add('empty-field');
                  }
                  if (errorInField('password', value)) {
                    hasErrors = true;
                  }
                });

                if (hasEmptyFields || hasErrors) {
                  return;
                }

                const passwordsDontMatch = changePasswordData.confirmPassword !== changePasswordData.newPassword;

                if (passwordsDontMatch) {
                  (this.refs.confirmPassword as UserDataElement).showError('Пароли не совпадают');
                  (this.refs.newPassword as UserDataElement).showError('Пароли не совпадают');
                  return;
                }

                const oldPasswordEqualsNew = Store.getAppState().password === changePasswordData.newPassword;

                if (oldPasswordEqualsNew) {
                  (this.refs.confirmPassword as UserDataElement).showError('Новый пароль совпадает со старым');
                  (this.refs.newPassword as UserDataElement).showError('Новый пароль совпадает со старым');
                  return;
                }

                console.log('change profile data', changePasswordData);
              },
            },
          },
      },
    });
  }

  protected render(): string {
    return `
      <main>
    <div class="profile">
        <div class="return-button-wrapper">
            {{{Link classes="return-button" to="STEP_BACK"}}}
        </div>
        <div class="profile-data">
            <div class="avatar">
                {{{Avatar}}}
            </div>
            <form data-append-event="changePasswordForm" class="profile-data__user-data" form="change_password">
                    {{{UserDataElement
                        formValue="oldPassword"
                        customValidationOption="password"
                        label="Старый пароль"
                        inputType="password"
                        ref="oldPassword"
                        isFormField="true"}}}
                    {{{UserDataElement
                        formValue="newPassword"
                        customValidationOption="password"
                        label="Новый пароль"
                        inputType="password"
                        ref="newPassword"
                        isFormField="true"}}}
                    {{{UserDataElement
                        formValue="confirmPassword"
                        customValidationOption="password"
                        label="Повторите новый пароль"
                        inputType="password"
                        ref="confirmPassword"
                        isFormField="true"}}}
                <div class="profile-data__control-panel profile-data__control-panel_inside-form">
                    {{{Button title="Сохранить" type="submit"}}}
                </div>
            </form>
        </div>
    </div>
</main>
    `;
  }
}
