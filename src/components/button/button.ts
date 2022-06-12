import { Block } from '../../core';
import './button.css';

interface ButtonProps {
  classes: string;
  title: string;
  form?: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({
    classes, title, form, onClick,
  }: ButtonProps) {
    super({
      classes, title, form, events: { root: { click: onClick } },
    });
  }

  protected render(): string {
    return `
      <button
        class="{{classes}} button-contained"
        {{#if form}} form="{{form}}" {{/if}} 
        type="{{type}}">{{title}}</button>
    `;
  }
}
