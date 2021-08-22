import { Suspense, FC, ReactElement } from "react"

export interface ErrorHandledSuspenseProps {
  fallback: ReactElement;
}

export const ErrorHandledSuspense: FC<ErrorHandledSuspenseProps> = ({
  fallback,
  children
}) => {

  

  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}
