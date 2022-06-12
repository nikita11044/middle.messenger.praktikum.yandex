import { Block } from '../../core';

export class Error500Page extends Block {
  protected render(): string {
    return `
    <main>
    {{Error code="500" descr="Скоро починим, не беспокойтесь"}}
</main>
    `;
  }
}
