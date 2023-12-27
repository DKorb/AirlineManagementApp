import { useState, useEffect } from 'react'
import { Button, InputGroup, Offcanvas } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"

const Body = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [flightData, setFlightData] = useState(null)
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [flight, setFlight] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/flights?page=0&size=10')
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json()
          })
          .then(data => setFlight(data.content)) 
          .catch(error => console.error('Error fetching flights:', error))
      }, [])

    const handleSearch = () => {
        const selectedFlightNumber = searchTerm

        if (!selectedFlightNumber) {
            setError('Please select a flight from the list.')
            return
        }

        fetch(`http://localhost:9090/api/v1/flights/${selectedFlightNumber}`)
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

    const handleTicket = () => {
        const selectedFlightNumber = searchTerm
        console.log(selectedFlightNumber)
        const userId = localStorage.getItem("user_id")
        const accessToken = localStorage.getItem("access_token")

        if (!userId) {
            setError('User not logged in.')
            return
        }

        fetch(`http://localhost:9090/api/v1/users/${userId}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                flightNumber: selectedFlightNumber,
                purchaseTime: new Date().toISOString(),
            }),
        })
            .then(response => response.json())
            .then(() => {
                setSuccess('You bought the ticket for this flight')
                handleClose()
            })
            .catch(error => {
                setError(error.message)
            })
    }

    useEffect(() => {
        const userId = localStorage.getItem("user_id")
        const accessToken = localStorage.getItem("access_token")
        setIsUserLoggedIn(!!(userId && accessToken))
    }, [])

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '700px' }}>
                <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '3px' }}>PŚK AIRLINES</h1>
                <Form className="d-flex flex-column align-items-center">
                    {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
                    {success && <p style={{ color: 'green', marginTop: '5px' }}>{success}</p>}
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
                                <option key={flight.flightNumber} value={flight.flightNumber}>
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
                                        <p><b>Airline name:</b> {flightData.airlineName}</p>
                                        <Offcanvas.Title>DEPARTURE AIRPORT</Offcanvas.Title>
                                        <p><b>Departure airport code:</b> {flightData.departureAirport.code}</p>
                                        <p><b>Departure airport name:</b> {flightData.departureAirport.name}</p>
                                        <p><b>Departure airport city:</b> {flightData.departureAirport.city}</p>
                                        <p><b>Departure airport country:</b> {flightData.departureAirport.country}</p>
                                        <Offcanvas.Title>ARRIVAL AIRPORT</Offcanvas.Title>
                                        <p><b>Arrival airport code:</b> {flightData.arrivalAirport.code}</p>
                                        <p><b>Arrival airport name:</b> {flightData.arrivalAirport.name}</p>
                                        <p><b>Arrival airport city:</b> {flightData.arrivalAirport.city}</p>
                                        <p><b>Arrival airport country:</b> {flightData.arrivalAirport.country}</p>
                                    </>
                                ) : (
                                    <p>Loading...</p>
                                )}
                                {isUserLoggedIn && (
                                    <Button variant="success" id="button-addon2" onClick={handleTicket}>
                                        Buy ticket
                                    </Button>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </InputGroup>
                </Form>
            </div>
        </div>
    )
}

export default Body