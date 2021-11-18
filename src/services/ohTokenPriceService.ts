import axios from 'axios';

const OH_TOKEN_ETHEREUM_CONTRACT = '0x16ba8efe847ebdfef99d399902ec29397d403c30';

export function getOhTokenPrice() {
  return axios
    .get<{ [contract: string]: { [currency: string]: number } }>(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${OH_TOKEN_ETHEREUM_CONTRACT}&vs_currencies=usd`
    )
    .then((response) => response.data[OH_TOKEN_ETHEREUM_CONTRACT].usd);
}
