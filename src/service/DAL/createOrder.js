import axios from "axios"
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

export default async function createOrder(user_id, total_price, orderList) {
    try {
        const axiosConfig = {
            method: 'POST',
            url: `${serverUrl}/orders/add`,
            data: {user_id: user_id, total_price: total_price, orderList: orderList}
        }
        const response = await axios(axiosConfig)
        console.log(response.data)
        return response.data
    } catch (err) {
        console.error(err)
    }
}