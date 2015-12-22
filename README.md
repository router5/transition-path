# transition-path

Router5 helper to determine a transition path. Used by [router5](https://github.com/router5/router5), [router5-listeners](https://github.com/router5/router5-listeners) and [redux-router5](https://github.com/router5/redux-router5).

### Installation

```
npm install --save router5.transition-path
```

### Usage

This module exports a `transitionPath` function which can compute the transition path between two router5 states: segments to deactivate, segments to activate and intersection node between the two.

```javascript
import transitionPath from 'router5.transition-path';

const { toActivate, toDeactivate, intersection } = transitionPath(toState, fromState);
```

See the tests for examples.
