// All Bunono campus photos (optimized .webp). These are used ONLY on the
// Bunono campus site — never on Nalugala. Auto-collected so new bunono-NN.webp
// files are picked up without editing this list.
const modules = import.meta.glob('./bunono-*.webp', { eager: true })

export const bunonoPhotos = Object.keys(modules)
  .sort()
  .map((k) => modules[k].default)
