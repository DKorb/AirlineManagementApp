import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const RegisterForm = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')
    const [passwordRequirements, setPasswordRequirements] = useState('')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === 'firstName' && value !== '' && !/^[a-zA-Z]+$/.test(value)) {
            return
        }

        if (name === 'lastName' && value !== '' && !/^[a-zA-Z]+$/.test(value)) {
            return
        }

        if (name === 'password') {
            handlePasswordChange(value)
        }

        setFormData({ ...formData, [name]: value })
    }

    const handlePasswordChange = (inputValue) => {
        const hasUppercase = /[A-Z]/.test(inputValue)
        const hasNumber = /\d/.test(inputValue)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(inputValue)
        const hasAtLeast6Characters = inputValue.length >= 6

        const requirements = (
            (!hasUppercase ? 'One uppercase letter, ' : '') +
            (!hasNumber ? 'One digit, ' : '') +
            (!hasSpecialChar ? 'One special character, ' : '') +
            (!hasAtLeast6Characters ? 'At least 6 characters' : '')
        ).trim()

        setPasswordRequirements(requirements)
    }

    const isPasswordValid = () => {
        const { password } = formData
        const hasUppercase = /[A-Z]/.test(password)
        const hasNumber = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        const hasAtLeast6Characters = password.length >= 6

        return hasUppercase && hasNumber && hasSpecialChar && hasAtLeast6Characters
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        if (!isPasswordValid()) {
            setErrors('Password does not meet the requirements.')
            return;
        }

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
                    {passwordRequirements && (
                        <p style={{ color: 'rgb(255, 255, 255)', fontSize: '12px' }}>
                            {passwordRequirements}
                        </p>
                    )}
                    <Button variant="primary" type="submit" className="mt-3" disabled={!isPasswordValid}>Sign up</Button>
                </Form>
            </div>
        </div>
    )
}

export default RegisterForm
