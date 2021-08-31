import { SymbolOverview, SymbolOverviewWidgetProps } from 'react-tradingview-embed';

export function Chart({ width, height }: SymbolOverviewWidgetProps) {
  return (
    <SymbolOverview
      widgetProps={{ width, height, symbols: ['ETHUSD', 'BTCUSD'], theme: 'dark' } as never}
    />
  );
}
