<template>
  <section class="pages__activity">{{code}}</section>
</template>

<script>
import { fetchAccessToken } from 'API'

export default {
  name: 'activity',

  data () {
    return {
      accessToken: ''
    }
  },

  computed: {
    code () {
      return this.$route.query.code
    }
  },

  mounted () {
    fetchAccessToken(this.code)
      .then(res => console.log(res))
  }
}
</script>

<style lang='scss' scoped>
</style>
