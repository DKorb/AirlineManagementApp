import { Container, Nav, Navbar } from "react-bootstrap"
import { MdConnectingAirports, MdLogin } from "react-icons/md"
import { BsFillPersonPlusFill } from 'react-icons/bs'

const NavigationBar = () => {

    const guestNavbar = () => (
        <>
            <Nav.Link style={{ position: 'absolute', right: 10, top: 10 }} href='/register'><BsFillPersonPlusFill style={{ marginRight: '2px'}} />Register</Nav.Link>
            <Nav.Link style={{ position: 'absolute', right: 110, top: 10 }} href='/login'><MdLogin style={{ marginRight: '2px'}} />Login</Nav.Link>
        </>
    )

    const userNavbar = () => (
        <Nav.Link style={{ position: 'absolute', right: 10, top: 10 }} href='/login'>Logout</Nav.Link>
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
                    <Navbar.Brand href='/'><MdConnectingAirports style={{ marginRight: '5px' }} />AirPort</Navbar.Brand>
                    <Nav className='me-auto'>
                        {localStorage.getItem("username") === null ? guestNavbar() : userNavbar()}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavigationBar