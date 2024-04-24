export const useUtils = () => {
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return {
    formatDate,
  };
};
