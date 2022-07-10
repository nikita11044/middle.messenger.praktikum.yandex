import { Block } from '../../core';
import store, { Indexed } from '../../core/store';
import chatsController from '../../controllers/ChatsController';
import { ChatUser } from '../../api/types';
import './users.css';

export class Users extends Block {
  constructor(props?: Indexed) {
    const events = {
      children: {
        addUserForm: {
          submit: async (e: Event) => {
            e.preventDefault();

            const input = (this.refs.userToAdd.getContent().querySelector('input') as HTMLInputElement);

            const login = input.value;
            input.value = '';

            if (login === '') {
              this.refs.chatName.getContent().classList.add('form__field_is-empty');
              return;
            }

            try {
              await chatsController.addUserByLogin({ login }, store.getState().currentChatId);
            } catch (err) {
              alert(err);
            }
          },
        },
      },
    };

    super({
      ...props,
      deleteChat: async (e: Event) => {
        e.preventDefault();
        try {
          await chatsController.deleteChat({ chatId: store.getState().currentChatId });
        } catch (error) {
          alert(error);
        }
      },
    }, events);
  }

  componentWillUnmount() {
    store.unsubscribe('Users');
  }

  protected render(): string {
    const { users, isAdmin } = this.props;

    return `
            <div class="users">
              <h3 class="users__title">Пользователи</h3>
              <ul class="users__users-list">
                ${users.reduce((acc: string, user: ChatUser) => `
                  ${acc}{{{UserLabel login="${user.login}" id=${user.id} isAdmin=${user.role === 'admin'}}}}
                `, '')}
              </ul>
              <form class="chat__form" data-append-event="addUserForm">
                {{{FormField label="Логин" ref="userToAdd" inputType="text"}}}
                {{{Button contained="true" title="Добавить пользователя"}}}
              </form>
              ${isAdmin ? '{{{Button classes="delete-chat" contained="true" title="Удалить чат" onClick=deleteChat}}}' : ''}
            </div>
`;
  }
}
