import createBasicRequest from 'UTILS/request'
import { tokenRoutes, sdkRoutes } from './routes'
import WE_CHAT_CONFIG from 'OAUTH'

const tokenRequest = createBasicRequest(process.env.VUE_APP_TOKEN_BASE_REQUEST)
const sdkRequest = createBasicRequest(process.env.VUE_APP_SDK_BASE_REQUEST)

export function fetchAccessToken (code) {
  return tokenRequest.post(tokenRoutes.ACCESS_TOKEN, JSON.stringify({
    code,
    appid: WE_CHAT_CONFIG.APP_ID,
    secret: WE_CHAT_CONFIG.APP_SECRET,
    project: 'WEB_SC'
  }))
}

export function fetchSDKConfigSignature (url) {
  return sdkRequest.post(sdkRoutes.SIGNATURE, JSON.stringify({
    url
  }))
}

/**
 * @description 使用参数获取，特定卡号的 signature，以用于 wx.addCard 中分发卡券
 * @param {String} cardId 需要被添加的卡券
 */
export function fetchCardExt (cardId) {
  return sdkRequest.post(sdkRoutes.CARD_SIGNATURE, JSON.stringify({
    cardId
  }))
}
