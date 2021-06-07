import { createPortal } from 'react-dom'
import classes from './Modal.module.css'
const Overlay = (props) => {
    return <div className={classes.overlay} onClick={props.onClose} style={props.style}></div>
}
const ModalBody = (props) => {
    return <>{props.children}</>
}

const Modal = (props) => {
    return <>
        {createPortal(<Overlay onClose={props.onClose} style={props.style} />, document.getElementById('overlay'))}
        {createPortal(<ModalBody >{props.children}</ModalBody>, document.getElementById('overlay'))}
    </>
}

export default Modal