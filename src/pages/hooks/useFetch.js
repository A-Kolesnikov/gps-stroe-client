import { useState, useEffect } from "react"
import axios from "axios"

export default function useFetch(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const controller = new AbortController() //prevents unstable behavior during fast multiple recall
        async function fetchData() {
            try {
                //setLoading(true)
                const response = await axios.get(url)
                setData(response.data)
            } catch (err) {
                setError(err)
            }finally{
                setLoading(false)
            }
        }  //Could use IIFE here (async function(){})(), but it leads to error with AbortController
        setTimeout(()=>fetchData(), 1000) //FOR DEBUGGING - IMITATES DELAY OF SERVER RESPONSE

        return () => controller.abort() //cleanUp function - runs when component is unmount
    }, [url])
    return {data, error, loading}
}