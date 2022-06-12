import { Block } from '../../core';
import { Store } from '../../store';
import { getComponentsLayoutFromArray } from '../../utils';

export class ChangeProfileData extends Block {
  protected render(): string {
    const userDataElements = getComponentsLayoutFromArray('UserDataElement', Store.getAppState().userProfileDataElements, 'isFormField="true"');

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
            <form class="profile-data__user-data" form="user_data">
                ${userDataElements}
                <div class="profile-data__control-panel profile-data__control-panel_inside-form">
                    {{{Button title="Сохранить" form="user_data" type="submit"}}}
                </div>
            </form>
        </div>
    </div>
</main>
`;
  }
}
