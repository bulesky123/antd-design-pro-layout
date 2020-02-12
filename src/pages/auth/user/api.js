import { Http } from 'utils'

const getUserList = params => Http.post('/user/getuserlist', params)


export { getUserList }
