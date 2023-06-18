# React JSON API

React JSON API provides declarative co-located REST API
data loading for React components based on [JSON API](http://jsonapi.org), a
specification that standardizes JSON-based REST APIs with inline nested entities, pagination
and a variety of additional features.

Data is loaded into [Backbone-relational](http://backbonerelational.org) models
(an extension to [Backbone](http://backbonejs.org)) that
are synced with the view using events, enabling encapsulation of business logic
in the model layer.

React JSON API supports optional integration with [React
Router](https://github.com/ReactTraining/react-router/tree/v3) v3.x for data loading based
on the page URL, including multi-view data loading for isomorphic view-route hierarchies. 

API URLs are generated based on query definitions specified as JavaScript
objects in terms of component props or the matched route information in addition
to per-component state known as [variables](#variables).

By default, a comprehensive caching system is used that avoids unnecessary requests and 
displays cached data immediately while optional refetches are executing.

The goal of React JSON API is to completely eliminate boilerplate from data-oriented 
frontend development.

### Table of Contents

* [Getting Started](#getting-started)
* [Using with a Router](#using-with-a-router)
* [Fragments](#fragments)
* [Variables](#variables)
* [API](#api)
  * [`AsyncProps`](#asyncprops)
  * [`withJsonApi`](#withjsonapi-default)
    * [`QueryDefinition`](#querydefinition)
    * [`props.queries`](#propsqueries)
  * [Added Backbone Attributes](#added-backbone-attributes)
* [Testing](#testing)

## Getting Started

This example demonstrates the simplest possible usage of React JSON API with a
nested relation.

```javascript
import Backbone from 'backbone';
import 'backbone-relational';

import ReactDOM from 'react-dom';
import withJsonApi from 'react-jsonapi';

const Filling = Backbone.Model.extend({});

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

const TacoItem = withJsonApi({
    taco: (props, vars) => ({
        model: Taco,
        id: props.tacoId,
        fields: ['name']
        relations: [
            {
                key: 'fillings',
                fields: ['name']
            }
        ]
    })
}, function ({ taco }) {
    return (
        <div>
            Name: {taco.get('name')},
            Fillings: {taco.get('fillings').map((filling) => {
                return filling.get('name');
            }).join(', ')}
        </div>
    );
});

ReactDOM.render((
    <TacoItem tacoId={1} />,
    document.getElementById('container')
));
```

This will make a request to the JSON API URL
`/tacos/1?fields[tacos]=name&fields[fillings]=name&include=fillings`.

## Using with a Router

This example demonstrates the simplest possible usage of React JSON API
with a React Router v3.x router, connecting a component that renders data from a
model instance queried by ID to a route with an ID parameter.

```javascript
import Backbone from 'backbone';
import 'backbone-relational';

import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import withJsonApi, { AsyncProps } from 'react-jsonapi';

const Taco = Backbone.RelationalModel.extend({
    urlRoot: '/tacos',
    defaults: { type: 'tacos' },
});

const TacoItem = withJsonApi({
    taco: (urlParams, urlQuery, vars) => ({
        model: Taco,
        id: urlParams.tacoId,
        fields: ['name']
    })
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

```javascript
const TacoItem = withJsonApi({
    taco: {
        model: Taco,
        relations: [
            {
                key: 'fillings',
                fields: ['name']
            }
        ]
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
    tacos: (urlParams, urlQuery, vars) => ({
        model: TacoCollection,
        fields: ['name'],
        fragments: [
            TacoItem.taco
        ]
    })
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

These are called "variables."  One set of variables is shared between all
queries belonging to a component, and can be accessed using the following
attributes of the `queries` prop:

  - `vars` - the variables for the currently loaded models
  - `pendingVars` - the variables used to fetch the pending models
  - `setVars(vars)` - merge `vars` with the current variables and trigger a
    refetch, similarly to React's `setState()`

Defining queries using variables instead of state enables better encapsulation
of query definitions and makes it easier to display variable changes while a
fetch is ongoing.

Here is an example of variables in action:

```javascript
const ItemSearch = withJsonApi({
    queries: {
        items: (urlParams, urlQuery, vars) => ({
            model: ItemCollection,
            fields: vars.includeDescription 
                ? ['name', 'description']
                : ['name']
        })
    }, 
    options: {
        initialVars: {
            includeDescription: true,
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

This documentation presents APIs using the TypeScript type definition format.

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

`withJsonApi(queries, Component): React.Component`

A [higher-order
component](https://reactjs.org/docs/higher-order-components.html) that renders
`Component` with query models passed as props and manages Backbone event
handlers for the models.

Type definition:

```typescript
import { Shape, CacheOptions } from './QueryDefinition'; // see below

interface Variables {
    [key: string]: any
}

type StandaloneQueryPropDefinition = (
    props, // the component props
    vars // the query variables
) => QueryDefinition;

type RouteQueryPropDefinition = (
    urlParams, // the React Router route params object (/route/:param) from `props.params`
    urlQuery, // the React Router route query object (?x=y) from `props.location.query`
    vars // the query variables
) => QueryDefinition;

type FragmentPropDefinition = Shape;
type QueryPropDefinition = StandaloneQueryPropDefinition 
    | RouteQueryPropDefinition | FragmentPropDefinition;

interface QueryPropTypes {
    [name]: QueryPropDefinition
}

interface QueryPropTypesOptions extends CacheOptions {
    // CacheOptions properties provide default values for all query props of a component
    initialVars?: Variables,
    getInitialVars?(): Variables
}

interface QueryPropTypesWithOptions {
    queries: QueryPropTypes, 
    options: QueryPropTypesOptions
}

interface QueriesProp {
    vars: Variables,
    pendingVars: Variables,
    setVars(vars: Variables): void,
    urlQuery?: {[key: string]: string},
    urlParams?: {[key: string]: string},
    fetching: boolean,
    hasErrors: boolean
}

interface APIComponent extends React.Component {
    props: {
        queries: QueriesProp,
    }
}

function withJsonApi(
    queries: QueryPropTypes | QueryPropTypesWithOptions 
    Component
): APIComponent;
```

##### `QueryDefinition`

A `QueryDefinition` is an object that specifies the definition of either a model
or collection query or a fragment.  A model query loads data from a single model
[resource](https://jsonapi.org/format/#document-resource-objects) like
`/articles/1` into a Backbone Model instance.  A collection query loads data
from a collection of model resources like `/articles` into a Backbone Collection
instance.

Model and collection queries and fragments share the same options related to the
parts of the URL that specify what data to include for each model resource but
have different options related to the parts of the URL that specify which
top-level resource or resources to return.

###### Resource options

Resource options specify the top-level HTTP resource or resources to
return for a query or fragment.

Model query options:

  * `id` (required) - the ID of the resource to fetch.

Collection query options:

  * `filter` - a string or object to pass as the JSON API
    [`filter`](https://jsonapi.org/format/#fetching-filtering) parameter.
  * `sort` - a string to pass as the JSON API 
    [`sort`](https://jsonapi.org/format/#fetching-sorting) parameter.
  * `page` - a string or object to pass as the JSON API
    [`page`](https://jsonapi.org/format/#fetching-pagination) parameter.

###### Shape options

Shape options specify the data to include for each resource returned by the query.

  * `fields` - an array of names of fields of the subject model to include in
    the response, used as the JSON API 
    [`fields`](https://jsonapi.org/format/#fetching-sparse-fieldsets)
    parameter for the subject model's type.
    
    If not specified, the default behavior of a JSON API that complies with the
    standard is to include all fields in the response.

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
      - `fragments` - an array of fragments (shapes) to include for this
        relation.  The `fields` and `relations` values from each fragment will
        be merged into the `fields` and `relations` values for this relation.

    If not specified, no relations will be returned.

  * `fragments` - an array of fragments (shapes) to include in this query.  The
    `fields` and `relations` values from each fragment will be merged into the
    `fields` and `relations` values of this query.

###### Cache options

React JSON API maintains a cache of previously loaded query results.  The
following options control how the cache is used:

  * `loadFromCache` - load cached results for this query if complete
    results for the query exist in the cache. (Default: `true`)

  * `alwaysFetch` - fetch new results for a query whose initial
    results were loaded from the cache. (Default: `true`)

  * `updateCache` - update the cache with the results returned for
    this query. (Default: `true`)

Type definition:

```typescript
interface Relation {
    key: string,
    fields?: [string],
    relations?: [Relation],
    fragments?: [Relation] 
}

interface Shape extends Relation {
    key: never
}

interface CacheOptions {
    loadFromCache?: boolean,
    alwaysFetch?: boolean,
    updateCache?: boolean
}

interface ModelQueryDefinition extends Shape, CacheOptions {
    id: string | number
}

interface CollectionQueryDefinition extends Shape, CacheOptions {
    filter?: string | object,
    sort?: string | object,
    page?: string | object
}

type QueryDefinition = ModelQueryDefinition | CollectionQueryDefinition;
```

##### `props.queries`

In addition to the query props, the decorated component receives a prop named
`queries` that has all query props for that component as attributes and
provides an API for manipulating variables.  `queries` has the following
additional attributes:

- `vars` - the variables for the currently loaded models.
- `pendingVars` - the variables used to fetch the pending models.
- `setVars(vars)` - merge `vars` with the current variables and trigger a refetch.
- `urlQuery` - the matched route URL query used to fetch the currently loaded
   models, if using with a router.
- `urlParams` - the matched route URL params used to fetch the currently loaded
   odels, if using with a router.
- `fetching` - whether the queries are currently being fetched.
- `hasErrors` - whether any of this set of models and collections had an error
  response on the last request.

### Added Backbone Attributes

Some additional convenience attributes are added to each instance of `Backbone.Model` 
and `Backbone.Collection`:

- `syncing` - whether a pending sync is ongoing
- `error` - the error returned by the latest request, or null

The factory function `Backbone.RelationalModel.extend()` is monkey-patched 
to add model classes to a global registry if `defaults.type` is defined 
(see example).  The value of this property is used where a type is expected 
in JSON API URLs.

## Testing

```
$ npm install
$ npm install -g http-server
$ http-server
```
