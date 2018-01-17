<template>
  <div id="app">
  <div class="container header">
      <div class="header-left">
          <h1>CryptoCompare</h1>
      </div>
      <div class="header-right">
          <a href="https://github.com/bjbancroft19/cryptocompare" target="_blank"><i class="fa fa-github" aria-hidden="true"></i>&nbsp;View on GitHub</a>
      </div>
  </div>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
    }
    h1 {
      text-align: left;
      margin-top: 10px;
      font-size: 1.6em;
      letter-spacing: 5px;
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

