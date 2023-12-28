import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'

const ShowAllAirports = () => {

    const history = useHistory()
    const [airports, setAirports] = useState([])
    const [selectedAirportCode, setSelectedAirportCode] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [searchCode, setSearchCode] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const recordPerPage = 10

    useEffect(() => {
        fetch(`http://localhost:9090/api/v1/airports?page=${currentPage - 1}&size=${recordPerPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setAirports(data.content)
                setTotalPages(data.totalPages)
            })
            .catch(error => console.error('Error fetching flights:', error))
    }, [currentPage])

    const handleEditAirport = (id) => {
        history.push(`/edit-airport/${id}`)
        window.location.reload(true)
    }

    const handleDeleteClick = (code) => {
        setSelectedAirportCode(code)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        await fetch(`http://localhost:9090/api/v1/airports/${selectedAirportCode}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetch('http://localhost:9090/api/v1/airports')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then(data => setAirports(data.content))
            })
            .catch(error => console.error('Error deleting airport:', error))
            .finally(() => {
                setShowDeleteModal(false)
            })
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
    }

    const handleBack = () => {
        history.push('/airport')
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

    const filteredAirports = airports.filter(airport => airport.code.toLowerCase().includes(searchCode.toLowerCase()))

    return (
        <div style={{ maxWidth: '1000px', margin: '50px auto' }}>
            <h1 style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ALL AIRPORTS</h1>
            <input
                type="search"
                className='form-control rounded'
                placeholder="🔍 Search by code"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
            />
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
                    {filteredAirports.map(airport => (
                        <tr key={airport.code}>
                            <td>{airport.code}</td>
                            <td>{airport.name}</td>
                            <td>{airport.city}</td>
                            <td>{airport.country}</td>
                            <td>
                                <Button style={{ marginRight: '10px' }} variant="info" onClick={() => handleEditAirport(airport.id)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(airport.code)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={{ display: 'flex', alignItems: 'center'}}>
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