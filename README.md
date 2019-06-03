# React JSON API

React JSON API is a library for [React](https://facebook.github.io/react/) that
provides declarative co-located data loading for React components from [JSON
APIs](http://jsonapi.org).  It uses [React
Router](https://github.com/ReactTraining/react-router/tree/v3) (v3), with data
loading occurring whenever the current route changes.  You can either write your
app to load data based on the current URL, or embed a non-top-level router
instance not connected to the page URL in an inner component to manage
application/data state without affecting the page URL.

React JSON API is a direct alternative to
[Relay](http://facebook.github.io/relay/) that uses
[Backbone](http://backbonejs.org) models that consume a REST API instead of the
new standard GraphQL upon which Relay is based.  It provides the majority of the
functionality of Relay/GraphQL except multiple queries in one network request.

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

## Usage

### Example

This example loads data based on the current URL.  For an example of managing
data not connected to the visible page URL, see below.

```javascript
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

### API Exports

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

### A note about React Router versions

This library incorporates the
[AsyncProps](https://github.com/ryanflorence/async-props) middleware for React
Router. It is only compatible with React Router up to v3.x, so you will not be
able to use React Router v4 with this library.

React Router v3 introduced asynchronous route definition via `getChildRoutes()`
and `getComponents()`, which is incompatible with co-located data loading.  Avoid
using these features if you want to use React JSON API.

### Using separately from the page URL

To manage the loading of data in parts of your application whose state is not
connected to the page URL, render an instance of the React Router `Router` that
uses React Router's `createMemoryHistory` inside of another component to avoid
interacting with the page URL but still keep data in sync with application
state in the same way.

React JSON API depends on React Router v3, which is compatible with the
`[history](https://github.com/ReactTraining/history)` library up to v3.x.
Specifying `Router` `history` and/or `routes` by value in the `render()` method
is incorrect, so it is recommended to store your routes as state and create and
access your `history` object in the component lifecycle and store it as state as
well, and reference these values when defining a `Router` in the `render()`
method, as seen below.

For a working example of this usage pattern, see the example.

```javascript
import {Router, Route, createMemoryHistory} from 'react-router';
import {APIComponent, AsyncProps} from 'react-jsonapi';

// ...

const ItemList = createReactClass({
    getInitialState() {
        const routes = <React.Fragment>
            <Route path="/" component={() => <div>Loading...</div>} />
            <Route path="/item/:itemId" component={Item} />,
        </React.Fragment>;

        return {
            history: createMemoryHistory("/"),
            routes
        };
    },
    componentWillMount() {
        this.componentDidUpdate();
    },
    componentDidUpdate() {
        const {history} = this.state;
        const pathname = `/item/${this.props.itemId}`;
        if (history.getCurrentLocation().pathname !== pathname) {
            history.push(pathname)
        }
    },
    render() {
        return <div>
            {tacos.map((taco) => {
                return <div key={taco.id}>
                    <Router
                        history={this.state.history}
                        render={(props) => <AsyncProps {...props} />}
                        routes={this.state.routes}
                    />
                </div>;
            })}
        </div>;    
    }
});

const FooList = createReactClass({
    statics: {
        fragments: {
            itemWithFoos: {
                model: Item,
                relations: [
                    {
                        key: 'foos',
                        fields: ['field1', 'field2']
                    }
                ]
            }
        }
    },
    render() {
        const {queries: {item}} = this.props;
        return <div>
            <ul>
            Foos:
            {item.get('foos').map((foo) => {
                return <li key={foo.id}>
                    Foo: {foo.get('field1')}, {foo.get('field2')}
                </li>;
            })}
            </ul>
        </div>;
    }
});

const Item = APIComponent(createReactClass({
    statics: {
        queries: {
            item(params, query, vars): {
                model: Item,
                id: params.itemId,
                fields: ['name'],
                fragments: [
                  FooList.fragments.itemWithFoos
                ]
            }
        }
    },
    render() {
        const {item, queries} = this.props;

        return <div>
            Name: {item.get('name')}
            {React.Children.map(
                this.props.children, 
                (child) => React.cloneElement(child, { queries })
            }
        </div>;
    }
}));
```

## Testing

```
$ npm install
$ git checkout -- jspm.config.js
$ # comment out example-bundle.js in index.html and production: true in
$ # jspm.config.js
$ npm install -g http-server
$ http-server
