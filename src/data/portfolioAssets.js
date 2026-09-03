// Media grid source data.
//
// NOTE ON URLS: the links below are ibb.co *viewer page* URLs (not direct,
// hotlinkable image files), so browsers can't render them in an <img src>.
// The <AssetImage> component (src/components/ui/AssetImage.jsx) detects
// this automatically and renders a styled category placeholder instead of
// a broken image icon, so the grid always looks intentional.
//
// To show the real photos:
//   1) Open each ibb.co link -> right-click the full-size image -> "Copy
//      image address" -> you'll get a direct https://i.ibb.co/xxxx/file.jpg
//      link -> paste it in as the `url` below, OR
//   2) Drop the files into /public/assets/gallery/ (e.g. gallery/01.jpg)
//      and point `url` at "/assets/gallery/01.jpg".
export const portfolioAssets = [
  { id: 1, url: 'https://ibb.co/2YtFVJGF', category: 'hero' },
  { id: 2, url: 'https://ibb.co/wNBT1Vrq', category: 'creative' },
  { id: 3, url: 'https://ibb.co/FNcKH9F', category: 'creative' },
  { id: 4, url: 'https://ibb.co/k604yNWT', category: 'proof' },
  { id: 5, url: 'https://ibb.co/yGYhwvC', category: 'creative' },
  { id: 6, url: 'https://ibb.co/4n1B21XR', category: 'creative' },
  { id: 7, url: 'https://ibb.co/pjYx56fK', category: 'proof' },
  { id: 8, url: 'https://ibb.co/KpSVdDz9', category: 'creative' },
  { id: 9, url: 'https://ibb.co/7JGHvs5r', category: 'creative' },
  { id: 10, url: 'https://ibb.co/213m39Nt', category: 'creative' },
  { id: 11, url: 'https://ibb.co/QtKgxCL', category: 'brand' },
  { id: 12, url: 'https://ibb.co/qMwkRmXM', category: 'brand' },
  { id: 13, url: 'https://ibb.co/Z1KVFW6S', category: 'brand' },
  { id: 14, url: 'https://ibb.co/nqPLN4Tt', category: 'proof' },
  { id: 15, url: 'https://ibb.co/Gv0xmScq', category: 'proof' },
  { id: 16, url: 'https://ibb.co/cS8Kygkv', category: 'creative' },
  { id: 17, url: 'https://ibb.co/Gfn5FV2Z', category: 'creative' },
  { id: 18, url: 'https://ibb.co/TMF7QmM5', category: 'creative' },
  { id: 19, url: 'https://ibb.co/Hp7f3wKj', category: 'creative' },
  { id: 20, url: 'https://ibb.co/P72mFnj', category: 'creative' },
  { id: 21, url: 'https://ibb.co/KppFyrBv', category: 'creative' },
  { id: 22, url: 'https://ibb.co/4nB140x9', category: 'creative' },
  { id: 23, url: 'https://ibb.co/whXGFmYX', category: 'creative' },
  { id: 24, url: 'https://ibb.co/DH5y6MNq', category: 'creative' },
  { id: 25, url: 'https://ibb.co/60W7gFDn', category: 'creative' },
  { id: 26, url: 'https://ibb.co/jddfh24', category: 'creative' },
  { id: 27, url: 'https://ibb.co/j9qPLrth', category: 'creative' },
  { id: 28, url: 'https://ibb.co/nsx319Jf', category: 'creative' },
  { id: 29, url: 'https://ibb.co/WvT2jnSm', category: 'creative' },
  { id: 30, url: 'https://ibb.co/4gstgtHT', category: 'creative' },
]

export const assetCategories = [
  { key: 'all', label: 'All Work' },
  { key: 'creative', label: 'Creative' },
  { key: 'brand', label: 'Brand' },
  { key: 'proof', label: 'Proof of Performance' },
  { key: 'hero', label: 'Portrait' },
]
