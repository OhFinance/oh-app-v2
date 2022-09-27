interface StakingItemProps {
  tokenTicker: string;
  tokenIcon: string;
}

export default function StakingItem(props: StakingItemProps) {
  return <div>token: {props.tokenTicker}</div>;
}
