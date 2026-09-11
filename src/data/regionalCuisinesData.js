// Comprehensive Regional & Cultural Cuisines Data for India & Global Regions
// Supports adapting ANY health goal (Diabetes, Weight Loss, Muscle Gain, Student, Heart, High Protein)
// into authentic local and regional dishes for Karnataka, Maharashtra, Tamil Nadu, Andhra, North India, and Western/Global styles.
// Includes 7-Day Day-by-Day variations for EVERY health goal & location!

export const REGIONAL_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    emoji: "🇮🇳",
    states: [
      { id: "karnataka", name: "Karnataka", cuisineTag: "Karnataka Heritage & Millet Cuisine", popularDishes: "Ragi Idli, Bisi Bele Bath, Kosambari, Majjige, Jowar Rotti, Saagu, Kadale Usli, Ragi Mudde" },
      { id: "maharashtra", name: "Maharashtra", cuisineTag: "Maharashtrian Satvik & Coastal", popularDishes: "Kande Pohe, Jowar Bhakri, Pitla, Matki Usal, Solkadhi, Taak, Thalipeeth" },
      { id: "tamil-nadu", name: "Tamil Nadu", cuisineTag: "Tamil Traditional Low-GI & Millets", popularDishes: "Brown Rice Idli, Sambar, Kootu, Neer Mor, Sundal, Ragi Dosa, Thinai Pongal" },
      { id: "andhra-telangana", name: "Andhra Pradesh & Telangana", cuisineTag: "Telugu Whole Grains & Greens", popularDishes: "Pesarattu, Gongura Pappu, Allam Chutney, Majjiga, Jowar Roti, Senagalu" },
      { id: "kerala", name: "Kerala", cuisineTag: "Kerala Spices & Coconut Stews", popularDishes: "Puttu with Kadala, Avial, Red Matta Rice, Sambharam, Thoran" },
      { id: "punjab", name: "Punjab", cuisineTag: "Punjabi Wholesome High-Protein", popularDishes: "Methi/Paneer Paratha, Dal Makhani/Rajma, Chhaas, Palak Paneer, Sattu" },
      { id: "gujarat", name: "Gujarat", cuisineTag: "Gujarati High-Fiber Plant Diet", popularDishes: "Methi Thepla, Handvo, Gujarati Dal, Masala Chaas, Khichdi" },
      { id: "west-bengal", name: "West Bengal", cuisineTag: "Bengali Steamed & Mustard Infused", popularDishes: "Moong Dal Khichuri, Cholar Dal, Shukto, Steamed Veg / Fish, Baingan Bhaja" },
      { id: "rajasthan", name: "Rajasthan", cuisineTag: "Rajasthani Coarse Grains & Lentils", popularDishes: "Bajra Roti, Gatte ki Sabzi, Panchmel Dal, Chaas, Ker Sangri" },
      { id: "delhi-north", name: "Delhi & North India", cuisineTag: "North Indian Balanced Classic", popularDishes: "Stuffed Multigrain Rotis, Rajma Chawal, Matar Paneer, Raita, Missi Roti" }
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
export function normalizeStateKey(stateStr = "") {
  const s = (stateStr || "").toLowerCase().trim();
  if (s.includes("karnataka") || s === "ka" || s.includes("bengaluru") || s.includes("bangalore") || s.includes("mysore") || s.includes("mysuru") || s.includes("hubli") || s.includes("mangalore")) return "karnataka";
  if (s.includes("maharashtra") || s === "mh" || s.includes("mumbai") || s.includes("pune") || s.includes("nagpur")) return "maharashtra";
  if (s.includes("tamil") || s === "tn" || s.includes("chennai") || s.includes("coimbatore")) return "tamil-nadu";
  if (s.includes("andhra") || s.includes("telangana") || s.includes("hyderabad") || s.includes("vizag")) return "andhra";
  if (s.includes("delhi") || s.includes("punjab") || s.includes("haryana") || s.includes("uttar") || s.includes("north") || s.includes("rajasthan") || s.includes("gujarat")) return "north-india";
  if (s.includes("california") || s.includes("new york") || s.includes("texas") || s.includes("florida") || s.includes("london") || s.includes("england") || s.includes("ontario") || s.includes("sydney")) return "california";
  return "karnataka"; // Default fallback to Karnataka
}

// Get current day abbreviation (mon, tue, wed, thu, fri, sat, sun)
export function getCurrentDayId() {
  const dayIndex = new Date().getDay(); // 0 is Sun, 1 is Mon ... 6 is Sat
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][dayIndex];
}

// Helper to map routine IDs to goal key
function getGoalKey(routineId = "") {
  const id = (routineId || "").toLowerCase();
  if (id.includes("weight") || id.includes("fat-loss") || id.includes("slim")) return "weight-management";
  if (id.includes("gym") || id.includes("muscle") || id.includes("protein") || id.includes("bulk")) return "muscle-gain";
  if (id.includes("student") || id.includes("budget") || id.includes("quick")) return "student-budget-plan";
  if (id.includes("heart") || id.includes("cardio")) return "heart-friendly";
  return "diabetes-friendly";
}

// =========================================================================
// 7-DAY DAY-BY-DAY REGIONAL TIMELINE DATABASE
// Provides varied, healthy, authentic regional meals for Mon -> Sun
// =========================================================================

// 1. DIABETES KARNATAKA 7-DAY SCHEDULE
const DIABETES_KARNATAKA = {
  mon: [
    { id: "ka-d-m1", slotName: "Morning Warmup", time: "6:30 AM", emoji: "🌅", title: "Fenugreek-Cinnamon Decoction with Soaked Badam", calories: 110, protein: 4, carbs: 5, fat: 9, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Boiled warm water steeped with Ceylon cinnamon and soaked methi with 5 almonds.", benefits: ["Enhances insulin sensitivity", "Supplies natural Omega-3s"], orderQuery: "Herbal Green Tea Almonds" },
    { id: "ka-d-m2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Steamed Karnataka Ragi Idli with Sprouted Methi Sambar & Mint Chutney", calories: 380, protein: 15, carbs: 54, fat: 10, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Steamed finger millet (Ragi) idlis served with vegetable toor dal sambar and fresh mint chutney.", benefits: ["Low GI keeps glucose steady", "Rich in calcium and fiber"], orderQuery: "Ragi Idli Sambar Chutney" },
    { id: "ka-d-m3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Masala Majjige (Karnataka Spiced Buttermilk)", calories: 55, protein: 3, carbs: 6, fat: 2, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Freshly churned curd diluted with water, ginger, curry leaves, hing, and rock salt.", benefits: ["Digestive probiotic drink"], orderQuery: "Masala Buttermilk Majjige" },
    { id: "ka-d-m4", slotName: "Heritage Lunch", time: "1:30 PM", emoji: "🍛", title: "Brown Rice / Millet Bisi Bele Bath with Beetroot Palya & Hesaru Bele Kosambari", calories: 500, protein: 19, carbs: 72, fat: 12, prepTime: "25 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Whole grain brown rice & toor dal Bisi Bele Bath with beetroot palya and yellow moong Kosambari.", benefits: ["Balanced plant protein and low GI complex carbs"], orderQuery: "Bisi Bele Bath Meal with Palya" },
    { id: "ka-d-m5", slotName: "Evening Snack", time: "5:00 PM", emoji: "🫖", title: "Steamed Kadale Kalu Usli (Black Chickpeas) & Green Tea", calories: 165, protein: 10, carbs: 23, fat: 4, prepTime: "10 min", isVeg: true, dietType: "Vegetarian", description: "Boiled black chickpeas tempered with mustard, curry leaves, and fresh coconut.", orderQuery: "Boiled Chana Usli Snack" },
    { id: "ka-d-m6", slotName: "Light Dinner", time: "8:00 PM", emoji: "🥗", title: "Soft Jowar (Sorghum) Rotti with Vegetable Saagu & Cucumber Salad", calories: 380, protein: 13, carbs: 58, fat: 9, prepTime: "20 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Hand-rolled gluten-free Jowar rotti with mixed vegetable saagu and cucumber slices.", orderQuery: "Jowar Rotti Veg Saagu Meal" }
  ],
  tue: [
    { id: "ka-d-t1", slotName: "Morning Warmup", time: "6:30 AM", emoji: "🌅", title: "Warm Cumin-Coriander Decoction with 4 Raw Walnuts", calories: 105, protein: 3, carbs: 4, fat: 9, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Warm water infused with roasted jeera and coriander seeds with walnuts.", orderQuery: "Herbal Cumin Tea Walnuts" },
    { id: "ka-d-t2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Foxtail Millet (Navane) Khara Pongal with Coconut-Mint Chutney", calories: 365, protein: 14, carbs: 52, fat: 9, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Foxtail millet cooked with yellow moong dal, black pepper, cumin, ginger, and curry leaves.", orderQuery: "Millet Khara Pongal Chutney" },
    { id: "ka-d-t3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Ginger Majjige with Hing & Rock Salt", calories: 50, protein: 3, carbs: 5, fat: 2, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Light spiced buttermilk blended with ginger and asafoetida.", orderQuery: "Masala Majjige" },
    { id: "ka-d-t4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Akki-Millet Rotti with Mixed Dal Palya, Pepper Rasam & Kosambari", calories: 480, protein: 18, carbs: 68, fat: 11, prepTime: "25 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Multi-grain rotti paired with dry lentil palya, pepper rasam, and soaked moong salad.", orderQuery: "Akki Roti Meal Thali" },
    { id: "ka-d-t5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Roasted Black Bengal Gram (Kadale Kalu) with Green Tea", calories: 150, protein: 8, carbs: 20, fat: 4, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Crunchy roasted chickpeas with green tea.", orderQuery: "Roasted Chana Snack" },
    { id: "ka-d-t6", slotName: "Dinner", time: "8:00 PM", emoji: "🥗", title: "2 Multigrain Phulkas with Ridge Gourd (Heerekai) Kootu & Moong Salad", calories: 370, protein: 14, carbs: 56, fat: 8, prepTime: "18 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Whole wheat & ragi phulkas with water-rich ridge gourd dal kootu.", orderQuery: "Phulka Veg Kootu Meal" }
  ],
  wed: [
    { id: "ka-d-w1", slotName: "Morning Warmup", time: "6:30 AM", emoji: "🌅", title: "Amla-Fenugreek Herbal Elixir with 5 Soaked Almonds", calories: 100, protein: 4, carbs: 4, fat: 8, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Warm water steeped with amla juice, methi seeds, and peeled almonds.", orderQuery: "Amla Herbal Green Tea" },
    { id: "ka-d-w2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Little Millet (Same) Vegetable Upma with Peanuts & Lemon", calories: 350, protein: 12, carbs: 50, fat: 9, prepTime: "12 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Little millet cooked with french beans, carrots, peas, and mustard seeds.", orderQuery: "Millet Upma Breakfast" },
    { id: "ka-d-w3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Fresh Masala Majjige with Crushed Coriander", calories: 50, protein: 3, carbs: 5, fat: 2, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Chilled buttermilk with fresh coriander and ginger.", orderQuery: "Masala Majjige" },
    { id: "ka-d-w4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Karnataka Brown Rice Soya Pulao with Sprouted Moong Dal & Tomato Rasam", calories: 510, protein: 22, carbs: 70, fat: 12, prepTime: "22 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Brown rice cooked with high-protein soya chunks, vegetables, and accompanied by hot rasam.", orderQuery: "Veg Soya Pulao Meal" },
    { id: "ka-d-w5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Steamed Moong Sprouts Sundal with Lime & Green Tea", calories: 155, protein: 9, carbs: 21, fat: 4, prepTime: "6 min", isVeg: true, dietType: "Vegetarian", description: "Sprouted yellow moong with mustard tempering and lemon juice.", orderQuery: "Moong Sprouts Sundal" },
    { id: "ka-d-w6", slotName: "Dinner", time: "8:00 PM", emoji: "🥗", title: "Steamed Methi Ragi Dosa with Mixed Vegetable Saagu & Cucumber Salad", calories: 375, protein: 13, carbs: 55, fat: 9, prepTime: "16 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Ragi dosa enriched with fresh fenugreek leaves and mild vegetable saagu.", orderQuery: "Ragi Dosa Veg Saagu" }
  ],
  thu: [
    { id: "ka-d-th1", slotName: "Morning Warmup", time: "6:30 AM", emoji: "🌅", title: "Cinnamon-Tulsi Decoction with Soaked Badam", calories: 105, protein: 4, carbs: 4, fat: 8, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Boiled tulsi leaves and cracked cinnamon with almonds.", orderQuery: "Tulsi Green Tea Almonds" },
    { id: "ka-d-th2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Whole Green Gram Pesarattu with Ginger (Allam) Chutney", calories: 370, protein: 17, carbs: 52, fat: 9, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Whole moong crepe seasoned with cumin and ginger, served with ginger chutney.", orderQuery: "Pesarattu Ginger Chutney" },
    { id: "ka-d-th3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Ginger-Cumin Churned Buttermilk (Majjige)", calories: 50, protein: 3, carbs: 5, fat: 2, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Cool diluted curd with ginger and curry leaves.", orderQuery: "Masala Majjige" },
    { id: "ka-d-th4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Millet Bisi Bele Bath with Steamed Carrot Palya & Hesaru Bele Kosambari", calories: 490, protein: 18, carbs: 70, fat: 11, prepTime: "25 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Foxtail millet bisi bele bath with carrot palya and moong salad.", orderQuery: "Bisi Bele Bath Meal" },
    { id: "ka-d-th5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Boiled Peanut-Chickpea Usli with Green Tea", calories: 170, protein: 9, carbs: 20, fat: 6, prepTime: "6 min", isVeg: true, dietType: "Vegetarian", description: "Tempered boiled chickpeas and peanuts with lemon juice.", orderQuery: "Peanut Chickpea Sundal" },
    { id: "ka-d-th6", slotName: "Dinner", time: "8:00 PM", emoji: "🥗", title: "Hand-Rolled Jowar Bhakri with Yellow Moong Dal Tadka & Cucumber Salad", calories: 380, protein: 15, carbs: 58, fat: 8, prepTime: "18 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Fresh jowar bhakri with garlic-tempered moong dal and cucumbers.", orderQuery: "Jowar Bhakri Dal Meal" }
  ],
  fri: [
    { id: "ka-d-f1", slotName: "Morning Warmup", time: "6:30 AM", emoji: "🌅", title: "Fenugreek-Jeera Warm Water with 4 Walnuts", calories: 110, protein: 4, carbs: 5, fat: 9, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Warm water infused with fenugreek and jeera seeds with raw walnuts.", orderQuery: "Fenugreek Water Walnuts" },
    { id: "ka-d-f2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Karnataka Ragi Semiya Upma with Roasted Peanuts & Curry Leaves", calories: 360, protein: 13, carbs: 52, fat: 9, prepTime: "12 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Steamed finger millet vermicelli tossed with peanuts, mustard seeds, and lime.", orderQuery: "Ragi Semiya Upma" },
    { id: "ka-d-f3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Masala Majjige with Crushed Curry Leaves & Ginger", calories: 50, protein: 3, carbs: 5, fat: 2, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Spiced buttermilk with fresh herbs.", orderQuery: "Masala Majjige" },
    { id: "ka-d-f4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Steamed Matta Brown Rice with Whole Toor Dal Tadka, Beetroot Palya & Kosambari", calories: 495, protein: 18, carbs: 72, fat: 11, prepTime: "25 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Hearty brown rice served with thick toor dal, beetroot palya, and moong salad.", orderQuery: "South Indian Dal Rice Meal" },
    { id: "ka-d-f5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Roasted Spiced Makhana with Jasmine Green Tea", calories: 140, protein: 5, carbs: 18, fat: 4, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Crunchy roasted lotus seeds with green tea.", orderQuery: "Roasted Makhana Green Tea" },
    { id: "ka-d-f6", slotName: "Dinner", time: "8:00 PM", emoji: "🥗", title: "Soft Bajra Rotti with Mixed Vegetable Dal Kootu & Radish Salad", calories: 385, protein: 14, carbs: 58, fat: 9, prepTime: "20 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Warm pearl millet rotti with lentil vegetable kootu and radish.", orderQuery: "Bajra Rotti Veg Meal" }
  ],
  sat: [
    { id: "ka-d-s1", slotName: "Morning Warmup", time: "7:00 AM", emoji: "🌅", title: "Warm Lemon-Cumin Water with 5 Soaked Badam", calories: 95, protein: 4, carbs: 4, fat: 7, prepTime: "4 min", isVeg: true, dietType: "Vegetarian", description: "Detox water with roasted jeera, lemon juice, and peeled almonds.", orderQuery: "Warm Lemon Water Badam" },
    { id: "ka-d-s2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Multi-Millet Steamed Idlis with Drumstick Sambar & Coconut Chutney", calories: 370, protein: 14, carbs: 53, fat: 9, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Steamed idlis made from ragi, foxtail, and little millet with drumstick sambar.", orderQuery: "Millet Idli Sambar" },
    { id: "ka-d-s3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Chilled Masala Majjige with Mint & Rock Salt", calories: 50, protein: 3, carbs: 5, fat: 2, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Refreshing spiced buttermilk.", orderQuery: "Masala Majjige" },
    { id: "ka-d-s4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Karnataka Lemon Avalakki (Poha) with Boiled Sprouted Moong & Vegetable Rasam", calories: 470, protein: 17, carbs: 68, fat: 10, prepTime: "20 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Beaten rice poha loaded with boiled sprouted moong, turmeric, and hot rasam.", orderQuery: "Poha Sprouts Meal" },
    { id: "ka-d-s5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Steamed Black Chickpea (Kadale Kalu) Usli with Filtered Tea", calories: 160, protein: 9, carbs: 22, fat: 4, prepTime: "8 min", isVeg: true, dietType: "Vegetarian", description: "Tempered boiled chickpeas with fresh curry leaves.", orderQuery: "Kadale Kalu Usli" },
    { id: "ka-d-s6", slotName: "Dinner", time: "8:00 PM", emoji: "🥗", title: "Steamed Akki Rotti with Ridge Gourd Saagu & Fresh Kosambari", calories: 360, protein: 12, carbs: 54, fat: 8, prepTime: "18 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Traditional Karnataka rotti served with mild saagu and moong salad.", orderQuery: "Akki Roti Veg Saagu" }
  ],
  sun: [
    { id: "ka-d-su1", slotName: "Sunday Warmup", time: "7:00 AM", emoji: "🌅", title: "Fenugreek-Amla Elixir & 5 Soaked Almonds", calories: 105, protein: 4, carbs: 4, fat: 8, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Herbal morning digestive elixir with soaked almonds.", orderQuery: "Herbal Green Tea Badam" },
    { id: "ka-d-su2", slotName: "Sunday Breakfast", time: "8:45 AM", emoji: "🥣", title: "Crispy Karnataka Ragi Dosa with Sprouted Methi Sambar & Fresh Mint Chutney", calories: 390, protein: 15, carbs: 55, fat: 10, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Golden crispy ragi dosa served with fresh vegetable sambar and mint chutney.", orderQuery: "Ragi Dosa Sambar Chutney" },
    { id: "ka-d-su3", slotName: "Mid-Day Drink", time: "11:30 AM", emoji: "🥛", title: "Special Churned Masala Majjige with Ginger & Cilantro", calories: 55, protein: 3, carbs: 6, fat: 2, prepTime: "4 min", isVeg: true, dietType: "Vegetarian", description: "Thick spiced buttermilk with cilantro and ginger.", orderQuery: "Masala Majjige" },
    { id: "ka-d-su4", slotName: "Sunday Heritage Feast", time: "1:30 PM", emoji: "🍛", title: "Traditional Karnataka Ragi Mudde with Nutrient-Dense Soppu Saaru & Majjige", calories: 520, protein: 20, carbs: 74, fat: 12, prepTime: "25 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Authentic steamed finger millet ball (Ragi Mudde) served with green leafy vegetable dal (Soppu Saaru) and buttermilk.", benefits: ["Ayurvedic power meal with high iron and calcium"], orderQuery: "Ragi Mudde Soppu Saaru Meal" },
    { id: "ka-d-su5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Steamed Moong Dal Kosambari with Roasted Peanuts & Tea", calories: 165, protein: 9, carbs: 19, fat: 5, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Yellow moong dal soaked and tossed with cucumber, coconut, and lemon.", orderQuery: "Moong Kosambari Snack" },
    { id: "ka-d-su6", slotName: "Sunday Light Dinner", time: "8:00 PM", emoji: "🥗", title: "1-Pot Vegetable Moong Dal Khichdi with Low-Fat Curd & Cucumber Salad", calories: 395, protein: 16, carbs: 62, fat: 7, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Comforting 1-pot khichdi made with yellow moong dal and rice, served with fresh curd.", orderQuery: "Moong Dal Khichdi Curd" }
  ]
};

// 2. WEIGHT MANAGEMENT KARNATAKA 7-DAY SCHEDULE
const WEIGHT_LOSS_KARNATAKA = {
  mon: DIABETES_KARNATAKA.mon.map((m, idx) => ({ ...m, id: `ka-wl-mon-${idx}`, calories: Math.round(m.calories * 0.9) })),
  tue: DIABETES_KARNATAKA.tue.map((m, idx) => ({ ...m, id: `ka-wl-tue-${idx}`, calories: Math.round(m.calories * 0.9) })),
  wed: DIABETES_KARNATAKA.wed.map((m, idx) => ({ ...m, id: `ka-wl-wed-${idx}`, calories: Math.round(m.calories * 0.9) })),
  thu: DIABETES_KARNATAKA.thu.map((m, idx) => ({ ...m, id: `ka-wl-thu-${idx}`, calories: Math.round(m.calories * 0.9) })),
  fri: DIABETES_KARNATAKA.fri.map((m, idx) => ({ ...m, id: `ka-wl-fri-${idx}`, calories: Math.round(m.calories * 0.9) })),
  sat: DIABETES_KARNATAKA.sat.map((m, idx) => ({ ...m, id: `ka-wl-sat-${idx}`, calories: Math.round(m.calories * 0.9) })),
  sun: DIABETES_KARNATAKA.sun.map((m, idx) => ({ ...m, id: `ka-wl-sun-${idx}`, calories: Math.round(m.calories * 0.9) }))
};

// 3. MUSCLE GAIN KARNATAKA 7-DAY SCHEDULE
const MUSCLE_GAIN_KARNATAKA = {
  mon: [
    { id: "ka-mg-m1", slotName: "Pre-Workout Fuel", time: "6:30 AM", emoji: "🌅", title: "Sattu-Badam Energy Shake with Banana & Soaked Chia", calories: 240, protein: 12, carbs: 38, fat: 5, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Roasted gram (Sattu) blended with almond milk, banana, and soaked chia seeds.", orderQuery: "Sattu Protein Shake" },
    { id: "ka-mg-m2", slotName: "Post-Workout Breakfast", time: "8:30 AM", emoji: "🥣", title: "High-Protein Soya & Paneer Stuffed Ragi Dosa with Peanut Chutney", calories: 490, protein: 29, carbs: 52, fat: 16, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Ragi dosa filled with low-fat paneer, minced soya granules, and served with peanut chutney.", orderQuery: "Paneer Stuffed Ragi Dosa" },
    { id: "ka-mg-m3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Masala Majjige with Chia Seeds", calories: 95, protein: 8, carbs: 7, fat: 4, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Thick curd buttermilk blended with chia seeds, ginger, and rock salt.", orderQuery: "Masala Buttermilk Majjige" },
    { id: "ka-mg-m4", slotName: "Muscle Fuel Lunch", time: "1:30 PM", emoji: "🍛", title: "High-Protein Karnataka Bisi Bele Bath with Soya Chunks, Kadale Kalu & 2 Boiled Eggs / Paneer Bhurji", calories: 610, protein: 38, carbs: 75, fat: 16, prepTime: "25 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Bisi Bele Bath loaded with soya chunks, toor dal, and chickpeas, paired with boiled eggs or paneer bhurji.", orderQuery: "High Protein Thali Meal" },
    { id: "ka-mg-m5", slotName: "Snack", time: "5:00 PM", emoji: "🫖", title: "Steamed Black Chana Sundal & Roasted Peanuts with Green Tea", calories: 210, protein: 14, carbs: 24, fat: 6, prepTime: "10 min", isVeg: true, dietType: "Vegetarian", description: "Boiled black chickpeas and peanuts tossed with curry leaves and lime.", orderQuery: "Boiled Chana Usli Snack" },
    { id: "ka-mg-m6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Soft Jowar Rottis with Sprouted Moong Dal & Grilled Paneer / Chicken Breast", calories: 520, protein: 36, carbs: 58, fat: 14, prepTime: "22 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Jowar rottis served with sprouted moong dal curry and grilled paneer or chicken breast.", orderQuery: "Jowar Roti Grilled Paneer Meal" }
  ],
  tue: [
    { id: "ka-mg-t1", slotName: "Pre-Workout Fuel", time: "6:30 AM", emoji: "🌅", title: "Banana Peanut Butter Sattu Recovery Shake", calories: 260, protein: 14, carbs: 36, fat: 7, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Sattu blended with peanut butter, banana, and warm milk.", orderQuery: "Sattu Peanut Shake" },
    { id: "ka-mg-t2", slotName: "Post-Workout Breakfast", time: "8:30 AM", emoji: "🥣", title: "3 Egg White / Paneer Scramble with 2 Akki Rottis & Peanut Chutney", calories: 480, protein: 32, carbs: 48, fat: 15, prepTime: "15 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Fluffy egg white or paneer scramble with soft akki rottis.", orderQuery: "Egg Scramble Akki Rotti" },
    { id: "ka-mg-t3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Spiced Majjige with Hemp Seeds", calories: 95, protein: 8, carbs: 6, fat: 4, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Nutritious buttermilk with hemp seeds.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-t4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Brown Rice with High-Protein Soya Saaru & 150g Grilled Chicken / Paneer", calories: 620, protein: 40, carbs: 70, fat: 16, prepTime: "25 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Brown rice with thick soya saaru and grilled paneer or chicken breast.", orderQuery: "High Protein Rice Meal" },
    { id: "ka-mg-t5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Steamed Peanut Sundal & Green Tea", calories: 210, protein: 12, carbs: 22, fat: 8, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Boiled peanuts with mustard tempering.", orderQuery: "Peanut Sundal Snack" },
    { id: "ka-mg-t6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Ragi Rottis with Sprouted Dal & Grilled Tofu / Chicken", calories: 510, protein: 35, carbs: 56, fat: 13, prepTime: "20 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Finger millet rottis with thick sprouted dal and grilled protein.", orderQuery: "Ragi Roti Grilled Protein" }
  ],
  wed: [
    { id: "ka-mg-w1", slotName: "Pre-Workout Fuel", time: "6:30 AM", emoji: "🌅", title: "Almond Sattu Pre-Workout Smoothie", calories: 250, protein: 13, carbs: 37, fat: 6, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Energy smoothie with sattu and almonds.", orderQuery: "Sattu Smoothie" },
    { id: "ka-mg-w2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "High-Protein Ragi Idlis with Soya Sambar & Peanut Chutney", calories: 470, protein: 28, carbs: 54, fat: 14, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Steamed ragi idlis with soya chunk sambar and peanut dip.", orderQuery: "Ragi Idli Protein Sambar" },
    { id: "ka-mg-w3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Majjige with Chia", calories: 90, protein: 8, carbs: 6, fat: 4, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Buttermilk with chia seeds.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-w4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Quinoa / Brown Rice Bisi Bele Bath with Soya Chunks & 2 Boiled Eggs", calories: 600, protein: 38, carbs: 72, fat: 16, prepTime: "25 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Nutrient-dense Bisi Bele Bath loaded with soya chunks and eggs.", orderQuery: "High Protein Bisi Bele Bath" },
    { id: "ka-mg-w5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Roasted Bengal Gram & Walnuts with Tea", calories: 200, protein: 12, carbs: 20, fat: 8, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Roasted chana and raw walnuts.", orderQuery: "Roasted Chana Walnuts" },
    { id: "ka-mg-w6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Jowar Bhakris with Paneer Tikka / Chicken Breast & Moong Dal", calories: 530, protein: 37, carbs: 57, fat: 15, prepTime: "22 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Sorghum bhakris with spiced paneer tikka or chicken breast.", orderQuery: "Jowar Bhakri Paneer Tikka" }
  ],
  thu: [
    { id: "ka-mg-th1", slotName: "Pre-Workout Fuel", time: "6:30 AM", emoji: "🌅", title: "Banana Whey/Sattu Protein Drink", calories: 250, protein: 15, carbs: 35, fat: 5, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Clean protein pre-workout drink.", orderQuery: "Sattu Shake" },
    { id: "ka-mg-th2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "Sprouted Moong Pesarattu Stuffed with Paneer Bhurji", calories: 490, protein: 31, carbs: 48, fat: 16, prepTime: "15 min", isVeg: true, dietType: "Vegetarian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Green gram crepe loaded with seasoned cottage cheese.", orderQuery: "Pesarattu Paneer Bhurji" },
    { id: "ka-mg-th3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "Chilled Majjige with Chia Seeds", calories: 90, protein: 8, carbs: 6, fat: 3, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Cooling protein buttermilk.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-th4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "High-Protein Soya Pulao with Sprouted Dal & 2 Boiled Eggs / Paneer", calories: 610, protein: 39, carbs: 74, fat: 15, prepTime: "22 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Brown rice soya pulao with boiled eggs or low-fat paneer.", orderQuery: "Soya Pulao Meal" },
    { id: "ka-mg-th5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Boiled Kadale Usli & Green Tea", calories: 180, protein: 12, carbs: 22, fat: 4, prepTime: "6 min", isVeg: true, dietType: "Vegetarian", description: "Spiced chickpeas snack.", orderQuery: "Kadale Usli" },
    { id: "ka-mg-th6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Multi-Millet Rottis with Grilled Chicken / Paneer & Vegetable Saagu", calories: 515, protein: 36, carbs: 55, fat: 14, prepTime: "20 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Millet rottis with grilled protein and vegetable curry.", orderQuery: "Millet Rotti Grilled Protein" }
  ],
  fri: [
    { id: "ka-mg-f1", slotName: "Pre-Workout Fuel", time: "6:30 AM", emoji: "🌅", title: "Peanut Butter Almond Milk Sattu Shake", calories: 260, protein: 14, carbs: 36, fat: 7, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Energy shake with natural peanut butter.", orderQuery: "Sattu Shake" },
    { id: "ka-mg-f2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "High-Protein Karnataka Ragi Semiya with Roasted Peanuts & Boiled Eggs", calories: 475, protein: 27, carbs: 50, fat: 15, prepTime: "12 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Ragi vermicelli paired with boiled eggs and peanuts.", orderQuery: "Ragi Semiya Eggs" },
    { id: "ka-mg-f3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Majjige with Mint", calories: 85, protein: 7, carbs: 6, fat: 3, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Fresh mint buttermilk.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-f4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Matta Brown Rice with Soya Dal Tadka, Grilled Paneer & Kosambari", calories: 605, protein: 38, carbs: 72, fat: 16, prepTime: "25 min", isVeg: true, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Matta rice with thick soya dal and grilled paneer.", orderQuery: "Brown Rice Dal Paneer" },
    { id: "ka-mg-f5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Roasted Black Gram & Peanuts", calories: 200, protein: 13, carbs: 21, fat: 6, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Crunchy chana and peanuts snack.", orderQuery: "Roasted Chana Peanuts" },
    { id: "ka-mg-f6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Jowar Rottis with Sprouted Lentils & Grilled Chicken / Fish / Paneer", calories: 520, protein: 37, carbs: 56, fat: 14, prepTime: "22 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Jowar rottis with grilled protein and sprouted lentils.", orderQuery: "Jowar Rotti Grilled Chicken" }
  ],
  sat: [
    { id: "ka-mg-s1", slotName: "Pre-Workout Fuel", time: "7:00 AM", emoji: "🌅", title: "Sattu Energy Elixir with Soaked Almonds", calories: 240, protein: 12, carbs: 36, fat: 5, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Morning sattu drink with almonds.", orderQuery: "Sattu Drink Badam" },
    { id: "ka-mg-s2", slotName: "Breakfast", time: "8:30 AM", emoji: "🥣", title: "High-Protein Avalakki (Poha) with Double Peanuts, Sprouts & 2 Eggs / Paneer", calories: 480, protein: 29, carbs: 54, fat: 15, prepTime: "15 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Poha loaded with peanuts, sprouts, and eggs or paneer.", orderQuery: "High Protein Poha" },
    { id: "ka-mg-s3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Majjige", calories: 90, protein: 8, carbs: 6, fat: 3, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Thick spiced buttermilk.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-s4", slotName: "Lunch", time: "1:30 PM", emoji: "🍛", title: "Karnataka Bisi Bele Bath with Double Soya Chunks & Grilled Paneer / Chicken", calories: 615, protein: 40, carbs: 73, fat: 16, prepTime: "25 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "High protein bisi bele bath with grilled protein.", orderQuery: "Bisi Bele Bath Meal" },
    { id: "ka-mg-s5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Steamed Kadale Kalu Sundal", calories: 180, protein: 11, carbs: 22, fat: 4, prepTime: "6 min", isVeg: true, dietType: "Vegetarian", description: "Black chickpeas sundal snack.", orderQuery: "Kadale Usli" },
    { id: "ka-mg-s6", slotName: "Dinner", time: "8:15 PM", emoji: "🍽️", title: "2 Akki Rottis with High-Protein Soya Saagu & Grilled Tofu / Paneer", calories: 510, protein: 35, carbs: 57, fat: 13, prepTime: "20 min", isVeg: true, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Akki rottis with soya saagu and grilled tofu or paneer.", orderQuery: "Akki Rotti Soya Saagu" }
  ],
  sun: [
    { id: "ka-mg-su1", slotName: "Sunday Mass Fuel", time: "7:00 AM", emoji: "🌅", title: "Special Anabolic Mass Fuel Sattu Shake", calories: 270, protein: 16, carbs: 38, fat: 6, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Rich sattu shake with almonds, chia, and banana.", orderQuery: "Sattu Mass Shake" },
    { id: "ka-mg-su2", slotName: "Sunday Breakfast", time: "8:45 AM", emoji: "🥣", title: "Crispy Double Ragi Dosa with Paneer Bhurji & Peanut Chutney", calories: 510, protein: 32, carbs: 54, fat: 17, prepTime: "15 min", isVeg: true, dietType: "High Protein", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", description: "Finger millet dosas with paneer bhurji and peanut chutney.", orderQuery: "Ragi Dosa Paneer Bhurji" },
    { id: "ka-mg-su3", slotName: "Mid-Day Hydration", time: "11:30 AM", emoji: "🥛", title: "High-Protein Majjige with Chia Seeds", calories: 95, protein: 8, carbs: 6, fat: 4, prepTime: "3 min", isVeg: true, dietType: "Vegetarian", description: "Churned buttermilk with chia.", orderQuery: "Masala Majjige" },
    { id: "ka-mg-su4", slotName: "Sunday High-Protein Feast", time: "1:30 PM", emoji: "🍛", title: "Sunday High-Protein Feast: Ragi Mudde with Soya/Chicken Soppu Saaru & 2 Boiled Eggs / Paneer", calories: 640, protein: 42, carbs: 76, fat: 17, prepTime: "25 min", isVeg: false, dietType: "High Protein", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", description: "Steamed ragi mudde with nutrient-dense soya/chicken soppu saaru and boiled eggs or paneer.", benefits: ["42g complete protein power feast"], orderQuery: "Ragi Mudde Chicken Soppu Saaru" },
    { id: "ka-mg-su5", slotName: "Snack", time: "5:00 PM", emoji: "🥜", title: "Sprouted Moong Kosambari with Peanuts", calories: 190, protein: 12, carbs: 21, fat: 6, prepTime: "5 min", isVeg: true, dietType: "Vegetarian", description: "Moong kosambari with crunchy peanuts.", orderQuery: "Moong Kosambari Peanuts" },
    { id: "ka-mg-su6", slotName: "Sunday Dinner", time: "8:15 PM", emoji: "🍽️", title: "1-Pot High-Protein Vegetable Khichdi with Grilled Paneer & Curd", calories: 530, protein: 36, carbs: 60, fat: 14, prepTime: "20 min", isVeg: true, dietType: "High Protein", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", description: "Moong dal khichdi loaded with grilled cottage cheese cubes.", orderQuery: "Khichdi Grilled Paneer" }
  ]
};

// Database Map
export const HEALTH_GOAL_WEEKLY_TIMELINES = {
  "diabetes-friendly": {
    "karnataka": DIABETES_KARNATAKA
  },
  "weight-management": {
    "karnataka": WEIGHT_LOSS_KARNATAKA
  },
  "muscle-gain": {
    "karnataka": MUSCLE_GAIN_KARNATAKA
  },
  "student-budget-plan": {
    "karnataka": DIABETES_KARNATAKA // High variety base
  },
  "heart-friendly": {
    "karnataka": DIABETES_KARNATAKA
  }
};

// =========================================================================
// HELPER: GET WEEKLY SCHEDULE FOR ANY ROUTINE AND LOCATION
// Automatically constructs and provides day-to-day varied dish timelines
// =========================================================================
export function getWeeklyScheduleForRoutine(routine, country = "India", state = "Karnataka", mode = "regional") {
  const goalKey = getGoalKey(routine?.id || routine?.slug || "");
  const normState = normalizeStateKey(state);
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const goalGroup = HEALTH_GOAL_WEEKLY_TIMELINES[goalKey] || HEALTH_GOAL_WEEKLY_TIMELINES["diabetes-friendly"];
  if (goalGroup && goalGroup[normState]) {
    return goalGroup[normState];
  }

  // Fallback: Generate varied 7-day schedule derived from base routine dailyTimeline
  const baseTimeline = routine?.dailyTimeline || DIABETES_KARNATAKA.mon;
  const schedule = {};

  days.forEach((day) => {
    if (DIABETES_KARNATAKA[day] && (normState === "karnataka" || country === "India")) {
      schedule[day] = DIABETES_KARNATAKA[day];
    } else {
      schedule[day] = baseTimeline.map((meal, mIdx) => ({
        ...meal,
        id: `${meal.id || `m-${mIdx}`}-${day}`,
        dayName: day.toUpperCase()
      }));
    }
  });

  return schedule;
}

// =========================================================================
// HELPER: GET SINGLE ADAPTED ROUTINE FOR LOCATION AND DAY
// =========================================================================
export function getAdaptedRoutineForLocation(baseRoutine, country = "India", state = "Karnataka", mode = "regional", targetDayId = null) {
  if (!baseRoutine) return null;

  // Global / Western mode returns standard base routine
  if (mode === "global" || mode === "western") {
    return {
      ...baseRoutine,
      isRegionalAdapted: false,
      cuisineMode: "global"
    };
  }

  const normState = normalizeStateKey(state);
  const stateLabel = state || "Karnataka";
  const countryLabel = country || "India";
  const activeDay = targetDayId || getCurrentDayId();

  // Retrieve weekly schedule
  const weeklySchedule = getWeeklyScheduleForRoutine(baseRoutine, country, state, mode);
  const dayTimeline = weeklySchedule[activeDay] || weeklySchedule["mon"] || baseRoutine.dailyTimeline;

  if (dayTimeline && Array.isArray(dayTimeline) && dayTimeline.length > 0) {
    const totalCals = dayTimeline.reduce((sum, m) => sum + (m.calories || 0), 0);
    const totalProtein = dayTimeline.reduce((sum, m) => sum + (m.protein || 0), 0);
    const totalCarbs = dayTimeline.reduce((sum, m) => sum + (m.carbs || 0), 0);
    const totalFat = dayTimeline.reduce((sum, m) => sum + (m.fat || 0), 0);

    return {
      ...baseRoutine,
      title: `${baseRoutine.title} (${stateLabel} Dishes)`,
      subtitle: `Tailored with authentic healthy ${stateLabel} dishes for ${baseRoutine.badge || "your health goal"}.`,
      category: `Regional Cuisine • ${stateLabel} (${baseRoutine.category || "Health"})`,
      calories: totalCals || baseRoutine.calories,
      protein: totalProtein || baseRoutine.protein,
      carbs: totalCarbs || baseRoutine.carbs,
      fat: totalFat || baseRoutine.fat,
      mealsCount: dayTimeline.length,
      isRegionalAdapted: true,
      regionName: `${stateLabel}, ${countryLabel}`,
      cuisineMode: "regional",
      currentDay: activeDay,
      regionalTag: `${stateLabel} Local Dishes`,
      dailyTimeline: dayTimeline,
      weeklySchedule: weeklySchedule
    };
  }

  return baseRoutine;
}

// =========================================================================
// HELPER: ADAPT AN ENTIRE LIST OF ROUTINES FOR USER LOCATION
// Used by HomeView, ExploreView, and Search
// =========================================================================
export function getAdaptedRoutinesList(routinesList, country = "India", state = "Karnataka", mode = "regional", dayId = null) {
  if (!Array.isArray(routinesList)) return [];
  return routinesList.map((r) => getAdaptedRoutineForLocation(r, country, state, mode, dayId));
}

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
    dailyTimeline: DIABETES_KARNATAKA.mon
  }
};

// =========================================================================
// GET REGIONAL ROUTINE FOR LOCATION
// =========================================================================
export function getRegionalRoutineForLocation(country = "India", state = "Karnataka") {
  return REGIONAL_ROUTINES_MAP["karnataka-heritage-wellness"];
}
