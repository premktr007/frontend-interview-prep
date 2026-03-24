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
