// Ethnic Heritage — shared menu data. dish.html reads ?id=<slug> and renders
// whichever item matches. Everything here is local demo data (no backend).
const MENU = [
  // ---------- Starters ----------
  {
    slug: 'lentil-fritters', name: 'Berbere-Spiced Lentil Fritters', category: 'Starters', price: 8.5,
    desc: 'Crisp red lentil fritters seasoned with berbere and toasted cumin, served with a cooling yogurt-mint dip.',
    ingredients: 'Red lentils, berbere spice, toasted cumin, onion, cilantro, yogurt-mint dip',
    image: 'assets/images/lentil-fritters.jpg', alt: 'Crispy spiced lentil fritters with yogurt dip'
  },
  {
    slug: 'halloumi-fig', name: 'Grilled Halloumi & Fig Compote', category: 'Starters', price: 9.0,
    desc: 'Thick-cut halloumi seared until golden, finished with a warm fig and honey compote and toasted walnuts.',
    ingredients: 'Halloumi, fig compote, honey, toasted walnuts, mint',
    image: 'assets/images/halloumi-fig.jpg', alt: 'Grilled halloumi cheese with fig compote'
  },
  {
    slug: 'veg-samosas', name: 'Crispy Vegetable Samosas', category: 'Starters', price: 7.5,
    desc: 'Hand-folded pastry packed with spiced potato, peas, and carrot, fried until shatteringly crisp.',
    ingredients: 'Potato, green peas, carrot, garam masala, tamarind chutney',
    image: 'assets/images/veg-samosas.jpg', alt: 'Crispy golden vegetable samosas'
  },
  {
    slug: 'elote-cups', name: 'Charred Corn Elote Cups', category: 'Starters', price: 8.0,
    desc: 'Grilled sweet corn kernels tossed with lime crema, cotija cheese, and a dusting of chili powder.',
    ingredients: 'Grilled corn, lime crema, cotija cheese, chili powder, cilantro',
    image: 'assets/images/elote-cups.jpg', alt: 'Charred corn elote cups with cotija cheese'
  },

  // ---------- Signature Mains ----------
  {
    slug: 'lamb-tagine', name: 'Marrakech Lamb Tagine', category: 'Signature Mains', price: 26.0, featured: true,
    desc: 'Slow-braised lamb shoulder simmered for hours with apricots, almonds, and warm Moroccan spice until deeply tender.',
    ingredients: 'Lamb shoulder, dried apricot, toasted almonds, cinnamon, ginger, preserved lemon, couscous',
    image: 'assets/images/lamb-tagine.jpg', alt: 'Moroccan lamb tagine with apricots and almonds'
  },
  {
    slug: 'korean-short-rib', name: 'Korean-Style Braised Short Rib', category: 'Signature Mains', price: 28.0, featured: true,
    desc: 'Beef short rib braised low and slow in a soy-ginger glaze, finished under the broiler with scallion and sesame.',
    ingredients: 'Beef short rib, soy-ginger glaze, scallion, sesame seeds, steamed jasmine rice',
    image: 'assets/images/korean-short-rib.jpg', alt: 'Korean-style braised short rib with sesame and scallion'
  },
  {
    slug: 'butter-chicken', name: 'Butter Chicken with Saffron Rice', category: 'Signature Mains', price: 22.0, featured: true,
    desc: 'Tender chicken thigh simmered in a rich tomato-cashew gravy, mellowed with cream and served over saffron basmati.',
    ingredients: 'Chicken thigh, tomato-cashew gravy, cream, garam masala, saffron basmati rice',
    image: 'assets/images/butter-chicken.jpg', alt: 'Butter chicken curry with saffron basmati rice'
  },
  {
    slug: 'lomo-saltado', name: 'Peruvian Lomo Saltado', category: 'Signature Mains', price: 23.0,
    desc: 'Stir-fried strip steak with red onion and tomato in a soy-vinegar sauce, piled over crisp fries and rice.',
    ingredients: 'Strip steak, red onion, tomato, soy-vinegar sauce, fries, white rice',
    image: 'assets/images/lomo-saltado.jpg', alt: 'Peruvian lomo saltado stir-fried steak with fries'
  },
  {
    slug: 'jollof-rice', name: 'Jollof Rice with Grilled Chicken', category: 'Signature Mains', price: 21.0,
    desc: 'Smoky tomato-pepper rice simmered West African-style, served with char-grilled chicken and fried plantain.',
    ingredients: 'Long-grain rice, tomato-pepper base, scotch bonnet, grilled chicken thigh, fried plantain',
    image: 'assets/images/jollof-rice.jpg', alt: 'West African jollof rice with grilled chicken and plantain'
  },

  // ---------- Vegetarian ----------
  {
    slug: 'falafel-platter', name: 'Falafel & Hummus Platter', category: 'Vegetarian', price: 17.0,
    desc: 'Herb-flecked falafel, silky hummus, and warm pita, rounded out with pickled turnip and a drizzle of tahini.',
    ingredients: 'Chickpea falafel, hummus, pickled turnip, tahini, warm pita',
    image: 'assets/images/falafel-platter.jpg', alt: 'Falafel and hummus platter with pita'
  },
  {
    slug: 'thai-green-curry', name: 'Thai Green Curry with Tofu', category: 'Vegetarian', price: 18.0,
    desc: 'Crisp tofu and seasonal vegetables simmered in a fragrant coconut green curry, served with jasmine rice.',
    ingredients: 'Tofu, coconut milk, green curry paste, Thai basil, bell pepper, jasmine rice',
    image: 'assets/images/thai-green-curry.jpg', alt: 'Thai green curry with tofu and vegetables'
  },
  {
    slug: 'cauliflower-bowl', name: 'Roasted Cauliflower Shawarma Bowl', category: 'Vegetarian', price: 16.5,
    desc: 'Shawarma-spiced roasted cauliflower over herbed rice with tahini, pickled cabbage, and toasted pine nuts.',
    ingredients: 'Cauliflower, shawarma spice blend, herbed rice, tahini, pickled cabbage, pine nuts',
    image: 'assets/images/cauliflower-bowl.jpg', alt: 'Roasted cauliflower shawarma bowl with tahini'
  },

  // ---------- Seafood ----------
  {
    slug: 'branzino', name: 'Grilled Branzino with Chimichurri', category: 'Seafood', price: 27.0, featured: true,
    desc: 'Whole branzino fillet grilled over open flame and finished with a bright, herby chimichurri.',
    ingredients: 'Branzino fillet, parsley chimichurri, garlic, olive oil, grilled lemon',
    image: 'assets/images/branzino.jpg', alt: 'Grilled branzino fillet with chimichurri sauce'
  },
  {
    slug: 'paella', name: 'Shrimp & Chorizo Paella', category: 'Seafood', price: 24.0, featured: true,
    desc: 'Saffron rice simmered with shrimp, chorizo, and sweet peppers until the bottom turns deep golden and crisp.',
    ingredients: 'Bomba rice, shrimp, chorizo, saffron, sweet peppers, peas',
    image: 'assets/images/paella.jpg', alt: 'Shrimp and chorizo paella with saffron rice'
  },
  {
    slug: 'miso-salmon', name: 'Miso-Glazed Salmon', category: 'Seafood', price: 25.0,
    desc: 'Salmon fillet marinated in sweet miso and broiled until caramelized, served with steamed bok choy and rice.',
    ingredients: 'Salmon, white miso glaze, bok choy, sesame, steamed rice',
    image: 'assets/images/miso-salmon.jpg', alt: 'Miso-glazed salmon fillet with bok choy'
  },

  // ---------- Desserts ----------
  {
    slug: 'baklava', name: 'Baklava with Pistachio & Honey', category: 'Desserts', price: 8.0,
    desc: 'Layers of crisp phyllo and crushed pistachio, soaked in a light honey syrup.',
    ingredients: 'Phyllo dough, pistachio, honey syrup, cinnamon',
    image: 'assets/images/baklava.jpg', alt: 'Baklava pastry with pistachio and honey'
  },
  {
    slug: 'mango-sticky-rice', name: 'Mango Sticky Rice', category: 'Desserts', price: 8.5,
    desc: 'Warm coconut sticky rice paired with ripe mango and a drizzle of sweet coconut cream.',
    ingredients: 'Sticky rice, coconut cream, ripe mango, toasted sesame',
    image: 'assets/images/mango-sticky-rice.jpg', alt: 'Mango sticky rice with coconut cream'
  },
  {
    slug: 'tres-leches', name: 'Tres Leches Cake', category: 'Desserts', price: 7.5,
    desc: 'Soft sponge cake soaked in a trio of milks, topped with lightly whipped cream and cinnamon.',
    ingredients: 'Sponge cake, evaporated milk, condensed milk, cream, cinnamon',
    image: 'assets/images/tres-leches.jpg', alt: 'Slice of tres leches cake'
  },

  // ---------- Menu Preview Picks ----------
  {
    slug: 'moonlit-shrimp-crescents', name: 'Moonlit Shrimp Crescents', category: 'Seafood', price: 14.0,
    desc: 'Delicate crescent-folded dumplings packed with sweet shrimp, steamed until translucent and finished with a citrus-soy drizzle.',
    ingredients: 'Shrimp, rice dumpling wrapper, ginger, scallion, citrus-soy drizzle, roe',
    image: 'assets/images/shrimp-crescents.jpg', alt: 'Steamed shrimp crescent dumplings in a bamboo basket'
  },
  {
    slug: 'alpine-breeze-cheese-salad', name: 'Alpine Breeze Cheese Salad', category: 'Starters', price: 11.0,
    desc: 'Marinated cheese cubes tossed with crisp cucumber, tomato, red onion, and fresh herbs for a bright, cooling starter.',
    ingredients: 'Marinated cheese, cucumber, tomato, red onion, parsley, mint, olive oil',
    image: 'assets/images/cheese-salad.jpg', alt: 'Marinated cheese salad with chopped vegetables and herbs'
  },
  {
    slug: 'nomads-burrito', name: "Nomad's Burrito", category: 'Vegetarian', price: 15.0,
    desc: 'A hand-rolled flatbread pocket stuffed with seasoned rice, sweet corn, tomato, and melted cheese — built for travel, built for flavor.',
    ingredients: 'Flour tortilla, seasoned rice, black beans, sweet corn, tomato, melted cheese, salsa',
    image: 'assets/images/nomads-burrito.jpg', alt: 'Vegetarian burrito wrap sliced open on a plate'
  },

  // ---------- Beverages ----------
  {
    slug: 'hibiscus-tea', name: 'Hibiscus Iced Tea (Agua de Jamaica)', category: 'Beverages', price: 4.5,
    desc: 'House-steeped hibiscus over ice, lightly sweetened and finished with a twist of lime.',
    ingredients: 'Dried hibiscus, cane sugar, lime',
    image: 'assets/images/hibiscus-tea.jpg', alt: 'Glass of iced hibiscus tea with lime'
  },
  {
    slug: 'masala-chai', name: 'Masala Chai Latte', category: 'Beverages', price: 5.0,
    desc: 'Black tea simmered with cardamom, cinnamon, and ginger, steamed with milk.',
    ingredients: 'Black tea, cardamom, cinnamon, ginger, steamed milk',
    image: 'assets/images/masala-chai.jpg', alt: 'Masala chai latte in a glass mug'
  },
  {
    slug: 'mint-lemonade', name: 'Fresh Mint Lemonade', category: 'Beverages', price: 4.0,
    desc: 'Bright, house-pressed lemonade muddled with fresh mint leaves.',
    ingredients: 'Fresh lemon juice, mint, cane sugar, soda water',
    image: 'assets/images/mint-lemonade.jpg', alt: 'Fresh mint lemonade with lemon slices'
  }
];

const CATEGORY_ORDER = ['Starters', 'Signature Mains', 'Vegetarian', 'Seafood', 'Desserts', 'Beverages'];
const DELIVERY_FEE = 3.5;
const SERVICE_FEE_RATE = 0.06;
