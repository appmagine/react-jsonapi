import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import { ArticleList, ArticleItem } from './components';

import { AsyncProps } from 'react-jsonapi';
import { Link, Router, Route, browserHistory } from 'react-router';
import { useBasename } from 'history';

function Home() {
    return (
        <div>
            <p>
                <Link to={"/articles"}>Link</Link>
            </p>
            <p>
                <Link to={"/articles/10"}>Deep Link</Link>
            </p>
        </div>
    );
}

ReactDOM.render((
    <Router 
        history={useBasename(() => browserHistory)({ 
            basename: window.location.pathname
        })}
        render={(props) => <AsyncProps {...props} />}
    >
        <Route path="/" component={Home} /> 
        <Route path="/articles" component={ArticleList}>
            <Route path=":articleId" component={ArticleItem} />
        </Route>
    </Router>
), document.getElementById('main'));
