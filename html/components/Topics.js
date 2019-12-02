import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import "../styles/topics.less"

export default class Topics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topis-container">
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${this.props.match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${this.props.match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Switch>
          <Route path={`${this.props.match.url}/:topicId`} component={Topic} />
          <Route exact path={this.props.match.url} render={() => <h3>Please select a  topic.</h3>} />
        </Switch>
      </div>
    )
  }
};

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
 )
