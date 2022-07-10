import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import { ChatList } from './chatList';

const connectedChatsList = connect((state: Indexed) => ({ chats: state.chats ? state.chats : [] }))(ChatList);
export default connectedChatsList;
