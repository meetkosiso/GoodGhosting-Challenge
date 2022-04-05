export interface IPlayer {
  addr: string;
  withdrawn: boolean;
  canRejoin: boolean;
  mostRecentSegmentPaid: string;
  amountPaid: string;
}
