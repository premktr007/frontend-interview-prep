# Custom Hooks

Custom hooks are used to extract and reuse stateful logic across multiple components.

---

## What problem do custom hooks solve?

When multiple components share the same logic (state + side effects),
that logic gets duplicated and becomes hard to maintain.

Custom hooks help:
- Avoid duplication
- Improve readability
- Centralize complex logic

---

## Mental model

Custom hooks:
- Share **logic**, not UI
- Are just **functions calling other hooks**
- Follow the same rules as React hooks

---

## Example: useSessionStorage

### Problem
Multiple components needed to:
- Read initial value from sessionStorage
- Keep React state in sync with sessionStorage

---

### Solution
Extract sessionStorage logic into a custom hook.

```js
const [value, setValue] = useSessionStorage("key", initialValue);
