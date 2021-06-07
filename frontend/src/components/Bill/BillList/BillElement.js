import classes from "./BillElement.module.css"
import { Link } from "react-router-dom"
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import HashTag from "../../UI/HashTag/HashTag"

const Bill = (props) => {
    const dimension = useWindowDimensions()
    const isMobile = dimension.width <= 700
    const stateClasses = classes.state + " " + classes[props.state];
    return <li className={classes.content}>
        <Link to={`invoice/${props.id}`}>
            {
                !isMobile ? <>
                    <h3><HashTag />{(props.id).substring(props.id.length - 6, props.id.length)}</h3>
                    <p>Due {props.dueDate}</p>
                    <p>{props.recieverName}</p>
                    <h3>${props.total}</h3>
                    <div className={stateClasses}>
                        <p>• {props.state}</p>
                    </div>
                </> : <>
                    <h3>#{(props.id).substring(props.id.length - 6, props.id.length)}</h3>
                    <p style={{ textAlign: "end" }}>{props.recieverName}</p>
                    <div className={classes.project}>
                        <p>Due {props.dueDate}</p>
                        <h3>${props.total}</h3>
                    </div>
                    <div className={stateClasses}>
                        <p>• {props.state}</p>
                    </div>
                </>
            }
            {!isMobile && <p className={classes.arrow}> &gt; </p>}
        </Link>
    </li>
}
export default Bill