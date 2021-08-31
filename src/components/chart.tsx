import { SymbolOverview, SymbolOverviewWidgetProps } from 'react-tradingview-embed';
import styles from './__styles__/chart.module.css';

export function Chart({ width, height }: SymbolOverviewWidgetProps) {
  return (
    <div className={styles['chart']}>
      <SymbolOverview
        widgetProps={{ width, height, symbols: ['ETHUSD', 'BTCUSD'], theme: 'dark' } as never}
      />
    </div>
  );
}
