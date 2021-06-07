import classes from './BillFormFields.module.css'
import Input from '../Input/Input'
import Button from '../Button/Button'
import ItemField from './ItemField'

const BillFormFields = (props) => {
    return (<div className={classes.formFields}>
        <div>
            <p className={classes.headings}>Bill From</p>
            <label htmlFor="senderStreet">Street Address</label>
            <Input type="text" id="senderStreet" name="street" value={props.senderState.street.value} isValid={props.senderState.street.isValid} onChange={props.senderInputHandler} />
            <div className={classes['address-country']} >
                <div>
                    <label htmlFor="senderCity" >City</label>
                    <label htmlFor="senderPost" >Post Code</label>
                    <Input type="text" id="senderCity" name="city" value={props.senderState.city.value} isValid={props.senderState.city.isValid} onChange={props.senderInputHandler} />
                    <Input type="text" id="senderPost" name="postCode" value={props.senderState.postCode.value} isValid={props.senderState.postCode.isValid} onChange={props.senderInputHandler} />
                </div>
                <div>
                    <label htmlFor="senderCountry" >Country</label>
                    <Input type="text" id="senderCountry" name="country" value={props.senderState.country.value} isValid={props.senderState.country.isValid} onChange={props.senderInputHandler} />
                </div>
            </div>
        </div>
        <div>
            <p className={classes.headings}>Bill To</p>
            <label htmlFor="recieverName">Client's Name</label>
            <Input type="text" name="name" id="recieverName" value={props.recieverState.name.value} isValid={props.recieverState.name.isValid} onChange={props.recieverInputHandler} />
            <label htmlFor="recieverEmail">Client's Email</label>
            <Input type="text" id="recieverEmail" name="email" value={props.recieverState.email.value} isValid={props.recieverState.email.isValid} onChange={props.recieverInputHandler} />
            <label htmlFor="recieverStreet">Street Address</label>
            <Input type="text" name="street" value={props.recieverState.street.value} isValid={props.recieverState.street.isValid} onChange={props.recieverInputHandler} />
            <div className={classes['address-country']}>
                <div>
                    <label htmlFor="recieverCity">City</label>
                    <label htmlFor="recieverPost">Post Code</label>
                    <Input type="text" name={"city"} id="recieverCity" value={props.recieverState.city.value} isValid={props.recieverState.city.isValid} onChange={props.recieverInputHandler} />
                    <Input type="text" name={"postCode"} id="recieverPost" value={props.recieverState.postCode.value} isValid={props.recieverState.postCode.isValid} onChange={props.recieverInputHandler} />
                </div>
                <div>
                    <label htmlFor="recieverCountry">Country</label>
                    <Input type="text" name={"country"} id="recieverCountry" value={props.recieverState.country.value} isValid={props.recieverState.country.isValid} onChange={props.recieverInputHandler} />
                </div>
            </div>

        </div>
        <div className={classes.projectDetails}>
            <div className={classes.dateAndTerms}>
                <div>
                    <label htmlFor="invoiceDate">Invoice Date</label>
                    <Input type="date" id="invoiceDate" name="date" value={props.projectState.date.value} isValid={props.projectState.date.isValid} onChange={props.projectInputHandler} readOnly={props.isDisabled} />
                </div>
                <div>
                    <label htmlFor="paymentTerms">Payment Terms</label>
                    <select id="paymentTerms" name="terms" value={props.projectState.terms.value} onChange={props.projectInputHandler} >
                        <option value="7">Net 7 Days</option>
                        <option value="10">Net 10 Days</option>
                        <option value="30">Net 30 Days</option>
                        <option value="60">Net 60 Days</option>
                        <option value="90">Net 90 Days</option>
                    </select>
                </div>
            </div>
            <label htmlFor="projectDesc">Project Description</label>
            <Input type="text" id="projectDesc" name="desc" value={props.projectState.desc.value} onChange={props.projectInputHandler} isValid={props.projectState.desc.isValid} />
        </div>
        <div>
            <div className={classes.items}>
                <label>Item Name</label>
                <label>Qty</label>
                <label>Price</label>
                <label>Total</label>
                <p></p>
                {props.itemFields.map((item, index) => {
                    return <ItemField {...item} index={index} key={item.key} itemsFieldsChangeHandler={props.itemsFieldsChangeHandler} deleteFieldHandler={props.deleteFieldHandler} />
                })}
            </div>
            <Button onClick={props.addFieldHandler} type="button" className={classes.addMoreItems}>+ Add more Items</Button>
        </div>
    </div>)
}
export default BillFormFields