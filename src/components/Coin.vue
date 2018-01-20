<template>

    <div class="container coin-page">
      <router-link tag="div" to="/" class="back-button">
        <icon name="chevron-left"></icon>
        <span>Back</span>
      </router-link>
      <div class="coin-left">
        <img v-bind:src="'static/images/128/' + coinData.symbol.toLowerCase() + '.png'">
        <h1>{{ coinData.name }} <strong>{{ coinData.symbol }}</strong></h1>
        <p class="coin-rank">Rank #{{ coinData.rank }}</p>
        <!-- <a v-bind:href="'https://www.cryptocompare.com' + cryptoCompareData[coinData.symbol].Url" target="_blank"><icon name="globe"></icon></a> -->
      </div>
      <div class="coin-right">
        <h2>Current Price (USD)</h2>
        <p>{{ coinData.price_usd | currency}} <span class="percent-change" v-bind:style="getColor(coinData.percent_change_24h)"><span v-if="coinData.percent_change_24h > 0">+</span>{{ coinData.percent_change_24h }}%</span></p>
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

let coinmarketcapApi = 'https://api.coinmarketcap.com'
let updateInterval = 60 * 1000

export default {
  name: 'Coin',
  components: {
    Icon
  },

  data () {
    return {
      price: [],
      coinData: {}
    }
  },

  methods: {

    getCoinData: function () {
      let self = this

      axios.get(coinmarketcapApi + `/v1/ticker/${this.$route.params.id}/`)
        .then((resp) => {
          self.coinData = resp.data[0]
        })
        .catch((err) => {
          console.error(err)
        })
    },

    /**
      * Colour red or green for negative or positive values
      */
    getColor: (num) => {
      return num > 0 ? 'color: #00d174' : 'color: #fb2853'
    }
  },

  created () {
    this.getCoinData()
    setInterval(() => {
      this.getCoinData(this.coinData.symbol)
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
    @media screen and (max-width: 1000px) {
      height: 1em;
      margin-right: 10px;
    }
  }
  span {
    font-size: 14px;
    margin-top: 10px;
    @media screen and (max-width: 1000px) {
      margin-top: 0;
    }
  }
  @media screen and (max-width: 1400px) and (min-width: 1001px) {
    margin-left: 0;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 18px;
    margin-left: 0;
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
    .percent-change { font-size: 0.8em; }
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
