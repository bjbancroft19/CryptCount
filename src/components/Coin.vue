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
        <h2 class="current-price-heading">Current Price (USD)</h2>
        <p class="current-price">{{ coinData.price_usd | currency}} <span class="percent-change" v-bind:style="getColor(coinData.percent_change_24h)"><span v-if="coinData.percent_change_24h > 0">+</span>{{ coinData.percent_change_24h }}%</span></p>
      </div>
      <div class="coin-right">
        <div>
          <h2><strong>Market Cap (USD)</strong></h2>
          <p>{{ coinData.market_cap_usd | currency }}</p>
        </div>
        <div>
          <h2><strong>Volume (24h)</strong></h2>
          <p>{{ coinData["24h_volume_usd"] | currency }}</p>
        </div>
        <div>
          <h2><strong>Total Supply</strong></h2>
          <p>{{ coinData.total_supply | currency('', 0) }} {{ coinData.symbol }}</p>
        </div>
        <div>
          <h2><strong>Circulating Supply</strong></h2>
          <p>{{ coinData.available_supply | currency('', 0) }} {{ coinData.symbol }}</p>
        </div>
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
      coinData: {}
    }
  },

  methods: {

    getCoinData: function () {
      let self = this

      // start progress bar
      this.$Progress.start()

      axios.get(coinmarketcapApi + `/v1/ticker/${this.$route.params.id}/`)
        .then((resp) => {
          self.coinData = resp.data[0]
          this.$Progress.finish()
        })
        .catch((err) => {
          console.error(err)
          this.$Progress.fail()
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
      height: 1.3em;
      margin-right: 10px;
    }
  }
  span {
    font-size: 14px;
    margin-top: 10px;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  @media screen and (max-width: 1400px) and (min-width: 1001px) {
    margin-left: 0;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 17px;
    margin-left: 4px;
  }
}
.coin-page {
  display: flex;
  flex-direction: row;
  height: calc(90vh - 82px);
  @media screen and (max-width: 1000px) {
    margin-top: 50px;
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
      font-size: 14px;
      background-color: rgba(255, 255, 255, 0.2);
      align-self: center;
      padding: 2px 10px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .current-price-heading {
      margin: 0;
      font-size: 16px;
    }
    .current-price {
      font-size: 1.6em;
      margin: 0;
      span { font-size: 0.8em; }
    }
    p { font-size: 14px; }
    h1 {
      font-size: 2em;
      margin: 0 0 10px;
    }
    img {
      align-self: center;
      margin-bottom: 20px;
      @media screen and (max-width: 1000px) {
        max-width: 100px;
      }
    }
    @media screen and (max-width: 1000px) {
      margin-bottom: 50px;
    }
  }
  .coin-right {
    padding: 0 5%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    .percent-change { font-size: 0.8em; }
    div {
      margin-bottom: 1.6em;
      width: 50%;
      @media screen and (max-width: 1000px) {
        width: 50%;
      }
    }
    h2 {
      font-size: 16px;
      margin: 0 0;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    p {
      font-size: 1.2em;
      margin: 0;
      padding-top: 5px;
      @media screen and (max-width: 1000px) {
        font-size: 1em;
        padding-top: 5px;
      }
    }
    @media screen and (max-width: 1000px) {
      padding: 0;
    }
  }
}
</style>
