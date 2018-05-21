import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import One from "./One"
import Main from "./Main.js"

export default class Root extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route path={'/one'} component={One} />
        </Switch>          
      </BrowserRouter>
    )
  }
}