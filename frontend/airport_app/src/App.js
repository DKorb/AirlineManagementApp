import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Body from './components/Body'

function App() {
  return (
    <Router>
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
      </Switch>
    </Router>
  )
}

export default App;
