import request from 'UTILS/request'
import routes from './routes'

export function fetchAccessToken () {
  return request.post(routes.ACCESS_TOKEN)
}
