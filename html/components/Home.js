import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <p>Home</p>
         <p>Hello World!</p>
         <br/>
         {/* <button onClick={() => window.location.href="/one" }>Go next</button> */}
      </div>
    )
  }
}