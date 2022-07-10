import './feed.css';
import { Block } from '../../core';
import { errorInField } from '../../utils';
import store, { Indexed } from '../../core/store';
import chatsController from '../../controllers/ChatsController';
import { Chat } from '../../api/types';

export class Feed extends Block {
  constructor(props?: Indexed) {
    const events = {
      children: {
        messageForm: {
          submit: (e: Event) => {
            e.preventDefault();
            const input = (this.getContent().querySelector('#messageText') as HTMLInputElement);
            const messageText = input.value;
            input.value = '';
            if (!errorInField('message', messageText)) {
              chatsController.sendMessage(messageText);
            }
          },
        },
      },
    };

    super(props, events);
  }

  componentWillUnmount() {
    store.unsubscribe('Feed');
  }

  protected render(): string {
    const { chats, currentChatId } = store.getState();

    if (!currentChatId) {
      return '<div></div>';
    }

    const chat = chats.find((el: Chat) => el.id === currentChatId);

    return `
             <div style="width: 100%; display: flex;">
                <div class="feed">
                <div class="feed__feed-panel">
                    <div class="chat-info">
                        <div class="avatar-placeholder"></div>
                        <h3 class="chat-name">${chat.title}</h3>
                    </div>
                </div>
                <div class="messages-wrapper">
                   {{{MessageList}}}
                </div>
                <form autocomplete="off" data-append-event="messageForm" class="message-form" name="message-form">
                    <input autocomplete="false" id="messageText" class="message-form__message-input" oninput="this.parentNode.dataset.value = this.value" name="message" form="message-form" placeholder="Сообщение"/>
                    <button class="icon-button icon-button_arrow-right" type="submit"></button>
                </form>
                </div>
                {{{Users}}}
            </div>
    `;
  }
}
