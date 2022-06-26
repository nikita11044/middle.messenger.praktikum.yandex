type Options = {
  headers?: Record<string, string>;
  timeout?: number;
  data: any;
};

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function queryStringify(data: any = {}) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const str = Object.entries(data).map(([key, value]) => `${key}=${value}`);
  return `?${str.join('&')}`;
}

export default class HTTPTransport {
  static get = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'GET');

  static post = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'POST');

  static put = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'PUT');

  static delete = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'DELETE');

  private static _request = (url: string, options: Options, method: Method) => {
    const { headers = {}, timeout = 5000, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === 'GET';

      xhr.open(
        method,
        isGet
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
