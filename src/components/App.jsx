import React from 'react';
import './app.less'
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Main from "./main/Main";
import Card from "./card/card";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                     <Route exact path="/" component={Main}/>
                     <Route path="/card/:username/:reponame" component={Card}/>
                     <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
