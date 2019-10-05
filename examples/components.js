import React from 'react';
import createReactClass from 'create-react-class';
import { Link, Router, Route } from 'react-router';
import { createMemoryHistory } from 'history';
import { withJsonApi, AsyncProps } from 'react-router-json-api';
import { ArticleCollection, Article, Comment, Tag, User } from './models';

const ArticleListItem = withJsonApi({
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
})(function ArticleListItem({ article }) {
    const author = article.get('author');

    return (
        <div>
            <h4>
                <Link to={`/articles/${article.get('id')}`}>
                    {article.get('title')}
                </Link>
            </h4>
            
            by {author.get('username')} ({author.get('name')})
        </div>
    );
});

export const ArticleList = withJsonApi({
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
                fragments: [
                    ArticleListItem.fragments.article
                ]
            };
        }
    }
})(function ArticleList({ articles, loading, queries, children }) {
    return (
        <div>
            <div className="panel">
                <h3>Articles</h3>
                <input type="checkbox" checked={(queries.pendingVars || queries.vars).filter} onChange={(e) => {
                    queries.setVars({filter: e.target.checked});
                }}/> Filter
                {articles.map((article) => {
                    return <ArticleListItem key={article.get('id')} article={article} />;
                })}
            </div>
            <div style={{float: 'left', maxWidth: '520px'}}>
                {children}
            </div>
            <div style={{clear: "both"}}></div>
        </div>
    );
});

const CommentItem = withJsonApi({
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
})(function CommentItem({ comment }) {
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
});

export const ArticleItem = withJsonApi({
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
})(createReactClass({
    displayName: "ArticleItem",
    getInitialState() {
        const routes = <React.Fragment>
            <Route path="/" component={() => <div></div>} />
            <Route path="/articles" component={Articles}>,
                <Route path=":articleId" component={ArticleSummary} />
            </Route>
        </React.Fragment>;

        return {
            addingComment: false,
            commentText: '',
            history: createMemoryHistory(),
            routes
        };
    },
    componentWillMount() {
        this.componentDidUpdate();
    },
    componentDidUpdate() {
        const { history } = this.state;
        const { articleId } = this.props.params;
        const pathname = `/articles/${articleId}`;

        if (history.getCurrentLocation().pathname !== pathname) {
            history.push(pathname)
        }
    },
    render() {
        const {article, loading} = this.props;
        const author = article.get('author');

        return (
            <div>
                {loading 
                    ? <div className="panel">
                        Loading...
                    </div>
                    : null}
                {article.error ? 
                    <div className="panel">
                        Error: {article.error}
                    </div> :
                    this.renderArticle()}
            </div>
        );
    },
    renderArticle() {
        const { article } = this.props;
        const author = article.get('author');

        return (
            <div style={{width: '100%'}}>
                <div className="panel article-panel">
                    <h3>{article.get('title')}</h3>
                    by {author.get('name')}
                    <div>
                        <h4>Content</h4>
                        <p>
                            {article.get('content')}
                        </p>
                    </div>
                    <h4>More by this author</h4>
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
                    <Router 
                        history={this.state.history}
                        render={(props) => <AsyncProps {...props} />}
                    >
                        {this.state.routes}
                    </Router>
                </div>
                <div className="panel article-panel">
                    <h3>Comments</h3>
                    {article.get('comments').map((comment) => {
                        return <CommentItem key={comment.get('id')} comment={comment} />;
                    })}
                    <br/>
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
                                <textarea value={this.state.commentText} onChange={(e) => {
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

const Articles = withJsonApi({
    queries: {
        articles(params, query, vars) {
            return {
                model: ArticleCollection,
                filter: vars.filter ? 'id != 11': null,
                fragments: [
                    ArticleListItem.fragments.article
                ]
            };
        }
    }
})(function Articles({ children }) {
    return (
        <div>
            {children}
        </div>
    );
});

const ArticleSummary = withJsonApi({
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
})(function ArticleSummary({ article }) {
    if (!article) {
        return (
            <div></div>
        );
    }

    return (
        <div>
            {article.get('title')} by {article.get('author').get('name')}
            <br/>
            {article.get('comments').length} comments
        </div>
    );
});
