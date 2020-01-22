

/**
 * Will return only specified fields (key) on an object.
 * This is particularly useful to prevent user from entering any data,
 * especially with NoSQL world
 * @param {object} data
 * @param {string[]} fields
 * @returns {object}
 */
export function pick (data: object, fields: string[]): any {
  const filteredEntries = Object.entries(data).filter(([key, _]) => fields.includes(key))
  return fromEntries(filteredEntries)
}

/**
 * Will return all properties (key) on an object except specified fields.
 * This is particularly useful when we want to hide some fields like password_confirmation, api_token, etc
 * @param data
 * @param exceptions
 */
export function unpick (data: any, exceptions: string[]): any {
  const filteredEntries = Object.entries(data).filter(([key, _]) => !exceptions.includes(key))
  return fromEntries(filteredEntries)
}

export function fromEntries (iterable: any) {
  const result = {};
  for (const [key, value] of iterable) {
    let coercedKey;
    if (typeof key === 'string' || typeof key === 'symbol') {
      coercedKey = key;
    } else {
      coercedKey = String(key);
    }
    Object.defineProperty(result, coercedKey, {
      value,
      writable: true,
      enumerable: true,
      configurable: true,
    });
  }
  return result;
}

export function uuid (digits: number = 10) {
  // limit to 6 chars until scale time. Max is 10
  if (digits > 12) {
    digits = 10
  }
  return Math.random().toString(36).slice(2, digits + 2).toUpperCase()
}

export function slugify (value: string): string {
  if (!value) {
    return ''
  }
  return value.toLowerCase().split(' ').join('-')
}