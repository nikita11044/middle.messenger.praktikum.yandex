import HTTPTransport from '../core/HttpTransport';
import {
  ChatsResponse, ChatUsersResponse,
  CommonResponse,
  CreateChatRequest,
  DeleteChatRequest, DeleteChatResponse,
  GetChatsRequest, GetChatUsersRequest, UsersRequest,
  TokenResponse,
} from './types';

export class ChatsApi {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('/chats');
  }

  getChats() {
    return this.httpTransport.get<GetChatsRequest, ChatsResponse>('');
  }

  createChat(data: CreateChatRequest) {
    return this.httpTransport.post<CreateChatRequest, CommonResponse>('', data);
  }

  deleteChat(data: DeleteChatRequest) {
    return this.httpTransport.delete<DeleteChatRequest, DeleteChatResponse>('', data);
  }

  getChatUsers(chatId: number) {
    return this.httpTransport.get<GetChatUsersRequest, ChatUsersResponse>(`/${chatId}/users`);
  }

  addUsers(data: UsersRequest) {
    return this.httpTransport.put<UsersRequest, CommonResponse>('/users', data);
  }

  deleteUsers(data: UsersRequest) {
    return this.httpTransport.delete<UsersRequest, CommonResponse>('/users', data);
  }

  getToken(chatId: number) {
    return this.httpTransport.post<{}, TokenResponse>(`/token/${chatId}`, undefined, { headers: { 'Access-Control-Allow-Origin': '*', accept: 'application/json' } });
  }
}
