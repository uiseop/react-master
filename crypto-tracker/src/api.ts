export function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins")
        .then((res) => res.json());
}

export function fetchInfos(coinId:string) {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then((res) => res.json());
}

export function fecthPrices(coinId:string) {
    return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then((res) => res.json());
}