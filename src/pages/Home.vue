<template>
  <section class="pages__home">
    <p
      class="dev__tips"
      v-if="isDevMode"
    >current <strong>auth code</strong> url: {{ isDevMode && authCode}}</p>
  </section>
</template>

<script>
import WE_CHAT_CONFIG from 'OAUTH'
// import { fetchAccessToken } from 'API'

export default {
  computed: {
    isDevMode () {
      return process.env.NODE_ENV === 'development'
    },
    authCode () {
      return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WE_CHAT_CONFIG.APP_ID}&redirect_uri=${encodeURIComponent(WE_CHAT_CONFIG.REDIRECT_URL)}&response_type=code&scope=${WE_CHAT_CONFIG.SCOPE}&state=manniu#wechat_redirect`
    }
  },

  mounted () {
    window.location.href = this.authCode
  }
}
</script>

<style lang='scss' scoped>

.dev__tips {
  margin: 0;
  padding: 0;
}
</style>
