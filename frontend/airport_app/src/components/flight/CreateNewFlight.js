import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert, Row, Col } from "react-bootstrap"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateNewFlight = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        flightNumber: '',
        airlineName: '',
        departureAirportId: null,
        arrivalAirportId: null,
        departureTime: null,
        arrivalTime: null,
        flightStatus: 'SCHEDULED',
        flightDuration: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleDateChange = (date, name) => {
        setFormData({ ...formData, [name]: date })
    }

    const handleAddNewFlight = async (e) => {
        e.preventDefault()

        const accessToken = localStorage.getItem("access_token")

        try {
            const response = await fetch('http://localhost:9090/api/v1/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSuccess('You created new flight successfully!')
                setTimeout(() => {
                    history.push('/flight')
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
        history.push('/flight')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '600px' }}>
                <Form onSubmit={handleAddNewFlight} className="d-flex flex-column align-items-center">
                    {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
                    {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ADD NEW FLIGHT</h1>
                    <Form.Group className="mb-3" controlId="formGroupFlightNumber">
                        <Form.Control required style={{ width: '450px' }} type="text" name="flightNumber" value={formData.flightNumber} placeholder="Enter flight number" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupAirlineName">
                        <Form.Control required style={{ width: '450px' }} type="text" name="airlineName" value={formData.airlineName} placeholder="Enter airline name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupDepartureAirportId">
                        <Form.Control required min={1} style={{ width: '450px' }} type="number" name="departureAirportId" value={formData.departureAirportId} placeholder="Enter departure airport" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupArrivalAirportId">
                        <Form.Control required min={1} style={{ width: '450px' }} type="number" name="arrivalAirportId" value={formData.arrivalAirportId} placeholder="Enter arrival airport" onChange={handleChange} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGroupDepartureTime">
                                <DatePicker
                                    selected={formData.departureTime}
                                    onChange={(date) => handleDateChange(date, 'departureTime')}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    placeholderText="Select departure time"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formGroupArrivalTime">
                                <DatePicker
                                    selected={formData.arrivalTime}
                                    onChange={(date) => handleDateChange(date, 'arrivalTime')}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    placeholderText="Select arrival time"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
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
                            Create
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

export default CreateNewFlight