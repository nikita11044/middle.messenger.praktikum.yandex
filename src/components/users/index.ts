import { Users } from './users';
import connect from '../../core/connect';
import { Indexed } from '../../core/store';

const connectedUsers = connect(
  (state: Indexed) => ({ users: state.users ? [...state.users] : [], isAdmin: state.isAdmin }),
)(Users);
export default connectedUsers;
