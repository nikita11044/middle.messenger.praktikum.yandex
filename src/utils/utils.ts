export type PlainObject<T = any> = {
  [key in string]: T;
};

function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(obj: PlainObject | unknown, path: string, val: unknown): PlainObject | unknown {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const res = path.split('.').reduceRight<PlainObject>((acc, key) => ({
    [key]: acc,
  }), val as any);
  return merge(obj as PlainObject, res);
}

export const isArray = (val: unknown): val is [] => Array.isArray(val);

export const isPlainObject = (val: unknown): val is PlainObject => (
  typeof val === 'object'
    && val !== null
    && val.constructor === Object
    && Object.prototype.toString.call(val) === '[object Object]'
);

export const isArrayOrPlainObject = (value: unknown): value is [] | PlainObject => isPlainObject(value) || isArray(value);

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, val] of Object.entries(lhs)) {
    const rightVal = rhs[key];
    if (isArrayOrPlainObject(val) && isArrayOrPlainObject(rightVal)) {
      if (!isEqual(val, rightVal)) {
        return false;
      }
    }

    if (val !== rightVal) {
      return false;
    }
  }

  return true;
};

export function isEmpty(obj: object): boolean {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key;
}

export function getParams(data: PlainObject | [], parentKey?: string) {
  const res: [string, string][] = [];

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrPlainObject(value)) {
      res.push(...getParams(value, getKey(key, parentKey)));
    } else {
      res.push([
        getKey(key, parentKey),
        encodeURIComponent(String(value)),
      ]);
    }
  }

  return res;
}

export function queryStringify(data: PlainObject) {
  return getParams(data)
    .map((arr) => arr.join('='))
    .join('&');
}
