import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfilePic } from '../../../helpers/graphQLBody'
import useRequest from '../../../hooks/useRequest'
import AuthContext from '../../../store/AuthContext'
import Button from '../Button/Button'
import classes from './Sidebar.module.css'
const SideBar = () => {
    const { sendRequest } = useRequest()
    const [profilePic, profilePicupdater] = useState(null)
    const ctx = useContext(AuthContext)
    useEffect(() => {
        const getPicture = async () => {
            const requestBody = getProfilePic()
            const config = { body: requestBody, headers: { 'Content-Type': 'application/json', 'Authorization': ctx.token } }
            const response = await sendRequest(config);
            if (response)
                profilePicupdater(response.getProfile.profilePic)
        }
        getPicture()
    }, [ctx.token, sendRequest])
    return (<div className={classes.sidebar}>
        <div className={classes.icon}>
            <Link to="/"
            ><img className={classes.logo} src="/icons/logo.svg" alt="logo" /></Link>
        </div>
        <div className={classes.userAndToggle}>
            <Button onClick={ctx.logout}>Logout</Button>
            <Link className={classes.profilePic} to="/profile">{profilePic && <img src={`${profilePic}`} alt="proiflepice" />}</Link>
        </div>
    </div>)
}
export default SideBar