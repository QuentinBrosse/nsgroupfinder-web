// @flow

import { throwDissmissSnackbar, throwAccentSnackbar } from 'actions/snackbar';
import { logErrorIfDevEnv } from 'utils/env';
import { getUserFromAuth } from 'utils/user';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirebase } from 'react-redux-firebase';

export default async (
  dispatch: Function,
  groupId: string,
  auth: Object,
  profile: Object,
  message: string,
  ticketUnits: number | string
) => {
  const db = getFirebase().firestore();
  try {
    const groupRef = db.collection('groups').doc(groupId);
    const membersRef = db.collection('members').doc();
    await db.runTransaction(async transaction => {
      const group = await transaction.get(groupRef);
      if (!group.exists) {
        dispatch(throwAccentSnackbar('Ooops, this group does not exist.'));
        throw new Error('Document does not exist!');
      }
      const { obsolete: groupObsolete, pendingRequests, admin } = group.data();
      transaction.update(groupRef, { pendingRequests: pendingRequests + 1 });

      const payload = {
        user: getUserFromAuth(auth, profile),
        groupId,
        adminUid: admin.uid,
        status: 'pending',
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        statusUpdatedAt: null,
        obsolete: groupObsolete,
        paid: false,
        ticketUnits: parseInt(ticketUnits, 10) || 1,
      };
      transaction.set(membersRef, payload);
    });
    const successMessage = 'Your request has been sent to the group creator !';
    dispatch(throwDissmissSnackbar(successMessage));
  } catch (err) {
    logErrorIfDevEnv(err);
    const errorMessage = 'Ooops, try again later please :/';
    dispatch(throwAccentSnackbar(errorMessage));
    throw new Error(errorMessage);
  }
};
