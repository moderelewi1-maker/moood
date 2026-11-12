import { image } from './helpers.js'

// Product imagery, grouped into collections by product line.
// To extend a collection, add one `image(path, title)` line; to start a new
// one, copy a whole block and give it a new `id`.
export const imageryWorks = [
  {
    id: 'botanical-oils-collection',
    category: 'imagery',
    featured: true,
    title: { en: 'Botanical Oils Collection', ar: 'مجموعة الزيوت النباتية' },
    summary: {
      en: 'Product imagery for a range of natural oils, each bottle staged with its source ingredient.',
      ar: 'صور منتجات لمجموعة من الزيوت الطبيعية، تظهر فيها كل زجاجة مع المكوّن الذي استُخلصت منه.',
    },
    scope: [
      { en: 'Art direction', ar: 'الإخراج الفني' },
      { en: 'Product imagery', ar: 'تصوير المنتجات' },
      { en: 'Retouching', ar: 'المعالجة البصرية' },
    ],
    media: [
      image('/assets/gallery/packshot-oil-almond.jpg', { en: 'Almond Oil Bottle', ar: 'زجاجة زيت اللوز' }),
      image('/assets/gallery/packshot-oil-argan.jpg', { en: 'Pure Argan Oil', ar: 'زيت الأرغان النقي' }),
      image('/assets/gallery/packshot-oil-avocado.jpg', { en: 'Avocado Oil', ar: 'زيت الأفوكادو' }),
      image('/assets/gallery/packshot-oil-bitter-melon.jpg', { en: 'Bitter Melon Oil', ar: 'زيت القرع المر' }),
      image('/assets/gallery/packshot-oil-black-seed.png', { en: 'Black Seed Oil', ar: 'زيت حبة البركة' }),
      image('/assets/gallery/packshot-oil-black-seed-scoop.jpg', { en: 'Black Seed Oil & Scoop', ar: 'زيت حبة البركة والمغرفة' }),
      image('/assets/gallery/packshot-oil-frankincense.jpg', { en: 'Frankincense Oil', ar: 'زيت اللبان' }),
      image('/assets/gallery/packshot-oil-ginger-golden.jpg', { en: 'Golden Ginger Oil', ar: 'زيت الزنجبيل الذهبي' }),
      image('/assets/gallery/packshot-oil-ginger-souk.png', { en: 'Ginger Oil — Spice Souk', ar: 'زيت الزنجبيل — سوق البهارات' }),
      image('/assets/gallery/packshot-oil-grapeseed.jpg', { en: 'Grapeseed Oil — Vineyard', ar: 'زيت بذور العنب — الكرم' }),
      image('/assets/gallery/packshot-oil-herbal-board.jpg', { en: 'Herbal Oil on Carved Board', ar: 'زيت عشبي على لوح محفور' }),
      image('/assets/gallery/packshot-oil-licorice.png', { en: 'Licorice Root Oil', ar: 'زيت جذور العرقسوس' }),
      image('/assets/gallery/packshot-oil-licorice-roots.jpg', { en: 'Licorice Oil with Roots', ar: 'زيت العرقسوس مع الجذور' }),
      image('/assets/gallery/packshot-oil-myrrh.jpg', { en: 'Myrrh Oil with Resin', ar: 'زيت المُر مع الراتنج' }),
      image('/assets/gallery/packshot-oil-olive-marble.jpg', { en: 'Olive Oil on Marble', ar: 'زيت الزيتون على الرخام' }),
      image('/assets/gallery/packshot-oil-olive-pourer.jpg', { en: 'Olive Oil Pourer', ar: 'مصبّ زيت الزيتون' }),
      image('/assets/gallery/packshot-oil-olive-window.jpg', { en: 'Olive Oil — Window Light', ar: 'زيت الزيتون — ضوء النافذة' }),
      image('/assets/gallery/packshot-oil-rose.png', { en: 'Rose Infused Oil', ar: 'زيت الورد المنقوع' }),
      image('/assets/gallery/packshot-oil-turmeric-ginger.jpg', { en: 'Turmeric & Ginger Oil', ar: 'زيت الكركم والزنجبيل' }),
      image('/assets/gallery/packshot-oil-wheat-germ.png', { en: 'Wheat Germ Oil', ar: 'زيت جنين القمح' }),
      image('/assets/gallery/packshot-oil-wheat-lantern.jpg', { en: 'Wheat Oil — Lantern Light', ar: 'زيت القمح — إضاءة الفانوس' }),
    ],
  },
  {
    id: 'apothecary-collection',
    category: 'imagery',
    title: { en: 'Apothecary: Herbs, Resins and Incense', ar: 'العطارة: أعشاب وراتنجات وبخور' },
    summary: {
      en: 'Still-life product imagery for herbs, resins, saffron, and incense in a traditional apothecary setting.',
      ar: 'صور منتجات بأسلوب الطبيعة الصامتة للأعشاب والراتنجات والزعفران والبخور في أجواء العطارة التقليدية.',
    },
    scope: [
      { en: 'Art direction', ar: 'الإخراج الفني' },
      { en: 'Product imagery', ar: 'تصوير المنتجات' },
      { en: 'Set styling', ar: 'تنسيق المشهد' },
    ],
    media: [
      image('/assets/gallery/packshot-amber-resin-bowl.png', { en: 'Amber Resin Bowl', ar: 'وعاء الراتنج الكهرماني' }),
      image('/assets/gallery/packshot-amber-resin-linen.jpg', { en: 'Amber Resin on Linen', ar: 'راتنج كهرماني على الكتان' }),
      image('/assets/gallery/packshot-apothecary-blend.jpg', { en: 'Apothecary Herb Blend', ar: 'خلطة أعشاب العطارة' }),
      image('/assets/gallery/packshot-apothecary-shelf.png', { en: 'Apothecary Shelf Still Life', ar: 'رفوف العطارة' }),
      image('/assets/gallery/packshot-frankincense-bowl.jpg', { en: 'Frankincense Bowl', ar: 'وعاء اللبان' }),
      image('/assets/gallery/packshot-frankincense-scale.png', { en: 'Frankincense on Apothecary Scale', ar: 'لبان على ميزان العطار' }),
      image('/assets/gallery/packshot-herbal-ceramic-flask.jpg', { en: 'Ceramic Herbal Flask', ar: 'قارورة الأعشاب الفخارية' }),
      image('/assets/gallery/packshot-herbal-powder-bowl.jpg', { en: 'Herbal Powder Bowl', ar: 'وعاء المسحوق العشبي' }),
      image('/assets/gallery/packshot-herbal-powder-dropper.png', { en: 'Herbal Powder & Tincture', ar: 'مسحوق عشبي وقطارة' }),
      image('/assets/gallery/packshot-herbs-dried-bowl.jpg', { en: 'Dried Herb Bowl', ar: 'وعاء الأعشاب المجففة' }),
      image('/assets/gallery/packshot-oud-incense.jpg', { en: 'Oud Incense Burner', ar: 'مبخرة العود' }),
      image('/assets/gallery/packshot-resin-basket.png', { en: 'Natural Resin in Basket', ar: 'راتنج طبيعي في سلة' }),
      image('/assets/gallery/packshot-resin-crystals.jpg', { en: 'Resin Crystals', ar: 'بلورات الراتنج' }),
      image('/assets/gallery/packshot-saffron-apothecary.jpg', { en: 'Saffron Apothecary Composition', ar: 'تركيبة الزعفران' }),
      image('/assets/gallery/packshot-saffron-threads.png', { en: 'Saffron Threads Display', ar: 'خيوط الزعفران' }),
      image('/assets/gallery/packshot-skincare-aloe.jpg', { en: 'Aloe Vera Skincare Serum', ar: 'سيروم الألوفيرا للعناية بالبشرة' }),
    ],
  },
  {
    id: 'spice-blends-collection',
    category: 'imagery',
    title: { en: 'Spice Blends Collection', ar: 'مجموعة خلطات البهارات' },
    summary: {
      en: 'Product imagery for a line of spice blends, from single spices to finished mixes.',
      ar: 'صور منتجات لخط من خلطات البهارات، من البهار المفرد إلى الخلطة الجاهزة.',
    },
    scope: [
      { en: 'Art direction', ar: 'الإخراج الفني' },
      { en: 'Product imagery', ar: 'تصوير المنتجات' },
    ],
    media: [
      image('/assets/gallery/packshot-spice-bowl-cinnamon.jpg', { en: 'Spice Bowl with Cinnamon', ar: 'وعاء البهارات مع القرفة' }),
      image('/assets/gallery/packshot-spice-cardamom.jpg', { en: 'Cardamom & Spice Study', ar: 'دراسة الهيل والبهارات' }),
      image('/assets/gallery/packshot-spice-seven-blend.jpg', { en: 'Seven Spice Blend', ar: 'سبع بهارات' }),
      image('/assets/gallery/packshot-spice-shawarma.jpg', { en: 'Shawarma Spice Blend', ar: 'بهارات شاورما' }),
      image('/assets/gallery/packshot-spice-shawarma-meat.jpg', { en: 'Meat Shawarma Spice Blend', ar: 'بهارات شاورما اللحم' }),
      image('/assets/gallery/packshot-spice-shish-tawook.jpg', { en: 'Shish Tawook Spice Blend', ar: 'بهارات شيش طاووق' }),
      image('/assets/gallery/packshot-spice-sujuk.jpg', { en: 'Sujuk Spice Blend', ar: 'بهارات سجق' }),
    ],
  },
  {
    id: 'matcha-sachets-series',
    category: 'imagery',
    title: { en: 'Matcha Sachets: Flavour Series', ar: 'أكياس الماتشا: سلسلة النكهات' },
    summary: {
      en: 'One consistent scene adapted across six flavours of a matcha product line.',
      ar: 'مشهد واحد متّسق جرى تكييفه لست نكهات من خط منتجات الماتشا.',
    },
    scope: [
      { en: 'Series art direction', ar: 'الإخراج الفني للسلسلة' },
      { en: 'Product imagery', ar: 'تصوير المنتجات' },
    ],
    media: [
      image('/assets/gallery/packshot-matcha-apricot.jpg', { en: 'Matcha Sachets — Apricot', ar: 'أكياس ماتشا — مشمش' }),
      image('/assets/gallery/packshot-matcha-banana.jpg', { en: 'Matcha Sachets — Banana', ar: 'أكياس ماتشا — موز' }),
      image('/assets/gallery/packshot-matcha-cherry.jpg', { en: 'Matcha Sachets — Cherry', ar: 'أكياس ماتشا — كرز' }),
      image('/assets/gallery/packshot-matcha-pineapple.jpg', { en: 'Matcha Sachets — Pineapple & Lime', ar: 'أكياس ماتشا — أناناس وليمون' }),
      image('/assets/gallery/packshot-matcha-spirulina.jpg', { en: 'Matcha Sachets — Spirulina', ar: 'أكياس ماتشا — سبيرولينا' }),
      image('/assets/gallery/packshot-matcha-watermelon.jpg', { en: 'Matcha Sachets — Watermelon', ar: 'أكياس ماتشا — بطيخ' }),
    ],
  },
  {
    id: 'freight-equipment-visuals',
    category: 'imagery',
    title: { en: 'Freight Equipment Visuals', ar: 'صور معدّات الشحن' },
    summary: {
      en: 'Studio visuals of freight equipment produced for logistics marketing: reach stacker, tractor unit, and flatbed trailer.',
      ar: 'صور بأسلوب الاستوديو لمعدّات الشحن أُنتجت لتسويق الخدمات اللوجستية: رافعة حاويات، ورأس قاطرة، ومقطورة مسطّحة.',
    },
    scope: [
      { en: 'Equipment visuals', ar: 'صور المعدّات' },
      { en: 'Marketing assets', ar: 'مواد تسويقية' },
    ],
    // The shipping-container visual (freight-container.png) is not listed: it
    // is essentially a company logo. Add it back with one image() line if wanted.
    media: [
      image('/assets/gallery/freight-reach-stacker.png', { en: 'Reach Stacker', ar: 'رافعة حاويات' }, { backdrop: 'light' }),
      image('/assets/gallery/freight-truck.jpg', { en: 'Freight Tractor Unit', ar: 'رأس قاطرة للشحن' }),
      image('/assets/gallery/freight-flatbed-trailer.png', { en: 'Flatbed Trailer', ar: 'مقطورة مسطّحة' }, { backdrop: 'light' }),
    ],
  },
]
