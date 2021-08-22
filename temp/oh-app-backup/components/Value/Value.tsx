import { Typography } from "@material-ui/core"
import { FC } from "react"

export interface ValueProps {
  value: string | number;
  title?: string;
}

export const Value: FC<ValueProps> = ({
  value,
  title
}) => {
  return (
    <Typography variant='body1' >
      {typeof value === 'string' ? (
        value
      ) : (
        <div>
          {value}
        </div>
      )}
    </Typography>
  )
}
