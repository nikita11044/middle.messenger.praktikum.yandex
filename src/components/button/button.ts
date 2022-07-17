import { Block } from '../../core';
import './button.scss';

interface ButtonProps {
  classes?: string;
  contained?: boolean;
  title: string;
  form?: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props, props.onClick ? { root: { click: props.onClick } } : {});
  }

  protected render(): string {
    return `
      <button
        class="{{classes}} {{#if contained}} button-contained {{/if}}"
        {{#if form}} form="{{form}}" {{/if}} 
        type="{{type}}">{{title}}</button>
    `;
  }
}
