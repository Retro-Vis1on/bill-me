import classes from './Container.module.css'
const Container = (props) => {
    return <div className={classes.container} id="container">
        {props.children}
    </div>
}
export default Container