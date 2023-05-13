import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://olestonesbuilders.co.ke'
});


const fetcher = url => instance.get(url).then(res => res.data)

const sender = (url, config) => instance.post(url, config, { withCredentials: true, }).then(res=>res.data).catch(err=>err.response)
const updater = (url, config) => instance.patch(url, config, { withCredentials: true, }).then(res=>res.data).catch(err=>err.response)



export { fetcher, sender, updater }