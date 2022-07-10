import { Block } from '../../core';
import { errorInField } from '../../utils';
import Router from '../../core/Router';
import { SignUpRequest } from '../../api/types';
import authController from '../../controllers/AuthController';

export class SignUpPage extends Block {
  constructor() {
    const events = {
      children:
        {
          signUpForm: {
            submit: async (e: Event) => {
              e.preventDefault();

              let hasEmptyFields;
              let hasErrors;

              const signUpData: SignUpRequest = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
                return acc;
              }, {} as any);

              Object.entries(signUpData).forEach(([field, value]) => {
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
                await authController.signUp(signUpData);
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
    if (authorized) {
      const router = new Router();
      router.go('/messenger');
    }
  }

  protected render(): string {
    return `
      <main>
  <div class="access sign-up">
    <h3 class="access__header">Регистрация</h3>
    <form data-append-event="signUpForm" class="access__form" name="sign_up">
    <div class="form__fieldset">
        {{{FormField label="Почта" formValue="email" ref="email" type="email"}}}
        {{{FormField label="Логин" formValue="login" ref="login" type="text"}}}
        {{{FormField label="Имя" formValue="first_name" ref="first_name" type="text"}}}
        {{{FormField label="Фамилия" formValue="second_name" ref="second_name" type="text"}}}
        {{{FormField label="Телефон" formValue="phone" ref="phone" type="phone"}}}
        {{{FormField label="Пароль" formValue="password" ref="password" type="password"}}}
    </div>
    <div class="access__buttons-block">
        {{{Button classes="access__button" title="Зарегистрироваться" type="submit"}}}
        {{{Link classes="access__link" to="CHATS" text="Войти"}}}
    </div>
</form>
  </div>
</main>
    `;
  }
}
