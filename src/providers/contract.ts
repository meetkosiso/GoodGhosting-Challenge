import Web3 from "web3";
import { AbiItem } from "web3-utils";

export function contractProvider(
  abi: AbiItem[],
  contractAddress: string,
  networkProvider: string
) {
  const web3 = new Web3(networkProvider);

  const contractInstance = new web3.eth.Contract(abi, contractAddress);

  return { contractInstance, web3 };
}
