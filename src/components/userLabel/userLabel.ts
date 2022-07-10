import { Block } from '../../core';
import chatsController from '../../controllers/ChatsController';
import store from '../../core/store';
import './userLabel.css';

interface UserLabelProps {
  id: number;
  login: string;
  isAdmin: boolean;
}

export class UserLabel extends Block<UserLabelProps> {
  constructor(props?: UserLabelProps) {
    const events = {
      children: {
        deleteUser: {
          click: async (e: Event) => {
            e.preventDefault();
            try {
              const { currentChatId } = store.getState();
              await chatsController.deleteUserFromChat(this.props.id, currentChatId);
            } catch (error) {
              alert(error);
            }
          },
        },
      },
    };

    super(props, events);
  }

  protected render(): string {
    return `
     <li class="user-label">
        <p>{{login}} {{#if isAdmin}}(админ){{/if}}</p>
        {{#unless isAdmin}}<button class="user-label__delete-user" data-append-event="deleteUser">Удалить</button>{{/unless}}
     </li>
    `;
  }
}
