import { Block } from '../../core';
import './avatar.css';

interface AvatarProps {
  avatarUrl?: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor({ avatarUrl }: AvatarProps) {
    super({ avatarUrl });
  }

  protected render(): string {
    return `
            {{#if avatarUrl}}
                <img class="avatar-image" src="{{avatarUrl}}" alt="avatar">
            {{else}}
                 <div class="avatar-image avatar-image_placeholder"></div>
            {{/if}}
    `;
  }
}
