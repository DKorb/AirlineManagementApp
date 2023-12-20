import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const DeleteTicket = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        userId: null,
        ticketId: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleDeleteTicket = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:9090/api/v1/users/${formData.userId}/tickets/${formData.ticketId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                setSuccess('You deleted ticket successfully!')
                setTimeout(() => {
                    history.push('/ticket')
                    window.location.reload(true)
                }, 1500)
            } else {
                setErrors('Something went wrong!')
            }
        } catch (error) {
            console.error('Error occurs:', error)
        }
    }

    const handleBack = () => {
        history.push('/ticket')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '600px' }}>
                <Form onSubmit={handleDeleteTicket} className="d-flex flex-column align-items-center">
                    {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
                    {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>DELETE TICKET</h1>
                    <Form.Group className="mb-3" controlId="formGroupUserId">
                        <Form.Control required style={{ width: '450px' }} type="text" name="userId" value={formData.userId} placeholder="Enter user ID" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupTicketId">
                        <Form.Control required style={{ width: '450px' }} type="text" name="ticketId" value={formData.ticketId} placeholder="Enter ticket ID" onChange={handleChange} />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button style={{ marginRight: '10px' }} variant="danger" type="submit" className="mt-3">
                            Delete
                        </Button>
                        <Button variant="secondary" type="submit" className="mt-3" onClick={handleBack}>
                            Back
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default DeleteTicket