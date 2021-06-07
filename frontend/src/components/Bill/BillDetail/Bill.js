import classes from "./Bill.module.css"
import { Link, useHistory } from "react-router-dom"
import BillBody from "./BillBody"
import Button from "../../UI/Button/Button"
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'
import useRequest from '../../../hooks/useRequest'
import { useContext, useState } from "react"
import authContext from '../../../store/AuthContext'
import { payBill, deleteBill } from '../../../helpers/graphQLBody'
import Modal from "../../UI/Modal/Modal"
import BillFormOveraly from "../../UI/BillForm/BillFormOverlay"
import Alert from "../../UI/Alert/Alert"
const Bill = (props) => {
    const { sendRequest, error, errorUpdater } = useRequest()
    const ctx = useContext(authContext)
    const [isDeleting, deletingStateUpdater] = useState(false);
    const [openForm, openFormStateUpdater] = useState(false);
    const [isPaying, payingStateUpdater] = useState(false);
    const [state, stateUpdater] = useState(props.bill.state.trim())
    const history = useHistory()
    const stateClass = classes.state + " " + classes[state]
    const deleteHandler = async () => {
        const id = props.bill._id;
        deletingStateUpdater(true);
        const requestBody = deleteBill(id)
        const config = { body: requestBody, headers: { 'Content-type': 'application/json', 'Authorization': `${ctx.token}` } }
        const response = await sendRequest(config)
        deletingStateUpdater(false)
        if (response)
            history.replace('/home')
    }

    const markAsPaid = async () => {
        const id = props.bill._id;
        payingStateUpdater(true);
        const requestBody = payBill(id)
        const config = { body: requestBody, headers: { 'Content-type': 'application/json', 'Authorization': `${ctx.token}` } }
        const response = await sendRequest(config)
        payingStateUpdater(false)
        if (response)
            stateUpdater("Paid")
    }
    const modalOnClose = () => {
        errorUpdater("")
    }
    return <>
        {error && <Modal onClose={modalOnClose}><Alert onClose={modalOnClose}>Something Went Wrong!<br />Please Try Again Later! </Alert></Modal>}
        {openForm && <Modal><BillFormOveraly bill={props.bill} onClose={() => openFormStateUpdater(false)} refresh={props.refresh} /></Modal>}
        <Link to="/home" className={classes['home-link']}> <span>&lt;</span>  Go back</Link>
        <header className={classes['invoice-header']}>
            <div className={classes.status}>
                <p>Status</p>
                <div className={stateClass}>
                    <p><span>•</span> {state}</p>
                </div>
            </div>
            <div className={classes['invoice-actions']}>
                <Button className={classes.edit} onClick={() => openFormStateUpdater(true)}>Edit </Button>
                <Button className={classes.delete} onClick={deleteHandler} disabled={isDeleting}>{isDeleting ? <LoadingSpinner className={classes["lds-ellipsis"]} /> : 'Delete'}</Button>
                {state === "Pending" && <Button className={classes.markAsPaid} onClick={markAsPaid} disabled={isPaying}>{isPaying ? <LoadingSpinner className={classes["lds-ellipsis"]} /> : 'Mark As Paid'}</Button>}
            </div>
        </header>
        <main className={classes.main}>
            <BillBody bill={props.bill} />
        </main>


    </>
}
export default Bill