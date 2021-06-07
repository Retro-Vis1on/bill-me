import classes from './Alert.module.css'
import Button from '../Button/Button'
const Alert = (props) => {
    return (
        <div className={classes.alert}>
            <h3>  {props.children}</h3>
            <Button onClick={props.onClose}>OK</Button>
        </div>
    )
}
export default Alert