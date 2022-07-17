import * as Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import EventBus from './EventBus';
import { isEmpty } from '../utils';

export type Events = { root?: Record<string, (e: Event) => void>, children?: Record<string, Record<string, (e: Event) => void>> };

type Nullable<T> = T | null;

export default class Block<P = any> {
  static EVENTS: Record<string, string> = {
    PRE_INIT: 'pre-init',
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = uuidv4();

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: P;

  protected events: Events;

  protected children: { [id: string]: Block } = {};

  private _eventBus: () => EventBus;

  protected refs: { [key: string]: Block } = {};

  constructor(props?: P, events: Events = {}) {
    const eventBus = new EventBus();

    this.events = events;

    this.props = this._makePropsProxy(props || {} as P);

    this._eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.PRE_INIT);
    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.PRE_INIT, this._preInit.bind(this));
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    this._element = Block._createDocumentElement('div');
  }

  private _preInit() {
    this.preInit();
  }

  preInit() {}

  init() {
    this._createResources();
    this._eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  private _componentDidUpdate(currentProps: P, incomingProps: P) {
    const response = this.componentDidUpdate(currentProps, incomingProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(currentProps: P, incomingProps: P) {
    return currentProps === incomingProps;
  }

  public dispatchComponentDidMount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    this._render();
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentWillUnmount();
    });
  }

  public componentWillUnmount() {}

  public dispatchComponentWillUnmount() {
    this._eventBus().emit(Block.EVENTS.FLOW_CWU);
    this._unmount();
  }

  private _unmount() {
    this._removeEvents();

    if (this._element) {
      this._element.remove();
    }
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

  private static _createDocumentElement(tagName: string = 'div') {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    if (isEmpty(this.events) || !this.events.root || !this._element) {
      return;
    }

    if (this.events.root) {
      Object.entries(this.events.root).forEach(([event, listener]) => {
        this._element!.removeEventListener(event, listener);
      });
    }

    if (this.events.children) {
      Object.entries(this.events.children).forEach(([dataValue, eventRecord]) => {
        const child = this._element!.querySelector(`[data-append-event=${dataValue}]`);
        if (child) {
          Object.entries(eventRecord).forEach(([event, listener]) => {
            child.removeEventListener(event, listener);
          });
        }
      });
    }
  }

  private _addEvents() {
    if (isEmpty(this.events)) {
      return;
    }

    if (this.events.root) {
      Object.entries(this.events.root).forEach(([event, listener]) => {
        this._element!.addEventListener(event, listener);
      });
    }

    if (this.events.children) {
      Object.entries(this.events.children).forEach(([dataValue, eventRecord]) => {
        const child = this._element!.querySelector(`[data-append-event=${dataValue}]`);
        if (child) {
          Object.entries(eventRecord).forEach(([event, listener]) => {
            child.addEventListener(event, listener);
          });
        }
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

  show() {
    this.getContent().style.display = 'flex';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
