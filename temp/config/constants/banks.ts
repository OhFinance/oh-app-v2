/* import aave from '@/img/aave.svg';
import comp from '@/img/comp.svg';
import crv from '@/img/crv.svg';
import usdc from '@/img/usdc.svg'; */
import { Bank } from './types';

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
