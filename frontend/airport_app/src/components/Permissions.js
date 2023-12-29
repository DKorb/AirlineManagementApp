import { useHistory } from "react-router-dom"
import './NotFound.css'

const Permissions = () => {

    const history = useHistory()

    const handleClick = () => {
        history.push("/")
        window.location.reload(true)
    }

    return (
        <div className="not-found">
            <h2>Sorry</h2>
            <p>You have no permission to enter this page, please log in as an administrator</p>
            <div className="center-button">
                <button onClick={handleClick} to="/">Go Back</button>
            </div>
        </div>
    )
}

export default Permissions