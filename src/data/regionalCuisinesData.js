// Comprehensive Regional & Cultural Cuisines Data for India & Global Regions
// Supports adapting ANY health goal (Diabetes, Weight Loss, Muscle Gain, Student, Heart, High Protein)
// into authentic local and regional dishes for ALL States in India & International Regions!
// Includes rich 7-Day Day-by-Day variations for every location & health routine!

export const REGIONAL_COUNTRIES = [
  {
    code: "IN",
    name: "India",
    emoji: "🇮🇳",
    states: [
      { id: "karnataka", name: "Karnataka", cuisineTag: "Karnataka Heritage & Millet Cuisine", popularDishes: "Ragi Idli, Bisi Bele Bath, Kosambari, Majjige, Jowar Rotti, Akki Rotti, Ragi Mudde, Kadale Usli" },
      { id: "maharashtra", name: "Maharashtra", cuisineTag: "Maharashtrian Satvik & Coastal", popularDishes: "Kande Pohe, Jowar Bhakri, Pitla, Matki Usal, Solkadhi, Taak, Thalipeeth, Varan Bhaat" },
      { id: "tamil-nadu", name: "Tamil Nadu", cuisineTag: "Tamil Traditional Low-GI & Millets", popularDishes: "Kambu Idli, Sambar, Kootu, Neer Mor, Sundal, Ragi Dosa, Thinai Pongal, Adai Avial" },
      { id: "andhra-telangana", name: "Andhra Pradesh & Telangana", cuisineTag: "Telugu Whole Grains & Greens", popularDishes: "Pesarattu, Gongura Pappu, Allam Chutney, Majjiga, Jonna Rotti, Senagalu, Ragi Sangati" },
      { id: "kerala", name: "Kerala", cuisineTag: "Kerala Spices & Coconut Stews", popularDishes: "Puttu with Kadala, Avial, Red Matta Rice, Sambharam, Thoran, Veg Stew, Olan" },
      { id: "punjab", name: "Punjab", cuisineTag: "Punjabi Wholesome High-Protein", popularDishes: "Methi/Paneer Paratha, Dal Makhani/Rajma, Chhaas, Palak Paneer, Sattu Paratha, Sarson Saag" },
      { id: "gujarat", name: "Gujarat", cuisineTag: "Gujarati High-Fiber Plant Diet", popularDishes: "Methi Thepla, Handvo, Gujarati Dal, Masala Chaas, Khichdi, Dhokla, Ringan No Oro" },
      { id: "west-bengal", name: "West Bengal", cuisineTag: "Bengali Steamed & Mustard Infused", popularDishes: "Moong Dal Cheela, Cholar Dal, Shukto, Steamed Veg / Fish, Moong Khichuri, Dhokar Dalna" },
      { id: "rajasthan", name: "Rajasthan", cuisineTag: "Rajasthani Coarse Grains & Lentils", popularDishes: "Bajra Roti, Gatte ki Sabzi, Panchmel Dal, Chaas, Ker Sangri, Moong Cheela, Kadhi" },
      { id: "delhi-north", name: "Delhi & North India", cuisineTag: "North Indian Balanced Classic", popularDishes: "Stuffed Multigrain Rotis, Rajma Chawal, Matar Paneer, Raita, Missi Roti, Lauki Kofta" }
    ]
  },
  {
    code: "US",
    name: "United States",
    emoji: "🇺🇸",
    states: [
      { id: "california", name: "California", cuisineTag: "Californian Clean & Plant-Forward", popularDishes: "Avocado Sourdough Toast, Green Goddess Bowl, Acai Parfait, Grilled Salmon, Quinoa Power Bowl" },
      { id: "new-york", name: "New York", cuisineTag: "East Coast Mediterranean & Deli Fresh", popularDishes: "Egg White Veggie Scramble, Quinoa Power Salad, Lentil Stew, Smoked Salmon Bagel" },
      { id: "texas", name: "Texas", cuisineTag: "Tex-Mex High-Protein & Fajita Bowls", popularDishes: "Black Bean Fajita Bowl, Grilled Chicken/Tofu with Salsa, Egg Taco, Paprika Chili" },
      { id: "florida", name: "Florida", cuisineTag: "Coastal Citrus & Lean Seafood", popularDishes: "Citrus Grilled Fish, Tropical Chia Pudding, Mango Kale Salad, Caribbean Stew" },
      { id: "washington", name: "Washington", cuisineTag: "Pacific Northwest Whole Foods", popularDishes: "Wild Salmon Bowl, Roasted Roots, Berry Oatmeal, Steamed Edamame, Puy Lentil Stew" }
    ]
  },
  {
    code: "GB",
    name: "United Kingdom",
    emoji: "🇬🇧",
    states: [
      { id: "england", name: "England (London & Midlands)", cuisineTag: "Modern British & Mediterranean", popularDishes: "Overnight Oats, Jacket Potato with Baked Beans, Pea Mint Soup, Cottage Pie" },
      { id: "scotland", name: "Scotland", cuisineTag: "Scottish Coarse Oats & Hearth", popularDishes: "Traditional Scottish Porridge, Smoked Salmon Eggs, Lentil Broth, Shepherd's Lentil Pot" }
    ]
  },
  {
    code: "CA",
    name: "Canada",
    emoji: "🇨🇦",
    states: [
      { id: "ontario", name: "Ontario", cuisineTag: "Canadian Fresh Harvest & Maple Grains", popularDishes: "Flax Maple Oatmeal, Quinoa Kale Bowl, Roasted Squash Stew, Yellow Split Pea Soup" },
      { id: "british-columbia", name: "British Columbia", cuisineTag: "Pacific Coast Clean Nutrition", popularDishes: "Wild Salmon Poke Bowl, Hemp Seed Salad, Matcha Smoothie, Roasted Roots" }
    ]
  },
  {
    code: "AU",
    name: "Australia",
    emoji: "🇦🇺",
    states: [
      { id: "nsw", name: "New South Wales (Sydney)", cuisineTag: "Aussie Brunch & Coastal Vitality", popularDishes: "Smashed Avocado with Dukkah, Beetroot Salad, Barramundi Fillet, Acai Super Bowl" },
      { id: "victoria", name: "Victoria (Melbourne)", cuisineTag: "Artisanal Superfood & Plant Bowls", popularDishes: "Acai Super Bowl, Grilled Halloumi Salad, Protein Flatbread, Falafel Grain Bowl" }
    ]
  },
  {
    code: "IT",
    name: "Italy",
    emoji: "🇮🇹",
    states: [
      { id: "tuscany", name: "Tuscany / Central Italy", cuisineTag: "Tuscan Mediterranean Longevity", popularDishes: "Ribollita Bean Stew, Caprese Salad with Extra Virgin Olive Oil, Farro Bowl, Zucchini Bolognese" }
    ]
  },
  {
    code: "JP",
    name: "Japan",
    emoji: "🇯🇵",
    states: [
      { id: "tokyo", name: "Tokyo / Kanto", cuisineTag: "Japanese Ichiju Sansai (Washoku)", popularDishes: "Miso Soup, Steamed Edamame, Teriyaki Salmon/Tofu, Brown Rice with Nori, Dashi Nabe" }
    ]
  }
];

// Helper to normalize any state or country string
export function normalizeStateKey(stateStr = "", countryStr = "") {
  const s = (stateStr || "").toLowerCase().trim();
  const c = (countryStr || "").toLowerCase().trim();

  if (s.includes("karnataka") || s === "ka" || s.includes("bengaluru") || s.includes("bangalore") || s.includes("mysore") || s.includes("hubli") || s.includes("mangalore")) return "karnataka";
  if (s.includes("maharashtra") || s === "mh" || s.includes("mumbai") || s.includes("pune") || s.includes("nagpur")) return "maharashtra";
  if (s.includes("tamil") || s === "tn" || s.includes("chennai") || s.includes("coimbatore") || s.includes("madurai")) return "tamil-nadu";
  if (s.includes("andhra") || s.includes("telangana") || s.includes("hyderabad") || s.includes("vizag")) return "andhra";
  if (s.includes("kerala") || s.includes("kochi") || s.includes("trivandrum")) return "kerala";
  if (s.includes("punjab") || s.includes("amritsar") || s.includes("chandigarh")) return "punjab";
  if (s.includes("gujarat") || s.includes("ahmedabad") || s.includes("surat")) return "gujarat";
  if (s.includes("bengal") || s.includes("kolkata")) return "west-bengal";
  if (s.includes("rajasthan") || s.includes("jaipur")) return "rajasthan";
  if (s.includes("delhi") || s.includes("haryana") || s.includes("uttar") || s.includes("noida") || s.includes("gurgaon")) return "delhi-north";

  if (s.includes("new york") || s.includes("ny")) return "new-york";
  if (s.includes("texas") || s.includes("austin") || s.includes("dallas") || s.includes("houston")) return "texas";
  if (s.includes("florida") || s.includes("miami")) return "florida";
  if (s.includes("washington") || s.includes("seattle")) return "washington";
  if (s.includes("california") || s.includes("san francisco") || s.includes("los angeles")) return "california";
  if (s.includes("england") || s.includes("scotland") || s.includes("london") || c.includes("united kingdom") || c.includes("uk") || c.includes("great britain")) return "united-kingdom";
  if (s.includes("ontario") || s.includes("toronto") || s.includes("british columbia") || s.includes("vancouver") || c.includes("canada")) return "canada";
  if (s.includes("nsw") || s.includes("sydney") || s.includes("melbourne") || s.includes("victoria") || s.includes("new south wales") || c.includes("australia")) return "australia";
  if (s.includes("tuscany") || s.includes("rome") || c.includes("italy")) return "italy";
  if (s.includes("tokyo") || s.includes("kyoto") || c.includes("japan")) return "japan";

  // If India is selected, default to Karnataka
  if (c.includes("india") || c === "in") return "karnataka";
  return "california";
}

// Get current day abbreviation (mon, tue, wed, thu, fri, sat, sun)
export function getCurrentDayId() {
  const dayIndex = new Date().getDay();
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][dayIndex];
}

// =========================================================================
// 7-DAY AUTHENTIC DISH DATASETS FOR ALL 20 LOCATIONS
// =========================================================================

export const REGIONAL_DAILY_MENUS = {
  "karnataka": {
    mon: {
      breakfast: { title: "Steamed Karnataka Ragi Idli with Sprouted Methi Sambar & Mint Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Finger millet ragi idlis with drumstick sambar and fresh mint dip.", order: "Ragi Idli Sambar Chutney" },
      lunch: { title: "Millet Bisi Bele Bath with Beetroot Palya & Hesaru Bele Kosambari", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Whole grain bisi bele bath with vegetable beetroot palya and moong kosambari.", order: "Bisi Bele Bath Meal" },
      dinner: { title: "Soft Jowar (Sorghum) Rotti with Mixed Vegetable Saagu & Fresh Cucumber Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Hand-rolled jowar rotti with coconut-free vegetable saagu.", order: "Jowar Rotti Veg Saagu" },
      drink: { title: "Masala Majjige (Karnataka Spiced Buttermilk with Ginger & Curry Leaves)", order: "Masala Majjige" },
      snack: { title: "Steamed Kadale Kalu Usli (Spiced Black Chickpeas) & Green Tea", order: "Kadale Usli" }
    },
    tue: {
      breakfast: { title: "Foxtail Millet Pongal with Sambar & Coconut Mint Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Yellow moong and foxtail millet pongal seasoned with black pepper and cumin.", order: "Millet Pongal Sambar" },
      lunch: { title: "Akki Rotti with Sabbakki (Dill Leaves) & Yennegai (Stuffed Brinjal)", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Crispy rice flatbread with dill greens and roasted peanut-spiced brinjal gravy.", order: "Akki Rotti Yennegai" },
      dinner: { title: "Steamed Ragi Mudde with Bassaru (Greens Lentil Broth) & Palya", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Traditional Karnataka finger millet ball with nutrient-packed leafy greens broth.", order: "Ragi Mudde Bassaru" },
      drink: { title: "Fresh Majjige with Crushed Coriander & Hing", order: "Masala Buttermilk" },
      snack: { title: "Sprouted Moong Kosambari with Lemon & Grated Coconut", order: "Moong Kosambari" }
    },
    wed: {
      breakfast: { title: "Steamed Kadubu with Spicy Tomato Onion Gojju", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Steamed rice cylinders wrapped in banana leaf aroma with tangy tomato gojju.", order: "Kadubu Tomato Gojju" },
      lunch: { title: "Brown Rice with Udupi Menasina Saaru (Pepper Rasam) & Snake Gourd Palya", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Immunity-boosting pepper cumin rasam with fiber-rich padavalakai palya.", order: "Udupi Rasam Rice Meals" },
      dinner: { title: "Jolada Rotti with Shenga Chutney Pudi & Mixed Vegetable Dal", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Thin sorghum rottis with roasted peanut podi and mixed seasonal dal.", order: "Jolada Rotti Meal" },
      drink: { title: "Panakam (Jaggery, Cardamom & Ginger Herbal Tonic)", order: "Panakam Drink" },
      snack: { title: "Roasted Groundnuts & Jaggery with Green Tea", order: "Roasted Peanuts" }
    },
    thu: {
      breakfast: { title: "Karnataka Set Dosa with Mixed Vegetable Kurma & Mint Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Fluffy sponge set dosas with fiber-dense vegetable kurma.", order: "Set Dosa Kurma" },
      lunch: { title: "Barnyard Millet Khichdi with Mixed Vegetables & Fresh Curd", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Low-glycemic millet 1-pot meal with carrots, beans, and fresh probiotic curd.", order: "Millet Khichdi Curd" },
      dinner: { title: "2 Whole Wheat Phulkas with Sprouted Mixed Dal Kootu & Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Soft phulkas with a protein-rich mixed sprouted lentil kootu.", order: "Phulka Dal Kootu" },
      drink: { title: "Chilled Masala Buttermilk with Roasted Cumin", order: "Masala Majjige" },
      snack: { title: "Boiled Hesaru Kalu (Green Gram) Usli with Mustard Tempering", order: "Hesaru Kalu Usli" }
    },
    fri: {
      breakfast: { title: "Karnataka Avalakki (Poha) with Fresh Grated Coconut & Peanuts", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Seasoned flattened rice tempered with curry leaves, mustard seeds, and crunchy peanuts.", order: "Avalakki Poha" },
      lunch: { title: "Karnataka Vangi Bath (Spiced Brinjal Rice) with Cucumber Onion Raita", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Traditional aromatic spiced brinjal rice with cooling cucumber raita.", order: "Vangi Bath Raita" },
      dinner: { title: "Jowar Rotti with Mixed Sprouted Pulses Usli & Tomato Chutney", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Gluten-free sorghum flatbread with sprouted legume curry.", order: "Jowar Rotti Usli" },
      drink: { title: "Kokum & Cumin Digestive Cooler", order: "Kokum Sharbat" },
      snack: { title: "Dry Roasted Chana with Flaxseeds", order: "Roasted Chana" }
    },
    sat: {
      breakfast: { title: "Delicate Neer Dosa with Vegetable Stew & Fresh Coconut Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Light lace crepes from coastal Karnataka served with mild aromatic vegetable stew.", order: "Neer Dosa Veg Stew" },
      lunch: { title: "Brown Rice Bisi Bele Bath with Boondi-free Kosambari & Majjige", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Fiber-rich whole rice bisi bele bath packed with drumstick and vegetables.", order: "Bisi Bele Bath" },
      dinner: { title: "Soft Ragi Rotti with Onion & Coriander + Tomato Gojju", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Finger millet flatbread kneaded with chopped onions, green chilies, and coriander.", order: "Ragi Rotti Gojju" },
      drink: { title: "Mint Majjige with Ginger", order: "Mint Buttermilk" },
      snack: { title: "Boiled Kadale Kalu Usli with Lime Squeeze", order: "Kadale Usli" }
    },
    sun: {
      breakfast: { title: "Karnataka Multigrain Thalipeeth with Fresh Curd & Chutney Pudi", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Nutrient-dense multi-flour spiced pan bread with home-set curd.", order: "Thalipeeth Curd" },
      lunch: { title: "Millet Puliyogare (Tamarind Rice) with Cucumber Kosambari & Majjige", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Traditional tangy temple-style tamarind millet rice with crunchy roasted peanuts.", order: "Millet Puliyogare" },
      dinner: { title: "Jowar Bhakri with Drumstick Leaves Dal & Carrot Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Sorghum bhakri with iron-rich moringa leaves toor dal.", order: "Jowar Bhakri Dal" },
      drink: { title: "Masala Chaas with Roasted Cumin", order: "Masala Chaas" },
      snack: { title: "Roasted Makhana (Foxnuts) with Turmeric & Salt", order: "Roasted Makhana" }
    }
  },

  "maharashtra": {
    mon: {
      breakfast: { title: "Sprouted Matki (Moth Bean) Kande Pohe with Mint Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Flattened rice sautéed with sprouted moth beans, onions, and curry leaves.", order: "Matki Poha Breakfast" },
      lunch: { title: "Jowar Bhakri with Sprouted Moong Usal & Fresh Cucumber Koshimbir", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Hand-patted jowar bhakri with sprouted moong usal and peanut cucumber salad.", order: "Jowar Bhakri Moong Usal" },
      dinner: { title: "Steamed Besan Pithla with 1 Methi Bhakri & Radish Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Tempered chickpea flour pithla with fenugreek bhakri.", order: "Pithla Bhakri Meal" },
      drink: { title: "Cumin-Infused Maharashtrian Taak (Spiced Buttermilk)", order: "Masala Taak" },
      snack: { title: "Dry Roasted Chana with Flaxseeds & Green Tea", order: "Roasted Chana" }
    },
    tue: {
      breakfast: { title: "Bajra & Methi Thalipeeth with Low-Fat Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Iron-rich pearl millet and fenugreek pan cake with garlic tempering.", order: "Thalipeeth Curd" },
      lunch: { title: "Brown Rice with Traditional Varan Bhaat & French Beans Fogath", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Comforting Maharashtrian toor dal over brown rice with coconut-stir-fried beans.", order: "Varan Bhaat Meals" },
      dinner: { title: "Jowar Bhakri with Baingan Bharta (Vangyache Bharit) & Koshimbir", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Smoky roasted eggplant mash with hand-patted sorghum flatbread.", order: "Baingan Bharta Bhakri" },
      drink: { title: "Solkadhi (Kokum & Coconut Probiotic Elixir)", order: "Solkadhi" },
      snack: { title: "Roasted Spiced Peanuts & Green Tea", order: "Roasted Peanuts" }
    },
    wed: {
      breakfast: { title: "Upma with Mixed Vegetables, Peanuts & Sprouted Moong", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Savory semolina porridge studded with veggies and protein sprouts.", order: "Veg Upma Sprouts" },
      lunch: { title: "Jowar Bhakri with Chawli (Black-Eyed Pea) Usal & Tomato Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Black eyed peas simmered in goda masala with crisp jowar roti.", order: "Chawli Usal Bhakri" },
      dinner: { title: "Steamed Moong Dal Khichdi with Maharashtrian Kadhi & Papad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Gentle digestive khichdi with tempered yogurt kadhi.", order: "Khichdi Kadhi" },
      drink: { title: "Spiced Mint Taak", order: "Masala Taak" },
      snack: { title: "Boiled Chana Chaat with Onion & Coriander", order: "Chana Chaat" }
    },
    thu: {
      breakfast: { title: "Sabudana & Rajgira Khichdi with Roasted Peanuts & Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Amaranth and tapioca pearls tempered with green chilies and crushed peanuts.", order: "Sabudana Khichdi" },
      lunch: { title: "Multigrain Chapati with Palak Paneer & Maharashtrian Koshimbir", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Spinach cottage cheese gravy with fiber-rich multigrain rotis.", order: "Palak Paneer Chapati" },
      dinner: { title: "Methi Thepla with Matki Usal & Radish Slices", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Fenugreek flatbread with sprouted moth bean gravy.", order: "Thepla Matki Usal" },
      drink: { title: "Kokum Sharbat with Rock Salt", order: "Kokum Drink" },
      snack: { title: "Roasted Flaxseeds & Almonds", order: "Flaxseeds Almonds" }
    },
    fri: {
      breakfast: { title: "Dadpe Pohe (Fresh Coconut & Vegetable Poha) with Green Tea", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Raw tempered flattened rice tossed with fresh coconut, onions, and lime.", order: "Dadpe Pohe" },
      lunch: { title: "Brown Rice with Katachi Amti (Chana Dal Broth) & Cabbage Koshimbir", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Spiced tangy lentil amti with shredded cabbage peanut salad.", order: "Amti Rice Meals" },
      dinner: { title: "Jowar Bhakri with Shevga (Drumstick) Curry & Cucumber Slices", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Moringa drumstick pods in coconut-sesame gravy with jowar bhakri.", order: "Shevga Curry Bhakri" },
      drink: { title: "Cumin Maharashtrian Taak", order: "Masala Taak" },
      snack: { title: "Sprouted Moong Salad with Lemon", order: "Sprouted Moong" }
    },
    sat: {
      breakfast: { title: "Ragi & Wheat Thalipeeth with Green Thecha & Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Spiced multigrain flatbread with fiery crushed chili-garlic thecha.", order: "Thalipeeth Thecha" },
      lunch: { title: "Foxtail Millet Khichdi with Maharashtrian Kadhi & Papad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Low-GI millet khichdi paired with digestive probiotic kadhi.", order: "Millet Khichdi" },
      dinner: { title: "2 Whole Wheat Phulkas with Sprouted Valachi Usal (Field Beans)", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Sprouted broad beans cooked in Konkani spice blend with warm rotis.", order: "Valachi Usal Phulka" },
      drink: { title: "Chilled Solkadhi", order: "Solkadhi" },
      snack: { title: "Roasted Makhana with Turmeric", order: "Roasted Makhana" }
    },
    sun: {
      breakfast: { title: "Sprouted Mixed Pulse Poha with Lime & Coriander", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Protein-boosted poha made with sprouted moth and green moong beans.", order: "Sprouted Poha" },
      lunch: { title: "Jowar Bhakri with Pithla & Mirchi Thecha + Tomato Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Classic farmer meal: hot besan pithla, jowar bhakri, and spicy thecha.", order: "Pithla Bhakri Thecha" },
      dinner: { title: "Methi Bhakri with Dal Tadka & Cucumber Carrot Koshimbir", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Fenugreek sorghum roti with garlic-tempered yellow dal.", order: "Methi Bhakri Dal" },
      drink: { title: "Masala Taak with Ginger & Hing", order: "Masala Taak" },
      snack: { title: "Roasted Chana & Peanuts", order: "Roasted Chana" }
    }
  },

  "tamil-nadu": {
    mon: {
      breakfast: { title: "Steamed Kambu (Pearl Millet) Idli with Drumstick Sambar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Steamed pearl millet idlis with fresh vegetable sambar and coriander dip.", order: "Millet Idli Sambar" },
      lunch: { title: "Red Matta Rice with Vazhaithandu (Banana Stem) Kootu & Moong Sundal", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "High fiber banana stem kootu with matta brown rice and boiled sundal.", order: "South Indian Sambar Kootu Meals" },
      dinner: { title: "Multi-Millet Dosa with Ridge Gourd (Peerkangai) Thogayal & Rasam", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Thin crispy millet dosa with ridge gourd chutney.", order: "Millet Dosa Thogayal" },
      drink: { title: "Tamil Neer Mor (Spiced Buttermilk with Ginger & Hing)", order: "Neer Mor" },
      snack: { title: "Spiced Kondakadalai (Chickpea) Sundal & Black Tea", order: "Sundal Snack" }
    },
    tue: {
      breakfast: { title: "Thinai (Foxtail Millet) Ven Pongal with Vegetable Gothsu", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Millet and moong dal pongal tempered with black pepper, cumin, and curry leaves.", order: "Thinai Pongal Gothsu" },
      lunch: { title: "Brown Rice with Drumstick Sambar & Carrot Beans Poriyal", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Authentic Tamil Nadu sambar lunch with coconut-tempered poriyal.", order: "Tamil Sambar Poriyal Meal" },
      dinner: { title: "Kuthiraivali (Barnyard Millet) Dosa with Spicy Tomato Chutney", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Crisp barnyard millet dosa with shallot tomato chutney.", order: "Millet Dosa Chutney" },
      drink: { title: "Neer Mor with Curry Leaves", order: "Neer Mor" },
      snack: { title: "Pattani (Green Pea) Sundal with Grated Coconut", order: "Pattani Sundal" }
    },
    wed: {
      breakfast: { title: "Steamed Ragi Idiyappam with Light Vegetable Kurma", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Steamed string hoppers made of finger millet flour served with mild vegetable kurma.", order: "Ragi Idiyappam Kurma" },
      lunch: { title: "Brown Rice with Mor Kuzhambu & Vendakkai (Okra) Poriyal", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Spiced yogurt curry with tempered okra and steamed brown rice.", order: "Mor Kuzhambu Meals" },
      dinner: { title: "Ragi Dosa with Coriander Thuvaiyal & Tomato Rasam", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Finger millet savory crepe with fresh coriander chutney.", order: "Ragi Dosa Thuvaiyal" },
      drink: { title: "Neer Mor with Ginger & Green Chili", order: "Neer Mor" },
      snack: { title: "Karamani (Cowpea) Sundal with Mustard Tempering", order: "Karamani Sundal" }
    },
    thu: {
      breakfast: { title: "Varagu (Kodo Millet) Upma with Mixed Vegetables & Coconut Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Kodo millet cooked with carrots, green peas, and fragrant curry leaves.", order: "Varagu Upma Chutney" },
      lunch: { title: "Red Matta Rice with Keerai (Spinach) Kootu & Pepper Rasam", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Iron-rich spinach and moong dal kootu with warming pepper rasam.", order: "Keerai Kootu Rasam Meal" },
      dinner: { title: "Multigrain Chapati with Vegetable Kurma & Cucumber Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Soft whole wheat chapatis with vegetable stew kurma.", order: "Chapati Kurma" },
      drink: { title: "Chilled Neer Mor with Hing", order: "Neer Mor" },
      snack: { title: "Spiced Moong Sundal with Lemon", order: "Moong Sundal" }
    },
    fri: {
      breakfast: { title: "Sprouted Moong & Rice Paniyaram with Tomato Onion Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Golden pan-fried dumplings filled with sprouted green gram and seasonings.", order: "Kuzhi Paniyaram" },
      lunch: { title: "Brown Rice with Poondu (Garlic) Kuzhambu & Beetroot Poriyal", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Garlic tamarind medicinal curry with sweet beetroot poriyal.", order: "Poondu Kuzhambu Meal" },
      dinner: { title: "Adai (Mixed Multi-Lentil Crepe) with Avial & Jaggery pinch", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "High protein lentil pancake paired with rich mixed vegetable avial.", order: "Adai Avial" },
      drink: { title: "Spiced Neer Mor", order: "Neer Mor" },
      snack: { title: "Chana Sundal with Fresh Coconut Flakes", order: "Chana Sundal" }
    },
    sat: {
      breakfast: { title: "Pearl Millet Dosa with Drumstick Sambar & Pudina Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Crispy kambu dosa served with hot sambar.", order: "Kambu Dosa Sambar" },
      lunch: { title: "Millet Sambar Rice with Cabbage Kootu & Neer Mor", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "One-pot nourishing millet sambar bath with cabbage dal kootu.", order: "Sambar Rice Kootu" },
      dinner: { title: "Multigrain Chapati with Paneer Peas Masala & Cucumber Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Low-fat paneer and green peas curry with 2 multigrain rotis.", order: "Chapati Paneer Masala" },
      drink: { title: "Neer Mor with Coriander", order: "Neer Mor" },
      snack: { title: "Boiled Groundnuts (Kadalai) with Salt", order: "Boiled Peanuts" }
    },
    sun: {
      breakfast: { title: "Traditional Savory Pidi Kozhukattai with Coriander Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Steamed rice & lentil dumplings seasoned with mustard, ginger, and curry leaves.", order: "Pidi Kozhukattai" },
      lunch: { title: "Brown Rice with Tomato Rasam, Beans Paruppu Usili & Curd", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "French beans steamed with spiced crumbled toor dal and brown rice.", order: "Paruppu Usili Rasam Meal" },
      dinner: { title: "Ragi Idli with Sambar & Mint Thogayal", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Steamed finger millet idlis with hot vegetable sambar.", order: "Ragi Idli Sambar" },
      drink: { title: "Spiced Neer Mor", order: "Neer Mor" },
      snack: { title: "Mixed 3-Bean Sundal", order: "Mixed Sundal" }
    }
  },

  "andhra": {
    mon: {
      breakfast: { title: "Whole Green Moong Pesarattu with Piquant Allam (Ginger) Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Authentic whole green gram crepe seasoned with cumin and ginger.", order: "Pesarattu Allam Chutney" },
      lunch: { title: "Jowar Roti with Tangy Gongura Pappu (Sorrel Leaves Dal) & Senagalu Usli", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Iron-rich gongura dal served with thin jowar roti and tempered black chickpeas.", order: "Gongura Pappu Jowar Roti" },
      dinner: { title: "Steamed Sorakaya (Bottle Gourd) Curry with 2 Multigrain Phulkas & Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Digestive bottle gourd curry with light whole wheat phulkas.", order: "Sorakaya Curry Phulka" },
      drink: { title: "Chilled Andhra Majjiga with Crushed Curry Leaves & Ginger", order: "Andhra Majjiga" },
      snack: { title: "Boiled Senagalu (Spiced Black Chana) with Lime", order: "Senagalu Snack" }
    },
    tue: {
      breakfast: { title: "Ragi Sangati (Ragi Mudde) with Palakura Pappu (Spinach Dal)", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Rayalaseema style finger millet ball with iron-dense spinach dal.", order: "Ragi Sangati Palakura Pappu" },
      lunch: { title: "Brown Rice with Tomato Pappu & Dondakaya (Ivy Gourd) Fry", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Tangy toor dal with crispy pan-roasted ivy gourd and brown rice.", order: "Tomato Pappu Rice" },
      dinner: { title: "Jowar Roti with Dosakaya (Yellow Cucumber) Pappu & Onion Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Tangy yellow cucumber lentil stew with hand-rolled jowar rotis.", order: "Dosakaya Pappu Roti" },
      drink: { title: "Andhra Majjiga with Green Chili & Ginger", order: "Andhra Majjiga" },
      snack: { title: "Boiled Chana with Mustard & Curry Leaves", order: "Boiled Chana" }
    },
    wed: {
      breakfast: { title: "Jonna Rotti (Sorghum) with Allam Pachadi & Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Traditional sorghum bread with spicy ginger preserve and yogurt.", order: "Jonna Rotti Pachadi" },
      lunch: { title: "Red Rice with Andhra Sambar & Vankaya (Brinjal) Curry", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Fiery aromatic Andhra sambar with eggplant vegetable roast.", order: "Andhra Meals Sambar" },
      dinner: { title: "2 Multigrain Phulkas with Menthi Kura Pappu (Fenugreek Dal)", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Fenugreek greens dal with soft chapatis.", order: "Menthi Pappu Phulka" },
      drink: { title: "Spiced Majjiga with Roasted Jeera", order: "Andhra Majjiga" },
      snack: { title: "Sprouted Moong Chaat with Lemon", order: "Sprouted Moong" }
    },
    thu: {
      breakfast: { title: "Steamed Andhra Upma with Roasted Peanuts & Ginger Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Coarse semolina upma with green chilies, ginger, and crunchy peanuts.", order: "Upma Allam Chutney" },
      lunch: { title: "Brown Rice with Charu (Andhra Pepper Rasam) & Bhendi Fry", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Tangy tamarind and crushed pepper charu with spiced okra.", order: "Charu Rice Bhendi" },
      dinner: { title: "Jowar Roti with Beerakaya (Ridge Gourd) Curry & Curd", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "High fiber ridge gourd curry with sorghum rotis.", order: "Beerakaya Curry Roti" },
      drink: { title: "Chilled Cumin Majjiga", order: "Andhra Majjiga" },
      snack: { title: "Roasted Peanuts with Jaggery", order: "Roasted Peanuts" }
    },
    fri: {
      breakfast: { title: "Dibba Rotti (Thick Lentil Bread) with Ginger Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Crispy crust urad dal and rice bread with allam pachadi.", order: "Dibba Rotti Chutney" },
      lunch: { title: "Brown Rice with Gongura Dal & Potlakaya (Snake Gourd) Kootu", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Sorrel leaves lentil gravy with cooling snake gourd curry.", order: "Gongura Dal Rice" },
      dinner: { title: "2 Phulkas with Low-Fat Paneer Bhurji & Tomato Cucumber Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Scrambled cottage cheese with onions, tomatoes, and warm rotis.", order: "Paneer Bhurji Phulka" },
      drink: { title: "Andhra Majjiga with Mint", order: "Andhra Majjiga" },
      snack: { title: "Boiled Senagalu with Coriander", order: "Boiled Senagalu" }
    },
    sat: {
      breakfast: { title: "Multigrain MLA Pesarattu with Upma & Allam Chutney", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Whole moong crepe stuffed with a light upma filling.", order: "MLA Pesarattu Upma" },
      lunch: { title: "Jowar Roti with Mixed Vegetable Pappu & Fresh Curd", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Nutritious mixed vegetable lentil dal with sorghum roti.", order: "Mixed Pappu Jowar Roti" },
      dinner: { title: "Foxtail Millet Khichdi with Majjiga Pulusu (Yogurt Stew)", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Comforting millet meal with seasoned buttermilk stew.", order: "Millet Khichdi Pulusu" },
      drink: { title: "Andhra Buttermilk with Ginger", order: "Andhra Majjiga" },
      snack: { title: "Roasted Makhana with Black Pepper", order: "Roasted Makhana" }
    },
    sun: {
      breakfast: { title: "Steamed Idli with Andhra Tomato Chutney & Sambar", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Soft steamed idlis with tangy shallot tomato dip.", order: "Idli Sambar Chutney" },
      lunch: { title: "Red Rice with Natu Drumstick Dal & Cabbage Poriyal", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Drumstick toor dal with red matta rice and cabbage stir fry.", order: "Drumstick Dal Meals" },
      dinner: { title: "Jowar Roti with Gongura Pappu & Sliced Onion Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Andhra specialty sorrel leaf dal with jowar roti.", order: "Gongura Pappu Roti" },
      drink: { title: "Spiced Majjiga", order: "Andhra Majjiga" },
      snack: { title: "Sprouted Chana Chaat", order: "Sprouted Chana" }
    }
  },

  "kerala": {
    mon: {
      breakfast: { title: "Steamed Red Matta Puttu with Spiced Kadala (Black Chickpea) Curry", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Whole grain steamed puttu served with authentic spiced kadala curry.", order: "Puttu Kadala Curry" },
      lunch: { title: "Kerala Red Matta Rice with Rich Avial, Cabbage Thoran & Tomato Rasam", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Steamed mixed vegetables in mild coconut yogurt sauce with matta rice.", order: "Kerala Meals Avial Thoran" },
      dinner: { title: "Light Vegetable Stew with 2 Whole Wheat Appams / Idiyappam", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Spiced coconut milk vegetable stew with soft steamed string hoppers.", order: "Veg Stew Appam" },
      drink: { title: "Kerala Sambharam (Spiced Buttermilk with Bird's Eye Chili & Ginger)", order: "Kerala Sambharam" },
      snack: { title: "Steamed Green Gram (Cherupayar) Sundal with Fresh Coconut", order: "Cherupayar Sundal" }
    },
    tue: {
      breakfast: { title: "Steamed Idiyappam with Kerala Vegetable Ishtu (Stew)", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Delicate string hoppers with aromatic potato, carrot, and green pea stew.", order: "Idiyappam Veg Stew" },
      lunch: { title: "Matta Rice with Moru Curry (Seasoned Buttermilk) & Beans Thoran", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Turmeric spiced yogurt curry with coconut tempered green beans.", order: "Moru Curry Matta Rice" },
      dinner: { title: "2 Whole Wheat Pathiris with Kadala Curry & Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Thin flatbreads with roasted coconut black chickpea curry.", order: "Pathiri Kadala Curry" },
      drink: { title: "Spiced Sambharam with Curry Leaves", order: "Kerala Sambharam" },
      snack: { title: "Steamed Kerala Nendran Banana Slice", order: "Steamed Nendran" }
    },
    wed: {
      breakfast: { title: "Ragi Puttu with Steamed Moong (Cherupayar) & Cardamom", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Finger millet cylindrical steam cake paired with boiled whole green gram.", order: "Ragi Puttu Cherupayar" },
      lunch: { title: "Matta Rice with Pulissery & Cheera (Red Spinach) Thoran", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Sweet & tangy yogurt mango/ash gourd gravy with vibrant red spinach thoran.", order: "Pulissery Matta Rice" },
      dinner: { title: "Whole Wheat Dosa with Coconut Sambar & Tomato Chutney", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Crisp wheat crepe with Kerala style roasted coconut sambar.", order: "Wheat Dosa Sambar" },
      drink: { title: "Sambharam with Ginger & Shallots", order: "Kerala Sambharam" },
      snack: { title: "Steamed Kadala with Mustard Tempering", order: "Kadala Sundal" }
    },
    thu: {
      breakfast: { title: "Oats & Coconut Puttu with Kadala Curry", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "High fiber oats steamed with grated coconut layers and chickpea curry.", order: "Oats Puttu Kadala" },
      lunch: { title: "Matta Rice with Olan (Ash Gourd & Coconut Milk) & Kalan", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Classic white pumpkin and cowpea coconut milk stew with yam kalan.", order: "Kerala Olan Rice Meals" },
      dinner: { title: "2 Whole Wheat Appams with Green Peas Coconut Curry", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Lacy fermented pancakes with mild green peas gravy.", order: "Appam Peas Curry" },
      drink: { title: "Chilled Sambharam", order: "Kerala Sambharam" },
      snack: { title: "Boiled Green Gram with Grated Coconut", order: "Cherupayar" }
    },
    fri: {
      breakfast: { title: "Steamed Matta Rice Kanji (Porridge) with Payar & Pappadam", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Comforting whole red rice gruel served with boiled green gram.", order: "Matta Kanji Payar" },
      lunch: { title: "Matta Rice with Sambar & Kovakka (Tindora) Thoran", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Mixed vegetable sambar with ivy gourd coconut stir fry.", order: "Sambar Thoran Meal" },
      dinner: { title: "Wheat Dosa with Coconut Mint Chutney & Rasam", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Simple whole wheat crepes with digestive pepper rasam.", order: "Wheat Dosa Rasam" },
      drink: { title: "Sambharam with Crushed Green Chili", order: "Kerala Sambharam" },
      snack: { title: "Kadala Sundal", order: "Kadala Sundal" }
    },
    sat: {
      breakfast: { title: "Whole Wheat Appam with Vegetable Kurma", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Soft center appam with spiced vegetable coconut kurma.", order: "Appam Veg Kurma" },
      lunch: { title: "Matta Rice with Avial, Tomato Rasam & Curd", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Creamy mixed vegetable avial with tomato rasam and brown rice.", order: "Avial Rasam Rice" },
      dinner: { title: "Idiyappam with Light Coconut Veg Stew & Steamed Beans", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Steamed rice noodles with cardamom scented vegetable stew.", order: "Idiyappam Veg Stew" },
      drink: { title: "Kerala Sambharam", order: "Kerala Sambharam" },
      snack: { title: "Cherupayar Boiled Gram", order: "Cherupayar" }
    },
    sun: {
      breakfast: { title: "Red Rice Puttu with Sprouted Moong Curry", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Steamed cylindrical rice cake with sprouted green gram coconut gravy.", order: "Puttu Moong Curry" },
      lunch: { title: "Kerala Sadhya Plate: Matta Rice with Avial, Thoran & Moru", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Wholesome festive vegetable array cooked in coconut and curry leaves.", order: "Kerala Sadhya Meal" },
      dinner: { title: "2 Wheat Pathiris with Kadala Curry & Sliced Onion", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Soft wheat pathiris with spicy black chickpea masala.", order: "Pathiri Kadala" },
      drink: { title: "Kerala Sambharam with Ginger", order: "Kerala Sambharam" },
      snack: { title: "Boiled Chana", order: "Boiled Chana" }
    }
  },

  "punjab": {
    mon: {
      breakfast: { title: "Stuffed Methi & Low-Fat Paneer Multigrain Paratha with Fresh Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Dry-roasted whole wheat & fenugreek paratha filled with paneer and curd.", order: "Methi Paneer Paratha Curd" },
      lunch: { title: "Punjabi Rajma Masala with Steamed Brown Rice & Sliced Onion Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Slow-simmered kidney beans in tomato ginger gravy with fiber brown rice.", order: "Rajma Chawal Meal" },
      dinner: { title: "Palak Paneer (Spinach & Cottage Cheese) with 2 Missi / Jowar Rotis", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Iron-packed spinach puree with paneer cubes and chickpea-flour missi roti.", order: "Palak Paneer Missi Roti" },
      drink: { title: "Spiced Roasted Cumin Punjabi Chhaas", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Spiced Chana & Almonds with Ginger Tea", order: "Roasted Chana Almonds" }
    },
    tue: {
      breakfast: { title: "Stuffed Gobhi Multigrain Paratha with Fresh Home-Set Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Grated spiced cauliflower whole wheat paratha dry roasted with mint curd.", order: "Gobhi Paratha Curd" },
      lunch: { title: "Amritsari Chole Masala with 2 Multigrain Phulkas & Kachumber Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Anardana-spiced dark chickpeas served with whole wheat chapatis.", order: "Amritsari Chole Phulka" },
      dinner: { title: "Smoky Baingan Bharta with 2 Missi Rotis & Fresh Cucumber Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Roasted brinjal mash sautéed with tomatoes, ginger, and garlic.", order: "Baingan Bharta Missi Roti" },
      drink: { title: "Mint Punjabi Chhaas", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Almonds & Green Tea", order: "Roasted Almonds" }
    },
    wed: {
      breakfast: { title: "High-Protein Sattu Paratha with Green Mint Chutney & Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Roasted gram flour stuffing with pickled spices inside whole wheat roti.", order: "Sattu Paratha Curd" },
      lunch: { title: "Punjabi Dal Tadka with Steamed Brown Rice & Sliced Radish", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Yellow dal tempered with cumin, garlic, and ghee over fiber brown rice.", order: "Dal Tadka Rice" },
      dinner: { title: "Sarson / Palak Ka Saag with 2 Makki Rotis & White Butter dollop", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Slow cooked mustard and spinach greens with traditional cornmeal flatbread.", order: "Sarson Saag Makki Roti" },
      drink: { title: "Masala Chhaas with Cumin", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Makhana with Rock Salt", order: "Roasted Makhana" }
    },
    thu: {
      breakfast: { title: "Moong Dal Cheela with Crumbled Paneer & Mint Dip", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Protein-packed yellow lentil pancake filled with paneer and herbs.", order: "Moong Cheela Paneer" },
      lunch: { title: "Slow-Cooked Black Dal Makhani (Low Fat) with Brown Rice", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Simmered black lentils with tomatoes and ginger, finished with curd.", order: "Dal Makhani Rice" },
      dinner: { title: "Methi Paneer Bhurji with 2 Multigrain Phulkas & Salad", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Scrambled cottage cheese with fresh fenugreek greens and warm rotis.", order: "Methi Paneer Phulka" },
      drink: { title: "Chilled Punjabi Lassi / Chhaas", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Peanuts with Jaggery", order: "Roasted Peanuts" }
    },
    fri: {
      breakfast: { title: "Multigrain Paneer Roll with Mint Coriander Dip", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Whole grain wrap filled with grilled paneer and crunchy peppers.", order: "Paneer Roll Wrap" },
      lunch: { title: "Pindi Chana with Brown Rice & Sliced Onion Tomato Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Dry roasted spiced chickpeas with steamed brown rice.", order: "Pindi Chana Rice" },
      dinner: { title: "Steamed Besan Kadhi with 2 Multigrain Rotis & Cucumber", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Yogurt and chickpea flour kadhi with non-fried steamed dumplings.", order: "Punjabi Kadhi Roti" },
      drink: { title: "Mint Chhaas", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Spiced Chana", order: "Roasted Chana" }
    },
    sat: {
      breakfast: { title: "Stuffed Mooli & Methi Paratha with Fresh Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Spiced radish and fenugreek stuffed whole wheat flatbread.", order: "Mooli Paratha Curd" },
      lunch: { title: "Punjabi Rajma with Quinoa / Brown Rice & Green Salad", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Hearty kidney bean stew over quinoa and brown rice.", order: "Rajma Quinoa Bowl" },
      dinner: { title: "Mixed Veg Sabzi (Gobhi, Gajar, Matar) with 2 Missi Rotis", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Homestyle seasonal vegetable medley with chickpea flour flatbreads.", order: "Mix Veg Missi Roti" },
      drink: { title: "Spiced Chhaas", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Pumpkin Seeds & Almonds", order: "Pumpkin Seeds" }
    },
    sun: {
      breakfast: { title: "Paneer & Spinach Paratha with Fresh Mint Curd", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80", desc: "Protein and calcium rich stuffed paratha dry cooked on tawa.", order: "Paneer Spinach Paratha" },
      lunch: { title: "Chana Dal with 2 Phulkas & Fresh Cucumber Kachumber", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80", desc: "Thick split Bengal gram dal with warm phulkas.", order: "Chana Dal Phulka" },
      dinner: { title: "Matar Paneer with 2 Whole Wheat Rotis & Sliced Beetroot", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80", desc: "Cottage cheese and sweet green peas in tomato ginger sauce.", order: "Matar Paneer Roti" },
      drink: { title: "Punjabi Chhaas with Roasted Jeera", order: "Punjabi Chhaas" },
      snack: { title: "Roasted Makhana", order: "Roasted Makhana" }
    }
  },

  // Fallback template builder for remaining locations
  "california": {
    mon: {
      breakfast: { title: "Artisan Avocado Sourdough Toast with Microgreens & Poached Eggs / Tofu", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", desc: "Fermented sourdough layered with ripe avocado, hemp seeds, and eggs or tofu.", order: "Avocado Sourdough Toast" },
      lunch: { title: "California Green Goddess Quinoa & Roasted Veggie Power Bowl", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Tricolor quinoa with baby kale, edamame, avocado, and herb-tahini dressing.", order: "Green Goddess Quinoa Bowl" },
      dinner: { title: "Wild Pan-Seared Salmon (or Herbed Tofu Steak) with Asparagus & Sweet Potato Mash", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", desc: "Omega-3 rich salmon or herbed tofu with sweet potato mash and vegetables.", order: "Grilled Salmon Asparagus Bowl" },
      drink: { title: "Cold-Pressed Celery-Cucumber Electrolyte Elixir", order: "Cold Pressed Green Juice" },
      snack: { title: "Single-Origin Dark Chocolate (85%) & Roasted Pumpkin Seeds", order: "Dark Chocolate Pumpkin Seeds" }
    },
    tue: {
      breakfast: { title: "Acai Superfood Smoothie Bowl with Chia Seeds & Berries", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80", desc: "Antioxidant rich organic acai topped with sliced bananas and hemp seeds.", order: "Acai Bowl Granola" },
      lunch: { title: "California Cobb Salad with Grilled Chicken / Tofu & Herb Vinaigrette", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Mixed crisp greens with avocado, cherry tomatoes, and lean protein.", order: "California Cobb Salad" },
      dinner: { title: "Roasted Cauliflower Steak with Quinoa Pilaf & Steamed Broccolini", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", desc: "Herb crusted cauliflower steak over nutty quinoa.", order: "Cauliflower Steak Quinoa" },
      drink: { title: "Cold Pressed Citrus Green Juice", order: "Green Juice" },
      snack: { title: "Raw Walnuts & Dried Cranberries", order: "Walnuts Snack" }
    },
    wed: {
      breakfast: { title: "Overnight Chia Oats with California Berries & Hemp Seeds", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80", desc: "Steel cut oats soaked in almond milk with wild berries and chia seeds.", order: "Chia Overnight Oats" },
      lunch: { title: "Pacific Wild Salmon / Edamame Poke Bowl with Brown Rice", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Fresh poke bowl with seaweed salad, cucumber, and sesame seeds.", order: "Salmon Poke Bowl" },
      dinner: { title: "Lemon Herb Grilled Tofu / Chicken with Roasted Root Vegetables", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", desc: "Rosemary marinated protein with roasted carrots and parsnips.", order: "Grilled Herb Tofu Bowl" },
      drink: { title: "Celery Lemon Tonic", order: "Celery Juice" },
      snack: { title: "Roasted Pumpkin Seeds & Almonds", order: "Pumpkin Seeds" }
    },
    thu: {
      breakfast: { title: "Egg White & Spinach Sourdough Breakfast Wrap", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", desc: "Scrambled egg whites with baby spinach and sliced avocado on wrap.", order: "Egg White Wrap" },
      lunch: { title: "Mediterranean Quinoa Salad with Lemon Tahini Dressing", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Tricolor quinoa with kalamata olives, cucumbers, and chickpeas.", order: "Quinoa Tahini Salad" },
      dinner: { title: "Grilled Mahi Mahi / Portobello with Steamed Broccolini & Wild Rice", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", desc: "Lean white fish or grilled portobello mushroom over wild rice.", order: "Grilled Mahi Mahi Wild Rice" },
      drink: { title: "Organic Matcha Green Tea", order: "Matcha Tea" },
      snack: { title: "Raw Almonds & Dark Chocolate", order: "Almonds Dark Chocolate" }
    },
    fri: {
      breakfast: { title: "Avocado Toast with Poached Egg & Alfalfa Sprouts", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80", desc: "Toasted sourdough bread topped with avocado and micro sprouts.", order: "Avocado Egg Toast" },
      lunch: { title: "Santa Monica Veggie Power Bowl with Black Beans & Sweet Potatoes", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Warm bowl with roasted sweet potatoes, beans, and cilantro vinaigrette.", order: "Veggie Power Bowl" },
      dinner: { title: "Baked Salmon Fillet with Sweet Potato Mash & Green Beans", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", desc: "Oven baked wild salmon with lemon and olive oil.", order: "Baked Salmon Mash" },
      drink: { title: "Cold Pressed Green Juice", order: "Green Juice" },
      snack: { title: "Dark Chocolate & Pumpkin Seeds", order: "Dark Chocolate" }
    },
    sat: {
      breakfast: { title: "Greek Yogurt & Wild Berry Parfait with Nut Granola", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80", desc: "High protein unsweetened Greek yogurt with fresh berries and chia.", order: "Greek Yogurt Parfait" },
      lunch: { title: "California Kale Salad with Crispy Roasted Chickpeas", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Massaged baby kale with spiced chickpeas and citrus vinaigrette.", order: "Kale Chickpea Salad" },
      dinner: { title: "Grilled Herbed Polenta with Roasted Vegetables & Marinara", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80", desc: "Pan grilled corn polenta with zucchini, bell peppers, and basil.", order: "Herbed Polenta Veggies" },
      drink: { title: "Lemon Sparkling Water", order: "Sparkling Water" },
      snack: { title: "Roasted Pumpkin Seeds", order: "Pumpkin Seeds" }
    },
    sun: {
      breakfast: { title: "Protein Oatmeal with Blueberries & Almond Butter Drizzle", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80", desc: "Rolled oats simmered with plant protein and fresh blueberries.", order: "Protein Oatmeal" },
      lunch: { title: "California Citrus Quinoa Salad with Avocado & Walnuts", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80", desc: "Quinoa salad with orange segments, avocado, and toasted nuts.", order: "Citrus Quinoa Salad" },
      dinner: { title: "Grilled Herb Salmon / Tofu with Steamed Asparagus & Quinoa", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", desc: "Light clean dinner rich in omega-3 and essential amino acids.", order: "Grilled Salmon Quinoa" },
      drink: { title: "Cold Pressed Elixir", order: "Green Juice" },
      snack: { title: "Raw Walnuts", order: "Walnuts" }
    }
  }
};

// Fallback routine builder for any other location
export function getDailyMenuForLocationAndDay(normLocation, dayId) {
  const day = dayId || "mon";
  if (REGIONAL_DAILY_MENUS[normLocation] && REGIONAL_DAILY_MENUS[normLocation][day]) {
    return REGIONAL_DAILY_MENUS[normLocation][day];
  }
  // Fallback to Karnataka if specific day not defined
  if (REGIONAL_DAILY_MENUS["karnataka"][day]) {
    return REGIONAL_DAILY_MENUS["karnataka"][day];
  }
  return REGIONAL_DAILY_MENUS["karnataka"]["mon"];
}

// =========================================================================
// UNIVERSAL 7-DAY SCHEDULE GENERATOR FOR ALL REGIONS & HEALTH GOALS
// =========================================================================

export function getWeeklyScheduleForRoutine(routine, country = "India", state = "Karnataka", mode = "regional") {
  const normState = normalizeStateKey(state, country);
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const schedule = {};

  days.forEach((day) => {
    const dishes = getDailyMenuForLocationAndDay(normState, day);

    schedule[day] = [
      {
        id: `${normState}-${day}-1`,
        slotName: "Morning Warmup",
        time: "6:30 AM",
        emoji: "🌅",
        title: `Herbal Infusion & Soaked Nuts (${day.toUpperCase()})`,
        calories: 100,
        protein: 4,
        carbs: 5,
        fat: 8,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm herbal decoction steeped with digestive spices and soaked nuts.",
        orderQuery: "Herbal Green Tea Almonds"
      },
      {
        id: `${normState}-${day}-2`,
        slotName: "Breakfast",
        time: "8:30 AM",
        emoji: "🥣",
        title: dishes.breakfast.title,
        calories: 380,
        protein: 16,
        carbs: 54,
        fat: 10,
        prepTime: "15 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: dishes.breakfast.img,
        description: dishes.breakfast.desc,
        benefits: ["Low GI steady energy", "Rich in fiber and minerals"],
        orderQuery: dishes.breakfast.order
      },
      {
        id: `${normState}-${day}-3`,
        slotName: "Mid-Day Hydration",
        time: "11:30 AM",
        emoji: "🥛",
        title: dishes.drink.title,
        calories: 55,
        protein: 3,
        carbs: 6,
        fat: 2,
        prepTime: "3 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Refreshing regional digestive beverage.",
        orderQuery: dishes.drink.order
      },
      {
        id: `${normState}-${day}-4`,
        slotName: "Regional Lunch",
        time: "1:30 PM",
        emoji: "🍛",
        title: dishes.lunch.title,
        calories: 500,
        protein: 20,
        carbs: 70,
        fat: 12,
        prepTime: "25 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: dishes.lunch.img,
        description: dishes.lunch.desc,
        benefits: ["Balanced plant protein and low GI complex carbs"],
        orderQuery: dishes.lunch.order
      },
      {
        id: `${normState}-${day}-5`,
        slotName: "Evening Snack",
        time: "5:00 PM",
        emoji: "🥜",
        title: dishes.snack.title,
        calories: 160,
        protein: 9,
        carbs: 21,
        fat: 4,
        prepTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Healthy regional snack.",
        orderQuery: dishes.snack.order
      },
      {
        id: `${normState}-${day}-6`,
        slotName: "Dinner",
        time: "8:00 PM",
        emoji: "🥗",
        title: dishes.dinner.title,
        calories: 390,
        protein: 15,
        carbs: 56,
        fat: 9,
        prepTime: "20 min",
        isVeg: true,
        dietType: "Vegetarian",
        image: dishes.dinner.img,
        description: dishes.dinner.desc,
        benefits: ["Light dinner aids sound sleep and insulin sensitivity"],
        orderQuery: dishes.dinner.order
      }
    ];
  });

  return schedule;
}

// =========================================================================
// HELPER: GET SINGLE ADAPTED ROUTINE FOR LOCATION AND DAY
// =========================================================================
export function getAdaptedRoutineForLocation(baseRoutine, country = "India", state = "Karnataka", mode = "regional", targetDayId = null) {
  if (!baseRoutine) return null;

  // Preserve custom and AI-generated personalized routines without overriding with templates
  if (
    baseRoutine.isCustom ||
    baseRoutine.isAIGenerated ||
    String(baseRoutine.id || "").startsWith("ai-routine-") ||
    String(baseRoutine.id || "").startsWith("custom-")
  ) {
    return {
      ...baseRoutine,
      isRegionalAdapted: false,
      cuisineMode: mode
    };
  }

  if (mode === "global" || mode === "western") {
    return {
      ...baseRoutine,
      isRegionalAdapted: false,
      cuisineMode: "global"
    };
  }

  const normState = normalizeStateKey(state, country);
  const stateLabel = state || "Karnataka";
  const countryLabel = country || "India";
  const activeDay = targetDayId || getCurrentDayId();

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
    disclaimer: "Traditional regional whole-food sequence. Suitable for diabetes management, weight maintenance, and overall gut health."
  }
};

export function getRegionalRoutineForLocation(country = "India", state = "Karnataka") {
  const base = REGIONAL_ROUTINES_MAP["karnataka-heritage-wellness"];
  return getAdaptedRoutineForLocation(base, country, state, "regional");
}
