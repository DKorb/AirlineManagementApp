import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const CreateNewAirport = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')
    const accessToken = localStorage.getItem("access_token")

    const [formData, setFormData] = useState({
        code: '',
        name: '',
        city: '',
        country: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleAddNewAirport = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:9090/api/v1/airports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSuccess('You created new airport successfully!')
                setTimeout(() => {
                    history.push('/airport')
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
        history.push('/airport')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '600px' }}>
                <Form onSubmit={handleAddNewAirport} className="d-flex flex-column align-items-center">
                    {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
                    {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>ADD NEW AIRPORT</h1>
                    <Form.Group className="mb-3" controlId="formGroupCode">
                        <Form.Control maxLength={3} required style={{ width: '450px' }} type="text" name="code" value={formData.code} placeholder="Enter code (three characters long)" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Control required style={{ width: '450px' }} type="text" name="name" value={formData.name} placeholder="Enter airport name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCity">
                        <Form.Control required style={{ width: '450px' }} type="text" name="city" value={formData.city} placeholder="Enter city" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCountry">
                        <Form.Control required style={{ width: '450px' }} type="text" name="country" value={formData.country} placeholder="Enter country" onChange={handleChange} />
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

export default CreateNewAirport