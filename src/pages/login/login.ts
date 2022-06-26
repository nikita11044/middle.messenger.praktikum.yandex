import { Block } from '../../core';
import { errorInField } from '../../utils';

interface LoginPageProps {
  events: { children?: Record<string, Record<string, (e: SubmitEvent) => void>> }
}

export class LoginPage extends Block<LoginPageProps> {
  constructor() {
    super({
      events: {
        children:
          {
            loginForm: {
              submit: (e: SubmitEvent) => {
                e.preventDefault();

                let hasEmptyFields;
                let hasErrors;

                const loginData: Record<string, string> = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                  acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
                  return acc;
                }, {} as any);

                Object.entries(loginData).forEach(([field, value]) => {
                  if (value === '') {
                    hasEmptyFields = true;
                    this.refs[field].getContent().classList.add('access__field_is-empty');
                  }
                  if (errorInField(field, value)) {
                    hasErrors = true;
                  }
                });

                if (hasEmptyFields || hasErrors) {
                  return;
                }

                console.log('sign in', loginData);
              },
            },
          },
      },
    });
  }

  protected render(): string {
    return `
    <main>
        <div class="access sign-in">
            <h3 class="access__header">Вход</h3>
            <form data-append-event="loginForm" class="access__form" name="sign_in">
                <div class="access__fieldset">
                    {{{AccessFormField label="Логин" ref="login" 
                    formValue="login"
                    inputType="text"}}}
                    {{{AccessFormField label="Пароль" ref="password" 
                    formValue="password"
                    inputType="password"}}}
                </div>
                <div class="access__buttons-block">
                    {{{Button classes="access__button" title="Войти" type="submit"}}}
                    {{{Link classes="access__link" to="/sign-up" text="Нет аккаунта?"}}}
                </div>
            </form>
        </div>
    </main>
    `;
  }
}
