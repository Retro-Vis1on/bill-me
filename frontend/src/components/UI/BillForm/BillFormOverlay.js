import Modal from '../Modal/Modal'
import classes from './BillForm.module.css'
import Button from '../Button/Button'
import BillFormFields from './BillFormFields'
import emailCheck from '../../../helpers/emailValidator'
import keyGen from '../../../helpers/itemKeyGen'
import { createBill, updateBill } from '../../../helpers/graphQLBody'
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import AuthContext from '../../../store/AuthContext'
import useRequest from '../../../hooks/useRequest'
import EditFormHandler from './EditFormHandler'
import formVerify from './FormVerify'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import HashTag from '../HashTag/HashTag'
import Alert from '../Alert/Alert'
const initSenderState = {
    street: {
        isValid: true,
        value: ""
    },
    city: {
        isValid: true,
        value: ""
    },
    postCode: {
        isValid: true,
        value: ""
    },
    country: {
        isValid: true,
        value: ""
    }
}
const initRecieverState = {
    street: {
        isValid: true,
        value: ""
    },
    city: {
        isValid: true,
        value: ""
    },
    postCode: {
        isValid: true,
        value: ""
    },
    country: {
        isValid: true,
        value: ""
    },
    name: {
        isValid: true,
        value: "",
    },
    email:
    {
        isValid: true,
        value: ""
    }

}
const initProjectState = {
    date: {
        isValid: true,
        value: ""
    },
    desc: {
        isValid: true,
        value: ""
    },
    terms:
    {
        value: 7,
        isValid: true
    }
}
const checkString = s => s.length > 0
const senderReducer = (state, action) => {
    if (action.type === "update" && action.field && state[action.field]) {
        const prevState = { ...state };
        prevState[action.field].value = action.value;
        prevState[action.field].isValid = checkString(action.value)
        return prevState
    }
    if (action.type === "verify") {
        const prevState = { ...state }
        for (let field in prevState)
            prevState[field].isValid = checkString(prevState[field].value)
        return prevState
    }
    return initSenderState
}
const recieverReducer = (state, action) => {
    if (action.type === "update" && action.field && state[action.field]) {
        const prevState = { ...state };
        prevState[action.field].value = action.value;
        prevState[action.field].isValid = action.field !== "email" ? checkString(action.value) : emailCheck(action.value)
        return prevState
    }
    if (action.type === "verify") {
        const prevState = { ...state }
        for (let field in prevState)
            prevState[field].isValid = field !== "email" ? checkString(prevState[field].value) : emailCheck(prevState[field].value)
        return prevState
    }
    return initRecieverState
}
const projectReducer = (state, action) => {
    if (action.type === "update" && action.field && state[action.field]) {
        const prevState = { ...state };
        prevState[action.field].value = action.value;
        prevState[action.field].isValid = action.field !== "date" ? action.field !== "terms" ? checkString(action.value) : Number.isInteger(+action.value) : !isNaN((new Date(action.value)).getTime())
        return prevState
    }
    if (action.type === "verify") {
        const prevState = { ...state }
        for (let field in prevState)
            prevState[field].isValid = field !== "date" ? field !== "terms" ? checkString(prevState[field].value) : Number.isInteger(+prevState[field].value) : !isNaN((new Date(prevState[field].value)).getTime())
        return prevState
    }
    return initProjectState
}

const BillFormOveraly = (props) => {
    const [itemFields, itemFieldsUpdater] = useState([{ itemName: "", price: "", qty: "", total: "", isValid: { itemName: true, price: true, qty: true }, key: keyGen() }])
    const [isDraft, draftStateUpdater] = useState(false)
    const [isLoading, LoadingStateUpdater] = useState(false)
    const [senderState, senderDispatcher] = useReducer(senderReducer, { ...initSenderState })
    const [recieverState, recieverDispatcher] = useReducer(recieverReducer, { ...initRecieverState })
    const [projectState, projectDispatcher] = useReducer(projectReducer, { ...initProjectState })
    const [formClass, classUpdater] = useState(classes.formOverlay)
    const { sendRequest, error, errorUpdater } = useRequest()
    const ctx = useContext(AuthContext)
    const addFieldHandler = () => {
        const freshState = { itemName: "", price: "", qty: "", total: "", isValid: { itemName: true, price: true, qty: true }, key: keyGen() }
        itemFieldsUpdater(prevState => [...prevState, freshState])
    }
    const deleteFieldHandler = useCallback((indi) => {
        const list = [...itemFields];
        if (list.length === 1)
            return
        list.splice(indi, 1);
        itemFieldsUpdater(list);
    }, [itemFields])
    useEffect(() => {
        recieverDispatcher({ type: "reset" })
        senderDispatcher({ type: "reset" })
        projectDispatcher({ type: "reset" })
        if (props.bill)
            EditFormHandler(props.bill, senderDispatcher, recieverDispatcher, projectDispatcher, itemFieldsUpdater)
    }, [props.bill])
    const senderInputHandler = (event) => {
        senderDispatcher({ type: "update", field: `${event.target.name}`, value: event.target.value })
    }
    const recieverInputHandler = (event) => {
        recieverDispatcher({ type: "update", field: `${event.target.name}`, value: event.target.value })
    }
    const projectInputHandler = (event) => {
        projectDispatcher({ type: "update", field: `${event.target.name}`, value: event.target.value })
    }
    const formCloseHandler = () => {
        classUpdater(`${classes.formOverlay} ${classes.closeForm}`)
        setTimeout(() => props.onClose(), 170)
    }
    const itemsFieldsChangeHandler = (e, index) => {
        const { name, value } = e.target;
        const list = [...itemFields];
        list[index][name] = value;
        if (!value.trim().length)
            list[index].isValid[name] = false;
        else
            list[index].isValid[name] = true;
        if (name === "price" || name === "qty") {
            if (!Number.isFinite(+value) || value <= 0) {
                list[index][name] = "";
                list[index].isValid[name] = false;
            }
            else
                list[index].isValid[name] = true;
        }
        if (list[index]["qty"] && list[index]["price"])
            list[index]["total"] = `$${list[index]["qty"] * list[index]["price"]}`
        else
            list[index]["total"] = ""
        itemFieldsUpdater(list);
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        LoadingStateUpdater(true)
        if (!formVerify(senderDispatcher, recieverDispatcher, projectDispatcher, itemFields, itemFieldsUpdater, senderState, recieverState, projectState)) {
            LoadingStateUpdater(false)
            return
        }
        let body;
        if (props.bill)
            body = updateBill(senderState, recieverState, projectState, itemFields, props.bill._id)
        else
            body = createBill(senderState, recieverState, projectState, itemFields, isDraft)

        const config = { body, headers: { 'Content-Type': 'application/json', "Authorization": `${ctx.token}` } }
        const response = await sendRequest(config)
        LoadingStateUpdater(false)
        if (response) {
            formCloseHandler()
            setTimeout(() => props.refresh(), 200)

        }
    }
    const closeAlertHandler = () => {
        errorUpdater("")
    }
    let title = <h1>New Invoice</h1>
    if (props.bill)
        title = <h1>Edit <HashTag />{(props.bill._id).substring(props.bill._id.length - 6, props.bill._id.length)}</h1>

    return <Modal onClose={formCloseHandler}>
        {error &&
            <Modal onClose={closeAlertHandler} style={{ zIndex: "500" }}>
                <Alert onClose={closeAlertHandler}>Woops! Something went wrong!</Alert>
            </Modal>
        }
        <div className={formClass}>
            {title}
            <form onSubmit={formSubmitHandler} className={classes.form}>
                <BillFormFields addFieldHandler={addFieldHandler}
                    deleteFieldHandler={deleteFieldHandler}
                    itemsFieldsChangeHandler={itemsFieldsChangeHandler}
                    itemFields={itemFields}
                    senderState={senderState}
                    recieverState={recieverState}
                    projectState={projectState}
                    projectInputHandler={projectInputHandler}
                    senderInputHandler={senderInputHandler}
                    recieverInputHandler={recieverInputHandler}
                    isDisabled={props.bill ? true : false}
                />


                <div className={classes['form-actions']}>
                    {isLoading ? <LoadingSpinner /> : <>
                        <Button onClick={formCloseHandler} className={classes.discard}>{props.bill ? "Cancel" : "Discard"}</Button>
                        <div className={classes['form-submit-btn']}>
                            {!props.bill && <Button onClick={() => draftStateUpdater(true)} type="submit">Save as Draft</Button>}
                            <Button className={classes.save} onClick={() => draftStateUpdater(false)} type="submit">{props.bill ? "Save Changes" : "Save & Send"}</Button>
                        </div>
                    </>}
                </div>
            </form>
        </div>
    </Modal >
}
export default BillFormOveraly