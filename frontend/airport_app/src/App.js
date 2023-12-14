import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Body from './components/Body'
import Register from './components/user/Register'
import Login from './components/user/Login'

function App() {
  return (
    <Router>
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/register" component={RegisterWithBackground} />
        <Route path="/login" component={LoginWithBackground} />
      </Switch>
    </Router>
  )
}

function BackImage() {
  return (
    <img className='background-image' 
    src={"/images/airport-background.jpg"} 
    alt='backgroundimg'/>
  )
}

function LoginWithBackground() {
  return (
    <>
      <BackImage />
      <Login />
    </>
  );
}

function RegisterWithBackground() {
  return (
    <>
      <BackImage />
      <Register />
    </>
  );
}

export default App;
