import { useState, useEffect } from 'react'
import { Button, InputGroup, Offcanvas } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"
import { useHistory } from "react-router-dom"

const FindFlight = () => {

    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState(null)
    const [flightData, setFlightData] = useState(null)
    const [flight, setFlight] = useState([])
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/flights')
            .then(response => response.json())
            .then(data => setFlight(data))
            .catch(error => console.error('Error fetching flights:', error))
    }, [])


    const handleSearch = () => {
        const selectedFlightId = searchTerm

        if (!selectedFlightId) {
            setError('Please select a flight from the list.')
            return;
        }

        fetch(`http://localhost:9090/api/v1/flights/${selectedFlightId}`)
            .then(response => response.json())
            .then(data => {
                setFlightData(data)
                handleShow()
                setError(null)
            })
            .catch(error => {
                console.error('Error fetching flight:', error.message)
                setError(error.message)
            })
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
                    {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
                    <InputGroup className="mb-3">
                        <FaSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px', marginTop: '5px' }} />
                        <Form.Select
                            placeholder="Select flight"
                            aria-label="Select flight"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        >
                            <option value="">Select a flight</option>
                            {flight.map(flight => (
                                <option key={flight.id} value={flight.id}>
                                    {flight.flightNumber} - {flight.departureAirport.name} to {flight.arrivalAirport.name}
                                </option>
                            ))}
                        </Form.Select>
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
                                        <p><b>Departure airport:</b> {flightData.departureAirport.name}</p>
                                        <p><b>Arrival airport:</b> {flightData.arrivalAirport.name}</p>
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