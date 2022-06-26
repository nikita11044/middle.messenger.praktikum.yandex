import { inscribeComponent } from './core';
import Button from './components/button';
import Link from './components/link';
import Chat from './components/chat';
import Error from './components/error';
import Message from './components/message';
import UserDataElement from './components/user-data-element';
import Avatar from './components/avatar';
import AccessFormField from './components/accessFormField';
import Router from './core/routing/Router';
import ErrorText from './components/errorText';
import LoginPage from './pages/login';
import Error500Page from './pages/500';
import Error404Page from './pages/404';
import SignUpPage from './pages/signUp';
import ChatsPage from './pages/chats';
import ProfilePage from './pages/profile';

inscribeComponent(Button, 'Button');
inscribeComponent(Link, 'Link');
inscribeComponent(AccessFormField, 'AccessFormField');
inscribeComponent(ErrorText, 'ErrorText');
inscribeComponent(Chat, 'Chat');
inscribeComponent(Error, 'Error');
inscribeComponent(Message, 'Message');
inscribeComponent(UserDataElement, 'UserDataElement');
inscribeComponent(Avatar, 'Avatar');

const router = new Router('#app');

router
  .use('/', LoginPage)
  .use('/sign-up', SignUpPage)
  .use('/chat', ChatsPage)
  .use('/profile', ProfilePage)
  .use('/404', Error404Page)
  .use('/500', Error500Page)
  .start();
