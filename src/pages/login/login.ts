import { Block } from '../../core';
import { errorInField } from '../../utils';
import Router from '../../core/Router';
import { LoginRequest } from '../../api/types';
import authController from '../../controllers/AuthController';

export class LoginPage extends Block {
  constructor() {
    const events = {
      children:
        {
          loginForm: {
            submit: async (e: Event) => {
              e.preventDefault();

              let hasEmptyFields;
              let hasErrors;

              const loginData: LoginRequest = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
                return acc;
              }, {} as any);

              Object.entries(loginData).forEach(([field, value]) => {
                if (value === '') {
                  hasEmptyFields = true;
                  this.refs[field].getContent().classList.add('form__field_is-empty');
                }
                if (errorInField(field, value)) {
                  hasErrors = true;
                }
              });

              if (hasEmptyFields || hasErrors) {
                return;
              }

              try {
                await authController.login(loginData);
              } catch (err) {
                alert(err);
              }
            },
          },
        },
    };

    super({}, events);
  }

  async preInit() {
    const authorized = await authController.isAuth();
    if (authorized) {
      const router = new Router();
      router.go('/messenger');
    }
  }

  protected render(): string {
    return `
    <main>
        <div class="access sign-in">
            <h3 class="access__header">Вход</h3>
            <form data-append-event="loginForm" class="access__form" name="sign_in">
                <div class="form__fieldset">
                    {{{FormField label="Логин" ref="login" 
                    formValue="login"
                    inputType="text"}}}
                    {{{FormField label="Пароль" ref="password" 
                    formValue="password"
                    inputType="password"}}}
                </div>
                <div class="access__buttons-block">
                    {{{Button classes="access__button" contained="true" title="Войти" type="submit"}}}
                    {{{Link classes="access__link" to="/sign-up" text="Нет аккаунта?"}}}
                </div>
            </form>
        </div>
    </main>
    `;
  }
}
