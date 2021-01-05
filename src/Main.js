import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import App from './screens/App';
import Exercise1 from './screens/Exercise1';
import Exercise2 from './screens/Exercise2';

const Main = () => {
    return <Router>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Route exact path="/exercise1">
                <Exercise1 />
            </Route>
            <Route exact path="/exercise2">
                <Exercise2 />
            </Route>
        </Switch>
    </Router>
}

export default Main;