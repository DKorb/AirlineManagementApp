import { useState } from "react"
import { useHistory } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Alert } from "react-bootstrap"

const Login = () => {

    const history = useHistory()
    const [success, setSuccess] = useState('')
    const [errors, setErrors] = useState('')

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
            const response = fetch('http://localhost:9090/api/v1/auth/authenticate', {
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

                localStorage.setItem("access_token", accessToken)
                localStorage.setItem("refresh_token", refreshToken)

                setSuccess('You are logged in')
            } else {
                setErrors('Something went wrong!')
            }
        } catch (error) {
            console.error('Error occurs:', error)
        }
    }

    const handleHomeRedirect = () => {
        setTimeout(() => {
            history.push('/')
            window.location.reload(true)
        }, 1500)
    }

    return (
        <Form onSubmit={handleLogin} className="d-flex flex-column align-items-center">
            {errors && <Alert style={{ width: '100%', textAlign: 'center' }} variant='danger'>{errors}</Alert>}
            {success && <Alert style={{ width: '100%', textAlign: 'center' }} variant='success'>{success}</Alert>}
            <h1 className="mb-4" style={{ marginTop: '200px', color: 'white', fontSize: '50px', letterSpacing: '3px' }}>SIGN IN</h1>
            <Form.Group className="mb-3" controlId="formGroupUsername">
                <Form.Control required style={{ width: '500px' }} type="text" name="username" value={formData.username} placeholder="Enter username" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Control required style={{ width: '500px' }} type="password" name="password" value={formData.password} placeholder="Enter password" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3" >Login</Button>
        </Form>
    )
}

export default Login