import React from 'react';
import Backbone from 'backbone';

interface RelationShapeOptions {
    key: string,
    fields?: [string],
    relations?: [RelationShapeOptions],
    fragments?: [RelationShapeOptions]
}

interface QueryShapeOptions extends RelationShapeOptions {
    key: never;
}

interface CacheOptions {
    loadFromCache?: boolean,
    alwaysFetch?: boolean,
    updateCache?: boolean
}

interface QueryOptions extends QueryShapeOptions, CacheOptions {}

interface ModelQueryDefinition extends QueryOptions {
    model: Backbone.Model,
    id: number | string
}

interface CollectionQueryDefinition extends QueryOptions {
    model: Backbone.Collection
    filter?: string | { [key: string]: string },
    sort?: string,
    page?: string | { [key: string]: string}    
}

type QueryDefinition = 
    ModelQueryDefinition | CollectionQueryDefinition;

interface Variables {
    [key: string]: any
}

type RouteQueryDefinitionFunction = (
    params: { [key: string]: any },
    location: any,
    vars: Variables
) => QueryDefinition;

type StandaloneQueryDefinitionFunction = (
    props: { [key: string]: any },
    vars: Variables
) => QueryDefinition;

interface BaseQueriesOptions extends CacheOptions {
    initialVars?: Variables
    getInitialVars?(): Variables
}

interface RouteQueriesOptions extends BaseQueriesOptions {
    queries: {
        [key: string]: RouteQueryDefinitionFunction
    }
}

interface StandaloneQueriesOptions extends BaseQueriesOptions {
    queries: {
        [key: string]: StandaloneQueryDefinitionFunction
    }
}

type QueriesOptions = RouteQueriesOptions | StandaloneQueriesOptions;

interface FragmentOptions {
    fragments: {
        [key: string]: QueryShapeOptions
    }
}

interface Queries {
    vars: Variables,
    pendingVars: Variables,
    setVars(vars: Variables): void,
    fetching: boolean,
    hasErrors: boolean
}

interface ApiComponent extends React.Component {
    props: {
        queries: Queries,
        [key: string]: any
    },
    [key: string]: any
}

export function withJsonApi(
    options: QueryOptions | FragmentOptions, 
    Component: React.Component<{}, {}> | React.FunctionComponent
): ApiComponent;

export type AsyncProps = React.Component<{}, {}>;
