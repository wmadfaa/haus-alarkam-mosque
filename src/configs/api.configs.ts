import mockApi from './api.mock.json';

function mockTimeOut(abort: AbortSignal, shouldFail: boolean = false) {
  return new Promise((res, rej) => {
    const wait = setTimeout(() => {
      if (abort.aborted) {
        rej(new Error('abort error: from mockTimeOut'));
        clearTimeout(wait);
      }
      if (shouldFail) {
        rej(new Error('fail error: from mockTimeOut'));
        clearTimeout(wait);
      }
      res(true);
      clearTimeout(wait);
    }, Math.pow(60, 2) * 1.5);
  });
}

export async function getFridayPraying(abort: AbortSignal) {
  try {
    const result = await mockTimeOut(abort);
    if (result) {
      return mockApi['friday-praying'].get;
    }
  } catch (err) {
    throw err;
  }
}

export async function getFridayPrayingForUser(
  abort: AbortSignal,
  _data: {token: string},
) {
  try {
    const result = await mockTimeOut(abort);
    if (result) {
      return mockApi['friday-praying'].post;
    }
  } catch (err) {
    throw err;
  }
}

export async function createPrayer(
  abort: AbortSignal,
  _data: {
    phone: string;
    firstName: string;
    lastName: string;
    reservePrayingTime: Date;
    token: string;
  },
) {
  try {
    const result = await mockTimeOut(abort);
    if (result) {
      return mockApi['create-prayer'].post;
    }
  } catch (err) {
    throw err;
  }
}

export async function deletePrayer(
  abort: AbortSignal,
  _data: {
    token: string;
  },
) {
  try {
    const result = await mockTimeOut(abort);
    if (result) {
      return mockApi['delete-prayer'].delete;
    }
  } catch (err) {
    throw err;
  }
}
