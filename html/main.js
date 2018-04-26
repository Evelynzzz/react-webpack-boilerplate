import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, HashRouter } from 'react-router-dom'

import './styles/main.less'

import One from "./components/One"

class Main extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>
         <p>Hello World!</p>
         <br/>
         <button onClick={() => window.location.href="#/one" }>Go next</button>
      </div>
    )
  }
}  
ReactDOM.render (
  (
    <HashRouter>
      <Switch>
        <Route exact path={'/'} component={Main} />
        <Route path={'/one'} component={One} />  
      </Switch>          
    </HashRouter>
  ),
  document.getElementById('main')
);