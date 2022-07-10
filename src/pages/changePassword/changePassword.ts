import { Block } from '../../core';
import { errorInField } from '../../utils';
import UserDataElement from '../../components/userDataElement';
import profileController from '../../controllers/ProfileController';
import store from '../../core/store';
import authController from '../../controllers/AuthController';
import Router from '../../core/Router';

export class ChangePassword extends Block {
  constructor() {
    const events = {
      children:
        {
          changePasswordForm: {
            submit: async (e: Event) => {
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

              try {
                await profileController.changePassword({ oldPassword: changePasswordData.oldPassword, newPassword: changePasswordData.newPassword });
              } catch (error) {
                alert(error);
              }
            },
          },
        },
    };

    super({}, events);
  }

  async preInit() {
    const authorized = await authController.isAuth();
    if (!authorized) {
      const router = new Router();
      router.go('/');
    }
  }

  componentWillUnmount() {
    store.unsubscribe('ChangePassword');
  }

  protected render(): string {
    return `
      <main>
    <div class="profile">
        <div class="return-button-wrapper">
            {{{Link classes="return-button" to="/profile"}}}
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
                    {{{Button contained="true" title="Сохранить" type="submit"}}}
                </div>
            </form>
        </div>
    </div>
</main>
    `;
  }
}
