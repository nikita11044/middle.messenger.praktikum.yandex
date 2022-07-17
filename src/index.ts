import { inscribeComponent } from './core';
import Button from './components/button';
import Link from './components/link';
import Chat from './components/chat';
import Message from './components/message';
import UserDataElement from './components/userDataElement';
import ErrorText from './components/errorText';
import LoginPage from './pages/login';
import Error500Page from './pages/500';
import SignUpPage from './pages/signUp';
import Router from './core/Router';
import connectedProfilePage from './pages/profile';
import connectedChangeProfileDataPage from './pages/changeProfileData';
import connectedChangePasswordPage from './pages/changePassword';
import Error404Page from './pages/404';
import Error from './components/error';
import FormField from './components/formField';
import connectedChatsList from './components/chatList';
import ChatsPage from './pages/chats';
import connectedFeed from './components/feed';
import connectedUsers from './components/users';
import UserLabel from './components/userLabel';
import connectedMessageList from './components/messageList';

inscribeComponent(Button, 'Button');
inscribeComponent(Link, 'Link');
inscribeComponent(FormField, 'FormField');
inscribeComponent(ErrorText, 'ErrorText');
inscribeComponent(Chat, 'Chat');
inscribeComponent(Error, 'Error');
inscribeComponent(Message, 'Message');
inscribeComponent(UserDataElement, 'UserDataElement');
inscribeComponent(connectedChatsList, 'ChatList');
inscribeComponent(connectedFeed, 'Feed');
inscribeComponent(connectedUsers, 'Users');
inscribeComponent(UserLabel, 'UserLabel');
inscribeComponent(connectedMessageList, 'MessageList');

const router = new Router('#app');

router
  .use('/', LoginPage)
  .use('/sign-up', SignUpPage)
  .use('/messenger', ChatsPage)
  .use('/profile', connectedProfilePage)
  .use('/settings', connectedChangeProfileDataPage)
  .use('/change-password', connectedChangePasswordPage)
  .use('/server-error', Error500Page)
  .use('*', Error404Page)
  .start();
