// Shared product data. product.html is the reusable PDP template — it reads
// ?id=<slug> and renders whichever product matches. Nomad Cosmetics is a
// curated multi-brand retailer, so each product carries its own real brand.
const PRODUCTS = [
  {
    slug: 'curology-custom-formula',
    name: 'Custom Formula Treatment',
    brand: 'Curology',
    price: 21.90,
    size: '45 ml',
    category: 'Skincare',
    lead: "A prescription-strength formula compounded around your skin's specific concerns — acne, texture, and early signs of aging in one bottle.",
    targets: 'Acne, Texture, Fine Lines',
    suited: 'All Skin Types',
    format: 'Custom-Compounded Gel',
    ingredients: 'Tretinoin, Niacinamide, Azelaic Acid',
    images: ['assets/images/image-01.jpg', 'assets/images/curology-box-1.jpg', 'assets/images/image-04.jpg'],
    alt: 'Curology custom formula tubes with packaging'
  },
  {
    slug: 'necessaire-body-lotion',
    name: 'The Body Lotion',
    brand: 'Nécessaire',
    price: 28.00,
    size: '200 ml',
    category: 'Body Care',
    lead: 'A fragrance-free daily body lotion with niacinamide and five essential vitamins, built on the same clinical standard as their face range.',
    targets: 'Dryness, Uneven Tone',
    suited: 'All Skin Types',
    format: 'Lightweight Lotion',
    ingredients: 'Niacinamide, Vitamins A, C, D, E, B5',
    images: ['assets/images/image-02.jpg', 'assets/images/necessaire-lotion-1.jpg', 'assets/images/necessaire-deodorant-1.jpg'],
    alt: 'Nécessaire The Body Lotion tube'
  },
  {
    slug: 'act-acre-restorative-hair-mask',
    name: 'Restorative Hair Mask',
    brand: 'Act+Acre',
    price: 48.00,
    size: '177 ml',
    category: 'Hair Care',
    lead: 'A cold-processed weekly mask that repairs damage and strengthens strands from the scalp down, without silicones or sulfates.',
    targets: 'Damage, Dryness, Breakage',
    suited: 'All Hair Types',
    format: 'Cold-Processed Cream Mask',
    ingredients: 'Squalane, Biotin, Cold-Pressed Kale Extract',
    images: ['assets/images/image-03.jpg', 'assets/images/act-acre-hair-texture-1.jpg', 'assets/images/act-acre-hair-texture-2.jpg'],
    alt: 'Act+Acre Restorative Hair Mask tube and box'
  },
  {
    slug: 'erbology-hemp-seed-oil',
    name: 'Organic Hemp Seed Oil',
    brand: 'Erbology',
    price: 24.50,
    size: '100 ml',
    category: 'Body Care',
    lead: 'Cold-pressed, single-origin hemp seed oil — nothing added, nothing refined out. Rich in omega fatty acids for face and body.',
    targets: 'Dehydration, Dullness',
    suited: 'Dry, Sensitive',
    format: 'Cold-Pressed Oil',
    ingredients: '100% Organic Cannabis Sativa Seed Oil',
    images: ['assets/images/image-05.jpg', 'assets/images/erbology-bottle-1.jpg', 'assets/images/erbology-droplet-1.jpg'],
    alt: 'Erbology organic hemp seed oil bottle with jars'
  },
  {
    slug: 'misolo-anti-aging-serum',
    name: 'Anti-Aging Serum',
    brand: 'miSolo Cosmetics',
    price: 32.00,
    size: '30 ml',
    category: 'Skincare',
    lead: 'A concentrated dropper serum built around peptides and antioxidants to visibly firm and smooth over time.',
    targets: 'Fine Lines, Firmness',
    suited: 'Normal, Mature',
    format: 'Concentrated Serum',
    ingredients: 'Peptide Complex, Vitamin E',
    images: ['assets/images/image-06.jpg', 'assets/images/misolo-serum-sand-1.jpg', 'assets/images/misolo-droplet-1.jpg'],
    alt: 'miSolo Cosmetics anti-aging serum bottle'
  }
];
