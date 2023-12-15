import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

const Airport = () => {

    const history = useHistory()

    const handleNewAirport = () => {
        history.push('/create-airport')
    }

    const handleShowAirports = () => {
        history.push('/all-airports')
    }

    const handleFindSingleAirport = () => {
        history.push('/find-airport')
    }

    return (
        <div className='airport' style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '500px' }}>
                <Form className="d-flex flex-column align-items-center">
                    <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '4px' }}>AIRPORT MANAGEMENT</h1>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleNewAirport}>Add new airport</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleShowAirports}>Show all airports</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleFindSingleAirport}>Find single airport</Button>
                </Form>
            </div>
        </div>
    )
}

export default Airport