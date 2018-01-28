// @flow

import type { MemberStatus, FirebaseUserOpti } from './user';
import type { FirebaseStationOpti } from './station';

export type RequestStatus = null | MemberStatus;

export type Group = {
  id?: string,
  admin: FirebaseUserOpti,
  arrivalStation: FirebaseStationOpti,
  departureStation: FirebaseStationOpti,
  createdAt: Date,
  dateTime: Date,
  info: string,
  pendingRequests: number,
};
