import Backbone from 'backbone';
import 'backbone-relational';
import 'react-jsonapi';

import './data';

export const Tag = Backbone.RelationalModel.extend({
    defaults: {
        type: 'tags'
    }
});

export const User = Backbone.RelationalModel.extend({
    defaults: {
        type: 'users'
    }
});

export const Comment = Backbone.RelationalModel.extend({
    urlRoot: '/comments',
    defaults: {
        type: 'comments'
    },
    relations: [
        {
            type: Backbone.HasOne,
            key: 'author',
            relatedModel: User
        }
    ]
});

export const Article = Backbone.RelationalModel.extend({
    urlRoot: '/articles',
    defaults: {
            type: 'articles'
    },
    relations: [
        {
            type: Backbone.HasOne,
            key: 'author',
            relatedModel: User,
            reverseRelation: {
                key: 'articles',
                type: Backbone.HasMany
            }
        },
        {
            type: Backbone.HasMany,
            key: 'tags',
            relatedModel: Tag
        },
        {
            type: Backbone.HasMany,
            key: 'comments',
            relatedModel: Comment
        }
    ]
});


export const ArticleCollection = Backbone.Collection.extend({
    model: Article,
    urlRoot: "/articles"
});

