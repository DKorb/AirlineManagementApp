import { useState } from 'react'
import { Button, InputGroup, Offcanvas } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"
import { useHistory } from "react-router-dom"

const FindAirport = () => {

    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState('')
    const [airportData, setAirportData] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSearch = () => {
        fetch(`http://localhost:9090/api/v1/airports/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                setAirportData(data)
                handleShow()
            })
            .catch(error => console.error('Error fetching airport:', error))
    }

    const handleBack = () => {
        history.push('/airport')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '700px' }}>
                <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '3px' }}>FIND AIRPORT</h1>
                <Form className="d-flex flex-column align-items-center">
                    <InputGroup className="mb-3">
                        <FaSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px', marginTop: '5px' }} />
                        <Form.Control
                            placeholder="Find airport"
                            aria-label="Find airport"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" id="button-addon2" onClick={handleSearch}>
                            Search
                        </Button>
                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>AIRPORT DETAILS</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {airportData ? (
                                    <>
                                        <p><b>Airport Code:</b> {airportData.code}</p>
                                        <p><b>Name:</b> {airportData.name}</p>
                                        <p><b>City:</b> {airportData.city}</p>
                                        <p><b>Country:</b> {airportData.country}</p>
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

export default FindAirport