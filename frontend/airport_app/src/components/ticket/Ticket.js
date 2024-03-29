import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { Modal, Alert } from 'react-bootstrap'

const Ticket = () => {

    const history = useHistory()
    const [tickets, setTickets] = useState([])
    const [selectedTicketId, setSelectedTicketId] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const userId = localStorage.getItem("user_id")
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')
    const [searchUsername, setSearchUsername] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const username = localStorage.getItem("username")
        const accessToken = localStorage.getItem("access_token")

        fetch(`http://localhost:9090/api/v1/users/${username}/tickets`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then(data => {
                setTickets(data)
            })
            .catch(error => console.error('Error fetching tickets:', error))
    }, [])

    const handleDeleteClick = (id) => {
        setSelectedTicketId(id)
        setShowDeleteModal(true)
    }

    const handleDeleteConfirm = async () => {
        const username = localStorage.getItem("username")
        const accessToken = localStorage.getItem("access_token")

        await fetch(`http://localhost:9090/api/v1/users/${userId}/tickets/${selectedTicketId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(() => {
                fetch(`http://localhost:9090/api/v1/users/${username}/tickets`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok')
                        }
                        return response.json()
                    })
                    .then(data => setTickets(data))
                    .catch(error => console.error('Error fetching tickets:', error));
            })
            .catch(error => console.error('Error deleting ticket:', error))
            .finally(() => {
                setShowDeleteModal(false)
                setSelectedTicketId(null)
            })
    }

    const handleGenerateTicket = async (ticketId) => {
        const accessToken = localStorage.getItem("access_token")

        try {
            const response = await fetch(`http://localhost:9090/api/v1/users/${userId}/tickets/${ticketId}/pdf`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            if (response.ok) {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `ticket-${ticketId}.pdf`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                window.URL.revokeObjectURL(url)

                setSuccess('You generated ticket successfully!')
                setTimeout(() => {
                    history.push('/ticket')
                    window.location.reload(true)
                }, 2500)
            } else {
                setErrors('Something went wrong!')
            }
        } catch (error) {
            console.error('Error occurs:', error)
        }
    }

    const handleDeleteCancel = () => {
        setShowDeleteModal(false)
        setSelectedTicketId(null)
    }

    const handleBack = () => {
        history.push('/')
        window.location.reload(true)
    }

    useEffect(() => {
        const role = localStorage.getItem("role")
        setIsAdmin(!!role && role === "ADMIN")
    }, [])

    return (
        <div style={{ maxWidth: '1000px', margin: '50px auto' }}>
            <h1 style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ALL TICKETS</h1>
            {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
            {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
            {isAdmin && (
                <input
                    type="search"
                    className='form-control rounded'
                    placeholder="🔍 Search by username"
                    value={searchUsername}
                    onChange={(e) => setSearchUsername(e.target.value)}
                />
            )}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Flight number</th>
                        <th>Airline name</th>
                        <th>Departure airport name (code)</th>
                        <th>Arrival airport name (code)</th>
                        {isAdmin ? (
                            <th style={{ width: '190px' }}>Actions</th>
                        ) : (
                            <th style={{ width: '90px' }}>Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.user.username}</td>
                            <td>{ticket.flight.flightNumber}</td>
                            <td>{ticket.flight.airlineName}</td>
                            <td>{ticket.flight.departureAirport.name} ({ticket.flight.departureAirport.code})</td>
                            <td>{ticket.flight.arrivalAirport.name} ({ticket.flight.arrivalAirport.code})</td>
                            <td>
                                <Button style={{ marginRight: '10px' }} variant="info" onClick={() => handleGenerateTicket(ticket.ticketId)}>
                                    Generate
                                </Button>
                                {isAdmin && (
                                    <Button variant="danger" onClick={() => handleDeleteClick(ticket.ticketId)}>
                                        Delete
                                    </Button>
                                )}
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

export default Ticket