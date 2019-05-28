# React JSON API

React JSON API is a library for [React](https://facebook.github.io/react/) that
provides declarative data loading from [JSON APIs](http://jsonapi.org) on route
transition when used with 
[React Router](https://github.com/ReactTraining/react-router) (v3).

It is a direct alternative to [Relay](http://facebook.github.io/relay/) that 
uses [Backbone](http://backbonejs.org) models that consume a REST API instead of 
the new standard GraphQL upon which Relay is based.

React JSON API relies on [Backbone-relational](http://backbonerelational.org),
a comprehensive solution for managing relational Backbone models.

A demo is available at <http://appmagine.github.io/react-jsonapi/>.

## Functionality

React JSON API works by modifying `Backbone.sync()` to use JSON API URLs 
generated based on queries specified on components as a function of the route
params and query, as well as query-level 
"[variables](https://facebook.github.io/relay/docs/en/classic/classic-guides-containers.html#requesting-different-data)".

In order to keep the view reflecting the state of the models, all relevant 
Backbone events are subscribed to when models are loaded and cause
the view to update when triggered.

Instead of requiring a custom layer for defining 
"[mutations](https://facebook.github.io/relay/docs/mutations.html)" like Relay, 
you can simply use the standard Backbone API as normal (`new Model()`, `model.set()`, 
`model.save()`, `collection.add()`, and `collection.sync()`).

## Example

```js
import Backbone from 'backbone';
import 'backbone-relational';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {APIComponent, AsyncProps} from 'react-jsonapi';

const Filling = Backbone.RelationalModel.extend({
    urlRoot: '/fillings',
    defaults: { type: 'fillings' }
});

const Taco = Backbone.RelationalModel.extend({
    urlRoot: '/tacos',
    defaults: { type: 'tacos' },
    relations: [
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
                        key: 'fillings',
                        fields: ['name', 'amount']
                    }
                ]
            }
        }
    },
    render() {
        const {taco} = this.props;

        return <div>
            Amount: {taco.get('amount')}
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

        return <div>
            {tacos.map((taco) => {
                return <div key={taco.id}>
                    Name: {taco.get('name')},
                    Description: {queries.vars.includeDescription ? taco.get('description') : ''}
                    <TacoItem taco={taco} />
                </div>;
            })}
        </div>;    
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

### Exports

#### AsyncProps

A middleware for React Router that handles loading query results before the
initial render of a route transition.  This must be passed as the render prop of
`<Router>` as seen above.

#### APIComponent

A higher-order component that manages queries.  It accepts the static properties
`queries` and `fragments` defined on the wrapped component, where:

- `queries` is an object that maps prop names to functions that describe how to
  construct a query for each prop as a function of the React Router route 
  information `(params, query, vars)`, where `params` is the route params
  (`props.params`), `query` is the route query (`props.location.query`), 
  and `vars` are the query variables.  The return value should be an object that
  can contain any of the following fields:

  * `model` - the collection or model to fetch.  Optional for fragments since
    the model is defined by what the relation is.
  * `fields` - a list of field names that are rendered in the component, to be
    passed as the JSON-API `fields` parameter
  * `filter` - a string to be passed as the JSON-API `filter` parameter
  * `relations` - a nested array of objects with at least `{key: 'relationKey'}`
    corresponding to a Backbone-relational relation, to be passed as the
    JSON-API `include` parameter.  Additional fields in each entry can be of
    the same structure as an object returned in `queries` for
    nesting.
  * `fragments` - a list of fragments to merge into this query
  * `id` - for model queries only (not collection queries), the id of the
    model to fetch

- `fragments` is an object mapping prop names to objects of the same type as
  returned by the functions in `queries` above (excluding the `fragments`
  property)

The router middleware causes an additional prop `queries` to be passed to 
top-level `APIComponent`s, which is a container for all query results (Backbone
collections and models) belonging to that component.  This prop an be explicitly
passed down the component hierarchy in order to access parent collections or 
models in a child component, or to use one of the following special attributes
on `queries`:

- `vars` - the variables for the currently loaded model or collection (these 
   work exactly the same as in Relay, so see the 
   [Relay documentation](https://facebook.github.io/relay/docs/en/classic/classic-guides-containers.html#requesting-different-data)
   for an explanation)
- `pendingVars` - the variables used to fetch the pending model or collection
- `setVars(vars)` - merge `vars` with the current variables and trigger a refetch
- `fetching` - whether the queries are currently being fetched
- `hasErrors` - whether any of this set of models and collections had an error
  response on the last request
  
### Added Backbone attributes

Some additional convenience attributes are added to each instance of `Backbone.Model` 
and `Backbone.Collection`:

- `syncing` - whether a pending sync is ongoing
- `error` - the error returned by the latest request, or null

The factory function `Backbone.RelationalModel.extend()` is monkey-patched 
to add model classes to a global registry if `defaults.type` is defined 
(see example).  The value of this property is used where a type is expected 
in JSON-API URLs.

## Testing

```
$ npm install
$ git checkout -- jspm.config.js
$ # comment out example-bundle.js in index.html and production: true in
$ # jspm.config.js
$ npm install -g http-server
$ http-server
