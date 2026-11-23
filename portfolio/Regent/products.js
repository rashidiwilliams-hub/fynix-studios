const PRODUCTS = [
  // ---------- Electronics ----------
  {
    slug: 'smart-watch-pro', name: 'Smart Watch Pro', price: 16900,
    category: 'Electronics', badge: 'New', rating: 5, reviews: 128,
    images: ['assets/images/hero-smartwatch.jpg', 'assets/images/product-smartwatch-2.jpg', 'assets/images/product-smartwatch.jpg'],
    alt: 'Smartwatch with black display, angled product shot',
    sizes: ['44mm'], lengths: [],
    description: "Track workouts, heart rate, and daily activity without reaching for your phone — seven-day battery, always-on display.",
    feature: { title: 'Heart Rate, SpO2, GPS, Sleep Tracking', body: 'Built for everyday fitness and notifications. Includes watch, magnetic charging puck, and quick start guide.' }
  },
  {
    slug: 'wireless-headphones', name: 'Wireless Headphones', price: 11700,
    category: 'Electronics', rating: 5, reviews: 96,
    images: ['assets/images/product-headphones-2.jpg', 'assets/images/product-headphones-3.jpg', 'assets/images/product-headphones.jpg'],
    alt: 'Premium wireless over-ear headphones product photo',
    sizes: ['Over-Ear'], lengths: [],
    description: "Active noise cancellation and a 30-hour battery in a fold-flat design built for daily commutes and long flights.",
    feature: { title: 'Active Noise Cancellation, 30-Hr Battery', body: 'Built for commuting and travel. Includes headphones, USB-C cable, and carry case.' }
  },
  {
    slug: 'smartphone-128gb', name: 'Smartphone 128GB', price: 91000,
    category: 'Electronics', badge: 'Bestseller', rating: 5, reviews: 112,
    images: ['assets/images/product-smartphone-2.jpg', 'assets/images/product-smartphone-3.jpg', 'assets/images/product-smartphone.jpg'],
    alt: 'Smartphone on stand product photo',
    sizes: ['128GB'], lengths: [],
    description: "A 128GB flagship with all-day battery life and a pro-grade camera system, ready for whatever the day brings.",
    feature: { title: 'Pro Camera System, All-Day Battery', body: 'Built for everyday use and photography. Includes phone, USB-C cable, and SIM tool.' }
  },
  {
    slug: 'camera-drone', name: '4K Camera Drone', price: 32500,
    category: 'Electronics', badge: 'New', rating: 5, reviews: 58,
    images: ['assets/images/product-drone1.jpg', 'assets/images/product-drone2.jpg', 'assets/images/product-drone3.jpg'],
    alt: 'Camera drone flying against a cloudy sky with mountains below',
    sizes: ['One Size'], lengths: [],
    description: "Capture smooth 4K aerial footage with GPS-assisted hover and a 25-minute flight time on a single charge.",
    feature: { title: '4K UHD Camera, GPS Auto-Hover', body: 'Built for travel, photography, and hobbyists. Includes drone, remote controller, and spare propellers.' }
  },
  {
    slug: 'smart-security-camera', name: 'Smart Security Camera', price: 7150,
    category: 'Electronics', badge: 'Bestseller', rating: 5, reviews: 142,
    images: ['assets/images/product-home-security1.jpg', 'assets/images/product-home-security2.jpg', 'assets/images/product-home-security3.jpg'],
    alt: 'White dome security camera mounted on a tiled wall',
    sizes: ['One Size'], lengths: [],
    description: "Wide-angle night vision and instant motion alerts sent straight to your phone, day or night.",
    feature: { title: '1080p Night Vision, Motion Alerts', body: 'Built for home and small business security. Includes camera, mounting kit, and power adapter.' }
  },
  {
    slug: 'gaming-console-x', name: 'Next-Gen Gaming Console', price: 39000,
    category: 'Electronics', badge: 'Bestseller', rating: 5, reviews: 201,
    images: ['assets/images/product-gaming3.jpg', 'assets/images/product-gaming2.jpg', 'assets/images/product-gaming1.jpg'],
    alt: 'White gaming console standing upright next to a wireless controller',
    sizes: ['512GB'], lengths: [],
    description: "Load games in seconds and play in true 4K with a console built for the next generation of gaming.",
    feature: { title: '512GB SSD, 4K Gaming, Quick Resume', body: 'Built for gamers and home entertainment. Includes console, controller, HDMI cable, and power cord.' }
  },
  // ---------- Home & Living ----------
  {
    slug: 'accent-chair', name: 'Modern Accent Chair', price: 24700,
    category: 'Home & Living', badge: 'Bestseller', rating: 5, reviews: 54,
    images: ['assets/images/chair-2.jpg', 'assets/images/category-home-living.jpg', 'assets/images/chair-3.jpg'],
    alt: 'Modern upholstered accent chair product photo',
    sizes: ['One Size'], lengths: [],
    description: "A curved, plush-upholstered accent chair that adds a soft, sculptural touch to any reading nook or living room corner.",
    feature: { title: 'Sculptural Curved Frame, Plush Upholstery', body: 'Built for living rooms and reading nooks. Includes chair, assembly tools, and care guide.' }
  },
  {
    slug: 'smart-tv-55', name: '55" 4K Smart TV', price: 78000, salePrice: 58500,
    category: 'Home & Living', rating: 5, reviews: 89,
    images: ['assets/images/tv1.jpg', 'assets/images/tv2.jpg', 'assets/images/tv3.jpg'],
    alt: 'Large flat-screen TV on a white media console',
    sizes: ['55 in'], lengths: [],
    description: "A crisp 4K display with built-in streaming apps, so movie night starts the moment you sit down.",
    feature: { title: '4K UHD Display, Built-In Streaming Apps', body: 'Built for living rooms and home theaters. Includes TV, remote, table stand, and wall mount screws.' }
  },
  {
    slug: 'throw-pillow-set', name: 'Decorative Throw Pillow Set', price: 5200,
    category: 'Home & Living', rating: 5, reviews: 51,
    images: ['assets/images/pillow1.jpg', 'assets/images/pillow2.jpg', 'assets/images/pillow3.jpg'],
    alt: 'Patterned decorative pillows displayed on a shelf',
    sizes: ['Set of 4'], lengths: [],
    description: "Four patterned covers that mix and match easily to refresh a sofa or reading chair in minutes.",
    feature: { title: 'Mix-and-Match Patterns, Hidden Zipper', body: 'Built for sofas, beds, and reading nooks. Includes 4 pillow covers and a care card.' }
  },
  {
    slug: 'rattan-accent-chair', name: 'Rattan Accent Chair', price: 28600,
    category: 'Home & Living', rating: 5, reviews: 43,
    images: ['assets/images/pexels-q-w-763920162-33724903.jpg', 'assets/images/pexels-curtis-adams-1694007-36777527.jpg', 'assets/images/chair-3.jpg'],
    alt: 'Rattan-back accent chair with a white cushion in a living room',
    sizes: ['One Size'], lengths: [],
    description: "A woven rattan back and plush cushion pair natural texture with everyday comfort in any reading corner.",
    feature: { title: 'Woven Rattan Back, Plush Seat Cushion', body: 'Built for living rooms and reading nooks. Includes chair, assembly tools, and care guide.' }
  },
  // ---------- Fashion ----------
  {
    slug: 'leather-backpack', name: 'Leather Backpack', price: 7800,
    category: 'Fashion', badge: 'New', rating: 5, reviews: 74,
    images: ['assets/images/product-backpack-2.jpg', 'assets/images/product-backpack.jpg', 'assets/images/product-backpack-3.jpg'],
    alt: 'Leather-trimmed backpack product photo',
    sizes: ['One Size'], lengths: [],
    description: "A padded 15\" laptop sleeve, water-resistant canvas, and enough pockets to carry a full day of essentials.",
    feature: { title: 'Padded 15" Laptop Sleeve, Water-Resistant', body: 'Built for work, travel, and everyday carry. Includes backpack, rain cover, and care card.' }
  },
  {
    slug: 'plaid-oversized-shirt', name: 'Oversized Plaid Shirt', price: 4550,
    category: 'Fashion', badge: 'Bestseller', rating: 4, reviews: 47,
    images: ['assets/images/pexels-mauricio-casas-454804780-20095342.jpg', 'assets/images/pexels-lara-chara-24037705-7665700.jpg', 'assets/images/modest-relaxed-healthy-afro-american-woman-has-tender-toothy-smile-enjoys-lovely-day-expresses-positive-emotions.jpg'],
    alt: 'Model wearing an oversized brown and cream plaid shirt',
    sizes: ['S', 'M', 'L', 'XL'], lengths: [],
    description: "A relaxed, oversized fit in brushed plaid flannel — layer it open or button it up for cooler days.",
    feature: { title: 'Brushed Flannel, Relaxed Fit', body: 'Built for layering and everyday wear. Machine washable cotton flannel.' }
  },
  {
    slug: 'striped-tie-top', name: 'Striped Tie-Front Blouse', price: 3640,
    category: 'Fashion', badge: 'Bestseller', rating: 5, reviews: 62,
    images: ['assets/images/pexels-lara-chara-24037705-7665700.jpg', 'assets/images/pexels-mauricio-casas-454804780-20095342.jpg', 'assets/images/modest-relaxed-healthy-afro-american-woman-has-tender-toothy-smile-enjoys-lovely-day-expresses-positive-emotions.jpg'],
    alt: 'Model wearing a striped tie-front blouse with denim shorts',
    sizes: ['XS', 'S', 'M', 'L'], lengths: [],
    description: "A breezy button-down with a tie-front hem, striped in colors that go with everything in your closet.",
    feature: { title: 'Tie-Front Hem, Breathable Fabric', body: 'Built for warm-weather everyday wear in a lightweight woven fabric.' }
  },
  {
    slug: 'oversized-crewneck', name: 'Oversized Crewneck Sweatshirt', price: 3900,
    category: 'Fashion', badge: 'Bestseller', rating: 5, reviews: 108,
    images: ['assets/images/modest-relaxed-healthy-afro-american-woman-has-tender-toothy-smile-enjoys-lovely-day-expresses-positive-emotions.jpg', 'assets/images/pexels-mauricio-casas-454804780-20095342.jpg', 'assets/images/pexels-lara-chara-24037705-7665700.jpg'],
    alt: 'Woman smiling in an oversized beige crewneck sweatshirt',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], lengths: [],
    description: "A heavyweight crewneck with a boxy, oversized fit that's soft enough to wear on repeat.",
    feature: { title: 'Heavyweight Fleece, Boxy Fit', body: 'Built for everyday comfort and layering. Cotton fleece with ribbed cuffs.' }
  },
  // ---------- Toys & Games ----------
  {
    slug: 'plush-teddy-bear', name: 'Plush Teddy Bear', price: 3250,
    category: 'Toys & Games', badge: 'New', rating: 5, reviews: 71,
    images: ['assets/images/teddy-2.jpg', 'assets/images/category-toys.jpg', 'assets/images/teddy-3.jpg'],
    alt: 'Plush teddy bear product photo',
    sizes: ['14 in'], lengths: [],
    description: "A super-soft plush bear sized just right for gifting, cuddling, or sitting proudly on a shelf.",
    feature: { title: 'Ultra-Soft Plush, Huggable Size', body: 'Built for ages 3+ and gift giving. Polyester plush in gift-ready packaging.' }
  },
  {
    slug: 'rc-rock-crawler', name: 'RC Rock Crawler Truck', price: 5850,
    category: 'Toys & Games', rating: 5, reviews: 82,
    images: ['assets/images/rc-car1.jpg', 'assets/images/rc-car2.jpg', 'assets/images/rc-car3.jpg'],
    alt: 'Black remote-control rock crawler truck on grass',
    sizes: ['1:18 Scale'], lengths: [],
    description: "A rugged remote-control crawler with working suspension, built to handle grass, gravel, and everything between.",
    feature: { title: 'All-Terrain Tires, Working Suspension', body: 'Built for ages 6+ and outdoor play. Includes truck, remote control, and USB charging cable.' }
  },
  {
    slug: 'wooden-number-blocks', name: 'Wooden Number Blocks Set', price: 2600,
    category: 'Toys & Games', rating: 5, reviews: 65,
    images: ['assets/images/pexels-digitalbuggu-311268.jpg', 'assets/images/pexels-duc-anh-nguyen-63701176-8289844.jpg', 'assets/images/pexels-freestockpro-12940817.jpg'],
    alt: 'Colorful wooden number blocks arranged on a table',
    sizes: ['12-Piece Set'], lengths: [],
    description: "Twelve chunky, colorful blocks that turn counting practice into stacking, sorting, and building play.",
    feature: { title: 'Chunky Grip, Non-Toxic Paint', body: 'Built for ages 2+ and early learning. Solid wood with a storage pouch.' }
  },
  {
    slug: 'collectible-action-figure', name: 'Collectible Action Figure', price: 3250,
    category: 'Toys & Games', rating: 5, reviews: 39,
    images: ['assets/images/pexels-introspectivedsgn-6159682.jpg', 'assets/images/pexels-grigore-scar-2153317134-38250875.jpg', 'assets/images/pexels-nguyendesigner-16075343.jpg'],
    alt: 'Fully articulated action figure in blue and orange armor posed on a wooden surface',
    sizes: ['6 in'], lengths: [],
    description: "A fully articulated 6-inch figure with display base, ready to pose on a shelf or take into battle.",
    feature: { title: 'Fully Articulated, Display Base Included', body: 'Built for collectors and ages 8+. PVC and ABS plastic construction.' }
  },
  // ---------- Accessories ----------
  {
    slug: 'sunglasses-uv400', name: 'Sunglasses UV400', price: 2600,
    category: 'Accessories', rating: 4, reviews: 88,
    images: ['assets/images/product-sunglasses-3.jpg', 'assets/images/product-sunglasses-2.jpg', 'assets/images/product-sunglasses.jpg'],
    alt: 'Sunglasses product photo',
    sizes: ['One Size'], lengths: [],
    description: "Polarized UV400 lenses in a lightweight frame that looks as good on a hike as it does at the beach.",
    feature: { title: 'Polarized, UV400 Protection', body: 'Built for everyday outdoor wear. Acetate frame with a microfiber pouch.' }
  },
  {
    slug: 'pearl-cutlery-set', name: 'Pearl-Handle Cutlery Set', price: 5850,
    category: 'Accessories', rating: 5, reviews: 38,
    images: ['assets/images/cutlery3.jpg', 'assets/images/cutlery2.jpg', 'assets/images/cutlery1.jpg'],
    alt: 'Cutlery set with pearl-style handles in a gift box',
    sizes: ['4-Piece Set'], lengths: [],
    description: "A gift-ready flatware set with pearlescent handles that dress up a table without trying too hard.",
    feature: { title: 'Pearlescent Handles, Gift Box Included', body: 'Built for everyday dining and gifting. Stainless steel blades.' }
  },
  {
    slug: 'running-shoes', name: 'Running Shoes', price: 8710,
    category: 'Accessories', rating: 5, reviews: 63,
    images: ['assets/images/product-shoes.jpg', 'assets/images/product-shoes-2.jpg', 'assets/images/product-shoes-3.jpg'],
    alt: 'Running shoe product photo',
    sizes: ['5', '6', '7', '8', '9', '10', '11', '12'], lengths: [],
    description: "Responsive cushioning and a breathable knit upper built to keep pace whether you're on the road or the treadmill.",
    feature: { title: 'Responsive Cushioning, Breathable Knit', body: 'Built for running and daily training. Rubber outsole, true to size.' }
  },
  // ---------- Catalog (Beauty / Kitchen) ----------
  {
    slug: 'everyday-makeup-set', name: 'Everyday Makeup Set', price: 4550,
    category: 'Beauty', badge: 'Bestseller', rating: 5, reviews: 102,
    images: ['assets/images/makeup-2.jpg', 'assets/images/category-beauty.jpg', 'assets/images/makeup-3.jpg'],
    alt: 'Makeup set product photo',
    sizes: ['3-Piece Set'], lengths: [],
    description: "A foundation, concealer, and pressed powder trio built for a fast, natural everyday base.",
    feature: { title: 'Buildable Coverage, Lightweight Finish', body: 'Built for normal to combination skin. Includes foundation, concealer, and powder compact.' }
  },
  {
    slug: 'countertop-microwave', name: 'Countertop Microwave Oven', price: 8450,
    category: 'Kitchen', rating: 5, reviews: 76,
    images: ['assets/images/pexels-aj-ahamad-767001191-29149068.jpg', 'assets/images/pexels-microwave-retro-4686822.jpg', 'assets/images/pexels-microwave-coffee-32168944.jpg'],
    alt: 'White countertop microwave oven on a kitchen counter',
    sizes: ['20L'], lengths: [],
    description: "A 20-liter microwave with quick-defrost and timer control, sized to fit neatly on any counter.",
    feature: { title: '20L Capacity, Quick Defrost, Timer Control', body: 'Built for apartments and family kitchens. 1200W power.' }
  },
  {
    slug: 'stainless-cookware-set', name: 'Stainless Steel Cookware Set', price: 16900,
    category: 'Kitchen', rating: 5, reviews: 94,
    images: ['assets/images/pexels-dauphotographer-31110049.jpg', 'assets/images/pexels-cookware-gray-30981356.jpg', 'assets/images/pexels-cookware-veg-31110009.jpg'],
    alt: 'Stainless steel pots and a non-stick pan arranged on a kitchen counter',
    sizes: ['8-Piece Set'], lengths: [],
    description: "Stockpots, saucepans, and a non-stick skillet in a set built to handle everything from simmering to searing.",
    feature: { title: 'Tri-Ply Base, Non-Stick Skillet Included', body: 'Built for everyday cooking and meal prep. Glass lids included.' }
  }
];

function findProduct(slug) { return PRODUCTS.find(p => p.slug === slug); }
