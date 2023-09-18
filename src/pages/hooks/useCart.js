import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

export default function useCart(trigger, currentUser = null, action = "show", product_id = null, quantity = 1) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController() //prevents unstable behavior during fast multiple recall
        const axiosConfig = { method: 'GET', url: null, data: null }
        async function fetchData() {
            
            (() => {    //change default axios settings due to action type
                if (!currentUser) {
                    return
                } else if (action === 'show') {
                    axiosConfig.url = `${serverUrl}/cart/by-user/${currentUser.id}`
                    return
                } else if (action === 'add') {
                    axiosConfig.method = 'POST'
                    axiosConfig.url = `${serverUrl}/cart/add-product`
                    axiosConfig.data = {
                        "user_id": currentUser.id,
                        "product_id": product_id,
                        "quantity": quantity
                    }
                    return
                }
            })()
            try {
                const response = !axiosConfig.url ? { data: null } : await axios(axiosConfig)//.get(url)
                setData(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }  //Could use IIFE here (async function(){})(), but it leads to error with AbortController
        fetchData()

        return () => controller.abort() //cleanUp function - runs when component is unmount
    }, [trigger, currentUser])
    return { data, error, loading }
}