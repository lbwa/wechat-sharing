<template>
  <section class="pages__activity">
    <code>current code: {{code}}</code>
    <p>current url: <strong>{{href}}</strong></p>
    <p>current openid: {{openid}}</p>
    <ul class="activity__list">
      <li
        :class="[
          'activity__list-item',
          state.isActivated ? 'is-activated' : ''
        ]"
        v-for="(state, index) of redBags"
        :key="index"
        @click="onAddCard(state, index)"
      >
        5 元，有效期至 2019.01.07
      </li>
    </ul>
  </section>
</template>

<script>
/*
 * 在进入此页时，若是 B 用户点击了 A 用户分享的链接，那么在当前 localStorage 中存在
 * __src_openid__ 为 A 用户的 openid，此 openid 用于主动推送给 A 用户分享卡券
 */
import { fetchAccessToken, fetchSDKConfigSignature, fetchCardExt } from 'API'
import { codeFromStorage } from 'UTILS/storage'
import { CARD_IDS } from 'OAUTH'
import wx from 'wx'

export default {
  name: 'activity',

  data () {
    return {
      redBags: Array(5).fill(false).map(item => ({
        isActivated: false
      })),
      accessToken: '',
      // 用户唯一标识，请注意，在未关注公众号时，用户访问公众号的网页，也会产生一个用户
      // 和公众号唯一的 openid（详见链接 **第二步** 返回数据参数中的描述）
      // https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842
      openid: '',
      href: window.location.href,
      // wx.config 与 wx.addCard 中使用的 nonceStr 和 timestamp 必须一致
      nonceStr: '',
      timestamp: 0
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

  methods: {
    sdkChecking () {
      wx.checkJsApi({
        jsApiList: [
          'updateAppMessageShareData',
          'addCard',
          'openCard',
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ],
        success (res) {
          console.log('[SDK checking] :', res)
        }
      })
    },
    messageShare () {
      // ! 分享给朋友（分享成功后无回调）
      wx.updateAppMessageShareData({
        title: '双旦送福利', // 分享标题
        desc: '蛮牛云视双旦活动', // 分享描述
        // 主动分享的用户，通过 卡券推送 来实现获得奖励代金券，而不是 JS-SDK
        link: `http://22993k92h8.51mypc.cn:37148/#/home?source=${this.openid}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://wx.qlogo.cn/mmopen/ylRhrSjQb8gL3fmcoJAjS1CCPYn0Z974N6C1mzXyVICWEGkm1PobL926uCvzLWW8YrgEJju2qNg47y6l3Kmja993libS8hEFQ/64', // 分享图标
        success (res) {
          // 此处为监听 `分享` 的设置 **配置** 成功，而非 `分享成功` 的回调
          console.info(
            '[Message share]: activate "分享给朋友" listener !'
          )
        }
      })
    },
    timelineShare () {
      wx.onMenuShareTimeline({
        // 分享标题
        title: '双旦送福利',
        // 主动分享的用户，通过 `卡券推送` 来实现获得奖励代金券，而不是 JS-SDK
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
        // ! 若不一致，那么自定义标题，图标将失效，故此处不能直接写成
        // ! open.weixin..qq.com 的静默授权页面
        // source 查询字符串将被缓存至 localStorage 中，以防重定向时丢失
        link: `http://22993k92h8.51mypc.cn:37148/#/home?source=${this.openid}`,
        // 分享图标
        imgUrl: 'http://wx.qlogo.cn/mmopen/ylRhrSjQb8gL3fmcoJAjS1CCPYn0Z974N6C1mzXyVICWEGkm1PobL926uCvzLWW8YrgEJju2qNg47y6l3Kmja993libS8hEFQ/64',
        success () {
          // 微信版本为 6.7.2 之后的将无法触发该回调函数
          // 用户点击了分享后执行的回调函数
          console.info('activate share !')
        }
      })

      // ! 以下接口待官方修复，IOS 无法正常唤起
      // wx.updateTimelineShareData({
      //   title: '双旦送福利', // 分享标题
      //   link: 'http://22993k92h8.51mypc.cn:37148/#/activity?code=011FWLJO0rzU042HRGFO0bIFJO0FWLJe', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: 'https://assets-cdn.github.com/images/modules/site/integrators/google.png', // 分享图标
      //   success (res) {
      //     // 设置成功
      //     console.info(
      //       '[Timeline share]: activate "分享到朋友圈" listener !'
      //     )
      //   }
      // })
    },
    onAddCard (state, index) {
      const cardId = CARD_IDS.CASH
      !state.isActivated && fetchCardExt(cardId, this.nonceStr, this.timestamp)
        .then(res => ({
          cardId,
          nonceStr: res.nonceStr,
          signature: res.signature,
          timestamp: res.timestamp
        }))
        .then(this.addCardToBags)
        .then(() => { state.isActivated = true })
    },
    addCardToBags ({ cardId, cardSignature }) {
      // ! 确认config中 nonceStr（js 中驼峰标准大写S）, timestamp 与用以签名中的对
      // 应 nonceStr, timestamp 一致。
      wx.addCard({
        // 需要添加的卡券列表
        cardList: [{
          cardId,
          cardExt: JSON.stringify({
            nonce_str: this.nonceStr,
            timestamp: this.timestamp,
            signature: cardSignature
          })
        }],
        complete (res) {
          console.log('%c [Add card complete] :', 'color: red;', res)
        }
      })
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

    fetchSDKConfigSignature(SDKReferenceURL)
      // ! 确认config中 nonceStr（js 中驼峰标准大写S）, timestamp 与用以签名中的对
      // 应 nonce_str, timestamp 一致。
      .then(({
        appId,
        nonceStr,
        signature,
        timestamp,
        url
      }) => {
        this.nonceStr = nonceStr
        this.timestamp = timestamp

        console.log('%c this.nonceStr, this.timestamp :', 'color: red', this.nonceStr, this.timestamp)

        wx.config({
          // 开启调试模式,调用的所有 api 的返回值会在客户端 alert 出来，若要查看传入
          // 的参数，可以在 pc 端打开，参数信息会通过 log 打出，仅在 pc 端时才会打
          // 印。
          // debug: process.env.NODE_ENV === 'development',
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名
          jsApiList: [
            'updateAppMessageShareData',
            'onMenuShareTimeline',
            'addCard',
            'openCard'
          ] // 必填，需要使用的 JS 接口列表
        })

        wx.ready(() => { // 需在用户可能点击分享按钮前就先调用
          console.info('WeiXin JS-SDK is activated !')

          this.sdkChecking()

          this.messageShare()

          this.timelineShare()

          wx.error(console.error)
        })
      })
      .catch(console.error)
  }
}
</script>

<style lang='scss' scoped>
.pages__activity {
  width: 100vw;

  .activity__list {
    margin: 0;
    padding: 0;
    text-align: center;

    &-item {
      padding: 10px 0;
    }

    .is-activated {
      color: #b8b8b8;
    }
  }
}
</style>
