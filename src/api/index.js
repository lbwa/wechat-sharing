import request from 'UTILS/request'
import routes from './routes'
import WE_CHAT_CONFIG from 'OAUTH'

export function fetchAccessToken (code) {
  return request.post(routes.ACCESS_TOKEN, JSON.stringify({
    code,
    appid: WE_CHAT_CONFIG.APP_ID,
    secret: WE_CHAT_CONFIG.APP_SECRET,
    project: 'WEB_SC'
  }))
}
