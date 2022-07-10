import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import { MessageList } from './messageList';

const connectedMessageList = connect((state: Indexed) => ({ messages: state.messages ? { ...state.messages } : {} }))(MessageList);
export default connectedMessageList;
