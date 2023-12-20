import { useState } from 'react'
import { Button, InputGroup, Offcanvas } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"
import { useHistory } from "react-router-dom"

const FindTicket = () => {

    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState('')
    const [ticketData, setTicketData] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSearch = () => {
        fetch(`http://localhost:9090/api/v1/users/${searchTerm}/tickets`)
            .then(response => response.json())
            .then(data => {
                setTicketData(data)
                handleShow()
            })
            .catch(error => console.error('Error fetching ticket:', error))
    }

    const handleBack = () => {
        history.push('/ticket')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '700px' }}>
                <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '3px' }}>FIND TICKET</h1>
                <Form className="d-flex flex-column align-items-center">
                    <InputGroup className="mb-3">
                        <FaSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px', marginTop: '5px' }} />
                        <Form.Control
                            placeholder="Find ticket (enter user ID)"
                            aria-label="Find ticket"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                            Search
                        </Button>
                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>TICKET DETAILS</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {ticketData ? (
                                    ticketData.map((ticket) => (
                                        <div key={ticket.ticketId}>
                                            <h5>Flight Details</h5>
                                            <p>Airline: {ticket.flight.airlineName}</p>
                                            <p>Flight Number: {ticket.flight.flightNumber}</p>
                                            <p>Departure Airport: {ticket.flight.departureAirport.name}</p>
                                            <p>Arrival Airport: {ticket.flight.arrivalAirport.name}</p>
                                            <h5>User Details</h5>
                                            <p>Username: {ticket.user.username}</p>
                                            <p>First Name: {ticket.user.firstname}</p>
                                            <p>Last Name: {ticket.user.lastName}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </Offcanvas.Body>

                        </Offcanvas>
                    </InputGroup>
                </Form>
                <Button variant="info" type="submit" className="mt-3" onClick={handleBack}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default FindTicket