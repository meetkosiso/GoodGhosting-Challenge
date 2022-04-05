import { contractProvider } from "../providers/contract";
import { IPlayer } from "../interfaces/game";
const { GoodGhostingWhitelisted } = require("../abi/GoodGhostingWhitelisted");

export async function getPlayerService(address: string): Promise<IPlayer> {
  const { contractInstance } = contractProvider(
    GoodGhostingWhitelisted,
    process.env.CONTRACT_ADDRESS || "",
    process.env.NETWORK_PROVIDER || ""
  );
  const {
    addr,
    withdrawn,
    canRejoin,
    mostRecentSegmentPaid,
    amountPaid,
  } = await contractInstance.methods.players(address).call();

  if (addr.indexOf("0x00") !== -1) {
    throw "Player does not exist on the game";
  }

  return { addr, withdrawn, canRejoin, mostRecentSegmentPaid, amountPaid };
}

export async function getCurrentSegmentService(): Promise<
  Record<string, number>
> {
  const { contractInstance, web3 } = contractProvider(
    GoodGhostingWhitelisted,
    process.env.CONTRACT_ADDRESS || "",
    process.env.NETWORK_PROVIDER || ""
  );

  const firstSegmentStart = await contractInstance.methods
    .firstSegmentStart()
    .call();
  const segmentLength = await contractInstance.methods.segmentLength().call();

  const blockNumber = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(blockNumber);

  const currentSegment =
    ((block.timestamp as number) - parseInt(firstSegmentStart, 10)) /
    parseInt(segmentLength, 10);

  return {
    currentSegment: parseInt(currentSegment.toString(), 10),
  };
}
