import { nanoid } from 'nanoid';
import * as Handlebars from 'handlebars';
import EventBus from './EventBus';

type Meta<P = any> = {
  props: P;
};

export default class Block<P = any> {
  static EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  private readonly _meta: Meta;

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: P;

  protected children: { [id: string]: Block } = {};

  private _eventBus: () => EventBus;

  protected refs: { [key: string]: HTMLElement } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus();

    this._meta = {
      props,
    };

    this.props = this._makePropsProxy(props || {} as P);

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = Block._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
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

  private _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild!;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return '';
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this._eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _makePropsProxy(props: any): any {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(this) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self._eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    }) as unknown as P;
  }

  private static _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const events: { root?: Record<string, () => void>, children?: Record<string, Record<string, () => void>> } = (this.props as any).events;

    if (!events || !events.root || !this._element) {
      return;
    }

    if (events.root) {
      Object.entries(events.root).forEach(([event, listener]) => {
        this._element!.removeEventListener(event, listener);
      });
    }

    if (events.children) {
      Object.entries(events.children).forEach(([dataValue, eventRecord]) => {
        const child = this._element!.querySelector(`[data-append-event=${dataValue}]`);
        Object.entries(eventRecord).forEach(([event, listener]) => {
          child!.removeEventListener(event, listener);
        });
      });
    }
  }

  private _addEvents() {
    const events: { root?: Record<string, () => void>, children?: Record<string, Record<string, () => void>> } = (this.props as any).events;

    if (!events) {
      return;
    }

    if (events.root) {
      Object.entries(events.root).forEach(([event, listener]) => {
        this._element!.addEventListener(event, listener);
      });
    }

    if (events.children) {
      Object.entries(events.children).forEach(([dataValue, eventRecord]) => {
        const child = this._element!.querySelector(`[data-append-event=${dataValue}]`);
        Object.entries(eventRecord).forEach(([event, listener]) => {
          child!.addEventListener(event, listener);
        });
      });
    }
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.props, children: this.children, refs: this.refs,
    });

    Object.entries(this.children).forEach(([id, component]) => {
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const content = component.getContent();
      stub.replaceWith(content);
    });

    return fragment.content;
  }
}
