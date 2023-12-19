import { useState } from 'react'
import { Button, InputGroup, Offcanvas } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"
import { useHistory } from "react-router-dom"

const FindFlight = () => {

    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState('')
    const [flightData, setFlightData] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSearch = () => {
        fetch(`http://localhost:9090/api/v1/flights/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setFlightData(data)
                handleShow()
            })
            .catch(error => console.error('Error fetching flight:', error))
    }

    const handleBack = () => {
        history.push('/flight')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '700px' }}>
                <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '3px' }}>FIND FLIGHT</h1>
                <Form className="d-flex flex-column align-items-center">
                    <InputGroup className="mb-3">
                        <FaSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px', marginTop: '5px' }} />
                        <Form.Control
                            placeholder="Find flight (enter ID)"
                            aria-label="Find flight"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                            Search
                        </Button>
                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>FLIGHT DETAILS</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {flightData ? (
                                    <>
                                        <p><b>Flight number:</b> {flightData.flightNumber}</p>
                                        <p><b>Departure airport:</b> {flightData.departureAirport.id}</p>
                                        <p><b>Arrival airport:</b> {flightData.arrivalAirport.id}</p>
                                    </>
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

export default FindFlight