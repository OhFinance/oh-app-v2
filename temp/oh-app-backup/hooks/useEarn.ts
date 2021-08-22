import { EarnContext } from "contexts/EarnContext";
import { useContext } from "react"


const useEarn = () => {
  const earn = useContext(EarnContext)

  return earn
}

export default useEarn;