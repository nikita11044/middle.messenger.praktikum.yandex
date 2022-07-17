import connect from '../../core/connect';
import { Indexed } from '../../core/store';
import { Feed } from './feed';

const connectedFeed = connect((state: Indexed) => ({
  currentChatId: state.currentChatId || null,
}), 'Feed')(Feed);
export default connectedFeed;
