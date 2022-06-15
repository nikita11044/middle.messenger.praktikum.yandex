import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

interface PropsSpecifiedBlock<P = any> {
  new(props: P): Block;
}

export default function registerComponent<P extends any>(Component: PropsSpecifiedBlock<P>, alias: string) {
  Handlebars.registerHelper(alias, function (this: P, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    if (!data.root.refs) {
      data.root.refs = {};
    }

    const { children, refs } = data.root;

    (Object.keys(hash) as any).forEach((key: keyof P) => {
      if (this[key]) {
        hash[key] = hash[key].replace(new RegExp(`{{${key}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    if (ref) {
      refs[ref] = component;
    }

    const content = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${content}</div>`;
  });
}
