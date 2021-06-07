import classes from './Address.module.css'
const Address = (props) => {
    return <>
        <p className={classes.p}>{props.street}</p>
        <p className={classes.p}>{props.city}</p>
        <p className={classes.p}>{props.postCode}</p>
        <p className={classes.p}>{props.country}</p>
    </>
}
export default Address