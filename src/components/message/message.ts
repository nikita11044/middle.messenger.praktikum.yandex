import { Block } from '../../core';
import './message.scss';

interface MessageProps {
  destination: string;
  text: string;
}

export class Message extends Block<MessageProps> {
  protected render(): string {
    return `
      <li class="message message_{{destination}}">
            <p class="message__text">{{text}}</p>
      </li>
    `;
  }
}
