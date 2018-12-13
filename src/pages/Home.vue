<template>
  <section class="pages__home">
    <p
      class="dev__tips"
      v-if="isDevMode"
    >current <strong>auth code</strong> url: {{ isDevMode && authCode}}</p>
  </section>
</template>

<script>
import WE_CHAT_CONFIG, { CODE_TEMPLATE } from 'OAUTH'

export default {
  computed: {
    isDevMode () {
      return process.env.NODE_ENV === 'development'
    },
    authCode () {
      return CODE_TEMPLATE
        .replace(/APPID/, WE_CHAT_CONFIG.APP_ID)
        .replace(
          /REDIRECT_URI/, encodeURIComponent(WE_CHAT_CONFIG.REDIRECT_URL)
        )
        .replace(/SCOPE/, WE_CHAT_CONFIG.SCOPE)
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
