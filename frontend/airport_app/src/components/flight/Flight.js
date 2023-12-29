import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

const Flights = () => {

    const history = useHistory()
    const [isAdmin, setIsAdmin] = useState(false)

    const handleNewFlight = () => {
        history.push('/create-flight')
    }

    const handleShowFlights = () => {
        history.push('/all-flights')
    }

    const handleFindSingleFlight = () => {
        history.push('/find-flight')
    }

    useEffect(() => {
        const role = localStorage.getItem("role")
        setIsAdmin(!!role && role === "ADMIN")
    }, [])

    return (
        <div className='management' style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '500px' }}>
                <Form className="d-flex flex-column align-items-center">
                    <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '4px' }}>FLIGHT MANAGEMENT</h1>
                    {isAdmin && (
                        <Button variant="primary" type="submit" className="mt-3" onClick={handleNewFlight}>Add new flight</Button>
                    )}
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleShowFlights}>Show all flights</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleFindSingleFlight}>Find single flight</Button>
                </Form>
            </div>
        </div>
    )
}

export default Flights