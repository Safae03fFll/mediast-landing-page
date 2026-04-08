// Product image paths (served from /public folder)
export const IMAGES = {
  // Rice Toner images
  toner_hero:    '/download__2__-_Copy_-_Copy_-_Copy.jfif',
  toner_bottle:  '/download__3__-_Copy_-_Copy_-_Copy.jfif',
  toner_pour:    '/download__7__-_Copy.jfif',
  // Rice Cream images
  cream_hand:    '/download__4__-_Copy.jfif',
  cream_jar:     '/download__4__-_Copy_-_Copy.jfif',
  cream_styled:  '/download__6_.jfif',
  // Combined / lifestyle
  both_products: '/images__1_.jfif',
  lifestyle:     '/download__5__-_Copy.jfif',
  hero_bg:       '/download.jfif',
};

export const PRODUCTS = [
  {
    id: 'rice-toner',
    name: "Rice Toner",
    brand: "I'm From",
    tagline: "The OG Rice Toner since 2018",
    price: 34.00,
    originalPrice: 42.00,
    size: "150ml",
    badge: "Bestseller",
    badgeColor: "#C9A87C",
    description: "A cult-favourite toner enriched with 77.78% fermented rice extract. Instantly brightens, refines pores, and delivers a glass-skin glow with every use.",
    longDescription: "Formulated with rice complex for glowing skin, this lightweight essence toner absorbs instantly to deliver intense hydration. Fermented rice water brightens and evens skin tone, while niacinamide minimizes pores and refines texture. A smooth, silky finish you'll feel from the very first pat.",
    benefits: ["Brightening", "Pore Refining", "Glass-Skin Glow", "Fermented Rice"],
    howToUse: "After cleansing, apply a small amount to a cotton pad or pat directly onto skin with palms. Use morning and evening.",
    ingredients: "Rice Extract 77.78%, Niacinamide, Fermented Rice Water, Ceramides, Hyaluronic Acid",
    images: [IMAGES.toner_hero, IMAGES.toner_bottle, IMAGES.toner_pour],
    mainImage: IMAGES.toner_bottle,
    cardImage: IMAGES.toner_hero,
  },
  {
    id: 'rice-cream',
    name: "Rice Cream",
    brand: "I'm From",
    tagline: "Deep moisture meets luminous skin",
    price: 42.00,
    originalPrice: null,
    size: "50ml",
    badge: "New Arrival",
    badgeColor: "#8FA688",
    description: "A velvety moisturiser packed with fermented rice extract and ceramides. Melts into skin to deliver lasting hydration and a porcelain-soft finish.",
    longDescription: "This rich yet lightweight cream harnesses the power of rice fermentation to deeply nourish and repair the skin barrier. Ceramides lock in moisture for up to 72 hours, while rice bran extract softens and smooths. Wake up to plump, dewy, luminous skin every morning.",
    benefits: ["Deep Hydration", "Barrier Repair", "Anti-Aging", "72h Moisture"],
    howToUse: "Apply as the last step of your skincare routine. Gently massage a small amount into face and neck using upward circular motions.",
    ingredients: "Rice Extract 73.1%, Ceramide NP, Rice Bran Extract, Niacinamide, Squalane, Shea Butter",
    images: [IMAGES.cream_hand, IMAGES.cream_jar, IMAGES.cream_styled],
    mainImage: IMAGES.cream_styled,
    cardImage: IMAGES.cream_hand,
  },
];

// Google Apps Script Web App URL
// Replace this with your deployed Apps Script URL
export const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxIdM8jIa32aIAHxgDjOCt9AmgN9NRIKNzoTYdyFshGnbmWXrUSAu3Wrlh0mzqKdt5E6Q/exec";
