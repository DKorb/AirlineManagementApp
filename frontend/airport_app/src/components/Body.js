import { Button, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { FaSearch } from "react-icons/fa"

const Body = () => {
    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)', width: '700px' }}>
                <h1 style={{ color: 'white', fontSize: '30px', letterSpacing: '3px' }}>PŚK AIRLINES</h1>
                <Form className="d-flex flex-column align-items-center">
                    <InputGroup className="mb-3">
                    <FaSearch style={{ color: 'white', fontSize: '30px', marginRight: '10px', marginTop: '5px'}} />
                        <Form.Control
                            placeholder="Find your flight"
                            aria-label="Find your flight"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="primary" id="button-addon2">
                            Search
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
    );
}

export default Body;