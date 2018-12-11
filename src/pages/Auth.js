// 微信网页授权获取 code 的 redirect_url 页面
export default {
  computed: {
    // 分离 url 中的 code 查询字符串
    code () {
      return location.href.replace('?', '').split('&')[0].split('=')[1] || ''
    }
  },

  mounted () {
    console.log('[OAuth]: current code', this.code)
    // 排出 hash 路由的影响，传递 code 至新页面
    this.$router.push(`/activity?code=${this.code}`)
  },

  render (h) {
    return h('section', `current code is ${this.code}`)
  }
}
