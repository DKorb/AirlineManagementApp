import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const RegisterForm = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:9090/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSuccess('You created account successfully!')
                setTimeout(() => {
                    history.push('/login')
                    window.location.reload(true)
                }, 1500)
            } else {
                setErrors('Something went wrong!')
            }
        } catch (error) {
            console.error('Error occurs:', error)
        }
    }

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '500px' }}>
                <Form onSubmit={handleRegister} className="d-flex flex-column align-items-center">
                    {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
                    {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>SIGN UP</h1>
                    <Form.Group className="mb-3" controlId="formGroupFirstName">
                        <Form.Control required style={{ width: '450px' }} type="text" name="firstName" value={formData.firstName} placeholder="Enter first name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupLastName">
                        <Form.Control required style={{ width: '450px' }} type="text" name="lastName" value={formData.lastName} placeholder="Enter last name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupUsername">
                        <Form.Control required style={{ width: '450px' }} type="text" name="username" value={formData.username} placeholder="Enter username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control required style={{ width: '450px' }} type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control required style={{ width: '450px' }} type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">Sign up</Button>
                </Form>
            </div>
        </div>
    )
}

export default RegisterForm
