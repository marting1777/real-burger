import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-project-4e1eb.firebaseio.com/'
})

export default instance