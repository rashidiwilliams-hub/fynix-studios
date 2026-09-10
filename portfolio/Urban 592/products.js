// Shared product data used by index.html (for linking) and product.html (for rendering).
// To add/edit products, just edit this array — product.html adapts automatically.
const PRODUCTS = [
  // ---------- Streetwear ----------
  {
    slug: 'wide-leg-cargo-pants',
    name: 'Wide-Leg Cargo Pants',
    price: 14300,
    images: ['assets/images/wide-leg-cargo-pants-1.jpg', 'assets/images/wide-leg-cargo-pants-2.jpg'],
    alt: 'Wide-leg cargo pants with utility pockets',
    rating: 5,
    reviews: 142,
    category: 'Streetwear',
    sale: true
  },
  {
    slug: 'ribbed-tube-top',
    name: 'Ribbed Tube Top',
    price: 5900,
    images: ['assets/images/ribbed-tube-top-1.jpg', 'assets/images/ribbed-tube-top-2.jpg'],
    alt: 'Ribbed tube top',
    rating: 4,
    reviews: 71,
    category: 'Streetwear'
  },
  {
    slug: 'utility-mini-skirt',
    name: 'Utility Mini Skirt',
    price: 11300,
    images: ['assets/images/utility-mini-skirt-1.jpg', 'assets/images/utility-mini-skirt-2.jpg'],
    alt: 'Utility mini skirt with cargo pockets',
    rating: 4,
    reviews: 58,
    category: 'Streetwear'
  },
  {
    slug: 'long-sleeve-crop-top',
    name: 'Long-Sleeve Crop Top',
    price: 7100,
    images: ['assets/images/long-sleeve-crop-top-1.jpg', 'assets/images/long-sleeve-crop-top-2.jpg'],
    alt: 'Long-sleeve ribbed crop top',
    rating: 4,
    reviews: 63,
    category: 'Streetwear'
  },
  {
    slug: 'cargo-pocket-pants',
    name: 'Cargo Pocket Pants',
    price: 14300,
    images: ['assets/images/cargo-pocket-pants-1.jpg', 'assets/images/cargo-pocket-pants-2.jpg'],
    alt: 'Cargo pocket pants, second colorway',
    rating: 4,
    reviews: 39,
    category: 'Streetwear'
  },
  {
    slug: 'varsity-crew-sweater',
    name: 'Varsity Crew Sweater',
    price: 12200,
    images: ['assets/images/varsity-crew-sweater-1.jpg'],
    alt: 'Varsity crew sweater with striped cuffs',
    rating: 5,
    reviews: 94,
    category: 'Streetwear',
    sale: true
  },

  // ---------- Outerwear ----------
  {
    slug: 'cream-oversized-puffer-jacket',
    name: 'Cream Oversized Puffer Jacket',
    price: 26900,
    images: ['assets/images/cream-oversized-puffer-jacket-1.jpg', 'assets/images/cream-oversized-puffer-jacket-2.jpg', 'assets/images/cream-oversized-puffer-jacket-3.jpg'],
    alt: 'Cream oversized puffer jacket',
    rating: 5,
    reviews: 187,
    category: 'Outerwear'
  },
  {
    slug: 'vintage-wash-denim-jacket',
    name: 'Vintage Wash Denim Jacket',
    price: 16400,
    images: ['assets/images/vintage-wash-denim-jacket-1.jpg'],
    alt: 'Vintage wash denim jacket',
    rating: 5,
    reviews: 61,
    category: 'Outerwear'
  },
  {
    slug: 'denim-overshirt',
    name: 'Denim Overshirt',
    price: 13400,
    images: ['assets/images/denim-overshirt-1.jpg'],
    alt: 'Denim overshirt worn open',
    rating: 4,
    reviews: 48,
    category: 'Outerwear'
  },
  {
    slug: 'cropped-puffer-vest',
    name: 'Cropped Puffer Vest',
    price: 18500,
    images: ['assets/images/cropped-puffer-vest-1.jpg'],
    alt: 'Cropped puffer vest in pink',
    rating: 4,
    reviews: 33,
    category: 'Outerwear',
    sale: true
  },
  {
    slug: 'unstructured-wool-blazer',
    name: 'Unstructured Wool Blazer',
    price: 31100,
    images: ['assets/images/unstructured-wool-blazer-1.jpg'],
    alt: 'Unstructured wool blazer in camel',
    rating: 5,
    reviews: 61,
    category: 'Outerwear'
  },

  // ---------- Activewear ----------
  {
    slug: 'ribbed-tennis-dress',
    name: 'Ribbed Tennis Dress',
    price: 12200,
    images: ['assets/images/ribbed-tennis-dress-1.jpg', 'assets/images/ribbed-tennis-dress-2.jpg'],
    alt: 'Ribbed tennis dress',
    rating: 5,
    reviews: 76,
    category: 'Activewear'
  },
  {
    slug: 'seamless-two-piece-set',
    name: 'Seamless Two-Piece Set',
    price: 13400,
    images: ['assets/images/seamless-two-piece-set-1.jpg'],
    alt: 'Seamless long-sleeve and shorts activewear set',
    rating: 4,
    reviews: 52,
    category: 'Activewear',
    sale: true
  },

  // ---------- Evening & Suits ----------
  {
    slug: 'satin-wrap-gown',
    name: 'Satin Wrap Gown',
    price: 41600,
    images: ['assets/images/satin-wrap-gown-1.jpg', 'assets/images/satin-wrap-gown-2.jpg'],
    alt: 'Yellow satin wrap evening gown',
    rating: 5,
    reviews: 44,
    category: 'Evening & Suits'
  },
  {
    slug: 'velvet-bodycon-gown',
    name: 'Velvet Bodycon Gown',
    price: 37400,
    images: ['assets/images/velvet-bodycon-gown-1.jpg'],
    alt: 'Black velvet bodycon evening gown',
    rating: 5,
    reviews: 37,
    category: 'Evening & Suits'
  },
  {
    slug: 'sheer-sleeve-evening-gown',
    name: 'Sheer Sleeve Evening Gown',
    price: 39500,
    images: ['assets/images/sheer-sleeve-evening-gown-1.jpg'],
    alt: 'Evening gown with sheer puff sleeves',
    rating: 4,
    reviews: 29,
    category: 'Evening & Suits'
  },
  {
    slug: 'tailored-navy-suit',
    name: 'Tailored Navy Suit',
    price: 47900,
    images: ['assets/images/tailored-navy-suit-1.jpg'],
    alt: 'Tailored navy two-piece suit',
    rating: 5,
    reviews: 88,
    category: 'Evening & Suits'
  },
  {
    slug: 'double-breasted-blazer-suit',
    name: 'Double-Breasted Blazer Suit',
    price: 35300,
    images: ['assets/images/double-breasted-blazer-suit-1.jpg', 'assets/images/double-breasted-blazer-suit-2.jpg'],
    alt: 'Double-breasted navy blazer suit',
    rating: 5,
    reviews: 53,
    category: 'Evening & Suits',
    sale: true
  },
  {
    slug: 'oversized-satin-shirt',
    name: 'Oversized Satin Shirt',
    price: 15100,
    images: ['assets/images/oversized-satin-shirt-1.jpg', 'assets/images/oversized-satin-shirt-2.jpg'],
    alt: 'Oversized ivory satin shirt',
    rating: 4,
    reviews: 41,
    category: 'Evening & Suits'
  },

  // ---------- Accessories ----------
  {
    slug: 'sherpa-bucket-hat',
    name: 'Sherpa Bucket Hat',
    price: 6700,
    images: ['assets/images/sherpa-bucket-hat-1.jpg'],
    alt: 'Cream sherpa bucket hat',
    rating: 4,
    reviews: 27,
    category: 'Accessories'
  },
  {
    slug: 'round-tint-sunglasses',
    name: 'Round Tint Sunglasses',
    price: 8000,
    images: ['assets/images/round-tint-sunglasses-1.jpg'],
    alt: 'Round tinted sunglasses',
    rating: 4,
    reviews: 66,
    category: 'Accessories'
  },
  {
    slug: 'retro-tint-sunglasses',
    name: 'Retro Tint Sunglasses',
    price: 8800,
    images: ['assets/images/retro-tint-sunglasses-1.jpg'],
    alt: 'Retro red-tint sunglasses',
    rating: 5,
    reviews: 58,
    category: 'Accessories',
    sale: true
  },
  {
    slug: 'woven-shoulder-bag',
    name: 'Woven Shoulder Bag',
    price: 18100,
    images: ['assets/images/woven-shoulder-bag-1.jpg'],
    alt: 'Woven shoulder bag',
    rating: 4,
    reviews: 34,
    category: 'Accessories'
  },

  // ---------- Shoes ----------
  {
    slug: 'momentum-runner-sneakers',
    name: 'Momentum Runner Sneakers',
    price: 20000,
    images: ['assets/images/momentum-runner-sneakers-1.jpg'],
    alt: 'Momentum runner sneakers in grey and yellow',
    rating: 5,
    reviews: 121,
    category: 'Shoes'
  },
  {
    slug: 'classic-low-top-sneakers',
    name: 'Classic Low-Top Sneakers',
    price: 17800,
    images: ['assets/images/classic-low-top-sneakers-1.jpg'],
    alt: 'Classic white low-top sneakers',
    rating: 5,
    reviews: 103,
    category: 'Shoes',
    sale: true
  },

  // ---------- Basics ----------
  {
    slug: 'classic-fit-tee',
    name: 'Classic Fit Tee',
    price: 5500,
    images: ['assets/images/classic-fit-tee-1.jpg'],
    alt: 'Classic fit black crew-neck tee',
    rating: 4,
    reviews: 156,
    category: 'Basics'
  },
  {
    slug: 'slim-straight-jeans',
    name: 'Slim Straight Jeans',
    price: 14300,
    images: ['assets/images/slim-straight-jeans-1.jpg'],
    alt: 'Slim straight dark-wash denim jeans',
    rating: 4,
    reviews: 118,
    category: 'Basics'
  },
  {
    slug: 'wide-leg-trousers',
    name: 'Wide-Leg Trousers',
    price: 15500,
    images: ['assets/images/wide-leg-trousers-1.jpg'],
    alt: 'Wide-leg tailored trousers',
    rating: 4,
    reviews: 45,
    category: 'Basics'
  },
  {
    slug: 'relaxed-utility-shirt',
    name: 'Relaxed Utility Shirt',
    price: 12200,
    images: ['assets/images/relaxed-utility-shirt-1.jpg'],
    alt: 'Relaxed fit utility shirt',
    rating: 4,
    reviews: 37,
    category: 'Basics',
    sale: true
  },
  {
    slug: 'essential-v-neck-tee',
    name: 'Essential V-Neck Tee',
    price: 5500,
    images: ['assets/images/essential-v-neck-tee-1.jpg'],
    alt: 'Essential v-neck tee',
    rating: 5,
    reviews: 91,
    category: 'Basics'
  }
];
