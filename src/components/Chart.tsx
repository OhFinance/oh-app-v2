import { SymbolOverview, SymbolOverviewWidgetProps } from 'react-tradingview-embed';
import styles from '~/components/__styles__/Chart.module.css';

export default function Chart({ width, height }: SymbolOverviewWidgetProps) {
  return (
    <div className={styles['chart']}>
      <SymbolOverview
        widgetProps={{ width, height, symbols: ['ETHUSD', 'BTCUSD'], theme: 'dark' } as never}
      />
    </div>
  );
}
