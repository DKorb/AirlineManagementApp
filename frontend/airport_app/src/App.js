import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import Body from './components/Body'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Airport from './components/airport/Airport'
import CreateNewAirport from './components/airport/CreateNewAirport'
import ShowAllAirports from './components/airport/ShowAllAirports'
import FindAirport from './components/airport/FindAirport'
import UpdateAirport from './components/airport/UpdateAirport'
import Flights from './components/flight/Flight'
import CreateNewFlight from './components/flight/CreateNewFlight'
import ShowAllFlights from './components/flight/ShowAllFlights'
import UpdateFlight from './components/flight/UpdateFlight'
import FindFlight from './components/flight/FindFlight'
import Ticket from './components/ticket/Ticket'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <BackImage />
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/airport" component={Airport} />
        <PrivateRoute path="/create-airport" component={CreateNewAirport} />
        <PrivateRoute path="/all-airports" component={ShowAllAirports} />
        <PrivateRoute path="/find-airport" component={FindAirport} />
        <PrivateRoute path="/edit-airport/:id" component={UpdateAirport} />
        <PrivateRoute path="/flight" component={Flights} />
        <PrivateRoute path="/create-flight" component={CreateNewFlight} />
        <PrivateRoute path="/all-flights" component={ShowAllFlights} />
        <PrivateRoute path="/edit-flight/:id" component={UpdateFlight} />
        <PrivateRoute path="/find-flight" component={FindFlight} />
        <PrivateRoute path="/ticket" component={Ticket} />
        <Route path='*' component={NotFound} />
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

function PrivateRoute({ component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
      localStorage.getItem("user_id") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
        to={{
          pathname: "/login",
          state: {from: props.location}
        }}
        />
      )}
      />
  )
}

export default App
