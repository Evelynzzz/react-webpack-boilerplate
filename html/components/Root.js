import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import One from "./One"
import Main from "./Main.js"

export default class Root extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path={'/'} component={Main} />
          <Route path={'/one'} component={One} />  
        </Switch>          
      </HashRouter>
    )
  }
}