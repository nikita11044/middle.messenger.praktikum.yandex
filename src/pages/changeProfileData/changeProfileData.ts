import { Block } from '../../core';
import { errorInField } from '../../utils';
import store, { Indexed } from '../../core/store';
import HTTPTransport from '../../core/HttpTransport';
import Router from '../../core/Router';
import profileController from '../../controllers/ProfileController';
import { ProfileRequest } from '../../api/types';
import authController from '../../controllers/AuthController';

export class ChangeProfileData extends Block {
  constructor(props?: Indexed) {
    const events = {
      children:
      {
        changeProfileDataForm: {
          submit: async (e: Event) => {
            e.preventDefault();

            let hasEmptyFields;
            let hasErrors;

            const changeProfileData: ProfileRequest = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
              acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
              return acc;
            }, {} as any);

            Object.entries(changeProfileData).forEach(([field, value]) => {
              if (value === '' && field !== 'display_name') {
                hasEmptyFields = true;
                this.refs[field].getContent().classList.add('empty-field');
              }
              if (errorInField(field, value)) {
                hasErrors = true;
              }
            });

            const dataChanged = Object.entries(changeProfileData).some(([key, val]) => store.getState().currentUser[key] !== val);

            if (hasEmptyFields || hasErrors) {
              return;
            }

            if (dataChanged) {
              try {
                await profileController.changeProfileData(changeProfileData);
              } catch (error) {
                alert(error);
              }
            }
          },
        },
        changeAvatarButton: {
          click: () => {
            document.getElementById('change-avatar-modal')!.style.display = 'block';
          },
        },
        avatarModalWrapper: {
          click: (e: Event) => {
            const modal = document.getElementById('change-avatar-modal');
            if (e.target === modal) modal!.style.display = 'none';
          },
        },
        avatarForm: {
          submit: async (e: Event) => {
            e.preventDefault();
            const avatarInput = (document.getElementById('avatar-input')) as HTMLInputElement;
            const avatarForm = (document.getElementById('avatar-form')) as HTMLFormElement;
            if (avatarInput.files!.length > 0) {
              const formData = new FormData(avatarForm);
              try {
                await profileController.changeAvatar(formData);
              } catch (error) {
                alert(error);
              }
            }
          },
        },
      },
    };

    super(props, events);
  }

  async preInit() {
    const authorized = await authController.isAuth();
    if (!authorized) {
      const router = new Router();
      router.go('/');
    }
  }

  componentWillUnmount() {
    store.unsubscribe('ChangeProfileData');
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
                ${this.props.avatar ? `<img class="avatar-image" alt="avatar" src="${HTTPTransport.MAIN_URL}/resources${this.props.avatar}"/>` : '<div class="avatar-image avatar-image_placeholder"></div>'}
                <button data-append-event="changeAvatarButton" class="avatar-form__submit" form="change_avatar">Поменять аватар</button>
            </div>
            <form data-append-event="changeProfileDataForm" class="profile-data__user-data" form="user_data">
                {{{UserDataElement elementValue=first_name formValue="first_name" ref="first_name" label="Имя" inputType="text" isFormField="true"}}}
                {{{UserDataElement elementValue=second_name formValue="second_name" ref="second_name" label="Фамилия" inputType="text" isFormField="true"}}}
                {{{UserDataElement elementValue=display_name formValue="display_name" ref="display_name" label="Имя в чате" inputType="text" isFormField="true"}}}
                {{{UserDataElement elementValue=login formValue="login" ref="login" label="Логин" inputType="text" isFormField="true"}}}
                {{{UserDataElement elementValue=email formValue="email" ref="email" label="Почта" inputType="email" isFormField="true"}}}
                {{{UserDataElement elementValue=phone formValue="phone" ref="phone" label="Телефон" inputType="phone" isFormField="true"}}}
                <div class="profile-data__control-panel profile-data__control-panel_inside-form">
                    {{{Button contained="true" title="Сохранить"}}}
                </div>
            </form>
             <div id="change-avatar-modal" data-append-event="avatarModalWrapper">
                <div class="modal-content">
                    <form id="avatar-form" class="modal-content__form" data-append-event="avatarForm">
                        <h2>Загрузите файл</h2>
                        <input id="avatar-input" name="avatar" data-append-event="avatarInput" type="file" class="avatar-input" accept="image/*">
                      <div class="modal-content__control">
                        {{{Button contained="true" title="Поменять"}}}
                       </div>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</main>
`;
  }
}
