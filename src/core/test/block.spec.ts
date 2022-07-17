import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { JSDOM } from 'jsdom';
import Block from '../Block';

const { window } = new JSDOM('', { url: 'https://test.org/' });
global.document = window.document;

chai.use(sinonChai);

describe('Block Test', () => {
  it('Изменение пропсов вызывает componentDidUpdate', () => {
    const componentDidUpdate = sinon.spy();
    const block = new Block();

    block.componentDidUpdate = componentDidUpdate;

    block.setProps({ count: 1 });

    expect(componentDidUpdate).to.have.been.callCount(1);
  });
});
