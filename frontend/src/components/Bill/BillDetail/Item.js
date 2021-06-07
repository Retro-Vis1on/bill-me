import useWindowDimensions from "../../../hooks/useWindowDimensions"

const Item = (props) => {
    const dimension = useWindowDimensions()
    const isMobile = dimension.width <= 700
    return <>
        {isMobile ? <div style={{ textAlign: 'start' }}>
            <h3>{props.name}</h3>
            <p style={{ margin: '0' }}>{props.qty} x ${props.price}</p>
        </div> :
            <>
                <h3 style={{ textAlign: 'start' }}>{props.name}</h3>
                <h3>{props.qty}</h3>
                <h3 >${props.price}</h3>
            </>
        }
        <h3>${props.price * props.qty}</h3>
    </>
}
export default Item