export const useClickOutside = () => {
  function clickOutside(el: HTMLElement, callback: () => void) {
    const click = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !el.contains(e.target)) {
        window.removeEventListener('click', click);
        callback();
      }
    };
    window.addEventListener('click', click);
    return click;
  }

  return {
    clickOutside,
  };
};
