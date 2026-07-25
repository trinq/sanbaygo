// Returns a proxy so any CSS-module class lookup yields a string.
// Works for both `import styles from '...'` (default) and `import { root } from '...'` (named).
const handler = {
  get(_target, prop) {
    if (prop === '__esModule') return true;
    if (prop === 'default') return new Proxy({}, handler);
    return prop;
  },
  apply() {
    return new Proxy({}, handler);
  },
};
module.exports = new Proxy({}, handler);
