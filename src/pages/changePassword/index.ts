import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import { ChangePassword } from './changePassword';

const connectedChangePasswordPage = connect((state: Indexed) => ({ ...state.currentUser }))(ChangePassword);
export default connectedChangePasswordPage;
