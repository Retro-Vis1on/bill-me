
import classes from './Error.module.css'
const Error = (props) => {
    return (<>
        <div className={classes.message}>
            <h2>{props.children}</h2>
        </div>
    </>
    )
}
export default Error