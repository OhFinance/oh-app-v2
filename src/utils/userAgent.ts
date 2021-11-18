import { UAParser } from 'ua-parser-js';

const parser = new UAParser('undefined' !== typeof window ? window.navigator.userAgent : undefined);
const { type } = parser.getDevice();

export const userAgent = parser.getResult();

export const isMobile = type === 'mobile' || type === 'tablet';
