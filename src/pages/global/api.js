import { Http } from 'utils'

const getRoutesByToken = params => Http.post('/login/withtoken', params)

export { getRoutesByToken }
