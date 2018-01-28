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
  groupId: string,
  adminUid: string,
  message?: string | null,
  status: MemberStatus,
  user: FirebaseUserOpti,
  createdAd: Date,
};
