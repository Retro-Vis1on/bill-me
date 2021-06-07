import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext, useEffect, } from "react"
import BillList from './BillList'
import classes from './Bills.module.css'
import useRequest from "../../../hooks/useRequest"
import AuthContext from '../../../store/AuthContext'
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner'
import Container from '../../UI/Container/Container'
import Button from '../../UI/Button/Button'
import BillFormOverlay from '../../UI/BillForm/BillFormOverlay'
import { billsList } from '../../../helpers/graphQLBody'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import Error from '../../UI/ErrorMessage/Error'
const Bills = () => {
    const [isLoading, loadingStateUpdater] = useState(false)
    const [numberofBills, numberUpdater] = useState(0)
    const [isLast, isLastUpdater] = useState(false)
    const [bills, billsListUpdater] = useState([]);
    const [showForm, showFormStateUpdater] = useState(false);
    const { sendRequest, error } = useRequest()
    const ctx = useContext(AuthContext)
    const loader = useRef(null)
    const getBills = useCallback(async (firstIndex = 0) => {
        loadingStateUpdater(true)
        const requestBody = billsList({ firstIndex })
        const config = { body: requestBody, headers: { 'Content-Type': 'application/json', 'Authorization': `${ctx.token}` } }
        const response = await sendRequest(config);
        loadingStateUpdater(false)
        if (response) {
            if (firstIndex) {
                billsListUpdater(prevState => [...prevState, ...response.getBillList.bills]);
                numberUpdater(prevState => prevState + response.getBillList.bills.length)
            }
            else {
                billsListUpdater(response.getBillList.bills);
                numberUpdater(response.getBillList.bills.length)
            }
            isLastUpdater(response.getBillList.isLast)
        }
    }, [ctx.token, sendRequest])
    const formCloseFormHandler = () => {
        showFormStateUpdater(false);
    }
    const openFormHandler = () => {
        showFormStateUpdater(true)
    }

    const handleObserver = useCallback((entities) => {
        const target = entities[0];
        if (target.isIntersecting && !isLast) {
            getBills(bills.length)
        }
    }, [getBills, bills, isLast])
    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }

    }, [handleObserver]);
    const dimension = useWindowDimensions()
    const isMobile = dimension.width <= 700
    return (<>
        { showForm && <BillFormOverlay onClose={formCloseFormHandler} refresh={getBills} formState={showForm} />}
        <Container>
            <header className={classes['home-header']}>
                <div className={classes.invoiceCt}>
                    <h1>Invoices</h1>
                    <p>{!isMobile ? "There are " : ""}{numberofBills} total {numberofBills === 1 ? "invoice" : "invoices"}</p>
                </div>
                {!error && (!isLoading || bills.length) ?
                    <div className={classes['header-actions']}>
                        <div className={classes.filter}>
                            <button className={classes['filterBtn']}>
                                {!isMobile ? "Filter by status" : "Filter"}  <span style={{ color: "rgb(156, 133, 248)" }}> v</span>
                            </button>
                            <div className={classes.filters}>
                                <Link to="/home?filter=Pending">Pending</Link>
                                <Link to="/home?filter=Paid">Paid</Link>
                                <Link to="/home?filter=Draft">Draft</Link>
                                <Link to="/home?filter=All">All</Link>
                            </div>
                        </div>
                        <Button className={classes.open} onClick={openFormHandler}>
                            <div className={classes.Create}>
                                <div className={classes.add}>+</div>
                                {!isMobile ? "New Invoice" : "New  "}
                            </div>
                        </Button>
                    </div> : ''}
            </header>
            <main className={classes['home-main']} id="mainContent">

                {error ? <Error>Woops! Something Went Wrong!</Error> : (bills.length ? <BillList bills={bills} /> : !isLoading && <Error>You don't have any invoices</Error>)}
                {isLoading ? <LoadingSpinner /> : (!isLast && <div ref={loader}></div>)}
            </main>
        </Container>
    </>
    )
}
export default Bills