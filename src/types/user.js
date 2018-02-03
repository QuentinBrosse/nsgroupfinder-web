// @flow

export type Profile = {
  +avatarUrl: string,
  +displayName: string,
  +email: string,
};

export type FirebaseUserOpti = {
  uid: string,
  avatarUrl: string,
  displayName: string,
  email: string,
};

export type MemberStatus = 'pending' | 'confirmed' | 'refused' | 'admin';

export type Member = {
  id: string,
  groupId: string,
  adminUid: string,
  message?: string | null,
  status: MemberStatus,
  user: FirebaseUserOpti,
  createdAt: Date,
  confirmedAt: null | Date,
  obsolete: boolean,
  paid: boolean,
  +ticketUnits: number,
};
