import { Http } from 'utils'

const getUserList = params => Http.post('/user/getuserlist', params)
const addUser = params => Http.post('/user/adduser', params)


export { getUserList, addUser }
