// taken from https://github.com/xbill82/backbone-relational-jsonapi (MIT License)
// modified slightly
import Backbone from 'backbone';
import 'backbone-relational';
import _ from 'underscore';

var _extend = Backbone.RelationalModel.extend;
Backbone.RelationalModel.extend = function (protoProps, classProps) {
    var ret = _extend.call(this, protoProps, classProps);

    if (protoProps.defaults && protoProps.defaults.type) {
        Backbone.modelFactory.registerModel(ret);
    }

    return ret;
};

var ModelFactory = function() {
    this.registeredModels = {};
};

ModelFactory.prototype.registerModel = function(model) {
    this.registeredModels[model.prototype.defaults.type] = model;
}

ModelFactory.prototype.findOrCreate = function(data, options) {
    if (this.registeredModels[data.type]) {
        const model = this.registeredModels[data.type].findOrCreate(data, {
            parse: true,
            ...options
		});

		return model;
    }
}

ModelFactory.prototype.createFromArray = function(items, options) {
    _.each(items, function(item) {
        this.findOrCreate(item, options);
    }, this);
};

Backbone.modelFactory = new ModelFactory();

Backbone.Collection.prototype.parse = function(response, options) {
    if (!response)
        return;

    if (response.included)
        Backbone.modelFactory.createFromArray(response.included, options);

    if (response.meta && this.handleMeta)
        this.handleMeta(response.meta);

    if (!response.data) {
        return response;
    }

    return response.data;
};

Backbone.RelationalModel.prototype.parse = function(response, options) {
    if (!response)
        return;

    if (response.included)
        Backbone.modelFactory.createFromArray(response.included);

    if (response.data) {
        response = response.data;
    }

    if (response.meta && this.handleMeta)
        this.handleMeta(response.meta);

    let data = response.attributes || {};
    data.id = response.id;

    let simplifiedRelations;
    if (response.relationships) {
        simplifiedRelations = _.mapObject(response.relationships, function(value) {
            return value.data;
        });
    }
	
	const [existingRelations, existingFields] = _.chain(this.attributes)
        .pairs()
        .partition(([key, value]) => {
            return (
                value instanceof Backbone.Model || 
                value instanceof Backbone.Collection
            );
        })
		.map((val) => _.object(val))
		.value();

    const newFields = _.extend({}, existingFields, data);
	const fetchOptions = options.fetchOptions || this.fetchOptions;

	const relations = mergeRelations(
		existingRelations, 
		simplifiedRelations,
		fetchOptions
	);

    return _.extend({}, newFields, relations);
};

function mergeRelations(existingRelations, newRelations, fetchOptions) {
    _.each(newRelations, (relation, key) => {
        const existingRelation = existingRelations[key];

		if (existingRelation) {
            const relationFetchOptions = fetchOptions.relations.find((relation) => {
                return relation.key === key;
			});

			if (existingRelation instanceof Backbone.Collection) {
                existingRelation.set(relation, { 
                    parse: true,
                    silent: true,
                    fetchOptions: relationFetchOptions
                });
			} else {

				const attributes = existingRelation.parse(relation, { 
					fetchOptions: relationFetchOptions
				});
				const idAttribute = existingRelation.idAttribute;
				const id = existingRelation.get(idAttribute);

				if (!id) {
					existingRelations[key] = existingRelation.constructor.findOrCreate({
						[idAttribute]: attributes[idAttribute]
					});
				}
                existingRelations[key].set(attributes, { silent: true });
            }
		} else {
			existingRelations[key] = relation;
        }
    });

    return existingRelations;
}

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
