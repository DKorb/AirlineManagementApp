import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const UpdateFlightStatus = () => {

    const history = useHistory()
    const { id } = useParams()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')


    const [formData, setFormData] = useState({
        flightStatus: ''
    })

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token")

        if (id) {
            fetch(`http://localhost:9090/api/v1/flights/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setFormData({
                        flightStatus: data.flightStatus
                    })
                })
                .catch(error => console.error('Error fetching flights:', error))
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleEditFlightStatus = async (e) => {
        e.preventDefault()
        const accessToken = localStorage.getItem("access_token")

        try {
            const response = await fetch(`http://localhost:9090/api/v1/flights/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSuccess('Flight updated successfully!')
                setTimeout(() => {
                    history.push('/all-flights')
                    window.location.reload(true)
                }, 1500)
            } else {
                console.error('Error updating flight:', response.statusText)
            }
        } catch (error) {
            setErrors('Something went wrong!')
        }
    }

    const handleBack = () => {
        history.push('/all-flights')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '600px' }}>
                <Form className="d-flex flex-column align-items-center" onSubmit={handleEditFlightStatus}>
                    {errors && <Alert color='danger' style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>{errors}</Alert>}
                    {success && <Alert variant='success' style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>EDIT FLIGHT STATUS</h1>
                    <Form.Group className="mb-3" controlId="formGroupFlightStatus">
                        <Form.Control as="select" style={{ width: '450px' }} name="flightStatus" value={formData.flightStatus} onChange={handleChange}>
                            <option value="DELAYED">Delayed</option>
                            <option value="IN_AIR">In Air</option>
                            <option value="ARRIVED">Arrived</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="SCHEDULED">Scheduled</option>
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button style={{ marginRight: '10px' }} variant="primary" type="submit" className="mt-3">
                            Edit
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

export default UpdateFlightStatus