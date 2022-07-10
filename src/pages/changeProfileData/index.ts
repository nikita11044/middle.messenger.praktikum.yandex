import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import { ChangeProfileData } from './changeProfileData';

const connectedChangeProfileDataPage = connect((state: Indexed) => ({ ...state.currentUser }))(ChangeProfileData);
export default connectedChangeProfileDataPage;
