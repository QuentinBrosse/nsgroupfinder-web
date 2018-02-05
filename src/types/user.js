// @flow

export type FirebaseUserOpti = {
  uid: string,
  avatarUrl: string,
  displayName: string,
  email: string,
  facebookLink: string,
};

export type MemberStatus = 'pending' | 'confirmed' | 'refused' | 'admin';

export type MemberAgeRange =
  | { min: number }
  | { max: number }
  | { min: number, max: number };

export type Member = {
  id: string,
  groupId: string,
  adminUid: string,
  message?: string | null,
  status: MemberStatus,
  user: FirebaseUserOpti,
  createdAt: Date,
  statusUpdatedAt: null | Date,
  obsolete: boolean,
  paid: boolean,
  ticketUnits: number,
  firstName: string,
  lastName: string,
  ageRange: MemberAgeRange,
  gender: 'male' | 'female',
  facebookAppId: string,
  facebookLink: string,
  email: string,
  displayName: string,
  avatarUrl: string,
};
