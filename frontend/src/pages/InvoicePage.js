import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import useRequest from '../hooks/useRequest'
import AuthContext from '../store/AuthContext'
import Bill from '../components/Bill/BillDetail/Bill'
import dateHandler from '../helpers/dateHandler'
import Container from '../components/UI/Container/Container'
import { indivisualBill } from '../helpers/graphQLBody'
import Error from '../components/UI/ErrorMessage/Error'
import { Link } from 'react-router-dom'
import classes from '../components/UI/ErrorMessage/Error.module.css'
const InvoicePage = () => {
    const { sendRequest, error } = useRequest()
    const [bill, billUpdater] = useState(null)
    const [isLoading, loadingStateUpdater] = useState(true);
    const { id } = useParams()
    const ctx = useContext(AuthContext)
    const getBill = useCallback(async () => {
        loadingStateUpdater(true);
        const requestBody = indivisualBill(id)
        const config = { body: requestBody, headers: { 'Content-Type': 'application/json', 'Authorization': `${ctx.token}` } }
        const response = await sendRequest(config);
        if (response) {
            response.singleBill.invoiceDate = dateHandler(response.singleBill.invoiceDate)
            response.singleBill.dueDate = dateHandler(response.singleBill.dueDate)
            billUpdater(response.singleBill)
        }
        loadingStateUpdater(false);
    }, [ctx.token, id, sendRequest])
    useEffect(() => {
        getBill();
    }, [getBill])
    return <Container>  {isLoading ? <LoadingSpinner /> : bill ? <Bill bill={bill} refresh={getBill} /> : <>  <Link to="/home" className={classes['home-link']}> <span>&lt;</span>  Go back</Link><Error>{error.statusCode === 404 ? "This bill doesn't exist!" : "Woops! Something went wrong"}</Error></>}</Container>
}
export default InvoicePage