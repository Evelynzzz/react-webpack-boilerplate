import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:""
    }
  }

  handleNameChange(e){
    this.setState({name:e.target.value})
  }

  handleClearName(){
    this.setState({name:""})
  }

  render() {
    const {name} =  this.state
    return (
      <div>
         {<p>Hello {name}!</p>}
         <input type="text"
          placeholder="What's your name?"
          onChange={this.handleNameChange.bind(this)}
          value={name}
          />
          <button onClick={this.handleClearName.bind(this)}>Clear</button>
         <br/>
      </div>
    )
  }
}