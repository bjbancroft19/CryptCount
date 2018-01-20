<template>
  <div id="app">
  <div class="container header">
    <div class="header-left">
      <router-link tag="h1" to="/">CryptCount</router-link>
    </div>
    <div class="header-right">
      <a href="https://github.com/bjbancroft19/cryptocompare" target="_blank"><icon name="github"></icon> &nbsp;View on GitHub</a>
    </div>
  </div>
  <router-view/>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
  name: 'App',
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.header {
    display: flex;
    flex-direction: row;
    .header-left, .header-right { width: 50%; }
    .header-left {
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
    }
    .header-right {
      @media screen and (max-width: 1000px) {
        display: none;
      }
      .fa-icon {
        height: 1.2em;
        vertical-align: sub;
        width: auto;
      }
    }
    h1 {
      text-align: left;
      margin-top: 10px;
      font-size: 1.6em;
      letter-spacing: 5px;
      cursor: pointer;
      @media screen and (max-width: 1000px) {
        text-align: center;
      }
    }
    a {
      display: block;
      color: #fff;
      text-decoration: none;
      text-align: right;
      margin-top: 10px;
    }
}
</style>
