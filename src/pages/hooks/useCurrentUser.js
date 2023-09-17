import { useState, useEffect } from "react"
import axios from "axios"
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

export default function useCurrentUser(trigger, handleTrigger) {
    const [currentUser, setCurrentUser] = useState(null)
    const [visitCounter, setVisitCounter] = useState('')

    useEffect(() => {

        axios.get(`${serverUrl}/counter`)  //counter is triggered each time, page refreshed. On login and logout we get request from server to delete session, then counter triggered by change authorised state
            .then(res => {
                setVisitCounter(Math.ceil((res.data.counts + 1) / 2)) // divide by 2 due to ReactStrictMode
            })

        async function checkUser() {
            try {
                const response = await axios.get(`${serverUrl}/users/currentUser`)//(axiosConfig)
                if (response.data.currentUser) {
                    setCurrentUser({ ...response.data.currentUser })
                } else {
                    setCurrentUser(null)
                }
            } catch (err) {
                console.error(err)
            }
        }

        checkUser()

    }, [trigger])


    const currentCart = null
    const currentWishList = null

    const logout = () => {
        axios.get(`${serverUrl}/users/logout`)
            .then(res => {
                handleTrigger()
            })
            .catch(err => console.log(err))
    }

    return { currentUser, visitCounter, currentCart, currentWishList, logout }
}