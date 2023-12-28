import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'

const ShowAllFlights = () => {

    const history = useHistory()
    const [flights, setFlights] = useState([])
    const [selectedFlightNumber, setSelectedFlightNumber] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchFlightNumber, setSearchFlightNumber] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const recordPerPage = 10

    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/flights?page=${currentPage - 1}&size=${recordPerPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setFlights(data.content)
                setTotalPages(data.totalPages)
            })
            .catch(error => console.error('Error fetching flights:', error))
    }, [currentPage])

    const handleEditFlight = (flightNumber) => {
        history.push(`/edit-flight/${flightNumber}`)
        window.location.reload(true)
    }

    const handleDeleteClick = (flightNumber) => {
        setSelectedFlightNumber(flightNumber)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        await fetch(`http://localhost:9090/api/v1/flights/${selectedFlightNumber}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetch('http://localhost:9090/api/v1/flights')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then(data => setFlights(data.content))
            })
            .catch(error => console.error('Error deleting flight:', error))
            .finally(() => {
                setShowDeleteModal(false)
            })
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    const handleBack = () => {
        history.push('/flight')
        window.location.reload(true)
    }

    const showNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const showPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const filteredFlights = flights.filter(flight => flight.flightNumber.toLowerCase().includes(searchFlightNumber.toLowerCase()))

    return (
        <div style={{ maxWidth: '1000px', margin: '50px auto' }}>
            <h1 style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ALL FLIGHTS</h1>
            <input
                type="search"
                className='form-control rounded'
                placeholder="🔍 Search by flight number"
                value={searchFlightNumber}
                onChange={(e) => setSearchFlightNumber(e.target.value)}
            />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Flight number</th>
                        <th>Airline name</th>
                        <th>Departure airport name (code)</th>
                        <th>Arrival airport name (code)</th>
                        <th>Departure time</th>
                        <th>Arrival time</th>
                        <th>Flight duration</th>
                        <th>Flight status</th>
                        <th style={{ width: '155px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFlights.map(flight => (
                        <tr key={flight.flightNumber}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.airlineName}</td>
                            <td>{flight.departureAirport.name} ({flight.departureAirport.code})</td>
                            <td>{flight.arrivalAirport.name} ({flight.arrivalAirport.code})</td>
                            <td>{flight.departureTime}</td>
                            <td>{flight.arrivalTime}</td>
                            <td>{flight.flightDuration} min.</td>
                            <td>{flight.flightStatus}</td>
                            <td>
                                <Button style={{ marginRight: '10px' }} variant="info" onClick={() => handleEditFlight(flight.flightNumber)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(flight.flightNumber)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ul class="pagination">
                    <li class="page-item">
                        <button
                            type="button"
                            class="page-link"
                            disabled={currentPage === 1 ? true : false}
                            onClick={showPrevPage}
                            className='btn btn-primary'
                            style={{ marginRight: '5px' }}
                        >
                            Previous
                        </button>
                    </li>
                    <li class="page-item">
                        <button
                            type="button"
                            class="page-link"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={showNextPage}
                            className='btn btn-primary'
                        >
                            Next
                        </button>
                    </li>
                </ul>
                <div style={{ marginLeft: 'auto', marginBottom: '25px' }}>
                    <Button variant="info" type="submit" className="mt-3" onClick={handleBack}>
                        Back
                    </Button>
                </div>
            </div>
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