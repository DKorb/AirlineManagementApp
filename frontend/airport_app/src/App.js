import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import GenerateTicket from './components/ticket/GenerateTicket'

function App() {
  return (
    <Router>
      <BackImage />
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/airport" component={Airport} />
        <Route path="/create-airport" component={CreateNewAirport} />
        <Route path="/all-airports" component={ShowAllAirports} />
        <Route path="/find-airport" component={FindAirport} />
        <Route path="/edit-airport/:id" component={UpdateAirport} />
        <Route path="/flight" component={Flights} />
        <Route path="/create-flight" component={CreateNewFlight} />
        <Route path="/all-flights" component={ShowAllFlights} />
        <Route path="/edit-flight/:id" component={UpdateFlight} />
        <Route path="/find-flight" component={FindFlight} />
        <Route path="/ticket" component={Ticket} />
        <Route path="/generate-ticket" component={GenerateTicket} />
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

export default App
