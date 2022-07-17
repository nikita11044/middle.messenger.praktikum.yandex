import { Block } from '../../core';
import store, { Indexed } from '../../core/store';
import HTTPTransport from '../../core/HttpTransport';
import Router from '../../core/Router';
import authController from '../../controllers/AuthController';
import '../styles/common.scss';
import '../styles/profile.scss';

export default class ProfilePage extends Block {
  constructor(props?: Indexed) {
    super({
      ...props,
      click: async () => {
        try {
          await authController.logout();
        } catch (err) {
          alert(err);
        }
      },
    });
  }

  async preInit() {
    const authorized = await authController.isAuth();
    if (!authorized) {
      const router = new Router();
      router.go('/');
    }
  }

  componentWillUnmount() {
    store.unsubscribe('ProfilePage');
  }

  protected render(): string {
    return `
    <div class="profile">
        <div class="return-button-wrapper">
            {{{Link classes="return-button" to="/messenger"}}}
        </div>
        <div class="profile-data">
            <div class="avatar">
                ${this.props.avatar ? `<img class="avatar-image" alt="avatar" src="${HTTPTransport.MAIN_URL}/resources${this.props.avatar}"/>` : '<div class="avatar-image avatar-image_placeholder"></div>'}
            </div>
            <h2 class="profile-data__user-name">${this.props.first_name}</h2>
            <div class="profile-data__user-data">
               {{{UserDataElement elementValue=login formValue="login" ref="login" label="Логин" inputType="text"}}}
               {{{UserDataElement elementValue=first_name formValue="first_name" ref="first_name" label="Имя" inputType="text"}}}
               {{{UserDataElement elementValue=second_name formValue="second_name" ref="second_name" label="Фамилия" inputType="text"}}}
               {{{UserDataElement elementValue=display_name formValue="display_name" ref="display_name" label="Имя в чате" inputType="text"}}}
               {{{UserDataElement elementValue=email formValue="email" ref="email" label="Почта" inputType="email"}}}
               {{{UserDataElement elementValue=phone formValue="phone" ref="phone" label="Телефон" inputType="phone"}}}
            </div>
            <div class="profile-data__control-panel">
                {{{Link classes="control-panel__element" to="/settings" text="Изменить данные"}}}
                {{{Link classes="control-panel__element" to="/change-password" text="Изменить пароль"}}}
                {{{Button classes="control-panel__element control-panel__element_logout" title="Выйти" onClick=click}}}
            </div>
        </div>
    </div>
    `;
  }
}
