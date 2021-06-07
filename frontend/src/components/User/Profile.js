import classes from "./Profile.module.css"
import { Doughnut } from 'react-chartjs-2'
const Profile = (props) => {
    return <>

        <main className={classes.main}>
            <div className={classes.userData}>
                <div className={classes.profile}>
                    <div className={classes.profilePic}>
                        <img src={props.data.profilePic} alt="profilPic" />
                    </div>
                </div>
                <div className={classes.info}>
                    <p>Username</p>
                    <h3>
                        {props.data.username}
                    </h3>
                    <p>Email</p>
                    <h3>
                        {props.data.email}
                    </h3>
                </div>
            </div>
            <div className={`${classes.bills} ${!props.data.hasBills ? classes.noBill : ''}`}>
                {props.data.hasBills ? <>
                    <div className={classes.billNumbers}>
                        <p>
                            Total Paid Invoices
                    </p>
                        <h2>{props.data.state.Paid}</h2>
                        <p>
                            Total Pending Invoices
                    </p>
                        <h2>{props.data.state.Pending}</h2>
                        <p>
                            Total Draft Invoices
                    </p>
                        <h2>{props.data.state.Draft}</h2>
                    </div>
                    <div>
                        <Doughnut data={props.data.chartData} />
                    </div></> :
                    <h2 style={{ textAlign: "center", margin: "0" }}>You don't have any invoices!</h2>
                }
            </div>
        </main>
    </>
}
export default Profile