var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var react = {exports: {}};

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */


var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction$2 = function emptyFunction() {};

emptyFunction$2.thatReturns = makeEmptyFunction;
emptyFunction$2.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$2.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$2.thatReturnsNull = makeEmptyFunction(null);

emptyFunction$2.thatReturnsThis = function () {
  return this;
};

emptyFunction$2.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$2;

var m$1 = objectAssign,
    n$1 = emptyObject_1,
    p$1 = emptyFunction_1,
    q$1 = "function" === typeof Symbol && Symbol["for"],
    r$1 = q$1 ? Symbol["for"]("react.element") : 60103,
    t$1 = q$1 ? Symbol["for"]("react.call") : 60104,
    u = q$1 ? Symbol["for"]("react.return") : 60105,
    v$1 = q$1 ? Symbol["for"]("react.portal") : 60106,
    w$1 = q$1 ? Symbol["for"]("react.fragment") : 60107,
    x$1 = "function" === typeof Symbol && Symbol.iterator;

function y$1(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }

  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}

var z$1 = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};

function A(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

A.prototype.isReactComponent = {};

A.prototype.setState = function (a, b) {
  "object" !== _typeof$1(a) && "function" !== typeof a && null != a ? y$1("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

function C() {}

C.prototype = A.prototype;
var D = B.prototype = new C();
D.constructor = B;
m$1(D, A.prototype);
D.isPureReactComponent = !0;

function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

var F = E.prototype = new C();
F.constructor = E;
m$1(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;

F.render = function () {
  return this.props.children;
};

var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }
  return {
    $$typeof: r$1,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}

function K(a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === r$1;
}

function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var L = /\/+/g,
    M = [];

function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}

function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M.length && M.push(a);
}

function P(a, b, e, c) {
  var d = _typeof$1(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case r$1:
        case t$1:
        case u:
        case v$1:
          g = !0;
      }

  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x$1 && a[x$1] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y$1("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}

function Q(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}

function R(a, b) {
  a.func.call(a.context, b, a.count++);
}

function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, p$1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r$1,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}

function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}

var U = {
  Children: {
    map: function map(a, b, e) {
      if (null == a) return a;
      var c = [];
      T(a, c, null, b, e);
      return c;
    },
    forEach: function forEach(a, b, e) {
      if (null == a) return a;
      b = N(null, null, b, e);
      null == a || P(a, "", R, b);
      O(b);
    },
    count: function count(a) {
      return null == a ? 0 : P(a, "", p$1.thatReturnsNull, null);
    },
    toArray: function toArray(a) {
      var b = [];
      T(a, b, null, p$1.thatReturnsArgument);
      return b;
    },
    only: function only(a) {
      K(a) ? void 0 : y$1("143");
      return a;
    }
  },
  Component: A,
  PureComponent: B,
  unstable_AsyncComponent: E,
  Fragment: w$1,
  createElement: J,
  cloneElement: function cloneElement(a, b, e) {
    var c = m$1({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);

      for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }

      c.children = f;
    }
    return {
      $$typeof: r$1,
      type: a.type,
      key: d,
      ref: g,
      props: c,
      _owner: k
    };
  },
  createFactory: function createFactory(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: K,
  version: "16.2.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: G,
    assign: m$1
  }
},
    V = Object.freeze({
  default: U
}),
    W = V && U || V;
var react_production_min = W["default"] ? W["default"] : W;

var react_development = {exports: {}};

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var invariant_1 = invariant$1;

var emptyFunction$1 = emptyFunction_1;
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction$1;

if (process.env.NODE_ENV !== 'production') {
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var printWarning$1 = function printWarning() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes$1.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

if (process.env.NODE_ENV !== "production") {
  (function () {

    var _assign = objectAssign;
    var emptyObject = emptyObject_1;
    var invariant = invariant_1;
    var warning = warning_1;
    var emptyFunction = emptyFunction_1;
    var checkPropTypes = checkPropTypes_1; // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */


    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });

        if (typeof console !== 'undefined') {
          console.warn(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      !(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent; // Avoid an extra prototype jump for these methods.

    _assign(asyncComponentPrototype, Component.prototype);

    asyncComponentPrototype.unstable_isAsyncReactComponent = true;

    asyncComponentPrototype.render = function () {
      return this.props.children;
    };
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */


    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }

            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */


    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */


    function isValidElement(object) {
      return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};
    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          return impl();
        }

        return null;
      };
    }
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = _typeof$1(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }

      return null;
    }
    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */


    {
      var currentlyValidatingElement = null;
      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';

        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }

        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (_typeof$1(node) !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      var componentClass = element.type;

      if (typeof componentClass !== 'function') {
        return;
      }

      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;

      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || _typeof$1(type) === 'symbol' || typeof type === 'number'; // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';
        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$1(type), info);
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (_typeof$1(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type); // Legacy hook TODO: Warn if this is accessed

      validatedFactory.type = type;
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,
      Fragment: REACT_FRAGMENT_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };
    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.

    var react = React$3['default'] ? React$3['default'] : React$3;
    react_development.exports = react;
  })();
}

if (process.env.NODE_ENV === 'production') {
  react.exports = react_production_min;
} else {
  react.exports = react_development.exports;
}

var React = react.exports;

var allLocaleData = {};

var intlMessageformat = {exports: {}};

var main$1 = {};

var core$1 = {};

var utils = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

utils.extend = extend;
var hop$1 = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop$1.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

utils.hop = hop$1;

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var src$utils$$ = utils; // Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp$1 = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};

var objCreate$1 = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty$1(obj, k, props[k]);
    }
  }

  return obj;
};

es5$1.defineProperty = defineProperty$1, es5$1.objCreate = objCreate$1;

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  exports["default"] = Compiler;

  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }

  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };

  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern = [];
    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];

      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;

        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;

        default:
          throw new Error('Message element does not have a valid type');
      }
    }

    return pattern;
  };

  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    } // Unescape the escaped '#'s in the message text.


    return element.value.replace(/\\#/g, '#');
  };

  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
      return new StringFormat(element.id);
    }

    var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };

      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);

      default:
        throw new Error('Message element does not have a valid format type');
    }
  };

  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
        options = format.options,
        optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.

    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i]; // Compile the sub-pattern and save it under the options's selector.

      optionsHash[option.selector] = this.compileMessage(option.value);
    } // Pop the plural stack to put back the original current plural value.


    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  }; // -- Compiler Helper Classes --------------------------------------------------


  function StringFormat(id) {
    this.id = id;
  }

  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  };

  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }

  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };

  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };

  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }

  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
})(compiler);

var intlMessageformatParser = {exports: {}};

var parser = {};

(function (exports) {

  exports["default"] = function () {
    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
        start: peg$parsestart
      },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
        return {
          type: 'messageFormatPattern',
          elements: elements,
          location: location()
        };
      },
          peg$c1 = function peg$c1(text) {
        var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;

        for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
          inner = text[i];

          for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
            string += inner[j];
          }
        }

        return string;
      },
          peg$c2 = function peg$c2(messageText) {
        return {
          type: 'messageTextElement',
          value: messageText,
          location: location()
        };
      },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
          peg$c5 = "{",
          peg$c6 = {
        type: "literal",
        value: "{",
        description: "\"{\""
      },
          peg$c7 = ",",
          peg$c8 = {
        type: "literal",
        value: ",",
        description: "\",\""
      },
          peg$c9 = "}",
          peg$c10 = {
        type: "literal",
        value: "}",
        description: "\"}\""
      },
          peg$c11 = function peg$c11(id, format) {
        return {
          type: 'argumentElement',
          id: id,
          format: format && format[2],
          location: location()
        };
      },
          peg$c12 = "number",
          peg$c13 = {
        type: "literal",
        value: "number",
        description: "\"number\""
      },
          peg$c14 = "date",
          peg$c15 = {
        type: "literal",
        value: "date",
        description: "\"date\""
      },
          peg$c16 = "time",
          peg$c17 = {
        type: "literal",
        value: "time",
        description: "\"time\""
      },
          peg$c18 = function peg$c18(type, style) {
        return {
          type: type + 'Format',
          style: style && style[2],
          location: location()
        };
      },
          peg$c19 = "plural",
          peg$c20 = {
        type: "literal",
        value: "plural",
        description: "\"plural\""
      },
          peg$c21 = function peg$c21(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: false,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c22 = "selectordinal",
          peg$c23 = {
        type: "literal",
        value: "selectordinal",
        description: "\"selectordinal\""
      },
          peg$c24 = function peg$c24(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: true,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c25 = "select",
          peg$c26 = {
        type: "literal",
        value: "select",
        description: "\"select\""
      },
          peg$c27 = function peg$c27(options) {
        return {
          type: 'selectFormat',
          options: options,
          location: location()
        };
      },
          peg$c28 = "=",
          peg$c29 = {
        type: "literal",
        value: "=",
        description: "\"=\""
      },
          peg$c30 = function peg$c30(selector, pattern) {
        return {
          type: 'optionalFormatPattern',
          selector: selector,
          value: pattern,
          location: location()
        };
      },
          peg$c31 = "offset:",
          peg$c32 = {
        type: "literal",
        value: "offset:",
        description: "\"offset:\""
      },
          peg$c33 = function peg$c33(number) {
        return number;
      },
          peg$c34 = function peg$c34(offset, options) {
        return {
          type: 'pluralFormat',
          offset: offset,
          options: options,
          location: location()
        };
      },
          peg$c35 = {
        type: "other",
        description: "whitespace"
      },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
          peg$c38 = {
        type: "other",
        description: "optionalWhitespace"
      },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
          peg$c43 = "0",
          peg$c44 = {
        type: "literal",
        value: "0",
        description: "\"0\""
      },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
          peg$c47 = function peg$c47(digits) {
        return parseInt(digits, 10);
      },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
          peg$c50 = "\\\\",
          peg$c51 = {
        type: "literal",
        value: "\\\\",
        description: "\"\\\\\\\\\""
      },
          peg$c52 = function peg$c52() {
        return '\\';
      },
          peg$c53 = "\\#",
          peg$c54 = {
        type: "literal",
        value: "\\#",
        description: "\"\\\\#\""
      },
          peg$c55 = function peg$c55() {
        return '\\#';
      },
          peg$c56 = "\\{",
          peg$c57 = {
        type: "literal",
        value: "\\{",
        description: "\"\\\\{\""
      },
          peg$c58 = function peg$c58() {
        return "{";
      },
          peg$c59 = "\\}",
          peg$c60 = {
        type: "literal",
        value: "\\}",
        description: "\"\\\\}\""
      },
          peg$c61 = function peg$c61() {
        return "}";
      },
          peg$c62 = "\\u",
          peg$c63 = {
        type: "literal",
        value: "\\u",
        description: "\"\\\\u\""
      },
          peg$c64 = function peg$c64(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
          peg$c65 = function peg$c65(chars) {
        return chars.join('');
      },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
        line: 1,
        column: 1,
        seenCR: false
      }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }

      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }

      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p,
            ch;

        if (details) {
          return details;
        } else {
          p = pos - 1;

          while (!peg$posDetailsCache[p]) {
            p--;
          }

          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };

          while (p < pos) {
            ch = input.charAt(p);

            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }

              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }

            p++;
          }

          peg$posDetailsCache[pos] = details;
          return details;
        }
      }

      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }

      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      }

      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }

        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }

          var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }

      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }

      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }

        return s0;
      }

      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];

          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }

          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);

              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();

                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }

                if (s5 === peg$FAILED) {
                  s5 = null;
                }

                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();

                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }

        return s0;
      }

      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }

          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();

                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = null;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();

                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }

        return s0;
      }

      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();

          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();

            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];

        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);

            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        return s0;
      }

      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        return s0;
      }

      function peg$parsedigit() {
        var s0;

        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }

        return s0;
      }

      function peg$parsehexDigit() {
        var s0;

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }

        return s0;
      }

      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;

          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();

                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();

                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();

                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();

                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }

                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        return s0;
      }

      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }

        s0 = s1;
        return s0;
      }

      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }

    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
})(parser);

(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
})(intlMessageformatParser, intlMessageformatParser.exports);

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  var src$utils$$ = utils,
      src$es5$$ = es5$1,
      src$compiler$$ = compiler,
      intl$messageformat$parser$$ = intlMessageformatParser.exports;
  exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

    src$es5$$.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    }); // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.

    var pluralFn = this._findPluralRuleFunction(this._locale);

    var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.


    var messageFormat = this;

    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  } // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.


  src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  }); // Define internal private properties for dealing with locale data.

  src$es5$$.defineProperty(MessageFormat, '__localeData__', {
    value: src$es5$$.objCreate(null)
  });
  src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }

      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  }); // Defines `__parse()` static method as an exposed private.

  src$es5$$.defineProperty(MessageFormat, '__parse', {
    value: intl$messageformat$parser$$["default"].parse
  }); // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.

  src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });

  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };

  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
  };

  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.

    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };

  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i,
        len,
        part,
        id,
        value,
        err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i]; // Exist early for string parts.

      if (typeof part === 'string') {
        result += part;
        continue;
      }

      id = part.id; // Enforce that all required values are provided by the caller.

      if (!(values && src$utils$$.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }

      value = values[id]; // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.

      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }

    return result;
  };

  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type,
        mergedType;

    for (type in defaults) {
      if (!src$utils$$.hop.call(defaults, type)) {
        continue;
      }

      mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

      if (formats && src$utils$$.hop.call(formats, type)) {
        src$utils$$.extend(mergedType, formats[type]);
      }
    }

    return mergedFormats;
  };

  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
})(core$1);

var en$1 = {};

(function (exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
})(en$1);

/* jslint esnext: true */

(function (exports) {

  var src$core$$ = core$1,
      src$en$$ = en$1;

  src$core$$["default"].__addLocaleData(src$en$$["default"]);

  src$core$$["default"].defaultLocale = 'en';
  exports["default"] = src$core$$["default"];
})(main$1);

/* jshint node:true */

(function (module, exports) {

  var IntlMessageFormat = main$1['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
})(intlMessageformat, intlMessageformat.exports);

var IntlMessageFormat = intlMessageformat.exports;

var intlRelativeformat = {exports: {}};

var main = {};

var core = {};

var diff = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(diff, "__esModule", {
  value: true
});
/* jslint esnext: true */

var round = Math.round;

function daysToYears(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  return days * 400 / 146097;
} // Thanks to date-fns
// https://github.com/date-fns/date-fns
// MIT © Sasha Koss


var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

function startOfDay(dirtyDate) {
  var date = new Date(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

function default_1(from, to) {
  // Convert to ms timestamps.
  from = +from;
  to = +to;
  var millisecond = round(to - from),
      second = round(millisecond / 1000),
      minute = round(second / 60),
      hour = round(minute / 60); // We expect a more precision in rounding when dealing with
  // days as it feels wrong when something happended 13 hours ago and
  // is regarded as "yesterday" even if the time was this morning.

  var day = differenceInCalendarDays(to, from);
  var week = round(day / 7);
  var rawYears = daysToYears(day),
      month = round(rawYears * 12),
      year = round(rawYears);
  return {
    millisecond: millisecond,
    second: second,
    'second-short': second,
    minute: minute,
    'minute-short': minute,
    hour: hour,
    'hour-short': hour,
    day: day,
    'day-short': day,
    week: week,
    'week-short': week,
    month: month,
    'month-short': month,
    year: year,
    'year-short': year
  };
}

diff.default = default_1;

var es5 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(es5, "__esModule", {
  value: true
});
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;

var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
es5.defineProperty = defineProperty;

var objCreate = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }

  return obj;
};

es5.objCreate = objCreate;

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
  /*jshint validthis:true */
  var arr = this;

  if (!arr.length) {
    return -1;
  }

  for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
    if (arr[i] === search) {
      return i;
    }
  }

  return -1;
};

es5.arrIndexOf = arrIndexOf;

var isArray$1 = Array.isArray || function (obj) {
  return toString$1.call(obj) === '[object Array]';
};

es5.isArray = isArray$1;

var dateNow = Date.now || function () {
  return new Date().getTime();
};

es5.dateNow = dateNow;

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(core, "__esModule", {
  value: true
});
/* jslint esnext: true */

var intl_messageformat_1 = intlMessageformat.exports;
var diff_1 = diff;
var es5_1 = es5;

core.default = RelativeFormat; // -----------------------------------------------------------------------------


var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
  options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
  // since it's used lazily.

  if (es5_1.isArray(locales)) {
    locales = locales.concat();
  }

  es5_1.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  });
  es5_1.defineProperty(this, '_options', {
    value: {
      style: this._resolveStyle(options.style),
      units: this._isValidUnits(options.units) && options.units
    }
  });
  es5_1.defineProperty(this, '_locales', {
    value: locales
  });
  es5_1.defineProperty(this, '_fields', {
    value: this._findFields(this._locale)
  });
  es5_1.defineProperty(this, '_messages', {
    value: es5_1.objCreate(null)
  }); // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.

  var relativeFormat = this;

  this.format = function format(date, options) {
    return relativeFormat._format(date, options);
  };
} // Define internal private properties for dealing with locale data.


es5_1.defineProperty(RelativeFormat, '__localeData__', {
  value: es5_1.objCreate(null)
});
es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
  value: function value() {
    for (var i = 0; i < arguments.length; i++) {
      var datum = arguments[i];

      if (!(datum && datum.locale)) {
        throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
      }

      RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

      intl_messageformat_1.default.__addLocaleData(datum);
    }
  }
}); // Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.

es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
}); // Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.

es5_1.defineProperty(RelativeFormat, 'thresholds', {
  enumerable: true,
  value: {
    second: 45,
    'second-short': 45,
    minute: 45,
    'minute-short': 45,
    hour: 22,
    'hour-short': 22,
    day: 26,
    'day-short': 26,
    month: 11,
    'month-short': 11 // months to year

  }
});

RelativeFormat.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
};

RelativeFormat.prototype._compileMessage = function (units) {
  // `this._locales` is the original set of locales the user specified to the
  // constructor, while `this._locale` is the resolved root locale.
  var locales = this._locales;
  this._locale;
  var field = this._fields[units];
  var relativeTime = field.relativeTime;
  var future = '';
  var past = '';
  var i;

  for (i in relativeTime.future) {
    if (relativeTime.future.hasOwnProperty(i)) {
      future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
    }
  }

  for (i in relativeTime.past) {
    if (relativeTime.past.hasOwnProperty(i)) {
      past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
    }
  }

  var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
  // locales value specified by the user when constructing the the parent
  // IntlRelativeFormat instance.

  return new intl_messageformat_1.default(message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
  var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

  if (!messages[units]) {
    messages[units] = this._compileMessage(units);
  }

  return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
  var field = this._fields[units];

  if (field.relative) {
    return field.relative[diff];
  }
};

RelativeFormat.prototype._findFields = function (locale) {
  var localeData = RelativeFormat.__localeData__;
  var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.

  while (data) {
    if (data.fields) {
      return data.fields;
    }

    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }

  throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
};

RelativeFormat.prototype._format = function (date, options) {
  var now = options && options.now !== undefined ? options.now : es5_1.dateNow();

  if (date === undefined) {
    date = now;
  } // Determine if the `date` and optional `now` values are valid, and throw a
  // similar error to what `Intl.DateTimeFormat#format()` would throw.


  if (!isFinite(now)) {
    throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  if (!isFinite(date)) {
    throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  var diffReport = diff_1.default(now, date);

  var units = this._options.units || this._selectUnits(diffReport);

  var diffInUnits = diffReport[units];

  if (this._options.style !== 'numeric') {
    var relativeUnits = this._getRelativeUnits(diffInUnits, units);

    if (relativeUnits) {
      return relativeUnits;
    }
  }

  return this._getMessage(units).format({
    '0': Math.abs(diffInUnits),
    when: diffInUnits < 0 ? 'past' : 'future'
  });
};

RelativeFormat.prototype._isValidUnits = function (units) {
  if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
    return true;
  }

  if (typeof units === 'string') {
    var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

    if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
      throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
    }
  }

  throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
};

RelativeFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  } // Create a copy of the array so we can push on the default locale.


  locales = (locales || []).concat(RelativeFormat.defaultLocale);
  var localeData = RelativeFormat.__localeData__;
  var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.

  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];

      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};

RelativeFormat.prototype._resolveStyle = function (style) {
  // Default to "best fit" style.
  if (!style) {
    return STYLES[0];
  }

  if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
    return style;
  }

  throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
  var i, l, units;
  var fields = FIELDS.filter(function (field) {
    return field.indexOf('-short') < 1;
  });

  for (i = 0, l = fields.length; i < l; i += 1) {
    units = fields[i];

    if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
      break;
    }
  }

  return units;
};

var en = {};

Object.defineProperty(en, "__esModule", {
  value: true
});
/* @generated */

en.default = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
    return n == 1 && v0 ? 'one' : 'other';
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "week": {
      "displayName": "week",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this week",
        "1": "next week",
        "-1": "last week"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} week",
          "other": "in {0} weeks"
        },
        "past": {
          "one": "{0} week ago",
          "other": "{0} weeks ago"
        }
      }
    },
    "week-short": {
      "displayName": "wk.",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this wk.",
        "1": "next wk.",
        "-1": "last wk."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} wk.",
          "other": "in {0} wk."
        },
        "past": {
          "one": "{0} wk. ago",
          "other": "{0} wk. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/* jslint esnext: true */


Object.defineProperty(main, "__esModule", {
  value: true
});
var core_1 = core;
var en_1 = en;

core_1.default.__addLocaleData(en_1.default);

core_1.default.defaultLocale = 'en';

main.default = core_1.default;

/* jshint node:true */

(function (module, exports) {

  var IntlRelativeFormat = main['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
})(intlRelativeformat, intlRelativeformat.exports);

var IntlRelativeFormat = intlRelativeformat.exports;

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

Object.defineProperty(reactIs_production_min, "__esModule", {
  value: !0
});
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f$1 = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.fundamental") : 60117,
    w = b ? Symbol.for("react.responder") : 60118,
    x = b ? Symbol.for("react.scope") : 60119;

function y(a) {
  if ("object" === _typeof$1(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f$1:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case h:
                return a;

              default:
                return u;
            }

        }

      case t:
      case r:
      case d:
        return u;
    }
  }
}

function z(a) {
  return y(a) === m;
}

reactIs_production_min.typeOf = y;
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f$1;
reactIs_production_min.Suspense = p;

reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f$1 || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
};

reactIs_production_min.isAsyncMode = function (a) {
  return z(a) || y(a) === l;
};

reactIs_production_min.isConcurrentMode = z;

reactIs_production_min.isContextConsumer = function (a) {
  return y(a) === k;
};

reactIs_production_min.isContextProvider = function (a) {
  return y(a) === h;
};

reactIs_production_min.isElement = function (a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
};

reactIs_production_min.isForwardRef = function (a) {
  return y(a) === n;
};

reactIs_production_min.isFragment = function (a) {
  return y(a) === e;
};

reactIs_production_min.isLazy = function (a) {
  return y(a) === t;
};

reactIs_production_min.isMemo = function (a) {
  return y(a) === r;
};

reactIs_production_min.isPortal = function (a) {
  return y(a) === d;
};

reactIs_production_min.isProfiler = function (a) {
  return y(a) === g;
};

reactIs_production_min.isStrictMode = function (a) {
  return y(a) === f$1;
};

reactIs_production_min.isSuspense = function (a) {
  return y(a) === p;
};

var reactIs_development = {};

(function (exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
})(reactIs_development);

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

var ReactIs$2 = reactIs.exports;
var assign = objectAssign;
var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;
var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function printWarning() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs$2.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$1(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$1(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

if (process.env.NODE_ENV !== 'production') {
  var ReactIs$1 = reactIs.exports; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod

  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs$1.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var ReactIs = reactIs.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var browser = invariant;

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);

      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = PropTypes.bool;
var number = PropTypes.number;
var string = PropTypes.string;
var func = PropTypes.func;
var object = PropTypes.object;
var oneOf = PropTypes.oneOf;
var shape = PropTypes.shape;
var any = PropTypes.any;
var oneOfType = PropTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return IntlMessageFormat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = IntlRelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, IntlRelativeFormat.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage$2(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  if (process.env.NODE_ENV !== 'production') {
    browser(! /*#__PURE__*/react.exports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  } // `id` is a required field of a Message Descriptor.


  browser(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage$2(config, state, messageDescriptor, escapedValues);
}

var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage$2,
  formatHTMLMessage: formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
      getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
      getRelativeFormat: memoizeFormatConstructor(IntlRelativeFormat),
      getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.exports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.exports.Component);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
process.env.NODE_ENV !== "production" ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: PropTypes.element.isRequired,
  initialNow: PropTypes.any
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.exports.Component);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.exports.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.exports.Component);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
process.env.NODE_ENV !== "production" ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.exports.Component);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.exports.Component);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
process.env.NODE_ENV !== "production" ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: PropTypes.any.isRequired,
  other: PropTypes.node.isRequired,
  zero: PropTypes.node,
  one: PropTypes.node,
  two: PropTypes.node,
  few: PropTypes.node,
  many: PropTypes.node,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }

  return formatMessage$2({}, {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat)
  }, descriptor, values);
};

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if ( /*#__PURE__*/react.exports.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react.exports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.exports.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/React.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.exports.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF0CAYAAAD/4EcMAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACWKADAAQAAAABAAABdAAAAAAtOTIzAABAAElEQVR4Aey9B5icV3n3fU8v24tWXbKaJVuWLDfcCwaDDbjgYIJDIJ9JIKQQSCNvgZA3AZKLJNeXBN5QQskXkkAgGDAYA8bYuBtLtrqs3nel7X12+nf/z+yzmt2dnZ3ZnWd2yv/W9WhmnnLOfX7nzO5/T7mP4+Pbk0mhkQAJkAAJkAAJkAAJFIyAs2ApMSESIAESIAESIAESIAFDgAKLDYEESIAESIAESIAECkyAAqvAQJkcCZAACZAACZAACVBgsQ2QAAmQAAmQAAmQQIEJUGAVGCiTIwESIAESIAESIAEKLLYBEiABEiABEiABEigwAQqsAgNlciRAAiRAAiRAAiRAgcU2QAIkQAIkQAIkQAIFJkCBVWCgTI4ESIAESIAESIAEKLDYBkiABEiABEiABEigwAQosAoMlMmRAAmQAAmQAAmQAAUW2wAJkAAJkAAJkAAJFJgABVaBgTI5EiABEiABEiABEqDAYhsgARIgARIgARIggQIToMAqMFAmRwIkQAIkQAIkQAIUWGwDJEACJEACJEACJFBgAhRYBQbK5EiABEiABEiABEiAAottgARIgARIgARIgAQKTIACq8BAmRwJkAAJkAAJkAAJUGCxDZAACZAACZAACZBAgQlQYBUYKJMjARIgARIgARIgAQostgESIAESIAESIAESKDABCqwCA2VyJEACJEACJEACJECBxTZAAiRAAiRAAiRAAgUmQIFVYKBMjgRIgARIgARIgAQosNgGSIAESIAESIAESKDABCiwCgyUyZEACZAACZAACZAABRbbAAmQAAmQAAmQAAkUmAAFVoGBMjkSIAESIAESIAESoMBiGyABEiABEiABEiCBAhOgwCowUCZHAiRAAiRAAiRAAhRYbAMkQAIkQAIkQAIkUGACFFgFBsrkSIAESIAESIAESIACi22ABEiABEiABEiABApMgAKrwECZHAmQAAmQAAmQAAlQYLENkAAJkAAJkAAJkECBCVBgFRgokyMBEiABEiABEiABCiy2ARIgARIg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";

var img$2 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='40px' height='40px' viewBox='0 0 40 40' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3elegoluigi-small%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='legoluigi-small' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3ccircle id='Oval' fill='white' cx='20' cy='20' r='20'%3e%3c/circle%3e %3cpolygon id='Path' fill='%231A940D' fill-rule='nonzero' points='10 6 11 32 29 32 29 25.5 16 26 16.5 6'%3e%3c/polygon%3e %3c/g%3e%3c/svg%3e";

var img$1 = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='90px' height='132px' viewBox='0 0 90 132' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3ctitle%3elegoluigi-illustration%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cg id='legoluigi-illustration' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3cg id='legoluigi' transform='translate(4.000000%2c 0.000000)'%3e %3crect id='Rectangle' stroke='%231E417A' stroke-width='1' fill='%23295192' stroke-linejoin='round' x='16' y='116' width='15' height='9'%3e%3c/rect%3e %3crect id='Rectangle' stroke='%231E417A' stroke-width='1' fill='%23295192' stroke-linejoin='round' transform='translate(58.500000%2c 120.500000) scale(-1%2c 1) translate(-58.500000%2c -120.500000) ' x='51' y='116' width='15' height='9'%3e%3c/rect%3e %3cpath d='M16%2c125 L31%2c125 C32.1045695%2c125 33%2c125.895431 33%2c127 L33%2c131.5 L14%2c131.5 L14%2c127 C14%2c125.895431 14.8954305%2c125 16%2c125 Z' id='Rectangle-Copy-3' stroke='%236E392C' stroke-width='1' fill='%23622612'%3e%3c/path%3e %3cpath d='M51%2c125 L66%2c125 C67.1045695%2c125 68%2c125.895431 68%2c127 L68%2c131.5 L49%2c131.5 L49%2c127 C49%2c125.895431 49.8954305%2c125 51%2c125 Z' id='Rectangle-Copy-4' stroke='%236E392C' stroke-width='1' fill='%23622612'%3e%3c/path%3e %3cg id='arm-R' stroke-width='1' transform='translate(0.500000%2c 80.773998)'%3e %3cpath d='M13.9030084%2c0 C12.5311291%2c0 10.1213159%2c1.26849794 8.39622874%2c3.17212845 C6.03090337%2c5.78226072 4.5267597%2c9.78113005 3.85469509%2c15.8765471 L10.9379584%2c17.3383049 C11.2696623%2c15.9892789 11.9030084%2c10.5907542 13.9030084%2c8.72600219 L13.9030084%2c0 Z' id='Path-8' stroke='%233C9556' fill='%2344AC32'%3e%3c/path%3e %3crect id='Rectangle' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(6.986700%2c 18.623986) rotate(10.000000) translate(-6.986700%2c -18.623986) ' x='2.48669987' y='16.1239859' width='9' height='5'%3e%3c/rect%3e %3cpath d='M6%2c20.2260022 C8.209139%2c20.2260022 10%2c22.0168632 10%2c24.2260022 C10%2c25.4099756 9.4856015%2c26.4738048 8.66810248%2c27.2061918 L8.37445611%2c25.4409406 C8.56126184%2c25.0765824 8.66666667%2c24.6636016 8.66666667%2c24.2260022 C8.66666667%2c22.7532429 7.47275933%2c21.5593355 6%2c21.5593355 C4.52724067%2c21.5593355 3.33333333%2c22.7532429 3.33333333%2c24.2260022 C3.33333333%2c24.6636016 3.43873816%2c25.0765824 3.62554389%2c25.4409406 L3.33290985%2c27.2070985 C2.51482318%2c26.4746829 2%2c25.4104642 2%2c24.2260022 C2%2c22.0168632 3.790861%2c20.2260022 6%2c20.2260022 Z' id='Combined-Shape' stroke='%23BCC3D5' stroke-width='0.5' fill='%23BEC3D2'%3e%3c/path%3e %3cpath d='M6%2c18.2260022 C9.3137085%2c18.2260022 12%2c20.9122937 12%2c24.2260022 C12%2c26.4336239 10.8077321%2c28.3627766 9.03197707%2c29.4046793 L8.66810248%2c27.2061918 C9.4856015%2c26.4738048 10%2c25.4099756 10%2c24.2260022 C10%2c22.0168632 8.209139%2c20.2260022 6%2c20.2260022 C3.790861%2c20.2260022 2%2c22.0168632 2%2c24.2260022 C2%2c25.4104642 2.51482318%2c26.4746829 3.33290985%2c27.2070985 L2.96802293%2c29.4046793 C1.19226791%2c28.3627766 0%2c26.4336239 0%2c24.2260022 C0%2c20.9122937 2.6862915%2c18.2260022 6%2c18.2260022 Z' id='Combined-Shape' stroke='%239FAED6' fill='white' stroke-linejoin='round'%3e%3c/path%3e %3c/g%3e %3crect id='ear.-R' stroke='%23EDA77F' stroke-width='1' fill='%23FACDAD' stroke-linejoin='round' x='9' y='46' width='5' height='13' rx='1'%3e%3c/rect%3e %3cg id='arm-L' stroke-width='1' transform='translate(67.596992%2c 80.773998)'%3e %3cpath d='M10.0483133%2c-3.55271368e-15 C8.676434%2c-3.55271368e-15 6.26662076%2c1.26849794 4.54153365%2c3.17212845 C2.17620828%2c5.78226072 0.67206461%2c9.78113005 -8.8817842e-16%2c15.8765471 L7.08326329%2c17.3383049 C7.41496719%2c15.9892789 8.04831329%2c10.5907542 10.0483133%2c8.72600219 L10.0483133%2c-3.55271368e-15 Z' id='Path-8' stroke='%233C9556' fill='%2344AC32' transform='translate(5.024157%2c 8.669152) scale(-1%2c 1) translate(-5.024157%2c -8.669152) '%3e%3c/path%3e %3crect id='Rectangle' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(6.916309%2c 18.623986) scale(-1%2c 1) rotate(10.000000) translate(-6.916309%2c -18.623986) ' x='2.41630851' y='16.1239859' width='9' height='5'%3e%3c/rect%3e %3cpath d='M7.90300838%2c20.2260022 C10.1121474%2c20.2260022 11.9030084%2c22.0168632 11.9030084%2c24.2260022 C11.9030084%2c25.4099756 11.3886099%2c26.4738048 10.5711109%2c27.2061918 L10.2774645%2c25.4409406 C10.4642702%2c25.0765824 10.569675%2c24.6636016 10.569675%2c24.2260022 C10.569675%2c22.7532429 9.37576771%2c21.5593355 7.90300838%2c21.5593355 C6.43024905%2c21.5593355 5.23634171%2c22.7532429 5.23634171%2c24.2260022 C5.23634171%2c24.6636016 5.34174654%2c25.0765824 5.52855227%2c25.4409406 L5.23591823%2c27.2070985 C4.41783156%2c26.4746829 3.90300838%2c25.4104642 3.90300838%2c24.2260022 C3.90300838%2c22.0168632 5.69386938%2c20.2260022 7.90300838%2c20.2260022 Z' id='Combined-Shape' stroke='%23BCC3D5' stroke-width='0.5' fill='%23BEC3D2' transform='translate(7.903008%2c 23.716550) scale(-1%2c 1) translate(-7.903008%2c -23.716550) '%3e%3c/path%3e %3cpath d='M7.90300838%2c18.2260022 C11.2167169%2c18.2260022 13.9030084%2c20.9122937 13.9030084%2c24.2260022 C13.9030084%2c26.4336239 12.7107405%2c28.3627766 10.9349854%2c29.4046793 L10.5711109%2c27.2061918 C11.3886099%2c26.4738048 11.9030084%2c25.4099756 11.9030084%2c24.2260022 C11.9030084%2c22.0168632 10.1121474%2c20.2260022 7.90300838%2c20.2260022 C5.69386938%2c20.2260022 3.90300838%2c22.0168632 3.90300838%2c24.2260022 C3.90300838%2c25.4104642 4.41783156%2c26.4746829 5.23591823%2c27.2070985 L4.87103132%2c29.4046793 C3.0952763%2c28.3627766 1.90300838%2c26.4336239 1.90300838%2c24.2260022 C1.90300838%2c20.9122937 4.58929988%2c18.2260022 7.90300838%2c18.2260022 Z' id='Combined-Shape' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(7.903008%2c 23.663011) scale(-1%2c 1) translate(-7.903008%2c -23.663011) '%3e%3c/path%3e %3c/g%3e %3crect id='ear-L' stroke='%23EDA77F' stroke-width='1' fill='%23FACDAD' stroke-linejoin='round' transform='translate(70.500000%2c 52.500000) scale(-1%2c 1) translate(-70.500000%2c -52.500000) ' x='68' y='46' width='5' height='13' rx='1'%3e%3c/rect%3e %3crect id='Rectangle' stroke='%232B63BC' stroke-width='1' fill='%23396DC2' stroke-linejoin='round' x='14' y='77' width='54' height='24' rx='1'%3e%3c/rect%3e %3cpath d='M66%2c77 C67.1045695%2c77 68%2c77.8954305 68%2c79 L68%2c115.218 L49.521%2c124 L32.478%2c124 L14%2c115.218 L14%2c79 C14%2c77.8954305 14.8954305%2c77 16%2c77 L66%2c77 Z' id='pants' stroke='%231E417A' stroke-width='1' fill='%23295192' stroke-linejoin='round'%3e%3c/path%3e %3crect id='Rectangle' stroke='%232B63BC' stroke-width='1' fill='%2344AC32' x='27' y='77' width='28' height='20'%3e%3c/rect%3e %3crect id='screen' fill='%23454545' x='29' y='81' width='24' height='13'%3e%3c/rect%3e %3cpath d='M68%2c31 L68%2c72.309082 L63.309082%2c77 L50.1488926%2c77.0005909 C47.9477627%2c78.8356594 44.6658435%2c80 41%2c80 C37.3341565%2c80 34.0522373%2c78.8356594 31.8511074%2c77.0005909 L18.690918%2c77 L14%2c72.309082 L14%2c31 L68%2c31 Z' id='face' stroke='%23EDA77F' stroke-width='1' fill='%23FACDAD' stroke-linejoin='round'%3e%3c/path%3e %3cg id='mouse' stroke-width='1' transform='translate(24.000000%2c 59.000000)'%3e %3cg id='Group-2' transform='translate(11.000000%2c 3.000000)'%3e %3cellipse id='Oval' fill='%23454545' cx='6' cy='7.5' rx='6' ry='7.5'%3e%3c/ellipse%3e %3cpath d='M6%2c13.5 C7.11777355%2c13.5 8.1284626%2c13.7292416 8.85426748%2c14.098825 C8.00474501%2c14.6737815 7.03284947%2c15 6%2c15 C4.9672934%2c15 3.99552388%2c14.6738717 3.14701004%2c14.0995135 C3.87214553%2c13.7291037 4.88256273%2c13.5 6%2c13.5 Z' id='Combined-Shape' fill='red'%3e%3c/path%3e %3crect id='Rectangle' fill='white' x='0' y='9' width='12' height='2'%3e%3c/rect%3e %3cellipse id='Oval-Copy-10' stroke='%23D0AA90' cx='6' cy='7.5' rx='6.5' ry='8'%3e%3c/ellipse%3e %3c/g%3e %3cpath d='M30%2c11.5 C33.5%2c8.5 34.5%2c3 32%2c0 C29.5%2c3 24.6666667%2c4 17%2c4 C9.33333333%2c4 4.5%2c3 2%2c0 C-0.5%2c3 0.5%2c8.5 4%2c11.5 C8.27428112%2c15.1636695 14.0013387%2c13.5012951 17%2c11 C20%2c13.5 25.7257189%2c15.1636695 30%2c11.5 Z' id='Path' stroke='%23565656' fill='%23454545'%3e%3c/path%3e %3c/g%3e %3cg id='eye-R' stroke-width='1' transform='translate(24.000000%2c 35.500000)'%3e %3cpath d='M4%2c14 C4%2c11.2385763 6.23857625%2c9 9%2c9 C11.7614237%2c9 14%2c11.2385763 14%2c14 C14%2c16.7614237 14%2c15.7385763 14%2c18.5 C14%2c21.2614237 11.7614237%2c23.5 9%2c23.5 C6.23857625%2c23.5 4%2c21.2614237 4%2c18.5 C4%2c15.7385763 4%2c16.7614237 4%2c14 Z' id='Oval' fill='white'%3e%3c/path%3e %3cg id='Group-4' transform='translate(6.400000%2c 10.750000)'%3e %3cpath d='M3.7%2c11 C6.34109053%2c11 7.4%2c8.53756612 7.4%2c5.5 C7.4%2c2.46243388 6.34242913%2c0 3.7%2c0 C1.05757087%2c0 4.52970994e-14%2c2.46243388 4.52970994e-14%2c5.5 C4.52970994e-14%2c8.53756612 1.05890947%2c11 3.7%2c11 Z' id='Oval' fill='%234593C7'%3e%3c/path%3e %3cpath d='M2%2c5.5 C2%2c4.34466462 2.14380483%2c3.27371063 2.63516333%2c2.54331286 C2.86830507%2c2.1967508 3.22167314%2c2 3.7%2c2 C4.17832686%2c2 4.53169493%2c2.1967508 4.76483667%2c2.54331286 C5.25619517%2c3.27371063 5.4%2c4.34466462 5.4%2c5.5 C5.4%2c6.65519131 5.25587142%2c7.72598052 4.76453478%2c8.4563458 C4.53138002%2c8.8029272 4.1781781%2c9 3.7%2c9 C3.2218219%2c9 2.86861998%2c8.8029272 2.63546522%2c8.4563458 C2.14412858%2c7.72598052 2%2c6.65519131 2%2c5.5 Z' id='Oval-Copy-7' stroke='%234E4E4E' fill='%23454545'%3e%3c/path%3e %3ccircle id='Oval' fill='white' cx='3.7' cy='3.75' r='1'%3e%3c/circle%3e %3ccircle id='Oval-Copy-6' fill='%234593C7' cx='3.7' cy='7.25' r='1'%3e%3c/circle%3e %3c/g%3e %3cpath d='M1.53%2c7.79760742 C1.94641979%2c4.30362956 3.65440658%2c2.55664062 6.65396035%2c2.55664062 C9.65351413%2c2.55664062 11.6420605%2c4.51692708 12.6195996%2c8.4375 C10.5525423%2c6.55208333 8.5639959%2c5.609375 6.65396035%2c5.609375 C4.74392481%2c5.609375 3.03593802%2c6.33878581 1.53%2c7.79760742 Z' id='Path-7' fill='%23454545' transform='translate(7.074800%2c 5.497070) scale(-1%2c 1) rotate(20.000000) translate(-7.074800%2c -5.497070) '%3e%3c/path%3e %3c/g%3e %3cg id='eye-L' stroke-width='1' transform='translate(43.600000%2c 36.056641)'%3e %3cpath d='M0.4%2c13.4433594 C0.4%2c10.6819356 2.63857625%2c8.44335938 5.4%2c8.44335938 C8.16142375%2c8.44335938 10.4%2c10.6819356 10.4%2c13.4433594 C10.4%2c16.2047831 10.4%2c15.1819356 10.4%2c17.9433594 C10.4%2c20.7047831 8.16142375%2c22.9433594 5.4%2c22.9433594 C2.63857625%2c22.9433594 0.4%2c20.7047831 0.4%2c17.9433594 C0.4%2c15.1819356 0.4%2c16.2047831 0.4%2c13.4433594 Z' id='Oval' fill='white' transform='translate(5.400000%2c 15.693359) scale(-1%2c 1) translate(-5.400000%2c -15.693359) '%3e%3c/path%3e %3cg id='Group-3' transform='translate(0.600000%2c 10.193359)'%3e %3cpath d='M3.7%2c11 C6.34109053%2c11 7.4%2c8.53756612 7.4%2c5.5 C7.4%2c2.46243388 6.34242913%2c0 3.7%2c0 C1.05757087%2c0 4.52970994e-14%2c2.46243388 4.52970994e-14%2c5.5 C4.52970994e-14%2c8.53756612 1.05890947%2c11 3.7%2c11 Z' id='Oval' fill='%234593C7' transform='translate(3.700000%2c 5.500000) scale(-1%2c 1) translate(-3.700000%2c -5.500000) '%3e%3c/path%3e %3cpath d='M2%2c5.5 C2%2c4.34466462 2.14380483%2c3.27371063 2.63516333%2c2.54331286 C2.86830507%2c2.1967508 3.22167314%2c2 3.7%2c2 C4.17832686%2c2 4.53169493%2c2.1967508 4.76483667%2c2.54331286 C5.25619517%2c3.27371063 5.4%2c4.34466462 5.4%2c5.5 C5.4%2c6.65519131 5.25587142%2c7.72598052 4.76453478%2c8.4563458 C4.53138002%2c8.8029272 4.1781781%2c9 3.7%2c9 C3.2218219%2c9 2.86861998%2c8.8029272 2.63546522%2c8.4563458 C2.14412858%2c7.72598052 2%2c6.65519131 2%2c5.5 Z' id='Oval' stroke='%234E4E4E' fill='%23454545' transform='translate(3.700000%2c 5.500000) scale(-1%2c 1) translate(-3.700000%2c -5.500000) '%3e%3c/path%3e %3ccircle id='Oval' fill='white' transform='translate(3.700000%2c 3.750000) scale(-1%2c 1) translate(-3.700000%2c -3.750000) ' cx='3.7' cy='3.75' r='1'%3e%3c/circle%3e %3ccircle id='Oval-Copy-6' fill='%234593C7' transform='translate(3.700000%2c 7.250000) scale(-1%2c 1) translate(-3.700000%2c -7.250000) ' cx='3.7' cy='7.25' r='1'%3e%3c/circle%3e %3c/g%3e %3cpath d='M1.78%2c7.2409668 C2.19641979%2c3.74698893 3.90440658%2c2 6.90396035%2c2 C9.90351413%2c2 11.8920605%2c3.96028646 12.8695996%2c7.88085938 C10.8025423%2c5.99544271 8.8139959%2c5.05273438 6.90396035%2c5.05273438 C4.99392481%2c5.05273438 3.28593802%2c5.78214518 1.78%2c7.2409668 Z' id='Path-7' fill='%23454545' transform='translate(7.324800%2c 4.940430) rotate(20.000000) translate(-7.324800%2c -4.940430) '%3e%3c/path%3e %3c/g%3e %3cellipse id='nose' stroke='%23EDA77F' stroke-width='1' fill='%23FACDAD' stroke-linejoin='round' cx='41' cy='61' rx='8' ry='7'%3e%3c/ellipse%3e %3cg id='hear' stroke-width='1' transform='translate(14.000000%2c 23.000000)' fill='%23622612' stroke='%236E392C'%3e %3cpath d='M52%2c1 C53.328125%2c1 54%2c2.50581865 54%2c3.84146894 L54%2c30 L54%2c30 C50.578776%2c29.0269568 49%2c27.2814742 49%2c25 L49.0008069%2c13.9169061 C48.6753441%2c13.9715542 48.340994%2c14 48%2c14 C44.6862915%2c14 42%2c11.3137085 42%2c8 L12%2c8 C12%2c11.3137085 9.3137085%2c14 6%2c14 C5.65935467%2c14 5.32533963%2c13.9716124 5.00019152%2c13.9170737 L5%2c25 C5%2c27.2814742 3.42122396%2c29.0269568 0%2c30 L0%2c3.84146894 L0%2c3.84146894 C0%2c2.50581865 0.671875%2c1 2%2c1 L52%2c1 L52%2c1 Z' id='Combined-Shape'%3e%3c/path%3e %3cpath d='M18%2c13 C21.3137085%2c13 24%2c10.3137085 24%2c7 L24%2c1 L12%2c1 L12%2c7 C12%2c10.3137085 14.6862915%2c13 18%2c13 Z' id='Oval'%3e%3c/path%3e %3cpath d='M36%2c13 C39.3137085%2c13 42%2c10.3137085 42%2c7 L42%2c1 L30%2c1 L30%2c7 C30%2c10.3137085 32.6862915%2c13 36%2c13 Z' id='Oval' transform='translate(36.000000%2c 7.000000) scale(-1%2c 1) translate(-36.000000%2c -7.000000) '%3e%3c/path%3e %3cpath d='M27%2c12 C30.3137085%2c12 33%2c9.3137085 33%2c6 L33%2c0 L21%2c0 L21%2c6 C21%2c9.3137085 23.6862915%2c12 27%2c12 Z' id='Oval'%3e%3c/path%3e %3c/g%3e %3cg id='hat' stroke-width='1' transform='translate(17.000000%2c 0.500000)' fill='%2344AC32' stroke='%233C9556'%3e %3cpath d='M1.51177783%2c23.5 C0.537169689%2c22.9061965 0.0332437469%2c21.0236418 0%2c17.8523358 C0%2c7.10191559 17.1059353%2c0.5 23.9999695%2c0.5 C30.8940037%2c0.5 48%2c7.10191559 48%2c17.8523358 C47.9667563%2c21.0236418 47.4628303%2c22.9061965 46.4882222%2c23.5 L23.9999695%2c23.5 L1.51177783%2c23.5 Z'%3e%3c/path%3e %3cpath d='M24.000028%2c23.5 L3.38579634%2c23.5 C2.49240555%2c23.3450947 2.03047343%2c22.8539935 2%2c22.0266963 C2%2c19.2222389 17.6804966%2c17.5 24.000028%2c17.5 C30.3195593%2c17.5 17.6804407%2c17.5 23.999972%2c17.5 C30.3195034%2c17.5 46%2c19.2222389 46%2c22.0266963 C45.9695266%2c22.8539935 45.5075945%2c23.3450947 44.6142037%2c23.5 L23.999972%2c23.5' id='hat-copy'%3e%3c/path%3e %3c/g%3e %3ccircle id='button' stroke='%23E6AB00' stroke-width='1' fill='%23FFD500' transform='translate(61.500000%2c 89.500000) scale(-1%2c 1) translate(-61.500000%2c -89.500000) ' cx='61.5' cy='89.5' r='6.5'%3e%3c/circle%3e %3ccircle id='button' stroke='%23E6AB00' stroke-width='1' fill='%23FFD500' cx='20.5' cy='89.5' r='6.5'%3e%3c/circle%3e %3cg id='L-mark' stroke-width='1' transform='translate(33.500000%2c 4.000000)'%3e %3cellipse id='Oval' fill='white' cx='7.5' cy='6' rx='7.5' ry='6'%3e%3c/ellipse%3e %3cpolygon id='Path' fill='%2344AC32' fill-rule='nonzero' points='3.21428571 1.71428571 3.66541353 10.2857143 12 10.5 12 7.5 6 7.5 6 1.71428571'%3e%3c/polygon%3e %3c/g%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

var img = "data:image/svg+xml,%3c%3fxml version='1.0' encoding='UTF-8'%3f%3e%3csvg width='90px' height='132px' viewBox='0 0 90 132' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e %3c!-- Generator: Sketch 64 (93537) - https://sketch.com --%3e %3cstyle type='text/css'%3e %3c!%5bCDATA%5b %40-webkit-keyframes wiggle %7b 0%25 %7b transform: translate(8.5px%2c 37px)%3b %7d 100%25 %7b transform: translate(8.5px%2c 47px)%3b %7d %7d %40keyframes wiggle %7b 0%25 %7b transform: translate(8.5px%2c 37px)%3b %7d 100%25 %7b transform: translate(8.5px%2c 47px)%3b %7d %7d %23arrow %7b -webkit-animation: wiggle 0.5s infinite ease-in-out alternate%3b animation: wiggle 0.5s infinite ease-in-out alternate%3b %7d %5d%5d%3e %3c/style%3e %3ctitle%3elegoluigi-button-illustration%3c/title%3e %3cdesc%3eCreated with Sketch.%3c/desc%3e %3cdefs%3e %3cpath d='M36.4863865%2c32 C35.8359214%2c32 35.2288206%2c31.7593361 34.7778315%2c31.3255814 L25.7002299%2c22.5385506 C24.9977276%2c21.8165589 24.8098155%2c20.8035318 25.2000945%2c19.933224 C25.5874826%2c19.0629161 26.4432056%2c18.52562 27.4348035%2c18.52562 L30.877932%2c18.52562 L32.6327422%2c6.29653575 C32.8842554%2c4.42439448 34.5667917%2c3 36.5470965%2c3 C36.7176629%2c3 36.8911203%2c3.01119367 37.0616867%2c3.03078259 C38.8482975%2c3.30222908 40.2272834%2c4.65106629 40.4441051%2c6.31052784 L42.2451707%2c18.52562 L45.5379695%2c18.52562 C46.5411312%2c18.52562 47.4344366%2c19.0964972 47.8131518%2c19.9779986 C48.191867%2c20.865097 47.9866092%2c21.8473415 47.272543%2c22.5385506 L38.1949414%2c31.3255814 C37.7439523%2c31.7593361 37.1368516%2c32 36.4863865%2c32 Z' id='path-1'%3e%3c/path%3e %3cfilter x='-15.2%25' y='-12.1%25' width='130.4%25' height='124.1%25' filterUnits='objectBoundingBox' id='filter-2'%3e %3cfeMorphology radius='1.5' operator='dilate' in='SourceAlpha' result='shadowSpreadOuter1'%3e%3c/feMorphology%3e %3cfeOffset dx='0' dy='0' in='shadowSpreadOuter1' result='shadowOffsetOuter1'%3e%3c/feOffset%3e %3cfeComposite in='shadowOffsetOuter1' in2='SourceAlpha' operator='out' result='shadowOffsetOuter1'%3e%3c/feComposite%3e %3cfeColorMatrix values='0 0 0 0 0.298039216 0 0 0 0 0.592156863 0 0 0 0 1 0 0 0 0.25 0' type='matrix' in='shadowOffsetOuter1'%3e%3c/feColorMatrix%3e %3c/filter%3e %3c/defs%3e %3cg id='legoluigi-button-illustration' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3e %3crect id='Rectangle' stroke='%231E417A' fill='%23295192' stroke-linejoin='round' x='20' y='116.5' width='15' height='9'%3e%3c/rect%3e %3crect id='Rectangle' stroke='%231E417A' fill='%23295192' stroke-linejoin='round' transform='translate(62.500000%2c 121.000000) scale(-1%2c 1) translate(-62.500000%2c -121.000000) ' x='55' y='116.5' width='15' height='9'%3e%3c/rect%3e %3cpath d='M20%2c125.5 L35%2c125.5 C36.1045695%2c125.5 37%2c126.395431 37%2c127.5 L37%2c132 L18%2c132 L18%2c127.5 C18%2c126.395431 18.8954305%2c125.5 20%2c125.5 Z' id='Rectangle-Copy-3' stroke='%236E392C' fill='%23622612'%3e%3c/path%3e %3cpath d='M55%2c125.5 L70%2c125.5 C71.1045695%2c125.5 72%2c126.395431 72%2c127.5 L72%2c132 L53%2c132 L53%2c127.5 C53%2c126.395431 53.8954305%2c125.5 55%2c125.5 Z' id='Rectangle-Copy-4' stroke='%236E392C' fill='%23622612'%3e%3c/path%3e %3cg id='arm-R' transform='translate(4.500000%2c 81.273998)'%3e %3cpath d='M13.9030084%2c0 C12.5311291%2c0 10.1213159%2c1.26849794 8.39622874%2c3.17212845 C6.03090337%2c5.78226072 4.5267597%2c9.78113005 3.85469509%2c15.8765471 L10.9379584%2c17.3383049 C11.2696623%2c15.9892789 11.9030084%2c10.5907542 13.9030084%2c8.72600219 L13.9030084%2c0 Z' id='Path-8' stroke='%233C9556' fill='%2344AC32'%3e%3c/path%3e %3crect id='Rectangle' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(6.986700%2c 18.623986) rotate(10.000000) translate(-6.986700%2c -18.623986) ' x='2.48669987' y='16.1239859' width='9' height='5'%3e%3c/rect%3e %3cpath d='M6%2c20.2260022 C8.209139%2c20.2260022 10%2c22.0168632 10%2c24.2260022 C10%2c25.4099756 9.4856015%2c26.4738048 8.66810248%2c27.2061918 L8.37445611%2c25.4409406 C8.56126184%2c25.0765824 8.66666667%2c24.6636016 8.66666667%2c24.2260022 C8.66666667%2c22.7532429 7.47275933%2c21.5593355 6%2c21.5593355 C4.52724067%2c21.5593355 3.33333333%2c22.7532429 3.33333333%2c24.2260022 C3.33333333%2c24.6636016 3.43873816%2c25.0765824 3.62554389%2c25.4409406 L3.33290985%2c27.2070985 C2.51482318%2c26.4746829 2%2c25.4104642 2%2c24.2260022 C2%2c22.0168632 3.790861%2c20.2260022 6%2c20.2260022 Z' id='Combined-Shape' stroke='%23BCC3D5' stroke-width='0.5' fill='%23BEC3D2'%3e%3c/path%3e %3cpath d='M6%2c18.2260022 C9.3137085%2c18.2260022 12%2c20.9122937 12%2c24.2260022 C12%2c26.4336239 10.8077321%2c28.3627766 9.03197707%2c29.4046793 L8.66810248%2c27.2061918 C9.4856015%2c26.4738048 10%2c25.4099756 10%2c24.2260022 C10%2c22.0168632 8.209139%2c20.2260022 6%2c20.2260022 C3.790861%2c20.2260022 2%2c22.0168632 2%2c24.2260022 C2%2c25.4104642 2.51482318%2c26.4746829 3.33290985%2c27.2070985 L2.96802293%2c29.4046793 C1.19226791%2c28.3627766 0%2c26.4336239 0%2c24.2260022 C0%2c20.9122937 2.6862915%2c18.2260022 6%2c18.2260022 Z' id='Combined-Shape' stroke='%239FAED6' fill='white' stroke-linejoin='round'%3e%3c/path%3e %3c/g%3e %3cg id='arm-L' transform='translate(71.596992%2c 81.273998)'%3e %3cpath d='M10.0483133%2c-3.55271368e-15 C8.676434%2c-3.55271368e-15 6.26662076%2c1.26849794 4.54153365%2c3.17212845 C2.17620828%2c5.78226072 0.67206461%2c9.78113005 -8.8817842e-16%2c15.8765471 L7.08326329%2c17.3383049 C7.41496719%2c15.9892789 8.04831329%2c10.5907542 10.0483133%2c8.72600219 L10.0483133%2c-3.55271368e-15 Z' id='Path-8' stroke='%233C9556' fill='%2344AC32' transform='translate(5.024157%2c 8.669152) scale(-1%2c 1) translate(-5.024157%2c -8.669152) '%3e%3c/path%3e %3crect id='Rectangle' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(6.916309%2c 18.623986) scale(-1%2c 1) rotate(10.000000) translate(-6.916309%2c -18.623986) ' x='2.41630851' y='16.1239859' width='9' height='5'%3e%3c/rect%3e %3cpath d='M7.90300838%2c20.2260022 C10.1121474%2c20.2260022 11.9030084%2c22.0168632 11.9030084%2c24.2260022 C11.9030084%2c25.4099756 11.3886099%2c26.4738048 10.5711109%2c27.2061918 L10.2774645%2c25.4409406 C10.4642702%2c25.0765824 10.569675%2c24.6636016 10.569675%2c24.2260022 C10.569675%2c22.7532429 9.37576771%2c21.5593355 7.90300838%2c21.5593355 C6.43024905%2c21.5593355 5.23634171%2c22.7532429 5.23634171%2c24.2260022 C5.23634171%2c24.6636016 5.34174654%2c25.0765824 5.52855227%2c25.4409406 L5.23591823%2c27.2070985 C4.41783156%2c26.4746829 3.90300838%2c25.4104642 3.90300838%2c24.2260022 C3.90300838%2c22.0168632 5.69386938%2c20.2260022 7.90300838%2c20.2260022 Z' id='Combined-Shape' stroke='%23BCC3D5' stroke-width='0.5' fill='%23BEC3D2' transform='translate(7.903008%2c 23.716550) scale(-1%2c 1) translate(-7.903008%2c -23.716550) '%3e%3c/path%3e %3cpath d='M7.90300838%2c18.2260022 C11.2167169%2c18.2260022 13.9030084%2c20.9122937 13.9030084%2c24.2260022 C13.9030084%2c26.4336239 12.7107405%2c28.3627766 10.9349854%2c29.4046793 L10.5711109%2c27.2061918 C11.3886099%2c26.4738048 11.9030084%2c25.4099756 11.9030084%2c24.2260022 C11.9030084%2c22.0168632 10.1121474%2c20.2260022 7.90300838%2c20.2260022 C5.69386938%2c20.2260022 3.90300838%2c22.0168632 3.90300838%2c24.2260022 C3.90300838%2c25.4104642 4.41783156%2c26.4746829 5.23591823%2c27.2070985 L4.87103132%2c29.4046793 C3.0952763%2c28.3627766 1.90300838%2c26.4336239 1.90300838%2c24.2260022 C1.90300838%2c20.9122937 4.58929988%2c18.2260022 7.90300838%2c18.2260022 Z' id='Combined-Shape' stroke='%239FAED6' fill='white' stroke-linejoin='round' transform='translate(7.903008%2c 23.663011) scale(-1%2c 1) translate(-7.903008%2c -23.663011) '%3e%3c/path%3e %3c/g%3e %3crect id='ear.-R' stroke='%23EDA77F' fill='%23FACDAD' stroke-linejoin='round' x='13' y='46' width='5' height='13' rx='1'%3e%3c/rect%3e %3crect id='ear-L' stroke='%23EDA77F' fill='%23FACDAD' stroke-linejoin='round' transform='translate(74.500000%2c 52.500000) scale(-1%2c 1) translate(-74.500000%2c -52.500000) ' x='72' y='46' width='5' height='13' rx='1'%3e%3c/rect%3e %3crect id='screen' stroke='%233C9556' fill='%2344AC32' x='36' y='77' width='18' height='24'%3e%3c/rect%3e %3crect id='screen-copy' stroke='%234B4B4B' fill='black' x='38.5' y='77' width='13' height='22' rx='1'%3e%3c/rect%3e %3cg id='hat' transform='translate(21.000000%2c 0.500000)' fill='%2344AC32' stroke='%233C9556'%3e %3cpath d='M1.51177783%2c23.5 C0.537169689%2c22.9061965 0.0332437469%2c21.0236418 0%2c17.8523358 C0%2c7.10191559 17.1059353%2c0.5 23.9999695%2c0.5 C30.8940037%2c0.5 48%2c7.10191559 48%2c17.8523358 C47.9667563%2c21.0236418 47.4628303%2c22.9061965 46.4882222%2c23.5 L23.9999695%2c23.5 L1.51177783%2c23.5 Z'%3e%3c/path%3e %3c/g%3e %3cpath d='M72%2c72.6055808 L67.309082%2c77.5 L22.690918%2c77.5 L18%2c72.6055808 L18%2c26.9495422 L18%2c26.9495422 C18%2c25.7981195 18.671875%2c24.5 20%2c24.5 L70%2c24.5 L70%2c24.5 C71.328125%2c24.5 72%2c25.7981195 72%2c26.9495422 L72%2c72.6055808 Z' id='Combined-Shape' stroke='%236E392C' fill='%23622612'%3e%3c/path%3e %3cpath d='M45%2c71 C45%2c74.5898509 42.0898509%2c77.5 38.5%2c77.5 C34.9101491%2c77.5 32%2c74.5898509 32%2c71 C32%2c74.5898509 29.0898509%2c77.5 25.5%2c77.5' id='Oval' stroke='%236E392C' fill='%23622612'%3e%3c/path%3e %3cpath d='M64.5%2c71 C64.5%2c74.5898509 61.5898509%2c77.5 58%2c77.5 C54.4101491%2c77.5 51.5%2c74.5898509 51.5%2c71 C51.5%2c74.5898509 48.5898509%2c77.5 45%2c77.5' id='Oval-Copy' stroke='%236E392C' fill='%23622612' transform='translate(54.750000%2c 74.250000) scale(-1%2c 1) translate(-54.750000%2c -74.250000) '%3e%3c/path%3e %3cpath d='M70%2c77.5 C71.1045695%2c77.5 72%2c78.3954305 72%2c79.5 L72%2c115.718 L53.521%2c124.5 L36.478%2c124.5 L18%2c115.718 L18%2c79.5 C18%2c78.3954305 18.8954305%2c77.5 20%2c77.5 L37%2c77.5 L37%2c98.5 C37%2c99.6045695 37.8954305%2c100.5 39%2c100.5 L39%2c100.5 L51%2c100.5 C52.1045695%2c100.5 53%2c99.6045695 53%2c98.5 L53%2c98.5 L53%2c77.5 L53%2c77.5 L70%2c77.5 Z' id='Combined-Shape' stroke='%231E417A' fill='%23295192' stroke-linejoin='round'%3e%3c/path%3e %3cg id='Group' opacity='0.5' transform='translate(43.000000%2c 91.500000)' stroke='white' stroke-linecap='round'%3e %3cpath d='M3.0010775%2c0.768188139 C3.59828461%2c1.11415066 4%2c1.7601625 4%2c2.5 C4%2c3.6045695 3.1045695%2c4.5 2%2c4.5 C0.8954305%2c4.5 0%2c3.6045695 0%2c2.5 C0%2c1.75974756 0.40216612%2c1.11342606 0.999927519%2c0.767606321' id='Path' stroke-width='0.75'%3e%3c/path%3e %3cline x1='2' y1='2.84217094e-14' x2='2' y2='2.5' id='Line-2'%3e%3c/line%3e %3c/g%3e %3cpolyline id='Path-9' stroke='white' stroke-width='0.75' stroke-linecap='round' stroke-linejoin='round' points='43.5 85 46.5 82 45 80.5 45 86.5 46.5 85 43.5 82'%3e%3c/polyline%3e %3cpolygon id='Path-2' fill='%234B4B4B' points='39 89 51 89 49.5 90.5 40.5 90.5'%3e%3c/polygon%3e %3cpolygon id='Path-2-Copy' fill='%23525252' points='39 78 51 78 49.5 79.5 40.5 79.5'%3e%3c/polygon%3e %3cg id='legoluigi' transform='translate(21.000000%2c 0.000000)'%3e%3c/g%3e %3c/g%3e %3cg id='arrow'%3e %3cuse fill='black' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3e%3c/use%3e %3cuse stroke='%234280D7' stroke-width='1' fill='%234C97FF' fill-rule='evenodd' xlink:href='%23path-1'%3e%3c/use%3e %3c/g%3e%3c/svg%3e";

var entry = {
  name: 'LEGO Luigi',
  extensionId: 'legoluigi',
  collaborator: 'bricklife',
  iconURL: img$3,
  insetIconURL: img$2,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Know what he is doing.",
    id: "gui.extension.legoluigi.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: true,
  internetConnectionRequired: true,
  launchPeripheralConnectionFlow: true,
  useAutoScan: true,
  connectionIconURL: img$1,
  connectionSmallIconURL: img$2,
  connectionTipIconURL: img,
  connectingMessage: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Connecting",
    id: "gui.extension.boost.connectingMessage"
  }),
  helpLink: 'https://scratch.mit.edu/boost'
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType$1 = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',

  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',

  /**
   * Numeric value with color picker
   */
  COLOR: 'color',

  /**
   * Numeric value with text field
   */
  NUMBER: 'number',

  /**
   * String value with text field
   */
  STRING: 'string',

  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',

  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',

  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
var argumentType = ArgumentType$1;

/**
 * Types of block
 * @enum {string}
 */
var BlockType$1 = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType$1;

var Color$2 = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, null, [{
    key: "RGB_BLACK",
    get:
    /**
     * @typedef {object} RGBObject - An object representing a color in RGB format.
     * @property {number} r - the red component, in the range [0, 255].
     * @property {number} g - the green component, in the range [0, 255].
     * @property {number} b - the blue component, in the range [0, 255].
     */

    /**
     * @typedef {object} HSVObject - An object representing a color in HSV format.
     * @property {number} h - hue, in the range [0-359).
     * @property {number} s - saturation, in the range [0,1].
     * @property {number} v - value, in the range [0,1].
     */

    /** @type {RGBObject} */
    function get() {
      return {
        r: 0,
        g: 0,
        b: 0
      };
    }
    /** @type {RGBObject} */

  }, {
    key: "RGB_WHITE",
    get: function get() {
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }
    /**
     * Convert a Scratch decimal color to a hex string, #RRGGBB.
     * @param {number} decimal RGB color as a decimal.
     * @return {string} RGB color as #RRGGBB hex string.
     */

  }, {
    key: "decimalToHex",
    value: function decimalToHex(decimal) {
      if (decimal < 0) {
        decimal += 0xFFFFFF + 1;
      }

      var hex = Number(decimal).toString(16);
      hex = "#".concat('000000'.substr(0, 6 - hex.length)).concat(hex);
      return hex;
    }
    /**
     * Convert a Scratch decimal color to an RGB color object.
     * @param {number} decimal RGB color as decimal.
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "decimalToRgb",
    value: function decimalToRgb(decimal) {
      var a = decimal >> 24 & 0xFF;
      var r = decimal >> 16 & 0xFF;
      var g = decimal >> 8 & 0xFF;
      var b = decimal & 0xFF;
      return {
        r: r,
        g: g,
        b: b,
        a: a > 0 ? a : 255
      };
    }
    /**
     * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
     * CC-BY-SA Tim Down:
     * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {!string} hex Hex representation of the color.
     * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    /**
     * Convert an RGB color object to a hex color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!string} Hex representation of the color.
     */

  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      return Color.decimalToHex(Color.rgbToDecimal(rgb));
    }
    /**
     * Convert an RGB color object to a Scratch decimal color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!number} Number representing the color.
     */

  }, {
    key: "rgbToDecimal",
    value: function rgbToDecimal(rgb) {
      return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
    }
    /**
    * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
    * @param {!string} hex Hex representation of the color.
    * @return {!number} Number representing the color.
    */

  }, {
    key: "hexToDecimal",
    value: function hexToDecimal(hex) {
      return Color.rgbToDecimal(Color.hexToRgb(hex));
    }
    /**
     * Convert an HSV color to RGB format.
     * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
      var h = hsv.h % 360;
      if (h < 0) h += 360;
      var s = Math.max(0, Math.min(hsv.s, 1));
      var v = Math.max(0, Math.min(hsv.v, 1));
      var i = Math.floor(h / 60);
      var f = h / 60 - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      var r;
      var g;
      var b;

      switch (i) {
        default:
        case 0:
          r = v;
          g = t;
          b = p;
          break;

        case 1:
          r = q;
          g = v;
          b = p;
          break;

        case 2:
          r = p;
          g = v;
          b = t;
          break;

        case 3:
          r = p;
          g = q;
          b = v;
          break;

        case 4:
          r = t;
          g = p;
          b = v;
          break;

        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
    }
    /**
     * Convert an RGB color to HSV format.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     */

  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var x = Math.min(Math.min(r, g), b);
      var v = Math.max(Math.max(r, g), b); // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate

      var h = 0;
      var s = 0;

      if (x !== v) {
        var f = r === x ? g - b : g === x ? b - r : r - g;
        var i = r === x ? 3 : g === x ? 5 : 1;
        h = (i - f / (v - x)) * 60 % 360;
        s = (v - x) / v;
      }

      return {
        h: h,
        s: s,
        v: v
      };
    }
    /**
     * Linear interpolation between rgb0 and rgb1.
     * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
     * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
     * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
     * @return {RGBObject} the interpolated color.
     */

  }, {
    key: "mixRgb",
    value: function mixRgb(rgb0, rgb1, fraction1) {
      if (fraction1 <= 0) return rgb0;
      if (fraction1 >= 1) return rgb1;
      var fraction0 = 1 - fraction1;
      return {
        r: fraction0 * rgb0.r + fraction1 * rgb1.r,
        g: fraction0 * rgb0.g + fraction1 * rgb1.g,
        b: fraction0 * rgb0.b + fraction1 * rgb1.b
      };
    }
  }]);

  return Color;
}();

var color = Color$2;

var Color$1 = color;
/**
 * @fileoverview
 * Utilities for casting and comparing Scratch data-types.
 * Scratch behaves slightly differently from JavaScript in many respects,
 * and these differences should be encapsulated below.
 * For example, in Scratch, add(1, join("hello", world")) -> 1.
 * This is because "hello world" is cast to 0.
 * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
 * Use when coercing a value before computation.
 */

var Cast$1 = /*#__PURE__*/function () {
  function Cast() {
    _classCallCheck(this, Cast);
  }

  _createClass(Cast, null, [{
    key: "toNumber",
    value:
    /**
     * Scratch cast to number.
     * Treats NaN as 0.
     * In Scratch 2.0, this is captured by `interp.numArg.`
     * @param {*} value Value to cast to number.
     * @return {number} The Scratch-casted number value.
     */
    function toNumber(value) {
      // If value is already a number we don't need to coerce it with
      // Number().
      if (typeof value === 'number') {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        if (Number.isNaN(value)) {
          return 0;
        }

        return value;
      }

      var n = Number(value);

      if (Number.isNaN(n)) {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        return 0;
      }

      return n;
    }
    /**
     * Scratch cast to boolean.
     * In Scratch 2.0, this is captured by `interp.boolArg.`
     * Treats some string values differently from JavaScript.
     * @param {*} value Value to cast to boolean.
     * @return {boolean} The Scratch-casted boolean value.
     */

  }, {
    key: "toBoolean",
    value: function toBoolean(value) {
      // Already a boolean?
      if (typeof value === 'boolean') {
        return value;
      }

      if (typeof value === 'string') {
        // These specific strings are treated as false in Scratch.
        if (value === '' || value === '0' || value.toLowerCase() === 'false') {
          return false;
        } // All other strings treated as true.


        return true;
      } // Coerce other values and numbers.


      return Boolean(value);
    }
    /**
     * Scratch cast to string.
     * @param {*} value Value to cast to string.
     * @return {string} The Scratch-casted string value.
     */

  }, {
    key: "toString",
    value: function toString(value) {
      return String(value);
    }
    /**
     * Cast any Scratch argument to an RGB color array to be used for the renderer.
     * @param {*} value Value to convert to RGB color array.
     * @return {Array.<number>} [r,g,b], values between 0-255.
     */

  }, {
    key: "toRgbColorList",
    value: function toRgbColorList(value) {
      var color = Cast.toRgbColorObject(value);
      return [color.r, color.g, color.b];
    }
    /**
     * Cast any Scratch argument to an RGB color object to be used for the renderer.
     * @param {*} value Value to convert to RGB color object.
     * @return {RGBOject} [r,g,b], values between 0-255.
     */

  }, {
    key: "toRgbColorObject",
    value: function toRgbColorObject(value) {
      var color;

      if (typeof value === 'string' && value.substring(0, 1) === '#') {
        color = Color$1.hexToRgb(value); // If the color wasn't *actually* a hex color, cast to black

        if (!color) color = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
      } else {
        color = Color$1.decimalToRgb(Cast.toNumber(value));
      }

      return color;
    }
    /**
     * Determine if a Scratch argument is a white space string (or null / empty).
     * @param {*} val value to check.
     * @return {boolean} True if the argument is all white spaces or null / empty.
     */

  }, {
    key: "isWhiteSpace",
    value: function isWhiteSpace(val) {
      return val === null || typeof val === 'string' && val.trim().length === 0;
    }
    /**
     * Compare two values, using Scratch cast, case-insensitive string compare, etc.
     * In Scratch 2.0, this is captured by `interp.compare.`
     * @param {*} v1 First value to compare.
     * @param {*} v2 Second value to compare.
     * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
     */

  }, {
    key: "compare",
    value: function compare(v1, v2) {
      var n1 = Number(v1);
      var n2 = Number(v2);

      if (n1 === 0 && Cast.isWhiteSpace(v1)) {
        n1 = NaN;
      } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
        n2 = NaN;
      }

      if (isNaN(n1) || isNaN(n2)) {
        // At least one argument can't be converted to a number.
        // Scratch compares strings as case insensitive.
        var s1 = String(v1).toLowerCase();
        var s2 = String(v2).toLowerCase();

        if (s1 < s2) {
          return -1;
        } else if (s1 > s2) {
          return 1;
        }

        return 0;
      } // Handle the special case of Infinity


      if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
        return 0;
      } // Compare as numbers.


      return n1 - n2;
    }
    /**
     * Determine if a Scratch argument number represents a round integer.
     * @param {*} val Value to check.
     * @return {boolean} True if number looks like an integer.
     */

  }, {
    key: "isInt",
    value: function isInt(val) {
      // Values that are already numbers.
      if (typeof val === 'number') {
        if (isNaN(val)) {
          // NaN is considered an integer.
          return true;
        } // True if it's "round" (e.g., 2.0 and 2).


        return val === parseInt(val, 10);
      } else if (typeof val === 'boolean') {
        // `True` and `false` always represent integer after Scratch cast.
        return true;
      } else if (typeof val === 'string') {
        // If it contains a decimal point, don't consider it an int.
        return val.indexOf('.') < 0;
      }

      return false;
    }
  }, {
    key: "LIST_INVALID",
    get: function get() {
      return 'INVALID';
    }
  }, {
    key: "LIST_ALL",
    get: function get() {
      return 'ALL';
    }
    /**
     * Compute a 1-based index into a list, based on a Scratch argument.
     * Two special cases may be returned:
     * LIST_ALL: if the block is referring to all of the items in the list.
     * LIST_INVALID: if the index was invalid in any way.
     * @param {*} index Scratch arg, including 1-based numbers or special cases.
     * @param {number} length Length of the list.
     * @param {boolean} acceptAll Whether it should accept "all" or not.
     * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
     */

  }, {
    key: "toListIndex",
    value: function toListIndex(index, length, acceptAll) {
      if (typeof index !== 'number') {
        if (index === 'all') {
          return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
        }

        if (index === 'last') {
          if (length > 0) {
            return length;
          }

          return Cast.LIST_INVALID;
        } else if (index === 'random' || index === 'any') {
          if (length > 0) {
            return 1 + Math.floor(Math.random() * length);
          }

          return Cast.LIST_INVALID;
        }
      }

      index = Math.floor(Cast.toNumber(index));

      if (index < 1 || index > length) {
        return Cast.LIST_INVALID;
      }

      return index;
    }
  }]);

  return Cast;
}();

var cast = Cast$1;

var setupTranslations = function setupTranslations(formatMessage) {
  var extTranslations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var localeSetup = formatMessage.setup();
  var translations = {
    'ja': {
      'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーで回す',
      'legobluetooth.motorStop': '[PORT] モーターを止める',
      'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] 方向に [VALUE] [UNIT] 回す',
      'legobluetooth.motorGoDirectionToPosition': '[PORT] モーターを [DIRECTION] で位置 [POSITION] まで回す',
      'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] 方向に回す',
      'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
      'legobluetooth.getRelativePosition': '[PORT] 相対位置',
      'legobluetooth.getPosition': '[PORT] 位置',
      'legobluetooth.motorResetRelativePosition': '[PORT] 相対位置を [RELATIVE_POSITION] にリセットする',
      'legobluetooth.displayImageFor': '[MATRIX] を [DURATION] 秒間オンにする',
      'legobluetooth.displayImage': '[MATRIX] をオンにする',
      'legobluetooth.displayText': '[TEXT] を表示する',
      'legobluetooth.displayClear': 'すべてのピクセルをオフにする',
      'legobluetooth.displaySetBrightness': 'ピクセルの明るさを [BRIGHTNESS] %にする',
      'legobluetooth.displaySetPixel': '[X] , [Y] のピクセルの明るさを [BRIGHTNESS] %にする',
      'legobluetooth.centerButtonLights': 'センターボタンのライトを [COLOR] にする',
      'legobluetooth.ultrasonicLightUp': '[PORT] を [LIGHT0] [LIGHT1] [LIGHT2] [LIGHT3] でライトアップする',
      'legobluetooth.getColor': '[PORT] 色',
      'legobluetooth.getDistance': '[PORT] 距離',
      'legobluetooth.getForce': '[PORT] 圧力',
      'legobluetooth.getTilt': '[PORT] 傾き [XY]',
      'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
      'legobluetooth.getHubTilt': 'ハブの傾き [XYZ]',
      'legobluetooth.getAngle': '[AXIS] 角',
      'legobluetooth.getName': '名前',
      'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
      'legobluetooth.getBatteryLevel': '電池残量',
      'legobluetooth.rotations': '回転',
      'legobluetooth.degrees': '度',
      'legobluetooth.seconds': '秒',
      'legobluetooth.shortestPath': '最短経路',
      'legobluetooth.clockwise': '時計回り',
      'legobluetooth.counterclockwise': '反時計回り',
      'legobluetooth.black': '(0) 黒',
      'legobluetooth.pink': '(1) ピンク',
      'legobluetooth.purple': '(2) 紫',
      'legobluetooth.blue': '(3) 青',
      'legobluetooth.lightBlue': '(4) 水色',
      'legobluetooth.lightGreen': '(5) 明るい緑',
      'legobluetooth.green': '(6) 緑',
      'legobluetooth.yellow': '(7) 黄色',
      'legobluetooth.orange': '(8) オレンジ',
      'legobluetooth.red': '(9) 赤',
      'legobluetooth.white': '(10) 白',
      'legobluetooth.noColor': '(-1) 色なし',
      'legobluetooth.pitch': 'ピッチ',
      'legobluetooth.roll': 'ロール',
      'legobluetooth.yaw': 'ヨー'
    },
    'ja-Hira': {
      'legobluetooth.motorPWM': '[PORT] モーターを [POWER] %のパワーでまわす',
      'legobluetooth.motorStop': '[PORT] モーターをとめる',
      'legobluetooth.motorRunFor': '[PORT] モーターを [DIRECTION] ほうこうに [VALUE] [UNIT] まわす',
      'legobluetooth.motorGoDirectionToPosition': '[PORT] モーターを [DIRECTION] でいち [POSITION] までまわす',
      'legobluetooth.motorStart': '[PORT] モーターを [DIRECTION] ほうこうにまわす',
      'legobluetooth.motorSetSpeed': '[PORT] スピードを [SPEED] %にする',
      'legobluetooth.getRelativePosition': '[PORT] そうたいいち',
      'legobluetooth.getPosition': '[PORT] いち',
      'legobluetooth.motorResetRelativePosition': '[PORT] そうたいいちを [RELATIVE_POSITION] にリセットする',
      'legobluetooth.displayImageFor': '[MATRIX] を [DURATION] びょうかんオンにする',
      'legobluetooth.displayImage': '[MATRIX] をオンにする',
      'legobluetooth.displayText': '[TEXT] をひょうじする',
      'legobluetooth.displayClear': 'すべてのピクセルをオフにする',
      'legobluetooth.displaySetBrightness': 'ピクセルのあかるさを [BRIGHTNESS] %にする',
      'legobluetooth.displaySetPixel': '[X] , [Y] のピクセルのあかるさを [BRIGHTNESS] %にする',
      'legobluetooth.centerButtonLights': 'センターボタンのライトを [COLOR] にする',
      'legobluetooth.ultrasonicLightUp': '[PORT] を [LIGHT0] [LIGHT1] [LIGHT2] [LIGHT3] でライトアップする',
      'legobluetooth.getColor': '[PORT] いろ',
      'legobluetooth.getDistance': '[PORT] きょり',
      'legobluetooth.getForce': '[PORT] あつりょく',
      'legobluetooth.getTilt': '[PORT] かたむき [XY]',
      'legobluetooth.setHubLEDColor': 'ハブのLEDを [COLOR] にする',
      'legobluetooth.getHubTilt': 'ハブのかたむき [XYZ]',
      'legobluetooth.getAngle': '[AXIS] かく',
      'legobluetooth.getName': 'なまえ',
      'legobluetooth.getFirmwareVersion': 'ファームウェアバージョン',
      'legobluetooth.getBatteryLevel': 'でんちざんりょう',
      'legobluetooth.rotations': 'かいてん',
      'legobluetooth.degrees': 'ど',
      'legobluetooth.seconds': 'びょう',
      'legobluetooth.shortestPath': 'さいたんきょり',
      'legobluetooth.clockwise': 'とけいまわり',
      'legobluetooth.counterclockwise': 'はんとけいまわり',
      'legobluetooth.black': '(0) くろ',
      'legobluetooth.pink': '(1) ピンク',
      'legobluetooth.purple': '(2) むらさき',
      'legobluetooth.blue': '(3) あお',
      'legobluetooth.lightBlue': '(4) みずいろ',
      'legobluetooth.lightGreen': '(5) あかるいみどり',
      'legobluetooth.green': '(6) みどり',
      'legobluetooth.yellow': '(7) きいろ',
      'legobluetooth.orange': '(8) オレンジ',
      'legobluetooth.red': '(9) あか',
      'legobluetooth.white': '(10) しろ',
      'legobluetooth.noColor': '(-1) いろなし',
      'legobluetooth.pitch': 'ピッチ',
      'legobluetooth.roll': 'ロール',
      'legobluetooth.yaw': 'ヨー'
    }
  };

  for (var locale in translations) {
    if (extTranslations[locale]) {
      Object.assign(translations[locale], extTranslations[locale]);
    }

    if (!localeSetup.translations[locale]) {
      localeSetup.translations[locale] = {};
    }

    Object.assign(localeSetup.translations[locale], translations[locale]);
  }
};

var setupTranslations_1 = setupTranslations;

var ArgumentType = argumentType;
var BlockType = blockType;
var Cast = cast;
var _setupTranslations = setupTranslations_1;
var BLESendInterval = 100;

var waitPromise = function waitPromise() {
  return new Promise(function (resolve) {
    return window.setTimeout(resolve, BLESendInterval);
  });
};

var Color = {
  WHITE: 0x0013,
  RED: 0x0015,
  BLUE: 0x0017,
  YELLOW: 0x0018,
  BLACK: 0x001a,
  GREEN: 0x0025,
  BROWN: 0x006a,
  PURPLE: 0x010c,
  NOUGAT_BROWN: 0x0138,
  CYAN: 0x0142,
  NONE: -1
};
var Pants = {
  NONE: 0x00,
  BEE: 0x03,
  LUIGI: 0x05,
  FROG: 0x06,
  TANOOKI: 0x0a,
  PROPELLER: 0x0c,
  CAT: 0x11,
  FIRE: 0x12,
  PENGUIN: 0x14,
  MARIO: 0x21,
  BUILDER: 0x22
};
var PortId = {
  COLOR_BARCODE: 0x01,
  PANTS: 0x02
};

var MarioBaseBlocks$1 = /*#__PURE__*/function () {
  function MarioBaseBlocks(peripheral) {
    _classCallCheck(this, MarioBaseBlocks);

    this._peripheral = peripheral;
  }

  _createClass(MarioBaseBlocks, [{
    key: "getBlocks",
    value: function getBlocks(formatMessage) {
      return [{
        opcode: 'whenBarcode',
        text: formatMessage({
          id: 'legomario.whenBarcode',
          default: 'when barcode is [BARCODE]'
        }),
        blockType: BlockType.HAT,
        arguments: {
          BARCODE: {
            type: ArgumentType.NUMBER,
            defaultValue: 2
          }
        }
      }, {
        opcode: 'whenAnyBarcode',
        text: formatMessage({
          id: 'legomario.whenAnyBarcode',
          default: 'when any barcode is found'
        }),
        blockType: BlockType.HAT
      }, {
        opcode: 'getBarcode',
        text: formatMessage({
          id: 'legomario.getBarcode',
          default: 'barcode'
        }),
        blockType: BlockType.REPORTER
      }, '---', {
        opcode: 'whenColor',
        text: formatMessage({
          id: 'legomario.whenColor',
          default: 'when color is [SENSOR_COLOR]'
        }),
        blockType: BlockType.HAT,
        arguments: {
          SENSOR_COLOR: {
            type: ArgumentType.NUMBER,
            menu: 'SENSOR_COLOR',
            defaultValue: Color.RED
          }
        }
      }, {
        opcode: 'isColor',
        text: formatMessage({
          id: 'legomario.isColor',
          default: 'color is [SENSOR_COLOR] ?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          SENSOR_COLOR: {
            type: ArgumentType.NUMBER,
            menu: 'SENSOR_COLOR',
            defaultValue: Color.RED
          }
        }
      }, {
        opcode: 'getColor',
        text: formatMessage({
          id: 'legomario.getColor',
          default: 'color'
        }),
        blockType: BlockType.REPORTER
      }, '---', {
        opcode: 'whenPants',
        text: formatMessage({
          id: 'legomario.whenPants',
          default: 'when pants is [PANTS]'
        }),
        blockType: BlockType.HAT,
        arguments: {
          PANTS: {
            type: ArgumentType.NUMBER,
            menu: 'PANTS',
            defaultValue: Pants.FIRE
          }
        }
      }, {
        opcode: 'isPants',
        text: formatMessage({
          id: 'legomario.isPants',
          default: 'pants is [PANTS] ?'
        }),
        blockType: BlockType.BOOLEAN,
        arguments: {
          PANTS: {
            type: ArgumentType.NUMBER,
            menu: 'PANTS',
            defaultValue: Pants.FIRE
          }
        }
      }, {
        opcode: 'getPants',
        text: formatMessage({
          id: 'legomario.getPants',
          default: 'pants'
        }),
        blockType: BlockType.REPORTER
      }, '---', {
        opcode: 'setVolume',
        text: formatMessage({
          id: 'legomario.setVolume',
          default: 'set volume to [VOLUME] %'
        }),
        blockType: BlockType.COMMAND,
        arguments: {
          VOLUME: {
            type: ArgumentType.NUMBER,
            defaultValue: 0
          }
        }
      }];
    }
  }, {
    key: "getMenus",
    value: function getMenus(formatMessage) {
      return {
        SENSOR_COLOR: {
          acceptReporters: false,
          items: [{
            text: formatMessage({
              id: 'legomario.white',
              default: '(19) White'
            }),
            value: String(Color.WHITE)
          }, {
            text: formatMessage({
              id: 'legomario.red',
              default: '(21) Red'
            }),
            value: String(Color.RED)
          }, {
            text: formatMessage({
              id: 'legomario.blue',
              default: '(23) Blue'
            }),
            value: String(Color.BLUE)
          }, {
            text: formatMessage({
              id: 'legomario.yellow',
              default: '(24) Yellow'
            }),
            value: String(Color.YELLOW)
          }, {
            text: formatMessage({
              id: 'legomario.black',
              default: '(26) Black'
            }),
            value: String(Color.BLACK)
          }, {
            text: formatMessage({
              id: 'legomario.green',
              default: '(37) Green'
            }),
            value: String(Color.GREEN)
          }, {
            text: formatMessage({
              id: 'legomario.brown',
              default: '(106) Brown'
            }),
            value: String(Color.BROWN)
          }, {
            text: formatMessage({
              id: 'legomario.purple',
              default: '(268) Purple'
            }),
            value: String(Color.PURPLE)
          }, {
            text: formatMessage({
              id: 'legomario.nougatBrown',
              default: '(312) Nougat Brown'
            }),
            value: String(Color.NOUGAT_BROWN)
          }, {
            text: formatMessage({
              id: 'legomario.cyan',
              default: '(322) Cyan'
            }),
            value: String(Color.CYAN)
          }, {
            text: formatMessage({
              id: 'legobluetooth.noColor',
              default: '(-1) No color'
            }),
            value: String(Color.NONE)
          }]
        },
        PANTS: {
          acceptReporters: false,
          items: [{
            text: formatMessage({
              id: 'legomario.pants.none',
              default: '(0) None'
            }),
            value: String(Pants.NONE)
          }, {
            text: formatMessage({
              id: 'legomario.pants.bee',
              default: '(3) Bee'
            }),
            value: String(Pants.BEE)
          }, {
            text: formatMessage({
              id: 'legomario.pants.luigi',
              default: '(5) Luigi'
            }),
            value: String(Pants.LUIGI)
          }, {
            text: formatMessage({
              id: 'legomario.pants.frog',
              default: '(6) Frog'
            }),
            value: String(Pants.FROG)
          }, {
            text: formatMessage({
              id: 'legomario.pants.tanooki',
              default: '(10) Tanooki'
            }),
            value: String(Pants.TANOOKI)
          }, {
            text: formatMessage({
              id: 'legomario.pants.propeller',
              default: '(12) Propeller'
            }),
            value: String(Pants.PROPELLER)
          }, {
            text: formatMessage({
              id: 'legomario.pants.cat',
              default: '(17) Cat'
            }),
            value: String(Pants.CAT)
          }, {
            text: formatMessage({
              id: 'legomario.pants.fire',
              default: '(18) Fire'
            }),
            value: String(Pants.FIRE)
          }, {
            text: formatMessage({
              id: 'legomario.pants.penguin',
              default: '(20) Penguin'
            }),
            value: String(Pants.PENGUIN)
          }, {
            text: formatMessage({
              id: 'legomario.pants.mario',
              default: '(33) Mario'
            }),
            value: String(Pants.MARIO)
          }, {
            text: formatMessage({
              id: 'legomario.pants.builder',
              default: '(34) Builder'
            }),
            value: String(Pants.BUILDER)
          }]
        }
      };
    }
  }, {
    key: "whenBarcode",
    value: function whenBarcode(args) {
      return this.getBarcode() == Cast.toNumber(args.BARCODE);
    }
  }, {
    key: "whenAnyBarcode",
    value: function whenAnyBarcode() {
      return this.getBarcode() != -1;
    }
  }, {
    key: "getBarcode",
    value: function getBarcode() {
      return this._getSensorValue(PortId.COLOR_BARCODE, 'barcode', -1);
    }
  }, {
    key: "whenColor",
    value: function whenColor(args) {
      return this.getColor() == args.SENSOR_COLOR;
    }
  }, {
    key: "isColor",
    value: function isColor(args) {
      return this.getColor() == args.SENSOR_COLOR;
    }
  }, {
    key: "getColor",
    value: function getColor() {
      return this._getSensorValue(PortId.COLOR_BARCODE, 'color', Color.NONE);
    }
  }, {
    key: "whenPants",
    value: function whenPants(args) {
      return this.getPants() == args.PANTS;
    }
  }, {
    key: "isPants",
    value: function isPants(args) {
      return this.getPants() == args.PANTS;
    }
  }, {
    key: "getPants",
    value: function getPants() {
      return this._getSensorValue(PortId.PANTS, 'pants', Pants.NONE);
    }
  }, {
    key: "setVolume",
    value: function setVolume(args) {
      var volume = Cast.toNumber(args.VOLUME);
      return this._peripheral.setVolume(volume).then(waitPromise);
    }
  }, {
    key: "_getSensorValue",
    value: function _getSensorValue(portId, key, defaultValue) {
      var value = this._peripheral.inputValue(portId, key);

      return value != null ? value : defaultValue;
    }
  }, {
    key: "setupTranslations",
    value: function setupTranslations(formatMessage) {
      _setupTranslations(formatMessage, {
        'ja': {
          'legomario.whenBarcode': 'バーコードが [BARCODE] のとき',
          'legomario.whenAnyBarcode': 'バーコードを見つけたとき',
          'legomario.getBarcode': 'バーコード',
          'legomario.whenColor': '色が [SENSOR_COLOR] のとき',
          'legomario.isColor': '色が [SENSOR_COLOR]',
          'legomario.getColor': '色',
          'legomario.whenPants': 'ズボンが [PANTS] のとき',
          'legomario.isPants': 'ズボンが [PANTS]',
          'legomario.getPants': 'ズボン',
          'legomario.setVolume': '音量を [VOLUME] %にする',
          'legomario.white': '(19) 白',
          'legomario.red': '(21) 赤',
          'legomario.blue': '(23) 青',
          'legomario.yellow': '(24) 黄色',
          'legomario.black': '(26) 黒',
          'legomario.green': '(37) 緑',
          'legomario.brown': '(106) 茶色',
          'legomario.purple': '(268) 紫',
          'legomario.nougatBrown': '(312) 薄茶色',
          'legomario.cyan': '(322) シアン',
          'legomario.pants.none': '(0) なし',
          'legomario.pants.bee': '(3) ハチ',
          'legomario.pants.luigi': '(5) ルイージ',
          'legomario.pants.frog': '(6) カエル',
          'legomario.pants.tanooki': '(10) タヌキ',
          'legomario.pants.propeller': '(12) プロペラ',
          'legomario.pants.cat': '(17) ネコ',
          'legomario.pants.fire': '(18) ファイア',
          'legomario.pants.penguin': '(20) ペンギン',
          'legomario.pants.mario': '(33) マリオ',
          'legomario.pants.builder': '(34) ビルダー'
        },
        'ja-Hira': {
          'legomario.whenBarcode': 'バーコードが [BARCODE] のとき',
          'legomario.whenAnyBarcode': 'バーコードをみつけたとき',
          'legomario.getBarcode': 'バーコード',
          'legomario.whenColor': 'いろが [SENSOR_COLOR] のとき',
          'legomario.isColor': 'いろが [SENSOR_COLOR]',
          'legomario.getColor': 'いろ',
          'legomario.whenPants': 'ズボンが [PANTS] のとき',
          'legomario.isPants': 'ズボンが [PANTS]',
          'legomario.getPants': 'ズボン',
          'legomario.setVolume': 'おんりょうを [VOLUME] %にする',
          'legomario.white': '(19) しろ',
          'legomario.red': '(21) あか',
          'legomario.blue': '(23) あお',
          'legomario.yellow': '(24) きいろ',
          'legomario.black': '(26) くろ',
          'legomario.green': '(37) みどり',
          'legomario.brown': '(106) ちゃいろ',
          'legomario.purple': '(268) むらさき',
          'legomario.nougatBrown': '(312) うすちゃいろ',
          'legomario.cyan': '(322) シアン',
          'legomario.pants.none': '(0) なし',
          'legomario.pants.bee': '(3) ハチ',
          'legomario.pants.luigi': '(5) ルイージ',
          'legomario.pants.frog': '(6) カエル',
          'legomario.pants.tanooki': '(10) タヌキ',
          'legomario.pants.propeller': '(12) プロペラ',
          'legomario.pants.cat': '(17) ネコ',
          'legomario.pants.fire': '(18) ファイア',
          'legomario.pants.penguin': '(20) ペンギン',
          'legomario.pants.mario': '(33) マリオ',
          'legomario.pants.builder': '(34) ビルダー'
        }
      });
    }
  }]);

  return MarioBaseBlocks;
}();

var marioBaseBlocks = MarioBaseBlocks$1;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var JSONRPC$1 = /*#__PURE__*/function () {
  function JSONRPC() {
    _classCallCheck(this, JSONRPC);

    this._requestID = 0;
    this._openRequests = {};
  }
  /**
   * Make an RPC request and retrieve the result.
   * @param {string} method - the remote method to call.
   * @param {object} params - the parameters to pass to the remote method.
   * @returns {Promise} - a promise for the result of the call.
   */


  _createClass(JSONRPC, [{
    key: "sendRemoteRequest",
    value: function sendRemoteRequest(method, params) {
      var _this = this;

      var requestID = this._requestID++;
      var promise = new Promise(function (resolve, reject) {
        _this._openRequests[requestID] = {
          resolve: resolve,
          reject: reject
        };
      });

      this._sendRequest(method, params, requestID);

      return promise;
    }
    /**
     * Make an RPC notification with no expectation of a result or callback.
     * @param {string} method - the remote method to call.
     * @param {object} params - the parameters to pass to the remote method.
     */

  }, {
    key: "sendRemoteNotification",
    value: function sendRemoteNotification(method, params) {
      this._sendRequest(method, params);
    }
    /**
     * Handle an RPC request from remote, should return a result or Promise for result, if appropriate.
     * @param {string} method - the method requested by the remote caller.
     * @param {object} params - the parameters sent with the remote caller's request.
     */

  }, {
    key: "didReceiveCall",
    value: function
      /* method , params */
    didReceiveCall() {
      throw new Error('Must override didReceiveCall');
    }
  }, {
    key: "_sendMessage",
    value: function
      /* jsonMessageObject */
    _sendMessage() {
      throw new Error('Must override _sendMessage');
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(method, params, id) {
      var request = {
        jsonrpc: '2.0',
        method: method,
        params: params
      };

      if (id !== null) {
        request.id = id;
      }

      this._sendMessage(request);
    }
  }, {
    key: "_handleMessage",
    value: function _handleMessage(json) {
      if (json.jsonrpc !== '2.0') {
        throw new Error("Bad or missing JSON-RPC version in message: ".concat(json));
      }

      if (json.hasOwnProperty('method')) {
        this._handleRequest(json);
      } else {
        this._handleResponse(json);
      }
    }
  }, {
    key: "_sendResponse",
    value: function _sendResponse(id, result, error) {
      var response = {
        jsonrpc: '2.0',
        id: id
      };

      if (error) {
        response.error = error;
      } else {
        response.result = result || null;
      }

      this._sendMessage(response);
    }
  }, {
    key: "_handleResponse",
    value: function _handleResponse(json) {
      var result = json.result,
          error = json.error,
          id = json.id;
      var openRequest = this._openRequests[id];
      delete this._openRequests[id];

      if (openRequest) {
        if (error) {
          openRequest.reject(error);
        } else {
          openRequest.resolve(result);
        }
      }
    }
  }, {
    key: "_handleRequest",
    value: function _handleRequest(json) {
      var _this2 = this;

      var method = json.method,
          params = json.params,
          id = json.id;
      var rawResult = this.didReceiveCall(method, params);

      if (id) {
        Promise.resolve(rawResult).then(function (result) {
          _this2._sendResponse(id, result);
        }, function (error) {
          _this2._sendResponse(id, null, error);
        });
      }
    }
  }]);

  return JSONRPC;
}();

var jsonrpc = JSONRPC$1;

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var JSONRPC = jsonrpc;

var BLE$1 = /*#__PURE__*/function (_JSONRPC) {
  _inherits(BLE, _JSONRPC);

  var _super = _createSuper$2(BLE);

  /**
   * A BLE peripheral socket object.  It handles connecting, over web sockets, to
   * BLE peripherals, and reading and writing data to them.
   * @param {Runtime} runtime - the Runtime for sending/receiving GUI update events.
   * @param {string} extensionId - the id of the extension using this socket.
   * @param {object} peripheralOptions - the list of options for peripheral discovery.
   * @param {object} connectCallback - a callback for connection.
   * @param {object} resetCallback - a callback for resetting extension state.
   */
  function BLE(runtime, extensionId, peripheralOptions, connectCallback) {
    var _this;

    var resetCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, BLE);

    _this = _super.call(this);
    _this._socket = runtime.getScratchLinkSocket('BLE');

    _this._socket.setOnOpen(_this.requestPeripheral.bind(_assertThisInitialized(_this)));

    _this._socket.setOnClose(_this.handleDisconnectError.bind(_assertThisInitialized(_this)));

    _this._socket.setOnError(_this._handleRequestError.bind(_assertThisInitialized(_this)));

    _this._socket.setHandleMessage(_this._handleMessage.bind(_assertThisInitialized(_this)));

    _this._sendMessage = _this._socket.sendMessage.bind(_this._socket);
    _this._availablePeripherals = {};
    _this._connectCallback = connectCallback;
    _this._connected = false;
    _this._characteristicDidChangeCallback = null;
    _this._resetCallback = resetCallback;
    _this._discoverTimeoutID = null;
    _this._extensionId = extensionId;
    _this._peripheralOptions = peripheralOptions;
    _this._runtime = runtime;

    _this._socket.open();

    return _this;
  }
  /**
   * Request connection to the peripheral.
   * If the web socket is not yet open, request when the socket promise resolves.
   */


  _createClass(BLE, [{
    key: "requestPeripheral",
    value: function requestPeripheral() {
      var _this2 = this;

      this._availablePeripherals = {};

      if (this._discoverTimeoutID) {
        window.clearTimeout(this._discoverTimeoutID);
      }

      this._discoverTimeoutID = window.setTimeout(this._handleDiscoverTimeout.bind(this), 15000);
      this.sendRemoteRequest('discover', this._peripheralOptions).catch(function (e) {
        _this2._handleRequestError(e);
      });
    }
    /**
     * Try connecting to the input peripheral id, and then call the connect
     * callback if connection is successful.
     * @param {number} id - the id of the peripheral to connect to
     */

  }, {
    key: "connectPeripheral",
    value: function connectPeripheral(id) {
      var _this3 = this;

      this.sendRemoteRequest('connect', {
        peripheralId: id
      }).then(function () {
        _this3._connected = true;

        _this3._runtime.emit(_this3._runtime.constructor.PERIPHERAL_CONNECTED);

        _this3._connectCallback();
      }).catch(function (e) {
        _this3._handleRequestError(e);
      });
    }
    /**
     * Close the websocket.
     */

  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._connected) {
        this._connected = false;
      }

      if (this._socket.isOpen()) {
        this._socket.close();
      }

      if (this._discoverTimeoutID) {
        window.clearTimeout(this._discoverTimeoutID);
      } // Sets connection status icon to orange


      this._runtime.emit(this._runtime.constructor.PERIPHERAL_DISCONNECTED);
    }
    /**
     * @return {bool} whether the peripheral is connected.
     */

  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._connected;
    }
    /**
     * Start receiving notifications from the specified ble service.
     * @param {number} serviceId - the ble service to read.
     * @param {number} characteristicId - the ble characteristic to get notifications from.
     * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
     * @return {Promise} - a promise from the remote startNotifications request.
     */

  }, {
    key: "startNotifications",
    value: function startNotifications(serviceId, characteristicId) {
      var _this4 = this;

      var onCharacteristicChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId
      };
      this._characteristicDidChangeCallback = onCharacteristicChanged;
      return this.sendRemoteRequest('startNotifications', params).catch(function (e) {
        _this4.handleDisconnectError(e);
      });
    }
    /**
     * Read from the specified ble service.
     * @param {number} serviceId - the ble service to read.
     * @param {number} characteristicId - the ble characteristic to read.
     * @param {boolean} optStartNotifications - whether to start receiving characteristic change notifications.
     * @param {object} onCharacteristicChanged - callback for characteristic change notifications.
     * @return {Promise} - a promise from the remote read request.
     */

  }, {
    key: "read",
    value: function read(serviceId, characteristicId) {
      var _this5 = this;

      var optStartNotifications = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var onCharacteristicChanged = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId
      };

      if (optStartNotifications) {
        params.startNotifications = true;
      }

      if (onCharacteristicChanged) {
        this._characteristicDidChangeCallback = onCharacteristicChanged;
      }

      return this.sendRemoteRequest('read', params).catch(function (e) {
        _this5.handleDisconnectError(e);
      });
    }
    /**
     * Write data to the specified ble service.
     * @param {number} serviceId - the ble service to write.
     * @param {number} characteristicId - the ble characteristic to write.
     * @param {string} message - the message to send.
     * @param {string} encoding - the message encoding type.
     * @param {boolean} withResponse - if true, resolve after peripheral's response.
     * @return {Promise} - a promise from the remote send request.
     */

  }, {
    key: "write",
    value: function write(serviceId, characteristicId, message) {
      var _this6 = this;

      var encoding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var withResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var params = {
        serviceId: serviceId,
        characteristicId: characteristicId,
        message: message
      };

      if (encoding) {
        params.encoding = encoding;
      }

      if (withResponse !== null) {
        params.withResponse = withResponse;
      }

      return this.sendRemoteRequest('write', params).catch(function (e) {
        _this6.handleDisconnectError(e);
      });
    }
    /**
     * Handle a received call from the socket.
     * @param {string} method - a received method label.
     * @param {object} params - a received list of parameters.
     * @return {object} - optional return value.
     */

  }, {
    key: "didReceiveCall",
    value: function didReceiveCall(method, params) {
      switch (method) {
        case 'didDiscoverPeripheral':
          this._availablePeripherals[params.peripheralId] = params;

          this._runtime.emit(this._runtime.constructor.PERIPHERAL_LIST_UPDATE, this._availablePeripherals);

          if (this._discoverTimeoutID) {
            window.clearTimeout(this._discoverTimeoutID);
          }

          break;

        case 'userDidPickPeripheral':
          this._availablePeripherals[params.peripheralId] = params;

          this._runtime.emit(this._runtime.constructor.USER_PICKED_PERIPHERAL, this._availablePeripherals);

          if (this._discoverTimeoutID) {
            window.clearTimeout(this._discoverTimeoutID);
          }

          break;

        case 'userDidNotPickPeripheral':
          this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);

          if (this._discoverTimeoutID) {
            window.clearTimeout(this._discoverTimeoutID);
          }

          break;

        case 'characteristicDidChange':
          if (this._characteristicDidChangeCallback) {
            this._characteristicDidChangeCallback(params.message);
          }

          break;

        case 'ping':
          return 42;
      }
    }
    /**
     * Handle an error resulting from losing connection to a peripheral.
     *
     * This could be due to:
     * - battery depletion
     * - going out of bluetooth range
     * - being powered down
     *
     * Disconnect the socket, and if the extension using this socket has a
     * reset callback, call it. Finally, emit an error to the runtime.
     */

  }, {
    key: "handleDisconnectError",
    value: function
      /* e */
    handleDisconnectError() {
      // log.error(`BLE error: ${JSON.stringify(e)}`);
      if (!this._connected) return;
      this.disconnect();

      if (this._resetCallback) {
        this._resetCallback();
      }

      this._runtime.emit(this._runtime.constructor.PERIPHERAL_CONNECTION_LOST_ERROR, {
        message: "Scratch lost connection to",
        extensionId: this._extensionId
      });
    }
  }, {
    key: "_handleRequestError",
    value: function
      /* e */
    _handleRequestError() {
      // log.error(`BLE error: ${JSON.stringify(e)}`);
      this._runtime.emit(this._runtime.constructor.PERIPHERAL_REQUEST_ERROR, {
        message: "Scratch lost connection to",
        extensionId: this._extensionId
      });
    }
  }, {
    key: "_handleDiscoverTimeout",
    value: function _handleDiscoverTimeout() {
      if (this._discoverTimeoutID) {
        window.clearTimeout(this._discoverTimeoutID);
      }

      this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
    }
  }]);

  return BLE;
}(JSONRPC);

var ble = BLE$1;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;

function init() {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray(b64) {
  if (!inited) {
    init();
  }

  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  } // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice


  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0; // base64 is 4/3 + up to two characters of the original data

  arr = new Arr(len * 3 / 4 - placeHolders); // if there are placeholders, only get up to the last complete 4 chars

  l = placeHolders > 0 ? len - 4 : len;
  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];

  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }

  return output.join('');
}

function fromByteArray(uint8) {
  if (!inited) {
    init();
  }

  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3
  // go through the array every three bytes, we'll deal with trailing stuff later

  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  } // pad the end with zeros, but make sure to not forget the extra bytes


  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);
  return parts.join('');
}

function read(buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;

  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;

  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }

  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
}
function write(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);

    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }

    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }

    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;

  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;
var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var INSPECT_MAX_BYTES = 50;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */

Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;
/*
 * Export kMaxLength after typed array support is determined.
 */

kMaxLength();

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }

    that.length = length;
  }

  return that;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */


function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  } // Common case.


  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }

    return allocUnsafe(this, arg);
  }

  return from(this, arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation
// TODO: Legacy, not needed anymore. Remove in next major version.

Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/


Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) ;
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);

  if (size <= 0) {
    return createBuffer(that, size);
  }

  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }

  return createBuffer(that, size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/


Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }

  return that;
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */


Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */


Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);
  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }

  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }

  return that;
}

function fromObject(that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }

  return length | 0;
}
Buffer.isBuffer = isBuffer;

function internalIsBuffer(b) {
  return !!(b != null && b._isBuffer);
}

Buffer.compare = function compare(a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;
  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;

    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

function byteLength(string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0; // Use a for loop to avoid recursion

  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;

      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;

      case 'hex':
        return len >>> 1;

      case 'base64':
        return base64ToBytes(string).length;

      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8

        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}

Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.
  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

  if (start === undefined || start < 0) {
    start = 0;
  } // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.


  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
} // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.


Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;

  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }

  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;

  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }

  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;

  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }

  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = INSPECT_MAX_BYTES;

  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }

  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = target ? target.length : 0;
  }

  if (thisStart === undefined) {
    thisStart = 0;
  }

  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }

  if (thisStart >= thisEnd) {
    return -1;
  }

  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;
  if (this === target) return 0;
  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);
  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
}; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf


function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1; // Normalize byteOffset

  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }

  byteOffset = +byteOffset; // Coerce to Number.

  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  } // Normalize byteOffset: negative offsets start from the end of the buffer


  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  } // Normalize val


  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  } // Finally, search either indexOf (if dir is true) or lastIndexOf


  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }

    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]

    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }

    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();

    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }

      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;

  if (dir) {
    var foundIndex = -1;

    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

    for (i = byteOffset; i >= 0; i--) {
      var found = true;

      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }

      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;

  if (!length) {
    length = remaining;
  } else {
    length = Number(length);

    if (length > remaining) {
      length = remaining;
    }
  } // must be an even number of digits


  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }

  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    } // legacy write(string, encoding, offset, length) - remove in v0.13

  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';
  var loweredCase = false;

  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf);
  } else {
    return fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];
  var i = start;

  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }

          break;

        case 2:
          secondByte = buf[i + 1];

          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }

          break;

        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];

          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }

      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
} // Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety


var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;

  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  } // Decode in chunks to avoid "call stack size exceeded".


  var res = '';
  var i = 0;

  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }

  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }

  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }

  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;
  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;
  var out = '';

  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }

  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';

  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }

  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */


function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;

  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var val = this[offset];
  var mul = 1;
  var i = 0;

  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);
  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];

  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }

  mul *= 0x80;
  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;

  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;

  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;

  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;

  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);
    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;

  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }

    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }

  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }

  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }

  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }

  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }

  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }

  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
}; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
}; // Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])


Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }

    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }

    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
}; // HELPER FUNCTIONS
// ================


var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

  if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

  while (str.length % 4 !== 0) {
    str = str + '=';
  }

  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }

  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];

  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;
    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
} // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually


function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
}

function isFastBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
} // For Node v0.10 support. Remove this eventually.


function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
}

var browserAtob = {exports: {}};

(function (module) {
  (function (w) {

    function findBest(atobNative) {
      // normal window
      if ('function' === typeof atobNative) {
        return atobNative;
      } // browserify (web worker)


      if ('function' === typeof Buffer) {
        return function atobBrowserify(a) {
          //!! Deliberately using an API that's deprecated in node.js because
          //!! this file is for browsers and we expect them to cope with it.
          //!! Discussion: github.com/node-browser-compat/atob/pull/9
          return new Buffer(a, 'base64').toString('binary');
        };
      } // ios web worker with base64js


      if ('object' === _typeof$1(w.base64js)) {
        // bufferToBinaryString
        // https://git.coolaj86.com/coolaj86/unibabel.js/blob/master/index.js#L50
        return function atobWebWorker_iOS(a) {
          var buf = w.base64js.b64ToByteArray(a);
          return Array.prototype.map.call(buf, function (ch) {
            return String.fromCharCode(ch);
          }).join('');
        };
      }

      return function () {
        // ios web worker without base64js
        throw new Error("You're probably in an old browser or an iOS webworker." + " It might help to include beatgammit's base64-js.");
      };
    }

    var atobBest = findBest(w.atob);
    w.atob = atobBest;

    if (module && module.exports) {
      module.exports = atobBest;
    }
  })(window);
})(browserAtob);

var btoa$1 = {exports: {}};

(function () {

  function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  }

  btoa$1.exports = btoa;
})();

var atob = browserAtob.exports;
var btoa = btoa$1.exports;

var Base64Util$1 = /*#__PURE__*/function () {
  function Base64Util() {
    _classCallCheck(this, Base64Util);
  }

  _createClass(Base64Util, null, [{
    key: "base64ToUint8Array",
    value:
    /**
     * Convert a base64 encoded string to a Uint8Array.
     * @param {string} base64 - a base64 encoded string.
     * @return {Uint8Array} - a decoded Uint8Array.
     */
    function base64ToUint8Array(base64) {
      var binaryString = atob(base64);
      var len = binaryString.length;
      var array = new Uint8Array(len);

      for (var i = 0; i < len; i++) {
        array[i] = binaryString.charCodeAt(i);
      }

      return array;
    }
    /**
     * Convert a Uint8Array to a base64 encoded string.
     * @param {Uint8Array} array - the array to convert.
     * @return {string} - the base64 encoded string.
     */

  }, {
    key: "uint8ArrayToBase64",
    value: function uint8ArrayToBase64(array) {
      var base64 = btoa(String.fromCharCode.apply(null, array));
      return base64;
    }
    /**
    * Convert an array buffer to a base64 encoded string.
    * @param {array} buffer - an array buffer to convert.
    * @return {string} - the base64 encoded string.
    */

  }, {
    key: "arrayBufferToBase64",
    value: function arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;

      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return btoa(binary);
    }
  }]);

  return Base64Util;
}();

var base64Util = Base64Util$1;

var MathUtil$2 = /*#__PURE__*/function () {
  function MathUtil() {
    _classCallCheck(this, MathUtil);
  }

  _createClass(MathUtil, null, [{
    key: "degToRad",
    value:
    /**
     * Convert a value from degrees to radians.
     * @param {!number} deg Value in degrees.
     * @return {!number} Equivalent value in radians.
     */
    function degToRad(deg) {
      return deg * Math.PI / 180;
    }
    /**
     * Convert a value from radians to degrees.
     * @param {!number} rad Value in radians.
     * @return {!number} Equivalent value in degrees.
     */

  }, {
    key: "radToDeg",
    value: function radToDeg(rad) {
      return rad * 180 / Math.PI;
    }
    /**
     * Clamp a number between two limits.
     * If n < min, return min. If n > max, return max. Else, return n.
     * @param {!number} n Number to clamp.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n clamped to min and max.
     */

  }, {
    key: "clamp",
    value: function clamp(n, min, max) {
      return Math.min(Math.max(n, min), max);
    }
    /**
     * Keep a number between two limits, wrapping "extra" into the range.
     * e.g., wrapClamp(7, 1, 5) == 2
     * wrapClamp(0, 1, 5) == 5
     * wrapClamp(-11, -10, 6) == 6, etc.
     * @param {!number} n Number to wrap.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n wrapped between min and max.
     */

  }, {
    key: "wrapClamp",
    value: function wrapClamp(n, min, max) {
      var range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
    }
    /**
     * Convert a value from tan function in degrees.
     * @param {!number} angle in degrees
     * @return {!number} Correct tan value
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      angle = angle % 360;

      switch (angle) {
        case -270:
        case 90:
          return Infinity;

        case -90:
        case 270:
          return -Infinity;

        default:
          return parseFloat(Math.tan(Math.PI * angle / 180).toFixed(10));
      }
    }
    /**
     * Given an array of unique numbers,
     * returns a reduced array such that each element of the reduced array
     * represents the position of that element in a sorted version of the
     * original array.
     * E.g. [5, 19. 13, 1] => [1, 3, 2, 0]
     * @param {Array<number>} elts The elements to sort and reduce
     * @return {Array<number>} The array of reduced orderings
     */

  }, {
    key: "reducedSortOrdering",
    value: function reducedSortOrdering(elts) {
      var sorted = elts.slice(0).sort(function (a, b) {
        return a - b;
      });
      return elts.map(function (e) {
        return sorted.indexOf(e);
      });
    }
    /**
     * Return a random number given an inclusive range and a number in that
     * range that should be excluded.
     *
     * For instance, (1, 5, 3) will only pick 1, 2, 4, or 5 (with equal
     * probability)
     *
     * @param {number} lower - The lower bound (inlcusive)
     * @param {number} upper - The upper bound (inclusive), such that lower <= upper
     * @param {number} excluded - The number to exclude (MUST be in the range)
     * @return {number} A random integer in the range [lower, upper] that is not "excluded"
     */

  }, {
    key: "inclusiveRandIntWithout",
    value: function inclusiveRandIntWithout(lower, upper, excluded) {
      // Note that subtraction is the number of items in the
      // inclusive range [lower, upper] minus 1 already
      // (e.g. in the set {3, 4, 5}, 5 - 3 = 2).
      var possibleOptions = upper - lower;
      var randInt = lower + Math.floor(Math.random() * possibleOptions);

      if (randInt >= excluded) {
        return randInt + 1;
      }

      return randInt;
    }
    /**
     * Scales a number from one range to another.
     * @param {number} i number to be scaled
     * @param {number} iMin input range minimum
     * @param {number} iMax input range maximum
     * @param {number} oMin output range minimum
     * @param {number} oMax output range maximum
     * @return {number} scaled number
     */

  }, {
    key: "scale",
    value: function scale(i, iMin, iMax, oMin, oMax) {
      var p = (i - iMin) / (iMax - iMin);
      return p * (oMax - oMin) + oMin;
    }
  }]);

  return MathUtil;
}();

var mathUtil = MathUtil$2;

var Timer$1 = /*#__PURE__*/function () {
  function Timer() {
    var nowObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Timer.nowObj;

    _classCallCheck(this, Timer);

    /**
     * Used to store the start time of a timer action.
     * Updated when calling `timer.start`.
     */
    this.startTime = 0;
    /**
     * Used to pass custom logic for determining the value for "now",
     * which is sometimes useful for compatibility with Scratch 2
     */

    this.nowObj = nowObj;
  }
  /**
   * Disable use of self.performance for now as it results in lower performance
   * However, instancing it like below (caching the self.performance to a local variable) negates most of the issues.
   * @type {boolean}
   */


  _createClass(Timer, [{
    key: "time",
    value:
    /**
     * Return the currently known absolute time, in ms precision.
     * @returns {number} ms elapsed since 1 January 1970 00:00:00 UTC.
     */
    function time() {
      return this.nowObj.now();
    }
    /**
     * Returns a time accurate relative to other times produced by this function.
     * If possible, will use sub-millisecond precision.
     * If not, will use millisecond precision.
     * Not guaranteed to produce the same absolute values per-system.
     * @returns {number} ms-scale accurate time relative to other relative times.
     */

  }, {
    key: "relativeTime",
    value: function relativeTime() {
      return this.nowObj.now();
    }
    /**
     * Start a timer for measuring elapsed time,
     * at the most accurate precision possible.
     */

  }, {
    key: "start",
    value: function start() {
      this.startTime = this.nowObj.now();
    }
  }, {
    key: "timeElapsed",
    value: function timeElapsed() {
      return this.nowObj.now() - this.startTime;
    }
    /**
     * Call a handler function after a specified amount of time has elapsed.
     * @param {function} handler - function to call after the timeout
     * @param {number} timeout - number of milliseconds to delay before calling the handler
     * @returns {number} - the ID of the new timeout
     */

  }, {
    key: "setTimeout",
    value: function setTimeout(handler, timeout) {
      return commonjsGlobal.setTimeout(handler, timeout);
    }
    /**
     * Clear a timeout from the pending timeout pool.
     * @param {number} timeoutId - the ID returned by `setTimeout()`
     * @memberof Timer
     */

  }, {
    key: "clearTimeout",
    value: function clearTimeout(timeoutId) {
      commonjsGlobal.clearTimeout(timeoutId);
    }
  }], [{
    key: "USE_PERFORMANCE",
    get: function get() {
      return false;
    }
    /**
     * Legacy object to allow for us to call now to get the old style date time (for backwards compatibility)
     * @deprecated This is only called via the nowObj.now() if no other means is possible...
     */

  }, {
    key: "legacyDateCode",
    get: function get() {
      return {
        now: function now() {
          return new Date().getTime();
        }
      };
    }
    /**
     * Use this object to route all time functions through single access points.
     */

  }, {
    key: "nowObj",
    get: function get() {
      if (Timer.USE_PERFORMANCE && typeof self !== 'undefined' && self.performance && 'now' in self.performance) {
        return self.performance;
      } else if (Date.now) {
        return Date;
      }

      return Timer.legacyDateCode;
    }
  }]);

  return Timer;
}();

var timer = Timer$1;

var Timer = timer;

var RateLimiter$1 = /*#__PURE__*/function () {
  /**
   * A utility for limiting the rate of repetitive send operations, such as
   * bluetooth messages being sent to hardware devices. It uses the token bucket
   * strategy: a counter accumulates tokens at a steady rate, and each send costs
   * a token. If no tokens remain, it's not okay to send.
   * @param {number} maxRate the maximum number of sends allowed per second
   * @constructor
   */
  function RateLimiter(maxRate) {
    _classCallCheck(this, RateLimiter);

    /**
     * The maximum number of tokens.
     * @type {number}
     */
    this._maxTokens = maxRate;
    /**
     * The interval in milliseconds for refilling one token. It is calculated
     * so that the tokens will be filled to maximum in one second.
     * @type {number}
     */

    this._refillInterval = 1000 / maxRate;
    /**
     * The current number of tokens in the bucket.
     * @type {number}
     */

    this._count = this._maxTokens;
    this._timer = new Timer();

    this._timer.start();
    /**
     * The last time in milliseconds when the token count was updated.
     * @type {number}
     */


    this._lastUpdateTime = this._timer.timeElapsed();
  }
  /**
   * Check if it is okay to send a message, by updating the token count,
   * taking a token and then checking if we are still under the rate limit.
   * @return {boolean} true if we are under the rate limit
   */


  _createClass(RateLimiter, [{
    key: "okayToSend",
    value: function okayToSend() {
      // Calculate the number of tokens to refill the bucket with, based on the
      // amount of time since the last refill.
      var now = this._timer.timeElapsed();

      var timeSinceRefill = now - this._lastUpdateTime;
      var refillCount = Math.floor(timeSinceRefill / this._refillInterval); // If we're adding at least one token, reset _lastUpdateTime to now.
      // Otherwise, don't reset it so that we can continue measuring time until
      // the next refill.

      if (refillCount > 0) {
        this._lastUpdateTime = now;
      } // Refill the tokens up to the maximum


      this._count = Math.min(this._maxTokens, this._count + refillCount); // If we have at least one token, use one, and it's okay to send.

      if (this._count > 0) {
        this._count--;
        return true;
      }

      return false;
    }
  }]);

  return RateLimiter;
}();

var rateLimiter = RateLimiter$1;

var IOType$2 = {
  SIMPLE_MEDIUM_LINEAR_MOTOR: 0x01,
  TRAIN_MOTOR: 0x02,
  BUTTION: 0x05,
  LIGHT: 0x08,
  VOLTAGE: 0x14,
  CURRENT: 0x15,
  PIEZO_TONE: 0x16,
  RGB_LIGHT: 0x17,
  TILT_SENSOR: 0x22,
  MOTION_SENSOR: 0x23,
  COLOR_DISTANCE_SENSOR: 0x25,
  MEDIUM_LINEAR_MOTOR: 0x26,
  MOVE_HUB_MOTOR: 0x27,
  MOVE_HUB_TILT_SENSOR: 0x28,
  DUPLO_TRAIN_BASE_MOTOR: 0x29,
  DUPLO_TRAIN_BASE_SPEAKER: 0x2a,
  DUPLO_TRAIN_BASE_COLOR_SENSOR: 0x2b,
  DUPLO_TRAIN_BASE_SPEEDOMETER: 0x2c,
  TECHNIC_LARGE_MOTOR: 0x2e,
  TECHNIC_XL_MOTOR: 0x2f,
  TECHNIC_MEDIUM_ANGULAR_MOTOR: 0x30,
  TECHNIC_LARGE_ANGULAR_MOTOR: 0x31,
  REMOTE_POWER_CONTROL_BUTTON: 0x37,
  TECHNIC_HUB_TILT_SENSOR: 0x3b,
  TECHNIC_COLOR_SENSOR: 0x3d,
  TECHNIC_DISTANCE_SENSOR: 0x3e,
  TECHNIC_FORCE_SENSOR: 0x3f,
  TECHNIC_SMALL_ANGULAR_MOTOR: 0x41,
  MARIO_COLOR_BARCODE_SENSOR: 0x49,
  MARIO_PANTS: 0x4a,
  TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY: 0x4b,
  TECHNIC_LARGE_ANGULAR_MOTOR_GRAY: 0x4c
};
var ioType = IOType$2;

var device = {};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var MathUtil$1 = mathUtil;
var IOType$1 = ioType;

var GenericDevice = /*#__PURE__*/function () {
  function GenericDevice(ioType) {
    _classCallCheck(this, GenericDevice);

    this._ioType = ioType;
    this._inputValues = {};
  }

  _createClass(GenericDevice, [{
    key: "ioType",
    get: function get() {
      return this._ioType;
    }
  }, {
    key: "mode",
    get: function get() {
      switch (this._ioType) {
        case IOType$1.MEDIUM_LINEAR_MOTOR:
        case IOType$1.MOVE_HUB_MOTOR:
        case IOType$1.TECHNIC_LARGE_MOTOR:
        case IOType$1.TECHNIC_XL_MOTOR:
        case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_SMALL_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
        case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
          return 2;
        // Relative Position

        case IOType$1.TILT_SENSOR:
          return 0;
        // Tilt X, Y

        case IOType$1.MOTION_SENSOR:
          return 0;
        // Distance

        case IOType$1.COLOR_DISTANCE_SENSOR:
          return 8;
        // Color and Distance

        case IOType$1.MOVE_HUB_TILT_SENSOR:
          return 0;
        // Tilt X, Y

        case IOType$1.DUPLO_TRAIN_BASE_SPEAKER:
          return 1;
        // Sound

        case IOType$1.DUPLO_TRAIN_BASE_COLOR_SENSOR:
          return 0;
        // Color

        case IOType$1.DUPLO_TRAIN_BASE_SPEEDOMETER:
          return 1;
        // Driving Distance

        case IOType$1.REMOTE_POWER_CONTROL_BUTTON:
          return 0;
        // Button

        case IOType$1.TECHNIC_HUB_TILT_SENSOR:
          return 0;
        // Tilt X, Y, Z

        case IOType$1.TECHNIC_COLOR_SENSOR:
          return 0;
        // Color

        case IOType$1.TECHNIC_DISTANCE_SENSOR:
          return 0;
        // Distance

        case IOType$1.TECHNIC_FORCE_SENSOR:
          return 0;
        // Force

        case IOType$1.MARIO_COLOR_BARCODE_SENSOR:
          return 0;

        case IOType$1.MARIO_PANTS:
          return 0;

        default:
          return null;
      }
    }
  }, {
    key: "inputValues",
    get: function get() {
      return this._inputValues;
    }
  }, {
    key: "updateInputValues",
    value: function updateInputValues(data) {
      if (data.length == 0) {
        this._inputValues = {};
        return;
      }

      var buffer = Buffer.from(data);

      switch (this._ioType) {
        case IOType$1.MEDIUM_LINEAR_MOTOR:
        case IOType$1.MOVE_HUB_MOTOR:
        case IOType$1.TECHNIC_LARGE_MOTOR:
        case IOType$1.TECHNIC_XL_MOTOR:
        case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_SMALL_ANGULAR_MOTOR:
        case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
        case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
          this._inputValues = {
            relativePosition: buffer.readInt32LE(0)
          };
          break;

        case IOType$1.TILT_SENSOR:
          this._inputValues = {
            tiltX: buffer.readInt8(0),
            tiltY: buffer.readInt8(1)
          };
          break;

        case IOType$1.MOTION_SENSOR:
          this._inputValues = {
            distance: buffer.readInt8(0)
          };
          break;

        case IOType$1.COLOR_DISTANCE_SENSOR:
          this._inputValues = {
            color: buffer.readInt8(0),
            distance: buffer.readInt8(1)
          };
          break;

        case IOType$1.MOVE_HUB_TILT_SENSOR:
          this._inputValues = {
            tiltX: buffer.readInt8(0),
            tiltY: buffer.readInt8(1)
          };
          break;

        case IOType$1.DUPLO_TRAIN_BASE_COLOR_SENSOR:
          this._inputValues = {
            color: buffer.readInt8(0)
          };
          break;

        case IOType$1.DUPLO_TRAIN_BASE_SPEEDOMETER:
          this._inputValues = {
            drivingDistance: buffer.readInt32LE(0)
          };
          break;

        case IOType$1.REMOTE_POWER_CONTROL_BUTTON:
          this._inputValues = {
            button: buffer.readInt8(0)
          };
          break;

        case IOType$1.TECHNIC_HUB_TILT_SENSOR:
          this._inputValues = {
            tiltX: buffer.readInt16LE(4),
            tiltY: buffer.readInt16LE(2),
            tiltZ: buffer.readInt16LE(0)
          };
          break;

        case IOType$1.TECHNIC_COLOR_SENSOR:
          this._inputValues = {
            color: buffer.readInt8(0)
          };
          break;

        case IOType$1.TECHNIC_DISTANCE_SENSOR:
          this._inputValues = {
            distance: buffer.readInt16LE(0)
          };
          break;

        case IOType$1.TECHNIC_FORCE_SENSOR:
          this._inputValues = {
            force: buffer.readInt8(0)
          };
          break;

        case IOType$1.MARIO_COLOR_BARCODE_SENSOR:
          this._inputValues = {
            barcode: buffer.readInt16LE(0),
            color: buffer.readInt16LE(2)
          };
          break;

        case IOType$1.MARIO_PANTS:
          this._inputValues = {
            pants: buffer.readInt8(0)
          };
          break;

        default:
          this._inputValues = {};
          break;
      }

      this._inputValues.bytes = buffer;
    }
  }]);

  return GenericDevice;
}();

var Motor = /*#__PURE__*/function (_GenericDevice) {
  _inherits(Motor, _GenericDevice);

  var _super = _createSuper$1(Motor);

  function Motor(ioType) {
    var _this;

    _classCallCheck(this, Motor);

    _this = _super.call(this, ioType);

    switch (ioType) {
      case IOType$1.MEDIUM_LINEAR_MOTOR:
      case IOType$1.MOVE_HUB_MOTOR:
        _this._canUseSpeed = true;
        _this._canUsePosition = false;
        _this._speed = 75;
        break;

      case IOType$1.TECHNIC_LARGE_MOTOR:
      case IOType$1.TECHNIC_XL_MOTOR:
      case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR:
      case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR:
      case IOType$1.TECHNIC_SMALL_ANGULAR_MOTOR:
      case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
      case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
        _this._canUseSpeed = true;
        _this._canUsePosition = true;
        _this._speed = 75;
        break;

      default:
        _this._canUseSpeed = false;
        _this._canUsePosition = false;
        _this._speed = 0;
    }

    return _this;
  }

  _createClass(Motor, [{
    key: "canUseSpeed",
    get: function get() {
      return this._canUseSpeed;
    }
  }, {
    key: "canUsePosition",
    get: function get() {
      return this._canUsePosition;
    }
  }, {
    key: "speed",
    get: function get() {
      return this._speed;
    },
    set: function set(value) {
      if (this._canUseSpeed) {
        this._speed = MathUtil$1.clamp(value, -100, 100);
      }
    }
  }]);

  return Motor;
}(GenericDevice);

var createDevice = function createDevice(ioType) {
  switch (ioType) {
    case IOType$1.SIMPLE_MEDIUM_LINEAR_MOTOR:
    case IOType$1.TRAIN_MOTOR:
    case IOType$1.LIGHT:
    case IOType$1.MEDIUM_LINEAR_MOTOR:
    case IOType$1.MOVE_HUB_MOTOR:
    case IOType$1.DUPLO_TRAIN_BASE_MOTOR:
    case IOType$1.TECHNIC_LARGE_MOTOR:
    case IOType$1.TECHNIC_XL_MOTOR:
    case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR:
    case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR:
    case IOType$1.TECHNIC_SMALL_ANGULAR_MOTOR:
    case IOType$1.TECHNIC_MEDIUM_ANGULAR_MOTOR_GRAY:
    case IOType$1.TECHNIC_LARGE_ANGULAR_MOTOR_GRAY:
      return new Motor(ioType);

    default:
      return new GenericDevice(ioType);
  }
};

device.GenericDevice = GenericDevice;
device.Motor = Motor;
device.createDevice = createDevice;

var BLE = ble;
var Base64Util = base64Util;
var MathUtil = mathUtil;
var RateLimiter = rateLimiter; //const log = require('../../../util/log');

var IOType = ioType;
var Device = device;

var _TextDecoder;

if (typeof TextDecoder === 'undefined') {
  _TextDecoder = null;
} else {
  _TextDecoder = TextDecoder;
}

var ServiceUUID = '00001623-1212-efde-1623-785feabcd123';
var CharacteristicUUID = '00001624-1212-efde-1623-785feabcd123';
var SendRateMax = 20;
var PollingInterval = 3000;
var MAX_INT32 = Math.pow(2, 31) - 1;
var MIN_INT32 = Math.pow(2, 31) * -1;
var MAX_INT16 = Math.pow(2, 15) - 1;
var MessageType = {
  HUB_PROPERTIES: 0x01,
  HUB_ATTACHED_IO: 0x04,
  GENERIC_ERROR_MESSAGES: 0x05,
  PORT_INPUT_FORMAT_SETUP: 0x41,
  PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
  PORT_VALUE: 0x45,
  PORT_VALUE_COMBINED: 0x46,
  PORT_OUTPUT_COMMAND: 0x81,
  PORT_OUTPUT_COMMAND_FEEDBACK: 0x82
};
var HubPropertyReference = {
  ADVERTISING_NAME: 0x01,
  BUTTON: 0x02,
  FW_VERSION: 0x03,
  BATTERY_VOLTAGE: 0x06,
  SPEAKER_VOLUME: 0x12
};
var HubPropertyOperation = {
  SET: 0x01,
  ENABLE_UPDATES: 0x02,
  DISABLE_UPDATES: 0x03,
  RESET: 0x04,
  REQUEST_UPDATE: 0x05,
  UPDATE: 0x06
};

var numberToInt32Array = function numberToInt32Array(number) {
  var buffer = new ArrayBuffer(4);
  var dataview = new DataView(buffer);
  dataview.setInt32(0, number);
  return [dataview.getUint8(3), dataview.getUint8(2), dataview.getUint8(1), dataview.getUint8(0)];
};

var numberToInt16Array = function numberToInt16Array(number) {
  var buffer = new ArrayBuffer(2);
  var dataview = new DataView(buffer);
  dataview.setInt16(0, number);
  return [dataview.getUint8(1), dataview.getUint8(0)];
};

var Hub$1 = /*#__PURE__*/function () {
  function Hub(runtime, extensionId) {
    var hubType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Hub);

    this._runtime = runtime;
    this._extensionId = extensionId;
    this._hubType = hubType;
    this._name = null;
    this._firmwareVersion = null;
    this._batteryLevel = 0;
    this._devices = [];
    this._firstNotificationCallback = null;
    this._outputCommandFeedbackCallbacks = [];
    this._outputCommandCompletionCallbacks = [];
    this._ble = null;

    this._runtime.registerPeripheralExtension(extensionId, this);

    this._runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));

    this._rateLimiter = new RateLimiter(SendRateMax);
    this._pollingId = null;
    this.reset = this.reset.bind(this);
    this._onConnect = this._onConnect.bind(this);
    this._onMessage = this._onMessage.bind(this);
  }

  _createClass(Hub, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "firmwareVersion",
    get: function get() {
      return this._firmwareVersion;
    }
  }, {
    key: "batteryLevel",
    get: function get() {
      return this._batteryLevel;
    } // BLE

  }, {
    key: "scan",
    value: function scan() {
      if (this._ble) {
        this._ble.disconnect();
      }

      var hubTypeFilter = {
        dataPrefix: []
      };

      if (this._hubType) {
        hubTypeFilter = {
          dataPrefix: [0x00, this._hubType],
          mask: [0x00, 0xff]
        };
      }

      this._ble = new BLE(this._runtime, this._extensionId, {
        filters: [{
          services: [ServiceUUID],
          manufacturerData: {
            0x0397: hubTypeFilter
          }
        }],
        optionalServices: []
      }, this._onConnect, this.reset);
    }
  }, {
    key: "connect",
    value: function connect(id) {
      if (this._ble) {
        this._ble.connectPeripheral(id);
      }
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      if (this._ble) {
        this._ble.disconnect();
      }

      this.reset();
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      var connected = false;

      if (this._ble) {
        connected = this._ble.isConnected();
      }

      return connected;
    }
  }, {
    key: "_onConnect",
    value: function _onConnect() {
      var _this = this;

      this._ble.startNotifications(ServiceUUID, CharacteristicUUID, this._onMessage);

      this._firstNotificationCallback = function () {
        _this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.ADVERTISING_NAME, HubPropertyOperation.ENABLE_UPDATES], false);

        _this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.FW_VERSION, HubPropertyOperation.REQUEST_UPDATE]);

        _this._startPollingBatteryLevel();
      };
    }
  }, {
    key: "_onMessage",
    value: function _onMessage(base64) {
      var data = Base64Util.base64ToUint8Array(base64); //logByteArray('<<', data);

      var length = data[0];

      if (length > 127) {
        //log.warn(`Unsupported message length: ${length}`);
        return;
      }

      var messageType = data[2];

      switch (messageType) {
        case MessageType.HUB_PROPERTIES:
          {
            var property = data[3];

            switch (property) {
              case HubPropertyReference.ADVERTISING_NAME:
                if (_TextDecoder) {
                  var uint8Array = new Uint8Array(data.slice(5));
                  this._name = new _TextDecoder().decode(uint8Array);
                } else {
                  this._name = 'unsupported';
                }

                break;

              case HubPropertyReference.FW_VERSION:
                var value = data.slice(5);

                if (value.length == 4) {
                  var s = value.reduce(function (output, elem) {
                    return ('0' + (elem & 0xff).toString(16)).slice(-2) + output;
                  }, '');
                  this._firmwareVersion = s.slice(0, 1) + '.' + s.slice(1, 2) + '.' + s.slice(2, 4) + '.' + s.slice(4);
                }

                break;

              case HubPropertyReference.BATTERY_VOLTAGE:
                this._batteryLevel = data[5];
                break;
            }

            break;
          }

        case MessageType.HUB_ATTACHED_IO:
          {
            var portId = data[3];
            var event = data[4];
            var ioType = data[5];

            switch (event) {
              case 0x00:
                // Detached I/O
                this._dettachDevice(portId);

                break;

              case 0x01:
                // Attached I/O
                this._attachDevice(portId, ioType);

                break;
            }

            break;
          }

        case MessageType.PORT_VALUE:
          {
            var _portId = data[3];
            var device = this._devices[_portId];

            if (device) {
              device.updateInputValues(data.slice(4)); //log.debug(portId, device.inputValues);
            }

            break;
          }

        case MessageType.PORT_OUTPUT_COMMAND_FEEDBACK:
          {
            var _portId2 = data[3];
            var feedback = data[4];
            var discarded = feedback & 0x04;
            var completed = feedback & 0x02;
            var inProgress = feedback & 0x01;

            if (discarded) {
              this._clearOutputCommandCompletionCallback(_portId2);
            }

            if (completed) {
              this._clearOutputCommandFeedbackCallback(_portId2);

              this._clearOutputCommandCompletionCallback(_portId2);
            }

            if (inProgress) {
              this._moveOutputCommandFeedbackCallbackToCompletionCallback(_portId2);
            }

            break;
          }
      }

      if (this._firstNotificationCallback) {
        this._firstNotificationCallback();

        this._firstNotificationCallback = null;
      }
    }
  }, {
    key: "_dettachDevice",
    value: function _dettachDevice(portId) {
      this._devices[portId] = null;
    }
  }, {
    key: "_attachDevice",
    value: function _attachDevice(portId, ioType) {
      var _this2 = this;

      var device = Device.createDevice(ioType);
      this._devices[portId] = device;
      var mode = device.mode;

      if (mode !== null) {
        setTimeout(function () {
          _this2.sendMessage(MessageType.PORT_INPUT_FORMAT_SETUP, [portId, mode, 1, 0, 0, 0, 1], false);
        }, 100);
      }
    }
  }, {
    key: "send",
    value: function send(data) {
      var useLimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!this.isConnected()) {
        return Promise.resolve();
      }

      if (useLimiter) {
        if (!this._rateLimiter.okayToSend()) {
          return Promise.resolve();
        }
      } //logByteArray('>>', data);


      return this._ble.write(ServiceUUID, CharacteristicUUID, Base64Util.uint8ArrayToBase64(data), 'base64', true);
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(messageType, payload) {
      var useLimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var command = [0x00, // Hub ID: Always set to 0x00 (zero)
      messageType].concat(_toConsumableArray(payload));
      command.unshift(command.length + 1);
      return this.send(command, useLimiter);
    }
  }, {
    key: "sendOutputCommand",
    value: function sendOutputCommand(portId, subCommand, payload) {
      var needsFeedback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var useLimiter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var flag = needsFeedback ? 0x11 : 0x10;
      return this.sendMessage(MessageType.PORT_OUTPUT_COMMAND, [portId, flag, subCommand].concat(_toConsumableArray(payload)), useLimiter);
    } // Reset and Stop

  }, {
    key: "reset",
    value: function reset() {
      this._name = null;
      this._firmwareVersion = null;
      this._batteryLevel = 0;
      this._devices = [];
      this._outputCommandFeedbackCallbacks = [];
      this._outputCommandCompletionCallbacks = [];

      this._stopPollingBatteryLevel();
    }
  }, {
    key: "stopAll",
    value: function stopAll() {
      if (this.isConnected()) {
        this.stopAllMotors();
      }
    }
  }, {
    key: "stopAllMotors",
    value: function stopAllMotors() {
      for (var _i = 0, _Object$entries = Object.entries(this._devices); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            portId = _Object$entries$_i[0],
            device = _Object$entries$_i[1];

        if (device instanceof Device.Motor) {
          this.sendOutputCommand(portId, 0x51, [0x00, 0], false);
          this._outputCommandFeedbackCallbacks[portId] = null;
          this._outputCommandCompletionCallbacks[portId] = null;
        }
      }
    }
  }, {
    key: "_startPollingBatteryLevel",
    value: function _startPollingBatteryLevel() {
      var _this3 = this;

      this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
      this._pollingId = window.setInterval(function () {
        _this3.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.BATTERY_VOLTAGE, HubPropertyOperation.REQUEST_UPDATE]);
      }, PollingInterval);
    }
  }, {
    key: "_stopPollingBatteryLevel",
    value: function _stopPollingBatteryLevel() {
      if (this._pollingId) {
        window.clearInterval(this._pollingId);
        this._pollingId = null;
      }
    } // Output Command Feedback

  }, {
    key: "_createOutputCommandFeedbackPromise",
    value: function _createOutputCommandFeedbackPromise(portId) {
      var _this4 = this;

      return new Promise(function (resolve) {
        _this4._outputCommandFeedbackCallbacks[portId] = resolve;
      });
    }
  }, {
    key: "_clearOutputCommandFeedbackCallback",
    value: function _clearOutputCommandFeedbackCallback(portId) {
      if (this._outputCommandFeedbackCallbacks[portId]) {
        this._outputCommandFeedbackCallbacks[portId]();

        this._outputCommandFeedbackCallbacks[portId] = null;
      }
    }
  }, {
    key: "_clearOutputCommandCompletionCallback",
    value: function _clearOutputCommandCompletionCallback(portId) {
      if (this._outputCommandCompletionCallbacks[portId]) {
        this._outputCommandCompletionCallbacks[portId]();

        this._outputCommandCompletionCallbacks[portId] = null;
      }
    }
  }, {
    key: "_moveOutputCommandFeedbackCallbackToCompletionCallback",
    value: function _moveOutputCommandFeedbackCallbackToCompletionCallback(portId) {
      this._outputCommandCompletionCallbacks[portId] = this._outputCommandFeedbackCallbacks[portId];
      this._outputCommandFeedbackCallbacks[portId] = null;
    } // Motor

  }, {
    key: "getMotor",
    value: function getMotor(portId) {
      var device = this._devices[portId];

      if (device instanceof Device.Motor) {
        return device;
      } else {
        return null;
      }
    }
  }, {
    key: "motorPWM",
    value: function motorPWM(portId, power) {
      power = MathUtil.clamp(power, -100, 100);
      var motor = this.getMotor(portId);

      if (motor) {
        return this.sendOutputCommand(portId, 0x51, [0x00, power]);
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "motorRunForDegrees",
    value: function motorRunForDegrees(portId, direction, degrees) {
      direction = direction * Math.sign(degrees);
      degrees = MathUtil.clamp(Math.abs(degrees), 1, MAX_INT32);
      var motor = this.getMotor(portId);

      if (motor && motor.canUseSpeed) {
        var speed = motor.speed * direction;
        return this.sendOutputCommand(portId, 0x0b, [].concat(_toConsumableArray(numberToInt32Array(degrees)), [speed, 100, 0x7f, 0x00])).then(this._createOutputCommandFeedbackPromise.bind(this, portId));
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "motorRunTimed",
    value: function motorRunTimed(portId, direction, seconds) {
      var milliseconds = MathUtil.clamp(seconds * 1000, 0, MAX_INT16);
      var motor = this.getMotor(portId);

      if (motor && motor.canUseSpeed) {
        var speed = motor.speed * direction;
        return this.sendOutputCommand(portId, 0x09, [].concat(_toConsumableArray(numberToInt16Array(milliseconds)), [speed, 100, 0x7f, 0x00])).then(this._createOutputCommandFeedbackPromise.bind(this, portId));
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "motorStart",
    value: function motorStart(portId, direction) {
      var motor = this.getMotor(portId);

      if (motor && motor.canUseSpeed) {
        var speed = motor.speed * direction;
        return this.sendOutputCommand(portId, 0x07, [speed, 100, 0x00]);
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "motorSetSpeed",
    value: function motorSetSpeed(portId, speed) {
      var motor = this.getMotor(portId);

      if (motor && motor.canUseSpeed) {
        motor.speed = speed;
      }
    }
  }, {
    key: "motorResetRelativePosition",
    value: function motorResetRelativePosition(portId, relativePosition) {
      relativePosition = MathUtil.clamp(relativePosition, MIN_INT32, MAX_INT32);
      var motor = this.getMotor(portId);

      if (motor && motor.canUseSpeed) {
        return this.sendOutputCommand(portId, 0x51, [0x02].concat(_toConsumableArray(numberToInt32Array(relativePosition))));
      } else {
        return Promise.resolve();
      }
    } // Input Values

  }, {
    key: "inputValue",
    value: function inputValue(portId, key) {
      var device = this._devices[portId];

      if (device && device.inputValues.hasOwnProperty(key)) {
        return device.inputValues[key];
      }

      return null;
    }
  }, {
    key: "internalInputValue",
    value: function internalInputValue(key) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(this._devices); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            portId = _Object$entries2$_i[0],
            device = _Object$entries2$_i[1];

        if (portId >= 0x32 && device.inputValues.hasOwnProperty(key)) {
          return device.inputValues[key];
        }
      }

      return null;
    } // Hub LED

  }, {
    key: "setLEDColor",
    value: function setLEDColor(color) {
      if (color < 0 || color > 10) {
        color = 0;
      }

      var portId = this._devices.findIndex(function (device) {
        return device && device.ioType == IOType.RGB_LIGHT;
      });

      if (portId != -1) {
        return this.sendOutputCommand(portId, 0x51, [0x00, color]);
      } else {
        return Promise.resolve();
      }
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      volume = MathUtil.clamp(volume, 0, 100);
      return this.sendMessage(MessageType.HUB_PROPERTIES, [HubPropertyReference.SPEAKER_VOLUME, HubPropertyOperation.SET, volume]);
    }
  }]);

  return Hub;
}();

var hub = Hub$1;

var formatMessage$1 = {exports: {}};

var formatMessageParse = {exports: {}};

(function (module, exports) {
  /*::
  export type AST = Element[]
  export type Element = string | Placeholder
  export type Placeholder = Plural | Styled | Typed | Simple
  export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
  export type Styled = [ string, string, string | SubMessages ]
  export type Typed = [ string, string ]
  export type Simple = [ string ]
  export type SubMessages = { [string]: AST }
  export type Token = [ TokenType, string ]
  export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
  type Context = {|
    pattern: string,
    index: number,
    tagsType: ?string,
    tokens: ?Token[]
  |}
  */

  var ARG_OPN = '{';
  var ARG_CLS = '}';
  var ARG_SEP = ',';
  var NUM_ARG = '#';
  var TAG_OPN = '<';
  var TAG_CLS = '>';
  var TAG_END = '</';
  var TAG_SELF_CLS = '/>';
  var ESC = '\'';
  var OFFSET = 'offset:';
  var simpleTypes = ['number', 'date', 'time', 'ordinal', 'duration', 'spellout'];
  var submTypes = ['plural', 'select', 'selectordinal'];
  /**
   * parse
   *
   * Turns this:
   *  `You have { numBananas, plural,
   *       =0 {no bananas}
   *      one {a banana}
   *    other {# bananas}
   *  } for sale`
   *
   * into this:
   *  [ "You have ", [ "numBananas", "plural", 0, {
   *       "=0": [ "no bananas" ],
   *      "one": [ "a banana" ],
   *    "other": [ [ '#' ], " bananas" ]
   *  } ], " for sale." ]
   *
   * tokens:
   *  [
   *    [ "text", "You have " ],
   *    [ "syntax", "{" ],
   *    [ "space", " " ],
   *    [ "id", "numBananas" ],
   *    [ "syntax", ", " ],
   *    [ "space", " " ],
   *    [ "type", "plural" ],
   *    [ "syntax", "," ],
   *    [ "space", "\n     " ],
   *    [ "selector", "=0" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "no bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n    " ],
   *    [ "selector", "one" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "a banana" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n  " ],
   *    [ "selector", "other" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "syntax", "#" ],
   *    [ "text", " bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n" ],
   *    [ "syntax", "}" ],
   *    [ "text", " for sale." ]
   *  ]
   **/

  exports = module.exports = function parse(pattern
  /*: string */
  , options
  /*:: ?: { tagsType?: string, tokens?: Token[] } */
  )
  /*: AST */
  {
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: options && options.tagsType || null,
      tokens: options && options.tokens || null
    }, '');
  };

  function parseAST(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var elements
    /*: AST */
    = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text) elements.push(text);
    if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);

    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType) throw expected(current);
        break;
      }

      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break;
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text) elements.push(text);
      if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
    }

    return elements;
  }

  function parseText(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = parentType === 'plural' || parentType === 'selectordinal';
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = parentType === '{style}';
    var text = '';

    while (current.index < length) {
      var char = pattern[current.index];

      if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle && isWhitespace(char.charCodeAt(0))) {
        break;
      } else if (char === ESC) {
        char = pattern[++current.index];

        if (char === ESC) {
          // double is always 1 '
          text += char;
          ++current.index;
        } else if ( // only when necessary
        char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle) {
          text += char;

          while (++current.index < length) {
            char = pattern[current.index];

            if (char === ESC && pattern[current.index + 1] === ESC) {
              // double is always 1 '
              text += ESC;
              ++current.index;
            } else if (char === ESC) {
              // end of quoted
              ++current.index;
              break;
            } else {
              text += char;
            }
          }
        } else {
          // lone ' is just a '
          text += ESC; // already incremented
        }
      } else {
        text += char;
        ++current.index;
      }
    }

    return text;
  }

  function isWhitespace(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x09 && code <= 0x0D || code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E || code >= 0x2000 && code <= 0x200D || code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F || code === 0x2060 || code === 0x3000 || code === 0xFEFF;
  }

  function skipWhitespace(current
  /*: Context */
  )
  /*: void */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;

    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }

    if (start < current.index && current.tokens) {
      current.tokens.push(['space', current.pattern.slice(start, current.index)]);
    }
  }

  function parsePlaceholder(current
  /*: Context */
  )
  /*: Placeholder */
  {
    var pattern = current.pattern;

    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens) current.tokens.push(['syntax', NUM_ARG]);
      ++current.index; // move passed #

      return [NUM_ARG];
    }

    var tag = parseTag(current);
    if (tag) return tag;
    /* istanbul ignore if should be unreachable if parseAST and parseText are right */

    if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN);
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    skipWhitespace(current);
    var id = parseId(current);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);
    var char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
      ++current.index; // move passed }

      return [id];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var type = parseId(current);
    if (!type) throw expected(current, 'placeholder type');
    if (current.tokens) current.tokens.push(['type', type]);
    skipWhitespace(current);
    char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);

      if (type === 'plural' || type === 'selectordinal' || type === 'select') {
        throw expected(current, type + ' sub-messages');
      }

      ++current.index; // move passed }

      return [id, type];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var arg;

    if (type === 'plural' || type === 'selectordinal') {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [id, type, offset, parseSubMessages(current, type)];
    } else if (type === 'select') {
      arg = [id, type, parseSubMessages(current, type)];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [id, type, parseSimpleFormat(current)];
    } else {
      // custom placeholder type
      var index = current.index;
      var format
      /*: string | SubMessages */
      = parseSimpleFormat(current);
      skipWhitespace(current);

      if (pattern[current.index] === ARG_OPN) {
        current.index = index; // rewind, since should have been submessages

        format = parseSubMessages(current, type);
      }

      arg = [id, type, format];
    }

    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return arg;
  }

  function parseTag(current
  /*: Context */
  )
  /*: ?Placeholder */
  {
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN) return;

    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, 'closing tag without matching opening tag');
    }

    if (current.tokens) current.tokens.push(['syntax', TAG_OPN]);
    ++current.index; // move passed <

    var id = parseId(current, true);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);

    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens) current.tokens.push(['syntax', TAG_SELF_CLS]);
      current.index += TAG_SELF_CLS.length;
      return [id, tagsType];
    }

    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    var children = parseAST(current, tagsType);
    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_END]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens) current.tokens.push(['id', closeId]);

    if (id !== closeId) {
      current.index = end; // rewind for better error message

      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS);
    }

    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    return [id, tagsType, {
      children: children
    }];
  }

  function parseId(current
  /*: Context */
  , isTag
  /*:: ?: boolean */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var id = '';

    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || char === ARG_SEP || char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) || isTag && (char === TAG_OPN || char === TAG_CLS || char === '/')) break;
      id += char;
      ++current.index;
    }

    return id;
  }

  function parseSimpleFormat(current
  /*: Context */
  )
  /*: string */
  {
    var start = current.index;
    var style = parseText(current, '{style}');
    if (!style) throw expected(current, 'placeholder style name');
    if (current.tokens) current.tokens.push(['style', current.pattern.slice(start, current.index)]);
    return style;
  }

  function parsePluralOffset(current
  /*: Context */
  )
  /*: number */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;

    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens) current.tokens.push(['offset', 'offset'], ['syntax', ':']);
      current.index += OFFSET.length; // move passed offset:

      skipWhitespace(current);
      var start = current.index;

      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }

      if (start === current.index) throw expected(current, 'offset number');
      if (current.tokens) current.tokens.push(['number', pattern.slice(start, current.index)]);
      offset = +pattern.slice(start, current.index);
    }

    return offset;
  }

  function isDigit(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x30 && code <= 0x39;
  }

  function parseSubMessages(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: SubMessages */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var options
    /*: SubMessages */
    = {};

    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector) throw expected(current, 'sub-message selector');
      if (current.tokens) current.tokens.push(['selector', selector]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }

    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType);
    }

    return options;
  }

  function parseSubMessage(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return message;
  }

  function expected(current
  /*: Context */
  , expected
  /*:: ?: ?string */
  , found
  /*:: ?: ?string */
  , message
  /*:: ?: string */
  ) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (current.index >= pattern.length ? 'end of message pattern' : parseId(current) || pattern[current.index]);
    if (!message) message = errorMessage(expected, found);
    message += ' in ' + pattern.replace(/\r?\n/g, '\n');
    return new SyntaxError(message, expected, found, offset, line, column);
  }

  function errorMessage(expected
  /*: ?string */
  , found
  /* string */
  ) {
    if (!expected) return 'Unexpected ' + found + ' found';
    return 'Expected ' + expected + ' but found ' + found;
  }
  /**
   * SyntaxError
   *  Holds information about bad syntax found in a message pattern
   **/


  function SyntaxError(message
  /*: string */
  , expected
  /*: ?string */
  , found
  /*: ?string */
  , offset
  /*: number */
  , line
  /*: number */
  , column
  /*: number */
  ) {
    Error.call(this, message);
    this.name = 'SyntaxError';
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }

  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
})(formatMessageParse, formatMessageParse.exports);

var formatMessageInterpret = {exports: {}};

var LONG = 'long';
var SHORT = 'short';
var NARROW = 'narrow';
var NUMERIC = 'numeric';
var TWODIGIT = '2-digit';
/**
 * formatting information
 **/

var formatMessageFormats = {
  number: {
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal',
      maximumFractionDigits: 0
    },
    currency: {
      style: 'currency',
      currency: 'USD'
    },
    percent: {
      style: 'percent'
    },
    default: {
      style: 'decimal'
    }
  },
  date: {
    short: {
      month: NUMERIC,
      day: NUMERIC,
      year: TWODIGIT
    },
    medium: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    },
    long: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC
    },
    full: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC,
      weekday: LONG
    },
    default: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    }
  },
  time: {
    short: {
      hour: NUMERIC,
      minute: NUMERIC
    },
    medium: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    },
    long: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    full: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    default: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function parseNumberPattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, '').length;
    if (!syms && currency) syms = 1;

    if (syms) {
      options.style = 'currency';
      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
      options.currency = currency ? currency[0].toUpperCase() : 'USD';
    } else if (pattern.indexOf('%') >= 0) {
      options.style = 'percent';
    }

    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    options.useGrouping = pattern.indexOf(',') >= 0;

    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, '').split('.');
      var integer = parts[0];
      var n = integer.length - 1;

      while (integer[n] === '0') {
        --n;
      }

      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || '';
      n = 0;

      while (fraction[n] === '0') {
        ++n;
      }

      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);

      while (fraction[n] === '#') {
        ++n;
      }

      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }

    return options;
  },
  parseDatePattern: function parseDatePattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};

    for (var i = 0; i < pattern.length;) {
      var current = pattern[i];
      var n = 1;

      while (pattern[++i] === current) {
        ++n;
      }

      switch (current) {
        case 'G':
          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'y':
        case 'Y':
          options.year = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'M':
        case 'L':
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
          break;

        case 'E':
        case 'e':
        case 'c':
          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'd':
        case 'D':
          options.day = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'h':
        case 'K':
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'H':
        case 'k':
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'm':
          options.minute = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 's':
        case 'S':
          options.second = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'z':
        case 'Z':
        case 'v':
        case 'V':
          options.timeZoneName = n === 1 ? SHORT : LONG;
          break;
      }
    }

    return Object.keys(options).length ? options : undefined;
  }
};

// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
// assumes normalized language tags, and matches in a case sensitive manner

var lookupClosestLocale = function lookupClosestLocale(locale
/*: string | string[] | void */
, available
/*: { [string]: any } */
)
/*: ?string */
{
  if (typeof locale === 'string' && available[locale]) return locale;
  var locales = [].concat(locale || []);

  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split('-');

    while (current.length) {
      var candidate = current.join('-');
      if (available[candidate]) return candidate;
      current.pop();
    }
  }
};

/*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */


var zero = 'zero',
    one = 'one',
    two = 'two',
    few = 'few',
    many = 'many',
    other = 'other';
var f = [function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : 3 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 99 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100) ? few : n % 10 === 0 || 5 <= n % 10 && n % 10 <= 9 || 11 <= n % 100 && n % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91 ? one : n % 10 === 2 && n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92 ? two : (3 <= n % 10 && n % 10 <= 4 || n % 10 === 9) && (n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100) ? few : n !== 0 && n % 1000000 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) || 2 <= f % 10 && f % 10 <= 4 && (f % 100 < 12 || 14 < f % 100) ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : 2 <= i && i <= 4 && v === 0 ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : n === 3 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  var n = +s;
  return n === 1 || t !== 0 && (i === 0 || i === 1) ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 100 === 1 || f % 100 === 1 ? one : v === 0 && i % 100 === 2 || f % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || 3 <= f % 100 && f % 100 <= 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 0 || i === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9 || v !== 0 && f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : 3 <= n && n <= 6 ? few : 7 <= n && n <= 10 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : 3 <= n && n <= 10 || 13 <= n && n <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 ? one : v === 0 && i % 10 === 2 ? two : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : i === 2 && v === 0 ? two : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100) ? few : f !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 0 || 11 <= n % 100 && n % 100 <= 19 || v === 2 && 11 <= f % 100 && f % 100 <= 19 ? zero : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : v !== 0 || n === 0 || n !== 1 && 1 <= n % 100 && n % 100 <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 0 || 2 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 19 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i !== 1 && 0 <= i % 10 && i % 10 <= 1 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 12 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return 0 <= i && i <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i % 10 === 0 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 11 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n === 0 || n === 1 || i === 0 && f === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 100 === 1 ? one : v === 0 && i % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || v !== 0 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 || 11 <= n && n <= 99 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8 || i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80 ? one : i % 10 === 3 || i % 10 === 4 || i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900 ? few : i === 0 || i % 10 === 6 || i % 100 === 40 || i % 100 === 60 || i % 100 === 90 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 2 || n % 10 === 3) && n % 100 !== 12 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 3 ? one : n === 2 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 || n === 7 || n === 8 || n === 9 ? zero : n === 1 ? one : n === 2 ? two : n === 3 || n === 4 ? few : n === 5 || n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : n % 10 === 2 && n % 100 !== 12 ? two : n % 10 === 3 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : n === 3 || n === 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 1 ? one : i === 0 || 2 <= i % 100 && i % 100 <= 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 && i % 100 !== 11 ? one : i % 10 === 2 && i % 100 !== 12 ? two : (i % 10 === 7 || i % 10 === 8) && i % 100 !== 17 && i % 100 !== 18 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 1 <= n && n <= 4 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || 7 <= n && n <= 9 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 3 && n % 100 !== 13 ? few : other;
}];
var plurals = {
  af: {
    cardinal: f[0]
  },
  ak: {
    cardinal: f[1]
  },
  am: {
    cardinal: f[2]
  },
  ar: {
    cardinal: f[3]
  },
  ars: {
    cardinal: f[3]
  },
  as: {
    cardinal: f[2],
    ordinal: f[34]
  },
  asa: {
    cardinal: f[0]
  },
  ast: {
    cardinal: f[4]
  },
  az: {
    cardinal: f[0],
    ordinal: f[35]
  },
  be: {
    cardinal: f[5],
    ordinal: f[36]
  },
  bem: {
    cardinal: f[0]
  },
  bez: {
    cardinal: f[0]
  },
  bg: {
    cardinal: f[0]
  },
  bh: {
    cardinal: f[1]
  },
  bn: {
    cardinal: f[2],
    ordinal: f[34]
  },
  br: {
    cardinal: f[6]
  },
  brx: {
    cardinal: f[0]
  },
  bs: {
    cardinal: f[7]
  },
  ca: {
    cardinal: f[4],
    ordinal: f[37]
  },
  ce: {
    cardinal: f[0]
  },
  cgg: {
    cardinal: f[0]
  },
  chr: {
    cardinal: f[0]
  },
  ckb: {
    cardinal: f[0]
  },
  cs: {
    cardinal: f[8]
  },
  cy: {
    cardinal: f[9],
    ordinal: f[38]
  },
  da: {
    cardinal: f[10]
  },
  de: {
    cardinal: f[4]
  },
  dsb: {
    cardinal: f[11]
  },
  dv: {
    cardinal: f[0]
  },
  ee: {
    cardinal: f[0]
  },
  el: {
    cardinal: f[0]
  },
  en: {
    cardinal: f[4],
    ordinal: f[39]
  },
  eo: {
    cardinal: f[0]
  },
  es: {
    cardinal: f[0]
  },
  et: {
    cardinal: f[4]
  },
  eu: {
    cardinal: f[0]
  },
  fa: {
    cardinal: f[2]
  },
  ff: {
    cardinal: f[12]
  },
  fi: {
    cardinal: f[4]
  },
  fil: {
    cardinal: f[13],
    ordinal: f[0]
  },
  fo: {
    cardinal: f[0]
  },
  fr: {
    cardinal: f[12],
    ordinal: f[0]
  },
  fur: {
    cardinal: f[0]
  },
  fy: {
    cardinal: f[4]
  },
  ga: {
    cardinal: f[14],
    ordinal: f[0]
  },
  gd: {
    cardinal: f[15],
    ordinal: f[40]
  },
  gl: {
    cardinal: f[4]
  },
  gsw: {
    cardinal: f[0]
  },
  gu: {
    cardinal: f[2],
    ordinal: f[41]
  },
  guw: {
    cardinal: f[1]
  },
  gv: {
    cardinal: f[16]
  },
  ha: {
    cardinal: f[0]
  },
  haw: {
    cardinal: f[0]
  },
  he: {
    cardinal: f[17]
  },
  hi: {
    cardinal: f[2],
    ordinal: f[41]
  },
  hr: {
    cardinal: f[7]
  },
  hsb: {
    cardinal: f[11]
  },
  hu: {
    cardinal: f[0],
    ordinal: f[42]
  },
  hy: {
    cardinal: f[12],
    ordinal: f[0]
  },
  ia: {
    cardinal: f[4]
  },
  io: {
    cardinal: f[4]
  },
  is: {
    cardinal: f[18]
  },
  it: {
    cardinal: f[4],
    ordinal: f[43]
  },
  iu: {
    cardinal: f[19]
  },
  iw: {
    cardinal: f[17]
  },
  jgo: {
    cardinal: f[0]
  },
  ji: {
    cardinal: f[4]
  },
  jmc: {
    cardinal: f[0]
  },
  ka: {
    cardinal: f[0],
    ordinal: f[44]
  },
  kab: {
    cardinal: f[12]
  },
  kaj: {
    cardinal: f[0]
  },
  kcg: {
    cardinal: f[0]
  },
  kk: {
    cardinal: f[0],
    ordinal: f[45]
  },
  kkj: {
    cardinal: f[0]
  },
  kl: {
    cardinal: f[0]
  },
  kn: {
    cardinal: f[2]
  },
  ks: {
    cardinal: f[0]
  },
  ksb: {
    cardinal: f[0]
  },
  ksh: {
    cardinal: f[20]
  },
  ku: {
    cardinal: f[0]
  },
  kw: {
    cardinal: f[19]
  },
  ky: {
    cardinal: f[0]
  },
  lag: {
    cardinal: f[21]
  },
  lb: {
    cardinal: f[0]
  },
  lg: {
    cardinal: f[0]
  },
  ln: {
    cardinal: f[1]
  },
  lt: {
    cardinal: f[22]
  },
  lv: {
    cardinal: f[23]
  },
  mas: {
    cardinal: f[0]
  },
  mg: {
    cardinal: f[1]
  },
  mgo: {
    cardinal: f[0]
  },
  mk: {
    cardinal: f[24],
    ordinal: f[46]
  },
  ml: {
    cardinal: f[0]
  },
  mn: {
    cardinal: f[0]
  },
  mo: {
    cardinal: f[25],
    ordinal: f[0]
  },
  mr: {
    cardinal: f[2],
    ordinal: f[47]
  },
  mt: {
    cardinal: f[26]
  },
  nah: {
    cardinal: f[0]
  },
  naq: {
    cardinal: f[19]
  },
  nb: {
    cardinal: f[0]
  },
  nd: {
    cardinal: f[0]
  },
  ne: {
    cardinal: f[0],
    ordinal: f[48]
  },
  nl: {
    cardinal: f[4]
  },
  nn: {
    cardinal: f[0]
  },
  nnh: {
    cardinal: f[0]
  },
  no: {
    cardinal: f[0]
  },
  nr: {
    cardinal: f[0]
  },
  nso: {
    cardinal: f[1]
  },
  ny: {
    cardinal: f[0]
  },
  nyn: {
    cardinal: f[0]
  },
  om: {
    cardinal: f[0]
  },
  or: {
    cardinal: f[0],
    ordinal: f[49]
  },
  os: {
    cardinal: f[0]
  },
  pa: {
    cardinal: f[1]
  },
  pap: {
    cardinal: f[0]
  },
  pl: {
    cardinal: f[27]
  },
  prg: {
    cardinal: f[23]
  },
  ps: {
    cardinal: f[0]
  },
  pt: {
    cardinal: f[28]
  },
  'pt-PT': {
    cardinal: f[4]
  },
  rm: {
    cardinal: f[0]
  },
  ro: {
    cardinal: f[25],
    ordinal: f[0]
  },
  rof: {
    cardinal: f[0]
  },
  ru: {
    cardinal: f[29]
  },
  rwk: {
    cardinal: f[0]
  },
  saq: {
    cardinal: f[0]
  },
  sc: {
    cardinal: f[4],
    ordinal: f[43]
  },
  scn: {
    cardinal: f[4],
    ordinal: f[43]
  },
  sd: {
    cardinal: f[0]
  },
  sdh: {
    cardinal: f[0]
  },
  se: {
    cardinal: f[19]
  },
  seh: {
    cardinal: f[0]
  },
  sh: {
    cardinal: f[7]
  },
  shi: {
    cardinal: f[30]
  },
  si: {
    cardinal: f[31]
  },
  sk: {
    cardinal: f[8]
  },
  sl: {
    cardinal: f[32]
  },
  sma: {
    cardinal: f[19]
  },
  smi: {
    cardinal: f[19]
  },
  smj: {
    cardinal: f[19]
  },
  smn: {
    cardinal: f[19]
  },
  sms: {
    cardinal: f[19]
  },
  sn: {
    cardinal: f[0]
  },
  so: {
    cardinal: f[0]
  },
  sq: {
    cardinal: f[0],
    ordinal: f[50]
  },
  sr: {
    cardinal: f[7]
  },
  ss: {
    cardinal: f[0]
  },
  ssy: {
    cardinal: f[0]
  },
  st: {
    cardinal: f[0]
  },
  sv: {
    cardinal: f[4],
    ordinal: f[51]
  },
  sw: {
    cardinal: f[4]
  },
  syr: {
    cardinal: f[0]
  },
  ta: {
    cardinal: f[0]
  },
  te: {
    cardinal: f[0]
  },
  teo: {
    cardinal: f[0]
  },
  ti: {
    cardinal: f[1]
  },
  tig: {
    cardinal: f[0]
  },
  tk: {
    cardinal: f[0],
    ordinal: f[52]
  },
  tl: {
    cardinal: f[13],
    ordinal: f[0]
  },
  tn: {
    cardinal: f[0]
  },
  tr: {
    cardinal: f[0]
  },
  ts: {
    cardinal: f[0]
  },
  tzm: {
    cardinal: f[33]
  },
  ug: {
    cardinal: f[0]
  },
  uk: {
    cardinal: f[29],
    ordinal: f[53]
  },
  ur: {
    cardinal: f[4]
  },
  uz: {
    cardinal: f[0]
  },
  ve: {
    cardinal: f[0]
  },
  vo: {
    cardinal: f[0]
  },
  vun: {
    cardinal: f[0]
  },
  wa: {
    cardinal: f[1]
  },
  wae: {
    cardinal: f[0]
  },
  xh: {
    cardinal: f[0]
  },
  xog: {
    cardinal: f[0]
  },
  yi: {
    cardinal: f[4]
  },
  zu: {
    cardinal: f[2]
  },
  lo: {
    ordinal: f[0]
  },
  ms: {
    ordinal: f[0]
  },
  vi: {
    ordinal: f[0]
  }
};

(function (module, exports) {

  var formats = formatMessageFormats;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var plurals$1 = plurals;
  /*::
  import type {
    AST,
    SubMessages
  } from '../format-message-parse'
  type Locale = string
  type Locales = Locale | Locale[]
  type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
  export type Type = (Placeholder, Locales) => (any, ?Object) => any
  export type Types = { [string]: Type }
  */

  exports = module.exports = function interpret(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => string */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, true);
  };

  exports.toParts = function toParts(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => any[] */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, false);
  };

  function interpretAST(elements
  /*: any[] */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    var parts = elements.map(function (element) {
      return interpretElement(element, parent, locale, types, join);
    });

    if (!join) {
      return function format(args) {
        return parts.reduce(function (parts, part) {
          return parts.concat(part(args));
        }, []);
      };
    }

    if (parts.length === 1) return parts[0];
    return function format(args) {
      var message = '';

      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }

      return message;
    };
  }

  function interpretElement(element
  /*: Placeholder */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    if (typeof element === 'string') {
      var value
      /*: string */
      = element;
      return function format() {
        return value;
      };
    }

    var id = element[0];
    var type = element[1];

    if (parent && element[0] === '#') {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([id, 'number'], locale);
      return function format(args) {
        return formatter(getArg(id, args) - offset, args);
      };
    } // pre-process children


    var children;

    if (type === 'plural' || type === 'selectordinal') {
      children = {};
      Object.keys(element[3]).forEach(function (key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [element[0], element[1], element[2], children];
    } else if (element[2] && _typeof$1(element[2]) === 'object') {
      children = {};
      Object.keys(element[2]).forEach(function (key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [element[0], element[1], children];
    }

    var getFrmt = type && (types[type] || defaults[type]);

    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format(args) {
        return frmt(getArg(id, args), args);
      };
    }

    return join ? function format(args) {
      return String(getArg(id, args));
    } : function format(args) {
      return getArg(id, args);
    };
  }

  function getArg(id
  /*: string */
  , args
  /*: ?Object */
  )
  /*: any */
  {
    if (args && id in args) return args[id];
    var parts = id.split('.');
    var a = args;

    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }

    return a;
  }

  function interpretNumber(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
    return new Intl.NumberFormat(locales, options).format;
  }

  function interpretDuration(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formats.duration[style] || formats.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';
    return function (s, args) {
      s = +s;
      if (!isFinite(s)) return fs(s);
      var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc

      var m = ~~(s / 60 % 60);
      var dur = (h ? fh(Math.abs(h)) + sep : '') + fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
    };
  }

  function interpretDateTime(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var style = element[2];
    var options = formats[type][style] || formats.parseDatePattern(style) || formats[type].default;
    return new Intl.DateTimeFormat(locales, options).format;
  }

  function interpretPlural(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
    var offset = element[2];
    var children = element[3];
    var pluralRules;

    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, {
        type: pluralType
      });
    } else {
      var locale = lookupClosestLocale$1(locales, plurals$1);
      var select = locale && plurals$1[locale][pluralType] || returnOther;
      pluralRules = {
        select: select
      };
    }

    return function (value, args) {
      var clause = children['=' + +value] || children[pluralRules.select(value - offset)] || children.other;
      return clause(args);
    };
  }

  function
    /*:: n:number */
  returnOther() {
    return 'other';
  }

  function interpretSelect(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var children = element[2];
    return function (value, args) {
      var clause = children[value] || children.other;
      return clause(args);
    };
  }

  var defaults
  /*: Types */
  = {
    number: interpretNumber,
    ordinal: interpretNumber,
    // TODO: support rbnf
    spellout: interpretNumber,
    // TODO: support rbnf
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
})(formatMessageInterpret, formatMessageInterpret.exports);

(function (module, exports) {

  var parse = formatMessageParse.exports;
  var interpret = formatMessageInterpret.exports;
  var plurals$1 = plurals;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var origFormats = formatMessageFormats;
  /*::
  import type { Types } from 'format-message-interpret'
  type Locale = string
  type Locales = Locale | Locale[]
  type Message = string | {|
    id?: string,
    default: string,
    description?: string
  |}
  type Translations = { [string]: ?{ [string]: string | Translation } }
  type Translation = {
    message: string,
    format?: (args?: Object) => string,
    toParts?: (args?: Object) => any[],
  }
  type Replacement = ?string | (string, string, locales?: Locales) => ?string
  type GenerateId = (string) => string
  type MissingTranslation = 'ignore' | 'warning' | 'error'
  type FormatObject = { [string]: * }
  type Options = {
    locale?: Locales,
    translations?: ?Translations,
    generateId?: GenerateId,
    missingReplacement?: Replacement,
    missingTranslation?: MissingTranslation,
    formats?: {
      number?: FormatObject,
      date?: FormatObject,
      time?: FormatObject
    },
    types?: Types
  }
  type Setup = {|
    locale: Locales,
    translations: Translations,
    generateId: GenerateId,
    missingReplacement: Replacement,
    missingTranslation: MissingTranslation,
    formats: {
      number: FormatObject,
      date: FormatObject,
      time: FormatObject
    },
    types: Types
  |}
  type FormatMessage = {
    (msg: Message, args?: Object, locales?: Locales): string,
    rich (msg: Message, args?: Object, locales?: Locales): any[],
    setup (opt?: Options): Setup,
    number (value: number, style?: string, locales?: Locales): string,
    date (value: number | Date, style?: string, locales?: Locales): string,
    time (value: number | Date, style?: string, locales?: Locales): string,
    select (value: any, options: Object): any,
    custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
    plural (value: number, offset: any, options: any, locale: any): any,
    selectordinal (value: number, offset: any, options: any, locale: any): any,
    namespace (): FormatMessage
  }
  */

  function assign
  /*:: <T: Object> */
  (target
  /*: T */
  , source
  /*: Object */
  ) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
    return target;
  }

  function namespace()
  /*: FormatMessage */
  {
    var formats = assign({}, origFormats);
    var currentLocales
    /*: Locales */
    = 'en';
    var translations
    /*: Translations */
    = {};

    var generateId
    /*: GenerateId */
    = function generateId(pattern) {
      return pattern;
    };

    var missingReplacement
    /*: Replacement */
    = null;
    var missingTranslation
    /*: MissingTranslation */
    = 'warning';
    var types
    /*: Types */
    = {};

    function formatMessage(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = interpret(parse(translated.message), locales || currentLocales, types));
      return format(args);
    }

    formatMessage.rich = function rich(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.toParts || (translated.toParts = interpret.toParts(parse(translated.message, {
        tagsType: tagsType
      }), locales || currentLocales, types));
      return format(args);
    };

    var tagsType = '<>';

    function richType(node
    /*: any[] */
    , locales
    /*: Locales */
    ) {
      var style = node[2];
      return function (fn, args) {
        var props = _typeof$1(style) === 'object' ? mapObject(style, args) : style;
        return typeof fn === 'function' ? fn(props) : fn;
      };
    }

    types[tagsType] = richType;

    function mapObject(object
    /* { [string]: (args?: Object) => any } */
    , args
    /*: ?Object */
    ) {
      return Object.keys(object).reduce(function (mapped, key) {
        mapped[key] = object[key](args);
        return mapped;
      }, {});
    }

    function translate(pattern
    /*: string */
    , id
    /*: string */
    , locales
    /*: Locales */
    )
    /*: Translation */
    {
      var locale = lookupClosestLocale$1(locales, translations) || 'en';
      var messages = translations[locale] || (translations[locale] = {});
      var translated = messages[id];

      if (typeof translated === 'string') {
        translated = messages[id] = {
          message: translated
        };
      }

      if (!translated) {
        var message = 'Translation for "' + id + '" in "' + locale + '" is missing';

        if (missingTranslation === 'warning') {
          /* istanbul ignore else */
          if (typeof console !== 'undefined') console.warn(message);
        } else if (missingTranslation !== 'ignore') {
          // 'error'
          throw new Error(message);
        }

        var replacement = typeof missingReplacement === 'function' ? missingReplacement(pattern, id, locale) || pattern : missingReplacement || pattern;
        translated = messages[id] = {
          message: replacement
        };
      }

      return translated;
    }

    formatMessage.setup = function setup(opt
    /*:: ?: Options */
    ) {
      opt = opt || {};
      if (opt.locale) currentLocales = opt.locale;
      if ('translations' in opt) translations = opt.translations || {};
      if (opt.generateId) generateId = opt.generateId;
      if ('missingReplacement' in opt) missingReplacement = opt.missingReplacement;
      if (opt.missingTranslation) missingTranslation = opt.missingTranslation;

      if (opt.formats) {
        if (opt.formats.number) assign(formats.number, opt.formats.number);
        if (opt.formats.date) assign(formats.date, opt.formats.date);
        if (opt.formats.time) assign(formats.time, opt.formats.time);
      }

      if (opt.types) {
        types = opt.types;
        types[tagsType] = richType;
      }

      return {
        locale: currentLocales,
        translations: translations,
        generateId: generateId,
        missingReplacement: missingReplacement,
        missingTranslation: missingTranslation,
        formats: formats,
        types: types
      };
    };

    formatMessage.number = function (value
    /*: number */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
      return new Intl.NumberFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.date = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.date[style] || formats.parseDatePattern(style) || formats.date.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.time = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.time[style] || formats.parseDatePattern(style) || formats.time.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.select = function (value
    /*: any */
    , options
    /*: Object */
    ) {
      return options[value] || options.other;
    };

    formatMessage.custom = function (placeholder
    /*: any[] */
    , locales
    /*: Locales */
    , value
    /*: any */
    , args
    /*: Object */
    ) {
      if (!(placeholder[1] in types)) return value;
      return types[placeholder[1]](placeholder, locales)(value, args);
    };

    formatMessage.plural = plural.bind(null, 'cardinal');
    formatMessage.selectordinal = plural.bind(null, 'ordinal');

    function plural(pluralType
    /*: 'cardinal' | 'ordinal' */
    , value
    /*: number */
    , offset
    /*: any */
    , options
    /*: any */
    , locale
    /*: any */
    ) {
      if (_typeof$1(offset) === 'object' && _typeof$1(options) !== 'object') {
        // offset is optional
        locale = options;
        options = offset;
        offset = 0;
      }

      var closest = lookupClosestLocale$1(locale || currentLocales, plurals$1);
      var plural = closest && plurals$1[closest][pluralType] || returnOther;
      return options['=' + +value] || options[plural(value - offset)] || options.other;
    }

    function
      /*:: n:number */
    returnOther() {
      return 'other';
    }

    formatMessage.namespace = namespace;
    return formatMessage;
  }

  module.exports = namespace();
})(formatMessage$1);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var MarioBaseBlocks = marioBaseBlocks;
var Hub = hub;
var blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAUKADAAQAAAABAAAAUAAAAAAx4ExPAAAGoUlEQVR4Ae2dy2scNxzH9+3dgksJCSmlrdtcHAo+5BpIg01CT84h5FwouTgHh77yVySn+OJLKPScS+NTSEihhVx9MJTm0MbpixTa9OHSde0E9/tdS2LGa83qNyPvSIN/8LM0Gj0/+5M0D41cr5UoOzs7R1H8Keh0Ql+FfzKh8NY2EvoU/kcJXa3X67/huBSpj7NUAOuhvHPQOaUzcIvWYQd5rEEfKL0PoH34qyGAVoeehd6C/gU9aGEZLOsstOiPU96PgMpPQBeg30HLEpbNOkyUR0JYMirbg34E/RkairAurBOHkHAFFZyHPoaGKo9RsfngCKJSU9AvoLEI6/pmECBRkYvQP2Ihl6gn63yxNIgovAO9mahQrF62oZMXZK5pHgUeQYEr0NN5Cw4s3UPUZx7Xj8+k9RIDBLzXUchd6DvSwgKP/w3q9x4g/iSppwgg4PGW6x70DUkhEcX9EXU9D4i8VXQSZ4DK8mjqmfDeXj5a23qx5VQ4I7UardqTK+Ke45x/joiEeNrVEhsuBagxj902Ex7z6rVecsnSxGk3c4/fJg/PHrbxrmrzyKxHAkRGbCEnDKcxr9eSXex3GsEBJDS2dUW1ncdWGQkQKW9AnWfbXltmgZ3wLFDDYpvZ9kzJBIhfgBeai5k57DnZbXb3hGQfBgyQFV9UDKyNsAJEwimkumVNaTkht8DgH5Tw0Zj1ts8KEHxuQl+xcLIGS8fAdqNtzSuQE2SwZKvLvgBBnE8sLtgSZYVLZ+HAu7Bu6gXFRB8bdwggInIapfXlEqkFdprBd2HNgffMQ5cYQwAR+wr0LZ1K6naFlzERdGGNgEwW9IF2UwBBmObwiT6Zx5VbYJDXgbamf6oYmfMpgAj9APqaOZvDIx8Do+nCpEE2ZGTEAARZ3hdfM2dyenrtoWEiM6eIurBuxzXFanBsAOLoXegJHSuvK7XAiXgmEY2EjMhqIEmA7+vAIq50DAzwYYJL8w2rAUCYJPvdJZeUo+JUeBZONv2SYlbTFsjlFi8nY+T1Sy0wwi5MNGRFZgbgHA98iHQMbIf5OMsFxYCZtkCPAIWzcDP4e2EbzF2A6MtcYsZVUl5EaoGRdmGymiE7WiDX5/Ea0It0W7LngRF3YTI7RYAnvZBTmUgtMJKnMTZE0wQ4bTubJ1x6JxI5wJP+AUrfysU7C9O+BhZ4PI+l2dJIrwMjt8DjtMBJG4w84dI7kcgBTnoH2Kw3a23BtV3EszDtyz9A5iqZiSO+DjQA6fEqknFQYq1eK+kpM3bhDU95mWwkFhjRSyXTvoRn44AAut8PB7o2JsEo03swACUzceRdeADw10zGOU5KxsDIu/BTdmHn1ZiuLCXrYyLvwo8I8FtXMK7xJBYYeRceAPRvgYL74ci78ADgKiyLn4x6E8kzwYi7MJmtNrCYmh8rr3mjh4xk14FRLe1IYlojO46BlAe7jp+/sjEwWoADZi2FjAcf+sEns8A63ib8s71R62/3a/3n/0L7tU0oXX3c31bhLxCWiMfzm883h+PtTY946wu/+2qezicF8D5C/4b6eTcsWB9zYvmYrlBMLlmR2e57YfRl7jFwmwE+pNt0v5XzUV4JedxWzMyLddbhc18VkYyBvsoccz6GlZ5EWP5X0O99VERyJ+KjvDHnQUZkNRADECbJ65rrKryQU3ELvK5YpQEqYp/B/aUQPSSWXAcWLWvM6cmGjIwYC2QIyP4HZ+TnTSa1xVNhC7yhGJmWpwCq0GW46yZGDo/keWCO7MtKso6CySYlQwBBmJc0V1OxhAcVtcCrik2KxhBAnkXEFTh3UjEFBxUcA+8oJkMU9gWoYtEK/xxK4RAgXR/jkGWZUchg0VYBK0AQf4JEl20Js8IrZoGXweIHW3tHrgvEIkJ+N2f9BWwZVyR8CfAy5wMXgHze9CXU+av1isB7iHbMAuBWVntGAmRiWOEROF9DnfZNYJrIhXvInAG8Z6Pa4QSQmQAiN9zhrzJy5w7Gj1j8b3tCGPg1uKPPeSgLqKqwbdx4h211EussvF9qZMw3eBwLaeJVE7aJG+6I3lKKAJKY+nXOwMvuXBVhWzjmOVuebrgYIBOiIA6us9AlHkcubMOsatP4m4LJ5XADxqLYAXEKergFqAeQh5vQeoDIbZA/hoa2DTLrFM/rQlT2cCPuotbI9ABZ6a3gnW/lPMFkFzoHnVM6A7doHfg2kYujuNSCOtZ/RlC08qhvfoF16n+HwS9G+dEjlZ+eTSYU3tS/w+CSZN4tULk4tNR/h/E/jU+QpuoRv20AAAAASUVORK5CYII=';
var formatMessage = formatMessage$1.exports;
var extensionURL = 'https://bricklife.com/scratch-gui/xcratch/legoluigi.mjs';

var Scratch3LegoLuigiBlocks = /*#__PURE__*/function (_MarioBaseBlocks) {
  _inherits(Scratch3LegoLuigiBlocks, _MarioBaseBlocks);

  var _super = _createSuper(Scratch3LegoLuigiBlocks);

  function Scratch3LegoLuigiBlocks(runtime) {
    var _this;

    _classCallCheck(this, Scratch3LegoLuigiBlocks);

    _this = _super.call(this, new Hub(runtime, Scratch3LegoLuigiBlocks.EXTENSION_ID, 0x44));

    if (runtime.formatMessage) {
      // Replace 'formatMessage' to a formatter which is used in the runtime.
      formatMessage = runtime.formatMessage;
    }

    return _this;
  }

  _createClass(Scratch3LegoLuigiBlocks, [{
    key: "getInfo",
    value: function getInfo() {
      this.setupTranslations(formatMessage);
      return {
        id: Scratch3LegoLuigiBlocks.EXTENSION_ID,
        name: 'LEGO Luigi',
        extensionURL: Scratch3LegoLuigiBlocks.extensionURL,
        blockIconURI: blockIconURI,
        showStatusButton: true,
        blocks: this.getBlocks(formatMessage),
        menus: this.getMenus(formatMessage)
      };
    }
  }], [{
    key: "EXTENSION_ID",
    get: function get() {
      return 'legoluigi';
    }
  }, {
    key: "extensionURL",
    get: function get() {
      return extensionURL;
    },
    set: function set(url) {
      extensionURL = url;
    }
  }]);

  return Scratch3LegoLuigiBlocks;
}(MarioBaseBlocks);

var blockClass = Scratch3LegoLuigiBlocks;
blockClass = Scratch3LegoLuigiBlocks;

export { blockClass, entry };
