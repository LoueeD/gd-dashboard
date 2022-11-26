import feather from 'feather-icons';

export const useIcon = () => {
  const getIcon = (icon: string) => {
    if (!feather.icons[icon]) return;
    return feather.icons[icon].toSvg();
  };

  return {
    getIcon,
    feather,
  };
};
