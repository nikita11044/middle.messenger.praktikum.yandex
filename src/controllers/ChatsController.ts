import store from '../core/store';
import { ChatsApi, UserApi } from '../api';
import HTTPTransport from '../core/HttpTransport';
import {
  ChatUser, CreateChatRequest, DeleteChatRequest, SearchUserRequest,
} from '../api/types';

class ChatsController {
  private chatsApi: ChatsApi;

  private userApi: UserApi;

  constructor() {
    this.chatsApi = new ChatsApi();
    this.userApi = new UserApi();
  }

  async getChats() {
    const getChatsRequest = await this.chatsApi.getChats();

    if (getChatsRequest.status === 200) {
      store.set('chats', getChatsRequest.response);
    } else {
      throw new Error(getChatsRequest.response.reason);
    }
  }

  async createChat(data: CreateChatRequest) {
    const createChatRequest = await this.chatsApi.createChat(data);

    if (createChatRequest.status === 200) {
      await this.getChats();
    } else {
      throw new Error(createChatRequest.response.reason);
    }
  }

  async deleteChat(data: DeleteChatRequest) {
    const deleteChatRequest = await this.chatsApi.deleteChat(data);

    if (deleteChatRequest.status === 200) {
      store.set('currentChatId', null);
      await this.getChats();
    } else {
      throw new Error(deleteChatRequest.response.reason);
    }
  }

  async getChatUsers(chatId: number) {
    const getChatUsersRequest = await this.chatsApi.getChatUsers(chatId);

    if (getChatUsersRequest.status === 200) {
      const { currentUser } = store.getState();
      const isAdmin = getChatUsersRequest.response.find((user: ChatUser) => user.role === 'admin').id === currentUser.id;
      store.set('isAdmin', isAdmin);
      store.set('users', getChatUsersRequest.response);
    } else {
      throw new Error(getChatUsersRequest.response.reason);
    }
  }

  async addUserByLogin(data: SearchUserRequest, chatId: number) {
    const searchUserRequest = await this.userApi.searchUser(data);

    if (searchUserRequest.response.length === 0) {
      throw new Error('No such user');
    }

    const users = [searchUserRequest.response[0].id];

    const addUserRequest = await this.chatsApi.addUsers({ users, chatId });

    if (addUserRequest.status === 200) {
      await this.getChatUsers(chatId);
    } else {
      throw new Error(addUserRequest.response.reason);
    }
  }

  async deleteUserFromChat(userId: number, chatId: number) {
    const deleteUserFromChatRequest = await this.chatsApi.deleteUsers({ users: [userId], chatId });
    if (deleteUserFromChatRequest.status === 200) {
      if (store.getState().currentUser.id === userId) {
        store.set('currentChatId', null);
        await this.getChats();
        return;
      }
      await this.getChatUsers(chatId);
    } else {
      throw new Error(deleteUserFromChatRequest.response.reason);
    }
  }

  async getChatToken() {
    const { currentChatId, chatTokens } = store.getState();

    if (chatTokens && chatTokens[currentChatId]?.token) {
      return;
    }

    const getChatTokenResponse = await this.chatsApi.getToken(currentChatId);

    if (getChatTokenResponse.status === 200) {
      store.set('tokens', { [currentChatId]: getChatTokenResponse.response.token });
    } else {
      throw new Error(getChatTokenResponse.response.reason);
    }
  }

  async initChat() {
    try {
      const {
        currentChatId,
        currentUser,
        tokens,
        sockets,
      } = store.getState();

      if (sockets && Object.prototype.hasOwnProperty.call(sockets, currentChatId)) return;

      const ws = new WebSocket(
        `${HTTPTransport.WS_URL}/chats/${currentUser.id}/${currentChatId}/${tokens[currentChatId]}`,
      );

      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
      });

      ws.addEventListener('message', (event) => {
        const messages = JSON.parse(event.data);

        if (messages.type === 'pong' || messages.type === 'user connected') return;

        store.set(
          `messages.${currentChatId}`,
          Array.isArray(messages)
            ? messages.reverse()
            : store.getState().messages[currentChatId].concat([messages]),
        );
      });

      ws.addEventListener('error', (event) => {
        throw new Error(`ws.addEventListener ERROR: ${event}`);
      });

      setInterval(() => {
        ws.send(JSON.stringify({ type: 'ping' }));
      }, 20000);

      store.set(`sockets.${currentChatId}`, ws);
    } catch (error) {
      alert(error);
    }
  }

  sendMessage(message: string) {
    try {
      const { sockets, currentChatId } = store.getState();

      sockets[currentChatId].send(
        JSON.stringify({
          content: message,
          type: 'message',
        }),
      );
    } catch (error) {
      alert(error);
    }
  }
}

const chatsController = new ChatsController();
export default chatsController;
