import { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"
import { jwtDecode } from "jwt-decode"

const Login = () => {

    const history = useHistory()
    const location = useLocation()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')
    const message = location.state ? location.state.message : null

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:9090/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const responseData = await response.json()

                const accessToken = responseData.access_token
                const refreshToken = responseData.refresh_token

                const decoded = jwtDecode(accessToken)

                localStorage.setItem("access_token", accessToken)
                localStorage.setItem("refresh_token", refreshToken)
                localStorage.setItem("user_id", decoded.userId)
                localStorage.setItem("username", decoded.sub)
                localStorage.setItem("role", decoded.role)

                setSuccess('You are logged in')
                setTimeout(() => {
                    history.push('/')
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
                {message && <p style={{ color: 'red', marginTop: '5px', textAlign: 'center' }}>{message}</p>}
                <Form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
                    {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
                    {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
                    <h1 className="mb-4" style={{ color: 'white', fontSize: '50px', letterSpacing: '3px' }}>SIGN IN</h1>
                    <Form.Group className="mb-3" controlId="formGroupUsername">
                        <Form.Control required style={{ width: '450px' }} type="text" name="username" value={formData.username} placeholder="Enter username" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Control required style={{ width: '450px' }} type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">Login</Button>
                </Form>
            </div>
        </div>
    )
}

export default Login