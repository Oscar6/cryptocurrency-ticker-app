import React, { Component } from 'react';
import axios from 'axios';
import './Tickers.css';
import Cryptocurrency from './Cryptocurrency';

class Tickers extends Component {

        constructor(props) {
            super(props);
            this.state = {
                data: [
                    {
                        id: "bitcoin",
                        name: "Bitcoin",
                        symbol: "BTC",
                        image: "https://s2.coinmarketcap.com/static/img/coins/16x16/1.png",
                        price_usd: "1",
                        percent_change_1h: "0",
                        percent_change_24h: "0",
                        percent_change_7d: "0",
                    },
                    {
                        id: "ripple",
                        name: "ripple",
                        symbol: "XRP",
                        image: "https://s2.coinmarketcap.com/static/img/coins/16x16/52.png",
                        price_usd: "1",
                        percent_change_1h: "0",
                        percent_change_24h: "0",
                        percent_change_7d: "0",
                    },
                    {
                        id: "stellar",
                        name: "stellar",
                        symbol: "XLM",
                        image: "https://s2.coinmarketcap.com/static/img/coins/16x16/512.png",
                        price_usd: "1",
                        percent_change_1h: "0",
                        percent_change_24h: "0",
                        percent_change_7d: "0",
                    }
                ]
            };
        }

        componentDidMount() {
            this.fetchCryptocurrencyData();
            this.interval = setInterval(() => this.fetchCryptocurrencyData(), 10 * 1000);
        }

        fetchCryptocurrencyData() {
             axios.get("https://api.coinmarketcap.com/v1/ticker/")
                .then(response => {
                    var wanted = ["bitcoin", "ripple", "stellar"];
                    var result = response.data.filter(currency => wanted.includes(currency.id));
                    this.setState({ data: result});
                })
                .catch(err => console.log(err));
        }

        render() {
            var tickers = this.state.data.map((currency) =>
                <Cryptocurrency data={currency} key={currency.id} />
            );
            return (
                <div className="tickers-container">
                    <ul className="tickers">{tickers}</ul>
                    <p>Information updated every 10 seconds courtesy of coinmarketcap.com</p>
               </div>
            );
        }
    }

    export default Tickers;
