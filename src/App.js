import React, {Component} from 'react';
// import './App.css';
import './assets/styles/main.scss';

import routes from './routes';
import {Switch, Route, BrowserRouter as Router, HashRouter} from 'react-router-dom';

class App extends Component {

    showContent = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                )
            });
        }
        return (
            <Switch>
                {result}
            </Switch>
        )
    };

    render() {
        return (
            <HashRouter>
                <div className="main">
                    {this.showContent(routes)}
                </div>
            </HashRouter>
        );
    }
}

export default App;
