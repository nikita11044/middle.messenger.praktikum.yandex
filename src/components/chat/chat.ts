import { Block } from '../../core';
import './chat.scss';
import store from '../../core/store';
import chatsController from '../../controllers/ChatsController';

interface ChatProps {
  id: number;
  title: string;
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const events = {
      root: {
        click: async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          await chatsController.getChatUsers(this.props.id);
          store.set('currentChatId', this.props.id);
        },
      },
    };

    super(props, events);
  }

  protected render(): string {
    return `
      <li class="chat">
            <div class="avatar-placeholder"></div>
            <div class="chat-description">
                <div class="chat-description__row">
                <h3 class="chat-name">{{title}}</h3>
            </div>
         </div>
       </li>
    `;
  }
}
