import { Block } from '../../core';
import '../styles/common.scss';

export class Error404Page extends Block {
  protected render(): string {
    return `
    <main>
    {{{Error code="404" descr="Извините, но такой страницы мы не знаем"}}}
</main>
    `;
  }
}
