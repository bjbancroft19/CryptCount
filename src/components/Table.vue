<template>
  <div id="table">

  <div class="container opening">
    <p>Top 100 Cryptocurrencies by Market Cap</p>
    <p>Select a currency to see more details</p>
  </div>

  <table class="table table-hover">

    <thead>
      <tr>
        <td>Rank</td>
        <td>Name</td>
        <td>Symbol</td>
        <td>24h</td>
        <td>Price (USD)</td>
        <td>Circulating Supply</td>
        <td>Market Cap (USD)</td>
      </tr>
    </thead>

    <tbody>
      <router-link v-for="coin in coins" :key="coin.id" tag="tr" v-bind:to="coin.id">
        <td>{{ coin.rank }}</td>
        <td><img v-bind:src="getCoinImage(coin.symbol)"> &nbsp;{{ coin.name }}</td>
        <td>{{ coin.symbol }}</td>
        <td v-bind:style="getColor(coin.percent_change_24h)">
          <span v-if="coin.percent_change_24h > 0">+</span>{{ coin.percent_change_24h }}%
        </td>
        <td>{{ coin.price_usd | currency }}</td>
        <td>{{ coin.available_supply | currency('', 0) }} {{ coin.symbol }}</td>
        <td>{{ coin.market_cap_usd | currency }}</td>
      </router-link>
    </tbody>

  </table>

  </div>
</template>

<script>
import axios from 'axios'

// The API for metadata about each currency, used for images. https://min-api.cryptocompare.com/data/
let cryptocompareApi = 'https://min-api.cryptocompare.com'
let cryptoCompare = 'https://www.cryptocompare.com'

// The API for currency prices. https://coinmarketcap.com/api/
let coinmarketcapApi = 'https://api.coinmarketcap.com'

// Send request every x milliseconds
let updateInterval = 60 * 1000

export default {
  name: 'Table',

  data () {
    return {
      coins: [],
      coinData: {}
    }
  },

  methods: {

    /**
      * Use this data for getting the symbol which we can then use later on
      * to get the logo.
      */
    getCoinData: function () {
      let self = this

      axios.get(cryptocompareApi + '/data/all/coinlist')
        .then((resp) => {
          self.coinData = resp.data.Data
          self.getCoins()
        })
        .catch((err) => {
          self.getCoins()
          console.error(err)
        })
    },

    /**
      * Get the top 100 cryptocurrencies by value. The endpoint refreshes every 5
      * minutes.
      */
    getCoins: function () {
      let self = this

      axios.get(coinmarketcapApi + '/v1/ticker/')
        .then((resp) => {
          self.coins = resp.data
        })
        .catch((err) => {
          console.error(err)
        })
    },

    /**
      * Return the currency's logo using the symbol (e.g. 'ETH')
      */
    getCoinImage: function (symbol) {
      if (this.coinData[symbol]) {
        return cryptoCompare + this.coinData[symbol].ImageUrl
      }
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
      this.getCoins()
    }, updateInterval)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.opening {
  text-align: center;
  padding: 50px 0;
  @media screen and (max-width: 820px) {
    padding: 30px 0 10px;
  }
  p:nth-child(2) {
    font-size: 12px;
  }
}
table {
  width: 100%;
  color: #fff;
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
  tr {
    line-height: 35px;
    &:nth-child(2n) {
      background-color: rgba(255,255,255,0.1);
    }
    @media screen and (max-width: 820px) {
      line-height: 30px;
    }
    td {
      padding: 10px;
      &:first-child {
        padding-left: 20px;
        @media screen and (max-width: 820px) {
          padding-left: 10px;
        }
      }
      img {
        width: 25px;
        vertical-align: middle;
        @media screen and (max-width: 820px) {
          width: 20px;
        }
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(7) {
        @media screen and (max-width: 820px) {
          display: none;
        }
      }
    }
  }
  tbody {
    tr {
      cursor: pointer;
      &:hover {
        background-color: rgba(255,255,255,0.3);
      }
    }
  }
}
</style>
