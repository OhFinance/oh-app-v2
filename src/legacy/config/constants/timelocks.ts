import { Address } from './types';

export interface Timelock {
  name: string;
  lockPeriod: number; // emission peiod after cliff in seconds
  address?: Address;
}

export const timelocks: Timelock[] = [
  // Seed & Private
  {
    name: 'Vesting',
    lockPeriod: 20736000,
    address: {
      1: '0xa420B99eCa98e9e1ED2af0F9B1AC313c3CE20F61',
      4: '0x253Ce5d0F197683d49bB2d9A08fe584Bbd19A3C0',
      42: '0xcf42868A0E8AAECddf3b25ed04c3871c5bCb839e',
    },
  },
  // Foundation
  {
    name: 'Foundation',
    lockPeriod: 124416000,
    address: {
      1: '0xb11f5Fe6f9946429f250f6e4EC75e2B11477B351',
      4: '0xbE442aeC7625F275C4ED22145158EC84775b7455',
      42: '0x6936553eAcc97De75bbEfE6c34F63B4de0956c6b',
    },
  },
  // Advisors, Strategic, Community
  {
    name: 'Growth',
    lockPeriod: 31104000,
    address: {
      1: '0xe0C9C8860291338C160D43616d1A6eE88Dfef5a7',
      4: '0x2c9A79C6D05cB061bc00EBd3F412C3C892748c8f',
      42: '0x6Da30B09763f54ff35daB317a0C987B0276F50FF',
    },
  },
  // Legal
  {
    name: 'Legal',
    lockPeriod: 12960000,
    address: {
      1: '0xcD564A9108d267A8A3Ff2baa9520A004eCeC1151',
      4: '0xa89106dDd797Bc7C615900120116a1c294C3Cc80',
      42: '0x8736A652f476162d6C38935B1FBfD4895BB1bcD2',
    },
  },
];
