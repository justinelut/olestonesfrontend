import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'https://justinedev.verixr.com'
// });


const fetcher = url => axios.get(url).then(res => res.data)

const sender = (url, config) => axios.post(url, config, { withCredentials: true, }).then(res=>res.data).catch(err=>err.response)
const updater = (url, config) => axios.patch(url, config, { withCredentials: true, }).then(res=>res.data).catch(err=>err.response)



export { fetcher, sender, updater }