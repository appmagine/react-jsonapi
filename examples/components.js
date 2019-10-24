import React from 'react';
import createReactClass from 'create-react-class';
import { Link } from 'react-router';
import { createMemoryHistory } from 'history';
import { withJsonApi } from 'react-jsonapi';
import { ArticleCollection, Article, Comment, Tag, User } from './models';

const ArticleListItem = withJsonApi({
    fragments: {
        article: {
            model: Article,
            fields: ['title'],
            relations: [
                {
                    key: 'author',
                    fields: ['username']
                }
            ]
        }
    }
}, function ArticleListItem({ article }) {
    const author = article.get('author');

    return (
        <div>
            <Link 
                to={`/articles/${article.get('id')}`}
                activeStyle={{textDecoration: 'none', color: 'black'}}
            >
                <strong>{article.get('title')}</strong>
            </Link>
            <br/>
        
            by {author.get('username')}
            <br/>
            <br/>
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
                filter: vars.filter ? 'id != 11' : null,
                fragments: [
                    ArticleListItem.fragments.article
                ],
                loadExistingData: true
            };
        }
    }
}, function ArticleList({ articles, loading, queries, children }) {
    return (
        <div>
            <div className="panel" style={{width: "120px"}}>
                <h3>Articles</h3>
                <input type="checkbox" checked={(queries.pendingVars || queries.vars).filter} onChange={(e) => {
                    queries.setVars({filter: e.target.checked});
                }}/> Filter
                <br/>
                <br/>
                {articles.map((article) => {
                    return <ArticleListItem key={article.get('id')} article={article} />;
                })}
            </div>
            <div key="right" style={{float: 'left', maxWidth: '520px'}}>
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
}, function CommentItem({ comment }) {
    return (
        <div>
            <u>{comment.get('title')}</u>
            {comment.error ? <p>{`Error Saving: ${comment.error}`}</p> : ''}
            <p>
                {comment.get('content')}
            </p>
            by {comment.get('author').get('username')} at {comment.get('date')}
            <br/>
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
}, createReactClass({
    displayName: "ArticleItem",
    getInitialState() {
        return {
            addingComment: false,
            commentText: '',
        };
    },
    render() {
        const { article } = this.props;

        return (
            <div>
                {!article
                    ? <div className="panel article-panel">
                        Loading...
                    </div>
                    : article.error ? 
                        <div className="panel article-panel">
                            Error: {article.error}
                        </div> :
                        this.renderArticle()}
            </div>
        );
    },
    renderArticle() {
        const { article, loading } = this.props;
        const author = article.get('author');

        return (
            <div style={{width: '100%'}}>
                <div className="panel article-panel">
                    <h3>{article.get('title')}</h3>
                    by {author.get('name')}
                    <br/>
                    <br/>
                    <div>
                        {loading 
                            ? <React.Fragment>
                                <span>Loading...</span>
                                <br/>
                                <br/>
                            </React.Fragment>
                            : null}
                        <u>Content</u>
                        <p>
                            {article.get('content')}
                        </p>
                    </div>
                    <u>More by this author</u>
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
                    <ArticleSummary articleId={article.get('id')} />
                </div>
                <div className="panel article-panel">
                    <h3>Comments</h3>
                    {article.get('comments').map((comment, i) => {
                        return (
                            <React.Fragment>
                                {i ? <br/> : null}
                                <CommentItem key={comment.get('id')} comment={comment} />
                            </React.Fragment>
                        );
                    })}
                    <br/>
                    {!this.state.addingComment ? 
                            <input type="button"
                                value="Add Comment"
                                onClick={(e) => { 
                                    e.preventDefault();
                                    this.setState({
                                        addingComment: true
                                    });
                                }} /> :
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

const ArticleSummary = withJsonApi({
    queries: {
        article(props, vars) {
            return {
                model: Article,
                id: props.articleId,
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
}, function ArticleSummary({ article }) {
    if (!article) {
        return (
            <div></div>
        );
    }

    const commentsCount = article.get('comments').length;

    return (
        <div>
            {article.get('title')} by {article.get('author').get('name')}
            <br/>
            {commentsCount} {commentsCount == 1 ? 'comment' : 'comments'}
        </div>
    );
});
