# React JSON API

React JSON API provides declarative co-located [JSON API](http://jsonapi.org)
data loading for React components.

Data is loaded into [Backbone](http://backbonejs.org) models. In order
to keep the view in sync, each component is subscribed to relevant Backbone
events for the models and collections from which it renders data.

React JSON API supports optional integration with [React
Router](https://github.com/ReactTraining/react-router/tree/v3) v3.x. 

Query URLs are generated based on query definitions specified as JavaScript
objects in terms of component props or the matched route information in addition
to per-component state known as [variables](#variables).

Query URLs are generated based on query definitions specified as JavaScript
objects in terms of component props or the matched route information in addition
to per-component state known as [variables](#variables).

### Table of Contents

* [Getting started](#getting-started)
* [Using with a Router](#using-with-a-router)
* [Fragments](#fragments)
* [Variables](#variables)
* [API](#api)
  * [`AsyncProps`](#asyncprops)
  * [`withJsonApi`](#withjsonapi)
    * [Query definition objects](#query-definition-objects)
    * [The `queries` prop](#the-queries-prop)
  * [Added Backbone attributes](#added-backbone-attributes)
* [Testing](#testing)

## Getting started

This example demonstrates the simplest possible usage of React JSON API.

React JSON API relies on [Backbone-relational](http://backbonerelational.org), a
comprehensive solution for managing nested Backbone models.

```javascript
import Backbone from 'backbone';
import 'backbone-relational';

import ReactDOM from 'react-dom';
import { withJsonApi } from 'react-jsonapi';

const Taco = Backbone.RelationalModel.extend({
    urlRoot: '/tacos',
    defaults: { type: 'tacos' },
});

const TacoItem = withJsonApi({
    queries: {
        taco: (props, vars) => {
            return {
                model: Taco,
                id: props.tacoId,
                fields: ['name']
            };
        }
    }
}, function ({ taco }) {
    return (
        <div>
            {taco.get('name')}
        </div>
    );
});

ReactDOM.render((
    <TacoItem tacoId={1} />,
    document.getElementById('container')
));
```

## Using with a Router

This example demonstrates the simplest possible usage of React JSON API
with a React Router v3.x router, connecting a component that renders data from a
model instance queried by ID to a route with an ID parameter.

```javascript
import Backbone from 'backbone';
import 'backbone-relational';

import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { withJsonApi, AsyncProps } from 'react-jsonapi';

const Taco = Backbone.RelationalModel.extend({
    urlRoot: '/tacos',
    defaults: { type: 'tacos' },
});

const TacoItem = withJsonApi({
    queries: {
        taco: (params, query, vars) => {
            return {
                model: Taco,
                id: params.tacoId,
                fields: ['name']
            };
        }
    }
}, function ({ taco }) {
    return (
        <div>
            {taco.get('name')}
        </div>
    );
});

ReactDOM.render((
    <Router
        history={browserHistory}
        render={(props) => <AsyncProps {...props} />}
    >
        <Route path="/taco/:tacoId" component={TacoItem} />
    </Router>,
    document.getElementById('container')
));
```

## Fragments

A fragment is a partial query definition that can be referenced in a full query
definition.  The fields and relations defined by a fragment are merged into the
definition of the referencing query.

Fragments enable components to be defined with queries that only specify the
fields and relations that are directly used by the component, while fields and
relations used only by child components are specified alongside the definition
of the child components.

```javascript
const TacoItem = withJsonApi({
    fragments: {
        taco: {
            model: Taco,
            relations: [
                {
                    key: 'fillings',
                    fields: ['name']
                }
            ]
        }
    }
}, function ({ taco }) {
    return (
        <div>
            <h4>Fillings</h4>
            <ul>
                {taco.get('fillings').map((filling) => {
                    return (
                        <li key={filling.id}>
                            Name: {filling.get('name')},
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});

const TacoItemList = withJsonApi({
    queries: {
        tacos: (params, query, vars) => {
            return {
                model: TacoCollection,
                fields: ['name'],
                fragments: [
                    TacoItem.fragments.taco
                ]
            };
        }
    }
}, function ({ tacos }) {
    return (
        <div>
            {tacos.map((taco) => {
                return (
                    <div key={taco.id}>
                        Name: {taco.get('name')},
                        <TacoItem taco={taco} />
                    </div>
                );
            })}
        </div>
    );
});
```

## Variables

It can be useful to define queries in terms of not only the route information
but also other values that change over time.  This is possible using the third
argument to a query definition function, named `vars` in the examples shown
here. 

These are called "variables".  One set of variables is shared between all
queries belonging to a component, and can be accessed using the following
attributes of the `queries` prop:

  - `vars` - the variables for the currently loaded models
  - `pendingVars` - the variables used to fetch the pending models
  - `setVars(vars)` - merge `vars` with the current variables and trigger a
    refetch, in the same manner as React's `setState()`

Here is an example of variables in action:

```javascript
const ItemSearch = withJsonApi({
    initialVars: {
        includeDescription: true,
    },
    queries: {
        items: (params, query, vars) => {
            return {
                model: ItemCollection,
                fields: vars.includeDescription 
                    ? ['name', 'description']
                    : ['name']
            };
        }
    }
}, function ({ items, queries }) {
    const { vars, setVars } = queries;

    return (
        <div>
            Include Description:

            <input 
                type="checkbox" 
                checked={vars.includeDescription} 
                onChange={(event) => setVars({
                    includeDescription: event.target.checked
                })} />

            Results:

            {items.map((item) => {
                return (
                    <div>
                        <p>Name: {item.get('name')}</p>
                        {vars.includeDescription 
                            ? <p>Description: {item.get('description')}</p>
                            : null}
                    </div>
                );
            })}
        </div>
    );
});
```
 
## API

React JSON API has two exports:

#### `AsyncProps`

\- `<AsyncProps {...props} />`

A middleware for React Router that loads data for the components for each
matched route in the route tree before each render trigger by a route
transition.  This must be passed as the `render` prop of `Router` as seen above
when using a router.

React Router version 3 introduced asynchronous route definition via
`getChildRoutes()` and `getComponents()`, which is incompatible with co-located
data loading.  Avoid using these features when using React JSON API.

#### `withJsonApi` (default)

\- `withJsonApi(options, Component)`

A [higher-order
component](https://reactjs.org/docs/higher-order-components.html) that renders
`Component` with query models passed as props and manages Backbone event
handlers.

The query props are constructed based on the following options:

- `queries` - An object that defines query props in terms of functions that
  return a **query definition object** for each prop.

  \- `{ [name]: (params, query, vars) => query definition object }` or
  \- `{ [name]: (props, vars) => query definition object }`

  The function arguments are:
  
    * `params` - the React Router route params object (/route/:param) from
      `props.params`.
    * `query` - the React Router route query object (?x=y) from
      `props.location.query`.
    * `props` - the component props.
    * `vars` - the query [variables](#variables).

- `fragments` - An object that defines query [fragment](#fragments) props in
  terms of query definition objects.

  \- `{ [name]: query definition object }`

- `initialVars` - An object of initial query variables.

- `getInitialVars` - A function that returns an object of initial query variables.

- `loadFromCache` - A value to use as the default value for the
  `loadFromCache` option of all queries defined by `queries`.

- `alwaysFetch` - A value to use as the default value for the `alwaysFetch`
  option of all queries defined by `queries`.

- `updateCache` - A value to use as the default value for the `updateCache`
  option of all queries defined by `queries`.

These options are also added as static properties to the returned component so
they can be referenced when defining other components.

##### Query definition objects

A query definition object defines either a model or collection query or
fragment.  A model query instantiates a model class and requests a single model
[resource](https://jsonapi.org/format/#document-resource-objects) like
`/articles/1`.  A collection query instantiates a collection class and requests
a collection of model resources like `/articles`.

Model and collection queries share the same options related to the parts of
the URL that specify what data to include for each model resource but have
different options related to the parts of the URL that specify which top-level
resource or resources to return.

Options that specify the top-level resource to return for a **model query** or
fragment:

  * `model` - the model class to use.
  * `id` (required) - the ID of the resource to fetch.

Options that specify the top-level resources to return for a **collection
query** or fragment:

  * `model` - the collection class to use.
  * `filter` - a string or object to pass as the JSON API
    [`filter`](https://jsonapi.org/format/#fetching-filtering) parameter.
  * `sort` - a string to pass as the JSON API 
    [`sort`](https://jsonapi.org/format/#fetching-sorting) parameter.
  * `page` - a string or object to pass as the JSON API
    [`page`](https://jsonapi.org/format/#fetching-pagination) parameter.

Options that specify the data to include for each resource returned by the query:

  * `fields` - an array of names of fields of the subject model to include in
    the response, used as the JSON API 
    [`fields`](https://jsonapi.org/format/#fetching-sparse-fieldsets)
    parameter for the subject model's type.
    
    If not specified, all fields will be included.

  * `relations` - a nested array of objects that correspond to relations of the
    subject model to include in the response as related resources.  The full
    paths from the subject model to each relation are passed as the JSON API
    [`include`](https://jsonapi.org/format/#fetching-includes) parameter.

    Each object can have the following attributes:

      - `key` (required) - the string key identifying the relation in the
        `relations` configuration of the model class
      - `fields` - an array of names of fields of the relation's model to
        include in the response, to add to the JSON API `fields` parameter for
        the related model's type.
      - `relations` - an array of the same type of object corresponding to
        relations of this relation's related model to include in the response.
      - `fragments` - an array of fragments to include for this relation.  The
        `fields` and `relations` values from each fragment will be merged into
        the `fields` and `relations` values for this relation.

    If not specified, no relations will be returned.

  * `fragments` - an array of fragments to include in this query.  The
    `fields` and `relations` values from each fragment will be merged into the
    `fields` and `relations` values of this query.

React JSON API maintains a cache of previously loaded query results.  The
following options for queries only control how the cache is used:

  * `loadFromCache` - whether to load cached results for this query if complete
    results for the query exist in the cache.  This overrides the default
    `loadFromCache` value for this component if one was specified.

    Default: `true`.

  * `alwaysFetch` - whether to fetch new results for a query whose initial
    results were loaded from the cache. This overrides the default `alwaysFetch`
    value for this component if one was specified.

    Default: `true`.

  * `updateCache` - whether to update the cache with the results returned for
    this query. This overrides the default `updateCache` value for this
    component if one was specified.

    Default: `true`.

##### The `queries` prop

In addition to the query props, the decorated component receives a prop named
`queries` that has all query props for that component as attributes and
provides an API for manipulating variables.  `queries` has the following
additional attributes:

- `vars` - the variables for the currently loaded models.
- `pendingVars` - the variables used to fetch the pending models.
- `setVars(vars)` - merge `vars` with the current variables and trigger a refetch.
- `fetching` - whether the queries are currently being fetched.
- `hasErrors` - whether any of this set of models and collections had an error
  response on the last request.

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
$ npm install -g http-server
$ http-server
```
