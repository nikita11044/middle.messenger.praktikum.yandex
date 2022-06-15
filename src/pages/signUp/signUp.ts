import { Block } from '../../core';
import { errorInField } from '../../utils';

export class SignUpPage extends Block {
  constructor() {
    super({
      events: {
        children:
          {
            signUpForm: {
              submit: (e: SubmitEvent) => {
                e.preventDefault();

                let hasEmptyFields;
                let hasErrors;

                const data: Record<string, string> = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                  acc[fieldName] = (ref.children[1] as HTMLInputElement).value;
                  return acc;
                }, {} as any);

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

                console.log('sign up', data);
              },
            },
          },
      },
    });
  }

  protected render(): string {
    return `
      <main>
  <div class="access sign-up">
    <h3 class="access__header">Регистрация</h3>
    <form data-append-event="signUpForm" class="access__form" name="sign_up">
    <div class="access__fieldset">
        {{{AccessFormField label="Почта" formValue="email" ref="email" type="email"}}}
        {{{AccessFormField label="Логин" formValue="login" ref="login" type="text"}}}
        {{{AccessFormField label="Имя" formValue="first_name" ref="first_name" type="text"}}}
        {{{AccessFormField label="Фамилия" formValue="second_name" ref="second_name" type="text"}}}
        {{{AccessFormField label="Телефон" formValue="phone" ref="phone" type="phone"}}}
        {{{AccessFormField label="Пароль" formValue="password" ref="password" type="password"}}}
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
