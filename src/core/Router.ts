import SignUpPage from '../pages/signUp';
import { renderDOM } from './index';
import ChatsPage from '../pages/chats';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import ChangeProfileData from '../pages/changeProfileData';
import ChangePassword from '../pages/changePassword';
import Error500Page from '../pages/500';
import Error404Page from '../pages/404';

export default class Router {
  static ROUTES: Record<string, any> = {
    SIGN_IN: LoginPage,
    SIGN_UP: SignUpPage,
    CHATS: ChatsPage,
    PROFILE: ProfilePage,
    CHANGE_PROFILE_DATA: ChangeProfileData,
    CHANGE_PASSWORD: ChangePassword,
    ERROR_404: Error404Page,
    ERROR_500: Error500Page,
  } as const;

  private static _path: Array<string> = [];

  public static navigate(to: string | 'STEP_BACK') {
    if (to === 'STEP_BACK') {
      this._path.pop();
      const prev = (this._path.length > 1 ? this._path[this._path.length - 1] : this._path[0]) as string;
      renderDOM(new Router.ROUTES[prev]());
    } else {
      this._path.push(to);
      renderDOM(new Router.ROUTES[to]());
    }
  }
}
