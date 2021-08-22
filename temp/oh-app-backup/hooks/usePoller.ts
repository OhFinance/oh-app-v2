import { useContext } from "react";
import { PollerContext } from "contexts/PollerContext";

const usePoller = () => {
  const { fast, slow } = useContext(PollerContext);
  return { fastRefresh: fast, slowRefresh: slow };
};

export default usePoller;
