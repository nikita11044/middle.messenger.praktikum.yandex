import { Block } from '../../core';
import { Store } from '../../store';
import { errorInField, getComponentsLayoutFromArray } from '../../utils';

interface ChangeProfileDataProps {
  events?: { children?: Record<string, Record<string, (e: SubmitEvent) => void>> }
}

export class ChangeProfileData extends Block<ChangeProfileDataProps> {
  constructor() {
    super({
      events: {
        children:
          {
            changeProfileDataForm: {
              submit: (e: SubmitEvent) => {
                e.preventDefault();
                let hasEmptyFields;
                let hasErrors;

                const changeProfileData: Record<string, string> = Object.entries(this.refs).reduce((acc, [fieldName, ref]) => {
                  acc[fieldName] = (ref.getContent().querySelector('input') as HTMLInputElement).value;
                  return acc;
                }, {} as any);

                Object.entries(changeProfileData).forEach(([field, value]) => {
                  if (value === '') {
                    hasEmptyFields = true;
                    this.refs[field].getContent().classList.add('empty-field');
                  }
                  if (errorInField(field, value)) {
                    hasErrors = true;
                  }
                });

                const dataChanged = Store.getAppState().userProfileDataElements.some((el) => el.elementValue !== changeProfileData[el.formValue]);

                if (hasEmptyFields || hasErrors) {
                  return;
                }

                if (dataChanged) {
                  console.log('change profile data', changeProfileData);
                }
              },
            },
          },
      },
    });
  }

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
            <form data-append-event="changeProfileDataForm" class="profile-data__user-data" form="user_data">
                ${userDataElements}
                <div class="profile-data__control-panel profile-data__control-panel_inside-form">
                    {{{Button title="Сохранить" type="submit"}}}
                </div>
            </form>
        </div>
    </div>
</main>
`;
  }
}