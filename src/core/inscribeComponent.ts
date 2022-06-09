import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

type PropsSpecifiedBlock<P = any> = {
  new(props: P): Block;
};

export default function inscribeComponent<P extends any>(Component: PropsSpecifiedBlock<P>) {
  Handlebars.registerHelper(Component.name, function (this: P, { hash: { ...hash }, data, fn }: HelperOptions) {
    if (!data.root.children) {
      data.root.children = {};
    }

    const { children } = data.root;

    (Object.keys(hash) as any).forEach((key: keyof P) => {
      if (this[key]) {
        hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
      }
    });

    const component = new Component(hash);

    children[component.id] = component;

    const content = fn ? fn(this) : '';

    return `<div data-id="${component.id}">${content}</div>`;
  });
}
