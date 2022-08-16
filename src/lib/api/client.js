import axios from 'axios'

const client = axios.create({
    withCredentials: true,
})

// localhost!
client.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
client.defaults.xsrfCookieName = 'csrftoken'
client.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

export default client