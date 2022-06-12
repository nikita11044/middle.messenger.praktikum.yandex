import { Block } from '../../core';

export class SignUpPage extends Block {
  protected render(): string {
    return `
      <main>
  <div class="access sign-up">
    <h3 class="access__header">Регистрация</h3>
    <form class="access__form" name="sign_up">
    <div class="access__fieldset">
        {{{AccessFormField label="Почта" type="email"}}}
        {{{AccessFormField label="Логин" type="text"}}}
        {{{AccessFormField label="Имя" type="text"}}}
        {{{AccessFormField label="Фамилия" type="text"}}}
        {{{AccessFormField label="Телефон" type="phone"}}}
        {{{AccessFormField label="Пароль" type="password"}}}
        {{{AccessFormField label="Пароль (ещё раз)" type="password"}}}
    </div>
    <div class="access__buttons-block">
        {{{Button classes="access__button" title="Зарегистрироваться" form="sign_up" type="submit"}}}
        {{{Link classes="access__link" to="CHATS" text="Войти"}}}
    </div>
</form>
  </div>
</main>
    `;
  }
}
