import { queryStringify } from '../utils';

type Options = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  withCredentials?: boolean;
  timeout?: number;
  response?: XMLHttpRequestResponseType;
};

type XMLHttpResponse<Response> = XMLHttpRequest & {
  response: Response;
};

export default class HTTPTransport {
  static MAIN_URL = 'https://ya-praktikum.tech/api/v2';

  static WS_URL = 'wss://ya-praktikum.tech/ws';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.MAIN_URL}${endpoint}`;
  }

  get = <Request, Response>(url: string, data?: Request, options: Options = {}): Promise<XMLHttpResponse<Response>> => this._request<Request, Response>(`${this.endpoint}${url}`, { ...options, method: 'GET' }, data);

  post = <Request, Response>(url: string, data?: Request, options: Options = {}): Promise<XMLHttpResponse<Response>> => this._request<Request, Response>(`${this.endpoint}${url}`, { ...options, method: 'POST' }, data);

  put = <Request, Response>(url: string, data?: Request, options: Options = {}): Promise<XMLHttpResponse<Response>> => this._request<Request, Response>(`${this.endpoint}${url}`, { ...options, method: 'PUT' }, data);

  delete = <Request, Response>(url: string, data?: Request, options: Options = {}): Promise<XMLHttpResponse<Response>> => this._request<Request, Response>(`${this.endpoint}${url}`, { ...options, method: 'DELETE' }, data);

  private _request = <Request, Response>(url: string, options: Options, data?: Request): Promise<XMLHttpResponse<Response>> => {
    const {
      method = 'GET',
      headers = {
        'Content-Type': 'application/json',
      },
      withCredentials = true,
      timeout = 3000,
      response = 'json',
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, method === 'GET' && !!data ? `${url}?${queryStringify(data)}` : url);

      xhr.withCredentials = withCredentials;
      xhr.responseType = response;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
