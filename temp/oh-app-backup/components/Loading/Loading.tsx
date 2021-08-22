import { Flex } from "@ohfinance/oh-ui";
import OhLogo from 'assets/img/oh-logo.png';

export const Loading = () => {
  return (
    <Flex center>
      <img src={OhLogo} alt='oh-loading' height={150} width="auto" />
    </Flex>
  )
}
