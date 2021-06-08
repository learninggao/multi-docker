import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import OtherPage from './OtherPage'
import Fib from './Fib'
import './App.scss'

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to React</h1>
        <Link to="/">Home</Link>
        <Link to="/otherPage">OtherPage</Link>
      </div>
      <div>
        <Route exact path="/" component={Fib} />
        <Route path="/otherpage" component={OtherPage} />
      </div>
    </Router>
  )
}

export default App
