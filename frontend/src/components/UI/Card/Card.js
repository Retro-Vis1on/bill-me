import classes from './Card.module.css'
const Card = (props) => {
    return <div className={classes.card}>
        <div>
            <i className={`${props.iconClass} ${classes.icon}`}></i>
        </div>
        <div>
            {props.children}
        </div>
    </div>
}
export default Card