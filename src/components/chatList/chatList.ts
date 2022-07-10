import './chatList.css';
import { Block } from '../../core';
import store from '../../core/store';
import chatsController from '../../controllers/ChatsController';
import { Chat } from '../../api/types';

export class ChatList extends Block {
  async preInit() {
    if (!store.getState().chats) {
      await chatsController.getChats();
    }
  }

  componentWillUnmount() {
    store.unsubscribe('ChatList');
  }

  protected render(): string {
    const { chats } = this.props;

    return `
            <div>
                <ul class="chats-list">
                    ${chats?.length > 0 ? this.props.chats.reduce((acc: string, chat: Chat) => `${acc}{{{Chat title="${chat.title}" id=${chat.id}}}}`, '') : ''}
                </ul>
            </div>
    `;
  }
}
