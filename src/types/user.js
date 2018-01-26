// @flow

export type Profile = {
  +avatarUrl: string,
  +displayName: string,
  +email: string,
};

export type FirebaseUserObject = {
  uid: string,
  avatarUrl: string,
  displayName: string,
  email: string,
};

export type MemberStatus = 'pending' | 'confirmed' | 'refused';
