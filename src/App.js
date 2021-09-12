import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import {SearchBox} from './components/search-box/search-box.component'
//import Test from './Test.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
    /* if we use this.setState() inside our own method
    we have bind our method with react's "this" or use
    es6 arrow function.
    this.handleChange = this.handleChange.bind(this);
    */
  }
  /* block of code inside componentDidMount run as soon as 
     component is rendered. 
  */
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((names) => this.setState({ monsters: names }))
      .catch((error) => console.log("I have an error."));
  }
  handleChange = (e) => (
    this.setState({searchField: e.target.value})
  )
  render() {
    const {monsters,searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monster" 
          handleChange= {this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
