import store from '../core/store';
import { PasswordRequest, ProfileRequest } from '../api/types';
import { UserApi } from '../api';

class ProfileController {
  private userApi: UserApi;

  constructor() {
    this.userApi = new UserApi();
  }

  async changeProfileData(data: ProfileRequest) {
    const changeProfileDataRequest = await this.userApi.changeProfileData(data);

    if (changeProfileDataRequest.status === 200) {
      store.set('currentUser', changeProfileDataRequest.response);
    } else {
      throw new Error(changeProfileDataRequest.response.reason);
    }
  }

  async changeAvatar(data: FormData) {
    const changeAvatarRequest = await this.userApi.changeAvatar(data);

    if (changeAvatarRequest.status === 200) {
      store.set('currentUser', changeAvatarRequest.response);
    } else {
      throw new Error(changeAvatarRequest.response.reason);
    }
  }

  async changePassword(data: PasswordRequest) {
    const changePasswordRequest = await this.userApi.changePassword(data);

    if (changePasswordRequest.status !== 200) {
      throw new Error(changePasswordRequest.response.reason);
    }
  }
}

const profileController = new ProfileController();
export default profileController;
