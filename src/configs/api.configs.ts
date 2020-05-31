export interface PrayTime {
  date: string;
  availablePlaces: number;
}

export const fetchPrayTimes = async (signal: AbortSignal) => {
  return await new Promise<PrayTime[]>((res, rej) => {
    const timeOut = setTimeout(() => {
      res([]);
    }, 1500);

    signal.onabort = () => {
      clearTimeout(timeOut);
      rej('Aborted!');
    };
  });
};

export const sign_in = async (
  firstName: string,
  secundName: string,
  phoneNumber: string,
  signal: AbortSignal,
) => {
  return await new Promise((res, rej) => {
    const timeOut = setTimeout(() => {
      res('success!');
    }, 1500);

    signal.onabort = () => {
      clearTimeout(timeOut);
      rej('Aborted!');
    };
  });
};
