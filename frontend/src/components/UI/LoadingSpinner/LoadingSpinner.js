import classes from './LoadingSpinner.module.css'
const LoadingSpinner = (props) => {
    const spinnerClasses = `${classes["lds-ellipsis"]} ${props.className ? props.className : ""}`
    return (<div className={spinnerClasses}><div></div><div></div><div></div><div></div></div>)
}
export default LoadingSpinner