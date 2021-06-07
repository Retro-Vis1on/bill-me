const { createContext, useState } = require("react");

const AuthContext = createContext({
    token: null,
    userId: null,
    profilePic: null,
    expirationTime: null,
    username: null,
    login: (data) => { },
    logout: () => { },
    isValid: () => { }
})
const isValid = () => {
    let expTime = localStorage.getItem('expTime')
    let curTime = (new Date()).getTime()
    if (expTime > curTime)
        return true

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expTime');
    return false;
}

export const ContextProvider = (props) => {
    let initToken = null, initUser = null, initExp = null;
    if (localStorage.getItem('token') && isValid()) {
        initExp = localStorage.getItem('expTime');
        initUser = localStorage.getItem('userId');
        initToken = localStorage.getItem('token');
    }
    const [token, tokenUpdater] = useState(initToken);
    const [userId, userIdUpdater] = useState(initUser);
    const [expirationTime, expirationUpdater] = useState(initExp);
    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        const expTime = (new Date()).getTime() + (+data.expirationTime) * 3600000;
        localStorage.setItem('expTime', expTime);
        tokenUpdater(data.token)
        userIdUpdater(data.userId);
        expirationUpdater(expTime)
    }
    const logout = () => {
        tokenUpdater(null)
        userIdUpdater(null);
        expirationUpdater(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expTime');
    }
    return <AuthContext.Provider value={{ token, userId, expirationTime, login, logout, isValid }}>{props.children}</AuthContext.Provider>
}

export default AuthContext
