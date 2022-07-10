import Router from '../core/Router';
import store from '../core/store';
import { LoginRequest, SignUpRequest } from '../api/types';
import { AuthApi } from '../api';

class AuthController {
  private authApi: AuthApi;

  constructor() {
    this.authApi = new AuthApi();
  }

  async isAuth() {
    try {
      const state = store.getState();

      if (state.currentUser) {
        return true;
      }

      const currentUserResponse = await this.authApi.getCurrentUserInfo();

      if (currentUserResponse.status === 400) {
        return true;
      }

      if (currentUserResponse.status !== 200) {
        throw new Error(currentUserResponse.response.reason);
      }

      store.set('currentUser', currentUserResponse.response);

      return true;
    } catch (error) {
      return false;
    }
  }

  async signUp(data: SignUpRequest) {
    const signUpRequest = await this.authApi.signUp(data);

    if (signUpRequest.status === 200) {
      const router = new Router();
      router.go('/messenger');
    }
  }

  async login(data: LoginRequest) {
    const loginRequest = await this.authApi.login(data);

    if (loginRequest.status === 200) {
      const router = new Router();
      router.go('/messenger');
    } else {
      throw new Error(loginRequest.response.reason);
    }
  }

  async logout() {
    const xhrHttpRequest = await this.authApi.logout();

    if (xhrHttpRequest.status === 200) {
      store.set('currentUser', null);
      const router = new Router();
      router.go('/');
    } else {
      throw new Error(xhrHttpRequest.response.reason);
    }
  }
}

const authController = new AuthController();
export default authController;
