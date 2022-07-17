import { expect } from 'chai';
import sinon from 'sinon';
import HTTPTransport from '../HttpTransport';

const httpTransport = new HTTPTransport('');

describe('HTTPTransport Test', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: sinon.SinonFakeXMLHttpRequest): void => {
      requests.push(request);
    });
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();
    requests.length = 0;
  });

  it('Должен отправить GET-запрос', () => {
    httpTransport.get('/');

    expect(requests[0].method).to.eq('GET');
  });

  it('Должен отправить POST-запрос', () => {
    httpTransport.post('/');

    expect(requests[0].method).to.eq('POST');
  });

  it('Должен отправить PUT-запрос', () => {
    httpTransport.put('/', {});

    expect(requests[0].method).to.eq('PUT');
  });

  it('Должен отправить DELETE-запрос', () => {
    httpTransport.delete('/', {});

    expect(requests[0].method).to.eq('DELETE');
  });
});
