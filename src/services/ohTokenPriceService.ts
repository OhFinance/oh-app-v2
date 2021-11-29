import axios from 'axios';

const OH_TOKEN_ETHEREUM_CONTRACT = '0x16ba8efe847ebdfef99d399902ec29397d403c30';

// TODO: we can reduce network calls by getting all the market data from one call ala getCirculatingSupply and using that
// Not sure the best way to handle that and this works so putting this on the polish list. ~ DN

export function getOhTokenPrice() {
  return axios
    .get<{ [contract: string]: { [currency: string]: number } }>(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${OH_TOKEN_ETHEREUM_CONTRACT}&vs_currencies=usd`
    )
    .then((response) => response.data[OH_TOKEN_ETHEREUM_CONTRACT].usd);
}

export function getCirculatingSupply() {
  return axios
    .get<{ [contract: string]: { [currency: string]: number } }>(
      `https://api.coingecko.com/api/v3/coins/oh-finance?market_data=true`
    )
    .then((response) => response.data.market_data.circulating_supply);
}

export function getMarketCap() {
  return axios
    .get<{ [contract: string]: { [currency: string]: number } }>(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${OH_TOKEN_ETHEREUM_CONTRACT}&vs_currencies=usd&include_market_cap=true`
    )
    .then((response) => response.data[OH_TOKEN_ETHEREUM_CONTRACT].usd_market_cap);
}

// I'm pretty sure we don't want type: any on this but I couldn't figure out a better way to access the data. Coingecko didn't have an API call specifically for TVL ~DN
export function getTVL() {
  return axios
    .get<{ [contract: string]: { [currency: string]: any } }>(
      `https://api.coingecko.com/api/v3/coins/oh-finance?market_data=true`
    )
    .then((response) => response.data.market_data.total_value_locked.usd);
}
