import classes from './Input.module.css'
const Input = (props) => {
    const inputClasses = classes.input + " " + (props.className ? props.className : '') + " " + (props.isValid === false ? classes.invalid : " ");
    return <input name={props.name} type={props.type} onChange={props.onChange} readOnly={props.readOnly ? props.readOnly : false} id={props.id} min={props.min} className={inputClasses} formNoValidate={true} value={props.value} />
}
export default Input