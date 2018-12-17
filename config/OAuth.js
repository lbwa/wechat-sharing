const __DEV__ = process.env.NODE_ENV === 'development'

// ! 微信测试版公众号，可理解为 在开发环境下的公众号
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
const DEV_CONFIG = {
  // ! 需提前给后端公众号的 APP_ID 和 APP_SECRET 将它们保存在数据库
  APP_ID: process.env.VUE_APP_GZH_APP_ID,
  APP_SECRET: process.env.VUE_APP_GZH_APP_SECRET,
  // ! 注：REDIRECT_URL 此处必须正确填写协议，尽管在微信后台不需要填写协议
  REDIRECT_URL: `${process.env.VUE_APP_ACTIVITY_BASE_URL}/#/auth`,
  /*
   * 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
   * ，snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，
   * 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
   */
  SCOPE: 'snsapi_base'
}

// ! 正式环境下，REDIRECT_URL 仅支持域名，且需备案，在服务端放置验证文件
// https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
const PROD_CONFIG = {
  APP_ID: process.env.VUE_APP_GZH_APP_ID,
  APP_SECRET: process.env.VUE_APP_GZH_APP_ID,
  REDIRECT_URL: '',
  SCOPE: 'snsapi_base'
}

export default __DEV__ ? DEV_CONFIG : PROD_CONFIG

export const CODE_TEMPLATE = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect'

export const CARD_IDS = {
  // ! 仅能使用 https://api.weixin.qq.com/card/create?access_token=TOKEN 下创建的
  // 的卡券，即不能使用 微信商户后台创建的代金券，微信商户后台的代金券的发放属于微信支
  // 付的接口，而不是 微信网页开发中的 JS-SDK
  CASH: 'pBeeY1JqMNNjwsNsIqEkFmfPplAg'
}
