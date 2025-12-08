import type { PickDeep } from 'internalTypes.js';
import type { Path } from 'pathington';
// eslint-disable-next-line @typescript-eslint/unbound-method
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Recursive function to get the nested property at path.
 */
export function getNestedProperty<O, const P extends Path>(path: P, object: O | null | undefined): PickDeep<O, P> {
  if (object == null) {
    return undefined as PickDeep<O, P>;
  }

  const [property] = path;

  if (property == null || !hasOwnProperty.call(object, property)) {
    return undefined as PickDeep<O, P>;
  }

  if (path.length === 1) {
    return (object as any)[property] as PickDeep<O, P>;
  }

  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return getNestedProperty(path.slice(1), (object as any)[property]) as PickDeep<O, P>;
}
