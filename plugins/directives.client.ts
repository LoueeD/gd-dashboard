import feather from 'feather-icons';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('icon', {
    mounted(el, binding) {
      if (!binding.arg) if (!feather.icons[binding.arg]) return;
      el.innerHtml = feather.icons[binding.arg].toSvg();
    },
  });
});
