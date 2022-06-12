import { Block } from '../../core';
import './link.css';
import Router from '../../core/Router';

interface LinkProps {
  classes?: string;
  imageUrl?: string;
  to: string;
  text?: string;
}

export class Link extends Block {
  constructor({
    classes, imageUrl, to, text,
  }: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      Router.navigate(to);
    };

    super({
      classes, to, imageUrl, text, events: { root: { click: onClick } },
    });
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
