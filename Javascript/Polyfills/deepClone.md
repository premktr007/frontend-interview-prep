```js
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};

  map.set(obj, clone);

  for (let key in obj) {
// Because for...in also iterates inherited(prototype) properties.This ensures we only clone own properties.
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }

  return clone;
}

const original = { a: 1, b: { c: 2 }, d: [3, 4] };
original.self = original; // circular reference

const copied = deepClone(original);

console.log(copied.b !== original.b);
```
#### Why WeakMap is Used (Important Interview Point)
##### It is used to handle circular references and during cloning we temporarily store objects and once cloning finishes, we don't need this map anymore. If we used Map, the references might stay in memory but with WeakMap, objects gets garbage collected and WeakMap allows objects as keys.
