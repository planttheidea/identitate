/**
 * @constant {RegExp} QUOTES_REGEXP
 */
export const QUOTES_REGEXP = /['|"|`]/;

/**
 * @constant {RegExp} QUOTES_GLOBAL_REGEXP
 */
export const QUOTES_GLOBAL_REGEXP = new RegExp(`${QUOTES_REGEXP}`.slice(1, -1), 'g');

/**
 * @constant {RegExp} DOTTY_WITH_BRACKETS_SYNTAX_REGEXP
 */
export const DOTTY_WITH_BRACKETS_SYNTAX_REGEXP = /\w+|"[^"]+"/g;

/**
 * @function isQuotedKey
 *
 * @description
 * is the key passed a quoted key
 *
 * @param {string} key the key to test
 * @returns {boolean} is the key a quoted key
 */
export const isQuotedKey = (key) => {
  return QUOTES_REGEXP.test(key[0]) && key[0] === key[key.length - 1];
};

/**
 * @function getKey
 *
 * @description
 * get the key as a number if parseable
 *
 * @param {string} key the key to try to parse
 * @returns {number|string} the parsed key
 */
export const getKey = (key) => {
  return isQuotedKey(key) ? key.slice(1, -1) : isNaN(+key) ? key : +key;
};

/**
 * @function getNestedProperty
 *
 * @description
 * recursive function to get the nested property at path
 *
 * @param {Array<number|string>} path the path to retrieve values from the object
 * @param {*} object the object to get values from
 * @returns {*} the retrieved values
 */
export const getNestedProperty = (path, object) => {
  if (path.length === 1) {
    return object ? object[path[0]] : undefined;
  }

  const property = path.shift();

  return object && object.hasOwnProperty(property) ? getNestedProperty(path, object[property]) : undefined;
};

/**
 * @function getPath
 *
 * @description
 * the path to parsed into a valid array of keys / indices
 *
 * @param {Array<number|string>|number|string} path the path to parse
 * @returns {Array<number|string>} the parsed path
 */
export const getPath = (path) => {
  if (Array.isArray(path)) {
    return [...path];
  }

  if (typeof path === 'string') {
    return path
      ? path
        .replace(QUOTES_GLOBAL_REGEXP, '"')
        .match(DOTTY_WITH_BRACKETS_SYNTAX_REGEXP)
        .map(getKey)
      : [];
  }

  return [path];
};
