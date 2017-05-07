# react-jsonapi

Declarative [JSON API](http://jsonapi.org) data loading for [React](https://facebook.github.io/react/) and [React Router](https://github.com/ReactTraining/react-router) (v3).


Based on [Backbone](http://backbonejs.org) and [Backbone-Relational](http://backbonerelational.org) (a comprehensive solution for managing nested Backbone models).

An alternative to [Relay](http://facebook.github.io/relay/) that doesn't depend on GraphQL.

## Features

- Collects fragments defined on child components to construct a single query for
  each top-level component.

- Automatically builds model and collection URLs with appropriate JSON-API
  parameters.

- Manages event handlers connecting the models and components, so you can
  create new models in a collection and trigger saves and fetches and have the
  appropriate components immediately re-render.

## Example

```js
import Backbone from 'backbone';
import 'backbone-relational';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {APIComponent, AsyncProps} from 'react-jsonapi';

const Shell = Backbone.RelationalModel.extend({
    urlRoot: '/shells',
    defaults: { type: 'shells' }
});

const Filling = Backbone.RelationalModel.extend({
    urlRoot: '/fillings',
    defaults: { type: 'fillings' }
});

const Taco = Backbone.RelationalModel.extend({
    urlRoot: '/tacos',
    defaults: { type: 'tacos' },
    relations: [
        {
            type: Backbone.HasOne,
            key: 'shell',
            relatedModel: Shell
        },
        {
            type: Backbone.HasMany,
            key: 'fillings',
            relatedModel: Filling
        }
    ]
});

const TacoCollection = Backbone.Collection.extend({
    model: Taco,
    urlRoot: '/tacos'
});


const TacoItem = APIComponent(React.createClass({
    statics: {
        fragments: {
            taco: {
                model: Taco,
                fields: ['amount']
                relations: [
                    {
                        key: 'shell',
                        fields: ['name']
                    },
                    {
                        key: 'fillings',
                        fields: ['name', 'amount']
                    }
                ]
            }
        }
    },
    render() {
        const {taco} = this.props;
        const shell = taco.get('shell');

        return <div>
            Amount: {taco.get('amount')}
            <h4>Shell</h4>
            Name: {shell.get('name')}
            <h4>Fillings</h4>
            <ul>
            {taco.get('fillings').map((filling) => {
                return <li key={filling.id}>
                    Name: {filling.get('name')},
                    Amount: {filling.get('ammount')}
                </li>;
            })}
            </ul>
        </div>;
    
    }
}));

const TacoList = APIComponent(React.createClass({
    statics: {
        getInitialVars() {
            return {
                includeDescription: true
            };
        
        },
        queries: {
            tacos(params, query, vars) {
                return {
                    model: TacoCollection,
                    // modify the model query based on a URL query parameter
                    filter: query.filter,
                    // Parameterize the query based on a variable
                    fields: vars.includeDescription ? ['name', 'description'] : ['name'],
                    fragments: [
                        TacoItem.fragments.taco
                    ]
                }
                
            }
        }
    },
    render() {
        const {tacos, queries} = this.props;

        if (queries.loading) {
            return <div>Loading...</div>
        }

        return tacos.map((taco) => {
            return <div key={taco.id}>
                Name: {taco.get('name')},
                Description: {queries.vars.includeDescription ? taco.get('description') : ''}
                <TacoItem taco={taco} />
            </div>;
        
        })
    
    }
}));

ReactDOM.render((
    <Router
        history={browserHistory}
        render={(props) => <AsyncProps {...props} />}
    >
        <Route path="/" component={TacoList} />
    </Router>
));
```

## API

### Backbone.RelationalModel.extend()

This factory function is monkey-patched to add model classes to a global
registry if `defaults.type` is defined.  The value of this property is used
where a type is expected in JSON-API URLs.

### AsyncProps

A middleware for React Router that handles loading query results before the
initial render of a route transition.  You must pass this as the render prop of
`<Router>` as seen above.

### APIComponent

A higher-order component that manages queries.  Accepts the static properties
`queries` and `fragments`.

- `queries`: an object mapping prop names to functions of the signature
  `(params, query, vars)` where `params` are the route params (`props.params`),
  `query` is the route query (`props.location.query`), and `vars` are the query
  variables.

  * `model` - the collection or model to fetch.  Optional for fragments since
    the model is defined by what the relation is.
  * `fields` - a list of field names that are rendered in the component, to be
    passed as the JSON-API `fields` parameter
  * `filter` - a string to be passed as the JSON-API `filter` parameter
  * `relations` - a nested array of objects with at least `{key: 'relationKey'}`
    corresponding to a Backbone-Relational relation, to be passed as the
    JSON-API `include` parameter.  Additional fields in each entry can be of
    the same structure as an object returned in `queries` for
    nesting.
  * `fragments` - a list of fragments to merge into this query
  * `id` - for model queries only (not collection queries), the id of the
    model to fetch

- `fragments`: an object mapping prop names to objects of the same type as
  returned by the functions in `queries` above (excluding the `fragments`
  property)

### props.queries

A container for all queries belonging to a top-level component that is passed by
the router middleware as a prop to that component.  Can be explicitly passed
down the component hierarchy in order to access properties or call `setVars()`
in event handlers.

Attributes:

- `vars` - the variables for the currently loaded model or collection
- `pendingVars` - the variables used to fetch the pending model or collection
- `setVars(vars)` - merge `vars` with the current vars and trigger a refetch
- `fetching` - whether the queries are currently being fetched
- `hasErrors` - whether any of this set of models and collections had an error
  response on the last request

### Backbone.Model/Backbone.Collection

Added attributes:

- `syncing` - whether a pending sync is ongoing
- `error` - the error returned by the latest request, or null


## Testing

```
$ npm install
$ npm install -g http-server
$ http-server
