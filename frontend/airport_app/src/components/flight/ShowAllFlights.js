import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'

const ShowAllFlights = () => {

    const history = useHistory()
    const [flights, setFlights] = useState([])
    const [selectedFlightId, setSelectedFlightId] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error))
    }, [])

    const handleEditFlight = (id) => {
        history.push(`/edit-flight/${id}`)
        window.location.reload(true)
    }

    const handleDeleteClick = (id) => {
        setSelectedFlightId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        await fetch(`http://localhost:9090/api/v1/flights/${selectedFlightId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetch('http://localhost:9090/api/v1/flights')
                    .then(response => response.json())
                    .then(data => setFlights(data))
                    .catch(error => console.error('Error fetching flights:', error));
            })
            .catch(error => console.error('Error deleting flight:', error))
            .finally(() => {
                setShowDeleteModal(false)
                setSelectedFlightId(null)
            })
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
        setSelectedFlightId(null)
    }

    const handleBack = () => {
        history.push('/flight')
        window.location.reload(true)
    }

    return ( 
        <div style={{ maxWidth: '1000px', margin: '150px auto' }}>
            <h1 style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ALL FLIGHTS</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Flight number</th>
                        <th>Departure airport</th>
                        <th>Arrival airport</th>
                        <th style={{ width: '155px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map(flight => (
                        <tr key={flight.id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.departureAirportId}</td>
                            <td>{flight.arrivalAirportId}</td>
                            <td>
                                <Button style={{ marginRight: '10px' }} variant="info" onClick={() => handleEditFlight(flight.id)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(flight.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="info" type="submit" className="mt-3" onClick={handleBack}>
                Back
            </Button>
            <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this flight?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
     )
}
 
export default ShowAllFlights