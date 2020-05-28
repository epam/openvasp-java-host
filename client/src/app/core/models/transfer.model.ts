import { Beneficiary } from './beneficiart.model';
import { Counterparty } from './counterparty.model';
import { Originator } from './originator.model';

export interface Transfer {
  amount: number;
  assetType: string;
  beneficiary: Beneficiary;
  counterpartyVasp: Counterparty;
  created: string;
  destAddr: string;
  id: number;
  originator: Originator;
  sendAddr: string;
  sessionId: string;
  sessionReplyCode: number;
  trStatus: string;
  trType: string;
  transferReplyCode: number;
  txHash: string;
  updated: string;
  commentary: string;
}

export interface TransferResponse {
  content: Transfer[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    sort: {sorted: boolean, unsorted: boolean, empty: boolean},
    pageNumber: number, pageSize: number, offset: number, paged: boolean, unpaged: boolean
  };
  size: number;
  sort: {sorted: boolean, unsorted: boolean, empty: boolean};
  totalElements: number;
  totalPages: number;
}

export interface CreateTransferData {
  amount: number;
  asset: string;
  beneficiaryId: number;
  originatorId: number;
  destAddr: string;
  sendAddr: string;
  txHash: string;
}

export interface TransferDialogData {
  transfer: Transfer | {};
  title: string;
}

export enum TransferType {
  incoming = 'INCOMING',
  outgoing =  'OUTGOING'
}

export enum TransferStatus {
  pending = 'PENDING',
  approved = 'APPROVED',
  rejected = 'REJECTED',
  investigation = 'INVESTIGATION',
  created = 'CREATED'
}
