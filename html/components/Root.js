import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Loadable from 'react-loadable';

export default class Root extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {

    const Loading = ()=> (<div>Loading...</div>)

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />
          <Switch>
            <Route exact path={'/'} 
              component={Loadable({
                loader: () => import(/* webpackChunkName: "home" */ './Home.js'),
                loading: Loading
              })} />
            <Route path={'/about'} component={Loadable({
                loader: () => import(/* webpackChunkName: "about" */ './About.js'),
                loading: Loading
              })} />   
            <Route path={'/topics'} component={Loadable({
                loader: () => import(/* webpackChunkName: "topics" */ './Topics.js'),
                loading: Loading
              })} />  
            <Route component={Loadable({
                loader: () => import(/* webpackChunkName: "nomatch" */ './NoMatch.js'),
                loading: Loading
              })} /> 
          </Switch>
        </div>
      </Router>
    )
  }
};

