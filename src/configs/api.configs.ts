import {AbortSignal} from 'abort-controller';
// import mockApi from './api.mock.json';
import {UserProfile} from '../store/user/user.types';

const API = 'http://192.168.0.94:9009/api';

// function mockTimeOut(abort: AbortSignal, shouldFail: boolean = false) {
//   return new Promise((res, rej) => {
//     const wait = setTimeout(() => {
//       if (abort.aborted) {
//         rej(new Error('abort error: from mockTimeOut'));
//         clearTimeout(wait);
//       }
//       if (shouldFail) {
//         rej(new Error('fail error: from mockTimeOut'));
//         clearTimeout(wait);
//       }
//       res(true);
//       clearTimeout(wait);
//     }, Math.pow(60, 2) * 1.5);
//   });
// }

async function getRes(res: Response) {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.errors[0].message || json.errors[0].error);
  }
  return json.data;
}

export async function getFridayPraying(abort: AbortSignal) {
  try {
    // const result = await mockTimeOut(abort);
    // if (result) {
    //   return mockApi['friday-praying'].get;
    // }
    return fetch(`${API}/friday-praying`, {
      method: 'GET',
      // @ts-ignore
      signal: abort,
    }).then(getRes);
  } catch (err) {
    throw err;
  }
}

export async function getFridayPrayingForUser(
  abort: AbortSignal,
  data: {token: string},
) {
  try {
    // const result = await mockTimeOut(abort);
    // if (result) {
    //   return mockApi['friday-praying'].post;
    // }
    return fetch(`${API}/friday-praying`, {
      method: 'POST',
      // @ts-ignore
      signal: abort,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(getRes);
  } catch (err) {
    throw err;
  }
}

export async function createPrayer(
  abort: AbortSignal,
  data: UserProfile & {token: string},
) {
  try {
    // await mockTimeOut(abort);
    // return mockApi['create-prayer'].post;
    const {phoneNumber, ...userInfo} = data;
    return fetch(`${API}/create-prayer`, {
      method: 'POST',
      // @ts-ignore
      signal: abort,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...userInfo, phone: phoneNumber}),
    }).then(getRes);
  } catch (err) {
    throw err;
  }
}

export async function updatePrayer(
  abort: AbortSignal,
  data: UserProfile & {token: string},
) {
  try {
    // await mockTimeOut(abort);
    // return mockApi['update-prayer'].post;
    const {phoneNumber, ...userInfo} = data;
    return fetch(`${API}/update-prayer`, {
      method: 'POST',
      // @ts-ignore
      signal: abort,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...userInfo, phone: phoneNumber}),
    }).then(getRes);
  } catch (err) {
    throw err;
  }
}

export async function deletePrayer(
  abort: AbortSignal,
  data: {
    token: string;
  },
) {
  try {
    // const result = await mockTimeOut(abort);
    // if (result) {
    //   return mockApi['delete-prayer'].delete;
    // }

    return fetch(`${API}/delete-prayer/${data.token}`, {
      method: 'DELETE',
      // @ts-ignore
      signal: abort,
    }).then(getRes);
  } catch (err) {
    throw err;
  }
}
