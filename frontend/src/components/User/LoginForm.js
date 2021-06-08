
import emailVaildator from '../../helpers/emailValidator'
import classes from './LoginForm.module.css'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import { useReducer, useState } from 'react'
import { login, signUp } from '../../helpers/graphQLBody'
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner'
const defaultState = {
    username: {
        value: "",
        isValid: true
    },
    email: {
        value: "",
        isValid: true
    },
    password: {
        value: "",
        isValid: true
    },
}

const credentialsReducer = (state, action) => {

    const prevState = { ...state }
    const updateField = action.field
    if (action.type === "update" && defaultState[updateField]) {
        prevState[updateField].value = action.value
        prevState[updateField].isValid = updateField === "email" ? emailVaildator(action.value.trim()) : (action.value.trim().length > 0)
        return prevState
    }
    if (action.type === "validate" && defaultState[updateField]) {
        prevState[updateField].isValid = updateField === "email" ? emailVaildator(prevState[updateField].value.trim()) : (prevState[updateField].value.trim().length > 0)
        return prevState
    }
    return defaultState
}
const LoginForm = (props) => {
    const [credentialsState, credentialsDispatcher] = useReducer(credentialsReducer, { ...defaultState })
    const fieldChangeHandler = (event) => {
        credentialsDispatcher({ type: "update", value: event.target.value, field: event.target.name })
    }
    const [isSending, sendingStateUpdater] = useState(false)
    const formSubmitHandler = async (e) => {
        sendingStateUpdater(true)
        e.preventDefault()
        credentialsDispatcher({ type: "validate", field: "email" })
        credentialsDispatcher({ type: "validate", field: "password" })
        credentialsDispatcher({ type: "validate", field: "username" })
        let formValid = (credentialsState.password.value.trim().length > 0) & (credentialsState.email.value.trim().length > 0)
        if (props.signUp)
            formValid = formValid & (credentialsState.username.value.trim().length > 0)
        if (!formValid) {
            sendingStateUpdater(false)
            return
        }
        let requestBody;
        if (props.signUp)
            requestBody = signUp({ email: credentialsState.email.value, password: credentialsState.password.value, username: credentialsState.username.value })
        else
            requestBody = login({ email: credentialsState.email.value, password: credentialsState.password.value })
        const response = await props.requestHandler(requestBody)
        if (!response)
            sendingStateUpdater(false)
    }
    return (<form noValidate className={classes.form} onSubmit={formSubmitHandler}>
        {props.signUp && <div>
            <label htmlFor={`username`}>
                Username
            </label>
            <Input type="text" name="username" id={`username`} value={credentialsState.username.value} isValid={credentialsState.username.isValid} onChange={fieldChangeHandler} />
        </div>}
        <div>
            <label htmlFor={`email`}>
                Email
            </label>
            <Input type="email" id={`email`} name="email" value={credentialsState.email.value} isValid={credentialsState.email.isValid} onChange={fieldChangeHandler} />
        </div>
        <div>
            <label htmlFor={`password`}>
                Password
            </label>
            <Input type="password" id={`password`} name="password" value={credentialsState.password.value} isValid={credentialsState.password.isValid} onChange={fieldChangeHandler} />
        </div>
        <div>
            <Button className={classes.button} type="submit">{isSending ? <LoadingSpinner /> : (props.signUp ? 'Sign Up' : 'Login')}</Button>
        </div>
    </form>)
}
export default LoginForm