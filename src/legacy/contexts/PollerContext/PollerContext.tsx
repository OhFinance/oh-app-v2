import { createContext } from 'react';

export interface IPollerContext {
  slow: number;
  fast: number;
}

export const PollerContext = createContext<IPollerContext>({
  slow: 0,
  fast: 0,
});
