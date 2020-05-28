export interface Counterparty {
  id: number;
  name: string;
  type: string;
  vaan: string;
  bic: string;
  birth: {birthTown: string, birthCountry: string, birthDate: string};
  jurIds: JurID[];
  natIds: NatID[];
  postalAddress: PostalAddress;
}

export interface JurID {
  country: string;
  idStr: string;
  idType: number;
  issuer: string;
}

export interface NatID {
  country: string;
  idStr: string;
  idType: number;
  issuer: string;
}

export interface PostalAddress {
  adrline: string;
  country: string;
  number: string;
  postCode: string;
  street: string;
  town: string;
}
