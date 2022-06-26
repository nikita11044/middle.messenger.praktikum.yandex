import Block from './Block';

export default function renderDOM(component: Block) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(component.getContent());
}
