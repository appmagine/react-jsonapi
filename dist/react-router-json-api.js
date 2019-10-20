!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[v][e]}})}function r(e){if("undefined"!=typeof System&&System.isModule?System.isModule(e):"[object Module]"===Object.prototype.toString.call(e))return e;var t={default:e,__useDefault:e};if(e&&e.__esModule)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return new o(t)}function o(e){Object.defineProperty(this,v,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(m(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return i(t,r),a(t,r,[]),t.module}function i(e,t){if(!t.depLoads){t.declare&&d(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&i(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function d(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,i=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var i=0;i<n.length;i++)n[i](o);return u=!1,t}},{id:t.key});"function"!=typeof i?(r.setters=i.setters,r.execute=i.execute):(r.setters=[],r.execute=i)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){var n={};return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:n,__useDefault:n},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,i=t[n],d=i.linkRecord;return u=d?-1===r.indexOf(i)?a(i,d,r):d.moduleObj:i.module,"__useDefault"in u?u.__useDefault:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var i=0;i<r.deps.length;i++){var d=r.depLoads[i],l=d.linkRecord;l&&-1===n.indexOf(d)&&(u=a(d,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=c.__useDefault=e},get:function(){return c.__useDefault}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var i=0;i<r.deps.length;i++)p(r.deps[i]);var v=r.execute.call(e,p,c.__useDefault,f);void 0!==v?c.default=c.__useDefault=v:f.exports!==c.__useDefault&&(c.default=c.__useDefault=f.exports);var m=c.__useDefault;if(m&&m.__esModule)for(var b in m)Object.hasOwnProperty.call(m,b)&&(c[b]=m[b])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var i=0;i<t.importerSetters.length;i++)t.importerSetters[i](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},v="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var m="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,i){return function(d){d(function(d){var s={_nodeRequire:m,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));i(s);var v=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?v.__useDefault:(v instanceof o&&Object.defineProperty(v,"__esModule",{value:!0}),v)})}}}("undefined"!=typeof self?self:"undefined"!=typeof global?global:this)

(["a"], ["1d","1c","1f","20","13","1e"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('b', ['c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var emptyObject = {};

  if ('production' !== 'production') {
    Object.freeze(emptyObject);
  }

  module.exports = emptyObject;
});
$__System.registerDynamic('d', ['c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  'use strict';

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

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var validateFormat = function validateFormat(format) {};

  if ('production' !== 'production') {
    validateFormat = function validateFormat(format) {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    };
  }

  function invariant(condition, format, a, b, c, d, e, f) {
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

  module.exports = invariant;
});
$__System.registerDynamic("e", ["c"], true, function ($__require, exports, module) {
  "use strict";

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * 
   */

  var process = $__require("c");
  var global = this || self,
      GLOBAL = global;
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
  var emptyFunction = function emptyFunction() {};

  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function () {
    return this;
  };
  emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
  };

  module.exports = emptyFunction;
});
$__System.registerDynamic('f', ['e', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var emptyFunction = $__require('e');

  /**
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var warning = emptyFunction;

  if ('production' !== 'production') {
    var printWarning = function printWarning(format) {
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

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  module.exports = warning;
});
$__System.registerDynamic('10', ['11', 'b', 'd', 'f', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var _assign = $__require('11');

  var emptyObject = $__require('b');
  var _invariant = $__require('d');

  if ('production' !== 'production') {
    var warning = $__require('f');
  }

  var MIXINS_KEY = 'mixins';

  // Helper function to allow the creation of anonymous functions which do not
  // have .name set to the name of the variable being assigned to.
  function identity(fn) {
    return fn;
  }

  var ReactPropTypeLocationNames;
  if ('production' !== 'production') {
    ReactPropTypeLocationNames = {
      prop: 'prop',
      context: 'context',
      childContext: 'child context'
    };
  } else {
    ReactPropTypeLocationNames = {};
  }

  function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
    /**
     * Policies that describe methods in `ReactClassInterface`.
     */

    var injectedMixins = [];

    /**
     * Composite components are higher-level components that compose other composite
     * or host components.
     *
     * To create a new type of `ReactClass`, pass a specification of
     * your new class to `React.createClass`. The only requirement of your class
     * specification is that you implement a `render` method.
     *
     *   var MyComponent = React.createClass({
     *     render: function() {
     *       return <div>Hello World</div>;
     *     }
     *   });
     *
     * The class specification supports a specific protocol of methods that have
     * special meaning (e.g. `render`). See `ReactClassInterface` for
     * more the comprehensive protocol. Any other properties and methods in the
     * class specification will be available on the prototype.
     *
     * @interface ReactClassInterface
     * @internal
     */
    var ReactClassInterface = {
      /**
       * An array of Mixin objects to include when defining your component.
       *
       * @type {array}
       * @optional
       */
      mixins: 'DEFINE_MANY',

      /**
       * An object containing properties and methods that should be defined on
       * the component's constructor instead of its prototype (static methods).
       *
       * @type {object}
       * @optional
       */
      statics: 'DEFINE_MANY',

      /**
       * Definition of prop types for this component.
       *
       * @type {object}
       * @optional
       */
      propTypes: 'DEFINE_MANY',

      /**
       * Definition of context types for this component.
       *
       * @type {object}
       * @optional
       */
      contextTypes: 'DEFINE_MANY',

      /**
       * Definition of context types this component sets for its children.
       *
       * @type {object}
       * @optional
       */
      childContextTypes: 'DEFINE_MANY',

      // ==== Definition methods ====

      /**
       * Invoked when the component is mounted. Values in the mapping will be set on
       * `this.props` if that prop is not specified (i.e. using an `in` check).
       *
       * This method is invoked before `getInitialState` and therefore cannot rely
       * on `this.state` or use `this.setState`.
       *
       * @return {object}
       * @optional
       */
      getDefaultProps: 'DEFINE_MANY_MERGED',

      /**
       * Invoked once before the component is mounted. The return value will be used
       * as the initial value of `this.state`.
       *
       *   getInitialState: function() {
       *     return {
       *       isOn: false,
       *       fooBaz: new BazFoo()
       *     }
       *   }
       *
       * @return {object}
       * @optional
       */
      getInitialState: 'DEFINE_MANY_MERGED',

      /**
       * @return {object}
       * @optional
       */
      getChildContext: 'DEFINE_MANY_MERGED',

      /**
       * Uses props from `this.props` and state from `this.state` to render the
       * structure of the component.
       *
       * No guarantees are made about when or how often this method is invoked, so
       * it must not have side effects.
       *
       *   render: function() {
       *     var name = this.props.name;
       *     return <div>Hello, {name}!</div>;
       *   }
       *
       * @return {ReactComponent}
       * @required
       */
      render: 'DEFINE_ONCE',

      // ==== Delegate methods ====

      /**
       * Invoked when the component is initially created and about to be mounted.
       * This may have side effects, but any external subscriptions or data created
       * by this method must be cleaned up in `componentWillUnmount`.
       *
       * @optional
       */
      componentWillMount: 'DEFINE_MANY',

      /**
       * Invoked when the component has been mounted and has a DOM representation.
       * However, there is no guarantee that the DOM node is in the document.
       *
       * Use this as an opportunity to operate on the DOM when the component has
       * been mounted (initialized and rendered) for the first time.
       *
       * @param {DOMElement} rootNode DOM element representing the component.
       * @optional
       */
      componentDidMount: 'DEFINE_MANY',

      /**
       * Invoked before the component receives new props.
       *
       * Use this as an opportunity to react to a prop transition by updating the
       * state using `this.setState`. Current props are accessed via `this.props`.
       *
       *   componentWillReceiveProps: function(nextProps, nextContext) {
       *     this.setState({
       *       likesIncreasing: nextProps.likeCount > this.props.likeCount
       *     });
       *   }
       *
       * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
       * transition may cause a state change, but the opposite is not true. If you
       * need it, you are probably looking for `componentWillUpdate`.
       *
       * @param {object} nextProps
       * @optional
       */
      componentWillReceiveProps: 'DEFINE_MANY',

      /**
       * Invoked while deciding if the component should be updated as a result of
       * receiving new props, state and/or context.
       *
       * Use this as an opportunity to `return false` when you're certain that the
       * transition to the new props/state/context will not require a component
       * update.
       *
       *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
       *     return !equal(nextProps, this.props) ||
       *       !equal(nextState, this.state) ||
       *       !equal(nextContext, this.context);
       *   }
       *
       * @param {object} nextProps
       * @param {?object} nextState
       * @param {?object} nextContext
       * @return {boolean} True if the component should update.
       * @optional
       */
      shouldComponentUpdate: 'DEFINE_ONCE',

      /**
       * Invoked when the component is about to update due to a transition from
       * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
       * and `nextContext`.
       *
       * Use this as an opportunity to perform preparation before an update occurs.
       *
       * NOTE: You **cannot** use `this.setState()` in this method.
       *
       * @param {object} nextProps
       * @param {?object} nextState
       * @param {?object} nextContext
       * @param {ReactReconcileTransaction} transaction
       * @optional
       */
      componentWillUpdate: 'DEFINE_MANY',

      /**
       * Invoked when the component's DOM representation has been updated.
       *
       * Use this as an opportunity to operate on the DOM when the component has
       * been updated.
       *
       * @param {object} prevProps
       * @param {?object} prevState
       * @param {?object} prevContext
       * @param {DOMElement} rootNode DOM element representing the component.
       * @optional
       */
      componentDidUpdate: 'DEFINE_MANY',

      /**
       * Invoked when the component is about to be removed from its parent and have
       * its DOM representation destroyed.
       *
       * Use this as an opportunity to deallocate any external resources.
       *
       * NOTE: There is no `componentDidUnmount` since your component will have been
       * destroyed by that point.
       *
       * @optional
       */
      componentWillUnmount: 'DEFINE_MANY',

      /**
       * Replacement for (deprecated) `componentWillMount`.
       *
       * @optional
       */
      UNSAFE_componentWillMount: 'DEFINE_MANY',

      /**
       * Replacement for (deprecated) `componentWillReceiveProps`.
       *
       * @optional
       */
      UNSAFE_componentWillReceiveProps: 'DEFINE_MANY',

      /**
       * Replacement for (deprecated) `componentWillUpdate`.
       *
       * @optional
       */
      UNSAFE_componentWillUpdate: 'DEFINE_MANY',

      // ==== Advanced methods ====

      /**
       * Updates the component's currently mounted DOM representation.
       *
       * By default, this implements React's rendering and reconciliation algorithm.
       * Sophisticated clients may wish to override this.
       *
       * @param {ReactReconcileTransaction} transaction
       * @internal
       * @overridable
       */
      updateComponent: 'OVERRIDE_BASE'
    };

    /**
     * Similar to ReactClassInterface but for static methods.
     */
    var ReactClassStaticInterface = {
      /**
       * This method is invoked after a component is instantiated and when it
       * receives new props. Return an object to update state in response to
       * prop changes. Return null to indicate no change to state.
       *
       * If an object is returned, its keys will be merged into the existing state.
       *
       * @return {object || null}
       * @optional
       */
      getDerivedStateFromProps: 'DEFINE_MANY_MERGED'
    };

    /**
     * Mapping from class specification keys to special processing functions.
     *
     * Although these are declared like instance properties in the specification
     * when defining classes using `React.createClass`, they are actually static
     * and are accessible on the constructor instead of the prototype. Despite
     * being static, they must be defined outside of the "statics" key under
     * which all other static methods are defined.
     */
    var RESERVED_SPEC_KEYS = {
      displayName: function (Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function (Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function (Constructor, childContextTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, childContextTypes, 'childContext');
        }
        Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function (Constructor, contextTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, contextTypes, 'context');
        }
        Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
      },
      /**
       * Special case getDefaultProps which should move into statics but requires
       * automatic merging.
       */
      getDefaultProps: function (Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function (Constructor, propTypes) {
        if ('production' !== 'production') {
          validateTypeDef(Constructor, propTypes, 'prop');
        }
        Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
      },
      statics: function (Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      },
      autobind: function () {}
    };

    function validateTypeDef(Constructor, typeDef, location) {
      for (var propName in typeDef) {
        if (typeDef.hasOwnProperty(propName)) {
          // use a warning instead of an _invariant so components
          // don't show up in prod but only in __DEV__
          if ('production' !== 'production') {
            warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName);
          }
        }
      }
    }

    function validateMethodOverride(isAlreadyDefined, name) {
      var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

      // Disallow overriding of base class methods unless explicitly allowed.
      if (ReactClassMixin.hasOwnProperty(name)) {
        _invariant(specPolicy === 'OVERRIDE_BASE', 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name);
      }

      // Disallow defining methods more than once unless explicitly allowed.
      if (isAlreadyDefined) {
        _invariant(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED', 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name);
      }
    }

    /**
     * Mixin helper which handles policy validation and reserved
     * specification keys when building React classes.
     */
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        if ('production' !== 'production') {
          var typeofSpec = typeof spec;
          var isMixinValid = typeofSpec === 'object' && spec !== null;

          if ('production' !== 'production') {
            warning(isMixinValid, "%s: You're attempting to include a mixin that is either null " + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec);
          }
        }

        return;
      }

      _invariant(typeof spec !== 'function', "ReactClass: You're attempting to " + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.');
      _invariant(!isValidElement(spec), "ReactClass: You're attempting to " + 'use a component as a mixin. Instead, just use a regular object.');

      var proto = Constructor.prototype;
      var autoBindPairs = proto.__reactAutoBindPairs;

      // By handling mixins before any other properties, we ensure the same
      // chaining order is applied to methods with DEFINE_MANY policy, whether
      // mixins are listed before or after these methods in the spec.
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }

      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }

        if (name === MIXINS_KEY) {
          // We have already handled mixins in a special case above.
          continue;
        }

        var property = spec[name];
        var isAlreadyDefined = proto.hasOwnProperty(name);
        validateMethodOverride(isAlreadyDefined, name);

        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          // Setup methods on prototype:
          // The following member methods should not be automatically bound:
          // 1. Expected ReactClass methods (in the "interface").
          // 2. Overridden methods (that were mixed in).
          var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

          if (shouldAutoBind) {
            autoBindPairs.push(name, property);
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactClassInterface[name];

              // These cases should already be caught by validateMethodOverride.
              _invariant(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY'), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name);

              // For methods which are defined more than once, call the existing
              // methods before calling the new property, merging if appropriate.
              if (specPolicy === 'DEFINE_MANY_MERGED') {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === 'DEFINE_MANY') {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ('production' !== 'production') {
                // Add verbose displayName to the function, which helps when looking
                // at profiling tools.
                if (typeof property === 'function' && spec.displayName) {
                  proto[name].displayName = spec.displayName + '_' + name;
                }
              }
            }
          }
        }
      }
    }

    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return;
      }

      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }

        var isReserved = name in RESERVED_SPEC_KEYS;
        _invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name);

        var isAlreadyDefined = name in Constructor;
        if (isAlreadyDefined) {
          var specPolicy = ReactClassStaticInterface.hasOwnProperty(name) ? ReactClassStaticInterface[name] : null;

          _invariant(specPolicy === 'DEFINE_MANY_MERGED', 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name);

          Constructor[name] = createMergedResultFunction(Constructor[name], property);

          return;
        }

        Constructor[name] = property;
      }
    }

    /**
     * Merge two objects, but throw if both contain the same key.
     *
     * @param {object} one The first object, which is mutated.
     * @param {object} two The second object
     * @return {object} one after it has been mutated to contain everything in two.
     */
    function mergeIntoWithNoDuplicateKeys(one, two) {
      _invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.');

      for (var key in two) {
        if (two.hasOwnProperty(key)) {
          _invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key);
          one[key] = two[key];
        }
      }
      return one;
    }

    /**
     * Creates a function that invokes two functions and merges their return values.
     *
     * @param {function} one Function to invoke first.
     * @param {function} two Function to invoke second.
     * @return {function} Function that invokes the two argument functions.
     * @private
     */
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        var c = {};
        mergeIntoWithNoDuplicateKeys(c, a);
        mergeIntoWithNoDuplicateKeys(c, b);
        return c;
      };
    }

    /**
     * Creates a function that invokes two functions and ignores their return vales.
     *
     * @param {function} one Function to invoke first.
     * @param {function} two Function to invoke second.
     * @return {function} Function that invokes the two argument functions.
     * @private
     */
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }

    /**
     * Binds a method to the component.
     *
     * @param {object} component Component whose method is going to be bound.
     * @param {function} method Method to be bound.
     * @return {function} The bound method.
     */
    function bindAutoBindMethod(component, method) {
      var boundMethod = method.bind(component);
      if ('production' !== 'production') {
        boundMethod.__reactBoundContext = component;
        boundMethod.__reactBoundMethod = method;
        boundMethod.__reactBoundArguments = null;
        var componentName = component.constructor.displayName;
        var _bind = boundMethod.bind;
        boundMethod.bind = function (newThis) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          // User is trying to bind() an autobound method; we effectively will
          // ignore the value of "this" that the user is trying to use, so
          // let's warn.
          if (newThis !== component && newThis !== null) {
            if ('production' !== 'production') {
              warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName);
            }
          } else if (!args.length) {
            if ('production' !== 'production') {
              warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName);
            }
            return boundMethod;
          }
          var reboundMethod = _bind.apply(boundMethod, arguments);
          reboundMethod.__reactBoundContext = component;
          reboundMethod.__reactBoundMethod = method;
          reboundMethod.__reactBoundArguments = args;
          return reboundMethod;
        };
      }
      return boundMethod;
    }

    /**
     * Binds all auto-bound methods in a component.
     *
     * @param {object} component Component whose method is going to be bound.
     */
    function bindAutoBindMethods(component) {
      var pairs = component.__reactAutoBindPairs;
      for (var i = 0; i < pairs.length; i += 2) {
        var autoBindKey = pairs[i];
        var method = pairs[i + 1];
        component[autoBindKey] = bindAutoBindMethod(component, method);
      }
    }

    var IsMountedPreMixin = {
      componentDidMount: function () {
        this.__isMounted = true;
      }
    };

    var IsMountedPostMixin = {
      componentWillUnmount: function () {
        this.__isMounted = false;
      }
    };

    /**
     * Add more to the ReactClass base class. These are all legacy features and
     * therefore not already part of the modern ReactComponent.
     */
    var ReactClassMixin = {
      /**
       * TODO: This will be deprecated because state should always keep a consistent
       * type signature and the only use case for this, is to avoid that.
       */
      replaceState: function (newState, callback) {
        this.updater.enqueueReplaceState(this, newState, callback);
      },

      /**
       * Checks whether or not this composite component is mounted.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function () {
        if ('production' !== 'production') {
          warning(this.__didWarnIsMounted, '%s: isMounted is deprecated. Instead, make sure to clean up ' + 'subscriptions and pending requests in componentWillUnmount to ' + 'prevent memory leaks.', this.constructor && this.constructor.displayName || this.name || 'Component');
          this.__didWarnIsMounted = true;
        }
        return !!this.__isMounted;
      }
    };

    var ReactClassComponent = function () {};
    _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

    /**
     * Creates a composite component class given a class specification.
     * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
     *
     * @param {object} spec Class specification (which must define `render`).
     * @return {function} Component constructor function.
     * @public
     */
    function createClass(spec) {
      // To keep our warnings more understandable, we'll use a little hack here to
      // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
      // unnecessarily identify a class without displayName as 'Constructor'.
      var Constructor = identity(function (props, context, updater) {
        // This constructor gets overridden by mocks. The argument is used
        // by mocks to assert on what gets mounted.

        if ('production' !== 'production') {
          warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory');
        }

        // Wire up auto-binding
        if (this.__reactAutoBindPairs.length) {
          bindAutoBindMethods(this);
        }

        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;

        this.state = null;

        // ReactClasses doesn't have constructors. Instead, they use the
        // getInitialState and componentWillMount methods for initialization.

        var initialState = this.getInitialState ? this.getInitialState() : null;
        if ('production' !== 'production') {
          // We allow auto-mocks to proceed as if they're returning null.
          if (initialState === undefined && this.getInitialState._isMockFunction) {
            // This is probably bad practice. Consider warning here and
            // deprecating this convenience.
            initialState = null;
          }
        }
        _invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent');

        this.state = initialState;
      });
      Constructor.prototype = new ReactClassComponent();
      Constructor.prototype.constructor = Constructor;
      Constructor.prototype.__reactAutoBindPairs = [];

      injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

      mixSpecIntoComponent(Constructor, IsMountedPreMixin);
      mixSpecIntoComponent(Constructor, spec);
      mixSpecIntoComponent(Constructor, IsMountedPostMixin);

      // Initialize the defaultProps property after all mixins have been merged.
      if (Constructor.getDefaultProps) {
        Constructor.defaultProps = Constructor.getDefaultProps();
      }

      if ('production' !== 'production') {
        // This is a tag to indicate that the use of these method names is ok,
        // since it's used with createClass. If it's not, then it's likely a
        // mistake so we'll warn you to use the static property, property
        // initializer or constructor respectively.
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps.isReactClassApproved = {};
        }
        if (Constructor.prototype.getInitialState) {
          Constructor.prototype.getInitialState.isReactClassApproved = {};
        }
      }

      _invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.');

      if ('production' !== 'production') {
        warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component');
        warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component');
        warning(!Constructor.prototype.UNSAFE_componentWillRecieveProps, '%s has a method called UNSAFE_componentWillRecieveProps(). ' + 'Did you mean UNSAFE_componentWillReceiveProps()?', spec.displayName || 'A component');
      }

      // Reduce time spent doing lookups by setting these on the prototype.
      for (var methodName in ReactClassInterface) {
        if (!Constructor.prototype[methodName]) {
          Constructor.prototype[methodName] = null;
        }
      }

      return Constructor;
    }

    return createClass;
  }

  module.exports = factory;
});
$__System.registerDynamic('12', ['13', '10', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var React = $__require('13');
  var factory = $__require('10');

  if (typeof React === 'undefined') {
    throw Error('create-react-class could not find the React object. If you are using script tags, ' + 'make sure that React is being loaded before create-react-class.');
  }

  // Hack to grab NoopUpdateQueue from isomorphic React
  var ReactNoopUpdateQueue = new React.Component().updater;

  module.exports = factory(React.Component, React.isValidElement, ReactNoopUpdateQueue);
});
$__System.registerDynamic("14", ["c"], true, function ($__require, exports, module) {
  /** @license React v16.8.6
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';
  var process = $__require("c");
  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: !0 });
  var b = "function" === typeof Symbol && Symbol.for,
      c = b ? Symbol.for("react.element") : 60103,
      d = b ? Symbol.for("react.portal") : 60106,
      e = b ? Symbol.for("react.fragment") : 60107,
      f = b ? Symbol.for("react.strict_mode") : 60108,
      g = b ? Symbol.for("react.profiler") : 60114,
      h = b ? Symbol.for("react.provider") : 60109,
      k = b ? Symbol.for("react.context") : 60110,
      l = b ? Symbol.for("react.async_mode") : 60111,
      m = b ? Symbol.for("react.concurrent_mode") : 60111,
      n = b ? Symbol.for("react.forward_ref") : 60112,
      p = b ? Symbol.for("react.suspense") : 60113,
      q = b ? Symbol.for("react.memo") : 60115,
      r = b ? Symbol.for("react.lazy") : 60116;function t(a) {
    if ("object" === typeof a && null !== a) {
      var u = a.$$typeof;switch (u) {case c:
          switch (a = a.type, a) {case l:case m:case e:case g:case f:case p:
              return a;default:
              switch (a = a && a.$$typeof, a) {case k:case n:case h:
                  return a;default:
                  return u;}}case r:case q:case d:
          return u;}
    }
  }function v(a) {
    return t(a) === m;
  }exports.typeOf = t;exports.AsyncMode = l;exports.ConcurrentMode = m;exports.ContextConsumer = k;exports.ContextProvider = h;exports.Element = c;exports.ForwardRef = n;
  exports.Fragment = e;exports.Lazy = r;exports.Memo = q;exports.Portal = d;exports.Profiler = g;exports.StrictMode = f;exports.Suspense = p;exports.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || "object" === typeof a && null !== a && (a.$$typeof === r || a.$$typeof === q || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n);
  };exports.isAsyncMode = function (a) {
    return v(a) || t(a) === l;
  };exports.isConcurrentMode = v;exports.isContextConsumer = function (a) {
    return t(a) === k;
  };
  exports.isContextProvider = function (a) {
    return t(a) === h;
  };exports.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c;
  };exports.isForwardRef = function (a) {
    return t(a) === n;
  };exports.isFragment = function (a) {
    return t(a) === e;
  };exports.isLazy = function (a) {
    return t(a) === r;
  };exports.isMemo = function (a) {
    return t(a) === q;
  };exports.isPortal = function (a) {
    return t(a) === d;
  };exports.isProfiler = function (a) {
    return t(a) === g;
  };exports.isStrictMode = function (a) {
    return t(a) === f;
  };
  exports.isSuspense = function (a) {
    return t(a) === p;
  };
});
$__System.registerDynamic('15', ['c'], true, function ($__require, exports, module) {
  /** @license React v16.8.6
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  if ('production' !== "production") {
    (function () {
      'use strict';

      Object.defineProperty(exports, '__esModule', { value: true });

      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;

      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' ||
        // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
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

      var lowPriorityWarning = function () {};

      {
        var printWarning = function (format) {
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

        lowPriorityWarning = function (condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
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

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
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
      }

      // AsyncMode is deprecated along with isAsyncMode
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

      var hasWarnedAboutDeprecatedIsAsyncMode = false;

      // AsyncMode should be deprecated
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
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
});
$__System.registerDynamic('16', ['14', '15', 'c'], true, function ($__require, exports, module) {
  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  if ('production' === 'production') {
    module.exports = $__require('14');
  } else {
    module.exports = $__require('15');
  }
});
$__System.registerDynamic('11', [], true, function ($__require, exports, module) {
	/*
 object-assign
 (c) Sindre Sorhus
 @license MIT
 */

	'use strict';
	/* eslint-disable no-unused-vars */

	var global = this || self,
	    GLOBAL = global;
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
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
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

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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
});
$__System.registerDynamic('17', ['18', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var printWarning = function () {};

  if ('production' !== 'production') {
    var ReactPropTypesSecret = $__require('18');
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function (text) {
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
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if ('production' !== 'production') {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
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
  checkPropTypes.resetWarningCache = function () {
    if ('production' !== 'production') {
      loggedTypeFailures = {};
    }
  };

  module.exports = checkPropTypes;
});
$__System.registerDynamic('19', ['16', '11', '18', '17', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var ReactIs = $__require('16');
  var assign = $__require('11');

  var ReactPropTypesSecret = $__require('18');
  var checkPropTypes = $__require('17');

  var has = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning = function () {};

  if ('production' !== 'production') {
    printWarning = function (text) {
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

  module.exports = function (isValidElement, throwOnDirectAccess) {
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

    var ANONYMOUS = '<<anonymous>>';

    // Important!
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
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      if ('production' !== 'production') {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
            err.name = 'Invariant Violation';
            throw err;
          } else if ('production' !== 'production' && typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (!manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
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
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
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
        if (!ReactIs.isValidElementType(propValue)) {
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
        if ('production' !== 'production') {
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
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
        'production' !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
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
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
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
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
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
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
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
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
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
    }

    // This handles more types than `getPropType`. Only used for error messages.
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
    }

    // Returns a string that is postfixed to a warning about an invalid type.
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
    }

    // Returns class name of the object, if any.
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
});
$__System.registerDynamic('18', ['c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  module.exports = ReactPropTypesSecret;
});
$__System.registerDynamic('1a', ['18', 'c'], true, function ($__require, exports, module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  var ReactPropTypesSecret = $__require('18');

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  module.exports = function () {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
      err.name = 'Invariant Violation';
      throw err;
    };
    shim.isRequired = shim;
    function getShim() {
      return shim;
    };
    // Important!
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
});
$__System.registerDynamic("@system-env", [], true, function() {
  return {
    "default": true
  };
});

$__System.registerDynamic('c', ['@system-env'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // From https://github.com/defunctzombie/node-process/blob/master/browser.js
    // shim for using process in browser

    var productionEnv = $__require('@system-env').production;

    var process = module.exports = {};
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
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
        var timeout = setTimeout(cleanUpNextTick);
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
        clearTimeout(timeout);
    }

    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            setTimeout(drainQueue, 0);
        }
    };

    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {
        NODE_ENV: productionEnv ? 'production' : 'development'
    };
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};

    function noop() {}

    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;

    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };

    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
});
$__System.registerDynamic('1b', ['16', '19', '1a', 'c'], true, function ($__require, exports, module) {
  var process = $__require('c');
  var global = this || self,
      GLOBAL = global;
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  if ('production' !== 'production') {
    var ReactIs = $__require('16');

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = $__require('19')(ReactIs.isElement, throwOnDirectAccess);
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = $__require('1a')();
  }
});
$__System.register('a', ['1c', '1d', '1e', '13', '1f', '20', '12', '1b'], function (_export, _context) {
    "use strict";

    var Backbone, _, React, RouterContext, computeChangedRoutes, createReactClass, PropTypes, _defineProperty, _extends, _extend, ModelFactory, _objectWithoutProperties, array, func, object, AsyncPropsContainer, AsyncProps, modelEvents, collectionEvents, getRelations, getRelated, BackboneSync, processRelation, collectionCache;

    function eachComponents(components, iterator) {
        for (var i = 0, l = components.length; i < l; i++) {
            if (typeof components[i] === 'object') {
                for (var key in components[i]) {
                    iterator(components[i][key], i, key);
                }
            } else {
                iterator(components[i], i);
            }
        }
    }

    function filterAndFlattenComponents(components) {
        var flattened = [];
        eachComponents(components, function (Component) {
            if (Component && Component.loadProps) flattened.push(Component);
        });
        return flattened;
    }

    function _loadAsyncProps(_ref, cb) {
        var components = _ref.components,
            params = _ref.params,
            location = _ref.location,
            loadContext = _ref.loadContext;

        // flatten the multi-component routes
        var componentsArray = [];
        var propsArray = [];
        var needToLoadCounter = components.length;
        var hasCalledBack = [];

        var maybeFinish = function maybeFinish(err) {
            if (err) {
                // error occured, stop executing
                cb(err);
                return;
            }

            if (needToLoadCounter === 0) cb(null, { propsArray: propsArray, componentsArray: componentsArray });
        };

        // If there are no components we should resolve directly
        if (needToLoadCounter === 0) {
            return maybeFinish();
        }

        components.forEach(function (Component, index) {
            Component.loadProps({ params: params, location: location, loadContext: loadContext }, function (error, props) {
                if (hasCalledBack[index] && needToLoadCounter === 0) {
                    // deferred data
                    cb(error, {
                        propsArray: [props],
                        componentsArray: [Component]
                    });
                } else {
                    if (!hasCalledBack[index]) needToLoadCounter--;
                    propsArray[index] = props;
                    componentsArray[index] = Component;
                    hasCalledBack[index] = true;
                    maybeFinish(error);
                }
            });
        });
    }

    function lookupPropsForComponent(Component, propsAndComponents) {
        var componentsArray = propsAndComponents.componentsArray,
            propsArray = propsAndComponents.propsArray;

        var index = componentsArray.indexOf(Component);
        return propsArray[index];
    }

    function mergePropsAndComponents(current, changes) {
        for (var i = 0, l = changes.propsArray.length; i < l; i++) {
            var Component = changes.componentsArray[i];
            var position = current.componentsArray.indexOf(Component);
            var isNew = position === -1;

            if (isNew) {
                current.propsArray.push(changes.propsArray[i]);
                current.componentsArray.push(changes.componentsArray[i]);
            } else {
                current.propsArray[position] = changes.propsArray[i];
            }
        }
        return current;
    }

    function createElement(Component, props) {
        if (Component.loadProps) return React.createElement(AsyncPropsContainer, { Component: Component, routerProps: props });else return React.createElement(Component, props);
    }

    function hydrate(props) {
        if (typeof __ASYNC_PROPS__ !== 'undefined') return {
            propsArray: __ASYNC_PROPS__,
            componentsArray: filterAndFlattenComponents(props.components)
        };else return null;
    }

    function getUrl(model, fetchOptions) {
        var urlRoot = model.urlRoot;

        if (!urlRoot) {
            throw new Error("Missing urlRoot", model);
        }
        var url = urlRoot;
        if (model instanceof Backbone.Model && fetchOptions.id) {
            url += '/' + fetchOptions.id;
        }

        var include = [];
        var fields = {};

        processRelation(model.model ? model.model : model.constructor, fetchOptions, [], include, fields);

        var sort = fetchOptions.sort,
            filter = fetchOptions.filter,
            page = fetchOptions.page;

        var params = [];

        if (include.length) {
            var includes = _.sortBy(_.uniq(include.map(function (include) {
                return include.join('.');
            })), _.identity);
            params.push('include=' + includes.join(','));
        }

        _.each(_.sortBy(_.keys(fields), _.identity), function (type) {
            var typeFields = _.sortBy(_.uniq(fields[type]), _.identity);
            params.push('fields[' + type + ']=' + typeFields.join(','));
        });

        if (sort) {
            params.push('sort=' + sort);
        }

        if (filter) {
            if (typeof filter === "object") {
                _.each(_.sortBy(_.keys(filter), _.identity), function (key) {
                    var keyVal = filter[key];
                    params.push('filter[' + key + ']=' + keyVal);
                });
            } else {
                params.push('filter=' + filter);
            }
        }

        if (page) {
            if (typeof page === "object") {
                _.each(_.sortBy(_.keys(page), _.identity), function (key) {
                    var keyVal = page[key];
                    params.push('page[' + key + ']=' + keyVal);
                });
            } else {
                params.push('page=' + page);
            }
        }

        if (params.length) {
            url += '?' + params.join('&');
        }

        return url;
    }

    function withJsonApi(options, WrappedComponent) {
        var componentQueries = options.queries || {};
        var componentFragments = options.fragments || {};
        var initialVars = options.initialVars;
        var getInitialVars = options.getInitialVars;

        var displayName = WrappedComponent.displayName || WrappedComponent.name;

        return createReactClass({
            displayName: 'withJsonApi(' + displayName + ')',

            propTypes: Object.assign({}, WrappedComponent.propTypes, {
                initialQueries: PropTypes.object
            }),

            statics: {
                loadProps: function loadProps(_ref, cb) {
                    var params = _ref.params,
                        location = _ref.location,
                        loadContext = _ref.loadContext;

                    var getVars = function getVars() {
                        if (getInitialVars) {
                            return getInitialVars();
                        } else if (initialVars) {
                            return initialVars;
                        } else {
                            return {};
                        }
                    };

                    var queries = new Queries(null, getVars(), componentQueries);

                    queries._fetch({ params: params, location: location, loadContext: loadContext }).then(function () {
                        cb(null, {
                            initialQueries: queries
                        });
                    });
                },

                queries: componentQueries,
                fragments: componentFragments,
                initialVars: initialVars,
                getInitialVars: getInitialVars
            },

            componentWillMount: function componentWillMount() {
                this.fragmentProps = {};
                this.componentWillReceiveProps(this.props);
            },
            componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
                var fragmentProps = _.pick(nextProps, Object.keys(componentFragments));
                var hasFragmentProps = Object.keys(fragmentProps).length;

                if (nextProps.initialQueries && nextProps.initialQueries !== this.queries) {
                    if (this.queries) {
                        this.queries._events._removeHandlers();
                    }
                    this.queries = nextProps.initialQueries;
                    this.queries._element = this.queries._events.element = this;
                    this.queries._events._addHandlers();
                }

                if (hasFragmentProps && !_.isMatch(this.fragmentProps, fragmentProps)) {
                    this.fragmentProps = fragmentProps;
                    if (this.fragments) {
                        this.fragments._events._removeHandlers();
                    }
                    this.fragments = new QueryFragments(this, fragmentProps, componentFragments);
                    this.fragments._events._addHandlers();
                }
            },
            componentWillUnmount: function componentWillUnmount() {
                if (this.queries) {
                    this.queries._events._removeHandlers();
                }
                if (this.fragments) {
                    this.fragments._events._removeHandlers();
                }
            },
            render: function render() {
                return React.createElement(WrappedComponent, _extends({}, this.props, this.queries ? { queries: this.queries } : {}, this.queries ? this.queries._props : {}, this.fragments ? this.fragments._props : {}));
            }
        });
    }

    function Events(props, propOptions, element) {
        this.props = props;
        this.propOptions = propOptions;
        this.element = element;
    }

    function QueryFragments(element, props, propTypes) {
        this._events = new Events(props, propTypes, element);

        this._element = element;

        this._props = props;
        this._propTypes = propTypes;
    }

    function Queries(element, vars, propTypes) {
        this._events = new Events(null, propTypes, element);

        this._element = element;

        this._props = {};
        this.vars = vars;
        this.pendingVars = {};

        this._queryPropTypes = propTypes;

        this._addedHandlers = false;
    }

    function findOrCreateCollection(model, fetchOptions) {
        var url = getUrl(model.prototype, fetchOptions);

        if (!collectionCache[url]) {
            collectionCache[url] = new model();
        }

        return collectionCache[url];
    }

    return {
        setters: [function (_c) {
            Backbone = _c.default;
        }, function (_d) {}, function (_e) {
            _ = _e.default;
        }, function (_2) {
            React = _2.default;
        }, function (_f) {
            RouterContext = _f.default;
        }, function (_3) {
            computeChangedRoutes = _3.default;
        }, function (_4) {
            createReactClass = _4.default;
        }, function (_b) {
            PropTypes = _b.default;
        }],
        execute: function () {
            _defineProperty = function (obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    });
                } else {
                    obj[key] = value;
                }

                return obj;
            };

            _extends = Object.assign || function (target) {
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

            _extend = Backbone.RelationalModel.extend;

            Backbone.RelationalModel.extend = function (protoProps, classProps) {
                var ret = _extend.call(this, protoProps, classProps);

                if (protoProps.defaults && protoProps.defaults.type) {
                    Backbone.modelFactory.registerModel(ret);
                }

                return ret;
            };

            ModelFactory = function ModelFactory() {
                this.registeredModels = {};
            };

            ModelFactory.prototype.registerModel = function (model) {
                this.registeredModels[model.prototype.defaults.type] = model;
            };

            ModelFactory.prototype.findOrCreate = function (data) {
                if (this.registeredModels[data.type]) return this.registeredModels[data.type].findOrCreate(data, { parse: true });
            };

            ModelFactory.prototype.createFromArray = function (items) {
                _.each(items, function (item) {
                    this.findOrCreate(item);
                }, this);
            };

            Backbone.modelFactory = new ModelFactory();

            Backbone.Collection.prototype.parse = function (response) {
                if (!response) return;

                if (response.included) Backbone.modelFactory.createFromArray(response.included);

                if (response.meta && this.handleMeta) this.handleMeta(response.meta);

                if (!response.data) {
                    return response;
                }

                return response.data;
            };

            Backbone.RelationalModel.prototype.parse = function (response) {
                if (!response) return;

                if (response.included) Backbone.modelFactory.createFromArray(response.included);

                if (response.data) {
                    response = response.data;
                }

                if (response.meta && this.handleMeta) this.handleMeta(response.meta);

                var data = response.attributes || {};
                data.id = response.id;

                if (response.relationships) {
                    var simplifiedRelations = _.mapObject(response.relationships, function (value) {
                        return value.data;
                    });

                    _.extend(data, simplifiedRelations);
                }

                return data;
            };

            _objectWithoutProperties = function (obj, keys) {
                var target = {};

                for (var i in obj) {
                    if (keys.indexOf(i) >= 0) continue;
                    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                    target[i] = obj[i];
                }

                return target;
            };

            array = PropTypes.array;
            func = PropTypes.func;
            object = PropTypes.object;
            AsyncPropsContainer = createReactClass({

                propTypes: {
                    Component: func.isRequired,
                    routerProps: object.isRequired
                },

                contextTypes: {
                    asyncProps: object.isRequired
                },

                render: function render() {
                    var _props = this.props,
                        Component = _props.Component,
                        routerProps = _props.routerProps,
                        props = _objectWithoutProperties(_props, ['Component', 'routerProps']);

                    var _context$asyncProps = this.context.asyncProps,
                        propsAndComponents = _context$asyncProps.propsAndComponents,
                        loading = _context$asyncProps.loading,
                        reloadComponent = _context$asyncProps.reloadComponent;

                    var asyncProps = lookupPropsForComponent(Component, propsAndComponents);
                    var reload = function reload() {
                        return reloadComponent(Component);
                    };
                    return React.createElement(Component, _extends({}, props, routerProps, asyncProps, {
                        reloadAsyncProps: reload,
                        loading: loading
                    }));
                }
            });

            _export('AsyncProps', AsyncProps = createReactClass({

                childContextTypes: {
                    asyncProps: object
                },

                propTypes: {
                    loadContext: object,
                    components: array.isRequired,
                    params: object.isRequired,
                    location: object.isRequired,
                    onError: func.isRequired,
                    renderLoading: func.isRequired,

                    // server rendering
                    propsArray: array,
                    componentsArray: array
                },

                getDefaultProps: function getDefaultProps() {
                    return {
                        onError: function onError(err) {
                            throw err;
                        },
                        renderLoading: function renderLoading() {
                            return null;
                        },
                        render: function render(props) {
                            return React.createElement(RouterContext, _extends({}, props, { createElement: createElement }));
                        }
                    };
                },
                getInitialState: function getInitialState() {
                    var _props2 = this.props,
                        propsArray = _props2.propsArray,
                        componentsArray = _props2.componentsArray;

                    var isServerRender = propsArray && componentsArray;
                    return {
                        loading: false,
                        prevProps: null,
                        propsAndComponents: isServerRender ? { propsArray: propsArray, componentsArray: componentsArray } : hydrate(this.props)
                    };
                },
                getChildContext: function getChildContext() {
                    var _this = this;

                    var _state = this.state,
                        loading = _state.loading,
                        propsAndComponents = _state.propsAndComponents;

                    return {
                        asyncProps: {
                            loading: loading,
                            propsAndComponents: propsAndComponents,
                            reloadComponent: function reloadComponent(Component) {
                                _this.reloadComponent(Component);
                            }
                        }
                    };
                },
                componentDidMount: function componentDidMount() {
                    var wasHydrated = this.state.propsAndComponents !== null;
                    if (!wasHydrated) {
                        var _props3 = this.props,
                            components = _props3.components,
                            params = _props3.params,
                            location = _props3.location;

                        this.loadAsyncProps(components, params, location);
                    }
                },
                componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
                    if (nextProps.location === this.props.location) return;

                    var _computeChangedRoutes = computeChangedRoutes({ routes: this.props.routes, params: this.props.params }, { routes: nextProps.routes, params: nextProps.params }),
                        enterRoutes = _computeChangedRoutes.enterRoutes;

                    var indexDiff = nextProps.components.length - enterRoutes.length;
                    var components = [];
                    for (var i = 0, l = enterRoutes.length; i < l; i++) {
                        components.push(nextProps.components[indexDiff + i]);
                    }this.loadAsyncProps(filterAndFlattenComponents(components), nextProps.params, nextProps.location);
                },
                handleError: function handleError(cb) {
                    var _this2 = this;

                    return function (err) {
                        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                            args[_key - 1] = arguments[_key];
                        }

                        if (err && _this2.props.onError) _this2.props.onError(err);else cb.apply(undefined, [null].concat(args));
                    };
                },
                componentWillUnmount: function componentWillUnmount() {
                    this._unmounted = true;
                },
                loadAsyncProps: function loadAsyncProps(components, params, location, options) {
                    var _this3 = this;

                    var loadContext = this.props.loadContext;

                    this.setState({
                        loading: true,
                        prevProps: this.props
                    }, function () {
                        _loadAsyncProps({
                            components: filterAndFlattenComponents(components),
                            params: params,
                            location: location,
                            loadContext: loadContext
                        }, _this3.handleError(function (err, propsAndComponents) {
                            var reloading = options && options.reload;
                            var didNotChangeRoutes = _this3.props.location === location;
                            // FIXME: next line has potential (rare) race conditions I think. If
                            // somebody calls reloadAsyncProps, changes location, then changes
                            // location again before its done and state gets out of whack (Rx folks
                            // are like "LOL FLAT MAP LATEST NEWB"). Will revisit later.
                            if ((reloading || didNotChangeRoutes) && !_this3._unmounted) {
                                if (_this3.state.propsAndComponents) {
                                    propsAndComponents = mergePropsAndComponents(_this3.state.propsAndComponents, propsAndComponents);
                                }
                                _this3.setState({
                                    loading: false,
                                    propsAndComponents: propsAndComponents,
                                    prevProps: null
                                });
                            }
                        }));
                    });
                },
                reloadComponent: function reloadComponent(Component) {
                    var params = this.props.params;

                    this.loadAsyncProps([Component], params, null, { reload: true });
                },
                render: function render() {
                    var propsAndComponents = this.state.propsAndComponents;

                    if (!propsAndComponents) {
                        return this.props.renderLoading();
                    } else {
                        var props = this.state.loading ? this.state.prevProps : this.props;
                        return this.props.render(props);
                    }
                }
            }));

            // Monkey-patch to fix an apparent bug.
            Backbone.RelationalModel.prototype.set = function (key, value, options) {
                Backbone.Relational.eventQueue.block();

                // Duplicate backbone's behavior to allow separate key/value parameters, instead of a single 'attributes' object
                var attributes, result;

                if (_.isObject(key) || key == null) {
                    attributes = key;
                    options = value;
                } else {
                    attributes = {};
                    attributes[key] = value;
                }

                try {
                    var id = this.id,
                        newId = attributes && this.idAttribute in attributes && attributes[this.idAttribute];

                    // Check if we're not setting a duplicate id before actually calling `set`.
                    Backbone.Relational.store.checkId(this, newId);

                    result = Backbone.Model.prototype.set.apply(this, arguments);

                    // Ideal place to set up relations, if this is the first time we're here for this model
                    // Change required to work.
                    {
                        //if ( !this._isInitialized && !this.isLocked() ) {
                        this.constructor.initializeModelHierarchy();

                        // Only register models that have an id. A model will be registered when/if it gets an id later on.
                        if (newId || newId === 0) {
                            Backbone.Relational.store.register(this);
                        }

                        this.initializeRelations(options);
                    }

                    if (attributes) {
                        this.updateRelations(attributes, options);
                    }
                } finally {
                    // Try to run the global queue holding external events
                    Backbone.Relational.eventQueue.unblock();
                }

                return result;
            };

            modelEvents = 'change invalid error request sync';
            collectionEvents = 'update reset sort error request sync';


            Backbone.Collection.prototype.bindRelationEvents = function (callback, context, options) {
                this.on(collectionEvents, callback, context);
                this.models.forEach(function (model) {
                    model.bindRelationEvents(callback, context, options);
                });

                this.on('add', function (model) {
                    model.bindRelationEvents(callback, context, options);
                }, context);

                this.on('remove', function (model) {
                    model.unbindRelationEvents(context, options);
                }, context);
            };

            Backbone.RelationalModel.prototype.bindRelationEvents = function (callback, context, options) {
                var _this = this;

                var relations = getRelations(options);

                this.on(modelEvents, callback, context);

                relations.forEach(function (relation) {
                    var related = getRelated(_this, relation);
                    related.bindRelationEvents(callback, context, relation);
                });
            };

            Backbone.Collection.prototype.unbindRelationEvents = function (context, options) {
                this.models.forEach(function (model) {
                    model.unbindRelationEvents(context, options);
                });

                this.off(null, null, context);
            };

            Backbone.RelationalModel.prototype.unbindRelationEvents = function (context, options) {
                var _this2 = this;

                this.off(null, null, context);

                var relations = getRelations(options);

                relations.forEach(function (relation) {
                    var related = getRelated(_this2, relation);
                    related.unbindRelationEvents(context, relation);
                });
            };

            getRelations = function getRelations(options) {
                var relations = options.relations || [];
                (options.fragments || []).forEach(function (fragment) {
                    relations = relations.concat(fragment.relations || []);
                });
                return _.uniq(relations, function (r) {
                    return r.key;
                });
            };

            getRelated = function getRelated(model, relation) {
                var r = model.getRelation(relation.key);
                return r.related;
            };

            BackboneSync = Backbone.sync;


            Backbone.sync = function (method, model, options) {
                if (!options.url) {
                    options.url = getUrl(model, model.fetchOptions);
                }

                return new Promise(function (resolve, reject) {
                    model.syncing = true;
                    model.textStatus = null;

                    var promise = BackboneSync(method, model, options);
                    promise.done(function (data, textStatus) {
                        model.error = null;

                        resolve(model);
                    }).fail(function (jqXhr, textStatus, errorThrown) {
                        model.error = errorThrown;

                        if (options.allowFail) {
                            reject(model);
                        } else {
                            resolve(model);
                        }
                    }).always(function () {
                        model.syncing = false;
                        // Required to ensure handlers see attributes set above.
                        model.trigger('change');
                    });
                });
            };
            processRelation = function processRelation(model, relation, path, include, fields) {
                var fragments = relation.fragments || [];
                var relationRelations = relation.relations || [];
                var relationFields = relation.fields || [];
                fragments.forEach(function (fragment) {
                    relationRelations = relationRelations.concat(fragment.relations || []);
                    relationFields = relationFields.concat(fragment.fields || []);
                });
                relationRelations = _.uniq(relationRelations, function (r) {
                    return r.key;
                });

                if (relationFields.length) {
                    var type = model.prototype.defaults.type;
                    fields[type] = (fields[type] || []).concat(relationFields);
                }

                relationRelations.forEach(function (relation) {
                    var newPath = path.concat(relation.key);
                    include.push(newPath);
                    var relatedModel = _.find(model.prototype.relations, function (r) {
                        return r.key === relation.key;
                    }).relatedModel;
                    processRelation(relatedModel, relation, newPath, include, fields);
                });
            };

            Object.assign(Events.prototype, {
                _addHandlers: function _addHandlers() {
                    var _this3 = this;

                    var forceUpdate = function forceUpdate() {
                        if (_this3.element) {
                            _this3.element.forceUpdate();
                        }
                    };

                    Object.keys(this.props).forEach(function (key) {
                        var options = _this3.propOptions[key];

                        _this3.props[key].bindRelationEvents(forceUpdate, _this3.element, options);
                    });

                    this._addedHandlers = true;
                },
                _removeHandlers: function _removeHandlers() {
                    var _this4 = this;

                    Object.keys(this.props).forEach(function (key) {
                        _this4.props[key].unbindRelationEvents(_this4.element, _this4.propOptions[key]);
                    });
                }
            });collectionCache = {};
            Object.assign(Queries.prototype, {
                /**
                 * Set the current vars to `vars` and trigger a re-fetch.  Once fetching is
                 * initiated, the component will re-render with the previous vars as
                 * queries.vars and the current vars as queries.pendingVars.
                 */
                setVars: function setVars(vars) {
                    this.pendingVars = Object.assign({}, this.vars, vars);
                    this._fetch(this._element.props);
                },
                _fetch: function _fetch(_ref2) {
                    var _this5 = this;

                    var params = _ref2.params,
                        location = _ref2.location,
                        loadContext = _ref2.loadContext;

                    var keys = Object.keys(this._queryPropTypes);
                    if (!keys.length) {
                        return Promise.resolve();
                    }

                    var fetchingProps = {};

                    this.fetching = true;

                    if (this._events.props) {
                        this._events._removeHandlers();
                    }

                    var propOptions = {};
                    this.hasErrors = false;

                    var promise = Promise.all(keys.map(function (key) {
                        return new Promise(function (resolve) {
                            var options = propOptions[key] = _this5._queryPropTypes[key](params, location.query, _this5.pendingVars);
                            var model = options.model;
                            var modelOrCollection = model.prototype.model ? findOrCreateCollection(model, options) : model.findOrCreate(_defineProperty({}, model.prototype.idAttribute, options.id));

                            modelOrCollection._isInitialized = false;

                            var existingFetchPromise = modelOrCollection.fetchPromise;

                            if (existingFetchPromise) {
                                existingFetchPromise.then(function () {
                                    resolve();
                                }).catch(function () {
                                    resolve();
                                });
                            } else {
                                modelOrCollection.fetchOptions = options;

                                fetchingProps[key] = modelOrCollection;

                                var fetchPromise = modelOrCollection.fetch();

                                modelOrCollection.fetchPromise = fetchPromise;

                                fetchPromise.catch(function () {
                                    _this5.hasErrors = true;
                                    modelOrCollection.fetchPromise = null;
                                    resolve();
                                }).then(function () {
                                    modelOrCollection.fetchPromise = null;
                                    resolve();
                                });
                            }
                        });
                    }));

                    promise.then(function () {
                        var isAlreadyLoaded = _this5._events.props;
                        _this5._props = fetchingProps;
                        _this5._events.propOptions = propOptions;
                        _this5._events.props = _this5._props;

                        _this5.vars = _this5.pendingVars;
                        _this5.pendingVars = null;
                        _this5.fetching = false;

                        if (isAlreadyLoaded) {
                            _this5._events._addHandlers();
                            _this5._element.forceUpdate();
                        }
                    });

                    return promise;
                }
            });

            _export('withJsonApi', withJsonApi);

            _export('AsyncProps', AsyncProps);
        }
    };
});
})
(function(factory) {
  module.exports = factory(require("backbone-relational"), require("backbone"), require("react-router/lib/RouterContext.js"), require("react-router/lib/computeChangedRoutes.js"), require("react"), require("underscore"));
});