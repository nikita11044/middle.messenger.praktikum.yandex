type Options = {
  headers?: Record<string, string>;
  data: XMLHttpRequestBodyInit;
};

type Method = 'GET' | 'POST' | 'UPDATE' | 'DELETE';

class HTTPTransport {
  static get = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'GET');

  static post = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'POST');

  static put = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'UPDATE');

  static delete = (url: string, options: Options) => HTTPTransport._request(url, { ...options }, 'DELETE');

  private static _request = (url: string, options: Options, method: Method) => {
    const { headers = {}, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === 'GET';

      xhr.open(
        method,
        isGet
          ? `${url}${data}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
