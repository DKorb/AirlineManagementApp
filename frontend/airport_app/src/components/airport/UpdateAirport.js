import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const UpdateAirport = () => {

    const history = useHistory()
    const { id } = useParams()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        city: '',
        country: '',
    })

    useEffect(() => {
        if (id) {
          fetch(`http://localhost:9090/api/v1/airports/${id}`)
            .then(response => response.json())
            .then(data => {
              setFormData({
                name: data.name,
                city: data.city,
                country: data.country,
              })
            })
            .catch(error => console.error('Error fetching airport:', error))
        }
      }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleEditAirport = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:9090/api/v1/airports/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setSuccess('Airline updated successfully!')
                setTimeout(() => {
                    history.push('/all-airports')
                    window.location.reload(true)
                }, 1500)
            } else {
                console.error('Error updating airport:', response.statusText)
            }
        } catch (error) {
            setErrors('Something went wrong!')
        }
    }

    const handleBack = () => {
        history.push('/all-airports')
        window.location.reload(true)
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '600px' }}>
                <Form className="d-flex flex-column align-items-center" onSubmit={handleEditAirport}>
                    {errors && <Alert color='danger' style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>{errors}</Alert>}
                    {success && <Alert variant='success' style={{ width: '100%', marginTop: '10px', textAlign: 'center' }}>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>EDIT AIRPORT</h1>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Control required style={{ width: '450px' }} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCity">
                        <Form.Control required style={{ width: '450px' }} type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCountry">
                        <Form.Control required style={{ width: '450px' }} type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
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

export default UpdateAirport