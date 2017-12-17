/**
 * @constant {RegExp} QUOTED_KEY_REGEXP
 */
export const QUOTED_KEY_REGEXP = /['|"|`]/;

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
  return `${+key}` === key ? +key : key;
};

/**
 * @function getDotSeparatedPath
 *
 * @description
 * get the path separated by periods as an array of strings or numbers
 *
 * @param {string} path the string path to parse
 * @returns {Array<number|string>} the parsed string path as an array path
 */
export const getDotSeparatedPath = (path) => {
  return path.split('.').reduce((splitPath, pathItem) => {
    if (pathItem) {
      splitPath.push(getKey(pathItem));
    }

    return splitPath;
  }, []);
};

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
  return QUOTED_KEY_REGEXP.test(key[0]) && key[0] === key[key.length - 1];
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
    return path.split(/\[(.*?)\]/g).reduce((cleanPath, pathItem) => {
      if (pathItem) {
        if (!isQuotedKey(pathItem)) {
          return cleanPath.concat(getDotSeparatedPath(pathItem));
        }

        cleanPath.push(getKey(pathItem.slice(1, -1)));
      }

      return cleanPath;
    }, []);
  }

  return [path];
};
