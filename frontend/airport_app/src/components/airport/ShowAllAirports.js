import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'

const ShowAllAirports = () => {

    const history = useHistory()
    const [airports, setAirports] = useState([])
    const [selectedAirportId, setSelectedAirportId] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    useEffect(() => {
        fetch('http://localhost:9090/api/v1/airports')
            .then(response => response.json())
            .then(data => setAirports(data))
            .catch(error => console.error('Error fetching airports:', error))
    }, [])

    const handleEditAirport = (id) => {
        history.push(`/edit-airport/${id}`)
        window.location.reload(true)
    }

    const handleDeleteClick = (id) => {
        setSelectedAirportId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        await fetch(`http://localhost:9090/api/v1/airports/${selectedAirportId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetch('http://localhost:9090/api/v1/airports')
                    .then(response => response.json())
                    .then(data => setAirports(data))
                    .catch(error => console.error('Error fetching airports:', error));
            })
            .catch(error => console.error('Error deleting airport:', error))
            .finally(() => {
                setShowDeleteModal(false)
                setSelectedAirportId(null)
            })
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
        setSelectedAirportId(null)
    }

    const handleBack = () => {
        history.push('/airport')
        window.location.reload(true)
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '150px auto' }}>
            <h1 style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ALL AIRPORTS</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th style={{ width: '155px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {airports.map(airport => (
                        <tr key={airport.id}>
                            <td>{airport.code}</td>
                            <td>{airport.name}</td>
                            <td>{airport.city}</td>
                            <td>{airport.country}</td>
                            <td>
                                <Button style={{ marginRight: '10px' }} variant="info" onClick={() => handleEditAirport(airport.id)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(airport.id)}>
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
                    Are you sure you want to delete this airport?
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

export default ShowAllAirports