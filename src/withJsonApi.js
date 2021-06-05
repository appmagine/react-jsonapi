import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Backbone from 'backbone';
import 'backbone-relational';
import _ from 'underscore';

import './backbone-relational-jsonapi';

export default function withJsonApi(queries, WrappedComponent) {
    const options = queries.options || {};
    queries = queries.queries || queries;

    const componentQueries = _.pick(queries, (val, name) => {
        return _.isFunction(val);
    });
    const componentFragments = _.pick(queries, (val, name) => {
        return !_.isFunction(val);
    });
    const initialVars = options.initialVars;
    const getInitialVars = options.getInitialVars;

    const displayName = WrappedComponent.displayName || WrappedComponent.name;

    const getVars = () => {
        if (getInitialVars) {
            return getInitialVars();
        } else if (initialVars) {
            return initialVars;
        } else {
            return {};
        }
    };
    
    const firstQuery = _.first(_.values(componentQueries));
    const isStandalone = firstQuery && 
        getArgs(firstQuery).indexOf("props") !== -1;

    const APIComponent = createReactClass({
        displayName: displayName 
            ? `withJsonApi(${displayName})`
            : undefined,

        propTypes: Object.assign(
            {}, 
            WrappedComponent.propTypes,
            {
                initialQueries: PropTypes.object
            }
        ),

        statics: {
            loadProps({ params, location, loadContext, props }, cb) {
                const queries = new QueriesProp({
                    element: null, 
                    vars: getVars(),
                    propTypes: componentQueries,
                    ...options
                });

                queries._fetch({ params, location, loadContext, props }).then(() => {
                    cb(null, {
                        initialQueries: queries
                    });
                });
            },
            fragments: componentFragments,
            initialVars: initialVars,
            getInitialVars: getInitialVars,
            wrappedComponent: WrappedComponent
        },

        componentWillMount() {
            this.fragmentProps = {};
            this.componentWillReceiveProps(this.props);
        },
        
        componentWillReceiveProps(nextProps) {
            const isMatch = (props1, props2) => {
                const props1Keys = Object.keys(props1);
                return _.isEqual(
                    _.sortBy(props1Keys, _.identity),
                    _.sortBy(Object.keys(props2), _.identity)
                ) && _.all(props1Keys.map((key) => {
                    return props1[key] === props2[key];
                }));
            };
            const fragmentProps = _.pick(
                nextProps, 
                Object.keys(componentFragments)
            );
            const hasFragmentProps = Object.keys(fragmentProps).length;

            if (nextProps.initialQueries && 
                nextProps.initialQueries !== this.queries
            ) {
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
                this.fragments = new QueryFragments({
                    element: this, 
                    props: fragmentProps, 
                    propTypes: componentFragments
                });
                this.fragments._events._addHandlers();
            }
        },

        componentWillUnmount() {
            if (this.queries) {
                this.queries._events._removeHandlers();
            }
            if (this.fragments) {
                this.fragments._events._removeHandlers();
            }
        },

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.queries ? {queries: this.queries} : {}}
                    {...this.queries ? this.queries._queryProps : {}}
                    {...this.fragments ? this.fragments._props : {}}
                />
            );
        }
    });
    
    if (isStandalone) {
        return createReactClass({
            displayName: 'withJsonApiOuter',

            componentWillMount() {
                this.initialQueries = null;
                this.componentWillReceiveProps(this.props);
            },

            componentWillReceiveProps(nextProps, nextContext) {
                if (_.isEqual(this.props, nextProps) &&
                    _.isEqual(this.context, nextContext)
                ) {
                    return;
                }

                APIComponent.loadProps({ props: nextProps }, (error, props) => {
                    this.initialQueries = props.initialQueries;
                    this.forceUpdate();
                });
            },

            render() {
                return (
                    <APIComponent 
                        initialQueries={this.initialQueries}
                        {...this.props} />
                );
            }
        });
    } else {
        return APIComponent;
    }
}

function getArgs(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/\(([^)]*)\)/)[1];

    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function(arg) {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        // Ensure no undefined values are added.
        return arg;
    });
}

function QueriesProp({ 
    element, vars, propTypes,
    loadFromCache, alwaysFetch, updateCache,
    urlQuery, urlParams
}) {
    this._events = new Events(null, propTypes, element);

    this._element = element;

    this.vars = vars;
    this.pendingVars = {};
    this.urlQuery = urlQuery;
    this.urlParams = urlParams;
    this._queryProps = {};

    this._queryPropTypes = propTypes;
    this.loadFromCache = !_.isUndefined(loadFromCache) ? loadFromCache : true;
    this.alwaysFetch = !_.isUndefined(alwaysFetch) ? alwaysFetch : true;
    this.updateCache = !_.isUndefined(updateCache) ? updateCache : true;
}

Object.assign(QueriesProp.prototype, {
    getCacheOption(queryDefinition, name) {
        const options = queryDefinition._cacheOptions || {};
        const option = options[name];
        const thisVal = this[name];

        return !_.isUndefined(option)
            ? option
            : (!_.isUndefined(thisVal)
                    ? thisVal
                    : true);
    },

    /**
     * Set the current vars to `vars` and trigger a re-fetch.  Once fetching is
     * initiated, the component will re-render with the previous vars as
     * queries.vars and the current vars as queries.pendingVars.
     */
    setVars(vars) {
        this.pendingVars = Object.assign({}, this.vars, vars);
        this._fetch(this._element.props);
    },

    _fetch({ params, location, loadContext, props }) {
        const keys = Object.keys(this._queryPropTypes);

        if (!keys.length) {
            return Promise.resolve();
        }

        const fetchingProps = {};

        this.fetching = true;
        
        if (this._events.props) {
            this._events._removeHandlers();
        }
        
        const queryDefinitions = {};
        this.hasErrors = false;

        const promise = Promise.all(keys.map((key) => {
            return new Promise((resolve) => {
                const query = this._queryPropTypes[key];
                const entry = getArgs(query).indexOf("props") !== -1
                    ? query(props, this.pendingVars)
                    : query(params, location.query, this.pendingVars);

                const queryDefinition = queryDefinitions[key] = entry;
                const { model } = queryDefinition;
                let instance, isNew;

                if (!model.prototype.idAttribute) {
                    const updateCache = this.getCacheOption(
                        queryDefinition, 'updateCache');

                    if (updateCache) {
                        ({ 
                          collection: instance, 
                          isNew 
                        } = findOrCreateCollection(model, queryDefinition));
                    } else {
                        instance = new model();
                        instance.queryDefinition = queryDefinition;
                        isNew = true;
                    }
                } else {
                    instance = model.findOrCreate({
                        [model.prototype.idAttribute]: queryDefinition.id
                    });
                }

                instance._isInitialized = false;
                fetchingProps[key] = instance;

                let loadedFromCache = false;

                const loadFromCache = this.getCacheOption(
                    queryDefinition, 'loadFromCache');

                if (loadFromCache) {
                    if (instance instanceof Backbone.Collection) {
                        if (!isNew) {
                            loadedFromCache = true;
                            resolve();
                        }
                    } else {
                        const cachedFieldsAndRelations = 
                            instance.cachedFieldsAndRelations;

                        const isMatch = cachedFieldsAndRelations && isSubset(
                            cachedFieldsAndRelations, 
                            _.pick(
                                queryDefinition, 'fields', 'relations'
                            )
                        );
                        if (isMatch) {
                            loadedFromCache = true;
                            resolve();
                        }
                    }
                }

                const existingFetchPromise = instance.fetchPromise;

                if (existingFetchPromise) {
                    existingFetchPromise.then(() => {
                        resolve();
                    }).catch(() => {
                        resolve();
                    });
                } else {
                    const alwaysFetch = this.getCacheOption(
                        queryDefinition, 'alwaysFetch');

                    if (loadedFromCache && !alwaysFetch) {
                        return;
                    }

                    instance.queryDefinition = queryDefinition;

                    const fetchPromise = instance.fetch();

                    instance.fetchPromise = fetchPromise;

                    fetchPromise.catch(() => {
                        this.hasErrors = true;
                        instance.fetchPromise = null;
                        resolve();
                    }).then(() => {
                        instance.fetchPromise = null;
                        resolve();
                    });
                }
            });
        }));

        promise.then(() => {
            const isAlreadyLoaded = this._events.props;
            this._queryProps = fetchingProps;
            this._events.queryDefinitions = queryDefinitions;
            this._events.props = this._queryProps;
            
            this.vars = this.pendingVars;
            this.pendingVars = null;
            this.fetching = false;
            
            if (isAlreadyLoaded) {
                this._events._addHandlers();
                this._element.forceUpdate();
            }
        });

        return promise;
    }
});

const collectionCache = {};

function findOrCreateCollection(model, queryDefinition) {
    const url = getUrl(model.prototype, queryDefinition);
    let isNew = false;

    if (!collectionCache[url]) {
        collectionCache[url] = new model();
        isNew = true;
    }

    return { isNew, collection: collectionCache[url] };
}

function QueryFragments({ element, props, propTypes }) {
    this._events = new Events(props, propTypes, element);

    this._element = element;

    this._props = props;
    this._propTypes = propTypes;
}

function Events(props, queryDefinitions, element) {
    this.props = props;
    this.queryDefinitions = queryDefinitions;
    this.element = element;
}

Object.assign(Events.prototype, {
    _addHandlers() {
        Object.keys(this.props).forEach((key) => {
            this.props[key].bindRelationEvents(
                this.forceUpdate, 
                this.element, 
                this.queryDefinitions[key]
            );
        });
    },

    _removeHandlers() {
        Object.keys(this.props).forEach((key) => {
            this.props[key].unbindRelationEvents(this.element, this.queryDefinitions[key]);
        });
    },

    forceUpdate() {
        if (this.element) {
            this.element.forceUpdate(); 
        } 
    }
});

const modelEvents = 'change invalid error request sync';
const collectionEvents = 'update reset sort error request sync';

Backbone.Collection.prototype.bindRelationEvents = function (callback, context, queryDefinition) {
    this.on(collectionEvents, callback, context);
    this.models.forEach((model) => {
        model.bindRelationEvents(callback, context, queryDefinition);
    });
    
    this.on('add', (model) => {
        model.bindRelationEvents(callback, context, queryDefinition);
    }, context);

    this.on('remove', (model) => {
        model.unbindRelationEvents(context, queryDefinition);
    }, context);
};

Backbone.RelationalModel.prototype.bindRelationEvents = function (callback, context, queryDefinition) {
    const relations = getRelations(queryDefinition);

    this.on(modelEvents, callback, context);
    
    relations.forEach((relation) => {
        const related = getRelated(this, relation);
        related.bindRelationEvents(callback, context, relation);
    });
};

Backbone.Collection.prototype.unbindRelationEvents = function (context, queryDefinition) {
    this.models.forEach((model) => {
        model.unbindRelationEvents(context, queryDefinition);
    });

    this.off(null, null, context);
};

Backbone.RelationalModel.prototype.unbindRelationEvents = function (context, queryDefinition) {
    this.off(null, null, context);

    const relations = getRelations(queryDefinition);

    relations.forEach((relation) => {
        const related = getRelated(this, relation);
        related.unbindRelationEvents(context, relation);
    });
};

function getRelations(queryDefinition) {
    if (queryDefinition) {
        let { relations, fragments } = queryDefinition;
        relations = relations || [];

        if (fragments) {
            fragments.forEach((fragment) => {
                relations = relations.concat(fragment.relations || []);
            });
        }
        return _.uniq(relations, (r) => r.key);
    } else {
        return [];
    }
}

function getRelated(model, relation) {
    let r = model.getRelation(relation.key);
    return r.related;
}

const BackboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {
    const { queryDefinition } = model;

    if (!options.url) {
        options.url = getUrl(model, queryDefinition);
    }

    return new Promise((resolve, reject) => {
        model.syncing = true;

        model.pendingQueryDefinition = queryDefinition;

        BackboneSync(method, model, options).done((data, textStatus) => {
            model.error = null;

            model.lastQueryDefinition = queryDefinition;
            model.pendingQueryDefinition = null;

            updateCacheInformation(model, mergeFragments(queryDefinition));

            resolve(model);
        }).fail((jqXhr, textStatus, errorThrown) => {
            model.error = errorThrown;

            if (options.allowFail) {
                reject(model);
            } else {
                resolve(model);
            }
        }).always(() => {
            model.syncing = false;
            // Required to ensure handlers see attributes set above.
            model.trigger('change');
        });
    });
};

function getUrl(model, queryDefinition) {
    queryDefinition = queryDefinition || {};
    const urlRoot = model.urlRoot;

    if (!urlRoot) {
        throw new Error("Missing urlRoot", model);
    }

    let url = urlRoot;
   
    if (model.idAttribute) {
        const id = queryDefinition.id || model.get(model.idAttribute);
        if (id) {
            url += `/${id}`;
        }
    }

    const include = [];
    const fields = {};

    processRelation(
        model.model ? model.model : model.constructor, 
        queryDefinition,
        [],
        include,
        fields
    );

    const { sort, filter, page } = queryDefinition;
    const params = [];

    if (include.length) {
        const includes = _.sortBy(_.uniq(include.map((include) => {
            return include.join('.');
        })), _.identity);
        params.push(`include=${includes.join(',')}`);
    }

    _.each(_.sortBy(_.keys(fields), _.identity), (type) => {
        const typeFields = _.sortBy(_.uniq(fields[type]), _.identity);
        params.push(`fields[${type}]=${typeFields.join(',')}`);
    });

    if (sort) {
        params.push(`sort=${sort}`);
    }

    if (filter) {
        if (typeof filter === "object") {
            _.each(_.sortBy(_.keys(filter), _.identity), (key) => {
                const keyVal = filter[key];
                params.push(`filter[${key}]=${keyVal}`);
            });
        } else {
            params.push(`filter=${filter}`);
        }
    }

    if (page) {
        if (typeof page === "object") {
            _.each(_.sortBy(_.keys(page), _.identity), (key) => {
                const keyVal = page[key];
                params.push(`page[${key}]=${keyVal}`);
            });
        } else {
            params.push(`page=${page}`);
        }
    }

    if (params.length) {
        url += '?' + params.join('&');
    }

    return url;
}

function updateCacheInformation(model, queryDefinition) {
    if (model instanceof Backbone.Collection) {
        model.forEach((model) => {
            updateCacheInformation(model, queryDefinition);
        });
        return;
    } else {
        const cachedFieldsAndRelations = model.cachedFieldsAndRelations;
        const { fields, relations } = cachedFieldsAndRelations || {};
        const { fields: fetchFields, relations: fetchRelations }
            = queryDefinition;

        let newCachedFields;
        if (cachedFieldsAndRelations) {
            newCachedFields = !(fetchFields && fields)
                ? null
                : _.unique(fields.concat(fetchFields));
        } else {
            newCachedFields = fetchFields;
        }
        
        model.cachedFieldsAndRelations = { 
            fields: newCachedFields, 
            relations: mergeRelationLists(relations || [], fetchRelations || [])
        };
    }

    const { relations } = queryDefinition;

    if (relations) {
        _.each(model.attributes, (value, key) => {
            if (value instanceof Backbone.Collection || 
                value instanceof Backbone.RelationalModel
            ) {
                const relation = relations.find((relation) => {
                    return relation.key === key; 
                });
                if (relation) {
                    updateCacheInformation(value, relation);
                }
            }
        });
    }
}

function mergeRelationLists(a, b) {
    const result = a.slice(0);

    b.forEach((relation) => {
        const existingRelation = result.find((r) => {
            return r.key === relation.key;
        });

        if (existingRelation) {
            const newRelation = _.clone(existingRelation);

            const { fields, relations } = relation;
            const { fields: newFields, relations: newRelations } = newRelation;

            if (newFields || fields) {
                newRelation.fields = _.uniq(
                    (newFields || []).concat(fields || [])
                );
            }

            if (newRelations || relations) {
                newRelation.relations = mergeRelationLists(
                    newRelations || [],
                    relations || []
                );
            }

            result[result.indexOf(existingRelation)] = newRelation;
        } else {
            result.push(relation);
        }
    });

    return result;
}

function isSubset(optionsA, optionsB) {
    const hasMissingFields = (
        optionsA.fields && 
        (
            _.difference(optionsB.fields || [], optionsA.fields || []).length || 
            !optionsB.fields
        )
    );

    if (hasMissingFields) {
        return false;
    }

    const relationsA = optionsA.relations || [];

    (optionsB.relations || []).forEach((relation) => {
        const matchingRelation = relationsA.find((r) => {
            return r.key === relation.key;
        });
        if (!matchingRelation) {
            return false;
        }
        if (!isSubset(matchingRelation, relation)) {
            return false;
        }
    });

    return true;
}

function mergeFragments(options) {
    options = options || {};

    let { 
        fields: mergedFields, 
        relations: mergedRelations,
        fragments
    } = options;
    mergedFields = mergedFields || [];
    mergedRelations = mergedRelations || [];

    if (fragments) {
        fragments.forEach((fragment) => {
            const { fields, relations } = fragment;

            if (fields) {
                mergedFields = mergedFields.concat(fields);
            }

            if (relations) {
                mergedRelations = mergeRelationLists(
                    mergedRelations,
                    relations
                );
            }
        });
    }

    if (mergedRelations) {
        mergedRelations = mergedRelations.map(mergeFragments);
    }

    const queryDefinition = { 
        fields: _.uniq(mergedFields), 
        relations: mergedRelations
    };
    if (options.key) {
        queryDefinition.key = options.key;
    }

    return queryDefinition;
}

function processRelation(model, relation, path, include, fields) {
    relation = relation || {};
    relation = mergeFragments(relation);

    const { fields: relationFields, relations } = relation;

    if (relationFields.length) {
        const type = model.prototype.defaults.type;
        fields[type] = (fields[type] || []).concat(relationFields)
    }

    if (relations) {
        relations.forEach((r) => {
            const newPath = path.concat(r.key);
            include.push(newPath);
            const relatedModel = _.find(model.prototype.relations, (relation) => {
                return r.key === relation.key;
            }).relatedModel;

            processRelation(relatedModel, r, newPath, include, fields)
        });
    }
}
