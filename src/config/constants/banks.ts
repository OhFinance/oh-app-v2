import { Bank } from './types';
import aave from 'assets/img/aave.svg';
import comp from 'assets/img/comp.svg';
import crv from 'assets/img/crv.svg';
import usdc from 'assets/img/usdc.svg';

const banks: Bank[] = [
  {
    image: usdc,
    symbol: 'Oh! USDC',
    description: 'Risk-Optimized Lending and Yield Farming',
    alt: 'oh-usdc',
    underlying: usdc,
    composition: [aave, comp, crv],
  },
];

export default banks;
