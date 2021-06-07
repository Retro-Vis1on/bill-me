import { useCallback, useContext, useEffect, useState } from 'react'
import Container from '../components/UI/Container/Container'
import Profile from '../components/User/Profile'
import { getProfile } from '../helpers/graphQLBody'
import useRequest from '../hooks/useRequest'
import AuthContext from '../store/AuthContext'
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import { Link } from 'react-router-dom'
import classes from '../components/User/Profile.module.css'
import Error from '../components/UI/ErrorMessage/Error'
const UserPage = () => {
    const { sendRequest, error } = useRequest()
    const ctx = useContext(AuthContext)
    const [userData, userDataUpdater] = useState(null)
    const [isLoading, loadingStateUpdater] = useState(false)
    const getData = useCallback(async () => {
        loadingStateUpdater(true)
        const responseBody = getProfile()
        const config = { body: responseBody, headers: { 'Content-Type': 'application/json', 'Authorization': ctx.token } }
        const response = await sendRequest(config)
        loadingStateUpdater(false)
        if (response) {
            const chartData = {
                labels: ['Paid', 'Pending', 'Draft'],
                datasets: [
                    {
                        data: [response.getProfile.state.Paid, response.getProfile.state.Pending, response.getProfile.state.Draft],
                        backgroundColor: [
                            'rgba(1, 194, 114, 0.282)',
                            'rgba(255, 166, 0, 0.282)',
                            'rgba(255, 255, 255, 0.282)',
                        ],
                        hoverBackgroundColor: [
                            'rgba(1, 194, 114, 0.482)',
                            'rgba(255, 166, 0, 0.482)',
                            'rgba(255, 255, 255, 0.482)',
                        ],
                        borderColor: [
                            'rgb(1, 194, 114)',
                            'orange',
                            'white',],
                        borderWidth: 1
                    }
                ],
                options: {
                    legend: {
                        labels: {
                            fontColor: "white",
                            fontSize: 18
                        }
                    }
                }
            }
            const data = { ...(response.getProfile) }
            data.chartData = chartData
            data.hasBills = (+data.state.Paid > 0) || (+data.state.Pending > 0) || (+data.state.Draft > 0)
            userDataUpdater(data)
        }
    }, [sendRequest, ctx.token])
    useEffect(() => getData(), [getData])
    return <Container>{error ? <><Link to="/home" className={classes['home-link']}> <span>&lt;</span>  Go back</Link><Error>Woops! Something went Wrong!</Error></> : (isLoading || !userData ? <LoadingSpinner /> : <><Link to="/home" className={classes['home-link']}> <span>&lt;</span>  Go back</Link><Profile data={userData} /></>)}</Container>
}
export default UserPage