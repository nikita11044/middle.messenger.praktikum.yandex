import { Block } from '../../core';

export class ChangePassword extends Block {
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
            <form class="profile-data__user-data" form="change_password">
                    {{{UserDataElement
                        elementValue="supersecretpassword"
                        formValue="oldPassword"
                        label="Старый пароль"
                        inputType="password"
                        isFormField="true"}}}
                    {{{UserDataElement
                        formValue="newPassword"
                        label="Новый пароль"
                        inputType="password"
                        isFormField="true"}}}
                    {{{UserDataElement
                        formValue="confirmPassword"
                        label="Повторите новый пароль"
                        inputType="password"
                        isFormField="true"}}}
                <div class="profile-data__control-panel profile-data__control-panel_inside-form">
                    {{{Button title="Сохранить" form="change_password" type="submit"}}}
                </div>
            </form>
        </div>
    </div>
</main>
    `;
  }
}
