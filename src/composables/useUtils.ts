export const useUtils = () => {
  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString();

  const swapArrayElements = <T>(
    array: T[],
    index1: number,
    index2: number
  ): void => {
    if (!array[index2]) return;
    array[index1] = array.splice(index2, 1, array[index1])[0];
  };

  return {
    formatDate,
    swapArrayElements,
  };
};
