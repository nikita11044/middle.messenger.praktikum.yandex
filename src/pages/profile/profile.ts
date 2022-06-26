import { Block } from '../../core';
import { Store } from '../../store';
import { getComponentsLayoutFromArray } from '../../utils';

export class ProfilePage extends Block {
  protected render(): string {
    const userDataElements = getComponentsLayoutFromArray('UserDataElement', Store.getAppState().userProfileDataElements);

    return `
<main>
    <div class="profile">
        <div class="return-button-wrapper">
            {{{Link classes="return-button" to="STEP_BACK"}}}
        </div>
        <div class="profile-data">
            <form class="avatar" name="change_avatar">
                {{{Avatar}}}
                <button class="avatar-form__submit" form="change_avatar">Поменять аватар</button>
                <input class="avatar-form__input" type="file" name="avatar"/>
            </form>
            <h2 class="profile-data__user-name">Иван</h2>
            <div class="profile-data__user-data">
               ${userDataElements}
            </div>
            <div class="profile-data__control-panel">
                {{{Link classes="control-panel__link" to="CHANGE_PROFILE_DATA" text="Изменить данные"}}}
                {{{Link classes="control-panel__link" to="CHANGE_PASSWORD" text="Изменить пароль"}}}
                {{{Link classes="control-panel__link control-panel__link_red-text" to="SIGN_IN" text="Выйти"}}}
            </div>
        </div>
    </div>
</main>
    `;
  }
}
