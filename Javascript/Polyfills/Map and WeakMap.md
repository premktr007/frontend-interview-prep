### Map
##### A Map keeps strong references to keys.
```js
let obj = { a: 1 }

const map = new Map()
map.set(obj, "something")

obj = null
```
Even though we set:
```js
Even though we set:
```
#### The object cannot be garbage collected because the Map still references it.
#### So the object stays in memory forever.This can cause memory leaks.
#### Map is iterable, meaning you can loop over its elements using methods like forEach(), keys(), values(), and entries(). It also has a size property that returns the current count of key-value pairs.

### WeakMap
#### A WeakMap is a specialized collection designed for scenarios where memory efficiency is crucial. Keys in a WeakMap must be objects (or non-registered symbols). Primitive values are not allowed as keys, as the concept of a "weak reference" doesn't apply to them.
```js
let obj = { a: 1 }

const weak = new WeakMap()
weak.set(obj, "something")

obj = null
```
#### No strong reference exists. So the garbage collector can remove the object.

