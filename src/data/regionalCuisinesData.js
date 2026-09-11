// Comprehensive Regional & Cultural Cuisines Data for India & Global Regions

export const REGIONAL_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    emoji: "🇮🇳",
    states: [
      { id: "karnataka", name: "Karnataka", cuisineTag: "Karnataka Heritage & Millet Cuisine", popularDishes: "Ragi Idli, Bisi Bele Bath, Kosambari, Majjige, Jowar Rotti, Saagu" },
      { id: "maharashtra", name: "Maharashtra", cuisineTag: "Maharashtrian Satvik & Coastal", popularDishes: "Kande Pohe, Jowar Bhakri, Pitla, Matki Usal, Solkadhi, Taak" },
      { id: "tamil-nadu", name: "Tamil Nadu", cuisineTag: "Tamil Traditional Low-GI", popularDishes: "Brown Rice Idli, Sambar, Kootu, Neer Mor, Sundal, Ragi Dosa" },
      { id: "andhra-telangana", name: "Andhra Pradesh & Telangana", cuisineTag: "Telugu Whole Grains & Greens", popularDishes: "Pesarattu, Gongura Pappu, Allam Chutney, Majjiga, Jowar Roti" },
      { id: "kerala", name: "Kerala", cuisineTag: "Kerala Spices & Coconut Stews", popularDishes: "Puttu with Kadala, Avial, Red Matta Rice, Sambharam, Thoran" },
      { id: "punjab", name: "Punjab", cuisineTag: "Punjabi Wholesome High-Protein", popularDishes: "Methi/Paneer Paratha, Dal Makhani/Rajma, Chhaas, Palak Paneer" },
      { id: "gujarat", name: "Gujarat", cuisineTag: "Gujarati High-Fiber Plant Diet", popularDishes: "Methi Thepla, Handvo, Gujarati Dal, Masala Chaas, Khichdi" },
      { id: "west-bengal", name: "West Bengal", cuisineTag: "Bengali Steamed & Mustard Infused", popularDishes: "Moong Dal Khichuri, Cholar Dal, Shukto, Steamed Veg / Fish, Baingan Bhaja" },
      { id: "rajasthan", name: "Rajasthan", cuisineTag: "Rajasthani Coarse Grains & Lentils", popularDishes: "Bajra Roti, Gatte ki Sabzi, Panchmel Dal, Chaas, Ker Sangri" },
      { id: "delhi-north", name: "Delhi & North India", cuisineTag: "North Indian Balanced Classic", popularDishes: "Stuffed Multigrain Rotis, Rajma Chawal, Matar Paneer, Raita" }
    ]
  },
  {
    code: "US",
    name: "United States",
    emoji: "🇺🇸",
    states: [
      { id: "california", name: "California", cuisineTag: "Californian Clean & Plant-Forward", popularDishes: "Avocado Sourdough Toast, Green Goddess Bowl, Acai Parfait, Grilled Salmon" },
      { id: "new-york", name: "New York", cuisineTag: "East Coast Mediterranean & Deli Fresh", popularDishes: "Egg White Veggie Scramble, Quinoa Power Salad, Lentil Stew" },
      { id: "texas", name: "Texas", cuisineTag: "Tex-Mex High-Protein & Fajita Bowls", popularDishes: "Black Bean Fajita Bowl, Grilled Chicken/Tofu with Salsa, Egg Taco" },
      { id: "florida", name: "Florida", cuisineTag: "Coastal Citrus & Lean Seafood", popularDishes: "Citrus Grilled Fish, Tropical Chia Pudding, Mango Kale Salad" },
      { id: "washington", name: "Washington", cuisineTag: "Pacific Northwest Whole Foods", popularDishes: "Wild Salmon Bowl, Roasted Roots, Berry Oatmeal, Steamed Edamame" }
    ]
  },
  {
    code: "GB",
    name: "United Kingdom",
    emoji: "🇬🇧",
    states: [
      { id: "england", name: "England (London & Midlands)", cuisineTag: "Modern British & Mediterranean", popularDishes: "Overnight Oats, Jacket Potato with Baked Beans, Pea Mint Soup" },
      { id: "scotland", name: "Scotland", cuisineTag: "Scottish Coarse Oats & Hearth", popularDishes: "Traditional Scottish Porridge, Smoked Salmon Eggs, Lentil Broth" }
    ]
  },
  {
    code: "CA",
    name: "Canada",
    emoji: "🇨🇦",
    states: [
      { id: "ontario", name: "Ontario", cuisineTag: "Canadian Fresh Harvest & Maple Grains", popularDishes: "Flax Maple Oatmeal, Quinoa Kale Bowl, Roasted Squash Stew" },
      { id: "british-columbia", name: "British Columbia", cuisineTag: "Pacific Coast Clean Nutrition", popularDishes: "Wild Salmon Poke Bowl, Hemp Seed Salad, Matcha Smoothie" }
    ]
  },
  {
    code: "AU",
    name: "Australia",
    emoji: "🇦🇺",
    states: [
      { id: "nsw", name: "New South Wales (Sydney)", cuisineTag: "Aussie Brunch & Coastal Vitality", popularDishes: "Smashed Avocado with Dukkah, Beetroot Salad, Barramundi Fillet" },
      { id: "victoria", name: "Victoria (Melbourne)", cuisineTag: "Artisanal Superfood & Plant Bowls", popularDishes: "Acai Super Bowl, Grilled Halloumi Salad, Protein Flatbread" }
    ]
  },
  {
    code: "IT",
    name: "Italy",
    emoji: "🇮🇹",
    states: [
      { id: "tuscany", name: "Tuscany / Central Italy", cuisineTag: "Tuscan Mediterranean Longevity", popularDishes: "Ribollita Bean Stew, Caprese Salad with Extra Virgin Olive Oil, Farro Bowl" }
    ]
  },
  {
    code: "JP",
    name: "Japan",
    emoji: "🇯🇵",
    states: [
      { id: "tokyo", name: "Tokyo / Kanto", cuisineTag: "Japanese Ichiju Sansai (Washoku)", popularDishes: "Miso Soup, Steamed Edamame, Teriyaki Salmon/Tofu, Brown Rice with Nori" }
    ]
  }
];

// Complete 6-Meal Daily Routine Blueprints for each Region
export const REGIONAL_ROUTINES_MAP = {
  // ==========================================
  // KARNATAKA, INDIA (DEFAULT / USER SPECIALTY)
  // ==========================================
  "karnataka": {
    id: "regional-karnataka",
    slug: "regional-karnataka",
    title: "Karnataka Heritage Food Routine",
    subtitle: "Authentic Karnataka daily nutrition timeline with finger millet (Ragi), steamed pulses (Kosambari), spiced buttermilk (Majjige), and Bisi Bele Bath.",
    category: "Regional Cuisine • Karnataka",
    categoryId: "regional-karnataka",
    badge: "Karnataka Cuisine",
    regionName: "Karnataka, India",
    countryName: "India",
    calories: 1850,
    protein: 85,
    carbs: 235,
    fat: 48,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    tags: ["Karnataka", "Ragi", "Millet", "Kosambari", "Majjige", "Low GI", "South Indian", "Traditional Heritage"],
    dailyTimeline: [
      {
        id: "ka-m1",
        slotName: "Morning Warmup",
        time: "6:30 AM – 7:00 AM",
        emoji: "🌅",
        title: "Warm Jeera-Coriander Infusion & Soaked Badam",
        calories: 110,
        protein: 4,
        carbs: 5,
        fat: 9,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Boiled warm water steeped with whole roasted cumin (jeera) and coriander seeds, served alongside 5 peeled overnight-soaked California almonds and 2 walnut halves.",
        benefits: ["Gentle morning metabolism warmup", "Boosts bile flow and digestive enzymes", "Supplies plant Omega-3 fatty acids"],
        ingredients: [
          { name: "Cumin Seeds (Jeera)", amount: "1/2 tsp" },
          { name: "Coriander Seeds (Dhania)", amount: "1/2 tsp" },
          { name: "Warm Filtered Water", amount: "300 ml" },
          { name: "Soaked Almonds (Peeled)", amount: "5 pieces" },
          { name: "Walnut Halves", amount: "2 pieces" }
        ],
        steps: [
          "Crush cumin and coriander seeds lightly in a mortar.",
          "Boil in 300ml water for 3 minutes, then strain into a mug.",
          "Peel soaked almonds and enjoy warmly on an empty stomach."
        ],
        youtubeVideos: [
          { id: "ka-yt1", title: "Jeera Dhania Water Benefits for Digestion", duration: "5:30", query: "jeera coriander water benefits morning" },
          { id: "ka-yt2", title: "Karnataka Morning Health Habits", duration: "8:15", query: "ayurvedic morning routine india" }
        ],
        orderQuery: "Herbal Green Tea Soaked Nuts"
      },
      {
        id: "ka-m2",
        slotName: "Breakfast",
        time: "8:30 AM – 9:00 AM",
        emoji: "🥣",
        title: "Steamed Karnataka Ragi Idli with Mint Coconut Chutney & Vegetable Sambar",
        calories: 390,
        protein: 15,
        carbs: 58,
        fat: 11,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Soft, nutrient-packed steamed finger millet (Ragi) idlis paired with aromatic home-style toor dal vegetable sambar and fresh grated coconut-mint chutney.",
        benefits: ["Rich in finger millet calcium & iron", "Low glycemic index prevents mid-morning energy dips", "Fermented batter aids gut microbiome"],
        ingredients: [
          { name: "Ragi Flour & Idli Rava", amount: "1 cup batter" },
          { name: "Toor Dal Sambar with Drumstick & Carrots", amount: "1 small bowl (150ml)" },
          { name: "Fresh Mint-Coriander Coconut Chutney", amount: "2 tbsp" }
        ],
        steps: [
          "Mix fermented ragi and urad batter.",
          "Grease idli plates and steam for 10-12 minutes on medium heat.",
          "Serve piping hot with freshly tempered sambar and mint coconut chutney."
        ],
        youtubeVideos: [
          { id: "ka-yt3", title: "Soft Karnataka Ragi Idli Recipe", duration: "6:45", query: "karnataka soft ragi idli recipe" },
          { id: "ka-yt4", title: "Hotel Style Karnataka Sambar Recipe", duration: "9:20", query: "karnataka hotel style sambar recipe" }
        ],
        orderQuery: "Ragi Idli Sambar Chutney"
      },
      {
        id: "ka-m3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM – 12:00 PM",
        emoji: "🥛",
        title: "Masala Majjige (Karnataka Spiced Buttermilk with Ginger & Curry Leaves)",
        calories: 60,
        protein: 3,
        carbs: 7,
        fat: 2,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
        description: "Freshly churned light curd diluted with water, seasoned with crushed ginger, green chili, curry leaves, roasted cumin powder, hing (asafoetida), and rock salt.",
        benefits: ["Natural probiotic drink that cools internal body heat", "Rich in electrolytes (potassium, calcium)", "Zero cholesterol and aids nutrient absorption"],
        ingredients: [
          { name: "Fresh Churned Curd", amount: "100 ml" },
          { name: "Chilled Water", amount: "200 ml" },
          { name: "Crushed Ginger & Curry Leaves", amount: "1 tsp" },
          { name: "Roasted Cumin Powder & Rock Salt", amount: "1 pinch each" }
        ],
        steps: [
          "Whisk curd and water until frothy.",
          "Add crushed ginger, minced green chili, curry leaves, roasted jeera powder, and rock salt.",
          "Serve chilled with a squeeze of fresh lemon."
        ],
        youtubeVideos: [
          { id: "ka-yt5", title: "Authentic Karnataka Masala Majjige Recipe", duration: "4:30", query: "karnataka masala majjige buttermilk" }
        ],
        orderQuery: "Masala Buttermilk Majjige"
      },
      {
        id: "ka-m4",
        slotName: "Heritage Lunch",
        time: "1:30 PM – 2:15 PM",
        emoji: "🍛",
        title: "Wholesome Bisi Bele Bath / Red Rice with Vegetable Huli, Beetroot Palya & Hesaru Bele Kosambari",
        calories: 520,
        protein: 20,
        carbs: 75,
        fat: 13,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Classic Karnataka lentil-grain medley (Bisi Bele Bath) cooked with brown rice, toor dal, French beans, carrots and capsicum, paired with steamed beetroot palya and soaked moong dal raw salad (Hesaru Bele Kosambari).",
        benefits: ["Complete plant protein balance from toor dal and brown rice", "Beetroot dietary nitrates support cardiovascular circulation", "Raw moong kosambari provides live digestive enzymes"],
        ingredients: [
          { name: "Brown Rice & Toor Dal (for Bisi Bele Bath)", amount: "1 medium bowl (250g)" },
          { name: "Steamed Beetroot Palya with Coconut", amount: "1 small cup (100g)" },
          { name: "Hesaru Bele Moong Kosambari (with lemon & cucumber)", amount: "1 small cup (100g)" }
        ],
        steps: [
          "Pressure cook toor dal, brown rice, and diced vegetables together with authentic bisi bele bath spice powder.",
          "Prepare tempering with mustard seeds, curry leaves, and a touch of ghee.",
          "Toss soaked yellow moong dal with chopped cucumber, coriander, grated coconut, and lemon juice for the Kosambari."
        ],
        youtubeVideos: [
          { id: "ka-yt6", title: "Authentic Karnataka Bisi Bele Bath Recipe", duration: "11:15", query: "authentic karnataka bisi bele bath recipe" },
          { id: "ka-yt7", title: "Traditional Moong Dal Kosambari", duration: "4:50", query: "hesaru bele kosambari karnataka" }
        ],
        orderQuery: "Bisi Bele Bath Meal with Palya"
      },
      {
        id: "ka-m5",
        slotName: "Evening Snack",
        time: "5:00 PM – 5:30 PM",
        emoji: "🫖",
        title: "Steamed Kadale Kalu Usli (Spiced Black Chickpeas) & Filtered Green Tea",
        calories: 170,
        protein: 10,
        carbs: 24,
        fat: 4,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        description: "Boiled black chickpeas (Kadale Kalu) gently sautéed with mustard seeds, green chilies, curry leaves, and freshly grated coconut, served with a steaming cup of antioxidant-rich green tea.",
        benefits: ["Rich in slow-burning complex carbs and dietary fiber", "High iron and magnesium content prevents evening fatigue", "Zero refined sugars"],
        ingredients: [
          { name: "Boiled Black Chickpeas (Kadale Kalu)", amount: "100g (approx 1 cup)" },
          { name: "Fresh Grated Coconut", amount: "1 tbsp" },
          { name: "Mustard, Curry Leaves & Lemon", amount: "1 tsp tempering" },
          { name: "Brewed Organic Green Tea", amount: "200 ml" }
        ],
        steps: [
          "Boil soaked black chickpeas until soft and tender.",
          "In a pan, temper mustard seeds, slit green chilies, and curry leaves in 1/2 tsp oil.",
          "Add boiled chickpeas, salt, grated coconut, and lemon juice. Toss and serve hot with tea."
        ],
        youtubeVideos: [
          { id: "ka-yt8", title: "Karnataka Kadale Kalu Usli Recipe", duration: "5:10", query: "karnataka kadale kalu usli sundal recipe" }
        ],
        orderQuery: "Boiled Chana Usli Snack"
      },
      {
        id: "ka-m6",
        slotName: "Light Dinner",
        time: "8:00 PM – 8:30 PM",
        emoji: "🥗",
        title: "Soft Jowar (Sorghum) Rotti with Mixed Vegetable Saagu & Sliced Cucumber Kosambari",
        calories: 380,
        protein: 14,
        carbs: 58,
        fat: 9,
        prepTime: "20 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Gluten-free, fiber-dense hand-rolled North Karnataka Jowar (Sorghum) Rotti served with mild coconut-spiced vegetable saagu and crisp cucumber slices.",
        benefits: ["Jowar sorghum is naturally gluten-free and low GI", "Light on digestion for restful sleep", "Supplies essential potassium and B-complex vitamins"],
        ingredients: [
          { name: "Jowar Flour Rotti (Sorghum Roti)", amount: "2 soft rottis" },
          { name: "Mixed Vegetable Saagu (Potatoes, Beans, Carrots)", amount: "1 cup (180ml)" },
          { name: "Cucumber Salad with Coriander & Lime", amount: "1 small plate" }
        ],
        steps: [
          "Knead jowar flour with hot water into a smooth dough and pat thin on a tawa.",
          "Cook on medium flame until puffed and soft.",
          "Simmer mixed vegetables in coconut-poppy seed saagu gravy and serve hot."
        ],
        youtubeVideos: [
          { id: "ka-yt9", title: "North Karnataka Jowar Rotti Making Technique", duration: "8:40", query: "north karnataka jowar rotti making" },
          { id: "ka-yt10", title: "Hotel Style Veg Saagu Recipe", duration: "7:15", query: "karnataka veg saagu recipe" }
        ],
        orderQuery: "Jowar Rotti Veg Saagu Meal"
      }
    ]
  },

  // ==========================================
  // MAHARASHTRA, INDIA
  // ==========================================
  "maharashtra": {
    id: "regional-maharashtra",
    slug: "regional-maharashtra",
    title: "Maharashtrian Satvik Wellness Routine",
    subtitle: "Balanced Maharashtrian nutrition with Kande Pohe, Sprouted Matki Usal, Jowar Bhakri with Pitla, and refreshing Taak / Solkadhi.",
    category: "Regional Cuisine • Maharashtra",
    categoryId: "regional-maharashtra",
    badge: "Maharashtrian Cuisine",
    regionName: "Maharashtra, India",
    countryName: "India",
    calories: 1880,
    protein: 88,
    carbs: 240,
    fat: 49,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Maharashtra", "Pohe", "Bhakri", "Pitla", "Matki Usal", "Solkadhi", "Taak"],
    dailyTimeline: [
      {
        id: "mh-m1",
        slotName: "Morning Warmup",
        time: "6:30 AM – 7:00 AM",
        emoji: "🌅",
        title: "Warm Ginger-Tulsi Water & Soaked Badam",
        calories: 110,
        protein: 4,
        carbs: 5,
        fat: 9,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water boiled with fresh crushed ginger and holy basil leaves (Tulsi), paired with 5 peeled soaked almonds and 2 walnuts.",
        benefits: ["Immunity boosting", "Metabolic warmup"],
        orderQuery: "Herbal Tea Soaked Almonds"
      },
      {
        id: "mh-m2",
        slotName: "Breakfast",
        time: "8:30 AM – 9:00 AM",
        emoji: "🥣",
        title: "Nutritious Kande Pohe with Roasted Peanuts, Sprouted Moong & Fresh Lemon",
        calories: 380,
        protein: 14,
        carbs: 60,
        fat: 10,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        description: "Flattened red/brown rice flakes tempered with mustard seeds, turmeric, green chilies, onions, boiled sprouted moong, and crunchy roasted peanuts.",
        benefits: ["High iron content in flattened rice", "Plant protein from peanuts and sprouted moong"],
        orderQuery: "Kanda Poha with Peanuts"
      },
      {
        id: "mh-m3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM – 12:00 PM",
        emoji: "🥛",
        title: "Kokum Solkadhi / Maharashtrian Masala Taak",
        calories: 65,
        protein: 3,
        carbs: 6,
        fat: 2,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Refreshing kokum infusion blended with light coconut milk / churned spiced buttermilk (Taak) with roasted cumin and coriander.",
        benefits: ["Natural digestive acid regulator", "Cools pitta dosha"],
        orderQuery: "Solkadhi Buttermilk"
      },
      {
        id: "mh-m4",
        slotName: "Traditional Lunch",
        time: "1:30 PM – 2:15 PM",
        emoji: "🍛",
        title: "Jowar / Bajra Bhakri with Besan Pitla, Methi Sabzi & Cucumber Koshimbir",
        calories: 510,
        protein: 21,
        carbs: 72,
        fat: 12,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Earthen cooked sorghum (Jowar) Bhakri served with spiced gram flour Pitla, fresh fenugreek (Methi) leaves stir fry, and grated cucumber Koshimbir.",
        benefits: ["Gram flour pitla provides rich vegetarian protein", "Low glycemic index fiber"],
        orderQuery: "Bhakri Pitla Meal"
      },
      {
        id: "mh-m5",
        slotName: "Evening Snack",
        time: "5:00 PM – 5:30 PM",
        emoji: "🫖",
        title: "Sprouted Matki (Moth Bean) Usal with Green Tea",
        calories: 160,
        protein: 9,
        carbs: 22,
        fat: 3,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Lightly tempered steamed sprouted moth beans with mustard seeds, curry leaves, and a squeeze of lime.",
        benefits: ["High B-vitamins and zinc", "Low calorie satiety"],
        orderQuery: "Sprouted Matki Usal Snack"
      },
      {
        id: "mh-m6",
        slotName: "Light Dinner",
        time: "8:00 PM – 8:30 PM",
        emoji: "🥗",
        title: "Moong Dal & Brown Rice Khichdi with Roasted Papad & Curd",
        calories: 390,
        protein: 15,
        carbs: 62,
        fat: 7,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm, soothing khichdi made with yellow moong dal and brown rice, seasoned with cumin and hing, paired with a bowl of fresh homemade curd.",
        benefits: ["Easy on digestion for restorative sleep", "Complete amino acid profile"],
        orderQuery: "Moong Dal Khichdi with Curd"
      }
    ]
  },

  // ==========================================
  // TAMIL NADU, INDIA
  // ==========================================
  "tamil-nadu": {
    id: "regional-tamil-nadu",
    slug: "regional-tamil-nadu",
    title: "Tamil Nadu Heritage Nutrition Routine",
    subtitle: "Nutrient-rich Tamil culinary schedule with Brown Rice Idlis, Drumstick Sambar, Neer Mor, Dal Kootu, and Steamed Sundal.",
    category: "Regional Cuisine • Tamil Nadu",
    categoryId: "regional-tamil-nadu",
    badge: "Tamil Nadu Cuisine",
    regionName: "Tamil Nadu, India",
    countryName: "India",
    calories: 1820,
    protein: 84,
    carbs: 230,
    fat: 46,
    isVegetarian: true,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    tags: ["Tamil Nadu", "Idli", "Sambar", "Kootu", "Neer Mor", "Sundal", "Ragi Dosa"],
    dailyTimeline: [
      {
        id: "tn-m1",
        slotName: "Morning Warmup",
        time: "6:30 AM – 7:00 AM",
        emoji: "🌅",
        title: "Fenugreek-Jeera Infusion with Soaked Almonds",
        calories: 110,
        protein: 4,
        carbs: 5,
        fat: 9,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water infused with cracked fenugreek (Vendhayam) and cumin seeds with 5 soaked almonds.",
        orderQuery: "Herbal Tea Soaked Almonds"
      },
      {
        id: "tn-m2",
        slotName: "Breakfast",
        time: "8:30 AM – 9:00 AM",
        emoji: "🥣",
        title: "Steamed Kodo Millet / Brown Rice Idli with Drumstick Sambar & Coriander Chutney",
        calories: 380,
        protein: 15,
        carbs: 56,
        fat: 10,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Fluffy steamed millet idlis served with home-cooked dal sambar rich in drumstick and shallots (sambar onions).",
        orderQuery: "Millet Idli Sambar Chutney"
      },
      {
        id: "tn-m3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM – 12:00 PM",
        emoji: "🥛",
        title: "Neer Mor (Tamil Spiced Buttermilk with Ginger, Mustard & Asafoetida)",
        calories: 55,
        protein: 3,
        carbs: 6,
        fat: 2,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Thin churned buttermilk with crushed ginger, green chili, curry leaves, and a dash of hing.",
        orderQuery: "Neer Mor Buttermilk"
      },
      {
        id: "tn-m4",
        slotName: "Traditional Lunch",
        time: "1:30 PM – 2:15 PM",
        emoji: "🍛",
        title: "Brown Rice / Millets with Dal-Veggie Kootu, Tomato Rasam & Cabbage Poriyal",
        calories: 500,
        protein: 19,
        carbs: 72,
        fat: 12,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Wholesome lunch plate with mixed vegetable toor dal kootu, digestive pepper-tomato rasam, and steamed cabbage poriyal.",
        orderQuery: "South Indian Thali Meal"
      },
      {
        id: "tn-m5",
        slotName: "Evening Snack",
        time: "5:00 PM – 5:30 PM",
        emoji: "🫖",
        title: "Konda Kadalai Sundal (Steamed White Chickpeas) & Sukku (Dry Ginger) Green Tea",
        calories: 165,
        protein: 9,
        carbs: 22,
        fat: 4,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Steamed chickpeas tempered with mustard, red chili, and fresh coconut.",
        orderQuery: "Sundal Snack"
      },
      {
        id: "tn-m6",
        slotName: "Light Dinner",
        time: "8:00 PM – 8:30 PM",
        emoji: "🥗",
        title: "Crispy Ragi / Multigrain Dosa with Tomato-Onion Chutney & Vegetable Stew",
        calories: 370,
        protein: 13,
        carbs: 55,
        fat: 9,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Thin, nutritious ragi dosa with tangy homemade tomato chutney and mixed veg stew.",
        orderQuery: "Ragi Dosa Tomato Chutney"
      }
    ]
  },

  // ==========================================
  // CALIFORNIA / WESTERN (USA)
  // ==========================================
  "california": {
    id: "regional-california",
    slug: "regional-california",
    title: "Californian Clean & Plant-Forward Routine",
    subtitle: "Modern West Coast whole-food nutrition with Sourdough Avocado Toast, Green Goddess Smoothie, Quinoa Bowls, and Wild Salmon.",
    category: "Regional Cuisine • California, USA",
    categoryId: "regional-california",
    badge: "California Western",
    regionName: "California, USA",
    countryName: "United States",
    calories: 1950,
    protein: 105,
    carbs: 185,
    fat: 65,
    isVegetarian: false,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    tags: ["California", "Western", "Avocado Toast", "Quinoa Bowl", "Salmon", "Clean Eating", "Mediterranean-Style"],
    dailyTimeline: [
      {
        id: "ca-m1",
        slotName: "Morning Boost",
        time: "7:00 AM",
        emoji: "🌅",
        title: "Warm Lemon-Ginger Chia Infusion & Raw Almonds",
        calories: 110,
        protein: 4,
        carbs: 6,
        fat: 8,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Filtered warm water with fresh lemon juice, crushed ginger root, chia seeds, and raw California almonds.",
        orderQuery: "Chia Lemon Water Almonds"
      },
      {
        id: "ca-m2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Artisan Sourdough Avocado Toast with Poached Eggs & Microgreens",
        calories: 420,
        protein: 20,
        carbs: 38,
        fat: 22,
        prepTime: "12 min",
        isVeg: false,
        dietType: "Eggetarian",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        description: "Toasted artisan whole grain sourdough smeared with ripe Hass avocado, topped with two organic poached eggs, chili flakes, and microgreens.",
        orderQuery: "Avocado Toast Poached Eggs"
      },
      {
        id: "ca-m3",
        slotName: "Mid-Day Green Fuel",
        time: "11:30 AM",
        emoji: "🥤",
        title: "Green Goddess Cold-Pressed Hydrator (Celery, Cucumber, Apple & Mint)",
        calories: 85,
        protein: 3,
        carbs: 18,
        fat: 1,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Pure cold-pressed juice of crisp celery, cucumber, green apple, spinach, and fresh mint.",
        orderQuery: "Cold Pressed Green Juice"
      },
      {
        id: "ca-m4",
        slotName: "Power Lunch",
        time: "1:30 PM",
        emoji: "🥗",
        title: "Tri-Color Quinoa & Roasted Veggie Bowl with Grilled Protein & Tahini Dressing",
        calories: 520,
        protein: 34,
        carbs: 52,
        fat: 18,
        prepTime: "20 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
        description: "Steamed tri-color quinoa layered with roasted sweet potatoes, charred broccoli, grilled chicken breast or organic tofu, drizzled with lemon tahini.",
        orderQuery: "Quinoa Power Bowl Grilled Chicken"
      },
      {
        id: "ca-m5",
        slotName: "Afternoon Snack",
        time: "4:45 PM",
        emoji: "🫐",
        title: "Greek Yogurt Berry Parfait with Chia & Pumpkin Seeds",
        calories: 190,
        protein: 16,
        carbs: 18,
        fat: 5,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Unsweetened 0% Greek yogurt layered with wild fresh blueberries, raspberries, and toasted pumpkin seeds.",
        orderQuery: "Greek Yogurt Berry Parfait"
      },
      {
        id: "ca-m6",
        slotName: "Dinner",
        time: "7:45 PM",
        emoji: "🍽️",
        title: "Herb-Crusted Wild Salmon Fillet with Roasted Asparagus & Cauliflower Mash",
        calories: 460,
        protein: 38,
        carbs: 18,
        fat: 22,
        prepTime: "25 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        description: "Pan-seared wild Alaskan salmon with fresh dill and lemon, accompanied by roasted garlic asparagus spears and velvety cauliflower puree.",
        orderQuery: "Grilled Salmon Asparagus Bowl"
      }
    ]
  }
};

// Fallback helper to get routine for any country & state
export function getRegionalRoutineForLocation(country = "India", state = "Karnataka") {
  const normalizedState = (state || "").toLowerCase().trim().replace(/[^a-z]/g, "");
  
  if (normalizedState.includes("karnataka") || normalizedState === "ka") {
    return REGIONAL_ROUTINES_MAP["karnataka"];
  }
  if (normalizedState.includes("maharashtra") || normalizedState === "mh" || normalizedState.includes("mumbai") || normalizedState.includes("pune")) {
    return REGIONAL_ROUTINES_MAP["maharashtra"];
  }
  if (normalizedState.includes("tamil") || normalizedState.includes("chennai") || normalizedState === "tn") {
    return REGIONAL_ROUTINES_MAP["tamil-nadu"];
  }
  if (normalizedState.includes("california") || normalizedState === "ca" || (country || "").toLowerCase().includes("united states") || (country || "").toLowerCase().includes("usa")) {
    return REGIONAL_ROUTINES_MAP["california"];
  }

  // Default fallback to Karnataka / Indian heritage routine
  return REGIONAL_ROUTINES_MAP["karnataka"];
}
