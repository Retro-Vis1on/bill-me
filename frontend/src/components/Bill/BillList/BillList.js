import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import dateHandler from '../../../helpers/dateHandler'
import Bill from "./BillElement";
const BillList = (props) => {
    const [filterState, filterUpdater] = useState(null)
    const location = useLocation()
    useEffect(() => {
        const parsed = new URLSearchParams(location.search)
        let filter = parsed.get('filter');
        filterUpdater(filter);
    }, [location.search])

    let billsList = <h1>You don't have any invoices!</h1>
    if (props.bills) {
        let filter = filterState ? filterState : 'All';
        billsList = props.bills.map(bill => {
            const dueDate = dateHandler(bill.dueDate)
            if (bill.state === filter || filter === 'All')
                return (
                    <Bill id={bill._id} recieverName={bill.recieverName} dueDate={dueDate} state={bill.state} total={bill.total} key={bill._id} />
                )
            return null
        })
    }
    return (props.bills ? <ul style={{ listStyle: 'none', padding: '0' }}>{billsList}</ul> : billsList)
}
export default BillList