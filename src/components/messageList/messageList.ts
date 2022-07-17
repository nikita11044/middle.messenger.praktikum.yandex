import { Block } from '../../core';
import store from '../../core/store';
import chatsController from '../../controllers/ChatsController';
import { Message } from '../../api/types';

export class MessageList extends Block {
  async preInit() {
    try {
      await chatsController.getChatToken();
      await chatsController.initChat();
    } catch (error) {
      alert(error);
    }
  }

  componentWillUnmount() {
    store.unsubscribe('MessageList');
  }

  protected render(): string {
    const { currentChatId, currentUser } = store.getState();
    const messages = this.props.messages[currentChatId];

    if (!messages) {
      return '<ul></ul>';
    }

    return `
      <ul class="message-list">
         ${messages.reduce((acc: string, message: Message) => `${acc}{{{Message destination="${message.user_id === currentUser.id ? 'from' : 'to'}" text="${message.content}"}}}`, '')}
      </ul>
    `;
  }
}
