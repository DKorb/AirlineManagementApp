import { Container, Nav, Navbar } from "react-bootstrap"
import { MdConnectingAirports, MdLogin, MdLocalAirport, MdFlightTakeoff } from "react-icons/md"
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { useHistory } from "react-router-dom"
import { IoIosLogOut } from "react-icons/io"

const NavigationBar = () => {

    const history = useHistory()

    const logout = () => {
        localStorage.clear()
    }

    const handleAirport = () => {
        history.push('/airport')
        window.location.reload(true)
    }

    const handleFlight = () => {
        history.push('/flight')
        window.location.reload(true)
    }

    const guestNavbar = () => (
        <>
            <Nav.Link style={{ position: 'absolute', right: 10, top: 10 }} href='/register'><BsFillPersonPlusFill style={{ marginRight: '2px' }} />Register</Nav.Link>
            <Nav.Link style={{ position: 'absolute', right: 110, top: 10 }} href='/login'><MdLogin style={{ marginRight: '2px' }} />Login</Nav.Link>
        </>
    )

    const userNavbar = () => (
        <>
            <Nav.Link onClick={handleAirport} style={{ marginLeft: '50px' }} href='/airport'><MdLocalAirport style={{ marginRight: '5px' }} />Airports</Nav.Link>
            <Nav.Link onClick={handleFlight} style={{ marginLeft: '50px' }} href='/flight'><MdFlightTakeoff style={{ marginRight: '5px' }} />Flights</Nav.Link>
            <Nav.Link onClick={logout} style={{ position: 'absolute', right: 10, top: 10 }} href='/login'><IoIosLogOut />Logout</Nav.Link>
        </>
    )

    return (
        <div>
            <Navbar
                bg="light"
                style={{
                    paddingRight: '550px',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <Container>
                    <Navbar.Brand href='/'><MdConnectingAirports style={{ marginRight: '5px', fontSize: '30px' }} />Pśk Airlines</Navbar.Brand>
                    <Nav className='me-auto'>
                        {localStorage.getItem("access_token") === null ? guestNavbar() : userNavbar()}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar