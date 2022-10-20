export const wait = async (ms: number): Promise<NodeJS.Timeout> => {
  const timeoutId = new Promise<NodeJS.Timeout>((res) => {
    const timeoutId = setTimeout(() => {
      res(timeoutId);
    }, ms);
  });
  return timeoutId;
};
