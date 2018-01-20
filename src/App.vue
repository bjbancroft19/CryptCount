<template>
  <div id="app">

  <div class="container header">
    <div class="header-left">
      <router-link tag="h1" to="/">CryptCount</router-link>
    </div>
    <div class="header-right">
      <a href="https://github.com/bjbancroft19/cryptocompare" target="_blank"><icon class="github-icon" name="github"></icon> <span class="github-text">&nbsp;View on GitHub</span></a>
    </div>
  </div>

  <div class="top-bar">
    <p><strong>Market Cap:</strong> {{ globalData.total_market_cap_usd | currency }}</p>
    <p><strong>Total Volume (24h):</strong> {{ globalData.total_24h_volume_usd | currency('', 0) }}</p>
  </div>

  <router-view/>
  <vue-progress-bar/>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'

// The API for currency prices. https://coinmarketcap.com/api/
let coinmarketcapApi = 'https://api.coinmarketcap.com'

// Send request every x milliseconds
let updateInterval = 60 * 1000

export default {
  name: 'App',
  components: {
    Icon
  },

  data () {
    return {
      globalData: []
    }
  },

  methods: {

    /**
      * Get global data for cryptocurrency market
      */
    getGlobalData: function () {
      let self = this

      axios.get(coinmarketcapApi + '/v1/global/')
        .then((resp) => {
          self.globalData = resp.data
        })
        .catch((err) => {
          console.error(err)
        })
    }

  },

  created () {
    this.getGlobalData()
    setInterval(() => {
      this.getGlobalData()
    }, updateInterval)
  }

}
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.top-bar {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 14px;
  text-align: center;
  padding: 5px 0;
  p {
    margin: 0;
    display: inline-block;
    &:first-child {
      margin-right: 80px;
      @media screen and (max-width: 625px) {
        margin-right: 0;
        margin-bottom: 5px;
      }
    }
  }
}
.header {
  display: flex;
  flex-direction: row;
  position: relative;
  .header-left, .header-right { width: 50%; }
  .header-left {
    @media screen and (max-width: 1000px) {
      width: 100%;
    }
  }
  .header-right {
    .github-text {
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }
    @media screen and (max-width: 1000px) {
      width: initial;
      position: absolute;
      right: 8px;
    }
    .fa-icon {
      height: 1.2em;
      vertical-align: sub;
      width: auto;
      @media screen and (max-width: 1000px) {
        height: 1.6em;
        vertical-align: middle;
      }
    }
  }
  h1 {
    text-align: left;
    margin: 10px 0;
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
    line-height: 53px;
    @media screen and (max-width: 820px) {
      line-height: 50px;
    }
  }
}
</style>
