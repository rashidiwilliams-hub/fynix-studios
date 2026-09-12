// Lux Rentals — shared fleet + customer data.
// rental-overview.html reads ?id=<slug> against FLEET, like a product-detail template.

const PART_NAMES = ['Front', 'Roof', 'Hood', 'Doors', 'Windows', 'Back', 'Boot', 'Headlights', 'Rearlights', 'Bumpers', 'Mirrors', 'Wheels', 'Rims', 'Paint Job'];

function buildParts(overrides) {
  overrides = overrides || {};
  return PART_NAMES.map(function (part) {
    const o = overrides[part];
    return {
      part: part,
      condition: (o && o.condition) || 'Good',
      note: (o && o.note) || 'Inspected at last turnaround — no visible wear, chips, or misalignment.'
    };
  });
}

const FLEET = [
  {
    slug: 'voss-suv-elite',
    name: 'Voss SUV Elite',
    category: 'SUV',
    year: 2025,
    dailyRate: 219,
    status: 'Available',
    mileage: 8420,
    plate: 'LUX-1042',
    images: ['assets/images/voss-suv-elite.jpg?v=2'],
    alt: 'White Voss SUV Elite parked on a tree-lined avenue',
    revenue: { currentRentalRevenue: 1533.00, duration: 7, returnDate: 'September 19, 2026', quarterLabel: '2026 Q3', quarterRevenue: 9840.50, defaultPayments: 0, maintenanceCost: 1120 },
    priorRentals: [
      { customerName: 'Daniel Cross', avatar: 'assets/images/avatar-daniel-cross.jpg', returnDate: '9.2.26', status: 'Cleared', amount: 1533.00 },
      { customerName: 'Priya Nair', avatar: 'assets/images/avatar-priya-nair.jpg', returnDate: '8.14.26', status: 'Cleared', amount: 987.00 },
      { customerName: 'Marcus Reed', avatar: 'assets/images/avatar-marcus-reed.jpg', returnDate: '7.29.26', status: 'Cleared', amount: 1204.50 },
      { customerName: 'Jasmine Boyd', avatar: 'assets/images/avatar-jasmine-boyd.jpg', returnDate: '7.11.26', status: 'Pending', amount: 657.00 }
    ],
    partsOverview: buildParts({
      Windows: { condition: 'Fair', note: 'Minor pitting on the front windshield from highway debris — does not obstruct view.' },
      Wheels: { condition: 'Fair', note: 'Front-right rim has light curb rash; scheduled for polishing next service.' }
    })
  },
  {
    slug: 'sterling-gt-coupe',
    name: 'Sterling GT Coupe',
    category: 'Sports Coupe',
    year: 2026,
    dailyRate: 430.13,
    status: 'Rented',
    mileage: 3110,
    plate: 'LUX-2287',
    images: ['assets/images/sterling-gt-coupe.jpg?v=2'],
    alt: 'Black Sterling GT Coupe front view in a showroom',
    revenue: { currentRentalRevenue: 430.13, duration: 14, returnDate: 'November 11, 2026', quarterLabel: '2026 Q3', quarterRevenue: 12496.05, defaultPayments: 520, maintenanceCost: 4900 },
    priorRentals: [
      { customerName: 'Renita Williams', avatar: 'assets/images/avatar-amara-okoye.jpg', returnDate: '8.4.26', status: 'Cleared', amount: 2000.00 },
      { customerName: 'Victoria Lee', avatar: 'assets/images/avatar-sofia-marin.jpg', returnDate: '9.6.26', status: 'Cleared', amount: 480.00 },
      { customerName: 'Natalia Musk', avatar: 'assets/images/avatar-linda-hayes.jpg', returnDate: '9.23.26', status: 'Pending', amount: 640.00 },
      { customerName: 'Caleb Stone', avatar: 'assets/images/avatar-rafael-costa.jpg', returnDate: '10.2.26', status: 'Cleared', amount: 1200.00 }
    ],
    partsOverview: buildParts({
      Bumpers: { condition: 'Needs Attention', note: 'Hairline scuff on the front splitter from a low approach angle — flagged for cosmetic touch-up.' },
      'Paint Job': { condition: 'Fair', note: 'Light swirl marks under direct light; due for a maintenance detail pass.' }
    })
  },
  {
    slug: 'meridian-cabrio',
    name: 'Meridian Cabrio',
    category: 'Convertible',
    year: 2024,
    dailyRate: 268,
    status: 'Available',
    mileage: 14990,
    plate: 'LUX-3355',
    images: ['assets/images/meridian-cabrio.jpg?v=2'],
    alt: 'White Meridian Cabrio convertible with the top down in a parking area',
    revenue: { currentRentalRevenue: 1876.00, duration: 7, returnDate: 'September 21, 2026', quarterLabel: '2026 Q3', quarterRevenue: 8320.00, defaultPayments: 0, maintenanceCost: 980 },
    priorRentals: [
      { customerName: 'Sofia Marin', avatar: 'assets/images/avatar-sofia-marin.jpg', returnDate: '8.28.26', status: 'Cleared', amount: 1876.00 },
      { customerName: 'Andre Lucas', avatar: 'assets/images/avatar-andre-lucas.jpg', returnDate: '8.9.26', status: 'Cleared', amount: 804.00 },
      { customerName: 'Kenji Oyama', avatar: 'assets/images/avatar-kenji-oyama.jpg', returnDate: '7.22.26', status: 'Cleared', amount: 1340.00 }
    ],
    partsOverview: buildParts({
      Roof: { condition: 'Fair', note: 'Soft-top folds and seals correctly; fabric shows light UV fade after two summers in service.' }
    })
  },
  {
    slug: 'obsidian-convertible',
    name: 'Obsidian Convertible',
    category: 'Convertible',
    year: 2023,
    dailyRate: 305,
    status: 'Maintenance',
    mileage: 21830,
    plate: 'LUX-4470',
    images: ['assets/images/obsidian-convertible.jpg?v=2'],
    alt: 'Black Obsidian Convertible parked on a city street',
    revenue: { currentRentalRevenue: 0, duration: 0, returnDate: 'In Service', quarterLabel: '2026 Q3', quarterRevenue: 5460.00, defaultPayments: 0, maintenanceCost: 2350 },
    priorRentals: [
      { customerName: 'Marcus Reed', avatar: 'assets/images/avatar-marcus-reed.jpg', returnDate: '8.30.26', status: 'Cleared', amount: 2135.00 },
      { customerName: 'Jasmine Boyd', avatar: 'assets/images/avatar-jasmine-boyd.jpg', returnDate: '8.5.26', status: 'Cleared', amount: 1220.00 },
      { customerName: 'Daniel Cross', avatar: 'assets/images/avatar-daniel-cross.jpg', returnDate: '7.19.26', status: 'Pending', amount: 3050.00 }
    ],
    partsOverview: buildParts({
      Boot: { condition: 'Needs Attention', note: 'Soft-top storage latch is sticking — technician has the part on order.' },
      Bumpers: { condition: 'Needs Attention', note: 'Rear bumper has a 4in scuff reported by last renter; matches open damage report DR-1084.' },
      Mirrors: { condition: 'Fair', note: 'Passenger mirror housing has a small crack in the trim, purely cosmetic.' }
    })
  },
  {
    slug: 'atlas-overland-suv',
    name: 'Atlas Overland SUV',
    category: 'SUV',
    year: 2025,
    dailyRate: 245,
    status: 'Rented',
    mileage: 11250,
    plate: 'LUX-5518',
    images: ['assets/images/atlas-overland-suv.jpg?v=2'],
    alt: 'Black Atlas Overland SUV in a bright studio setting',
    revenue: { currentRentalRevenue: 1715.00, duration: 7, returnDate: 'September 18, 2026', quarterLabel: '2026 Q3', quarterRevenue: 10230.00, defaultPayments: 0, maintenanceCost: 1460 },
    priorRentals: [
      { customerName: 'Amara Okoye', avatar: 'assets/images/avatar-amara-okoye.jpg', returnDate: '8.22.26', status: 'Cleared', amount: 1715.00 },
      { customerName: 'Rafael Costa', avatar: 'assets/images/avatar-rafael-costa.jpg', returnDate: '8.1.26', status: 'Cleared', amount: 980.00 },
      { customerName: 'Linda Hayes', avatar: 'assets/images/avatar-linda-hayes.jpg', returnDate: '7.14.26', status: 'Cleared', amount: 1470.00 }
    ],
    partsOverview: buildParts({
      Doors: { condition: 'Fair', note: 'Rear passenger door seal whistles slightly above 70mph; scheduled for a weatherstrip swap.' }
    })
  },
  {
    slug: 'highland-peak-suv',
    name: 'Highland Peak SUV',
    category: 'SUV',
    year: 2024,
    dailyRate: 232,
    status: 'Available',
    mileage: 16040,
    plate: 'LUX-6623',
    images: ['assets/images/highland-peak-suv.jpg?v=2'],
    alt: 'White Highland Peak SUV in a dark studio setting',
    revenue: { currentRentalRevenue: 1624.00, duration: 7, returnDate: 'September 20, 2026', quarterLabel: '2026 Q3', quarterRevenue: 8870.00, defaultPayments: 0, maintenanceCost: 1310 },
    priorRentals: [
      { customerName: 'Priya Nair', avatar: 'assets/images/avatar-priya-nair.jpg', returnDate: '8.26.26', status: 'Cleared', amount: 1624.00 },
      { customerName: 'Kenji Oyama', avatar: 'assets/images/avatar-kenji-oyama.jpg', returnDate: '8.3.26', status: 'Cleared', amount: 1160.00 },
      { customerName: 'Andre Lucas', avatar: 'assets/images/avatar-andre-lucas.jpg', returnDate: '7.9.26', status: 'Cleared', amount: 1392.00 }
    ],
    partsOverview: buildParts({
      Rims: { condition: 'Fair', note: 'All four rims recently refinished; one shows a faint water spot from the detail bay.' }
    })
  },
  {
    slug: 'bellwood-grand-tourer',
    name: 'Bellwood Grand Tourer',
    category: 'Grand Tourer',
    year: 2023,
    dailyRate: 398,
    status: 'Rented',
    mileage: 19870,
    plate: 'LUX-7741',
    images: ['assets/images/bellwood-grand-tourer.jpg?v=2'],
    alt: 'Dark grand tourer coupe silhouette on a black background',
    revenue: { currentRentalRevenue: 2786.00, duration: 7, returnDate: 'September 17, 2026', quarterLabel: '2026 Q3', quarterRevenue: 15680.00, defaultPayments: 0, maintenanceCost: 3120 },
    priorRentals: [
      { customerName: 'Linda Hayes', avatar: 'assets/images/avatar-linda-hayes.jpg', returnDate: '8.31.26', status: 'Cleared', amount: 2786.00 },
      { customerName: 'Daniel Cross', avatar: 'assets/images/avatar-daniel-cross.jpg', returnDate: '8.11.26', status: 'Cleared', amount: 3184.00 },
      { customerName: 'Jasmine Boyd', avatar: 'assets/images/avatar-jasmine-boyd.jpg', returnDate: '7.25.26', status: 'Pending', amount: 1990.00 }
    ],
    partsOverview: buildParts({
      'Paint Job': { condition: 'Good', note: 'Ceramic coating reapplied last quarter — finish remains excellent.' },
      Headlights: { condition: 'Fair', note: 'Slight haze forming on the passenger-side lens; polish scheduled at next service.' }
    })
  },
  {
    slug: 'ashford-sedan',
    name: 'Ashford Sedan',
    category: 'Sedan',
    year: 2022,
    dailyRate: 165,
    status: 'Available',
    mileage: 28410,
    plate: 'LUX-8802',
    images: ['assets/images/ashford-sedan.jpg?v=2'],
    alt: 'Silver Ashford Sedan in a dark studio with red backlight',
    revenue: { currentRentalRevenue: 1155.00, duration: 7, returnDate: 'September 19, 2026', quarterLabel: '2026 Q3', quarterRevenue: 6420.00, defaultPayments: 0, maintenanceCost: 890 },
    priorRentals: [
      { customerName: 'Rafael Costa', avatar: 'assets/images/avatar-rafael-costa.jpg', returnDate: '8.19.26', status: 'Cleared', amount: 1155.00 },
      { customerName: 'Amara Okoye', avatar: 'assets/images/avatar-amara-okoye.jpg', returnDate: '7.30.26', status: 'Cleared', amount: 990.00 },
      { customerName: 'Marcus Reed', avatar: 'assets/images/avatar-marcus-reed.jpg', returnDate: '7.5.26', status: 'Cleared', amount: 825.00 }
    ],
    partsOverview: buildParts({
      Back: { condition: 'Fair', note: 'Small parking scuff on the rear valance, buffed out and monitored.' }
    })
  },
  {
    slug: 'halcyon-sport-sedan',
    name: 'Halcyon Sport Sedan',
    category: 'Sports Sedan',
    year: 2021,
    dailyRate: 189,
    status: 'Maintenance',
    mileage: 33120,
    plate: 'LUX-9915',
    images: ['assets/images/halcyon-sport-sedan.jpg?v=2'],
    alt: 'Silver Halcyon Sport Sedan lit dramatically in a studio',
    revenue: { currentRentalRevenue: 0, duration: 0, returnDate: 'In Service', quarterLabel: '2026 Q3', quarterRevenue: 4980.00, defaultPayments: 0, maintenanceCost: 1980 },
    priorRentals: [
      { customerName: 'Kenji Oyama', avatar: 'assets/images/avatar-kenji-oyama.jpg', returnDate: '8.16.26', status: 'Cleared', amount: 1134.00 },
      { customerName: 'Sofia Marin', avatar: 'assets/images/avatar-sofia-marin.jpg', returnDate: '7.28.26', status: 'Cleared', amount: 945.00 },
      { customerName: 'Andre Lucas', avatar: 'assets/images/avatar-andre-lucas.jpg', returnDate: '7.2.26', status: 'Pending', amount: 1287.00 }
    ],
    partsOverview: buildParts({
      Windows: { condition: 'Needs Attention', note: 'Driver-side window regulator is slow to retract — in the shop for repair now.' },
      Wheels: { condition: 'Needs Attention', note: 'Rear-left wheel bearing flagged during inspection; matches open maintenance ticket MT-2231.' }
    })
  },
  {
    slug: 'solstice-coupe',
    name: 'Solstice Coupe',
    category: 'Sports Coupe',
    year: 2026,
    dailyRate: 412,
    status: 'Rented',
    mileage: 1980,
    plate: 'LUX-1120',
    images: ['assets/images/solstice-coupe-front.jpg?v=2', 'assets/images/solstice-coupe-rear.jpg?v=2'],
    alt: 'White Solstice Coupe sports car in a bright studio',
    revenue: { currentRentalRevenue: 2884.00, duration: 7, returnDate: 'September 16, 2026', quarterLabel: '2026 Q3', quarterRevenue: 13950.00, defaultPayments: 0, maintenanceCost: 2640 },
    priorRentals: [
      { customerName: 'Priya Nair', avatar: 'assets/images/avatar-priya-nair.jpg', returnDate: '8.27.26', status: 'Cleared', amount: 2884.00 },
      { customerName: 'Linda Hayes', avatar: 'assets/images/avatar-linda-hayes.jpg', returnDate: '8.6.26', status: 'Cleared', amount: 2060.00 },
      { customerName: 'Caleb Stone', avatar: 'assets/images/avatar-rafael-costa.jpg', returnDate: '7.15.26', status: 'Cleared', amount: 3296.00 }
    ],
    partsOverview: buildParts({
      Rearlights: { condition: 'Good', note: 'LED clusters replaced at delivery — full brightness, no condensation.' },
      Doors: { condition: 'Good', note: 'Dihedral door struts serviced last month; smooth operation confirmed.' }
    })
  }
];

const CUSTOMERS = [
  {
    slug: 'daniel-cross',
    name: 'Daniel Cross',
    avatar: 'assets/images/avatar-daniel-cross.jpg',
    phone: '+1 305 555 0148',
    email: 'daniel.cross@corvellcap.com',
    totalRentals: 9,
    totalSpent: 21840,
    status: 'VIP',
    rentalHistory: [
      { vehicle: 'Voss SUV Elite', dates: 'Aug 26 – Sep 2, 2026', amount: 1533.00, status: 'Cleared' },
      { vehicle: 'Bellwood Grand Tourer', dates: 'Aug 4 – Aug 11, 2026', amount: 3184.00, status: 'Cleared' },
      { vehicle: 'Obsidian Convertible', dates: 'Jul 12 – Jul 19, 2026', amount: 3050.00, status: 'Pending' }
    ]
  },
  {
    slug: 'marcus-reed',
    name: 'Marcus Reed',
    avatar: 'assets/images/avatar-marcus-reed.jpg',
    phone: '+1 212 555 0110',
    email: 'marcus.reed@reedlogistics.com',
    totalRentals: 6,
    totalSpent: 9840,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Sterling GT Coupe', dates: 'Jul 22 – Jul 29, 2026', amount: 1204.50, status: 'Cleared' },
      { vehicle: 'Obsidian Convertible', dates: 'Aug 23 – Aug 30, 2026', amount: 2135.00, status: 'Cleared' },
      { vehicle: 'Ashford Sedan', dates: 'Jun 28 – Jul 5, 2026', amount: 825.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'andre-lucas',
    name: 'Andre Lucas',
    avatar: 'assets/images/avatar-andre-lucas.jpg',
    phone: '+1 415 555 0193',
    email: 'andre.lucas@lucasventures.co',
    totalRentals: 5,
    totalSpent: 7360,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Meridian Cabrio', dates: 'Aug 2 – Aug 9, 2026', amount: 804.00, status: 'Cleared' },
      { vehicle: 'Highland Peak SUV', dates: 'Jul 2 – Jul 9, 2026', amount: 1392.00, status: 'Cleared' },
      { vehicle: 'Halcyon Sport Sedan', dates: 'Jun 25 – Jul 2, 2026', amount: 1287.00, status: 'Pending' }
    ]
  },
  {
    slug: 'kenji-oyama',
    name: 'Kenji Oyama',
    avatar: 'assets/images/avatar-kenji-oyama.jpg',
    phone: '+81 3 5555 0176',
    email: 'kenji.oyama@oyamaholdings.jp',
    totalRentals: 8,
    totalSpent: 15420,
    status: 'VIP',
    rentalHistory: [
      { vehicle: 'Meridian Cabrio', dates: 'Jul 15 – Jul 22, 2026', amount: 1340.00, status: 'Cleared' },
      { vehicle: 'Highland Peak SUV', dates: 'Jul 27 – Aug 3, 2026', amount: 1160.00, status: 'Cleared' },
      { vehicle: 'Halcyon Sport Sedan', dates: 'Aug 9 – Aug 16, 2026', amount: 1134.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'rafael-costa',
    name: 'Rafael Costa',
    avatar: 'assets/images/avatar-rafael-costa.jpg',
    phone: '+55 21 5555 0184',
    email: 'rafael.costa@costaimports.com.br',
    totalRentals: 4,
    totalSpent: 6280,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Atlas Overland SUV', dates: 'Jul 25 – Aug 1, 2026', amount: 980.00, status: 'Cleared' },
      { vehicle: 'Ashford Sedan', dates: 'Aug 12 – Aug 19, 2026', amount: 1155.00, status: 'Cleared' },
      { vehicle: 'Solstice Coupe', dates: 'Jul 8 – Jul 15, 2026', amount: 3296.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'sofia-marin',
    name: 'Sofia Marin',
    avatar: 'assets/images/avatar-sofia-marin.jpg',
    phone: '+34 91 555 0121',
    email: 'sofia.marin@marinstudio.es',
    totalRentals: 3,
    totalSpent: 4780,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Meridian Cabrio', dates: 'Aug 21 – Aug 28, 2026', amount: 1876.00, status: 'Cleared' },
      { vehicle: 'Sterling GT Coupe', dates: 'Aug 30 – Sep 6, 2026', amount: 480.00, status: 'Cleared' },
      { vehicle: 'Halcyon Sport Sedan', dates: 'Jul 21 – Jul 28, 2026', amount: 945.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'linda-hayes',
    name: 'Linda Hayes',
    avatar: 'assets/images/avatar-linda-hayes.jpg',
    phone: '+1 312 555 0157',
    email: 'linda.hayes@haysandco.com',
    totalRentals: 7,
    totalSpent: 12960,
    status: 'VIP',
    rentalHistory: [
      { vehicle: 'Atlas Overland SUV', dates: 'Jul 7 – Jul 14, 2026', amount: 1470.00, status: 'Cleared' },
      { vehicle: 'Bellwood Grand Tourer', dates: 'Aug 24 – Aug 31, 2026', amount: 2786.00, status: 'Cleared' },
      { vehicle: 'Solstice Coupe', dates: 'Jul 30 – Aug 6, 2026', amount: 2060.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'amara-okoye',
    name: 'Amara Okoye',
    avatar: 'assets/images/avatar-amara-okoye.jpg',
    phone: '+234 1 555 0139',
    email: 'amara.okoye@okoyegroup.ng',
    totalRentals: 5,
    totalSpent: 8140,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Sterling GT Coupe', dates: 'Jul 28 – Aug 4, 2026', amount: 2000.00, status: 'Cleared' },
      { vehicle: 'Atlas Overland SUV', dates: 'Aug 15 – Aug 22, 2026', amount: 1715.00, status: 'Cleared' },
      { vehicle: 'Ashford Sedan', dates: 'Jul 23 – Jul 30, 2026', amount: 990.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'priya-nair',
    name: 'Priya Nair',
    avatar: 'assets/images/avatar-priya-nair.jpg',
    phone: '+91 22 5555 0162',
    email: 'priya.nair@nairconsulting.in',
    totalRentals: 6,
    totalSpent: 11320,
    status: 'VIP',
    rentalHistory: [
      { vehicle: 'Voss SUV Elite', dates: 'Aug 7 – Aug 14, 2026', amount: 987.00, status: 'Cleared' },
      { vehicle: 'Highland Peak SUV', dates: 'Aug 19 – Aug 26, 2026', amount: 1624.00, status: 'Cleared' },
      { vehicle: 'Solstice Coupe', dates: 'Aug 20 – Aug 27, 2026', amount: 2884.00, status: 'Cleared' }
    ]
  },
  {
    slug: 'jasmine-boyd',
    name: 'Jasmine Boyd',
    avatar: 'assets/images/avatar-jasmine-boyd.jpg',
    phone: '+1 702 555 0105',
    email: 'jasmine.boyd@boydholdings.com',
    totalRentals: 4,
    totalSpent: 6980,
    status: 'Active',
    rentalHistory: [
      { vehicle: 'Voss SUV Elite', dates: 'Jul 4 – Jul 11, 2026', amount: 657.00, status: 'Pending' },
      { vehicle: 'Obsidian Convertible', dates: 'Jul 29 – Aug 5, 2026', amount: 1220.00, status: 'Cleared' },
      { vehicle: 'Bellwood Grand Tourer', dates: 'Jul 18 – Jul 25, 2026', amount: 1990.00, status: 'Pending' }
    ]
  }
];

const DAMAGE_REPORTS = [
  { id: 'DR-1084', vehicle: 'Obsidian Convertible', slug: 'obsidian-convertible', dateReported: 'Sep 5, 2026', description: 'Rear bumper scuff reported at check-in, roughly 4in, paint intact.', severity: 'Low', status: 'Open', photo: 'assets/images/damage-scratch-fender.jpg' },
  { id: 'DR-1079', vehicle: 'Sterling GT Coupe', slug: 'sterling-gt-coupe', dateReported: 'Aug 30, 2026', description: 'Front splitter scuff from a low driveway approach; cosmetic only.', severity: 'Low', status: 'Open', photo: 'assets/images/damage-bumper-headlight.jpg' },
  { id: 'DR-1071', vehicle: 'Halcyon Sport Sedan', slug: 'halcyon-sport-sedan', dateReported: 'Aug 21, 2026', description: 'Driver door edge scraped against a parking pillar, moderate paint transfer.', severity: 'Medium', status: 'Open', photo: 'assets/images/damage-scratch-fender.jpg' },
  { id: 'DR-1063', vehicle: 'Atlas Overland SUV', slug: 'atlas-overland-suv', dateReported: 'Aug 9, 2026', description: 'Headlight housing cracked on the passenger side after reported debris strike.', severity: 'High', status: 'Resolved', photo: 'assets/images/damage-bumper-headlight.jpg' },
  { id: 'DR-1052', vehicle: 'Ashford Sedan', slug: 'ashford-sedan', dateReported: 'Jul 30, 2026', description: 'Rear valance scuff from a tight parking garage exit, buffed out.', severity: 'Low', status: 'Resolved', photo: 'assets/images/damage-scratch-fender.jpg' },
  { id: 'DR-1041', vehicle: 'Bellwood Grand Tourer', slug: 'bellwood-grand-tourer', dateReported: 'Jul 19, 2026', description: 'Passenger mirror housing chipped; replacement part on order.', severity: 'Medium', status: 'Open', photo: 'assets/images/damage-bumper-headlight.jpg' }
];

const MAINTENANCE_REPORTS = [
  { vehicle: 'Halcyon Sport Sedan', slug: 'halcyon-sport-sedan', serviceType: 'Window Regulator Repair', date: 'Sep 8, 2026', cost: 340, nextDue: 'Mar 8, 2027', status: 'In Progress' },
  { vehicle: 'Halcyon Sport Sedan', slug: 'halcyon-sport-sedan', serviceType: 'Wheel Bearing Replacement', date: 'Sep 8, 2026', cost: 610, nextDue: 'Sep 8, 2028', status: 'In Progress' },
  { vehicle: 'Obsidian Convertible', slug: 'obsidian-convertible', serviceType: 'Soft-Top Latch Service', date: 'Sep 4, 2026', cost: 220, nextDue: 'Sep 4, 2027', status: 'In Progress' },
  { vehicle: 'Voss SUV Elite', slug: 'voss-suv-elite', serviceType: 'Tire Rotation & Balance', date: 'Aug 30, 2026', cost: 90, nextDue: 'Feb 28, 2027', status: 'Completed' },
  { vehicle: 'Bellwood Grand Tourer', slug: 'bellwood-grand-tourer', serviceType: 'Ceramic Coating Refresh', date: 'Aug 22, 2026', cost: 780, nextDue: 'Aug 22, 2027', status: 'Completed' },
  { vehicle: 'Sterling GT Coupe', slug: 'sterling-gt-coupe', serviceType: 'Full Detail & Paint Correction', date: 'Aug 18, 2026', cost: 450, nextDue: 'Nov 18, 2026', status: 'Completed' },
  { vehicle: 'Atlas Overland SUV', slug: 'atlas-overland-suv', serviceType: 'Headlight Housing Replacement', date: 'Aug 12, 2026', cost: 560, nextDue: 'Aug 12, 2028', status: 'Completed' },
  { vehicle: 'Highland Peak SUV', slug: 'highland-peak-suv', serviceType: 'Brake Pad & Rotor Service', date: 'Aug 5, 2026', cost: 690, nextDue: 'Feb 5, 2027', status: 'Completed' },
  { vehicle: 'Ashford Sedan', slug: 'ashford-sedan', serviceType: 'Oil Change & Multi-Point Inspection', date: 'Jul 29, 2026', cost: 130, nextDue: 'Oct 29, 2026', status: 'Completed' },
  { vehicle: 'Solstice Coupe', slug: 'solstice-coupe', serviceType: 'Dihedral Door Strut Service', date: 'Jul 20, 2026', cost: 510, nextDue: 'Jan 20, 2027', status: 'Completed' },
  { vehicle: 'Meridian Cabrio', slug: 'meridian-cabrio', serviceType: 'Soft-Top Fabric Conditioning', date: 'Jul 14, 2026', cost: 200, nextDue: 'Jan 14, 2027', status: 'Completed' }
];
