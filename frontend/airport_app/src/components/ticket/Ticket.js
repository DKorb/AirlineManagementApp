import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

const Ticket = () => {

    const history = useHistory()

    const handleNewTicket = () => {
        history.push(`/create-ticket`)
    }

    const handleGetSingleTicket = () => {
        history.push('/find-ticket')
    }

    const handleRemoveTicket = () => {
        history.push('/remove-ticket')
    }

    const handleGenerateTicket = () => {
        history.push('/generate-ticket')
    }


    return (
        <div className='management' style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '500px' }}>
                <Form className="d-flex flex-column align-items-center">
                    <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '4px' }}>TICKET MANAGEMENT</h1>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleNewTicket}>Add new ticket</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleGetSingleTicket}>Find single ticket</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleGenerateTicket}>Generate ticket</Button>
                    <Button variant="primary" type="submit" className="mt-3" onClick={handleRemoveTicket}>Delete ticket</Button>
                </Form>
            </div>
        </div>
    )
}

export default Ticket