import { inscribeComponent } from './core';
import Button from './components/button';
import Link from './components/link';
import Chat from './components/chat';
import Error from './components/error';
import Message from './components/message';
import UserDataElement from './components/user-data-element';
import Avatar from './components/avatar';
import AccessFormField from './components/accessFormField';
import Router from './core/Router';
import ErrorText from './components/errorText';

inscribeComponent(Button, 'Button');
inscribeComponent(Link, 'Link');
inscribeComponent(AccessFormField, 'AccessFormField');
inscribeComponent(ErrorText, 'ErrorText');
inscribeComponent(Chat, 'Chat');
inscribeComponent(Error, 'Error');
inscribeComponent(Message, 'Message');
inscribeComponent(UserDataElement, 'UserDataElement');
inscribeComponent(Avatar, 'Avatar');

document.addEventListener('DOMContentLoaded', () => {
  Router.navigate('SIGN_IN');
});
