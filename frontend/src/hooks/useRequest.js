import { useCallback, useState } from "react"
const url = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:8000/graphql'
// const url = 'http://localhost:8000/graphql'
const useRequest = () => {
    const [error, errorUpdater] = useState(null)
    const sendRequest = useCallback(async (config) => {
        try {
            errorUpdater(null);
            const response = await fetch(url, {
                method: 'POST',
                body: config.body,
                headers: config.headers
            })
            const data = await response.json()
            if (data.errors)
                throw (data.errors[0]);
            return data.data
        }
        catch (err) {
            if (err.type === "Failed to fetch")
                err.statusCode = 503
            errorUpdater({ message: err.message, statusCode: err.statusCode })
        }
    }, [])
    return { sendRequest, error, errorUpdater }
}
export default useRequest