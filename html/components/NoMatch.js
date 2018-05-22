import React from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

export default class NoMatch extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>
        <h3>
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    )
  }
};
