export default (action$, store, { getFirebase }) =>
  action$
    .ofType('SOMETHING')
    .map(() => getFirebase().push('somePath/onFirebase', { some: 'data' }));
