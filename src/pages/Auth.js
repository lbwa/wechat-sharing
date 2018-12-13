// 微信网页授权获取 code 的 redirect_url 页面，本路由用于调整 url
export default {
  computed: {
    // 分离 url 中的 code 查询字符串
    code () {
      return location.href.replace('?', '').split('&')[0].split('=')[1] || ''
    }
  },

  methods: {
    reloadPage () {
      // 调整 url 为标准 hash 路由，传递 code 至新页面
      window.location.href = window.location.href
        .replace(/\/\?/, '/#/activity?') // 插入 hash 路由标识
        .replace(/#\/auth$/, '') // 移除末尾的 hash 路由标识
    }
  },

  mounted () {
    this.reloadPage()
  },

  render (h) {
    return h('section', `current code is ${this.code}`)
  }
}
