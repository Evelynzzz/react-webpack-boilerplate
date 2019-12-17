import React,{useState,useContext} from 'react'
import {ThemeContext} from './ThemeContext'

export default function Home(props){
  const [name, setName]= useState("Evelyn")
  const [surname, setSurname]= useState("ZHONG")
  const {theme} = useContext(ThemeContext)

  function handleNameChange(e){
    setName(e.target.value)
  }

  function handleClearName(){
    setName("")
  }

  function handleSurnameChange(e){
    setSurname(e.target.value)
  }

  function handleClearSurname(){
    setSurname("")
  }

  return (
    <div>
      {<p>Hello {name} {surname}!</p>}
      <input type="text"
        placeholder="What's your name?"
        onChange={handleNameChange.bind(this)}
        value={name}
      />
      <button onClick={handleClearName.bind(this)}>Clear</button>
      <br/>
      <input type="text"
        placeholder="What's your surname?"
        onChange={handleSurnameChange.bind(this)}
        value={surname}
      />
      <button onClick={handleClearSurname.bind(this)}>Clear</button>
      <br/>
      <br/>
      <p>Now your are using {theme} theme :)</p>
    </div>
  )
}