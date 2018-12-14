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

export function fetchSDKConfigSignature (url) {
  return fetch('http://10.12.16.114/api/signature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url
    })
  })
    .then(res => res.json())
}

export function fetchCardExt (cardId) {
  return fetch('http://10.12.16.114/api/cardSignature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId
    })
  })
    .then(res => res.json())
}
