import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.withCredentials = true

export default function useFetch(url=null, method="GET", requestBody = null) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const controller = new AbortController() //prevents unstable behavior during fast multiple recall
        async function fetchData() {
            try {
                const axiosConfig = {
                    method: method,
                    url: url,
                    data: requestBody
                }
                //setLoading(true)
                const response = !url ? {data:null} : await axios(axiosConfig)//.get(url)
                setData(response.data)
            } catch (err) {
                setError(err)
            }finally{
                setLoading(false)
            }
        }  //Could use IIFE here (async function(){})(), but it leads to error with AbortController
        setTimeout(()=>fetchData(), 800) //FOR DEBUGGING - IMITATES DELAY OF SERVER RESPONSE

        return () => controller.abort() //cleanUp function - runs when component is unmount
    }, [url, method, requestBody])
    return {data, error, loading}
}