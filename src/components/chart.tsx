import { SymbolOverview, SymbolOverviewWidgetProps } from 'react-tradingview-embed';

export function Chart({ width, height }: SymbolOverviewWidgetProps) {
  return (
    <div className={styles['chart']}>
      <SymbolOverview
        widgetProps={{ width, height, symbols: ['ETHUSD', 'BTCUSD'], theme: 'dark' } as never}
      />
    </div>
  );
}
