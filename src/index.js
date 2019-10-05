import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Backbone from 'backbone';
import 'backbone-relational';
import _ from 'underscore';
import './backbone-relational-jsonapi';

export { default as AsyncProps } from './AsyncProps';

// Monkey-patch to fix an apparent bug.
Backbone.RelationalModel.prototype.set = function( key, value, options ) {
    Backbone.Relational.eventQueue.block();

    // Duplicate backbone's behavior to allow separate key/value parameters, instead of a single 'attributes' object
    var attributes,
        result;

    if ( _.isObject( key ) || key == null ) {
        attributes = key;
        options = value;
    }
    else {
        attributes = {};
        attributes[ key ] = value;
    }

    try {
        var id = this.id,
            newId = attributes && this.idAttribute in attributes && attributes[ this.idAttribute ];

        // Check if we're not setting a duplicate id before actually calling `set`.
        Backbone.Relational.store.checkId( this, newId );

        result = Backbone.Model.prototype.set.apply( this, arguments );

        // Ideal place to set up relations, if this is the first time we're here for this model
        // Change required to work.
        if ( true ) {
        //if ( !this._isInitialized && !this.isLocked() ) {
            this.constructor.initializeModelHierarchy();

            // Only register models that have an id. A model will be registered when/if it gets an id later on.
            if ( newId || newId === 0 ) {
                Backbone.Relational.store.register( this );
            }

            this.initializeRelations( options );
        }
        // The store should know about an `id` update asap
        else if ( newId && newId !== id ) {
            Backbone.Relational.store.update( this );
        }

        if ( attributes ) {
            this.updateRelations( attributes, options );
        }
    }
    finally {
        // Try to run the global queue holding external events
        Backbone.Relational.eventQueue.unblock();
    }

    return result;
};

const modelEvents = 'change invalid error request sync';
const collectionEvents = 'update reset sort error request sync';
Backbone.Collection.prototype.bindRelationEvents = function (callback, context, options) {
    this.on(collectionEvents, callback, context);
    this.models.forEach((model) => {
        model.bindRelationEvents(callback, context, options);
    });
    
    this.on('add', (model) => {
        model.bindRelationEvents(callback, context, options);
    }, context);

    this.on('remove', (model) => {
        model.unbindRelationEvents(context, options);
    }, context);
};

Backbone.RelationalModel.prototype.bindRelationEvents = function (callback, context, options) {
    const relations = getRelations(options);

    this.on(modelEvents, callback, context);
    
    relations.forEach((relation) => {
        const related = getRelated(this, relation);
        related.bindRelationEvents(callback, context, relation);
    });
};

Backbone.Collection.prototype.unbindRelationEvents = function (context, options) {
    this.models.forEach((model) => {
        model.unbindRelationEvents(context, options);
    });

    this.off(null, null, context);
};

Backbone.RelationalModel.prototype.unbindRelationEvents = function (context, options) {
    this.off(null, null, context);

    const relations = getRelations(options);

    relations.forEach((relation) => {
        const related = getRelated(this, relation);
        related.unbindRelationEvents(context, relation);
    });
};

const getRelations = (options) => {
    let relations = options.relations || [];
    (options.fragments || []).forEach((fragment) => {
        relations = relations.concat(fragment.relations || []);
    });
    return _.uniq(relations, (r) => r.key)
};

const getRelated = (model, relation) => {
    let r = model.getRelation(relation.key);
    return r.related;
};
            
const BackboneSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    if (!options.url) {
        const fetchOptions = model.fetchOptions || {};
        if (!model.urlRoot) {
            throw new Error();
        }
        let url = model.urlRoot;
        if (model instanceof Backbone.Model && fetchOptions.id) {
            url += `/${fetchOptions.id}`;
        }

        const include = [];
        const fields = {};

        processRelation(
            model.model ? model.model : model.constructor, 
            fetchOptions,
            [],
            include,
            fields
        );

        const params = [];

        if (include.length) {
            const includes = _.uniq(include.map((include) => {
                return include.join('.');
            }));
            params.push(`include=${includes.join(',')}`);
        }

        _.each(fields, (fields, type) => {
            params.push(`fields[${type}]=${_.uniq(fields).join(',')}`);
        });

        if (fetchOptions.sort) {
            params.push(`sort=${fetchOptions.sort.join(',')}`);
        }

        if (fetchOptions.filter) {
            if (typeof fetchOptions.filter === "object") {
                _.each(fetchOptions.filter, (val, key) => {
                    params.push(`filter[${key}]=${val}`);
                });
            } else {
                params.push(`filter=${fetchOptions.filter}`);
            }
        }

        if (fetchOptions.page) {
            if (typeof fetchOptions.page === "object") {
                _.each(fetchOptions.page, (val, key) => {
                    params.push(`page[${key}]=${val}`);
                });
            } else {
                params.push(`page=${fetchOptions.page}`);
            }
        }

        if (params.length) {
            url += '?' + params.join('&');
        }

        options.url = url;
    }

    return new Promise((resolve, reject) => {
        model.syncing = true;
        model.textStatus = null;

        const promise = BackboneSync(method, model, options);
        promise.done((data, textStatus) => {
            model.error = null;

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
        })
    });
};

const processRelation = (model, relation, path, include, fields) => {
    const fragments = relation.fragments || [];
    let relationRelations = relation.relations || [];
    let relationFields = relation.fields || [];
    fragments.forEach((fragment) => {
        relationRelations = relationRelations.concat(fragment.relations || []);
        relationFields = relationFields.concat(fragment.fields || []);
    });
    relationRelations = _.uniq(relationRelations, (r) => r.key)

    if (relationFields.length) {
        const type = model.prototype.defaults.type;
        fields[type] = (fields[type] || []).concat(relationFields)
    }

    relationRelations.forEach((relation) => {
        const newPath = path.concat(relation.key);
        include.push(newPath);
        const relatedModel = _.find(model.prototype.relations, (r) => {
            return r.key === relation.key;
        }).relatedModel;
        processRelation(relatedModel, relation, newPath, include, fields)
    });

};

export function withJsonApi(options) {
    const componentQueries = options.queries || {};
    const componentFragments = options.fragments || {};
    const initialVars = options.initialVars;
    const getInitialVars = options.getInitialVars;

    return function (WrappedComponent) {
        const displayName = WrappedComponent.displayName || WrappedComponent.name;

        return createReactClass({
            displayName: `withJsonApi(${displayName})`,

            propTypes: Object.assign(
                {}, 
                WrappedComponent.propTypes,
                {
                    initialQueries: PropTypes.object
                }
            ),

            statics: {
                loadProps({params, location, loadContext}, cb) {
                    const getVars = () => {
                        if (getInitialVars) {
                            return getInitialVars();
                        } else if (initialVars) {
                            return initialVars;
                        } else {
                            return {};
                        }
                    };

                    const queries = new Queries(
                        null, 
                        getVars(),
                        componentQueries
                    );

                    queries._fetch({params, location, loadContext}).then(() => {
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
                }
                const fragmentProps = _.pick(
                    nextProps, 
                    Object.keys(componentFragments)
                );
                const hasFragmentProps = Object.keys(fragmentProps).length;
                
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
                        {...this.queries ? this.queries._props : {}}
                        {...this.fragments ? this.fragments._props : {}}
                    />
                );
            }
        });
    };

}

function Events(props, propOptions, element) {
    this.props = props;
    this.propOptions = propOptions;
    this.element = element;
}

Object.assign(Events.prototype, {
    _addHandlers() {
        const forceUpdate = () => {
            if (this.element) {
                this.element.forceUpdate(); 
            } 
        };

        Object.keys(this.props).forEach((key) => {
            const options = this.propOptions[key];

            this.props[key].bindRelationEvents(forceUpdate, this.element, options)
        });

        this._addedHandlers = true;
    },

    _removeHandlers() {
        Object.keys(this.props).forEach((key) => {
            this.props[key].unbindRelationEvents(this.element, this.propOptions[key]);
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
    setVars(vars) {
        this.pendingVars = Object.assign({}, this.vars, vars);
        this._fetch(this._element.props);
    },

    _fetch({params, location, loadContext}) {
        const keys = Object.keys(this._queryPropTypes);
        if (!keys.length) {
            return Promise.resolve();
        }

        const fetchingProps = {};

        this.fetching = true;
        
        if (this._events.props) {
            this._events._removeHandlers();
        }
        
        const propOptions = {};
        this.hasErrors = false;

        const promise = Promise.all(keys.map((key) => {
            return new Promise((resolve) => {
                const options = propOptions[key] = this._queryPropTypes[key](
                    params,
                    location.query,
                    this.pendingVars
                );
                const model = options.model;
                const modelOrCollection = model.prototype.model 
                    ? new model() 
                    : model.findOrCreate({[model.prototype.idAttribute]: options.id});
                model._isInitialized = false;

                modelOrCollection.fetchOptions = options;

                fetchingProps[key] = modelOrCollection;

                modelOrCollection.fetch().then(() => {
                    resolve();
                }).catch(() => {
                    this.hasErrors = true;
                    resolve();
                });
            });
        }));

        promise.then(() => {
            const isAlreadyLoaded = this._events.props;
            this._props = fetchingProps;
            this._events.propOptions = propOptions;
            this._events.props = this._props;
            
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

