import { Block } from '../../core';
import './link.scss';
import Router from '../../core/Router';

interface LinkProps {
  classes?: string;
  imageUrl?: string;
  to: string;
  text?: string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    const events = {
      root: {
        click: (e: Event) => {
          e.preventDefault();
          const router = new Router();
          if (this.props.to === 'STEP_BACK') {
            router.back();
          } else {
            router.go(this.props.to);
          }
        },
      },
    };

    super(props, events);
  }

  protected render(): string {
    return `
      <a class="{{classes}} link">
      {{#if imageUrl}}
        <img src="{{imageUrl}}">
      {{else}}
        {{text}}
      {{/if}}
      </a>
    `;
  }
}
