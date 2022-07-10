import { Block } from '../../core';
import Router from '../../core/Router';
import chatsController from '../../controllers/ChatsController';
import authController from '../../controllers/AuthController';

export class ChatsPage extends Block {
  constructor() {
    const events = {
      children:
        {
          createChatForm: {
            submit: async (e: Event) => {
              e.preventDefault();

              const input = (this.refs.chatName.getContent().querySelector('input') as HTMLInputElement);

              const title = input.value;
              input.value = '';

              if (title === '') {
                this.refs.chatName.getContent().classList.add('form__field_is-empty');
                return;
              }

              try {
                await chatsController.createChat({ title });
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
    if (!authorized) {
      const router = new Router();
      router.go('/');
    } else {
      await chatsController.getChats();
    }
  }

  protected render(): string {
    return `

        <div class="chats">
            <div class="chats__chat-list-wrapper">
            {{{Link classes="profile-button" to="/profile" text="Профиль"}}}
                <div class="search-field">
                    <input class="search-field__input" id="chatName" name="chatName" placeholder=" Поиск" type="text" />
                </div>
                <div class="create-chat">
                        <form class="chat__form" data-append-event="createChatForm">
                            {{{FormField label="Название чата" ref="chatName" formValue="chatName" inputType="text"}}}
                            {{{Button contained="true" title="Создать чат"}}}
                        </form> 
                </div>
                {{{ChatList}}}
            </div>
            {{{Feed}}}
        </div>

    `;
  }
}
