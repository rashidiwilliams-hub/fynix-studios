// Feastly — shared restaurant + menu data.
// order.html is the reusable dashboard template: it reads ?restaurant=<slug>
// and renders whichever restaurant matches from RESTAURANTS below.

const RESTAURANTS = [
  {
    slug: 'golden-spoon',
    name: 'Golden Spoon',
    cuisine: 'Guyanese & Caribbean',
    tagline: 'Home-style Caribbean comfort food',
    accent: '#e0a458',
    rating: 4.8,
    reviews: 612,
    deliveryTime: '35–45 min',
    priceLevel: '$$',
    address: '12 Camp Street, Georgetown',
    cover: 'assets/images/golden-spoon/cover.jpg',
    menu: [
      { id: 'pepperpot', name: 'Pepperpot with Bread', category: 'Mains', price: 12.50, rating: 4.9, reviews: 184, image: 'assets/images/golden-spoon/pepperpot.jpg', desc: "Guyana's national dish — cassareep-braised beef stewed low and slow with warm spice, served with fresh bread." },
      { id: 'cookup-rice', name: 'Cook-up Rice', category: 'Mains', price: 10.00, rating: 4.7, reviews: 201, image: 'assets/images/golden-spoon/cookup-rice.jpg', desc: 'Rice and pigeon peas simmered in coconut milk with tender beef, served with fried plantain.' },
      { id: 'curry-chicken-roti', name: 'Curry Chicken & Roti', category: 'Mains', price: 11.50, rating: 4.8, reviews: 233, image: 'assets/images/golden-spoon/curry-chicken-roti.jpg', desc: 'Bone-in chicken curry with warm spice, scooped up with soft, flaky roti.' },
      { id: 'bake-saltfish', name: 'Bake and Saltfish', category: 'Breakfast', price: 9.00, rating: 4.6, reviews: 129, image: 'assets/images/golden-spoon/bake-saltfish.jpg', desc: 'Crispy fried bake alongside sautéed saltfish with peppers and onions — a Guyanese breakfast classic.' },
      { id: 'metemgee', name: 'Metemgee', category: 'Mains', price: 10.50, rating: 4.6, reviews: 97, image: 'assets/images/golden-spoon/metemgee.jpg', desc: 'Ground provisions and dumplings simmered in a light coconut broth.' },
      { id: 'garlic-pork', name: 'Garlic Pork', category: 'Mains', price: 13.00, rating: 4.7, reviews: 142, image: 'assets/images/golden-spoon/garlic-pork.jpg', desc: 'Marinated pork slow-cooked in vinegar and garlic until deeply savory and tender.' },
      { id: 'black-cake', name: 'Black Cake', category: 'Dessert', price: 6.50, rating: 4.9, reviews: 88, image: 'assets/images/golden-spoon/black-cake.jpg', desc: 'Rich rum-soaked fruit cake, a Caribbean celebration favorite.' },
      { id: 'mauby-punch', name: 'Mauby Punch', category: 'Drinks', price: 3.50, rating: 4.4, reviews: 65, image: 'assets/images/golden-spoon/mauby-punch.jpg', desc: 'A chilled tropical fruit punch with a refreshing bittersweet edge.' }
    ]
  },
  {
    slug: 'jade-wok',
    name: 'Jade Wok',
    cuisine: 'Chinese',
    tagline: 'Wok-fired classics, fast',
    accent: '#d1453b',
    rating: 4.6,
    reviews: 498,
    deliveryTime: '25–35 min',
    priceLevel: '$$',
    address: '48 Regent Street, Georgetown',
    cover: 'assets/images/jade-wok/cover.jpg',
    menu: [
      { id: 'sweet-sour-chicken', name: 'Sweet & Sour Chicken', category: 'Mains', price: 11.00, rating: 4.6, reviews: 176, image: 'assets/images/jade-wok/sweet-sour-chicken.jpg', desc: 'Crispy chicken tossed in a tangy-sweet glaze with peppers and pineapple.' },
      { id: 'chow-mein', name: 'Chow Mein', category: 'Noodles', price: 9.50, rating: 4.5, reviews: 154, image: 'assets/images/jade-wok/chow-mein.jpg', desc: 'Stir-fried noodles with crisp vegetables in a savory wok-charred sauce.' },
      { id: 'fried-rice', name: 'Fried Rice', category: 'Rice', price: 8.50, rating: 4.5, reviews: 168, image: 'assets/images/jade-wok/fried-rice.jpg', desc: 'Wok-tossed rice with egg, chicken, and fresh vegetables.' },
      { id: 'pork-dumplings', name: 'Pork Dumplings', category: 'Appetizers', price: 7.50, rating: 4.7, reviews: 141, image: 'assets/images/jade-wok/pork-dumplings.jpg', desc: 'Steamed dumplings packed with seasoned pork and ginger, served with dipping sauce.' },
      { id: 'kung-pao-chicken', name: 'Kung Pao Chicken', category: 'Mains', price: 11.50, rating: 4.7, reviews: 190, image: 'assets/images/jade-wok/kung-pao-chicken.jpg', desc: 'Diced chicken stir-fried with peanuts, chili, and scallion in a bold savory sauce.' },
      { id: 'spring-rolls', name: 'Spring Rolls', category: 'Appetizers', price: 6.00, rating: 4.5, reviews: 112, image: 'assets/images/jade-wok/spring-rolls.jpg', desc: 'Crispy golden rolls packed with vegetables, served with sweet chili sauce.' },
      { id: 'wonton-soup', name: 'Wonton Soup', category: 'Soup', price: 7.00, rating: 4.6, reviews: 103, image: 'assets/images/jade-wok/wonton-soup.jpg', desc: 'Silky pork wontons in a light, fragrant broth with scallions.' },
      { id: 'hot-pot-vegetables', name: 'Hot Pot Vegetables', category: 'Mains', price: 10.00, rating: 4.4, reviews: 74, image: 'assets/images/jade-wok/hot-pot-vegetables.jpg', desc: 'A steaming pot of fresh vegetables and mushrooms simmered in savory broth.' }
    ]
  },
  {
    slug: 'saffron-house',
    name: 'Saffron House',
    cuisine: 'Indian',
    tagline: 'Spice-forward home cooking',
    accent: '#d98c2b',
    rating: 4.7,
    reviews: 545,
    deliveryTime: '30–40 min',
    priceLevel: '$$',
    address: '22 Church Street, Georgetown',
    cover: 'assets/images/saffron-house/cover.jpg',
    menu: [
      { id: 'butter-chicken', name: 'Butter Chicken', category: 'Mains', price: 12.00, rating: 4.8, reviews: 245, image: 'assets/images/saffron-house/butter-chicken.jpg', desc: 'Tender chicken simmered in a rich, creamy tomato-butter sauce.' },
      { id: 'chicken-biryani', name: 'Chicken Biryani', category: 'Mains', price: 12.50, rating: 4.8, reviews: 220, image: 'assets/images/saffron-house/chicken-biryani.jpg', desc: 'Fragrant basmati rice layered with spiced chicken and fresh herbs.' },
      { id: 'tandoori-chicken', name: 'Tandoori Chicken', category: 'Mains', price: 11.50, rating: 4.7, reviews: 178, image: 'assets/images/saffron-house/tandoori-chicken.jpg', desc: 'Yogurt-marinated chicken charred over an open flame.' },
      { id: 'palak-paneer', name: 'Palak Paneer', category: 'Mains', price: 10.00, rating: 4.6, reviews: 132, image: 'assets/images/saffron-house/palak-paneer.jpg', desc: 'Fresh paneer cubes in a smooth, spiced spinach curry.' },
      { id: 'vegetable-samosas', name: 'Vegetable Samosas', category: 'Appetizers', price: 6.00, rating: 4.7, reviews: 156, image: 'assets/images/saffron-house/vegetable-samosas.jpg', desc: 'Crispy pastry filled with spiced potatoes and peas.' },
      { id: 'garlic-naan', name: 'Garlic Naan', category: 'Sides', price: 3.50, rating: 4.8, reviews: 199, image: 'assets/images/saffron-house/garlic-naan.jpg', desc: 'Soft tandoor-baked flatbread brushed with garlic and butter.' },
      { id: 'chana-masala', name: 'Chana Masala', category: 'Mains', price: 9.00, rating: 4.5, reviews: 108, image: 'assets/images/saffron-house/chana-masala.jpg', desc: 'Chickpeas simmered in a tangy, spiced tomato gravy.' },
      { id: 'mango-lassi', name: 'Mango Lassi', category: 'Drinks', price: 4.00, rating: 4.7, reviews: 121, image: 'assets/images/saffron-house/mango-lassi.jpg', desc: 'A cool, creamy yogurt drink blended with sweet mango.' }
    ]
  },
  {
    slug: 'bella-vita',
    name: 'Bella Vita',
    cuisine: 'Italian',
    tagline: 'Rustic Italian, made fresh',
    accent: '#c23b3b',
    rating: 4.8,
    reviews: 590,
    deliveryTime: '30–40 min',
    priceLevel: '$$$',
    address: '5 Main Street, Georgetown',
    cover: 'assets/images/bella-vita/cover.jpg',
    menu: [
      { id: 'margherita-pizza', name: 'Margherita Pizza', category: 'Mains', price: 12.00, rating: 4.8, reviews: 267, image: 'assets/images/bella-vita/margherita-pizza.jpg', desc: 'Wood-fired crust topped with San Marzano tomato, mozzarella, and fresh basil.' },
      { id: 'spaghetti-carbonara', name: 'Spaghetti Carbonara', category: 'Mains', price: 11.50, rating: 4.7, reviews: 188, image: 'assets/images/bella-vita/spaghetti-carbonara.jpg', desc: 'Classic Roman pasta with pancetta, egg, and pecorino.' },
      { id: 'lasagna', name: 'Lasagna', category: 'Mains', price: 13.00, rating: 4.8, reviews: 203, image: 'assets/images/bella-vita/lasagna.jpg', desc: 'Layers of pasta, slow-simmered ragù, and melted cheese.' },
      { id: 'mushroom-risotto', name: 'Mushroom Risotto', category: 'Mains', price: 12.50, rating: 4.6, reviews: 121, image: 'assets/images/bella-vita/mushroom-risotto.jpg', desc: 'Creamy Arborio rice slow-cooked with wild mushrooms and parmesan.' },
      { id: 'bruschetta', name: 'Bruschetta', category: 'Appetizers', price: 6.50, rating: 4.6, reviews: 134, image: 'assets/images/bella-vita/bruschetta.jpg', desc: 'Toasted bread topped with fresh tomato, basil, and olive oil.' },
      { id: 'fettuccine-alfredo', name: 'Fettuccine Alfredo', category: 'Mains', price: 11.00, rating: 4.7, reviews: 149, image: 'assets/images/bella-vita/fettuccine-alfredo.jpg', desc: 'Silky fettuccine tossed in a rich parmesan cream sauce.' },
      { id: 'caprese-salad', name: 'Caprese Salad', category: 'Salads', price: 8.00, rating: 4.6, reviews: 96, image: 'assets/images/bella-vita/caprese-salad.jpg', desc: 'Fresh mozzarella, ripe tomato, and basil drizzled with balsamic.' },
      { id: 'tiramisu', name: 'Tiramisu', category: 'Dessert', price: 6.50, rating: 4.9, reviews: 172, image: 'assets/images/bella-vita/tiramisu.jpg', desc: 'Espresso-soaked ladyfingers layered with mascarpone cream.' }
    ]
  },
  {
    slug: 'smoke-char',
    name: 'Smoke & Char',
    cuisine: 'BBQ & Grill',
    tagline: 'Low, slow, and smoky',
    accent: '#c9622e',
    rating: 4.7,
    reviews: 421,
    deliveryTime: '35–50 min',
    priceLevel: '$$$',
    address: '77 Sheriff Street, Georgetown',
    cover: 'assets/images/smoke-char/cover.jpg',
    menu: [
      { id: 'pulled-pork-sandwich', name: 'Pulled Pork Sandwich', category: 'Mains', price: 10.50, rating: 4.7, reviews: 163, image: 'assets/images/smoke-char/pulled-pork-sandwich.jpg', desc: 'Hickory-smoked pork piled high on a toasted bun with tangy sauce.' },
      { id: 'bbq-ribs', name: 'BBQ Ribs', category: 'Mains', price: 15.00, rating: 4.9, reviews: 210, image: 'assets/images/smoke-char/bbq-ribs.jpg', desc: 'Fall-off-the-bone ribs glazed in a smoky-sweet house sauce.' },
      { id: 'smoked-brisket', name: 'Smoked Brisket', category: 'Mains', price: 14.50, rating: 4.8, reviews: 178, image: 'assets/images/smoke-char/smoked-brisket.jpg', desc: 'Low-and-slow smoked brisket, sliced thick with a peppery bark.' },
      { id: 'grilled-bbq-chicken', name: 'Grilled BBQ Chicken', category: 'Mains', price: 11.00, rating: 4.6, reviews: 142, image: 'assets/images/smoke-char/grilled-bbq-chicken.jpg', desc: 'Charcoal-grilled chicken basted in smoky barbecue glaze.' },
      { id: 'mac-and-cheese', name: 'Mac and Cheese', category: 'Sides', price: 6.00, rating: 4.7, reviews: 131, image: 'assets/images/smoke-char/mac-and-cheese.jpg', desc: 'Baked elbow macaroni in a rich three-cheese sauce.' },
      { id: 'cornbread', name: 'Cornbread', category: 'Sides', price: 3.50, rating: 4.5, reviews: 88, image: 'assets/images/smoke-char/cornbread.jpg', desc: 'Sweet, buttery skillet cornbread.' },
      { id: 'coleslaw', name: 'Coleslaw', category: 'Sides', price: 3.00, rating: 4.3, reviews: 71, image: 'assets/images/smoke-char/coleslaw.jpg', desc: 'Crisp cabbage slaw in a creamy tangy dressing.' },
      { id: 'bbq-wings', name: 'BBQ Chicken Wings', category: 'Appetizers', price: 9.00, rating: 4.7, reviews: 154, image: 'assets/images/smoke-char/bbq-wings.jpg', desc: 'Smoked and grilled wings tossed in house barbecue sauce.' }
    ]
  },
  {
    slug: 'green-bowl',
    name: 'Green Bowl',
    cuisine: 'Vegan & Healthy',
    tagline: 'Clean eating, big flavor',
    accent: '#6a9b4f',
    rating: 4.6,
    reviews: 358,
    deliveryTime: '20–30 min',
    priceLevel: '$$',
    address: '9 Duke Street, Georgetown',
    cover: 'assets/images/green-bowl/cover.jpg',
    menu: [
      { id: 'buddha-bowl', name: 'Buddha Bowl', category: 'Bowls', price: 10.50, rating: 4.7, reviews: 142, image: 'assets/images/green-bowl/buddha-bowl.jpg', desc: 'Quinoa, roasted chickpeas, avocado, and greens with tahini dressing.' },
      { id: 'avocado-toast', name: 'Avocado Toast', category: 'Breakfast', price: 7.50, rating: 4.6, reviews: 118, image: 'assets/images/green-bowl/avocado-toast.jpg', desc: 'Smashed avocado on toasted sourdough with a drizzle of olive oil.' },
      { id: 'quinoa-salad', name: 'Quinoa Salad', category: 'Salads', price: 9.00, rating: 4.5, reviews: 96, image: 'assets/images/green-bowl/quinoa-salad.jpg', desc: 'Quinoa tossed with fresh vegetables and a light citrus dressing.' },
      { id: 'veggie-wrap', name: 'Veggie Wrap', category: 'Wraps', price: 8.00, rating: 4.5, reviews: 87, image: 'assets/images/green-bowl/veggie-wrap.jpg', desc: 'Grilled vegetables and hummus rolled in a soft tortilla.' },
      { id: 'smoothie-bowl', name: 'Smoothie Bowl', category: 'Breakfast', price: 8.50, rating: 4.7, reviews: 131, image: 'assets/images/green-bowl/smoothie-bowl.jpg', desc: 'Blended berries topped with granola, seeds, and fresh fruit.' },
      { id: 'lentil-soup', name: 'Lentil Soup', category: 'Soup', price: 7.00, rating: 4.5, reviews: 74, image: 'assets/images/green-bowl/lentil-soup.jpg', desc: 'Hearty lentils simmered with herbs and warm spice.' },
      { id: 'veg-skewers', name: 'Grilled Vegetable Skewers', category: 'Mains', price: 9.50, rating: 4.6, reviews: 68, image: 'assets/images/green-bowl/veg-skewers.jpg', desc: 'Seasonal vegetables char-grilled to smoky perfection.' },
      { id: 'kale-caesar', name: 'Kale Caesar Salad', category: 'Salads', price: 8.50, rating: 4.4, reviews: 79, image: 'assets/images/green-bowl/kale-caesar.jpg', desc: 'Crisp kale tossed in a creamy dairy-free caesar dressing.' }
    ]
  },
  {
    slug: 'sweet-crumb',
    name: 'Sweet Crumb Bakery',
    cuisine: 'Bakery & Desserts',
    tagline: 'Baked fresh, every morning',
    accent: '#c98a4b',
    rating: 4.9,
    reviews: 467,
    deliveryTime: '20–30 min',
    priceLevel: '$$',
    address: '3 Water Street, Georgetown',
    cover: 'assets/images/sweet-crumb/cover.jpg',
    menu: [
      { id: 'croissant', name: 'Butter Croissant', category: 'Pastries', price: 3.50, rating: 4.8, reviews: 202, image: 'assets/images/sweet-crumb/croissant.jpg', desc: 'Flaky, all-butter croissant baked fresh each morning.' },
      { id: 'cheesecake', name: 'New York Cheesecake', category: 'Dessert', price: 6.00, rating: 4.9, reviews: 176, image: 'assets/images/sweet-crumb/cheesecake.jpg', desc: 'Rich and creamy classic cheesecake with a berry topping.' },
      { id: 'cinnamon-roll', name: 'Cinnamon Roll', category: 'Pastries', price: 4.50, rating: 4.8, reviews: 189, image: 'assets/images/sweet-crumb/cinnamon-roll.jpg', desc: 'Soft, swirled pastry glazed with sweet icing.' },
      { id: 'cupcakes', name: 'Assorted Cupcakes', category: 'Dessert', price: 4.00, rating: 4.6, reviews: 121, image: 'assets/images/sweet-crumb/cupcakes.jpg', desc: 'A mix of chocolate and vanilla cupcakes topped with creamy frosting.' },
      { id: 'macarons', name: 'French Macarons', category: 'Dessert', price: 5.50, rating: 4.7, reviews: 98, image: 'assets/images/sweet-crumb/macarons.jpg', desc: 'Delicate almond meringue shells in a variety of flavors.' },
      { id: 'apple-pie', name: 'Apple Pie', category: 'Dessert', price: 5.50, rating: 4.7, reviews: 104, image: 'assets/images/sweet-crumb/apple-pie.jpg', desc: 'Warm spiced apples baked in a flaky golden crust.' },
      { id: 'blueberry-muffin', name: 'Blueberry Muffin', category: 'Pastries', price: 3.75, rating: 4.6, reviews: 91, image: 'assets/images/sweet-crumb/blueberry-muffin.jpg', desc: 'Moist muffin bursting with fresh blueberries.' },
      { id: 'danish-pastries', name: 'Danish Pastries', category: 'Pastries', price: 4.25, rating: 4.6, reviews: 77, image: 'assets/images/sweet-crumb/danish-pastries.jpg', desc: 'An assortment of flaky, fruit-filled Danish pastries.' }
    ]
  },
  {
    slug: 'patty-stack',
    name: 'Patty Stack',
    cuisine: 'Burgers & American',
    tagline: 'Stacked high, served fast',
    accent: '#c4432f',
    rating: 4.5,
    reviews: 512,
    deliveryTime: '20–30 min',
    priceLevel: '$$',
    address: '61 Robb Street, Georgetown',
    cover: 'assets/images/patty-stack/cover.jpg',
    menu: [
      { id: 'classic-cheeseburger', name: 'Classic Cheeseburger', category: 'Burgers', price: 8.50, rating: 4.6, reviews: 234, image: 'assets/images/patty-stack/classic-cheeseburger.jpg', desc: 'A juicy beef patty with melted cheddar, lettuce, and house sauce.' },
      { id: 'bacon-double-burger', name: 'Bacon Double Burger', category: 'Burgers', price: 10.50, rating: 4.7, reviews: 198, image: 'assets/images/patty-stack/bacon-double-burger.jpg', desc: 'Two beef patties stacked with crispy bacon and melted cheese.' },
      { id: 'loaded-fries', name: 'Loaded Fries', category: 'Sides', price: 6.50, rating: 4.6, reviews: 149, image: 'assets/images/patty-stack/loaded-fries.jpg', desc: 'Crispy fries topped with melted cheese, bacon bits, and sauce.' },
      { id: 'onion-rings', name: 'Onion Rings', category: 'Sides', price: 4.50, rating: 4.4, reviews: 87, image: 'assets/images/patty-stack/onion-rings.jpg', desc: 'Golden battered onion rings, crispy on the outside.' },
      { id: 'classic-hot-dog', name: 'Classic Hot Dog', category: 'Mains', price: 6.00, rating: 4.3, reviews: 76, image: 'assets/images/patty-stack/classic-hot-dog.jpg', desc: 'A grilled all-beef hot dog with mustard and onions.' },
      { id: 'chicken-tenders', name: 'Crispy Chicken Tenders', category: 'Mains', price: 8.00, rating: 4.6, reviews: 141, image: 'assets/images/patty-stack/chicken-tenders.jpg', desc: 'Golden fried chicken tenders served with dipping sauce.' },
      { id: 'bbq-burger', name: 'BBQ Burger', category: 'Burgers', price: 9.50, rating: 4.6, reviews: 118, image: 'assets/images/patty-stack/bbq-burger.jpg', desc: 'Beef patty topped with smoky barbecue sauce and crispy onions.' },
      { id: 'chocolate-milkshake', name: 'Chocolate Milkshake', category: 'Drinks', price: 4.50, rating: 4.8, reviews: 165, image: 'assets/images/patty-stack/chocolate-milkshake.jpg', desc: 'A thick, creamy chocolate shake topped with whipped cream.' }
    ]
  }
];

function getRestaurant(slug) {
  return RESTAURANTS.find(r => r.slug === slug);
}
