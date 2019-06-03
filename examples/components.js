import React from 'react';
import createReactClass from 'create-react-class';
import {Link} from 'react-router';
import {APIComponent} from 'react-jsonapi';
import {ArticleCollection, Article, Comment, Tag, User} from './models';

const ArticleListItem = APIComponent(createReactClass({
    statics: {
        fragments: {
            article: {
                model: Article,
                fields: ['title'],
                relations: [
                    {
                        key: 'author',
                        fields: ['name', 'username']
                    }
                ]
            }
        }
    },
    render() {
        const {article} = this.props;
        const author = article.get('author');

        return (
            <div>
                <h4>{article.get('title')} (<Link to={`/articles/${article.get('id')}`}>View</Link>)</h4>
                
                by {author.get('username')} ({author.get('name')})
            </div>
        );
    
    }
}));

export const ArticleList = APIComponent(createReactClass({
    statics: {
        getInitialVars() {
            return {
                filter: false 
            };
        },
        queries: {
            articles(params, query, vars) {
                return {
                    model: ArticleCollection,
                    filter: vars.filter ? 'id != 11': null,
                    relations: [
                        {
                            key: 'tags',
                            fields: ['name']
                        }
                    ],
                    fragments: [
                        ArticleListItem.fragments.article
                    ]
                };
            }
        }
    },

    render() {
        const {articles, loading, queries} = this.props;
        const tagCounts = {};

        articles.forEach((article) => {
            article.get('tags').forEach((tag) => {
                const name = tag.get('name');
                tagCounts[name] = (tagCounts[name] || 0) + 1;
            });
        });

        return (
            <div>
                <div style={{float: 'left', width: '33%'}}>
                    <h3>Articles</h3>
                    <input type="checkbox" checked={(queries.pendingVars || queries.vars).filter} onChange={(e) => {
                        queries.setVars({filter: e.target.checked});
                    }}/> Filter
                    {articles.map((article) => {
                        return <ArticleListItem key={article.get('id')} article={article} />;
                    })}

                    <h3>Tag counts</h3>
                    <ul>
                        {_.map(tagCounts, (count, name) => {
                            return <li key={name}>{name}: {count}</li>;
                        })}
                    </ul>
                </div>
                <div style={{float: 'left', width: '60%'}}>
                    {this.props.children}
                </div>
                <div style={{clear: "both"}}></div>
            </div>
        );
    }
}));


const CommentItem = APIComponent(createReactClass({
    statics: {
        fragments: {
            comment: {
                model: Comment,
                fields: ['title', 'content', 'date'],
                relations: [
                    {
                        key: 'author',
                        fields: ['username']
                    }
                ]
            
            }
        
        }
    },
    render() {
        const {comment} = this.props;
        return (
            <div>
                <h4>{comment.get('title')}</h4>
                {comment.error ? <p>{`Error Saving: ${comment.error}`}</p> : ''}
                <p>
                    {comment.get('content')}
                </p>
                by {comment.get('author').get('username')} at {comment.get('date')}
            </div>
        );
    }

}));

export const ArticleItem = APIComponent(createReactClass({
    getInitialState() {
        return {
            addingComment: false,
            commentText: ''
        };
    },
    statics: {
        queries: {
            article(params, query, vars) {
                return {
                    model: Article,
                    id: params.articleId,
                    fields: ['title', 'content'],
                    relations: [
                        {
                            key: 'author',
                            fields: ['name', 'username'],
                            relations: [
                                {
                                    key: 'articles',
                                    model: Article,
                                    fields: ['title']
                                }
                            ]
                        },
                        {
                            key: 'comments',
                            fragments: [
                                CommentItem.fragments.comment
                            ]
                        }
                    ]
                };
            }
        }
    },
    render() {
        const {article, loading} = this.props;
        const author = article.get('author');

        return (
            <div>
                <div>
                    {loading ? 'Loading...' : ''}
                </div>
                {article.error ? 
                    <div>
                        Error: {article.error}
                    </div> :
                    this.renderArticle()}
            </div>
        );
    },
    renderArticle() {
        const {article} = this.props;
        const author = article.get('author');

        return (
            <div style={{width: '100%'}}>
                <div style={{float: 'left', width: '50%'}}>
                    <h2>{article.get('title')}</h2>
                    by {author.get('name')}
                    <div>
                        <h4>Content</h4>
                        <p>
                            {article.get('content')}
                        </p>
                    </div>
                    <h3>More by this Author</h3>
                    <ul>
                        {author.get('articles').map((article) => {
                            if (!article.get) {
                                return <li></li>;
                            
                            }
                            return <li key={article.get('id')}>
                                {article.get('title')}
                            </li>;
                        })}
                    </ul>
                </div>
                <div style={{float: 'left', width: '50%'}}>
                    <h3>Comments</h3>
                    {article.get('comments').map((comment) => {
                        return <CommentItem key={comment.get('id')} comment={comment} />;
                    })}
                    {!this.state.addingComment ? 
                            <a href="#" 
                                onClick={(e) => { 
                                    e.preventDefault();
                                    this.setState({
                                        addingComment: true
                                    });
                                }}>
                                Add Comment
                            </a> :
                            <div>
                                <input value={this.state.commentText} onChange={(e) => {
                                    this.setState({
                                        commentText: e.target.value
                                    });
                                }} type="text"/>
                                <button onClick={() => {
                                    this.setState({
                                        addingComment: false
                                    });
                                    const comment = new Comment({
                                        title: 'New Comment',
                                        content: this.state.commentText,
                                        date: 'now',
                                        author: User.findOrCreate({
                                            id: '1'
                                        })
                                    })
                                    article.get('comments').add(comment);
                                    comment.save();
                                }}>
                                    Submit
                                </button>
                            </div>}
                </div>
            </div>
        );
    }
}));
