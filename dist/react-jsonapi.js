(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('backbone'), require('backbone-relational'), require('underscore'), require('react-router/lib/RouterContext.js'), require('react-router/lib/computeChangedRoutes.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'backbone', 'backbone-relational', 'underscore', 'react-router/lib/RouterContext.js', 'react-router/lib/computeChangedRoutes.js'], factory) :
	(factory((global.reactJsonApi = global.reactJsonApi || {}),global.React,global.Backbone,global.backboneRelational,global._,global.RouterContext,global.computeChangedRoutes));
}(this, (function (exports,React,Backbone,backboneRelational,_,RouterContext,computeChangedRoutes) { 'use strict';

React = 'default' in React ? React['default'] : React;
Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
_ = 'default' in _ ? _['default'] : _;
RouterContext = 'default' in RouterContext ? RouterContext['default'] : RouterContext;
computeChangedRoutes = 'default' in computeChangedRoutes ? computeChangedRoutes['default'] : computeChangedRoutes;

var _defineProperty = (function (obj, key, value) {
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
});

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

// taken from https://github.com/xbill82/backbone-relational-jsonapi (MIT License)
// modified slightly

/*
The MIT License (MIT)

Copyright (c) 2015 Luca Marchesini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var _extend = Backbone.RelationalModel.extend;
Backbone.RelationalModel.extend = function (protoProps, classProps) {
	var ret = _extend.call(this, protoProps, classProps);

	if (protoProps.defaults && protoProps.defaults.type) {
		Backbone.modelFactory.registerModel(ret);
	}

	return ret;
};

var ModelFactory = function ModelFactory() {
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

var _objectWithoutProperties = (function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
});

// Taken from https://github.com/ryanflorence/async-props. (MIT License)
// Modified to pass location in addition to params and loadContext. 

/*
The MIT License (MIT)

Copyright (c) 2015 Ryan Florence

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*global __ASYNC_PROPS__*/
var _React$PropTypes = React.PropTypes;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;

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

var AsyncPropsContainer = React.createClass({

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

var AsyncProps = React.createClass({

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
});

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

var modelEvents = 'change invalid error request sync';
var collectionEvents = 'update reset sort error request sync';
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

var getRelations = function getRelations(options) {
    var relations = options.relations || [];
    (options.fragments || []).forEach(function (fragment) {
        relations = relations.concat(fragment.relations || []);
    });
    return _.uniq(relations, function (r) {
        return r.key;
    });
};

var getRelated = function getRelated(model, relation) {
    var r = model.getRelation(relation.key);
    // Use reverseRelation.type to have relation automatically added without
    // need for below code.
    //if (!relation) {
    //const relatedModel = relation.model;
    //r = _.find(relatedModel.prototype.relations, (r) => {
    //return r.reverseRelation.key === relation.key;
    //});
    //}
    return r.related;
};

var BackboneSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    if (!options.url) {
        (function () {
            var fetchOptions = model.fetchOptions || {};
            if (!model.urlRoot) {
                throw new Error();
            }
            var url = model.urlRoot;
            if (model instanceof Backbone.Model && fetchOptions.id) {
                url += '/' + fetchOptions.id;
            }

            var include = [];
            var fields = {};

            processRelation(model.model ? model.model : model.constructor, fetchOptions, [], include, fields);

            var params = [];
            if (include.length) {
                var includes = _.uniq(include.map(function (include) {
                    return include.join('.');
                }));
                params.push('include=' + includes.join(','));
            }
            _.each(fields, function (fields, type) {
                params.push('fields[' + type + ']=' + _.uniq(fields).join(','));
            });
            if (fetchOptions.sort) {
                params.push('sort=' + fetchOptions.sort.join(','));
            }
            if (fetchOptions.filter) {
                params.push('filter=' + fetchOptions.filter);
            }

            if (params.length) {
                url += '?' + params.join('&');
            }

            options.url = url;
        })();
    }

    return new Promise(function (resolve, reject) {
        model.syncing = true;
        model.textStatus = null;

        var promise = BackboneSync(method, model, options);
        promise.done(function (data, textStatus) {
            model.error = null;
            model.textStatus = textStatus;
            resolve(model);
        }).fail(function (jqXhr, textStatus, errorThrown) {
            model.error = errorThrown;
            model.textStatus = textStatus;

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

var processRelation = function processRelation(model, relation, path, include, fields) {
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

function APIComponent(WrappedComponent) {
    var queryPropTypes = WrappedComponent.queries || {};
    var fragmentPropTypes = WrappedComponent.fragments || {};

    var WrapperComponent = React.createClass({
        propTypes: Object.assign({}, WrappedComponent.propTypes, {
            initialQueries: React.PropTypes.object
        }),

        statics: {
            getInitialVars: function getInitialVars() {
                if (WrappedComponent.getInitialVars) {
                    return WrappedComponent.getInitialVars();
                } else if (WrappedComponent.initialVars) {
                    return WrappedComponent.initialVars;
                } else {
                    return {};
                }
            },
            loadProps: function loadProps(_ref, cb) {
                var params = _ref.params,
                    location = _ref.location,
                    loadContext = _ref.loadContext;

                var queries = new Queries(null, {}, queryPropTypes);
                queries._fetch({ params: params, location: location, loadContext: loadContext }).then(function () {
                    cb(null, {
                        initialQueries: queries
                    });
                });
            },

            queries: queryPropTypes,
            fragments: fragmentPropTypes
        },

        componentWillMount: function componentWillMount() {
            this.fragmentProps = {};
            this.componentWillReceiveProps(this.props);
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var isMatch = function isMatch(props1, props2) {
                var props1Keys = Object.keys(props1);
                return _.isEqual(_.sortBy(prop1Keys, _.identity), _.sortBy(Object.keys(props2), _.identity)) && _.all(prop1Keys.map(function (key) {
                    return props1[key] === props2[key];
                }));
            };
            var fragmentProps = _.pick(nextProps, Object.keys(fragmentPropTypes));
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
                this.fragments = new QueryFragments(this, fragmentProps, fragmentPropTypes);
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

    return WrapperComponent;
}

function Events(props, propOptions, element) {
    this.props = props;
    this.propOptions = propOptions;
    this.element = element;
}

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
});

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

        //if (this._element) {
        //this._element.forceUpdate();
        //}

        // ?
        if (this._events.props) {
            this._events._removeHandlers();
        }

        var propOptions = {};
        this.hasErrors = false;

        var promise = Promise.all(keys.map(function (key) {
            return new Promise(function (resolve) {
                // todo: add option to re-use existing models/collections rather than create new ones
                // downside is that if something else triggers a re-render during fetching,
                // the component may be rendered with partial or inconsistent data.
                var optionsFunc = _this5._queryPropTypes[key];
                var options = propOptions[key] = optionsFunc(params, location.query, _this5.pendingVars);
                var model = options.model;
                var modelOrCollection = model.prototype.model ? new model() : model.findOrCreate(_defineProperty({}, model.prototype.idAttribute, options.id));
                model._isInitialized = false;

                modelOrCollection.fetchOptions = options;

                fetchingProps[key] = modelOrCollection;

                modelOrCollection.fetch().then(function () {
                    resolve();
                }).catch(function () {
                    _this5.hasErrors = true;
                    resolve();
                });
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

exports.APIComponent = APIComponent;
exports.AsyncProps = AsyncProps;

Object.defineProperty(exports, '__esModule', { value: true });

})));
