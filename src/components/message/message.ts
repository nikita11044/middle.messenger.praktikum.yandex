import { Block } from '../../core';
import './message.css';

interface MessageProps {
  imageUrl?: string;
  destination: string;
  text: string;
  messageTime: Date;
}

export class Message extends Block {
  constructor({
    imageUrl, destination, text, messageTime,
  }: MessageProps) {
    super({
      imageUrl, destination, text, messageTime,
    });
  }

  protected render(): string {
    return `
      <li
        {{#if image}}
        class="message message_{{destination}} message_with_image"
        {{else}}
        class="message message_{{destination}}"
        {{/if}}
        >
            {{#if imageUrl}}
                <img src="{{imageUrl}}" alt="image" class="chats__message-image">
            {{else}}
                <p class="message__text">{{text}}</p>
            {{/if}}
            <time class="message__time">{{messageTime}}</time>
      </li>
    `;
  }
}
