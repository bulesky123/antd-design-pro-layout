import { Http } from 'utils'

const login = params => Http.post('/login/withpassword', params)


export { login }
