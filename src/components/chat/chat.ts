import { Block } from '../../core';
import './chat.css';

interface ChatProps {
  selected: boolean;
  avatarUrl?: string;
  chatName: string;
  lastMessageTime: Date;
  lastMessage: string;
  lastMessageCount: number;
}

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <li {{#if selected}} class="chat chat_selected" {{else}} class="chat" {{/if}}>
        {{#if avatarUrl}}
        
        {{else}}
            <div class="avatar-placeholder"></div>
        {{/if}}
            <div class="chat-description">
                <div class="chat-description__row">
                <h3 class="chat-name">{{chatName}}</h3>
                <time class="chat__last-message-time">{{lastMessageTime}}</time>
            </div>
            <div class="chat-description__row">
                <p class="chat__chat-last-message">{{{lastMessage}}}</p>
                    {{#if lastMessageCount}}
                        <div class="chat__last-message-count">{{lastMessageCount}}</div>
                    {{/if}}
            </div>
         </div>
       </li>
    `;
  }
}
