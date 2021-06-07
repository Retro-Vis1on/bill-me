import classes from './Button.module.css'
const Button = (props) => {
    const btnClass = classes.button + " " + (props.className ? props.className : '');
    return <button type={props.type ? props.type : "button"} onClick={props.onClick} className={btnClass} disabled={props.disabled ? props.disabled : false} >{props.children}</button>

}
export default Button