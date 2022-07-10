import HTTPTransport from '../core/HttpTransport';
import {
  PasswordRequest, ProfileRequest, SearchUserRequest, CommonResponse, ProfileResponse,
} from './types';

export class UserApi {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('/user');
  }

  changeProfileData(data: ProfileRequest) {
    return this.httpTransport.put<ProfileRequest, ProfileResponse>('/profile', data);
  }

  changeAvatar(data: FormData) {
    return this.httpTransport.put<FormData, ProfileResponse>('/profile/avatar', data, { headers: { 'Access-Control-Allow-Origin': '*', accept: 'application/json' } });
  }

  changePassword(data: PasswordRequest) {
    return this.httpTransport.put<PasswordRequest, CommonResponse>('/password', data);
  }

  searchUser(data: SearchUserRequest) {
    return this.httpTransport.post<SearchUserRequest, ProfileResponse>('/search', data);
  }
}
