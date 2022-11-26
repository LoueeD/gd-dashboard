export const useOmni = () => {
  const omnibox = useState('omnibox', () => ({
    visible: false,
  }));

  return {
    omnibox,
  };
};
