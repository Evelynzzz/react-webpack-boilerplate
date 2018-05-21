import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Home from "./Home"
import About from "./About.js"

export default class Root extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
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
            <Route exact path={'/'} component={Home} />
            <Route path={'/about'} component={About} />   
            <Route path={'/topics'} component={Topics} />  
            <Route component={NoMatch} /> 
          </Switch>
        </div>
      </Router>
    )
  }
};

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Switch>
      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route exact path={match.url} render={() => <h3>Please select a  topic.</h3>} />
    </Switch>
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
 )

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);