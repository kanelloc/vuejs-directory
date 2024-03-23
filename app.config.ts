export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    tooltip: {
      base: '[@media(pointer:coarse)]:hidden h-auto px-2 py-1 text-xs font-normal',
      popper: { placement: 'top' },
    },
  },
});
