import { Block } from '../../core';
import './error.scss';

interface ErrorProps {
  code: number;
  descr: string;
}

export class Error extends Block<ErrorProps> {
  protected render(): string {
    return `
      <div class="error">
        <h1 class="error__code">{{code}}</h1>
        <h2 class="error__descr">{{descr}}</h2>
        {{{Link classes="error__link" to="STEP_BACK" text="Назад"}}}
      </div>
    `;
  }
}
