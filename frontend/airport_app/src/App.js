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
import UpdateFlightStatus from './components/flight/UpdateFlightStatus'
import Permissions from './components/Permissions'

function App() {
  return (
    <Router>
      <BackImage />
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/airport" component={Airport} requiredRole="ADMIN" />
        <PrivateRoute path="/create-airport" component={CreateNewAirport} requiredRole="ADMIN" />
        <PrivateRoute path="/all-airports" component={ShowAllAirports} requiredRole="ADMIN" />
        <PrivateRoute path="/find-airport" component={FindAirport} requiredRole="ADMIN" />
        <PrivateRoute path="/edit-airport/:id" component={UpdateAirport} requiredRole="ADMIN" />
        <PrivateRoute path="/flight" component={Flights} />
        <PrivateRoute path="/create-flight" component={CreateNewFlight} requiredRole="ADMIN" />
        <PrivateRoute path="/all-flights" component={ShowAllFlights} />
        <PrivateRoute path="/edit-flight/:id" component={UpdateFlight} requiredRole="ADMIN" />
        <PrivateRoute path="/edit-flight-status/:id" component={UpdateFlightStatus} requiredRole="ADMIN" />
        <PrivateRoute path="/find-flight" component={FindFlight} />
        <PrivateRoute path="/ticket" component={Ticket} />
        <Route path="/permission" component={Permissions} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

function BackImage() {
  return (
    <img className='background-image'
      src={"/images/airport-background.jpg"}
      alt='backgroundimg' />
  )
}

function PrivateRoute({ component: Component, requiredRole, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isLoggedIn = localStorage.getItem("user_id") !== null
        const userRole = localStorage.getItem("role")

        if (isLoggedIn) {
          if (requiredRole === "ADMIN" && userRole === "ADMIN") {
            return <Component {...props} />
          } else if (!requiredRole) {
            return <Component {...props} />
          }
        }
        return (
          <Redirect
            to={{
              pathname: isLoggedIn ? "/permission" : "/login",
              state: {
                from: props.location,
                message: requiredRole
                  ? "You do not have permission to access this page. Please log in with an admin account."
                  : "You have no access to this site. Please log in.",
              },
            }}
          />
        )
      }}
    />
  )
}

export default App
