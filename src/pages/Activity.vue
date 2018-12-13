<template>
  <section class="pages__activity">
    <p>这是活动正文内容</p>
    <code>{{code}}</code>
  </section>
</template>

<script>
import { fetchAccessToken, fetchSDKAccess } from 'API'
import { codeFromStorage } from 'UTILS/storage'
import wx from 'wx'

const __DEV__ = process.env.NODE_ENV === 'development'

export default {
  name: 'activity',

  data () {
    return {
      accessToken: '',
      openid: '' // 用于判断分享链接的来源用户
    }
  },

  /**
   * code 是无限制请求，但只能使用一次，且有效期为 5 分钟
   * 接口：https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index
   * 文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
   */
  computed: {
    // 使用缓存中的 code 或 微信回调地址中对应的查询字符串 code
    code () {
      return (this.isValidCachedCode && codeFromStorage.getItem().code) ||
        this.$route.query.code
    },
    // 是否存在有效的缓存 code
    isValidCachedCode () {
      const cachedCode = codeFromStorage.getItem()
      return cachedCode && (new Date().getTime() < cachedCode.expired)
    }
  },

  created () {
    // 存在有效的缓存 code 时，不更新 localStorage 中的 code 值
    !this.isValidCachedCode && codeFromStorage.setItem({
      code: this.code,
      // 7200s 为 access_token 的失效时间
      expired: new Date().getTime() + 7200 * 1000
    })
  },

  mounted () {
    // 获取 access_token 时，后端会返回当前用户的 openid
    fetchAccessToken(this.code)
      // eslint-disable-next-line
      .then(({ access_token, expired_in, openid }) => {
        // eslint-disable-next-line
        this.accessToken = access_token || '未成功获取 access_token'
        this.openid = openid || '未成功获取 openid'
      })
      .catch(console.error)

    // ! 微信公众后台的 JS接口安全域名 只包含域名和端口，不包含协议
    // ! 此处必须包含协议
    const SDKReferenceURL = window.location.href
      .split('#')[0]

    fetchSDKAccess(SDKReferenceURL)
      .then(({
        appId,
        nonceStr,
        signature,
        timestamp,
        url
      }) => {
        wx.config({
          // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入
          // 的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打
          // 印。
          debug: !__DEV__,
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'addCard',
            'openCard'
          ] // 必填，需要使用的 JS 接口列表
        })

        wx.ready(function () { // 需在用户可能点击分享按钮前就先调用
          console.info('WeiXin JS-SDK is activated !')

          wx.checkJsApi({
            jsApiList: [
              'updateAppMessageShareData',
              'addCard',
              'openCard',
              'onMenuShareAppMessage',
              'onMenuShareTimeline'
            ],
            success (res) {
              console.log('SDK checking :', res)
            }
          })

          // ! 分享给朋友（分享成功后无回调）
          wx.updateAppMessageShareData({
            title: '双旦送福利', // 分享标题
            desc: '蛮牛云视双旦活动', // 分享描述
            // ! 添加主动分享者的 openid
            link: 'http://22993k92h8.51mypc.cn:37148/#/activity?code=011FWLJO0rzU042HRGFO0bIFJO0FWLJe', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://assets-cdn.github.com/images/modules/site/integrators/google.png', // 分享图标
            success (res) {
              // 此处为监听 `分享` 的设置 **配置** 成功，而非 `分享成功` 的回调
              console.info(
                '[Message share]: activate "分享给朋友" listener !'
              )
            }
          })

          wx.updateTimelineShareData({
            title: '双旦送福利', // 分享标题
            link: 'http://22993k92h8.51mypc.cn:37148/#/activity?code=011FWLJO0rzU042HRGFO0bIFJO0FWLJe', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://assets-cdn.github.com/images/modules/site/integrators/google.png', // 分享图标
            success (res) {
              // 设置成功
              console.info(
                '[Timeline share]: activate "分享到朋友圈" listener !'
              )
            }
          })

          wx.error(console.error)
        })
      })
      .catch(console.error)
  }
}
</script>

<style lang='scss' scoped>
</style>
