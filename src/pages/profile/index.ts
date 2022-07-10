import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import ProfilePage from './profile';

const connectedProfilePage = connect((state: Indexed) => ({ ...state.currentUser }))(ProfilePage);
export default connectedProfilePage;
