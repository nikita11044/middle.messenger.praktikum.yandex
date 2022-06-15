import { Block } from '../../core';
import './errorText.css';

interface ErrorTextProps {
  error?: string;
}

export class ErrorText extends Block {
  constructor({ error }: ErrorTextProps) {
    super({ error });
  }

  protected render(): string {
    return `
      <div class="error-text">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
