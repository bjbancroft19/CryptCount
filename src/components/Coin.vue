<template>

    <div class="container coin-page">
      <router-link tag="div" to="/" class="back-button">
        <icon name="chevron-left"></icon>
        <span>Back</span>
      </router-link>
      <div class="coin-left">
        <img v-bind:src="getCoinImage(coinData.symbol)">
        <h1>{{ coinData.name }} <strong>{{ coinData.symbol }}</strong></h1>
        <p class="coin-rank">Rank #{{ coinData.rank }}</p>
        <a v-bind:href="'https://www.cryptocompare.com' + cryptoCompareData[coinData.symbol].Url" target="_blank"><icon name="globe"></icon></a>
      </div>
      <div class="coin-right">
        <h2>Current Price (USD)</h2>
        <p>{{ price.USD | currency}}</p>
        <h2>Circulating Supply</h2>
        <p>{{ coinData.available_supply | currency('', 0) }} {{ coinData.symbol }}</p>
        <h2>Market Cap (USD)</h2>
        <p>{{ coinData.market_cap_usd | currency }}</p>
      </div>
    </div>

</template>

<script>
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

let cryptoCompare = 'https://www.cryptocompare.com'
let coinmarketcapApi = 'https://api.coinmarketcap.com'
let cryptocompareApi = 'https://min-api.cryptocompare.com'
let updateInterval = 10 * 1000

export default {
  name: 'Coin',
  components: {
    Icon
  },

  data () {
    return {
      price: [],
      coinData: {},
      cryptoCompareData: {}
    }
  },

  methods: {

    /**
     * Get price data for the current coin
     */
    getPrice: function (symbol) {
      let self = this

      axios.get(cryptocompareApi + `/data/price?fsym=${symbol}&tsyms=USD`)
        .then((resp) => {
          self.price = resp.data
        })
        .catch((err) => {
          console.error(err)
        })
    },

    getCoinData: function () {
      let self = this

      axios.get(coinmarketcapApi + `/v1/ticker/${this.$route.params.id}/`)
        .then((resp) => {
          self.coinData = resp.data[0]
          self.getPrice(this.coinData.symbol)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    getCryptoCompareData: function () {
      let self = this

      axios.get(cryptocompareApi + '/data/all/coinlist')
        .then((resp) => {
          self.cryptoCompareData = resp.data.Data
          self.getCoinData()
        })
        .catch((err) => {
          self.getCoinData()
          console.error(err)
        })
    },

    getCoinImage: function (symbol) {
      if (this.cryptoCompareData[symbol]) {
        return cryptoCompare + this.cryptoCompareData[symbol].ImageUrl
      }
    }
  },

  created () {
    this.getCryptoCompareData()
    setInterval(() => {
      this.getPrice(this.coinData.symbol)
    }, updateInterval)
  }
}
</script>

<style lang="scss" scoped>
.back-button {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  margin-left: -50px;
  .fa-icon {
    height: 1.6em;
    width: auto;
    margin-right: 5px;
  }
  span {
    font-size: 14px;
    margin-top: 10px;
  }
  @media screen and (max-width: 1400px) and (min-width: 1001px) {
    margin-left: 0;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.coin-page {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
  @media screen and (max-width: 1000px) {
    margin-top: 60px;
    flex-direction: column;
  }
  .coin-left, .coin-right {
    width: 50%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    @media screen and (max-width: 1000px) {
      width: 100%;
      padding: 0 10%;
    }
  }
  .coin-left {
    text-align: center;
    padding: 0 8%;
    .coin-rank {
      margin-top: 0;
      font-size: 18px;
    }
    a {
      display: block;
      color: inherit;
      align-self: center;
      &:hover {
        .fa-icon { fill: #53346d; }
      }
      .fa-icon {
        transition: .3s ease;
        height: 2em;
        width: auto;
      }
    }
    p { font-size: 14px; }
    h1 {
      font-size: 3em;
      margin: 0 0 .3em;
    }
    img {
      align-self: center;
      max-width: 150px;
      margin-bottom: 30px;
    }
    @media screen and (max-width: 1000px) {
      margin-bottom: 60px;
    }
  }
  .coin-right {
    padding: 0 10%;
    box-sizing: border-box;
    h2 {
      font-size: 18px;
      margin: 0 0;
    }
    p {
      font-size: 2.5em;
      margin: 0;
      margin-bottom: 1em;
      @media screen and (max-width: 1000px) {
        font-size: 2em;
      }
    }
    @media screen and (max-width: 1000px) {
      text-align: center;
      padding: 0;
    }
  }
}
</style>
