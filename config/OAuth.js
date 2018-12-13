const __DEV__ = process.env.NODE_ENV === 'development'

// ! 微信测试版公众号，可理解为 在开发环境下的公众号
// https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
const DEV_CONFIG = {
  // ! 需提前给后端 APP_ID 和 APP_SECRET 将它们保存在数据库
  APP_ID: 'wx9ccba482c3f0c7f3',
  APP_SECRET: '284e6840bd0fdeee9f4a667c091578a9',
  // ! 注：REDIRECT_URL 此处必须正确填写协议，尽管在微信后台不需要填写协议
  REDIRECT_URL: 'http://22993k92h8.51mypc.cn:37148/#/auth',
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
  APP_ID: '',
  APP_SECRET: '',
  REDIRECT_URL: 'https://rest.mny9.com/app',
  SCOPE: 'snsapi_base'
}

export default __DEV__ ? DEV_CONFIG : PROD_CONFIG
