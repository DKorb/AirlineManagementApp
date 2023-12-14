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
        username: '',
        email: '',
        password: '',
        token: ''
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
            } else {
                setErrors('Something went wrong!')
            }
        } catch (error) {
            console.error('Error occurs:', error)
        }
    }

    const handleLoginRedirect = () => {
        setTimeout(() => {
            history.push('/login')
            window.location.reload(true)
        }, 1500)
    }

    return (
        <Form onSubmit={handleRegister} className="d-flex flex-column align-items-center">
            {errors && <Alert style={{ width: '100%', textAlign: 'center' }} color='danger'>{errors}</Alert>}
            {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
            <h1 className="mb-4" style={{ marginTop: '200px', color: 'white', fontSize: '50px', letterSpacing: '3px' }}>SIGN UP</h1>
            <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Control required style={{ width: '450px' }} type="text" name="username" value={formData.username} placeholder="Enter username" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control required style={{ width: '450px' }} type="email" name="email" value={formData.email} placeholder="Enter email" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control required style={{ width: '450px' }} type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" onClick={handleLoginRedirect}>Sign up</Button>
        </Form>
    )
}

export default RegisterForm