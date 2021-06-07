import LoginForm from "./LoginForm"
import useRequest from '../../hooks/useRequest'
import { useContext, useEffect, useState } from "react"
import AuthContext from "../../store/AuthContext"
import classes from './Login.module.css'
import Card from "../UI/Card/Card"
import Alert from "../UI/Alert/Alert"
import Modal from '../UI/Modal/Modal'
import ErrorCodeHandler from "./ErrorCodeHandler"
const Login = () => {
    const ctx = useContext(AuthContext)
    const { sendRequest, error, errorUpdater } = useRequest()
    const [isSignup, signupStateUpdater] = useState(false);
    const [activeAlertMessage, alertMessageUpdater] = useState("")
    useEffect(() => {
        if (error)
            alertMessageUpdater(ErrorCodeHandler(error.statusCode))
    }, [error])
    const requestHandler = async (data) => {
        const response = await sendRequest({ body: data, headers: { "Content-Type": "application/json" } })
        if (response) {
            if (isSignup)
                ctx.login(response.createUser)
            else
                ctx.login(response.login)
        }
        return response

    }
    const setSignUp = () => {
        signupStateUpdater(true)
    }
    const setSignIn = () => {
        signupStateUpdater(false)
    }
    const modalClose = () => {
        errorUpdater("");
        alertMessageUpdater("")
    }
    return (<div>
        <div className={classes.formAndBanner}>
            <div className={classes.banner}>
                <h3 style={{ fontSize: "60px" }}>Invoice management</h3>
                <div><h2 style={{ fontSize: "100px" }}>EASIER </h2><h3>than</h3></div>
                <h4 style={{ fontSize: "80px" }}>EVER BEFORE.</h4>
            </div>

            <div className={classes.form}>
                <div className={classes.formControl}>
                    <button onClick={setSignIn} type="button" className={`${classes.button} ${!isSignup ? classes.active : ''}`}>Sign In</button><button onClick={setSignUp} type="button" className={`${classes.button} ${isSignup ? classes.active : ''}`}>Sign Up</button>
                </div>
                <h2>{isSignup ? "New Here? Sign up in 3 easy steps!" : "Already a member?"}</h2>
                <LoginForm requestHandler={requestHandler} error={error} signUp={isSignup} />
                {activeAlertMessage && <Modal onClose={modalClose}> <Alert onClose={modalClose}>{activeAlertMessage}</Alert></Modal>}
            </div>
        </div>
        <div className={classes.cards}>
            <Card iconClass="fas fa-tachometer-alt">
                <h4>I am Speed!</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque rerum quis laboriosam officia velit! Iusto nobis id voluptatem eum nam!</p>
            </Card>
            <Card iconClass="fas fa-lock">
                <h4>Lock it and Forget It</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque rerum quis laboriosam officia velit! Iusto nobis id voluptatem eum nam!</p>
            </Card>
            <Card iconClass="fas fa-receipt">
                <h4>Some heading I dunno</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque rerum quis laboriosam officia velit! Iusto nobis id voluptatem eum nam!</p>
            </Card>
        </div>
    </div >
    )
}
export default Login