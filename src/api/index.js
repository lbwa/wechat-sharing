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

/**
 * @description 使用参数获取，特定卡号的 signature，以用于 wx.addCard 中分发卡券
 * @param {String} cardId 需要被添加的卡券
 * @param {String} nonceStr 在 wx.config 中使用过的 后端响应的 自定义字符串
 * @param {Number} timestamp 在 wx.config 中使用过的 后端响应的 时间戳
 */
export function fetchCardExt (cardId, nonceStr, timestamp) {
  return fetch('http://10.12.16.114/api/cardSignature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardId,
      nonceStr,
      timestamp
    })
  })
    .then(res => res.json())
}
