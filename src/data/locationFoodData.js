// =========================================================================
// LOCATION-BASED FOOD ROUTINES & LOCAL DISHES DATASET
// Supports Indian Metro & Regional Cities + Major Global Cities
// Comprehensive 3-Tier Structure: City/State/Country -> Categorized Dishes -> Detailed Recipes & Delivery
// =========================================================================

export const MAJOR_LOCATIONS = [
  {
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    regionName: "Bengaluru, Karnataka",
    emoji: "🌸",
    tagline: "Garden City Millet & Heritage Nutrition",
    coordinates: { lat: 12.9716, lon: 77.5946 },
    popularFoods: ["Ragi Dosa", "Ragi Mudde", "Millet Bisi Bele Bath", "Kosambari", "Majjige", "Akki Rotti", "Kadale Usli"],
    healthyKitchens: ["MTR Heritage Kitchens", "Paakashala Healthy", "Soulfull Bowls Indiranagar", "Green Theory Koramangala"],
    dishes: {
      breakfast: [
        {
          id: "blr-bf-1",
          title: "Steamed Karnataka Ragi Dosa with Vegetable Sambar & Mint Chutney",
          slotName: "Breakfast",
          time: "8:00 AM – 8:45 AM",
          emoji: "🥣",
          tag: "Low-GI Millet Fuel",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
          calories: 320,
          protein: 12,
          carbs: 52,
          fat: 6,
          fiber: 9,
          prepTime: "10 min",
          cookTime: "10 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Fermented finger millet (ragi) thin crepe served with authentic drumstick-shallot sambar and roasted chana mint chutney.",
          benefits: ["Rich in natural calcium and iron", "Low glycemic index prevents insulin spikes", "Easily digestible fermented probiotics"],
          ingredients: [
            { name: "Sprouted Ragi Flour", amount: "1/2 cup" },
            { name: "Urad Dal Batter", amount: "1/4 cup" },
            { name: "Drumstick & Vegetable Sambar", amount: "1 bowl (150ml)" },
            { name: "Fresh Mint & Coconut Chutney", amount: "2 tbsp" }
          ],
          steps: [
            "Whisk ragi flour with a touch of urad dal batter and water to pouring consistency.",
            "Ladle onto a hot cast iron tawa and spread in concentric circles.",
            "Drizzle 1/2 tsp cold-pressed sesame or coconut oil.",
            "Flip once crisp and serve piping hot with aromatic Bengaluru sambar."
          ],
          chefTips: "Use cast-iron griddle for highest crispiness and extra bio-available dietary iron.",
          youtubeVideos: [
            { id: "blr-yt-1", title: "Crispy Healthy Ragi Dosa Recipe Step-by-Step", duration: "7:20", channel: "Hebbars Kitchen", query: "healthy ragi dosa recipe karnataka" },
            { id: "blr-yt-2", title: "Authentic Bengaluru Style Sambar for Breakfast", duration: "8:45", channel: "Swayampaaka", query: "bangalore tiffin sambar recipe" },
            { id: "blr-yt-3", title: "Ragi Nutrition & Diabetes Benefits Explained", duration: "5:30", channel: "Nutrition Insights", query: "ragi health benefits diabetes weight loss" }
          ],
          orderQuery: "Ragi Dosa Sambar Bengaluru"
        },
        {
          id: "blr-bf-2",
          title: "Foxtail Millet (Navane) Khichdi with Steamed Sprouts & Curd",
          slotName: "Breakfast",
          time: "8:30 AM – 9:00 AM",
          emoji: "🥣",
          tag: "Whole Grain Satiety",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 340,
          protein: 14,
          carbs: 56,
          fat: 6,
          fiber: 11,
          prepTime: "10 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "One-pot slow cooked foxtail millet with yellow moong dal, carrots, French beans, and crushed black pepper tempering.",
          benefits: ["High insoluble fiber", "Gluten-free digestive comfort", "Sustained all-morning energy"],
          ingredients: [
            { name: "Foxtail Millet (washed)", amount: "1/2 cup" },
            { name: "Yellow Moong Dal", amount: "1/4 cup" },
            { name: "Diced Carrots & Beans", amount: "1/2 cup" },
            { name: "Black Pepper & Cumin Seeds", amount: "1 tsp" }
          ],
          steps: [
            "Pressure cook millet, dal, diced vegetables, and turmeric for 3 whistles.",
            "Temper with cumin, black pepper, ginger, and curry leaves in 1/2 tsp ghee.",
            "Serve warm with home-set probiotic curd."
          ],
          chefTips: "Soak foxtail millet for 30 minutes before cooking to unlock bio-active enzymes.",
          youtubeVideos: [
            { id: "blr-yt-4", title: "Foxtail Millet Khichdi - Weight Loss Breakfast", duration: "6:10", channel: "Skinny Recipes", query: "foxtail millet khichdi recipe healthy" },
            { id: "blr-yt-5", title: "Navane Pongal & Khichdi Karnataka Special", duration: "9:15", channel: "Paaka Krithi", query: "navane pongal recipe karnataka" },
            { id: "blr-yt-6", title: "Millets for Energy & Digestion", duration: "4:50", channel: "Fit Tuber", query: "millets health benefits guide" }
          ],
          orderQuery: "Millet Khichdi Bengaluru"
        }
      ],
      lunch: [
        {
          id: "blr-lu-1",
          title: "Millet Bisi Bele Bath with Beetroot Palya & Moong Kosambari",
          slotName: "Lunch",
          time: "1:00 PM – 1:45 PM",
          emoji: "🍛",
          tag: "Complete Balanced Thali",
          image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
          calories: 480,
          protein: 21,
          carbs: 72,
          fat: 10,
          fiber: 14,
          prepTime: "15 min",
          cookTime: "25 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Nutrient-packed traditional Karnataka hot lentil-grain bowl cooked with seasonal drumsticks, shallots, paired with fresh cucumber moong salad.",
          benefits: ["Complete amino-acid profile from dal + millets", "Antioxidants from beetroot", "Hydrating cooling kosambari"],
          ingredients: [
            { name: "Little Millet / Brown Rice", amount: "1/2 cup" },
            { name: "Toor Dal", amount: "1/3 cup" },
            { name: "Mixed Vegetables (Carrot, Beans, Peas)", amount: "1 cup" },
            { name: "Bisi Bele Bath Masala", amount: "1.5 tbsp" },
            { name: "Soaked Moong Dal Kosambari", amount: "1 small cup" }
          ],
          steps: [
            "Cook millet, toor dal, and vegetables together until tender.",
            "Simmer with tamarind extract, jaggery pinch, and fresh Bisi Bele Bath spice powder.",
            "Temper with mustard seeds and curry leaves.",
            "Toss soaked moong dal with grated cucumber, lemon juice, and coriander for the salad."
          ],
          chefTips: "Do not add fried boondi on top to keep calories and inflammatory oils low.",
          youtubeVideos: [
            { id: "blr-yt-7", title: "Millet Bisi Bele Bath Authentic Recipe", duration: "10:30", channel: "Bhat 'n' Bhat", query: "bisi bele bath recipe authentic karnataka" },
            { id: "blr-yt-8", title: "Hesaru Bele Kosambari (Protein Salad)", duration: "4:40", channel: "Swayampaaka", query: "moong dal kosambari recipe" },
            { id: "blr-yt-9", title: "Healthy Karnataka Meals Prep", duration: "8:10", channel: "Flavors of South", query: "healthy karnataka lunch thali" }
          ],
          orderQuery: "Bisi Bele Bath Meal Bengaluru"
        },
        {
          id: "blr-lu-2",
          title: "Steamed Ragi Mudde with Bassaru (Nutrient Leafy Greens Broth) & Palya",
          slotName: "Lunch",
          time: "1:15 PM – 2:00 PM",
          emoji: "🍛",
          tag: "Traditional Farmer Power",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
          calories: 450,
          protein: 19,
          carbs: 68,
          fat: 8,
          fiber: 16,
          prepTime: "15 min",
          cookTime: "20 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Traditional soft steamed finger millet ball served with nutrient-dense dill & toor dal extract saaru and stir-fried greens.",
          benefits: ["Zero gluten", "Extremely high dietary calcium", "High satiety keeps you energized for 6+ hours"],
          ingredients: [
            { name: "Ragi Flour", amount: "1 cup" },
            { name: "Dill Leaves & Toor Dal", amount: "1/2 cup cooked" },
            { name: "Shallots, Garlic & Pepper Paste", amount: "2 tbsp" }
          ],
          steps: [
            "Boil water, sprinkle a little ragi flour, then stir vigorously to form a smooth ball.",
            "Steam covered for 5 minutes and roll into round mudde balls.",
            "Serve hot submerged in aromatic spiced bassaru broth."
          ],
          chefTips: "Swallow small pieces with the spicy broth without chewing excessively.",
          youtubeVideos: [
            { id: "blr-yt-10", title: "How to Make Perfect Soft Ragi Mudde", duration: "8:00", channel: "Rekha Aduge", query: "ragi mudde recipe karnataka" },
            { id: "blr-yt-11", title: "Traditional Bassaru and Palya Recipe", duration: "11:20", channel: "Kannada Paakashale", query: "bassaru palya recipe karnataka" },
            { id: "blr-yt-12", title: "Why Ragi Mudde is the Ultimate Superfood", duration: "6:15", channel: "Health Karnataka", query: "ragi mudde health benefits" }
          ],
          orderQuery: "Ragi Mudde Bassaru Bengaluru"
        }
      ],
      healthyMeals: [
        {
          id: "blr-hm-1",
          title: "Hesaru Kalu (Sprouted Green Gram) Usli with Lemon & Coconut",
          slotName: "Healthy Meals",
          time: "5:00 PM – 5:30 PM",
          emoji: "🥗",
          tag: "Clean Plant Protein",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
          calories: 210,
          protein: 14,
          carbs: 32,
          fat: 3,
          fiber: 8,
          prepTime: "5 min",
          cookTime: "8 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Steamed sprouted whole moong tossed with mustard seeds, green chilies, grated ginger, fresh coriander, and a spritz of lemon juice.",
          benefits: ["Live enzymes from fresh sprouts", "Zero cholesterol", "Fights 4 PM hunger crashes"],
          ingredients: [
            { name: "Sprouted Moong Beans", amount: "1 cup" },
            { name: "Mustard & Cumin Seeds", amount: "1/2 tsp" },
            { name: "Fresh Grated Coconut", amount: "1 tbsp" },
            { name: "Lemon Juice & Curry Leaves", amount: "1 squeeze" }
          ],
          steps: [
            "Steam sprouted green gram for 5 minutes with a pinch of turmeric and salt.",
            "Temper mustard, cumin, green chili, and curry leaves in 1/2 tsp cold-pressed oil.",
            "Toss steamed sprouts, finish with fresh grated coconut and lemon juice."
          ],
          chefTips: "Do not over-boil sprouts; keep a slight crunch to preserve active vitamin C.",
          youtubeVideos: [
            { id: "blr-yt-13", title: "Karnataka Sprouted Moong Usli Recipe", duration: "5:10", channel: "Hebbars Kitchen", query: "moong sprouts usli recipe" },
            { id: "blr-yt-14", title: "High Protein Evening Snacks for Fat Loss", duration: "7:40", channel: "Fit Tuber", query: "healthy evening sprouts snack recipe" },
            { id: "blr-yt-15", title: "Easy Sprouting Guide at Home", duration: "4:30", channel: "Healthy Living", query: "how to make moong sprouts at home fast" }
          ],
          orderQuery: "Sprouts Salad Usli Bengaluru"
        }
      ],
      highProtein: [
        {
          id: "blr-hp-1",
          title: "High-Protein Kadale Kalu (Black Chickpea) Sundal & Soy Paneer Palya",
          slotName: "High Protein",
          time: "Lunch / Dinner",
          emoji: "💪",
          tag: "Hypertrophy Fuel",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 420,
          protein: 28,
          carbs: 48,
          fat: 10,
          fiber: 15,
          prepTime: "10 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Slow-boiled black chickpeas combined with cubed fresh paneer or tofu, sauteed with Karnataka spices, curry leaves, and ginger.",
          benefits: ["28g Bio-available plant protein", "Sustained muscle recovery", "High iron for endurance"],
          ingredients: [
            { name: "Boiled Black Chickpeas (Kadale)", amount: "1 cup" },
            { name: "Low-fat Paneer / Tofu Cubes", amount: "100g" },
            { name: "Ginger, Garlic & Curry Leaves", amount: "1 tbsp" },
            { name: "Roasted Cumin Coriander Powder", amount: "1 tsp" }
          ],
          steps: [
            "Boil soaked black chickpeas in pressure cooker until soft.",
            "In a skillet, lightly sear paneer cubes.",
            "Toss chickpeas and paneer together with ginger, green chilies, and roasted cumin powder."
          ],
          chefTips: "Pair with a glass of fresh spiced Majjige (buttermilk) for optimal protein absorption.",
          youtubeVideos: [
            { id: "blr-yt-16", title: "Black Chickpea High Protein Usli", duration: "6:50", channel: "Swayampaaka", query: "kadale kalu usli high protein" },
            { id: "blr-yt-17", title: "Vegetarian Muscle Building Meals in India", duration: "11:20", channel: "Fit Muscle", query: "vegetarian bodybuilding meal plan india" },
            { id: "blr-yt-18", title: "Paneer & Chana Protein Salad Bowl", duration: "5:45", channel: "Healthy Recipes", query: "paneer chana high protein bowl" }
          ],
          orderQuery: "High Protein Salad Bowl Bengaluru"
        }
      ],
      dinner: [
        {
          id: "blr-dn-1",
          title: "Soft Jowar (Sorghum) Rotti with Mixed Vegetable Saagu & Cucumber Slices",
          slotName: "Dinner",
          time: "7:45 PM – 8:30 PM",
          emoji: "🌙",
          tag: "Light Gluten-Free Dinner",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
          calories: 360,
          protein: 13,
          carbs: 60,
          fat: 7,
          fiber: 12,
          prepTime: "15 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Hand-patted sorghum flatbread cooked with zero oil, served with light mixed vegetable saagu and cooling cucumber ribbons.",
          benefits: ["Complex carbohydrates promote deep sleep", "Completely gluten-free", "Light on stomach"],
          ingredients: [
            { name: "Jowar (Sorghum) Flour", amount: "1 cup" },
            { name: "Warm Water", amount: "3/4 cup" },
            { name: "Mixed Vegetable Saagu (Carrot, Beans, Peas)", amount: "1 bowl" },
            { name: "Fresh Cucumber Slices", amount: "1 cup" }
          ],
          steps: [
            "Knead jowar flour with warm water into a smooth, pliable dough.",
            "Hand-pat into thin round flatbreads on a floured surface.",
            "Cook on high heat, brushing water on top until puffed.",
            "Serve hot with mild vegetable saagu."
          ],
          chefTips: "Eat dinner before 8:30 PM for optimal glycemic rest and metabolic detox.",
          youtubeVideos: [
            { id: "blr-yt-19", title: "How to Make Soft Jowar Roti without Breaking", duration: "8:30", channel: "Hebbars Kitchen", query: "jowar roti recipe soft step by step" },
            { id: "blr-yt-20", title: "Karnataka Style Vegetable Saagu", duration: "9:10", channel: "Paaka Krithi", query: "karnataka veg saagu recipe" },
            { id: "blr-yt-21", title: "Why Light Dinners Improve Insulin Sensitivity", duration: "6:00", channel: "Doctor Talk", query: "early light dinner health benefits" }
          ],
          orderQuery: "Jowar Rotti Veg Saagu Bengaluru"
        }
      ]
    }
  },

  {
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    regionName: "Mumbai, Maharashtra",
    emoji: "🌊",
    tagline: "High-Fiber Maharashtrian Coastal & Satvik Nutrition",
    coordinates: { lat: 19.0760, lon: 72.8777 },
    popularFoods: ["Kande Pohe", "Jowar Bhakri", "Pitla", "Matki Usal", "Solkadhi", "Thalipeeth", "Varan Bhaat"],
    healthyKitchens: ["Aaswad Healthy Thali Dadar", "Prakash Shakahari", "Seeds of Life Bandra", "Santushti Clean Meals"],
    dishes: {
      breakfast: [
        {
          id: "mum-bf-1",
          title: "Sprouted Matki (Moth Bean) Kande Pohe with Mint & Lemon",
          slotName: "Breakfast",
          time: "8:00 AM – 8:30 AM",
          emoji: "🥣",
          tag: "Protein-Enriched Poha",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
          calories: 310,
          protein: 13,
          carbs: 49,
          fat: 6,
          fiber: 9,
          prepTime: "10 min",
          cookTime: "10 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Thick flattened rice steamed with sprouted moth beans, chopped red onions, mustard seeds, curry leaves, and crunchy roasted peanuts.",
          benefits: ["Iron-rich flattened rice", "High fiber from moth sprouts", "Low cooking oil"],
          ingredients: [
            { name: "Thick Poha (rinsed)", amount: "1 cup" },
            { name: "Sprouted Matki (Moth)", amount: "1/2 cup" },
            { name: "Onion, Green Chili & Peanuts", amount: "2 tbsp each" },
            { name: "Turmeric, Mustard & Lemon", amount: "1/2 tsp" }
          ],
          steps: [
            "Rinse poha gently in a sieve and drain completely.",
            "Saute mustard seeds, green chilies, peanuts, and onions until translucent.",
            "Add sprouted matki, turmeric, and salt; cook covered for 4 minutes.",
            "Fold in drained poha, steam for 2 minutes, and finish with fresh lemon juice."
          ],
          chefTips: "Adding sprouted matki doubles the protein and cuts glycemic index by half.",
          youtubeVideos: [
            { id: "mum-yt-1", title: "Authentic Maharashtrian Kande Pohe Recipe", duration: "6:40", channel: "MadhurasRecipe", query: "kande pohe recipe maharashtra" },
            { id: "mum-yt-2", title: "High Protein Sprouted Poha for Weight Loss", duration: "5:50", channel: "Fit Tuber", query: "high protein sprouted poha recipe" },
            { id: "mum-yt-3", title: "Healthy Mumbai Breakfast Routine", duration: "7:10", channel: "Mumbai Foodie", query: "healthy maharashtrian breakfast dishes" }
          ],
          orderQuery: "Kande Pohe Mumbai"
        },
        {
          id: "mum-bf-2",
          title: "Multi-Grain Methi Thalipeeth with Low-Fat Home Curd",
          slotName: "Breakfast",
          time: "8:30 AM – 9:00 AM",
          emoji: "🥣",
          tag: "Traditional Iron Pancake",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 330,
          protein: 14,
          carbs: 48,
          fat: 7,
          fiber: 10,
          prepTime: "10 min",
          cookTime: "12 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Nutrient-dense rustic pancake made from roasted multigrain bhajani flour, fresh fenugreek leaves, and garlic.",
          benefits: ["Rich in fenugreek soluble fiber", "Regulates fasting blood sugar", "Sustained morning satiety"],
          ingredients: [
            { name: "Thalipeeth Bhajani (Multigrain)", amount: "1/2 cup" },
            { name: "Chopped Fresh Methi Leaves", amount: "1/2 cup" },
            { name: "Onion, Green Chili & Cumin", amount: "1 tbsp" },
            { name: "Low-Fat Probiotic Curd", amount: "1/2 cup" }
          ],
          steps: [
            "Mix bhajani flour with fresh fenugreek, chopped onion, turmeric, and cumin.",
            "Pat out thin circles on parchment paper with a hole in the center.",
            "Roast on a hot griddle with minimal ghee until crisp and golden brown on both sides.",
            "Serve warm with home-set curd."
          ],
          chefTips: "Fenugreek galactomannan fiber actively slows sugar absorption in the gut.",
          youtubeVideos: [
            { id: "mum-yt-4", title: "Authentic Bhajani Thalipeeth Recipe", duration: "8:15", channel: "MadhurasRecipe", query: "thalipeeth recipe authentic marathi" },
            { id: "mum-yt-5", title: "Methi Thalipeeth for Diabetes & Weight Loss", duration: "6:20", channel: "Skinny Recipes", query: "methi thalipeeth healthy" },
            { id: "mum-yt-6", title: "Benefits of Fenugreek for Glucose Control", duration: "5:00", channel: "Nutrition Insights", query: "fenugreek health benefits blood sugar" }
          ],
          orderQuery: "Thalipeeth Curd Mumbai"
        }
      ],
      lunch: [
        {
          id: "mum-lu-1",
          title: "Jowar Bhakri with Sprouted Moong Usal, Solkadhi & Koshimbir",
          slotName: "Lunch",
          time: "1:00 PM – 1:45 PM",
          emoji: "🍛",
          tag: "Satvik Maharashtrian Lunch",
          image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
          calories: 470,
          protein: 20,
          carbs: 70,
          fat: 9,
          fiber: 14,
          prepTime: "15 min",
          cookTime: "20 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Hand-patted sorghum flatbread paired with lightly spiced sprouted moong curry, digestive kokum coconut Solkadhi, and cucumber peanut salad.",
          benefits: ["Kokum solkadhi provides antioxidants", "Sprouted moong aids gut flora", "Gluten-free jowar"],
          ingredients: [
            { name: "Jowar Bhakri (handmade)", amount: "2 pieces" },
            { name: "Sprouted Moong Usal", amount: "1 bowl (150g)" },
            { name: "Solkadhi (Kokum & Coconut Extract)", amount: "1 glass (150ml)" },
            { name: "Cucumber Peanut Koshimbir", amount: "1 small cup" }
          ],
          steps: [
            "Saute sprouted moong with cumin, goda masala, and ginger; simmer till tender.",
            "Prepare fresh jowar bhakris on iron tava.",
            "Pour chilled solkadhi infused with crushed garlic and cilantro.",
            "Plate with crunchy cucumber koshimbir."
          ],
          chefTips: "Solkadhi is a renowned Ayurvedic digestive cooler after warm afternoon meals.",
          youtubeVideos: [
            { id: "mum-yt-7", title: "Jowar Bhakri with Moong Usal Meal", duration: "9:40", channel: "MadhurasRecipe", query: "jowar bhakri moong usal thali" },
            { id: "mum-yt-8", title: "Authentic Solkadhi Recipe for Digestion", duration: "5:30", channel: "Flavors of Mumbai", query: "solkadhi recipe authentic kokum" },
            { id: "mum-yt-9", title: "Maharashtrian Healthy Diets Explained", duration: "8:00", channel: "Fit Tuber", query: "healthy maharashtrian food diet" }
          ],
          orderQuery: "Jowar Bhakri Usal Thali Mumbai"
        }
      ],
      healthyMeals: [
        {
          id: "mum-hm-1",
          title: "Steamed Besan Pithla with Methi Bhakri & Radish Salad",
          slotName: "Healthy Meals",
          time: "1:15 PM – 2:00 PM",
          emoji: "🥗",
          tag: "High Protein Comfort",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
          calories: 390,
          protein: 18,
          carbs: 58,
          fat: 8,
          fiber: 12,
          prepTime: "10 min",
          cookTime: "12 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Tempered gram flour savory porridge with garlic, mustard seeds, green chilies, served with rustic fenugreek sorghum roti.",
          benefits: ["High protein from chickpea flour", "Zero processed oils", "Rich in minerals"],
          ingredients: [
            { name: "Gram Flour (Besan)", amount: "1/2 cup" },
            { name: "Crushed Garlic & Green Chilies", amount: "1 tbsp" },
            { name: "Methi Jowar Bhakri", amount: "1 piece" },
            { name: "Radish & Carrot Slices", amount: "1 cup" }
          ],
          steps: [
            "Whisk besan with water and turmeric to a lump-free paste.",
            "Temper mustard, cumin, lots of garlic, and curry leaves in 1/2 tsp oil.",
            "Pour besan slurry, cover, and steam on low heat for 6-8 minutes.",
            "Garnish with coriander and serve with hot bhakri."
          ],
          chefTips: "Cook besan thoroughly on steam so it digests smoothly and provides long energy.",
          youtubeVideos: [
            { id: "mum-yt-10", title: "Authentic Maharashtrian Pithla Bhakri", duration: "7:20", channel: "MadhurasRecipe", query: "pithla bhakri recipe" },
            { id: "mum-yt-11", title: "Besan Nutrition for Fitness & Weight Loss", duration: "6:10", channel: "Health Talk", query: "gram flour besan nutrition benefits" },
            { id: "mum-yt-12", title: "Healthy Quick Indian Lunch Prep", duration: "8:00", channel: "Easy Cooking", query: "quick healthy indian lunch ideas" }
          ],
          orderQuery: "Pithla Bhakri Mumbai"
        }
      ],
      highProtein: [
        {
          id: "mum-hp-1",
          title: "Roasted Chana & Sprouted Moth Usal Power Bowl with Spiced Taak",
          slotName: "High Protein",
          time: "Lunch / Dinner",
          emoji: "💪",
          tag: "Athletic Plant Fuel",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
          calories: 440,
          protein: 26,
          carbs: 62,
          fat: 8,
          fiber: 16,
          prepTime: "10 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Dual legume power bowl combining slow-simmered sprouted moth beans, roasted chickpeas, tossed with fresh koshimbir and cumin buttermilk.",
          benefits: ["26g Clean plant protein", "High magnesium and potassium", "Zero post-meal lethargy"],
          ingredients: [
            { name: "Sprouted Matki Beans", amount: "1 cup" },
            { name: "Roasted Bengal Gram (Chana)", amount: "1/2 cup" },
            { name: "Spiced Maharashtrian Taak", amount: "1 glass" }
          ],
          steps: [
            "Simmer matki with tomatoes and goda masala for 8 minutes.",
            "Toss in roasted chana for crunch and texture.",
            "Enjoy with chilled probiotic buttermilk."
          ],
          chefTips: "Sprouted moth beans are among the highest in protein-to-carb ratios among Indian legumes.",
          youtubeVideos: [
            { id: "mum-yt-13", title: "Sprouted Matki Usal High Protein Guide", duration: "6:50", channel: "Skinny Recipes", query: "sprouted matki usal recipe" },
            { id: "mum-yt-14", title: "Vegetarian High Protein Indian Diet", duration: "12:00", channel: "Fit Tuber", query: "high protein vegetarian food india" },
            { id: "mum-yt-15", title: "Spiced Taak Buttermilk Benefits", duration: "4:20", channel: "Ayurveda Daily", query: "taak buttermilk health benefits" }
          ],
          orderQuery: "Matki Usal Healthy Bowl Mumbai"
        }
      ],
      dinner: [
        {
          id: "mum-dn-1",
          title: "Steamed Moong Dal Khichdi with Maharashtrian Kadhi & Koshimbir",
          slotName: "Dinner",
          time: "7:45 PM – 8:30 PM",
          emoji: "🌙",
          tag: "Light Healing Dinner",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
          calories: 350,
          protein: 15,
          carbs: 58,
          fat: 6,
          fiber: 9,
          prepTime: "10 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Split yellow moong dal and hand-pounded rice steamed with turmeric and cumin, served with probiotic tempered yogurt kadhi.",
          benefits: ["Gentle on digestive tract", "High tryptophan promotes sound sleep", "Balances all three doshas"],
          ingredients: [
            { name: "Yellow Moong Dal & Rice", amount: "1 cup (1:1 ratio)" },
            { name: "Maharashtrian Kadhi (Yogurt + Besan)", amount: "1 bowl" },
            { name: "Grated Carrot & Beetroot Salad", amount: "1 cup" }
          ],
          steps: [
            "Pressure cook moong dal and rice with turmeric and salt for 3 whistles.",
            "Whisk curd and besan with water, temper with ginger, green chili, and curry leaves.",
            "Serve hot for a calming night meal."
          ],
          chefTips: "Eating khichdi with a 1:1 dal-to-rice ratio ensures low GI and high protein.",
          youtubeVideos: [
            { id: "mum-yt-16", title: "Moong Dal Khichdi - Ayurvedic Sleep Recipe", duration: "7:00", channel: "MadhurasRecipe", query: "moong dal khichdi kadhi recipe" },
            { id: "mum-yt-17", title: "Maharashtrian Kadhi Recipe", duration: "5:40", channel: "Flavors of India", query: "maharashtrian kadhi recipe" },
            { id: "mum-yt-18", title: "The Science of Light Dinners", duration: "6:15", channel: "Dr. Health", query: "early light dinner digestion health" }
          ],
          orderQuery: "Moong Khichdi Kadhi Mumbai"
        }
      ]
    }
  },

  {
    city: "Delhi",
    state: "Delhi & North India",
    country: "India",
    regionName: "Delhi / NCR",
    emoji: "🏛️",
    tagline: "High-Protein North Indian Whole Grain & Dal Blueprint",
    coordinates: { lat: 28.6139, lon: 77.2090 },
    popularFoods: ["Methi Paratha", "Dal Tadka", "Palak Paneer", "Rajma", "Chana Chaat", "Missi Roti", "Chhaas"],
    healthyKitchens: ["Bikanervala Satvik", "Organic India Cafe CP", "NutrioBox Delhi", "Getafix Clean Cafe GK"],
    dishes: {
      breakfast: [
        {
          id: "del-bf-1",
          title: "Multigrain Stuffed Methi & Low-Fat Paneer Phulka with Spiced Curd",
          slotName: "Breakfast",
          time: "8:00 AM – 8:30 AM",
          emoji: "🥣",
          tag: "High-Protein Flatbread",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
          calories: 340,
          protein: 16,
          carbs: 48,
          fat: 8,
          fiber: 10,
          prepTime: "12 min",
          cookTime: "10 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Whole wheat & oat flour rolled with chopped fenugreek greens and crumbled fresh paneer, dry-roasted on tawa with a light brush of ghee.",
          benefits: ["High calcium and casein protein", "Fenugreek supports glycemic stability", "Zero greasy deep frying"],
          ingredients: [
            { name: "Whole Wheat & Oats Flour", amount: "1/2 cup" },
            { name: "Fresh Fenugreek (Methi)", amount: "1/2 cup chopped" },
            { name: "Crumbled Low-Fat Paneer", amount: "50g" },
            { name: "Spiced Cumin Curd", amount: "1/2 cup" }
          ],
          steps: [
            "Knead wheat and oat flour with chopped methi, ajwain, and a pinch of rock salt.",
            "Stuff with lightly seasoned crumbled paneer and roll out thinly.",
            "Roast on hot tawa until puffed and golden brown.",
            "Serve hot with cumin-sprinkled fresh curd."
          ],
          chefTips: "Ajwain (carom seeds) prevents bloating and enhances digestion.",
          youtubeVideos: [
            { id: "del-yt-1", title: "Healthy Methi Paneer Paratha with Low Oil", duration: "8:00", channel: "Kabita's Kitchen", query: "healthy methi paneer paratha recipe" },
            { id: "del-yt-2", title: "North Indian High Protein Breakfast Ideas", duration: "10:15", channel: "Fit Tuber", query: "north indian high protein breakfast" },
            { id: "del-yt-3", title: "Paneer vs Tofu Nutrition Comparison", duration: "5:30", channel: "Doctor Diet", query: "paneer protein benefits nutrition" }
          ],
          orderQuery: "Methi Paneer Paratha Delhi"
        }
      ],
      lunch: [
        {
          id: "del-lu-1",
          title: "Missi Roti (Gram & Wheat) with Yellow Dal Tadka, Cucumber Salad & Chhaas",
          slotName: "Lunch",
          time: "1:00 PM – 1:45 PM",
          emoji: "🍛",
          tag: "Classic North Balanced Meal",
          image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
          calories: 490,
          protein: 23,
          carbs: 74,
          fat: 10,
          fiber: 15,
          prepTime: "15 min",
          cookTime: "20 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Chickpea flour blend flatbread seasoned with kasuri methi, paired with cumin-garlic yellow toor dal, crisp salad, and roasted cumin buttermilk.",
          benefits: ["Gram flour lowers glycemic response", "Garlic dal aids cardiovascular health", "Hydrating cooling chhaas"],
          ingredients: [
            { name: "Besan & Atta Missi Roti", amount: "2 rotis" },
            { name: "Yellow Dal Tadka", amount: "1 bowl (180ml)" },
            { name: "Spiced Masala Chhaas", amount: "1 glass (200ml)" },
            { name: "Cucumber Onion Tomato Salad", amount: "1 bowl" }
          ],
          steps: [
            "Knead 50% besan and 50% atta with kasuri methi, ajwain, and onion.",
            "Roll into rotis and roast till crisp.",
            "Temper boiled yellow dal with cumin, hing, garlic, and fresh tomato.",
            "Serve thali style with fresh salad and chhaas."
          ],
          chefTips: "Missi roti has almost double the protein and fiber compared to refined maida naans.",
          youtubeVideos: [
            { id: "del-yt-4", title: "Authentic Dhaba Style Missi Roti on Tawa", duration: "7:40", channel: "Ranveer Brar", query: "missi roti recipe ranveer brar" },
            { id: "del-yt-5", title: "Yellow Dal Tadka Healthy Restaurant Style", duration: "9:00", channel: "Kabita's Kitchen", query: "yellow dal tadka recipe" },
            { id: "del-yt-6", title: "How to Make Refreshing Masala Chhaas", duration: "4:15", channel: "Sanjeev Kapoor Khazana", query: "masala chhaas buttermilk recipe" }
          ],
          orderQuery: "Missi Roti Dal Tadka Thali Delhi"
        }
      ],
      healthyMeals: [
        {
          id: "del-hm-1",
          title: "Kala Chana (Black Chickpea) Chaat with Pomegranate & Lemon",
          slotName: "Healthy Meals",
          time: "4:30 PM – 5:15 PM",
          emoji: "🥗",
          tag: "Clean High-Fiber Snack",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
          calories: 220,
          protein: 13,
          carbs: 36,
          fat: 3,
          fiber: 10,
          prepTime: "8 min",
          cookTime: "5 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Boiled black chickpeas tossed with chopped cucumbers, tomatoes, ruby pomegranate seeds, chaat masala, and fresh lemon juice.",
          benefits: ["Zero saturated fats", "High polyphenols from pomegranate", "Controls evening sugar cravings"],
          ingredients: [
            { name: "Boiled Kala Chana", amount: "1 cup" },
            { name: "Diced Cucumber & Tomato", amount: "1/2 cup" },
            { name: "Pomegranate Arils", amount: "2 tbsp" },
            { name: "Chaat Masala & Lime Juice", amount: "1 tsp" }
          ],
          steps: [
            "Combine boiled chickpeas with diced cucumbers, tomatoes, and green chilies.",
            "Sprinkle roasted cumin powder, rock salt, and chaat masala.",
            "Toss in sweet pomegranate arils and finish with fresh lemon juice."
          ],
          chefTips: "Keep boiled chana prepped in your fridge for a 2-minute instant wholesome meal.",
          youtubeVideos: [
            { id: "del-yt-7", title: "Street Style Kala Chana Chaat Healthy Recipe", duration: "6:20", channel: "Kabita's Kitchen", query: "kala chana chaat recipe healthy" },
            { id: "del-yt-8", title: "Best 4 PM Healthy Indian Snacks", duration: "8:50", channel: "Fit Tuber", query: "healthy 4pm snacks for fat loss india" },
            { id: "del-yt-9", title: "Black Chickpeas for Weight Loss & Muscles", duration: "5:00", channel: "Health Line", query: "black chickpeas health benefits" }
          ],
          orderQuery: "Kala Chana Chaat Delhi"
        }
      ],
      highProtein: [
        {
          id: "del-hp-1",
          title: "Palak Paneer with Multigrain Phulkas & Sprouted Moong Salad",
          slotName: "High Protein",
          time: "Lunch / Dinner",
          emoji: "💪",
          tag: "Muscle Building Classic",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 460,
          protein: 27,
          carbs: 48,
          fat: 14,
          fiber: 12,
          prepTime: "15 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Iron-rich blanched spinach gravy pureed with garlic and ginger, simmered with low-fat paneer cubes and served with multigrain phulkas.",
          benefits: ["27g Protein for tissue repair", "High folic acid and vitamin K", "Zero cream or excess butter"],
          ingredients: [
            { name: "Fresh Spinach Leaves (Palak)", amount: "2 large bunches" },
            { name: "Low-Fat Paneer Cubes", amount: "120g" },
            { name: "Whole Wheat Phulkas", amount: "2 pieces" },
            { name: "Garlic, Ginger & Green Chili", amount: "1 tbsp" }
          ],
          steps: [
            "Blanch spinach leaves in boiling water for 2 minutes and shock in ice water to retain bright green color.",
            "Puree spinach with green chili and ginger.",
            "Saute garlic and cumin, add spinach puree and paneer cubes; simmer gently for 4 minutes."
          ],
          chefTips: "Blanching and ice-shocking locks in chlorophyll, vitamin C, and bright green vibrancy.",
          youtubeVideos: [
            { id: "del-yt-10", title: "Healthy Zero Cream Palak Paneer", duration: "8:30", channel: "Ranveer Brar", query: "healthy palak paneer recipe low fat" },
            { id: "del-yt-11", title: "How to Retain Green Color in Palak Gravy", duration: "4:50", channel: "Chef Special", query: "keep palak green cooking trick" },
            { id: "del-yt-12", title: "Vegetarian High Protein North Indian Diet", duration: "10:00", channel: "Fit Muscle", query: "vegetarian bodybuilding north indian" }
          ],
          orderQuery: "Palak Paneer Meal Delhi"
        }
      ],
      dinner: [
        {
          id: "del-dn-1",
          title: "Lauki (Bottle Gourd) & Moong Dal Khichdi with Roasted Papad & Curd",
          slotName: "Dinner",
          time: "8:00 PM – 8:30 PM",
          emoji: "🌙",
          tag: "Gentle Night Recovery",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
          calories: 330,
          protein: 14,
          carbs: 56,
          fat: 5,
          fiber: 10,
          prepTime: "10 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "High-hydration bottle gourd simmered with yellow split moong dal and brown rice, seasoned with cumin and ginger.",
          benefits: ["96% Water content from bottle gourd cools body", "Low sodium protects nighttime blood pressure", "Easy digestion"],
          ingredients: [
            { name: "Grated Bottle Gourd (Lauki)", amount: "1 cup" },
            { name: "Yellow Moong Dal & Rice", amount: "1/2 cup" },
            { name: "Cumin, Ginger & Hing", amount: "1 tsp" }
          ],
          steps: [
            "Saute cumin, ginger, and hing in pressure cooker.",
            "Add grated bottle gourd, moong dal, rice, turmeric, and 3 cups water.",
            "Cook for 3 whistles and serve warm with roasted papad."
          ],
          chefTips: "Bottle gourd is an Ayurvedic superfood for calming the liver and improving sleep.",
          youtubeVideos: [
            { id: "del-yt-13", title: "Lauki Khichdi for Weight Loss & Light Dinner", duration: "6:40", channel: "Skinny Recipes", query: "lauki khichdi recipe healthy" },
            { id: "del-yt-14", title: "Health Benefits of Bottle Gourd / Lauki", duration: "5:20", channel: "Ayurveda Doctor", query: "lauki health benefits weight loss digestion" },
            { id: "del-yt-15", title: "Best Light Indian Dinners for Good Sleep", duration: "7:10", channel: "Fit Tuber", query: "light dinner recipes indian healthy" }
          ],
          orderQuery: "Lauki Khichdi Delhi"
        }
      ]
    }
  },

  {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    regionName: "Chennai, Tamil Nadu",
    emoji: "🌴",
    tagline: "Low-GI Millets, Drumstick Sambar & Probiotic Neer Mor",
    coordinates: { lat: 13.0827, lon: 80.2707 },
    popularFoods: ["Kambu Idli", "Drumstick Sambar", "Kootu", "Neer Mor", "Sundal", "Ragi Dosa", "Thinai Pongal"],
    healthyKitchens: ["Sangeetha Vegetarian", "ID Fresh Tiffin", "Khandani Rajdhani", "Arogya Millet Kitchen Chennai"],
    dishes: {
      breakfast: [
        {
          id: "chn-bf-1",
          title: "Steamed Kambu (Pearl Millet) Idli with Drumstick Sambar & Coriander Chutney",
          slotName: "Breakfast",
          time: "8:00 AM – 8:30 AM",
          emoji: "🥣",
          tag: "Low-GI Traditional Steam",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
          calories: 290,
          protein: 11,
          carbs: 48,
          fat: 4,
          fiber: 9,
          prepTime: "10 min",
          cookTime: "12 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Fluffy steamed idlis prepared from pearl millet and black gram batter, paired with authentic Tamil Nadu drumstick sambar.",
          benefits: ["Rich in iron and magnesium", "Completely steam-cooked with 0 oil", "Probiotics from overnight fermentation"],
          ingredients: [
            { name: "Kambu (Pearl Millet) Flour", amount: "1 cup" },
            { name: "Urad Dal", amount: "1/4 cup" },
            { name: "Drumstick Sambar", amount: "1 bowl" },
            { name: "Fresh Coriander Chutney", amount: "2 tbsp" }
          ],
          steps: [
            "Ferment millet and urad dal batter overnight for 8 hours.",
            "Pour into idli plates and steam for 10-12 minutes.",
            "Serve hot with aromatic Madras drumstick sambar."
          ],
          chefTips: "Pearl millet contains exceptional iron, making it ideal for combating anemia.",
          youtubeVideos: [
            { id: "chn-yt-1", title: "Soft Kambu Idli Recipe Step-by-Step", duration: "7:10", channel: "Madras Samayal", query: "kambu idli recipe tamil" },
            { id: "chn-yt-2", title: "Authentic Tamil Nadu Drumstick Sambar", duration: "9:00", channel: "Venkatesh Bhat", query: "tamil nadu sambar authentic recipe" },
            { id: "chn-yt-3", title: "Pearl Millet Health Benefits Explained", duration: "5:40", channel: "Nutrition Tamil", query: "kambu benefits health weight loss" }
          ],
          orderQuery: "Millet Idli Sambar Chennai"
        }
      ],
      lunch: [
        {
          id: "chn-lu-1",
          title: "Brown Matta Rice with Vazhaithandu (Banana Stem) Kootu & Moong Sundal",
          slotName: "Lunch",
          time: "1:00 PM – 1:45 PM",
          emoji: "🍛",
          tag: "Kidney Cleansing & High Fiber",
          image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
          calories: 460,
          protein: 19,
          carbs: 72,
          fat: 8,
          fiber: 16,
          prepTime: "15 min",
          cookTime: "22 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Wholesome red matta rice paired with fiber-packed banana stem and yellow moong dal kootu, steamed sundal, and digestive Neer Mor.",
          benefits: ["Banana stem prevents renal stones", "Matta rice has low glycemic index", "Neer mor cools core temperature"],
          ingredients: [
            { name: "Steamed Matta Brown Rice", amount: "1 cup" },
            { name: "Banana Stem (Vazhaithandu) & Dal Kootu", amount: "1 bowl" },
            { name: "Moong Dal Sundal", amount: "1 cup" },
            { name: "Neer Mor (Spiced Buttermilk with Hing)", amount: "1 glass" }
          ],
          steps: [
            "Dice banana stem finely and cook with yellow moong dal, turmeric, and mild spices.",
            "Temper with mustard seeds and curry leaves.",
            "Serve hot over brown matta rice with a side of steamed sundal and Neer Mor."
          ],
          chefTips: "Banana stem juice and cooked kootu are prized in Siddha medicine for urinary and kidney health.",
          youtubeVideos: [
            { id: "chn-yt-4", title: "Vazhaithandu Kootu Recipe", duration: "8:20", channel: "Madras Samayal", query: "vazhaithandu kootu recipe tamil" },
            { id: "chn-yt-5", title: "Neer Mor Spiced Buttermilk Recipe", duration: "4:15", channel: "Home Cooking Tamil", query: "neer mor recipe authentic" },
            { id: "chn-yt-6", title: "South Indian Healthy Lunch Thali", duration: "10:30", channel: "Flavors of Tamil Nadu", query: "healthy south indian lunch thali" }
          ],
          orderQuery: "South Indian Sambar Kootu Meals Chennai"
        }
      ],
      healthyMeals: [
        {
          id: "chn-hm-1",
          title: "Kondakadalai (Black Chickpea) Sundal with Coconut & Mustard",
          slotName: "Healthy Meals",
          time: "4:45 PM – 5:30 PM",
          emoji: "🥗",
          tag: "Temple Protein Snack",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
          calories: 210,
          protein: 13,
          carbs: 33,
          fat: 3,
          fiber: 9,
          prepTime: "5 min",
          cookTime: "8 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Boiled black chickpeas tempered with mustard seeds, urad dal, green chilies, curry leaves, and a sprinkle of grated coconut.",
          benefits: ["Zero refined sugar", "High satiety score", "Quick preparation"],
          ingredients: [
            { name: "Boiled Black Chickpeas", amount: "1 cup" },
            { name: "Mustard, Urad Dal & Asafoetida", amount: "1/2 tsp" },
            { name: "Fresh Grated Coconut", amount: "1 tbsp" }
          ],
          steps: [
            "Temper mustard seeds, urad dal, green chili, and hing in 1/2 tsp coconut oil.",
            "Add boiled black chickpeas and salt, toss for 2-3 minutes.",
            "Garnish with grated coconut and serve warm."
          ],
          chefTips: "Asafoetida (hing) in tempering ensures zero flatulence from chickpeas.",
          youtubeVideos: [
            { id: "chn-yt-7", title: "Traditional Kondakadalai Sundal Recipe", duration: "5:30", channel: "Madras Samayal", query: "kondakadalai sundal recipe tamil" },
            { id: "chn-yt-8", title: "High Protein Evening Snacks Tamil", duration: "7:45", channel: "Health Tamil", query: "healthy evening snacks weight loss tamil" },
            { id: "chn-yt-9", title: "Benefits of Spices in South Indian Cooking", duration: "6:10", channel: "Doctor Talk", query: "south indian spices health benefits" }
          ],
          orderQuery: "Sundal Snack Chennai"
        }
      ],
      highProtein: [
        {
          id: "chn-hp-1",
          title: "Adai (Multi-Lentil High-Protein Crepe) with Avial & Neer Mor",
          slotName: "High Protein",
          time: "Lunch / Dinner",
          emoji: "💪",
          tag: "Ancient Protein Powerhouse",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 440,
          protein: 26,
          carbs: 56,
          fat: 10,
          fiber: 14,
          prepTime: "15 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Coarsely ground batter of toor dal, chana dal, moong dal, and urad dal with red chilies and fennel, served with coconut-curd vegetable avial.",
          benefits: ["4 Combined lentils for maximum protein", "Zero refined rice flour", "High mineral density"],
          ingredients: [
            { name: "Mixed Lentil Adai Batter", amount: "1 cup" },
            { name: "Mixed Vegetable Avial", amount: "1 bowl" },
            { name: "Chilled Neer Mor", amount: "1 glass" }
          ],
          steps: [
            "Grind soaked toor, chana, moong, and urad dal with dry red chilies and fennel seeds.",
            "Spread thick on a hot cast iron tawa and roast with a few drops of sesame oil.",
            "Serve hot with rich vegetable avial."
          ],
          chefTips: "Adai does not require overnight fermentation, making it a quick high-protein staple.",
          youtubeVideos: [
            { id: "chn-yt-10", title: "Crispy Healthy Adai Avial Recipe", duration: "9:10", channel: "Madras Samayal", query: "adai avial recipe authentic tamil" },
            { id: "chn-yt-11", title: "High Protein Lentil Crepes for Bodybuilding", duration: "8:00", channel: "Fit Muscle", query: "lentil dosa high protein recipe" },
            { id: "chn-yt-12", title: "Authentic Kerala & Tamil Avial Recipe", duration: "7:15", channel: "Venkatesh Bhat", query: "avial recipe authentic south indian" }
          ],
          orderQuery: "Adai Avial Chennai"
        }
      ],
      dinner: [
        {
          id: "chn-dn-1",
          title: "Thinai (Foxtail Millet) Dosa with Peerkangai (Ridge Gourd) Thogayal & Rasam",
          slotName: "Dinner",
          time: "7:45 PM – 8:30 PM",
          emoji: "🌙",
          tag: "Light Detox Night Meal",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
          calories: 330,
          protein: 12,
          carbs: 56,
          fat: 6,
          fiber: 11,
          prepTime: "10 min",
          cookTime: "12 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Crispy thin foxtail millet crepes served with cooling ridge gourd peel chutney and cumin-pepper medicinal rasam.",
          benefits: ["Ridge gourd thogayal contains cellulose fiber", "Rasam enhances nocturnal digestive enzymes", "Millet promotes steady sleep"],
          ingredients: [
            { name: "Foxtail Millet Dosa Batter", amount: "1 cup" },
            { name: "Ridge Gourd Thogayal", amount: "2 tbsp" },
            { name: "Pepper Cumin Rasam", amount: "1 small bowl" }
          ],
          steps: [
            "Pour foxtail millet batter onto hot tawa and spread thinly.",
            "Roast with minimal cold-pressed sesame oil until crisp.",
            "Sip warm rasam and enjoy with ridge gourd thogayal."
          ],
          chefTips: "Black pepper and cumin in South Indian rasam stimulate natural bile and enzyme secretion.",
          youtubeVideos: [
            { id: "chn-yt-13", title: "Foxtail Millet Dosa Recipe", duration: "6:50", channel: "Madras Samayal", query: "thinai dosa recipe foxtail millet" },
            { id: "chn-yt-14", title: "Peerkangai Thogayal Authentic Tamil Chutney", duration: "5:20", channel: "Home Cooking Tamil", query: "peerkangai thogayal recipe" },
            { id: "chn-yt-15", title: "Immunity Boosting Pepper Rasam Recipe", duration: "6:00", channel: "Venkatesh Bhat", query: "milagu rasam pepper rasam recipe" }
          ],
          orderQuery: "Millet Dosa Rasam Chennai"
        }
      ]
    }
  },

  {
    city: "Hyderabad",
    state: "Andhra Pradesh & Telangana",
    country: "India",
    regionName: "Hyderabad, Telangana",
    emoji: "💎",
    tagline: "High-Protein Whole Grains, Pesarattu & Green Leafy Diet",
    coordinates: { lat: 17.3850, lon: 78.4867 },
    popularFoods: ["Pesarattu", "Gongura Pappu", "Allam Chutney", "Majjiga", "Jonna Rotti", "Ragi Sangati", "Senagalu"],
    healthyKitchens: ["Chutneys Healthy Section Banjara", "Minerva Coffee Shop", "Santosh Dhaba Exclusive", "Millet Express Hyderabad"],
    dishes: {
      breakfast: [
        {
          id: "hyd-bf-1",
          title: "Whole Green Moong Pesarattu with Ginger (Allam) Chutney & Upma",
          slotName: "Breakfast",
          time: "8:00 AM – 8:30 AM",
          emoji: "🥣",
          tag: "Zero-Rice Pure Protein Crepe",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
          calories: 350,
          protein: 17,
          carbs: 52,
          fat: 6,
          fiber: 12,
          prepTime: "10 min",
          cookTime: "10 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Legendary Andhra crepe prepared entirely from soaked whole green moong beans and ginger, served with tangy jaggery-ginger digestive chutney.",
          benefits: ["17g Protein per serving", "Zero polished white rice in batter", "Ginger stimulates metabolic rate"],
          ingredients: [
            { name: "Whole Green Moong (soaked)", amount: "1 cup" },
            { name: "Ginger, Cumin & Green Chilies", amount: "1 tbsp" },
            { name: "Allam (Ginger) Chutney", amount: "2 tbsp" }
          ],
          steps: [
            "Grind soaked whole moong with fresh ginger, green chilies, and cumin to a smooth crepe batter.",
            "Spread on hot iron tava, sprinkle finely chopped onions, and roast till golden and crisp.",
            "Serve hot with authentic Allam Pachadi."
          ],
          chefTips: "Use whole unpeeled green moong to keep all insoluble fiber and antioxidant flavonoids.",
          youtubeVideos: [
            { id: "hyd-yt-1", title: "Authentic Andhra MLA Pesarattu Recipe", duration: "8:30", channel: "Vismai Food", query: "pesarattu recipe vismai food" },
            { id: "hyd-yt-2", title: "Authentic Allam Chutney for Pesarattu", duration: "6:10", channel: "Amma Chethi Vanta", query: "allam pachadi recipe authentic andhra" },
            { id: "hyd-yt-3", title: "Why Pesarattu is the Best Breakfast for Diabetes", duration: "5:15", channel: "Nutrition Telugu", query: "pesarattu benefits for diabetes weight loss" }
          ],
          orderQuery: "Pesarattu Allam Chutney Hyderabad"
        }
      ],
      lunch: [
        {
          id: "hyd-lu-1",
          title: "Brown Rice with Gongura Pappu (Sorrel Leaf Dal) & Majjiga",
          slotName: "Lunch",
          time: "1:00 PM – 1:45 PM",
          emoji: "🍛",
          tag: "Vitamin-C & Iron Rich Thali",
          image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
          calories: 480,
          protein: 21,
          carbs: 74,
          fat: 9,
          fiber: 15,
          prepTime: "15 min",
          cookTime: "20 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Tangy sorrel leaves simmered with yellow toor dal, garlic, and green chilies, served with steamed brown rice and cumin-infused Majjiga.",
          benefits: ["Sorrel leaves are packed with bioavailable Vitamin C & Iron", "High satiety", "Natural digestive acidity"],
          ingredients: [
            { name: "Fresh Gongura (Sorrel) Leaves", amount: "2 bunches" },
            { name: "Toor Dal", amount: "1/2 cup" },
            { name: "Steamed Brown Rice", amount: "1 cup" },
            { name: "Spiced Majjiga (Buttermilk)", amount: "1 glass" }
          ],
          steps: [
            "Cook toor dal with washed gongura leaves, green chilies, and garlic until soft.",
            "Mash smoothly with a wooden masher (dal kavvam).",
            "Temper with mustard seeds, dry red chilies, and garlic in 1/2 tsp oil.",
            "Serve warm with steamed brown rice and cool buttermilk."
          ],
          chefTips: "Vitamin C in gongura leaves boosts non-heme iron absorption from dal by 300%.",
          youtubeVideos: [
            { id: "hyd-yt-4", title: "Authentic Andhra Gongura Pappu Recipe", duration: "9:00", channel: "Vismai Food", query: "gongura pappu recipe vismai food" },
            { id: "hyd-yt-5", title: "How to Make Refreshing Andhra Majjiga", duration: "4:30", channel: "Amma Chethi Vanta", query: "majjiga recipe telugu buttermilk" },
            { id: "hyd-yt-6", title: "Nutritional Power of Gongura Leaves", duration: "5:50", channel: "Health Telugu", query: "gongura health benefits iron vitamin c" }
          ],
          orderQuery: "Gongura Pappu Meals Hyderabad"
        }
      ],
      healthyMeals: [
        {
          id: "hyd-hm-1",
          title: "Guggillu (Steamed Chickpea & Green Gram Usli) with Coconut",
          slotName: "Healthy Meals",
          time: "4:30 PM – 5:15 PM",
          emoji: "🥗",
          tag: "Clean Telugu Snack",
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
          calories: 210,
          protein: 13,
          carbs: 34,
          fat: 3,
          fiber: 8,
          prepTime: "5 min",
          cookTime: "8 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Steamed whole legumes tempered in traditional Telugu style with mustard, curry leaves, ginger, and raw grated coconut.",
          benefits: ["Zero processed sugar", "High satiety", "Easy preparation"],
          ingredients: [
            { name: "Boiled Chickpeas / Moong", amount: "1 cup" },
            { name: "Mustard, Green Chilies & Ginger", amount: "1 tsp" },
            { name: "Grated Coconut & Cilantro", amount: "1 tbsp" }
          ],
          steps: [
            "Temper mustard seeds, ginger, green chilies, and curry leaves in 1/2 tsp cold-pressed peanut oil.",
            "Add boiled legumes, toss for 3 minutes.",
            "Garnish with fresh coconut."
          ],
          chefTips: "Add a squeeze of fresh lime juice right before serving for refreshing flavor.",
          youtubeVideos: [
            { id: "hyd-yt-7", title: "Senagala Guggillu Recipe Telugu", duration: "5:15", channel: "Amma Chethi Vanta", query: "senagala guggillu recipe telugu" },
            { id: "hyd-yt-8", title: "Healthy Evening Snacks in Telugu", duration: "8:20", channel: "Vismai Food", query: "healthy evening snacks vismai food" },
            { id: "hyd-yt-9", title: "Legume Nutrition for Muscle & Energy", duration: "6:00", channel: "Doctor Diet Telugu", query: "chickpeas nutrition telugu health" }
          ],
          orderQuery: "Guggillu Snack Hyderabad"
        }
      ],
      highProtein: [
        {
          id: "hyd-hp-1",
          title: "Steamed Ragi Sangati with Soya Chunk & Palak Curry",
          slotName: "High Protein",
          time: "Lunch / Dinner",
          emoji: "💪",
          tag: "Rayalaseema Power Meal",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          calories: 460,
          protein: 29,
          carbs: 64,
          fat: 8,
          fiber: 16,
          prepTime: "15 min",
          cookTime: "20 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Traditional Rayalaseema steamed finger millet ball served with high-protein soya chunk and spinach curry.",
          benefits: ["29g Plant protein", "High calcium from finger millet", "Exceptional endurance fuel"],
          ingredients: [
            { name: "Ragi Flour & Broken Rice", amount: "1 cup" },
            { name: "Soya Chunks (boiled)", amount: "1 cup" },
            { name: "Palak (Spinach) Puree & Spices", amount: "1 bowl" }
          ],
          steps: [
            "Cook broken rice and ragi flour into smooth Ragi Sangati balls.",
            "Simmer boiled soya chunks in spiced spinach gravy.",
            "Submerge sangati in warm curry and enjoy."
          ],
          chefTips: "Soya chunks provide over 52g protein per 100g dry weight, making them one of the richest plant proteins on earth.",
          youtubeVideos: [
            { id: "hyd-yt-10", title: "Rayalaseema Style Ragi Sangati Recipe", duration: "9:20", channel: "Vismai Food", query: "ragi sangati recipe vismai food" },
            { id: "hyd-yt-11", title: "High Protein Soya Curry for Muscle Gain", duration: "8:00", channel: "Amma Chethi Vanta", query: "soya chunks curry recipe telugu" },
            { id: "hyd-yt-12", title: "Top High Protein Vegetarian Foods in Telugu", duration: "10:00", channel: "Telugu Fitness", query: "high protein veg diet telugu" }
          ],
          orderQuery: "Ragi Sangati Curry Hyderabad"
        }
      ],
      dinner: [
        {
          id: "hyd-dn-1",
          title: "Jonna (Sorghum) Rotti with Tomato Dal & Cucumber Salad",
          slotName: "Dinner",
          time: "7:45 PM – 8:30 PM",
          emoji: "🌙",
          tag: "Light Telangana Sorghum Dinner",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
          calories: 360,
          protein: 14,
          carbs: 62,
          fat: 6,
          fiber: 12,
          prepTime: "15 min",
          cookTime: "15 min",
          isVeg: true,
          dietType: "Vegetarian",
          description: "Authentic hand-patted white sorghum roti roasted oil-free, served with tangy tomato toor dal and fresh cucumber ribbons.",
          benefits: ["Zero gluten", "Rich in dietary fiber", "Supports restful sleep"],
          ingredients: [
            { name: "Jonna (Jowar) Flour", amount: "1 cup" },
            { name: "Tomato Toor Dal", amount: "1 bowl" },
            { name: "Fresh Cucumber Slices", amount: "1 cup" }
          ],
          steps: [
            "Knead jowar flour with boiling hot water into smooth dough.",
            "Pat out thin rottis and roast on high heat, brushing water on top.",
            "Serve hot with tomato dal."
          ],
          chefTips: "White sorghum grown in Telangana is naturally low-GI and exceptionally rich in copper and magnesium.",
          youtubeVideos: [
            { id: "hyd-yt-13", title: "Jonna Rotte Recipe Perfect Soft Round", duration: "8:40", channel: "Vismai Food", query: "jonna rotte recipe vismai food" },
            { id: "hyd-yt-14", title: "Tomato Pappu Authentic Andhra Recipe", duration: "6:50", channel: "Amma Chethi Vanta", query: "tomato pappu recipe telugu" },
            { id: "hyd-yt-15", title: "Healthy Sorghum Benefits for Glucose Control", duration: "5:30", channel: "Doctor Diet Telugu", query: "jowar jonna rotti health benefits" }
          ],
          orderQuery: "Jonna Rotti Dal Hyderabad"
        }
      ]
    }
  }
];

// Helper to normalize location queries
export function normalizeLocationQuery(query = "") {
  const q = (query || "").toLowerCase().trim();
  if (q.includes("bengaluru") || q.includes("bangalore") || q.includes("karnataka") || q.includes("mysore") || q.includes("mysuru") || q.includes("hubli") || q.includes("mangalore")) {
    return "Bengaluru";
  }
  if (q.includes("mumbai") || q.includes("bombay") || q.includes("maharashtra") || q.includes("pune") || q.includes("nagpur") || q.includes("nashik")) {
    return "Mumbai";
  }
  if (q.includes("delhi") || q.includes("new delhi") || q.includes("ncr") || q.includes("noida") || q.includes("gurgaon") || q.includes("haryana") || q.includes("punjab")) {
    return "Delhi";
  }
  if (q.includes("chennai") || q.includes("madras") || q.includes("tamil") || q.includes("coimbatore") || q.includes("madurai")) {
    return "Chennai";
  }
  if (q.includes("hyderabad") || q.includes("telangana") || q.includes("andhra") || q.includes("vizag") || q.includes("vijayawada")) {
    return "Hyderabad";
  }
  return "Bengaluru";
}

// Get Location Food Data Object for given city / state
export function getLocationFoodData(city = "Bengaluru", state = "Karnataka", country = "India") {
  const normCity = normalizeLocationQuery(`${city} ${state} ${country}`);
  const match = MAJOR_LOCATIONS.find((loc) => loc.city.toLowerCase() === normCity.toLowerCase());
  return match || MAJOR_LOCATIONS[0];
}

// Client Reverse-Geocoder: Match coordinates to nearest known city using Euclidean / Haversine distance
export function getNearestCityFromCoords(lat, lon) {
  if (typeof lat !== "number" || typeof lon !== "number" || isNaN(lat) || isNaN(lon)) {
    return MAJOR_LOCATIONS[0];
  }

  let minDistance = Infinity;
  let nearest = MAJOR_LOCATIONS[0];

  for (const loc of MAJOR_LOCATIONS) {
    const dLat = loc.coordinates.lat - lat;
    const dLon = loc.coordinates.lon - lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < minDistance) {
      minDistance = distSq;
      nearest = loc;
    }
  }

  return nearest;
}

// All available locations list for selector
export function getAllLocationsList() {
  return MAJOR_LOCATIONS.map((loc) => ({
    city: loc.city,
    state: loc.state,
    country: loc.country,
    regionName: loc.regionName,
    emoji: loc.emoji,
    tagline: loc.tagline
  }));
}
