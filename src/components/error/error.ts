import { Block } from '../../core';
import './error.css';

interface ErrorProps {
  code: number;
  descr: string;
}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="error">
        <h1 class="error__code">{{code}}</h1>
        <h2 class="error__descr">{{descr}}</h2>
        {{> link/link classes="error__link" href="./chats.hbs" text="Назад" }}
      </div>
    `;
  }
}
