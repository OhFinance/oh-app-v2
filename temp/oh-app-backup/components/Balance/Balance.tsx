import { FC, useEffect, useRef } from "react"
import CountUp from "react-countup"

export interface BalanceProps {
  value: number;
  decimals?: number;
  delay?: number;
  suffix?: string;
}

export const Balance: FC<BalanceProps> = ({
  value,
  decimals = 3,
  delay = 1,
  suffix,
}) => {
  const previousValue = useRef(0)

  useEffect(() => {
    previousValue.current = value
  }, [value])

  return (
    <CountUp
      start={previousValue.current}
      end={value}
      decimals={decimals}
      delay={delay} 
      suffix={suffix}
      separator=","  
    />
  )
}
