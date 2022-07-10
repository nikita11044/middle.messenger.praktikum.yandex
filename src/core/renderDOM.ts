import Block from './Block';

export default function renderDOM(query: string, component: Block) {
  const root = document.querySelector(query);
  root!.appendChild(component.getContent());
  return root;
}
