import React from 'react'
import '../styles/main.less'

export default class Main extends React.Component {
  constructor(props) {
    super(props);    
  }

  render() {
    return (
      <div>
         <p>Hello World!</p>
         <br/>
         <button onClick={() => window.location.href="/one" }>Go next</button>
      </div>
    )
  }
}