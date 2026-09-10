// Shared product data. This site's index.html is itself the reusable PDP
// template — it reads ?id=<slug> and renders whichever product matches.
const PRODUCTS = [
  {
    slug: 'glucoside-foaming-cleanser',
    name: 'Glucoside Foaming Cleanser',
    price: 12.50,
    size: '150 ml',
    step: 'Regimen Step 1: Prep',
    lead: "A gentle, foaming cleanser that effectively cleanses the skin whilst maintaining the skin's moisture barrier.",
    targets: 'Cleansing',
    suited: 'All Skin Types',
    format: 'Water-based Gel',
    ingredients: 'Decyl Glucoside, Coco-Glucoside',
    images: ['assets/images/image-01.jpg', 'assets/images/image-02.jpg', 'assets/images/image-03.jpg'],
    alt: 'Glucoside Foaming Cleanser tube'
  },
  {
    slug: 'vitamin-c-suspension',
    name: 'Vitamin C Suspension 23% + HA Spheres 2%',
    price: 17.00,
    size: '30 ml',
    step: 'Regimen Step 2: Treat',
    lead: 'Vitamin C Suspension 23% in HA Spheres uses direct vitamin C and hyaluronic acid to help visibly reduce signs of aging by brightening.',
    targets: 'Uneven Texture, Fine Lines',
    suited: 'Normal, Dry, Combination',
    format: 'Silicone-based Suspension',
    ingredients: 'L-Ascorbic Acid, Hyaluronic Acid Spheres',
    images: ['assets/images/image-04.jpg', 'assets/images/image-01.jpg', 'assets/images/image-05.jpg'],
    alt: 'Vitamin C Suspension serum bottle'
  },
  {
    slug: 'natural-moisturizing-factors',
    name: 'Natural Moisturizing Factors + PhytoCeramides',
    price: 16.90,
    size: '100 ml',
    step: 'Regimen Step 3: Moisturize',
    lead: 'Our most nourishing moisturizer, formulated with nearly four times more moisturizing emollients.',
    targets: 'Dryness, Dehydration',
    suited: 'All Skin Types',
    format: 'Rich Cream',
    ingredients: 'Amino Acids, PhytoCeramides',
    images: ['assets/images/image-03.jpg', 'assets/images/image-02.jpg', 'assets/images/image-01.jpg'],
    alt: 'Natural Moisturizing Factors tube'
  },
  {
    slug: 'glycolic-acid-toner',
    name: 'Glycolic Acid 7% Exfoliating Toner',
    price: 14.30,
    size: '240 ml',
    step: 'Regimen Step 2: Treat',
    lead: 'An exfoliating toner that significantly smoothes skin texture for a brighter, more even-looking complexion.',
    targets: 'Texture, Dullness',
    suited: 'Normal, Dry, Combination',
    format: 'Liquid Toner',
    ingredients: 'Glycolic Acid 7%, Aloe Vera',
    images: ['assets/images/image-05.jpg', 'assets/images/image-04.jpg', 'assets/images/image-03.jpg'],
    alt: 'Glycolic Acid toner bottle'
  },
  {
    slug: 'multipeptide-eye-serum',
    name: 'Multipeptide Eye Serum',
    price: 7.50,
    size: '15 ml',
    step: 'Regimen Step 4: Target',
    lead: 'A multi-technology peptide eye serum to target signs of aging around the eye.',
    targets: 'Fine Lines, Puffiness',
    suited: 'All Skin Types',
    format: 'Lightweight Serum',
    ingredients: 'Multi-Peptide Complex',
    images: ['assets/images/image-02.jpg', 'assets/images/image-01.jpg', 'assets/images/image-05.jpg'],
    alt: 'Multipeptide Eye Serum pump bottle'
  }
];
