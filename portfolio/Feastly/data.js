// Feastly — shared restaurant + menu data.
// order.html is the reusable dashboard template: it reads ?restaurant=<slug>
// and renders whichever restaurant matches from RESTAURANTS below.

const RESTAURANTS = [
  {
    slug: 'golden-spoon',
    name: 'Golden Spoon',
    cuisine: 'Guyanese & Caribbean',
    tagline: 'Home-style Caribbean comfort food',
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
      { id: 'mauby-punch', name: 'Mauby Punch', category: 'Drinks', price: 3.50, rating: 4.4, reviews: 65, image: 'assets/images/golden-spoon/mauby-punch.jpg', desc: 'A chilled tropical fruit punch with a refreshing bittersweet edge.' },
      { id: 'channa-aloo', name: 'Channa and Aloo', category: 'Mains', price: 9.50, rating: 4.6, reviews: 88, image: 'assets/images/golden-spoon/channa-aloo.jpg', desc: 'Curried chickpeas and potatoes simmered in warm spice, served with roti.' },
      { id: 'coconut-bake', name: 'Coconut Bake', category: 'Breakfast', price: 4.50, rating: 4.7, reviews: 61, image: 'assets/images/golden-spoon/coconut-bake.jpg', desc: 'A soft, slightly sweet fried bread made with coconut, a Guyanese breakfast staple.' }
    ]
  },
  {
    slug: 'jade-wok',
    name: 'Jade Wok',
    cuisine: 'Chinese',
    tagline: 'Wok-fired classics, fast',
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
      { id: 'hot-pot-vegetables', name: 'Hot Pot Vegetables', category: 'Mains', price: 10.00, rating: 4.4, reviews: 74, image: 'assets/images/jade-wok/hot-pot-vegetables.jpg', desc: 'A steaming pot of fresh vegetables and mushrooms simmered in savory broth.' },
      { id: 'beef-broccoli', name: 'Beef and Broccoli', category: 'Mains', price: 11.50, rating: 4.7, reviews: 143, image: 'assets/images/jade-wok/beef-broccoli.jpg', desc: 'Tender wok-seared beef and crisp broccoli in a savory garlic sauce.' },
      { id: 'fried-wontons', name: 'Fried Wontons', category: 'Appetizers', price: 6.50, rating: 4.6, reviews: 102, image: 'assets/images/jade-wok/fried-wontons.jpg', desc: 'Crispy fried wontons served with a sweet and tangy dipping sauce.' }
    ]
  },
  {
    slug: 'saffron-house',
    name: 'Saffron House',
    cuisine: 'Indian',
    tagline: 'Spice-forward home cooking',
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
      { id: 'mango-lassi', name: 'Mango Lassi', category: 'Drinks', price: 4.00, rating: 4.7, reviews: 121, image: 'assets/images/saffron-house/mango-lassi.jpg', desc: 'A cool, creamy yogurt drink blended with sweet mango.' },
      { id: 'dal-makhani', name: 'Dal Makhani', category: 'Mains', price: 9.50, rating: 4.8, reviews: 137, image: 'assets/images/saffron-house/dal-makhani.jpg', desc: 'Black lentils and kidney beans simmered slow with butter and cream.' },
      { id: 'gulab-jamun', name: 'Gulab Jamun', category: 'Dessert', price: 5.00, rating: 4.8, reviews: 94, image: 'assets/images/saffron-house/gulab-jamun.jpg', desc: 'Warm milk-solid dumplings soaked in rose-scented sugar syrup.' }
    ]
  },
  {
    slug: 'bella-vita',
    name: 'Bella Vita',
    cuisine: 'Italian',
    tagline: 'Rustic Italian, made fresh',
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
      { id: 'tiramisu', name: 'Tiramisu', category: 'Dessert', price: 6.50, rating: 4.9, reviews: 172, image: 'assets/images/bella-vita/tiramisu.jpg', desc: 'Espresso-soaked ladyfingers layered with mascarpone cream.' },
      { id: 'chicken-parmesan', name: 'Chicken Parmesan', category: 'Mains', price: 13.50, rating: 4.8, reviews: 158, image: 'assets/images/bella-vita/chicken-parmesan.png', desc: 'Breaded chicken cutlet baked with marinara and melted mozzarella.' },
      { id: 'panna-cotta', name: 'Panna Cotta', category: 'Dessert', price: 6.00, rating: 4.7, reviews: 89, image: 'assets/images/bella-vita/panna-cotta.jpg', desc: 'Silky vanilla cream set lightly, topped with a fresh berry sauce.' }
    ]
  },
  {
    slug: 'smoke-char',
    name: 'Smoke & Char',
    cuisine: 'BBQ & Grill',
    tagline: 'Low, slow, and smoky',
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
      { id: 'bbq-wings', name: 'BBQ Chicken Wings', category: 'Appetizers', price: 9.00, rating: 4.7, reviews: 154, image: 'assets/images/smoke-char/bbq-wings.jpg', desc: 'Smoked and grilled wings tossed in house barbecue sauce.' },
      { id: 'smoked-sausage', name: 'Smoked Sausage', category: 'Mains', price: 9.50, rating: 4.6, reviews: 99, image: 'assets/images/smoke-char/smoked-sausage.jpg', desc: 'Hickory-smoked sausage links, charred and juicy off the grill.' },
      { id: 'baked-beans', name: 'Baked Beans', category: 'Sides', price: 4.50, rating: 4.5, reviews: 82, image: 'assets/images/smoke-char/baked-beans.jpg', desc: 'Slow-cooked beans in a smoky, slightly sweet tomato sauce.' }
    ]
  },
  {
    slug: 'green-bowl',
    name: 'Green Bowl',
    cuisine: 'Vegan & Healthy',
    tagline: 'Clean eating, big flavor',
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
      { id: 'kale-caesar', name: 'Kale Caesar Salad', category: 'Salads', price: 8.50, rating: 4.4, reviews: 79, image: 'assets/images/green-bowl/kale-caesar.jpg', desc: 'Crisp kale tossed in a creamy dairy-free caesar dressing.' },
      { id: 'hummus-plate', name: 'Hummus & Veggie Plate', category: 'Appetizers', price: 7.50, rating: 4.6, reviews: 91, image: 'assets/images/green-bowl/hummus-plate.jpg', desc: 'Creamy hummus served with fresh cucumber, tomato, carrot, and olives.' },
      { id: 'vegan-chili', name: 'Vegan Chili', category: 'Mains', price: 9.00, rating: 4.6, reviews: 84, image: 'assets/images/green-bowl/vegan-chili.jpg', desc: 'Black beans and corn simmered in a smoky tomato chili, served with brown rice.' }
    ]
  },
  {
    slug: 'sweet-crumb',
    name: 'Sweet Crumb Bakery',
    cuisine: 'Bakery & Desserts',
    tagline: 'Baked fresh, every morning',
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
      { id: 'danish-pastries', name: 'Danish Pastries', category: 'Pastries', price: 4.25, rating: 4.6, reviews: 77, image: 'assets/images/sweet-crumb/danish-pastries.jpg', desc: 'An assortment of flaky, fruit-filled Danish pastries.' },
      { id: 'chocolate-brownie', name: 'Chocolate Brownie', category: 'Dessert', price: 4.75, rating: 4.8, reviews: 143, image: 'assets/images/sweet-crumb/chocolate-brownie.jpg', desc: 'Rich, fudgy brownies studded with walnuts.' },
      { id: 'banana-bread', name: 'Banana Bread', category: 'Pastries', price: 4.00, rating: 4.7, reviews: 108, image: 'assets/images/sweet-crumb/banana-bread.jpg', desc: 'A moist, home-style loaf baked fresh with ripe bananas.' }
    ]
  },
  {
    slug: 'patty-stack',
    name: 'Patty Stack',
    cuisine: 'Guyanese & Caribbean',
    tagline: 'Caribbean grill, stacked high',
    rating: 4.5,
    reviews: 512,
    deliveryTime: '20–30 min',
    priceLevel: '$$',
    address: '61 Robb Street, Georgetown',
    cover: 'assets/images/patty-stack/cover.jpg',
    menu: [
      { id: 'classic-cheeseburger', name: 'Georgetown Cheeseburger', category: 'Burgers', price: 8.50, rating: 4.6, reviews: 234, image: 'assets/images/patty-stack/classic-cheeseburger.jpg', desc: 'A juicy beef patty with melted cheddar, lettuce, and house sauce.' },
      { id: 'bacon-double-burger', name: 'Bacon Double Burger', category: 'Burgers', price: 10.50, rating: 4.7, reviews: 198, image: 'assets/images/patty-stack/bacon-double-burger.jpg', desc: 'Two beef patties stacked with crispy bacon and melted cheese.' },
      { id: 'loaded-fries', name: 'Loaded Fries', category: 'Sides', price: 6.50, rating: 4.6, reviews: 149, image: 'assets/images/patty-stack/loaded-fries.jpg', desc: 'Crispy fries topped with melted cheese, bacon bits, and sauce.' },
      { id: 'onion-rings', name: 'Onion Rings', category: 'Sides', price: 4.50, rating: 4.4, reviews: 87, image: 'assets/images/patty-stack/onion-rings.jpg', desc: 'Golden battered onion rings, crispy on the outside.' },
      { id: 'classic-hot-dog', name: 'Island Hot Dog', category: 'Mains', price: 6.00, rating: 4.3, reviews: 76, image: 'assets/images/patty-stack/classic-hot-dog.jpg', desc: 'A grilled all-beef hot dog with mustard and onions.' },
      { id: 'chicken-tenders', name: 'Crispy Chicken Tenders', category: 'Mains', price: 8.00, rating: 4.6, reviews: 141, image: 'assets/images/patty-stack/chicken-tenders.jpg', desc: 'Golden fried chicken tenders served with dipping sauce.' },
      { id: 'bbq-burger', name: 'Jerk BBQ Burger', category: 'Burgers', price: 9.50, rating: 4.6, reviews: 118, image: 'assets/images/patty-stack/bbq-burger.jpg', desc: 'Beef patty topped with smoky jerk barbecue sauce and crispy onions.' },
      { id: 'chocolate-milkshake', name: 'Chocolate Milkshake', category: 'Drinks', price: 4.50, rating: 4.8, reviews: 165, image: 'assets/images/patty-stack/chocolate-milkshake.jpg', desc: 'A thick, creamy chocolate shake topped with whipped cream.' },
      { id: 'fish-burger', name: 'Fish Burger', category: 'Burgers', price: 9.00, rating: 4.6, reviews: 112, image: 'assets/images/patty-stack/fish-burger.jpg', desc: 'A crispy fried fish fillet with lettuce and tartar sauce on a toasted bun.' },
      { id: 'plantain-chips', name: 'Sweet Plantain Chips', category: 'Sides', price: 4.00, rating: 4.7, reviews: 68, image: 'assets/images/patty-stack/plantain-chips.jpg', desc: 'Ripe plantains sliced and fried golden until caramelized at the edges.' }
    ]
  },
  {
    slug: 'casa-salsa',
    name: 'Casa Salsa',
    cuisine: 'Mexican',
    tagline: 'Bold flavors, fresh off the grill',
    rating: 4.6,
    reviews: 389,
    deliveryTime: '25–35 min',
    priceLevel: '$$',
    address: '31 Cummings Street, Georgetown',
    cover: 'assets/images/casa-salsa/cover.jpg',
    menu: [
      { id: 'street-tacos', name: 'Street Tacos', category: 'Tacos', price: 9.50, rating: 4.7, reviews: 168, image: 'assets/images/casa-salsa/street-tacos.jpg', desc: 'Three corn tortillas piled with seasoned beef, onion, and cilantro, finished with a squeeze of lime.' },
      { id: 'burrito-supreme', name: 'Burrito Supreme', category: 'Burritos', price: 10.50, rating: 4.6, reviews: 142, image: 'assets/images/casa-salsa/burrito.jpg', desc: 'A hearty flour tortilla stuffed with seasoned rice, black beans, cheese, and your choice of meat.' },
      { id: 'grilled-quesadilla', name: 'Grilled Quesadilla', category: 'Mains', price: 9.00, rating: 4.6, reviews: 121, image: 'assets/images/casa-salsa/quesadilla.jpg', desc: 'Crisp-grilled tortilla folded over melted cheese and peppers, served with salsa on the side.' },
      { id: 'guacamole-chips', name: 'Guacamole & Chips', category: 'Appetizers', price: 6.50, rating: 4.8, reviews: 176, image: 'assets/images/casa-salsa/guacamole.jpg', desc: 'Fresh-mashed avocado with lime, cilantro, and onion, served with warm tortilla chips.' },
      { id: 'churros', name: 'Churros', category: 'Dessert', price: 5.00, rating: 4.8, reviews: 98, image: 'assets/images/casa-salsa/churros.jpg', desc: 'Crisp cinnamon-sugar churros served with chocolate and dulce de leche for dipping.' },
      { id: 'horchata', name: 'Horchata', category: 'Drinks', price: 3.50, rating: 4.6, reviews: 74, image: 'assets/images/casa-salsa/horchata.jpg', desc: 'A chilled, creamy rice drink sweetened with cinnamon.' },
      { id: 'chicken-enchiladas', name: 'Chicken Enchiladas', category: 'Mains', price: 11.00, rating: 4.7, reviews: 134, image: 'assets/images/casa-salsa/enchiladas.jpg', desc: 'Rolled tortillas filled with shredded chicken, topped with red sauce, cheese, and crema.' },
      { id: 'street-corn', name: 'Mexican Street Corn', category: 'Sides', price: 4.50, rating: 4.7, reviews: 87, image: 'assets/images/casa-salsa/elote.jpg', desc: 'Grilled corn on the cob coated in crema, cotija cheese, chili powder, and lime.' },
      { id: 'nachos-supreme', name: 'Nachos Supreme', category: 'Appetizers', price: 9.00, rating: 4.7, reviews: 156, image: 'assets/images/casa-salsa/nachos.jpg', desc: 'Crispy tortilla chips loaded with melted cheese, beef, and pico de gallo.' },
      { id: 'carne-asada', name: 'Carne Asada', category: 'Mains', price: 13.50, rating: 4.8, reviews: 122, image: 'assets/images/casa-salsa/carne-asada.jpg', desc: 'Grilled marinated steak sliced thin, served with rice, beans, and fresh avocado.' }
    ]
  },
  {
    slug: 'tide-and-net',
    name: 'Tide & Net',
    cuisine: 'Seafood',
    tagline: 'Fresh off the boat, straight to your plate',
    rating: 4.7,
    reviews: 356,
    deliveryTime: '30–45 min',
    priceLevel: '$$$',
    address: '58 Croal Street, Georgetown',
    cover: 'assets/images/tide-and-net/cover.jpg',
    menu: [
      { id: 'grilled-salmon', name: 'Grilled Salmon', category: 'Mains', price: 16.00, rating: 4.8, reviews: 151, image: 'assets/images/tide-and-net/grilled-salmon.jpg', desc: 'Char-grilled salmon fillet with sautéed greens, roasted onions, and a squeeze of lime.' },
      { id: 'garlic-butter-shrimp', name: 'Garlic Butter Shrimp', category: 'Mains', price: 14.50, rating: 4.8, reviews: 163, image: 'assets/images/tide-and-net/garlic-shrimp.jpg', desc: 'Jumbo shrimp seared in garlic butter and fresh herbs, served sizzling.' },
      { id: 'crab-cakes', name: 'Crab Cakes', category: 'Appetizers', price: 11.50, rating: 4.7, reviews: 118, image: 'assets/images/tide-and-net/crab-cakes.jpg', desc: 'Pan-fried cakes packed with lump crab meat, lightly breaded and served with a creamy dip.' },
      { id: 'fish-and-chips', name: 'Fish and Chips', category: 'Mains', price: 12.50, rating: 4.6, reviews: 174, image: 'assets/images/tide-and-net/fish-and-chips.jpg', desc: 'Beer-battered fish fillets fried golden, served with crinkle-cut fries and tartar sauce.' },
      { id: 'shrimp-ceviche', name: 'Shrimp Ceviche', category: 'Appetizers', price: 10.00, rating: 4.7, reviews: 92, image: 'assets/images/tide-and-net/ceviche.jpg', desc: 'Citrus-cured shrimp tossed with red onion and fresh herbs, served chilled.' },
      { id: 'fried-calamari', name: 'Fried Calamari', category: 'Appetizers', price: 9.50, rating: 4.6, reviews: 109, image: 'assets/images/tide-and-net/calamari.jpg', desc: 'Crispy fried calamari rings tossed with chili and herbs, served with a citrus dipping sauce.' },
      { id: 'grilled-lobster-tail', name: 'Grilled Lobster Tail', category: 'Mains', price: 22.00, rating: 4.9, reviews: 87, image: 'assets/images/tide-and-net/lobster-tail.jpg', desc: 'Butter-basted lobster tail grilled to perfection, served over fresh greens with lemon.' },
      { id: 'seafood-chowder', name: 'Seafood Chowder', category: 'Soup', price: 8.50, rating: 4.7, reviews: 96, image: 'assets/images/tide-and-net/seafood-chowder.jpg', desc: 'A creamy chowder loaded with shrimp and mussels, finished with fresh herbs.' },
      { id: 'grilled-octopus', name: 'Grilled Octopus', category: 'Appetizers', price: 14.00, rating: 4.8, reviews: 73, image: 'assets/images/tide-and-net/grilled-octopus.jpg', desc: 'Char-grilled octopus tentacle, tender inside with a smoky charred edge.' },
      { id: 'oysters-half-shell', name: 'Oysters on the Half Shell', category: 'Appetizers', price: 15.00, rating: 4.8, reviews: 64, image: 'assets/images/tide-and-net/oysters.jpg', desc: 'A dozen chilled fresh oysters served on ice with lemon.' }
    ]
  }
];

function getRestaurant(slug) {
  return RESTAURANTS.find(r => r.slug === slug);
}
