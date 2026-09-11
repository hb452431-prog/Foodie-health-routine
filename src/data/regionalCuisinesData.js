// Comprehensive Regional & Cultural Cuisines Data for India & Global Regions
// Supports adapting ANY health goal (Diabetes, Weight Loss, Muscle Gain, Student, Heart, High Protein)
// into authentic local and regional dishes for Karnataka, Maharashtra, Tamil Nadu, Andhra, North India, and Western/Global styles.

export const REGIONAL_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    emoji: "🇮🇳",
    states: [
      { id: "karnataka", name: "Karnataka", cuisineTag: "Karnataka Heritage & Millet Cuisine", popularDishes: "Ragi Idli, Bisi Bele Bath, Kosambari, Majjige, Jowar Rotti, Saagu, Kadale Usli" },
      { id: "maharashtra", name: "Maharashtra", cuisineTag: "Maharashtrian Satvik & Coastal", popularDishes: "Kande Pohe, Jowar Bhakri, Pitla, Matki Usal, Solkadhi, Taak" },
      { id: "tamil-nadu", name: "Tamil Nadu", cuisineTag: "Tamil Traditional Low-GI & Millets", popularDishes: "Brown Rice Idli, Sambar, Kootu, Neer Mor, Sundal, Ragi Dosa, Thinai" },
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

// Helper to normalize state string
function normalizeStateKey(stateStr = "") {
  const s = (stateStr || "").toLowerCase().trim();
  if (s.includes("karnataka") || s === "ka" || s.includes("bengaluru") || s.includes("bangalore") || s.includes("mysore") || s.includes("mysuru") || s.includes("hubli")) return "karnataka";
  if (s.includes("maharashtra") || s === "mh" || s.includes("mumbai") || s.includes("pune") || s.includes("nagpur")) return "maharashtra";
  if (s.includes("tamil") || s === "tn" || s.includes("chennai") || s.includes("coimbatore")) return "tamil-nadu";
  if (s.includes("andhra") || s.includes("telangana") || s.includes("hyderabad") || s.includes("vizag")) return "andhra";
  if (s.includes("delhi") || s.includes("punjab") || s.includes("haryana") || s.includes("uttar") || s.includes("north")) return "north-india";
  if (s.includes("california") || s.includes("new york") || s.includes("texas") || s.includes("florida") || s.includes("london") || s.includes("england") || s.includes("ontario") || s.includes("sydney")) return "california";
  return "karnataka"; // Default fallback to Karnataka
}

// =========================================================================
// HEALTH-GOAL SPECIFIC REGIONAL DISH BLUEPRINTS
// Covers Diabetes, Weight Management, Muscle Gain, Student Budget, Heart-Friendly
// =========================================================================

export const HEALTH_GOAL_REGIONAL_TIMELINES = {
  // -------------------------------------------------------------
  // 1. DIABETES & BLOOD SUGAR (Low GI, High Fiber)
  // -------------------------------------------------------------
  "diabetes-friendly": {
    "karnataka": [
      {
        id: "ka-dia-1",
        slotName: "Morning Warmup",
        time: "6:30 AM – 7:00 AM",
        emoji: "🌅",
        title: "Fenugreek-Cinnamon Decoction with Soaked Badam & Walnuts",
        calories: 110,
        protein: 4,
        carbs: 5,
        fat: 9,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Boiled warm water steeped with cracked Ceylon cinnamon and soaked methi seeds with 5 soaked almonds.",
        benefits: ["Enhances insulin sensitivity", "Supplies natural Omega-3s", "Gentle metabolic warmup"],
        ingredients: [
          { name: "Ceylon Cinnamon Stick", amount: "1 small piece (cracked)" },
          { name: "Fenugreek Seeds (Methi)", amount: "1/2 tsp (soaked overnight)" },
          { name: "Warm Filtered Water", amount: "300 ml" },
          { name: "Soaked Almonds (peeled)", amount: "5 pieces" }
        ],
        steps: ["Boil water with cinnamon and soaked methi for 3 minutes.", "Strain and drink warm with peeled almonds."],
        youtubeVideos: [{ id: "yt-ka-d1", title: "Fenugreek Water Benefits for Glucose", query: "fenugreek water diabetes benefits" }],
        orderQuery: "Herbal Green Tea Almonds"
      },
      {
        id: "ka-dia-2",
        slotName: "Breakfast",
        time: "8:30 AM – 9:00 AM",
        emoji: "🥣",
        title: "Steamed Karnataka Ragi Idli with Sprouted Methi Sambar & Mint Coconut Chutney",
        calories: 380,
        protein: 15,
        carbs: 54,
        fat: 10,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Nutrient-packed steamed finger millet (Ragi) idlis served with vegetable toor dal sambar and fresh mint chutney.",
        benefits: ["Low glycemic index keeps glucose steady", "Rich in finger millet calcium and dietary fiber"],
        ingredients: [
          { name: "Ragi Flour & Idli Batter", amount: "1 cup batter" },
          { name: "Toor Dal Sambar with Drumstick & Carrots", amount: "1 small bowl (150ml)" },
          { name: "Fresh Mint-Coriander Coconut Chutney", amount: "2 tbsp" }
        ],
        steps: ["Steam ragi idlis for 10-12 minutes.", "Serve hot with drumstick sambar and mint chutney."],
        youtubeVideos: [{ id: "yt-ka-d2", title: "Karnataka Soft Ragi Idli Recipe for Diabetes", query: "karnataka ragi idli recipe diabetes" }],
        orderQuery: "Ragi Idli Sambar Chutney"
      },
      {
        id: "ka-dia-3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM – 12:00 PM",
        emoji: "🥛",
        title: "Masala Majjige (Karnataka Spiced Buttermilk with Ginger & Curry Leaves)",
        calories: 55,
        protein: 3,
        carbs: 6,
        fat: 2,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
        description: "Freshly churned light curd diluted with water, seasoned with ginger, green chili, curry leaves, hing, and rock salt.",
        benefits: ["Probiotic drink that cools the digestive tract", "Zero cholesterol and aids glucose regulation"],
        ingredients: [
          { name: "Fresh Churned Curd", amount: "100 ml" },
          { name: "Chilled Water", amount: "200 ml" },
          { name: "Crushed Ginger, Hing & Curry Leaves", amount: "1 tsp" }
        ],
        steps: ["Whisk curd and water until frothy.", "Add crushed ginger, curry leaves, hing, and rock salt. Serve chilled."],
        youtubeVideos: [{ id: "yt-ka-d3", title: "Karnataka Masala Majjige Recipe", query: "karnataka masala majjige buttermilk" }],
        orderQuery: "Masala Buttermilk Majjige"
      },
      {
        id: "ka-dia-4",
        slotName: "Heritage Lunch",
        time: "1:30 PM – 2:15 PM",
        emoji: "🍛",
        title: "Brown Rice / Millet Bisi Bele Bath with Steamed Beetroot Palya & Hesaru Bele Kosambari",
        calories: 500,
        protein: 19,
        carbs: 72,
        fat: 12,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Whole grain brown rice & toor dal Bisi Bele Bath with mixed vegetables, steamed beetroot palya, and soaked yellow moong dal Kosambari.",
        benefits: ["Balanced plant protein and low glycemic complex carbs", "Raw moong dal supplies live enzymes"],
        ingredients: [
          { name: "Brown Rice & Toor Dal Bisi Bele Bath", amount: "1 medium bowl (250g)" },
          { name: "Steamed Beetroot Palya", amount: "1 small cup (100g)" },
          { name: "Hesaru Bele Moong Kosambari", amount: "1 small cup (100g)" }
        ],
        steps: ["Cook brown rice, toor dal, and vegetables with bisi bele bath powder.", "Prepare fresh moong dal kosambari with cucumber and lime."],
        youtubeVideos: [{ id: "yt-ka-d4", title: "Authentic Bisi Bele Bath Recipe", query: "authentic karnataka bisi bele bath recipe" }],
        orderQuery: "Bisi Bele Bath Meal with Palya"
      },
      {
        id: "ka-dia-5",
        slotName: "Evening Snack",
        time: "5:00 PM – 5:30 PM",
        emoji: "🫖",
        title: "Steamed Kadale Kalu Usli (Spiced Black Chickpeas) & Filtered Green Tea",
        calories: 165,
        protein: 10,
        carbs: 23,
        fat: 4,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        description: "Boiled black chickpeas (Kadale Kalu) tempered with mustard seeds, curry leaves, and a touch of fresh coconut.",
        benefits: ["Slow-burning complex carbs prevent evening sugar spikes", "High dietary fiber and minerals"],
        ingredients: [
          { name: "Boiled Black Chickpeas", amount: "100g" },
          { name: "Fresh Grated Coconut & Mustard", amount: "1 tbsp" },
          { name: "Brewed Green Tea", amount: "200 ml" }
        ],
        steps: ["Boil soaked chickpeas.", "Temper with mustard, curry leaves, and green chili. Toss with lemon juice."],
        youtubeVideos: [{ id: "yt-ka-d5", title: "Kadale Kalu Usli Recipe", query: "karnataka kadale kalu usli sundal recipe" }],
        orderQuery: "Boiled Chana Usli Snack"
      },
      {
        id: "ka-dia-6",
        slotName: "Light Dinner",
        time: "8:00 PM – 8:30 PM",
        emoji: "🥗",
        title: "Soft Jowar (Sorghum) Rotti with Mixed Vegetable Saagu & Fresh Cucumber Salad",
        calories: 380,
        protein: 13,
        carbs: 58,
        fat: 9,
        prepTime: "20 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Hand-rolled gluten-free Jowar (sorghum) rotti served with mixed vegetable saagu and crisp cucumber slices.",
        benefits: ["Naturally gluten-free and low GI", "Light on digestion for restful sleep"],
        ingredients: [
          { name: "Jowar Flour Rotti", amount: "2 soft rottis" },
          { name: "Mixed Vegetable Saagu", amount: "1 cup (180ml)" },
          { name: "Cucumber Salad with Coriander", amount: "1 small plate" }
        ],
        steps: ["Knead jowar flour with hot water and pat thin on tawa.", "Simmer mixed vegetables in mild saagu gravy."],
        youtubeVideos: [{ id: "yt-ka-d6", title: "Jowar Rotti Making Technique", query: "north karnataka jowar rotti making" }],
        orderQuery: "Jowar Rotti Veg Saagu Meal"
      }
    ],
    "maharashtra": [
      {
        id: "mh-dia-1",
        slotName: "Morning Warmup",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Cinnamon-Jeera Decoction & Soaked Badam",
        calories: 105,
        protein: 4,
        carbs: 5,
        fat: 8,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water infused with jeera and cinnamon with 5 peeled soaked almonds.",
        benefits: ["Balances early fasting blood sugar", "Stimulates bile production"],
        orderQuery: "Herbal Tea Almonds"
      },
      {
        id: "mh-dia-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Sprouted Matki (Moth Bean) Kande Pohe with Mint Chutney",
        calories: 370,
        protein: 14,
        carbs: 56,
        fat: 9,
        prepTime: "12 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Flattened rice sautéed with crunchy sprouted matki, onions, mustard seeds, turmeric, and lime.",
        benefits: ["Sprouted matki lowers the GI of regular poha", "High plant protein and iron"],
        orderQuery: "Matki Poha Breakfast"
      },
      {
        id: "mh-dia-3",
        slotName: "Mid-Day Drink",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Cumin-Infused Maharashtrian Taak (Spiced Buttermilk)",
        calories: 50,
        protein: 3,
        carbs: 5,
        fat: 2,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Light churned buttermilk with roasted cumin, green chili paste, and fresh coriander.",
        benefits: ["Supports gut microbiome", "Quenches thirst without sugar"],
        orderQuery: "Masala Taak Buttermilk"
      },
      {
        id: "mh-dia-4",
        slotName: "Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "Jowar Bhakri with Sprouted Moong Usal & Fresh Cucumber Koshimbir",
        calories: 490,
        protein: 20,
        carbs: 68,
        fat: 11,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Warm sorghum bhakri served with spiced sprouted green moong usal and peanut-cucumber koshimbir.",
        benefits: ["Slow-digesting complex carbs", "Rich in folate and potassium"],
        orderQuery: "Jowar Bhakri Moong Usal"
      },
      {
        id: "mh-dia-5",
        slotName: "Evening Snack",
        time: "5:00 PM",
        emoji: "🫖",
        title: "Dry Roasted Chana with Flaxseed Powder & Green Tea",
        calories: 155,
        protein: 9,
        carbs: 21,
        fat: 4,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Crispy roasted black gram tossed with rock salt and green tea.",
        benefits: ["Zero-sugar crunchy snack", "Supplies plant lignans"],
        orderQuery: "Roasted Chana Snack"
      },
      {
        id: "mh-dia-6",
        slotName: "Dinner",
        time: "8:00 PM",
        emoji: "🥗",
        title: "Steamed Besan Pithla with 1 Methi Bhakri & Radish Salad",
        calories: 390,
        protein: 16,
        carbs: 52,
        fat: 10,
        prepTime: "18 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Savory tempered chickpea flour pithla with fresh fenugreek leaves in a jowar/bajra bhakri.",
        benefits: ["Methi leaves enhance glucose clearance", "High satiety dinner"],
        orderQuery: "Pithla Bhakri Meal"
      }
    ],
    "tamil-nadu": [
      {
        id: "tn-dia-1",
        slotName: "Morning Warmup",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Methi Seed Decoction with Soaked Badam",
        calories: 105,
        protein: 4,
        carbs: 5,
        fat: 8,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water infused with methi seeds and soaked almonds.",
        orderQuery: "Herbal Tea Badam"
      },
      {
        id: "tn-dia-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Steamed Kambu (Pearl Millet) / Ragi Idli with Drumstick Sambar",
        calories: 375,
        protein: 14,
        carbs: 55,
        fat: 9,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Millet idlis steamed to perfection served with vegetable-packed toor dal sambar.",
        benefits: ["Pearl millet provides long-lasting low GI energy"],
        orderQuery: "Millet Idli Sambar"
      },
      {
        id: "tn-dia-3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Tamil Neer Mor (Spiced Buttermilk with Ginger & Curry Leaves)",
        calories: 50,
        protein: 3,
        carbs: 5,
        fat: 2,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Cool diluted churned curd with asafoetida, green chili, and ginger.",
        orderQuery: "Neer Mor Buttermilk"
      },
      {
        id: "tn-dia-4",
        slotName: "Heritage Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "Red Matta Rice with Vazhaithandu (Banana Stem) Kootu & Moong Sundal",
        calories: 480,
        protein: 18,
        carbs: 70,
        fat: 10,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Nutritious banana stem kootu high in fiber with red rice and yellow moong sundal.",
        benefits: ["Banana stem prevents renal stones and aids glycemic control"],
        orderQuery: "South Indian Meals Sambar Kootu"
      },
      {
        id: "tn-dia-5",
        slotName: "Evening Snack",
        time: "5:00 PM",
        emoji: "🫖",
        title: "Spiced Peanut-Moong Sundal & Cardamom Black Tea",
        calories: 160,
        protein: 9,
        carbs: 20,
        fat: 5,
        prepTime: "8 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Tempered boiled legumes with mustard and shredded coconut.",
        orderQuery: "Sundal Snack"
      },
      {
        id: "tn-dia-6",
        slotName: "Dinner",
        time: "8:00 PM",
        emoji: "🥗",
        title: "Multi-Millet Dosa with Ridge Gourd (Peerkangai) Thogayal",
        calories: 360,
        protein: 12,
        carbs: 54,
        fat: 8,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Thin crispy millet dosa served with high-fiber ridge gourd chutney.",
        orderQuery: "Millet Dosa Chutney"
      }
    ]
  },

  // -------------------------------------------------------------
  // 2. WEIGHT MANAGEMENT & FAT LOSS (Calorie Deficit & High Satiety)
  // -------------------------------------------------------------
  "weight-management": {
    "karnataka": [
      {
        id: "ka-wm-1",
        slotName: "Morning Fat Burn",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Warm Cumin-Lemon Detox Water & 5 Soaked Badam",
        calories: 90,
        protein: 4,
        carbs: 4,
        fat: 7,
        prepTime: "4 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water steeped with roasted jeera and lemon juice to kickstart metabolic lipid burning.",
        benefits: ["Stimulates thermogenesis", "Reduces water retention"],
        orderQuery: "Warm Lemon Water Almonds"
      },
      {
        id: "ka-wm-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Foxtail Millet (Navane) Vegetable Uppittu with Coconut-Mint Chutney",
        calories: 320,
        protein: 12,
        carbs: 46,
        fat: 8,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Low-calorie, fiber-dense foxtail millet (Navane) upma sautéed with carrots, French beans, green peas, and mustard tempering.",
        benefits: ["High fiber delays gastric emptying", "Low calorie density"],
        orderQuery: "Millet Upma Chutney"
      },
      {
        id: "ka-wm-3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Chilled Ginger-Cumin Masala Majjige (Fat-Free Spiced Buttermilk)",
        calories: 45,
        protein: 3,
        carbs: 5,
        fat: 1,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Zero-fat buttermilk blended with ginger, curry leaves, hing, and rock salt.",
        benefits: ["Suppresses afternoon hunger cravings", "Supplies calcium & hydration"],
        orderQuery: "Masala Buttermilk Majjige"
      },
      {
        id: "ka-wm-4",
        slotName: "Fat Loss Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "Hesaru Kaalu (Green Gram) Palya with 1 Jowar Roti, Tomato Rasam & Moong Kosambari",
        calories: 440,
        protein: 22,
        carbs: 62,
        fat: 9,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Protein-rich whole green gram (Hesaru Kaalu) dry curry served with 1 thin Jowar roti, piping hot digestive pepper-tomato rasam, and raw moong kosambari.",
        benefits: ["22g clean protein for muscle preservation during deficit", "High fiber prevents insulin spikes"],
        orderQuery: "Green Gram Usli Jowar Roti"
      },
      {
        id: "ka-wm-5",
        slotName: "Evening Crunch",
        time: "5:00 PM",
        emoji: "🥜",
        title: "Roasted Spiced Makhana with Roasted Flaxseeds & Jasmine Green Tea",
        calories: 140,
        protein: 5,
        carbs: 18,
        fat: 4,
        prepTime: "6 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Crispy dry-roasted foxnuts seasoned with turmeric and rock salt with a cup of green tea.",
        benefits: ["Guilt-free crunchy snack with zero sugar", "Antioxidants support fat oxidation"],
        orderQuery: "Roasted Makhana Green Tea"
      },
      {
        id: "ka-wm-6",
        slotName: "Lean Dinner",
        time: "7:45 PM",
        emoji: "🥗",
        title: "Steamed Akki-Millet Rotti with Ridge Gourd (Heerekai) Saagu & Cucumber Salad",
        calories: 340,
        protein: 11,
        carbs: 52,
        fat: 7,
        prepTime: "18 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Steamed light ragi/millet rotti served with fiber-rich water gourd (Heerekai) curry and cucumber slices.",
        benefits: ["Ultra-light evening digestion", "Aids fat burn while sleeping"],
        orderQuery: "Akki Roti Veg Curry"
      }
    ],
    "maharashtra": [
      {
        id: "mh-wm-1",
        slotName: "Morning Warmup",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Warm Lemon-Ajwain Infusion & Almonds",
        calories: 85,
        protein: 4,
        carbs: 4,
        fat: 6,
        prepTime: "4 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water infused with carom seeds and lemon with 5 soaked almonds.",
        orderQuery: "Warm Lemon Water"
      },
      {
        id: "mh-wm-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Steamed Moong Sprouts Salad with Light Kande Pohe",
        calories: 330,
        protein: 13,
        carbs: 48,
        fat: 8,
        prepTime: "12 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Light poha with double sprouted green moong, curry leaves, and lemon.",
        orderQuery: "Sprouts Poha"
      },
      {
        id: "mh-wm-3",
        slotName: "Mid-Day Drink",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Zero-Fat Roasted Cumin Taak",
        calories: 45,
        protein: 3,
        carbs: 5,
        fat: 1,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Light buttermilk with cumin and mint.",
        orderQuery: "Masala Taak"
      },
      {
        id: "mh-wm-4",
        slotName: "Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "1 Jowar Bhakri with Sprouted Matki Usal & Cucumber Salad",
        calories: 430,
        protein: 20,
        carbs: 60,
        fat: 9,
        prepTime: "22 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "High-protein sprouted matki dry curry with 1 hand-patted jowar bhakri and cucumber.",
        orderQuery: "Matki Usal Bhakri"
      },
      {
        id: "mh-wm-5",
        slotName: "Snack",
        time: "5:00 PM",
        emoji: "🥜",
        title: "Roasted Makhana with Green Tea",
        calories: 130,
        protein: 5,
        carbs: 18,
        fat: 3,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Dry roasted lotus seeds with green tea.",
        orderQuery: "Roasted Makhana"
      },
      {
        id: "mh-wm-6",
        slotName: "Dinner",
        time: "7:45 PM",
        emoji: "🥗",
        title: "Vegetable Daliya Khichdi with Low-Fat Curd",
        calories: 340,
        protein: 13,
        carbs: 54,
        fat: 6,
        prepTime: "18 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Broken wheat khichdi with mixed vegetables and yellow moong dal.",
        orderQuery: "Daliya Khichdi Curd"
      }
    ]
  },

  // -------------------------------------------------------------
  // 3. MUSCLE GAIN & GYM PERFORMANCE (High Protein & Recovery)
  // -------------------------------------------------------------
  "muscle-gain": {
    "karnataka": [
      {
        id: "ka-mg-1",
        slotName: "Pre-Workout Fuel",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Sattu-Badam Energy Shake with Banana & Soaked Chia",
        calories: 240,
        protein: 12,
        carbs: 38,
        fat: 5,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Roasted gram (Sattu) blended with warm almond milk, banana, and soaked chia seeds.",
        benefits: ["Fast digesting clean glycogen", "12g pre-workout amino acids"],
        orderQuery: "Sattu Protein Shake"
      },
      {
        id: "ka-mg-2",
        slotName: "Post-Workout Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "High-Protein Soya & Paneer Stuffed Ragi Dosa with Roasted Peanut Chutney",
        calories: 490,
        protein: 29,
        carbs: 52,
        fat: 16,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Crispy finger millet (Ragi) dosa filled with grated low-fat paneer, minced soya granules, and served with rich peanut chutney.",
        benefits: ["29g complete protein for muscle protein synthesis", "Calcium from ragi supports bone density"],
        orderQuery: "Paneer Stuffed Ragi Dosa"
      },
      {
        id: "ka-mg-3",
        slotName: "Mid-Day Anabolic Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: "High-Protein Masala Majjige with Soaked Hemp / Chia Seeds",
        calories: 95,
        protein: 8,
        carbs: 7,
        fat: 4,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Thick curd buttermilk blended with hemp seeds, ginger, curry leaves, and rock salt.",
        benefits: ["Supplies leucine and glutamine for recovery", "Restores workout electrolyte loss"],
        orderQuery: "Masala Buttermilk Majjige"
      },
      {
        id: "ka-mg-4",
        slotName: "Muscle Fuel Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "High-Protein Karnataka Bisi Bele Bath with Soya Chunks, Boiled Kadale Kalu & 2 Boiled Eggs / Paneer Bhurji",
        calories: 610,
        protein: 38,
        carbs: 75,
        fat: 16,
        prepTime: "25 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Nutritious Bisi Bele Bath loaded with protein-rich soya chunks, toor dal, and boiled black chickpeas, paired with 2 boiled eggs or low-fat paneer bhurji.",
        benefits: ["38g protein powers muscle hypertrophy", "Replenishes muscle glycogen stores"],
        orderQuery: "High Protein Thali Meal"
      },
      {
        id: "ka-mg-5",
        slotName: "Afternoon Snack",
        time: "5:00 PM",
        emoji: "🫖",
        title: "Steamed Black Chana Sundal & Roasted Peanuts with Green Tea",
        calories: 210,
        protein: 14,
        carbs: 24,
        fat: 6,
        prepTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Boiled black chickpeas and peanuts tossed with curry leaves, mustard seeds, and lime.",
        benefits: ["14g sustained-release plant protein", "Rich in zinc and magnesium"],
        orderQuery: "Boiled Chana Usli Snack"
      },
      {
        id: "ka-mg-6",
        slotName: "Night Recovery Dinner",
        time: "8:15 PM",
        emoji: "🍽️",
        title: "2 Soft Jowar Rottis with Sprouted Moong Dal Curry & Grilled Paneer / Chicken Breast",
        calories: 520,
        protein: 36,
        carbs: 58,
        fat: 14,
        prepTime: "22 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Fiber-rich jowar rottis served with thick sprouted moong dal curry and 100g grilled low-fat paneer or grilled chicken breast.",
        benefits: ["36g overnight slow-release casein and plant proteins", "Prevents nocturnal muscle catabolism"],
        orderQuery: "Jowar Roti Grilled Paneer Meal"
      }
    ],
    "maharashtra": [
      {
        id: "mh-mg-1",
        slotName: "Pre-Workout Fuel",
        time: "6:30 AM",
        emoji: "🌅",
        title: "Sattu & Peanut Butter Recovery Shake",
        calories: 250,
        protein: 14,
        carbs: 35,
        fat: 6,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Roasted gram sattu blended with peanut butter and warm milk.",
        orderQuery: "Sattu Shake"
      },
      {
        id: "mh-mg-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "High-Protein Paneer & Sprouted Matki Poha with Boiled Eggs",
        calories: 480,
        protein: 28,
        carbs: 50,
        fat: 15,
        prepTime: "15 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "Poha loaded with paneer cubes, sprouted matki, and 2 boiled eggs.",
        orderQuery: "Paneer Matki Poha"
      },
      {
        id: "mh-mg-3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: "High-Protein Spiced Taak with Chia",
        calories: 90,
        protein: 8,
        carbs: 6,
        fat: 3,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Thick curd buttermilk with chia seeds.",
        orderQuery: "Masala Taak"
      },
      {
        id: "mh-mg-4",
        slotName: "Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "2 Jowar Bhakris with Soya Matki Usal & Grilled Chicken / Paneer",
        calories: 620,
        protein: 40,
        carbs: 72,
        fat: 16,
        prepTime: "25 min",
        isVeg: false,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Sorghum bhakris with soya matki usal and grilled paneer or chicken breast.",
        orderQuery: "Bhakri Usal Thali"
      },
      {
        id: "mh-mg-5",
        slotName: "Snack",
        time: "5:00 PM",
        emoji: "🥜",
        title: "Roasted Black Gram & Peanuts with Tea",
        calories: 200,
        protein: 13,
        carbs: 22,
        fat: 6,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Crunchy roasted chana and peanuts.",
        orderQuery: "Roasted Chana"
      },
      {
        id: "mh-mg-6",
        slotName: "Dinner",
        time: "8:15 PM",
        emoji: "🍽️",
        title: "1-Pot Moong Dal Khichdi with Soya Chunks & Paneer Bhurji",
        calories: 510,
        protein: 34,
        carbs: 58,
        fat: 14,
        prepTime: "20 min",
        isVeg: true,
        dietType: "High Protein",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Nutritious moong dal khichdi loaded with soya and fresh paneer bhurji.",
        orderQuery: "Khichdi Paneer Bhurji"
      }
    ]
  },

  // -------------------------------------------------------------
  // 4. STUDENT BUDGET & RAPID MEALS (Fast, Economical, Focus)
  // -------------------------------------------------------------
  "student-budget-plan": {
    "karnataka": [
      {
        id: "ka-st-1",
        slotName: "Morning Warmup",
        time: "7:00 AM",
        emoji: "🌅",
        title: "Warm Cumin Water with Roasted Peanuts",
        calories: 120,
        protein: 5,
        carbs: 6,
        fat: 8,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm cumin water paired with crunchy roasted peanuts for quick student brain alertness.",
        benefits: ["Fast focus booster", "Under ₹10 cost"],
        orderQuery: "Peanuts Green Tea"
      },
      {
        id: "ka-st-2",
        slotName: "Quick Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Karnataka Lemon Avalakki (Poha) with Peanuts & Boiled Moong Sprouts",
        calories: 360,
        protein: 13,
        carbs: 58,
        fat: 8,
        prepTime: "8 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        description: "Instant 8-minute beaten rice (Avalakki) seasoned with turmeric, mustard, curry leaves, crunchy peanuts, and sprouted moong.",
        benefits: ["Fast, ultra-affordable (<₹35)", "High iron prevents classroom lethargy"],
        orderQuery: "Kanda Poha Avalakki"
      },
      {
        id: "ka-st-3",
        slotName: "Mid-Day Sip",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Quick Salted Masala Buttermilk (Majjige)",
        calories: 50,
        protein: 3,
        carbs: 5,
        fat: 2,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Refreshing buttermilk with cumin and rock salt.",
        orderQuery: "Masala Buttermilk Majjige"
      },
      {
        id: "ka-st-4",
        slotName: "1-Pot Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "1-Pot Karnataka Toor / Masoor Dal Tadka with Steamed Rice or 2 Rotis & Onion Salad",
        calories: 480,
        protein: 18,
        carbs: 74,
        fat: 10,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Quick 1-pot yellow dal tempered with garlic, tomato, and cumin, served with hot rice or rotis.",
        benefits: ["Costs under ₹40 per serving", "Complete protein amino acids"],
        orderQuery: "Dal Tadka Roti Meal"
      },
      {
        id: "ka-st-5",
        slotName: "Study Snack",
        time: "5:00 PM",
        emoji: "🫖",
        title: "Roasted Kadale Kalu (Roasted Bengal Gram) Snack with Chai / Tea",
        calories: 150,
        protein: 8,
        carbs: 20,
        fat: 3,
        prepTime: "2 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Crunchy roasted chana with spices.",
        orderQuery: "Roasted Chana Snack"
      },
      {
        id: "ka-st-6",
        slotName: "Fast Dinner",
        time: "8:00 PM",
        emoji: "🥗",
        title: "Vegetable Moong Dal Khichdi with Low-Fat Curd & Pickle",
        calories: 410,
        protein: 16,
        carbs: 65,
        fat: 7,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Pressure cooked 1-pot khichdi made with yellow moong dal, rice, and mixed vegetables.",
        benefits: ["Zero dirty dishes", "Warm comfort food for good sleep"],
        orderQuery: "Moong Dal Khichdi"
      }
    ]
  },

  // -------------------------------------------------------------
  // 5. HEART-FRIENDLY & CARDIO (Low Sodium, High Potassium)
  // -------------------------------------------------------------
  "heart-friendly": {
    "karnataka": [
      {
        id: "ka-hf-1",
        slotName: "Morning Tonic",
        time: "7:00 AM",
        emoji: "🌅",
        title: "Hibiscus-Amla Herbal Decoction with 4 Raw Walnuts",
        calories: 120,
        protein: 3,
        carbs: 7,
        fat: 9,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm hibiscus infusion with Indian gooseberry (Amla) juice and heart-protecting walnuts.",
        benefits: ["Relaxes vascular walls", "Rich in ALA Omega-3s and Vitamin C"],
        orderQuery: "Herbal Hibiscus Tea Walnuts"
      },
      {
        id: "ka-hf-2",
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: "Broken Wheat (Daliya) Vegetable Upma with Curry Leaves & Mint Chutney",
        calories: 360,
        protein: 13,
        carbs: 56,
        fat: 8,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
        description: "High-fiber broken wheat simmered with diced carrots, beans, and fresh curry leaves.",
        benefits: ["Soluble fiber helps lower LDL cholesterol", "Zero trans fats"],
        orderQuery: "Daliya Upma Chutney"
      },
      {
        id: "ka-hf-3",
        slotName: "Mid-Day Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: "Light Ginger Majjige with Roasted Cumin & Curry Leaves",
        calories: 45,
        protein: 3,
        carbs: 5,
        fat: 1,
        prepTime: "4 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Low-sodium buttermilk with crushed ginger and roasted cumin.",
        benefits: ["Supplies potassium to regulate arterial blood pressure"],
        orderQuery: "Masala Majjige"
      },
      {
        id: "ka-hf-4",
        slotName: "Cardio Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: "Brown Rice with Garlic-Tomato Rasam & Steamed Beetroot Palya",
        calories: 460,
        protein: 16,
        carbs: 74,
        fat: 9,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
        description: "Garlic-infused pepper rasam with brown rice and steamed beetroot palya rich in dietary nitrates.",
        benefits: ["Garlic & beetroot naturally enhance nitric oxide production for blood flow"],
        orderQuery: "Rasam Rice Beetroot Palya"
      },
      {
        id: "ka-hf-5",
        slotName: "Snack",
        time: "5:00 PM",
        emoji: "🥜",
        title: "Roasted Flaxseed & Kadale Kalu (Bengal Gram) with Green Tea",
        calories: 150,
        protein: 7,
        carbs: 18,
        fat: 5,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "High-lignan roasted flaxseeds and boiled chickpeas with green tea.",
        orderQuery: "Roasted Flaxseeds Snack"
      },
      {
        id: "ka-hf-6",
        slotName: "Dinner",
        time: "8:00 PM",
        emoji: "🥗",
        title: "Steamed Soft Ragi Dosa with Ridge Gourd (Heerekai) Kootu & Cucumber Salad",
        calories: 350,
        protein: 12,
        carbs: 54,
        fat: 7,
        prepTime: "18 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
        description: "Light finger millet dosa with mild ridge gourd dal kootu.",
        benefits: ["Light on evening heart load and digestion"],
        orderQuery: "Ragi Dosa Veg Kootu"
      }
    ]
  }
};

// Also alias helper keys so gym-beginner and muscle-gain, student-budget and student-budget-plan map seamlessly
HEALTH_GOAL_REGIONAL_TIMELINES["gym-beginner"] = HEALTH_GOAL_REGIONAL_TIMELINES["muscle-gain"];
HEALTH_GOAL_REGIONAL_TIMELINES["weight-loss-smart"] = HEALTH_GOAL_REGIONAL_TIMELINES["weight-management"];
HEALTH_GOAL_REGIONAL_TIMELINES["student-budget"] = HEALTH_GOAL_REGIONAL_TIMELINES["student-budget-plan"];

// =========================================================================
// STANDALONE REGIONAL ROUTINES MAP
// =========================================================================

export const REGIONAL_ROUTINES_MAP = {
  "karnataka-heritage-wellness": {
    id: "karnataka-heritage-wellness",
    slug: "karnataka-heritage-wellness",
    title: "Karnataka Heritage & Millet Wellness Routine",
    subtitle: "Authentic Karnataka traditional diet featuring Ragi, Foxtail Millet, Bisi Bele Bath, Kosambari, and Majjige.",
    category: "Regional Cuisine • Karnataka",
    categoryId: "regional-karnataka",
    badge: "Karnataka Heritage",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80",
    description: "Centuries-old Ayurvedic nutritional wisdom from Karnataka. Balanced with finger millets, whole lentils, natural buttermilk probiotics, and rich plant fiber.",
    difficulty: "Easy",
    mealsCount: 6,
    prepTimeAvg: "15-20 min",
    calories: 1790,
    protein: 88,
    carbs: 232,
    fat: 52,
    fiber: 45,
    rating: 4.95,
    reviewsCount: 428,
    tags: ["Karnataka Cuisine", "Millet Power", "Ragi Idli", "Kosambari", "Jowar Rotti", "Ayurvedic"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "Traditional regional whole-food sequence. Suitable for diabetes management, weight maintenance, and overall gut health.",
    dailyTimeline: HEALTH_GOAL_REGIONAL_TIMELINES["diabetes-friendly"]["karnataka"]
  },

  "maharashtra-satvik-balance": {
    id: "maharashtra-satvik-balance",
    slug: "maharashtra-satvik-balance",
    title: "Maharashtra Satvik & Millet Balance Routine",
    subtitle: "Wholesome Maharashtrian nutrition featuring Kande Pohe, Sprouted Matki Usal, Jowar Bhakri, and Solkadhi/Taak.",
    category: "Regional Cuisine • Maharashtra",
    categoryId: "regional-maharashtra",
    badge: "Maharashtra Satvik",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80",
    description: "Rich in sprouted legumes (Matki/Moong), coarse grains (Jowar/Bajra Bhakri), and cooling probiotics (Taak). Perfect for light, high-energy everyday living.",
    difficulty: "Easy",
    mealsCount: 6,
    prepTimeAvg: "15-20 min",
    calories: 1820,
    protein: 92,
    carbs: 238,
    fat: 54,
    fiber: 44,
    rating: 4.9,
    reviewsCount: 362,
    tags: ["Maharashtrian", "Jowar Bhakri", "Matki Usal", "Taak", "Satvik", "Low GI"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "Ideal balanced regional nutrition for digestive wellness and sustained vitality.",
    dailyTimeline: HEALTH_GOAL_REGIONAL_TIMELINES["diabetes-friendly"]["maharashtra"]
  },

  "tamil-nadu-millet-tradition": {
    id: "tamil-nadu-millet-tradition",
    slug: "tamil-nadu-millet-tradition",
    title: "Tamil Nadu Traditional Millet & Low-GI Routine",
    subtitle: "Authentic Tamil traditional meal sequence with Kambu/Ragi Idli, Drumstick Sambar, Vazhaithandu Kootu, and Neer Mor.",
    category: "Regional Cuisine • Tamil Nadu",
    categoryId: "regional-tamil-nadu",
    badge: "Tamil Tradition",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80",
    description: "Built upon indigenous Tamil millets (Thinai, Kambu, Ragi), anti-inflammatory spices (pepper rasam), and cooling Neer Mor for blood sugar and heart health.",
    difficulty: "Easy",
    mealsCount: 6,
    prepTimeAvg: "15-20 min",
    calories: 1765,
    protein: 85,
    carbs: 235,
    fat: 48,
    fiber: 46,
    rating: 4.9,
    reviewsCount: 310,
    tags: ["Tamil Nadu", "Kambu Millet", "Drumstick Sambar", "Neer Mor", "Sundal", "Low GI"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "Evidence-backed traditional South Indian low-glycemic meal sequence.",
    dailyTimeline: HEALTH_GOAL_REGIONAL_TIMELINES["diabetes-friendly"]["tamil-nadu"]
  },

  "california-clean-plant": {
    id: "california-clean-plant",
    slug: "california-clean-plant",
    title: "Californian Clean Whole-Foods Routine",
    subtitle: "West Coast farm-to-table sequence featuring Avocado Sourdough, Green Goddess Quinoa Bowls, and Wild Salmon.",
    category: "Global • California Clean",
    categoryId: "global-california",
    badge: "West Coast Clean",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    description: "Focuses on fresh organic produce, healthy plant fats (avocado, cold-pressed olive oil, chia, walnuts), and antioxidant berries.",
    difficulty: "Easy",
    mealsCount: 5,
    prepTimeAvg: "15 min",
    calories: 1850,
    protein: 95,
    carbs: 190,
    fat: 65,
    fiber: 42,
    rating: 4.88,
    reviewsCount: 540,
    tags: ["Californian", "Avocado", "Clean Eating", "Quinoa Bowl", "Omega-3", "Organic"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "Standard clean whole foods dietary pattern.",
    dailyTimeline: HEALTH_GOAL_REGIONAL_TIMELINES["heart-friendly"]["karnataka"]
  }
};

// =========================================================================
// GET REGIONAL ROUTINE FOR LOCATION
// =========================================================================
export function getRegionalRoutineForLocation(country = "India", state = "Karnataka") {
  const normState = normalizeStateKey(state);
  const normCountry = (country || "").toLowerCase().trim();

  if (normCountry.includes("india") || normCountry === "in") {
    if (normState === "maharashtra") return REGIONAL_ROUTINES_MAP["maharashtra-satvik-balance"];
    if (normState === "tamil-nadu") return REGIONAL_ROUTINES_MAP["tamil-nadu-millet-tradition"];
    return REGIONAL_ROUTINES_MAP["karnataka-heritage-wellness"];
  }

  // Western / International
  if (
    normCountry.includes("united states") ||
    normCountry.includes("usa") ||
    normCountry.includes("united kingdom") ||
    normCountry.includes("uk") ||
    normCountry.includes("canada") ||
    normCountry.includes("australia")
  ) {
    return REGIONAL_ROUTINES_MAP["california-clean-plant"];
  }

  return REGIONAL_ROUTINES_MAP["karnataka-heritage-wellness"];
}

// =========================================================================
// UNIVERSAL LOCATION-AWARE ROUTINE ADAPTER
// Converts ANY health goal (diabetes, weight loss, muscle gain, student, heart)
// into the authentic healthy regional dishes of that location
// =========================================================================
export function getAdaptedRoutineForLocation(baseRoutine, country = "India", state = "Karnataka", mode = "regional") {
  if (!baseRoutine) return null;

  // If user requested standard / global / western mode
  if (mode === "global" || mode === "western") {
    return {
      ...baseRoutine,
      isRegionalAdapted: false,
      cuisineMode: "global"
    };
  }

  const routineId = baseRoutine.id || baseRoutine.slug || "diabetes-friendly";
  const normState = normalizeStateKey(state);
  const stateLabel = state || "Karnataka";
  const countryLabel = country || "India";

  // Match routine type to healthy regional timelines
  let goalKey = "diabetes-friendly";
  if (routineId.includes("weight") || routineId.includes("fat-loss") || routineId.includes("slim")) {
    goalKey = "weight-management";
  } else if (routineId.includes("gym") || routineId.includes("muscle") || routineId.includes("protein") || routineId.includes("bulk")) {
    goalKey = "muscle-gain";
  } else if (routineId.includes("student") || routineId.includes("budget") || routineId.includes("quick")) {
    goalKey = "student-budget-plan";
  } else if (routineId.includes("heart") || routineId.includes("cardio")) {
    goalKey = "heart-friendly";
  } else if (routineId.includes("diabetes") || routineId.includes("glycemic") || routineId.includes("sugar")) {
    goalKey = "diabetes-friendly";
  }

  const goalTimelineMap = HEALTH_GOAL_REGIONAL_TIMELINES[goalKey] || HEALTH_GOAL_REGIONAL_TIMELINES["diabetes-friendly"];
  const adaptedTimeline = goalTimelineMap[normState] || goalTimelineMap["karnataka"] || goalTimelineMap["maharashtra"];

  if (adaptedTimeline && Array.isArray(adaptedTimeline) && adaptedTimeline.length > 0) {
    // Recompute total calories and macros for consistency
    const totalCals = adaptedTimeline.reduce((sum, m) => sum + (m.calories || 0), 0);
    const totalProtein = adaptedTimeline.reduce((sum, m) => sum + (m.protein || 0), 0);
    const totalCarbs = adaptedTimeline.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const totalFat = adaptedTimeline.reduce((sum, m) => sum + (m.fat || 0), 0);

    return {
      ...baseRoutine,
      title: `${baseRoutine.title} (${stateLabel} Dishes)`,
      subtitle: `Locally tailored with healthy, authentic ${stateLabel} dishes for ${baseRoutine.badge || "your wellness goal"}.`,
      category: `Regional Adaptation • ${stateLabel} (${baseRoutine.category || "Health"})`,
      calories: totalCals || baseRoutine.calories,
      protein: totalProtein || baseRoutine.protein,
      carbs: totalCarbs || baseRoutine.carbs,
      fat: totalFat || baseRoutine.fat,
      mealsCount: adaptedTimeline.length,
      isRegionalAdapted: true,
      regionName: `${stateLabel}, ${countryLabel}`,
      cuisineMode: "regional",
      regionalTag: `${stateLabel} Local Dishes`,
      dailyTimeline: adaptedTimeline
    };
  }

  return baseRoutine;
}
