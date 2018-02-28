// @flow

import services from 'config/services';
import { getFirebase } from 'react-redux-firebase';
import type { FetchResponse, FetchRequest } from 'types/api';

async function fetchApi({
  endPoint,
  method = 'GET',
  payload = {},
  extraHeaders = {},
}: FetchRequest): Promise<FetchResponse> {
  const url = `${services.baseApiUrl}/${endPoint}`;

  let defaultHeaders = {
    'Accept-Encoding': 'gzip, deflate',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    const idToken = await getFirebase()
      .auth()
      .currentUser.getIdToken(true);

    if (idToken) {
      defaultHeaders = {
        ...defaultHeaders,
        Authorization: `Bearer ${idToken}`,
      };
    }
    const headers = { ...defaultHeaders, ...extraHeaders };

    const body = ['GET', 'HEAD'].includes(method)
      ? null
      : JSON.stringify(payload);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const responseText = await response.text();

    if (responseText.length === 0) {
      if (response.ok) {
        return { data: {}, error: null };
      }
      throw new Error(`Server error: ${response.status}`);
    }

    const responseBody = await JSON.parse(responseText);
    if (response.ok) {
      return { data: responseBody.data, error: null };
    }

    if (responseBody.error) {
      throw responseBody.error;
    }

    throw new Error(`Server error: ${response.status}`);
  } catch (error) {
    return { data: null, error };
  }
}

export default fetchApi;
