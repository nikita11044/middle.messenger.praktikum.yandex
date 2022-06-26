import { Block } from '../../core';
import './button.css';

interface ButtonProps {
  classes?: string;
  title: string;
  form?: string;
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ ...props });
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
