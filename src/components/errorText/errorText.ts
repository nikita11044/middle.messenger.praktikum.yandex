import { Block } from '../../core';
import './errorText.css';

interface ErrorTextProps {
  error?: string;
}

export class ErrorText extends Block<ErrorTextProps> {
  protected render(): string {
    return `
      <div data-error-text class="error-text">{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
