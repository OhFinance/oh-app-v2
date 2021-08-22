import { useMobile } from "@ohfinance/oh-ui";
import { Surface } from "components/Surface";
import { ViewHeader } from "components/ViewHeader";
import { ViewWrapper } from "components/ViewWrapper";
import { EarnContextProvider } from "contexts/EarnContext";
import { EarnData } from "./components/EarnData";
import { EarnSettings } from "./components/EarnSettings";

const Earn = () => {
  return (
    <EarnContextProvider>
      <ViewWrapper>
        <ViewHeader
          title="Earn"
          subtitle="Diversified strategies to do more with your DeFi Dollar"
        />
        <EarnSettings />
        <EarnData />
      </ViewWrapper>
    </EarnContextProvider>
  );
};

export default Earn;