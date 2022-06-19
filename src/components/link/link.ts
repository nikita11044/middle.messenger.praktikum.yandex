import { Block } from '../../core';
import './link.css';
import Router from '../../core/Router';

interface LinkProps {
  classes?: string;
  imageUrl?: string;
  to: string;
  text?: string;
  events?: { root?: Record<string, (e: MouseEvent) => void> }
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      Router.navigate(props.to);
    };

    super({ ...props, events: { root: { click: onClick } } });
  }

  protected render(): string {
    return `
      <a class="{{classes}} link">
      {{#if imageUrl}}
        <img src="{{imageUrl}}">
      {{else}}
        {{text}}
      {{/if}}
      </a>
    `;
  }
}
