import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
    const { loggedIn, setLoggedIn } = props
    const navigate = useNavigate()
    console.log(loggedIn)
    useEffect(() => {
        if(!loggedIn) navigate('login')
    }, [])

    const onButtonClick = () => {
    // You'll update this function later

    }

    return (
        <div className="mainContainer">
        <div className={'titleContainer'}>
            <div>Welcome!</div>
        </div>
        <div>This is the home page.</div>
        <div className={'buttonContainer'}>
            <input
            className={'inputButton'}
            type="button"
            onClick={onButtonClick}
            value={loggedIn ? 'Log out' : 'Log in'}
            />
        </div>
        </div>
    )
}