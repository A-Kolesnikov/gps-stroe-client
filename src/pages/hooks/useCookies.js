import { useState, useEffect } from "react"
import axios from "axios"
import Cookies from 'js-cookie' //npm i js-cookie

axios.defaults.withCredentials = true

export default function useCookies(cookieName, url = null, method = "GET", requestBody = null) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let readCookie = Cookies.get(cookieName)
        async function fetchData() {
            try {
                const axiosConfig = {
                    method: method,
                    url: url,
                    data: requestBody
                }
                const response = await axios(axiosConfig)
                //const set_cookieHeader = response.headers['set-cookie'] //cannot intercept set-cookie header because of browser security policy
                //const cookieValue = set_cookieHeader[0].split(';')[0]
                if (response.status === 200 || response.status === 201) {
                    readCookie = Cookies.get(cookieName)
                    setData(readCookie)
                }
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        if (readCookie) {
            setData(readCookie)
            setLoading(false)
        } else if (url) {
            fetchData()
        }
    }, [cookieName, url, method, requestBody])
    return { data, error, loading }
}