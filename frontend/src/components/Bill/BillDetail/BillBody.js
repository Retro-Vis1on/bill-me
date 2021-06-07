import classes from "./BillBody.module.css"
import Address from "./Address"
import Item from './Item'
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import HashTag from "../../UI/HashTag/HashTag"
const BillBody = (props) => {
    const items = props.bill.items.map(item => {
        return <Item {...item} id={item._id} key={item._id} />
    })
    const dimension = useWindowDimensions()
    const isMobile = dimension.width <= 700
    return <>
        <div className={classes['heading']}>
            <div className={classes['billFor']}>
                <h2><HashTag />{(props.bill._id).substring(props.bill._id.length - 6, props.bill._id.length)}</h2>
                <p>{props.bill.billFor}</p>
            </div>
            <div className={classes['sender-address']}>
                <Address {...(props.bill.senderAddress)} />
            </div>
        </div>
        <div className={classes['reciever-details']}>
            <div>
                <div className={classes.dates}>
                    <div>
                        <p>Invoice Date</p>
                        <h2>{props.bill.invoiceDate}</h2>
                    </div>
                    <div>
                        <p>Due Date</p>
                        <h2>{props.bill.dueDate}</h2>
                    </div>
                </div>
                <div className={classes.billFor}>
                    <p>Bill To</p>
                    <h2>{props.bill.recieverName}</h2>
                    <Address {...(props.bill.recieverAddress)} />
                </div>
            </div>
            <div className={classes.email}>
                <p>Sent to</p>
                <h2>{props.bill.email}</h2>
            </div>
        </div>
        <div className={classes.items}>
            {!isMobile ? <>
                <p style={{ textAlign: 'start' }}>Item Name</p>
                <p>QTY.</p>
                <p>Price</p>
                <p>Total</p>
            </> : ''}
            {items}
        </div>
        <div className={classes.total}>
            <p>Amount Due</p>
            <h1>${props.bill.total}</h1>
        </div>
    </>
}
export default BillBody