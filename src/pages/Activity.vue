<template>
  <section class="pages__activity">{{code}}</section>
</template>

<script>
export default {
  name: 'activity',

  computed: {
    code () {
      return this.$route.query.code
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
