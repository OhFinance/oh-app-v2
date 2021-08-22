import random from "lodash/random";

// Array of available nodes to connect to
export const nodes = [process.env.ETH_NODE_1, process.env.ETH_NODE_2];

const getNodeUrl = () => {
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
};

export default getNodeUrl;
