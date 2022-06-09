import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import EventBus from './EventBus';

type Meta<P = any> = {
  props: P;
};

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private readonly meta: Meta;

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: P;

  protected children: { [id: string]: Block } = {};

  private eventBus: () => EventBus;

  public constructor(props?: P) {
    const eventBus = new EventBus();

    this.meta = {
      props,
    };

    this.props = this.makePropsProxy(props || {} as P);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    this._element = Block.createDocumentElement('div');
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  componentDidMount(props: P) {}

  private _componentDidUpdate(currentProps: P, incomingProps: P) {
    const response = this.componentDidUpdate(currentProps, incomingProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(currentProps: P, incomingProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.compile();

    this.removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this.addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(this) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    }) as unknown as P;
  }

  private static createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.props, children: this.children });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const childNodes = stub.childNodes.length ? stub.childNodes : [];

      const content = component.getContent();
      stub.replaceWith(content);
    });

    return fragment.content;
  }
}
