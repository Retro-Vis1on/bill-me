import Input from "../Input/Input"
import classes from './BillFormFields.module.css'
const ItemField = (props) => {
    return <>
        <Input type="text" value={props.itemName} name="itemName" onChange={(e) => props.itemsFieldsChangeHandler(e, props.index)} isValid={props.isValid.itemName} />
        <Input type="number" value={props.price} name="price" onChange={(e) => props.itemsFieldsChangeHandler(e, props.index)} isValid={props.isValid.price} />
        <Input type="number" value={props.qty} name="qty" onChange={(e) => props.itemsFieldsChangeHandler(e, props.index)} isValid={props.isValid.qty} />
        <p style={{ margin: "0", width: "100%" }}>{props.total}</p>
        <button className={classes.trash} type="button" onClick={props.deleteFieldHandler.bind(this, props.index)}><img src="/icons/iconmonstr-trash-can-15.svg" alt="trash icon" /></button>
    </>
}
export default ItemField