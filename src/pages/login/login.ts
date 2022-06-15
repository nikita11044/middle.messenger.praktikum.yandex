import { Block } from '../../core';
import { errorInField } from '../../utils';

export class LoginPage extends Block {
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

                const data: Record<string, string> = {
                  login: (this.refs.login.children[1] as HTMLInputElement).value,
                  password: (this.refs.password.children[1] as HTMLInputElement).value,
                };

                Object.entries(data).forEach(([field, value]) => {
                  if (value === '') {
                    hasEmptyFields = true;
                    this.refs[field].classList.add('access__field_is-empty');
                  }
                  if (errorInField(field, value)) {
                    hasErrors = true;
                  }
                });

                if (hasEmptyFields || hasErrors) {
                  return;
                }

                console.log('sign in', data);
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
                    {{{Link classes="access__link" to="SIGN_UP" text="Нет аккаунта?"}}}
                </div>
            </form>
        </div>
    </main>
    `;
  }
}
