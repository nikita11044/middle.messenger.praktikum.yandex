import Block from './Block';
import { renderDOM } from './index';
import { isEqual } from '../utils';

export default class Route {
  private _block: Block | null;

  private _pathname: string;

  private readonly _blockClass: typeof Block;

  private _props: any;

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.dispatchComponentWillUnmount();
    }
  }

  match(pathname: string): boolean {
    return pathname.split('?')[0] === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    renderDOM(this._props.rootQuery, this._block);
  }
}
