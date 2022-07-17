import HTTPTransport from '../core/HttpTransport';
import {
  LoginRequest, SignUpRequest, UserResponse, CommonResponse,
} from './types';

export default class AuthApi {
  protected httpTransport: HTTPTransport;

  constructor() {
    this.httpTransport = new HTTPTransport('/auth');
  }

  signUp(data: SignUpRequest) {
    return this.httpTransport.post<SignUpRequest, { id: string }>('/signup', data);
  }

  login(data: LoginRequest) {
    return this.httpTransport.post<LoginRequest, CommonResponse>('/signin', data);
  }

  logout() {
    return this.httpTransport.post<{}, string>('/logout');
  }

  getCurrentUserInfo(): Promise<XMLHttpRequest> {
    return this.httpTransport.get<{}, UserResponse>('/user');
  }
}
