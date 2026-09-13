// Shared blog post data — edit this array to change posts across the whole site.
const ARTICLES = [
  {
    slug: 'bourda-at-golden-hour',
    title: 'Bourda at Golden Hour',
    excerpt: 'Every morning before the heat sets in, Merriman\'s Mall fills with fruit, veg, and the kind of bargaining you only pick up by watching.',
    category: 'City Guides',
    image: 'assets/images/image-01.jpg',
    alt: 'Bourda Market, Georgetown, bustling with vendors and shoppers at golden hour'
  },
  {
    slug: 'pot-that-never-empties',
    title: 'The Pot That Never Empties',
    excerpt: 'Pepperpot is the dish Guyanese families circle back to all year, but especially at Christmas — beef simmered for hours in cassareep until it\'s dark, sticky, and impossible to rush.',
    category: 'Local Dishes',
    image: 'assets/images/image-02.jpg',
    alt: 'A bowl of Guyanese pepperpot stew with a hard-boiled egg'
  },
  {
    slug: 'rahamans-fruits-curbside',
    title: 'Rahaman\'s Fruits, Curbside',
    excerpt: 'Half grocery run, half neighborhood institution — this truck parks in the same spot every week, flags snapping overhead, and sells out of whatever\'s ripest before noon.',
    category: 'Street Food',
    image: 'assets/images/image-03.jpg',
    alt: 'A fruit vendor\'s truck flying the Guyana flag, piled high with produce'
  },
  {
    slug: 'four-for-a-hundred',
    title: 'Four For A Hundred',
    excerpt: 'Deep in the market\'s back lanes, where the aisles narrow and everyone seems to know everyone, the prices are chalked on cardboard and nothing has a fixed cost.',
    category: 'City Guides',
    image: 'assets/images/image-04.jpg',
    alt: 'A narrow market lane lined with vendor stalls selling snacks and drinks'
  },
  {
    slug: 'black-cake-behind-the-market',
    title: 'The Bakery That Times Its Black Cake Just Right',
    excerpt: 'Behind the market, a family bakery pulls trays of black cake out of the oven all December — dense, dark, and soaked in rum and cherry brandy for months beforehand.',
    category: 'Sweets & Desserts',
    image: 'assets/images/image-05.jpg',
    alt: 'Freshly baked Guyanese black cake cooling in the pan'
  },
  {
    slug: 'chow-mein-georgetown-style',
    title: 'Chow Mein, Georgetown Style',
    excerpt: 'Guyana\'s Chinese-Guyanese kitchens have been quietly perfecting this dish for generations — heavy on garlic, loaded with vegetables, and never quite the same recipe twice.',
    category: 'Street Food',
    image: 'assets/images/pexels-makafood-82669418-9045156.jpg',
    alt: 'A plate of vegetable chow mein noodles with cabbage, carrots and peppers'
  },
  {
    slug: 'stew-beef-no-rice-required',
    title: 'Stew Beef That Doesn\'t Need the Rice',
    excerpt: 'Most stew beef comes with a mountain of rice on the side, but this cabbage-and-carrot version proves the meat can carry a plate all on its own.',
    category: 'Local Dishes',
    image: 'assets/images/pexels-audy-of-course-306413796-20500494.jpg',
    alt: 'Stewed beef with sautéed cabbage and shredded carrot in a serving dish'
  },
  {
    slug: 'one-plate-lunch-everyone-orders',
    title: 'The One-Plate Lunch Everyone Orders',
    excerpt: 'Chicken, rice, coleslaw, a fried pastry wedged in wherever it fits — the lunch trays outside Stabroek Market move fast, and regulars already know what they\'re pointing at.',
    category: 'Street Food',
    image: 'assets/images/pexels-dennisshotit-8166269.jpg',
    alt: 'A cook shop lunch plate of chicken, rice, coleslaw and a fried pastry being served from steam trays'
  },
  {
    slug: 'sunday-dinner-any-which-way',
    title: 'Sunday Dinner, Any Which Way',
    excerpt: 'Ask five Georgetown households what\'s on the table this Sunday and you\'ll get five different answers — stew chicken, seasoned rice, fried plantain — but somehow it\'s always enough for everyone who shows up.',
    category: 'Local Dishes',
    image: 'assets/images/pexels-keesha-s-kitchen-22731136-13971298.jpg',
    alt: 'Skillets of stewed chicken, seasoned rice, fried plantain and pepper sauce laid out for Sunday dinner'
  },
  {
    slug: 'bake-mans-corner',
    title: 'The Bake Man\'s Corner',
    excerpt: 'Every neighborhood has one — a stand that only sells fried bake, cooked to order, gone by mid-morning. Get there early or you\'re waiting on the next batch.',
    category: 'Street Food',
    image: 'assets/images/pexels-khairulonggon-908180.jpg',
    alt: 'A tray piled with freshly fried Guyanese bakes'
  },
  {
    slug: 'rice-peas-and-whatevers-stewing',
    title: 'Rice, Peas, and Whatever\'s Stewing',
    excerpt: 'The formula barely changes from house to house: white rice, a pot of peas, a fresh tomato salad, and whatever meat\'s been stewing since morning. It\'s the closest thing Guyana has to a national plate.',
    category: 'Local Dishes',
    image: 'assets/images/pexels-lucasandrade-19781592.jpg',
    alt: 'A Guyanese meal spread of white rice, stewed peas, tomato salad and stewed meat'
  },
  {
    slug: 'buffet-line-at-every-wedding',
    title: 'The Buffet Line at Every Guyanese Wedding',
    excerpt: 'Chafing dishes stretching the length of the hall, cook-up rice next to curry next to black pudding — no two caterers do it exactly the same, but the line always moves the same way.',
    category: 'City Guides',
    image: 'assets/images/pexels-micklatter-18749077.jpg',
    alt: 'A row of chafing dishes at a Guyanese wedding buffet with guests serving themselves'
  },
  {
    slug: 'curry-chicken-sunday-style',
    title: 'Curry Chicken, Sunday Style',
    excerpt: 'Potatoes gone soft enough to fall apart, chicken that\'s been simmering since the curry powder hit the pot — this is the dish that means Sunday lunch is almost ready.',
    category: 'Local Dishes',
    image: 'assets/images/pexels-snappr-27568542.jpg',
    alt: 'A bowl of curry chicken with potatoes'
  }
];
