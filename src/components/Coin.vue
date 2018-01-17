<template>
    <div class="container coin-page">
        <div class="coin-left">
            <img v-bind:src="getCoinImage(coinData.symbol)">
            <h1>{{ coinData.name }}</h1>
            <p class="coin-rank">#{{ coinData.rank }}</p>
            <p>Lorem ipsum dolor sit amet, his eu lorem definitiones, per eu exerci timeam forensibus. No alii wisi atqui eam, omittam conceptam maiestatis ea vel. Ei ius elitr facilis, pri id semper essent. Integre petentium sententiae an est. Duis legere in sit, alia expetendis id has. Utroque hendrerit eos ut, mucius minimum intellegat duo at, meliore maluisset sea an.</p>
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
import axios from 'axios';

let cryptoCompare = "https://www.cryptocompare.com";
let coinmarketcapApi = "https://api.coinmarketcap.com";
let cryptocompareApi = "https://min-api.cryptocompare.com";
let updateInterval = 10 * 1000;

export default {
  name: 'Coin',

  data() {
      return {
          price: [],
          coinData: {},
          imageData: {}
      }
  },

  methods: {

      /**
       * Get price data for the current coin
       */
      getPrice: function(symbol) {
          let self = this;

          axios.get(cryptocompareApi + `/data/price?fsym=${symbol}&tsyms=USD`)
            .then((resp) => {
                this.price = resp.data;
            })
            .catch((err) => {
                console.error(err);
            })
      },

      getCoinData: function() {
            let self = this;

            axios.get(coinmarketcapApi + `/v1/ticker/${this.$route.params.id}/`)
                .then((resp) => {
                    this.coinData = resp.data[0];
                    this.getPrice(this.coinData.symbol)
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        getImageData: function() {
            let self = this;

            axios.get(cryptocompareApi + "/data/all/coinlist")
                .then((resp) => {
                    this.imageData = resp.data.Data;
                    this.getCoinData();
                })
                .catch((err) => {
                    this.getCoinData();
                    console.error(err);
                });
        },

        getCoinImage: function(symbol) {
            if (this.imageData[symbol]) {
                return cryptoCompare + this.imageData[symbol].ImageUrl;
            }
        }
  },

  created() {
      this.getImageData();
      setInterval(() => {
          this.getPrice(this.coinData.symbol);
      }, updateInterval);
  }
}
</script>

<style lang="scss" scoped>
    .coin-page {
        display: flex;
        flex-direction: row;
        height: 100vh;
        margin-top: -60px;
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
