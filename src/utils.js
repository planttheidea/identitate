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
    return object ? object[path[0]] : void 0;
  }

  const property = path.shift();

  return object && object.hasOwnProperty(property) ? getNestedProperty(path, object[property]) : void 0;
};
