import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import Router from '../Router';

const { window } = new JSDOM('', { url: 'https://test.org/' });
// @ts-ignore
global.window = window;
global.document = window.document;

class PageBlock {
  getContent() {
    return document.createElement('div');
  }

  dispatchComponentDidMount() {}

  dispatchComponentWillUnmount() {}

  render() {}
}

describe('Router Test', () => {
  const router = new Router('body');
  router.use('/', PageBlock).use('/test-route', PageBlock).start();

  it('Должен перенаправить на /test-route', () => {
    router.go('/test-route');

    expect(window.location.pathname).to.equal('/test-route');
  });
});
