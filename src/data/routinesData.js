import { REGIONAL_ROUTINES_MAP } from "./regionalCuisinesData";

export const BASE_ROUTINES_DATA = [
  {
    id: "diabetes-friendly",
    slug: "diabetes-friendly",
    title: "Diabetes-Friendly Low-GI Routine",
    subtitle: "Clinically balanced low-glycemic meal sequence for steady blood sugar and sustained energy.",
    category: "Health & Wellness",
    categoryId: "health-wellness",
    badge: "Metabolic Balance",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    description: "Designed around complex soluble fibers, healthy monounsaturated fats, and lean proteins to avoid glucose spikes while keeping you full and energised all day.",
    difficulty: "Easy",
    mealsCount: 6,
    prepTimeAvg: "15-20 min",
    calories: 1750,
    protein: 88,
    carbs: 165,
    fat: 52,
    fiber: 42,
    rating: 4.9,
    reviewsCount: 342,
    tags: ["Low Glycemic", "High Fiber", "Heart Safe", "Sugar Smart", "Vegetarian Friendly"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "For general educational guidance only. Consult a qualified healthcare professional or certified diabetes educator for personalized medical nutrition advice.",
    dailyTimeline: [
      {
        id: "df-m1",
        slotName: "Morning",
        time: "6:30 AM – 7:00 AM",
        icon: "Sun",
        emoji: "🌅",
        title: "Fenugreek-Cinnamon Elixir & Soaked Nuts",
        tag: "Pre-Breakfast Hydration",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        calories: 110,
        protein: 4,
        carbs: 5,
        fat: 9,
        prepTime: "5 min",
        cookTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Warm water infused with crushed Ceylon cinnamon and overnight soaked fenugreek seeds, paired with 5 soaked California almonds and 2 walnut halves.",
        benefits: ["Enhances insulin sensitivity", "Supplies natural Omega-3s", "Gentle digestive warmup"],
        ingredients: [
          { name: "Ceylon Cinnamon Stick", amount: "1 small piece (cracked)" },
          { name: "Fenugreek Seeds (Methi)", amount: "1/2 tsp (soaked overnight)" },
          { name: "Warm Filtered Water", amount: "300 ml" },
          { name: "Soaked Almonds (peeled)", amount: "5 pieces" },
          { name: "Walnut Halves", amount: "2 pieces" }
        ],
        steps: [
          "Boil 300ml water with the cracked cinnamon stick and soaked fenugreek seeds for 3-4 minutes.",
          "Strain the liquid into your favorite mug.",
          "Peel the soaked almonds and serve alongside whole raw walnuts.",
          "Sip warmly on an empty stomach 30 minutes prior to breakfast."
        ],
        chefTips: "Always use Ceylon cinnamon instead of Cassia to avoid excess coumarin intake.",
        youtubeVideos: [
          { id: "yt1", title: "Cinnamon & Fenugreek Water Benefits for Glucose", duration: "6:14", channel: "Health Matters", query: "fenugreek cinnamon water benefits" },
          { id: "yt2", title: "Morning Routine for Blood Sugar Control", duration: "8:45", channel: "Nutrition Doctor", query: "morning routine diabetes control" },
          { id: "yt3", title: "How to Properly Soak Nuts for Digestion", duration: "4:20", channel: "Holistic Health", query: "how to soak almonds walnuts digestion" }
        ],
        orderQuery: "Herbal Green Tea Almonds"
      },
      {
        id: "df-m2",
        slotName: "Breakfast",
        time: "8:30 AM – 9:00 AM",
        icon: "Coffee",
        emoji: "🥣",
        title: "Steel-Cut Oats with Chia, Walnuts & Wild Berries",
        tag: "Slow-Release Energy",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        calories: 380,
        protein: 16,
        carbs: 48,
        fat: 14,
        prepTime: "10 min",
        cookTime: "12 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Nutty steel-cut oatmeal slow cooked in unsweetened almond milk, topped with chia seeds, toasted pumpkin seeds, and fresh antioxidant-rich blueberries.",
        benefits: ["Beta-glucan reduces LDL cholesterol", "Zero refined sugar", "High satiety score"],
        ingredients: [
          { name: "Steel-Cut Oats (dry)", amount: "40g (approx 1/2 cup)" },
          { name: "Unsweetened Almond Milk", amount: "250 ml" },
          { name: "Black Chia Seeds", amount: "1 tbsp" },
          { name: "Fresh Blueberries / Strawberries", amount: "1/3 cup" },
          { name: "Pumpkin Seeds", amount: "1 tsp" },
          { name: "Ground Nutmeg & Cinnamon", amount: "1 pinch each" }
        ],
        steps: [
          "In a small saucepan, bring almond milk to a gentle simmer.",
          "Add steel-cut oats, lower heat to medium-low, cover and simmer for 10-12 minutes until thick and creamy.",
          "Stir in chia seeds and a pinch of ground cinnamon.",
          "Pour into a warm bowl and top with fresh berries and toasted pumpkin seeds."
        ],
        chefTips: "Avoid instant quick oats as they have a significantly higher GI rating than coarse steel-cut or rolled groats.",
        youtubeVideos: [
          { id: "yt1", title: "Perfect Low-GI Steel Cut Oats Guide", duration: "7:20", channel: "The Diabetic Kitchen", query: "steel cut oats for diabetes" },
          { id: "yt2", title: "5 Low Glycemic Breakfast Ideas", duration: "11:05", channel: "Clean Eating", query: "low glycemic breakfast recipes" },
          { id: "yt3", title: "Why Chia Seeds Control Glucose Spikes", duration: "5:15", channel: "Nutrition Science", query: "chia seeds blood sugar" }
        ],
        orderQuery: "Oatmeal Bowl with Berries"
      },
      {
        id: "df-m3",
        slotName: "Afternoon",
        time: "11:30 AM – 12:00 PM",
        icon: "GlassWater",
        emoji: "☀️",
        title: "Cold-Pressed Cucumber, Celery & Mint Green Hydrator",
        tag: "Electrolyte & Greens Boost",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80",
        calories: 65,
        protein: 3,
        carbs: 11,
        fat: 1,
        prepTime: "5 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Ultra-refreshing, fiber-rich cold blended green tonic made with crisp English cucumber, celery stalks, fresh mint, ginger root, and a splash of lime.",
        benefits: ["Alkalizing & anti-inflammatory", "Naturally rich in potassium", "Zero fruit sugars"],
        ingredients: [
          { name: "English Cucumber (with peel)", amount: "1 whole" },
          { name: "Crisp Celery Stalks", amount: "2 stalks" },
          { name: "Fresh Mint Leaves", amount: "1 handful" },
          { name: "Fresh Ginger Root", amount: "1/2 inch slice" },
          { name: "Fresh Lime Juice", amount: "1 tbsp" },
          { name: "Himalayan Pink Salt", amount: "1 tiny pinch" }
        ],
        steps: [
          "Wash cucumber, celery, and mint thoroughly under cold water.",
          "Chop roughly and feed through a cold press juicer or high-speed blender with 100ml water.",
          "Add fresh lime juice and a dash of pink salt. Serve immediately over ice."
        ],
        chefTips: "Keep the natural pulp whenever possible to retain insoluble gut-friendly fiber.",
        youtubeVideos: [
          { id: "yt1", title: "Sugar-Free Green Juice for Glucose Health", duration: "5:40", channel: "Green Living", query: "sugar free green juice recipe" },
          { id: "yt2", title: "The Anti-Inflammatory Celery Mint Tonic", duration: "4:50", channel: "Juice Lab", query: "celery cucumber mint juice" },
          { id: "yt3", title: "Benefits of Cucumber & Celery Juice", duration: "6:10", channel: "Dr. Health", query: "benefits cucumber celery juice" }
        ],
        orderQuery: "Cold Pressed Green Juice"
      },
      {
        id: "df-m4",
        slotName: "Lunch",
        time: "1:30 PM – 2:15 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "Grilled Herbed Tofu & Quinoa Power Bowl",
        tag: "Balanced Macro Fuel",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 520,
        protein: 28,
        carbs: 52,
        fat: 18,
        prepTime: "15 min",
        cookTime: "15 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Marinated pan-seared organic tofu cubes on a bed of fluffy tricolor quinoa, steamed broccoli florets, edamame, and a creamy lemon-tahini dressing.",
        benefits: ["Complete amino acid profile", "Rich in isoflavones & sulforaphane", "Extended 4-hour satiety"],
        ingredients: [
          { name: "Firm Organic Tofu (pressed & cubed)", amount: "150g" },
          { name: "Cooked Tricolor Quinoa", amount: "1 cup (185g)" },
          { name: "Broccoli Florets (steamed)", amount: "1 cup" },
          { name: "Shelled Edamame Beans", amount: "1/4 cup" },
          { name: "Tahini (sesame paste)", amount: "1.5 tbsp" },
          { name: "Extra Virgin Olive Oil", amount: "1 tsp" },
          { name: "Garlic powder, smoked paprika, lemon", amount: "To taste" }
        ],
        steps: [
          "Toss tofu cubes with olive oil, paprika, garlic powder, and a pinch of sea salt.",
          "Pan-sear on a cast iron skillet for 7-8 minutes until golden crisp on all edges.",
          "In a bowl, layer cooked quinoa as the base, add steamed broccoli, edamame, and crispy tofu.",
          "Whisk tahini with warm water, lemon juice, and drizzle generously over the bowl."
        ],
        chefTips: "Pressing the tofu with a clean kitchen towel for 10 minutes beforehand guarantees maximum crispiness.",
        youtubeVideos: [
          { id: "yt1", title: "Crispy Pan-Seared Tofu Quinoa Bowl", duration: "9:15", channel: "Fit Meals Everyday", query: "tofu quinoa bowl recipe" },
          { id: "yt2", title: "Meal Prep Low Glycemic Bowls", duration: "12:30", channel: "Plant Power", query: "low glycemic lunch meal prep" },
          { id: "yt3", title: "How to Make Golden Tofu Perfectly", duration: "6:45", channel: "Culinary Tech", query: "how to make golden crispy tofu" }
        ],
        orderQuery: "Tofu Quinoa Salad Bowl"
      },
      {
        id: "df-m5",
        slotName: "Evening Snack",
        time: "5:00 PM – 5:30 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Spiced Roasted Makhana & Jasmine Green Tea",
        tag: "Crispy Guilt-Free Crunch",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
        calories: 165,
        protein: 6,
        carbs: 22,
        fat: 5,
        prepTime: "5 min",
        cookTime: "8 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Slow-roasted foxnuts seasoned with cold-pressed olive oil, roasted cumin, turmeric, and pink rock salt, served with antioxidant hot green tea.",
        benefits: ["Very low glycemic index (<40)", "Rich in magnesium and flavonoids", "Replaces fried potato snacks"],
        ingredients: [
          { name: "Raw Makhana (Foxnuts)", amount: "35g (approx 2 cups)" },
          { name: "Extra Virgin Olive Oil / Ghee", amount: "1/2 tsp" },
          { name: "Turmeric Powder", amount: "1/4 tsp" },
          { name: "Roasted Cumin Powder (Jeera)", amount: "1/2 tsp" },
          { name: "Pink Rock Salt (Sendha Namak)", amount: "To taste" },
          { name: "Loose Leaf Jasmine Green Tea", amount: "1 tsp" }
        ],
        steps: [
          "Heat olive oil in a wide heavy-bottom pan on low flame.",
          "Add raw makhana and slow roast for 6-8 minutes, stirring continuously until crunchy.",
          "Sprinkle turmeric, cumin powder, and pink salt. Toss vigorously and remove from heat.",
          "Brew green tea in 85°C water for 3 minutes. Enjoy alongside the crispy makhana."
        ],
        chefTips: "Store extra roasted makhana in an airtight glass container to preserve the crunch for up to a week.",
        youtubeVideos: [
          { id: "yt1", title: "5 Flavor Variations for Roasted Makhana", duration: "7:05", channel: "Snack Smart", query: "roasted makhana recipes flavors" },
          { id: "yt2", title: "Why Foxnuts are the Best Diabetes Snack", duration: "5:50", channel: "Wellness Daily", query: "makhana foxnuts diabetes benefits" },
          { id: "yt3", title: "Brewing Green Tea The Right Way", duration: "4:15", channel: "Tea Masters", query: "how to brew green tea without bitterness" }
        ],
        orderQuery: "Roasted Makhana Green Tea"
      },
      {
        id: "df-m6",
        slotName: "Dinner",
        time: "7:45 PM – 8:30 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "Zucchini Spiral Noodles with Rich Red Lentil Bolognese",
        tag: "Light Carb Evening Digest",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
        calories: 510,
        protein: 31,
        carbs: 27,
        fat: 15,
        prepTime: "15 min",
        cookTime: "20 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Tender zucchini noodles (zoodles) tossed in an Italian San Marzano tomato & red lentil sauce loaded with fresh basil, garlic, and nutritional yeast.",
        benefits: ["Low carbohydrate load before sleep", "Encourages deep slow-wave rest", "Rich in plant folate & lycopene"],
        ingredients: [
          { name: "Fresh Green Zucchini (spiralized)", amount: "2 medium" },
          { name: "Dry Red Lentils (Masoor Dal)", amount: "60g (rinsed)" },
          { name: "Crushed San Marzano Tomatoes", amount: "200 ml" },
          { name: "Garlic Cloves (minced)", amount: "3 cloves" },
          { name: "Fresh Italian Basil", amount: "6-8 leaves" },
          { name: "Nutritional Yeast", amount: "1 tbsp" },
          { name: "Extra Virgin Olive Oil", amount: "1 tsp" }
        ],
        steps: [
          "Simmer red lentils in tomato puree with garlic, oregano, and salt for 18 minutes until tender and thick.",
          "Spiralize the zucchini into noodle ribbons.",
          "Flash sauté the zucchini ribbons in olive oil for just 90 seconds (do not overcook).",
          "Plate the warm zoodles, ladle the rich red lentil bolognese on top, and garnish with fresh basil and nutritional yeast."
        ],
        chefTips: "Salting and squeezing zoodles in a paper towel removes excess moisture and stops watery sauce.",
        youtubeVideos: [
          { id: "yt1", title: "15-Minute Low Carb Zucchini Bolognese", duration: "8:20", channel: "Chef In The Kitchen", query: "zucchini noodles lentil bolognese" },
          { id: "yt2", title: "How to Spiralize Vegetables Like a Pro", duration: "5:10", channel: "Kitchen Gear", query: "how to spiralize zucchini noodles" },
          { id: "yt3", title: "Light Dinners for Healthy Blood Sugar", duration: "10:45", channel: "Health Nutritionist", query: "low carb dinner recipes blood sugar" }
        ],
        orderQuery: "Zucchini Pasta Healthy Bowl"
      }
    ]
  },
  {
    id: "gym-beginner",
    slug: "gym-beginner",
    title: "Gym Beginner Lean Muscle Routine",
    subtitle: "High-protein, moderate-carb athletic plan to accelerate recovery, stamina and lean mass.",
    category: "Fitness",
    categoryId: "fitness",
    badge: "Recovery & Strength",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    description: "Formulated specifically for individuals starting weight training or athletic workouts. Prioritizes nutrient timing around workouts to maximize hypertrophy and minimize muscle soreness.",
    difficulty: "Moderate",
    mealsCount: 6,
    prepTimeAvg: "20 min",
    calories: 2350,
    protein: 145,
    carbs: 245,
    fat: 65,
    fiber: 36,
    rating: 4.8,
    reviewsCount: 512,
    tags: ["High Protein", "Strength Fuel", "Post-Workout", "Clean Bulk", "Non-Veg / Veg Options"],
    isVegetarian: false,
    isLowSugar: false,
    isHighProtein: true,
    disclaimer: "Hydrate adequately (3+ liters of water daily) when following an active training routine with higher protein intake.",
    dailyTimeline: [
      {
        id: "gb-m1",
        slotName: "Morning",
        time: "6:30 AM",
        icon: "Sun",
        emoji: "🌅",
        title: "Hydration Electrolyte & Banana Peanut Butter Rice Cake",
        tag: "Pre-Workout Fuel",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        calories: 210,
        protein: 7,
        carbs: 32,
        fat: 7,
        prepTime: "3 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "500ml water with Himalayan pink salt and lemon, alongside 2 crispy brown rice cakes layered with 100% natural peanut butter and sliced banana coins.",
        benefits: ["Fast digesting muscle glycogen", "Cellular hydration", "Prevents workout cramps"],
        ingredients: [
          { name: "Brown Rice Cakes", amount: "2 whole" },
          { name: "Natural Peanut Butter (unsweetened)", amount: "1 tbsp" },
          { name: "Ripe Banana", amount: "1/2 medium sliced" },
          { name: "Himalayan Pink Salt", amount: "1 pinch" },
          { name: "Water", amount: "500 ml" }
        ],
        steps: [
          "Spread peanut butter evenly across both rice cakes.",
          "Top with banana slices and a light dusting of cinnamon.",
          "Drink 500ml water with lemon and a pinch of pink salt 30 mins before training."
        ],
        chefTips: "Eat this 45 minutes before gym session for quick sustained energy without feeling heavy.",
        youtubeVideos: [
          { id: "yt1", title: "Best Pre-Workout Meals for Beginners", duration: "8:10", channel: "Athlete Science", query: "pre workout meal beginner muscle" },
          { id: "yt2", title: "Quick Pre Workout Snacks Under 5 Min", duration: "6:30", channel: "Gym Food Daily", query: "quick pre workout rice cake banana" },
          { id: "yt3", title: "Why Salt & Water Boost Workout Performance", duration: "7:15", channel: "Physique Science", query: "hydration electrolytes bodybuilding" }
        ],
        orderQuery: "Peanut Butter Banana Toast"
      },
      {
        id: "gb-m2",
        slotName: "Breakfast",
        time: "8:45 AM",
        icon: "Coffee",
        emoji: "🥣",
        title: "Sprouted Moong & Egg White Omelette with Sourdough",
        tag: "Post-Workout Anabolic Window",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        calories: 460,
        protein: 34,
        carbs: 45,
        fat: 14,
        prepTime: "10 min",
        cookTime: "10 min",
        isVeg: false,
        dietType: "Eggetarian / High-Protein",
        description: "Fluffy 3-egg white + 1 whole egg skillet scramble packed with sprouted green moong, spinach, bell peppers, paired with toasted artisan sourdough bread.",
        benefits: ["Immediate leucine trigger for muscle synthesis", "Complex carbs replenish liver glycogen", "B-vitamins for energy"],
        ingredients: [
          { name: "Whole Eggs + Egg Whites", amount: "1 whole + 3 whites" },
          { name: "Sprouted Moong Beans", amount: "1/2 cup" },
          { name: "Baby Spinach & Red Bell Pepper", amount: "1 cup chopped" },
          { name: "Artisan Sourdough Slice", amount: "1 thick slice" },
          { name: "Extra Virgin Olive Oil", amount: "1 tsp" }
        ],
        steps: [
          "Whisk egg whites with the whole egg, salt, and black pepper.",
          "Sauté sprouted moong and peppers in olive oil for 2 minutes until tender.",
          "Pour egg mix and cook gently on low-medium heat until fluffy.",
          "Serve alongside warm golden toasted sourdough bread."
        ],
        chefTips: "For a 100% vegetarian alternative, substitute eggs with 150g crumbled paneer or pressed tofu.",
        youtubeVideos: [
          { id: "yt1", title: "High Protein Post-Workout Breakfast Scramble", duration: "7:45", channel: "Fit Chef", query: "high protein egg white scramble sourdough" },
          { id: "yt2", title: "How to Sprout Moong Beans at Home", duration: "5:00", channel: "Clean Kitchen", query: "how to sprout moong beans easy" },
          { id: "yt3", title: "Post Workout Nutrition Breakdown", duration: "10:20", channel: "Strength Guide", query: "post workout protein timing carbs" }
        ],
        orderQuery: "Egg White Scramble Sourdough"
      },
      {
        id: "gb-m3",
        slotName: "Afternoon",
        time: "12:00 PM",
        icon: "Sparkles",
        emoji: "☀️",
        title: "Whey Protein & Greek Yogurt Berry Smoothie",
        tag: "Mid-Day Protein Hit",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
        calories: 290,
        protein: 32,
        carbs: 26,
        fat: 4,
        prepTime: "5 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "1 scoop pure whey isolate blended with unsweetened Greek yogurt, frozen berries, flaxseed powder, and almond milk.",
        benefits: ["Fast digesting protein", "Probiotics for gut absorption", "Rich in anthocyanins"],
        ingredients: [
          { name: "Whey Protein Isolate (Vanilla / Unflavored)", amount: "1 scoop (30g)" },
          { name: "Plain Greek Yogurt (0% fat)", amount: "100g" },
          { name: "Frozen Mixed Berries", amount: "1/2 cup" },
          { name: "Ground Flaxseed", amount: "1 tsp" },
          { name: "Almond Milk", amount: "200 ml" }
        ],
        steps: [
          "Place almond milk, Greek yogurt, and protein powder into blender cup.",
          "Add frozen berries and flaxseeds.",
          "Blend on high speed for 45 seconds until velvety smooth. Enjoy cold."
        ],
        chefTips: "Add a handful of baby spinach; you won't taste it, but it adds micronutrients without changing macro ratios.",
        youtubeVideos: [
          { id: "yt1", title: "Smoothie Recipes for Muscle Building", duration: "8:50", channel: "Protein Shake Labs", query: "greek yogurt whey protein smoothie" },
          { id: "yt2", title: "Whey Isolate vs Concentrate Explained", duration: "6:15", channel: "Supplement Science", query: "whey isolate vs concentrate" },
          { id: "yt3", title: "How to Prevent Protein Shake Bloating", duration: "7:00", channel: "Fitness Nutrition", query: "how to digest protein powder easily" }
        ],
        orderQuery: "Greek Yogurt Berry Smoothie"
      },
      {
        id: "gb-m4",
        slotName: "Lunch",
        time: "1:45 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "Grilled Herb Chicken Breast & Brown Rice Harvest Plate",
        tag: "Classic Bodybuilder Meal",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
        calories: 580,
        protein: 42,
        carbs: 62,
        fat: 16,
        prepTime: "15 min",
        cookTime: "20 min",
        isVeg: false,
        dietType: "Non-Vegetarian",
        description: "Juicy marinated grilled chicken breast (or paneer steak for veg) paired with steamed brown basmati rice, roasted zucchini, and avocado slices.",
        benefits: ["Lean high-biological value protein", "Sustained slow-release energy", "Monounsaturated healthy fats"],
        ingredients: [
          { name: "Boneless Chicken Breast (or Paneer)", amount: "160g" },
          { name: "Cooked Brown Basmati Rice", amount: "1.25 cups (200g)" },
          { name: "Zucchini & Asparagus spears", amount: "1 cup" },
          { name: "Avocado", amount: "1/4 medium (35g)" },
          { name: "Olive oil, rosemary, garlic, paprika", amount: "1 tsp oil + spices" }
        ],
        steps: [
          "Marinate chicken with garlic paste, crushed rosemary, paprika, lemon juice, and olive oil for 15 mins.",
          "Grill chicken on medium heat for 6-7 minutes each side until internal temp reaches 74°C (165°F).",
          "Roast zucchini spears in the same pan for 4 minutes.",
          "Serve chicken sliced over warm brown rice with fresh avocado on the side."
        ],
        chefTips: "Rest chicken for 5 minutes before slicing to lock in the juices and keep meat tender.",
        youtubeVideos: [
          { id: "yt1", title: "How to Cook Juicy Chicken Breast Every Time", duration: "9:40", channel: "Meal Prep Pro", query: "how to cook juicy chicken breast meal prep" },
          { id: "yt2", title: "Bodybuilding Lunch Meal Prep 5 Days", duration: "14:15", channel: "Fitness Food", query: "chicken brown rice meal prep" },
          { id: "yt3", title: "Delicious Paneer Alternative For Gym", duration: "8:10", channel: "Veg Athlete", query: "grilled paneer brown rice high protein" }
        ],
        orderQuery: "Grilled Chicken Brown Rice Bowl"
      },
      {
        id: "gb-m5",
        slotName: "Evening Snack",
        time: "5:15 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Spiced Boiled Chickpea Chaat with Pomegranate",
        tag: "Clean Fiber Crunch",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        calories: 260,
        protein: 11,
        carbs: 38,
        fat: 6,
        prepTime: "5 min",
        cookTime: "5 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Steamed Kabuli chickpeas tossed with diced red onions, juicy tomatoes, fresh cilantro, chaat masala, lemon juice, and crunchy ruby pomegranate seeds.",
        benefits: ["Soluble fiber prevents snacking temptations", "Natural zinc & iron for recovery", "Digestive spices"],
        ingredients: [
          { name: "Boiled White Chickpeas (Garbanzo)", amount: "1 cup (160g)" },
          { name: "Red Onion & Tomato (finely diced)", amount: "1/2 cup" },
          { name: "Fresh Pomegranate Arils", amount: "2 tbsp" },
          { name: "Fresh Cilantro & Green Chili", amount: "1 tbsp" },
          { name: "Chaat Masala & Lemon Juice", amount: "1/2 tsp + 1 tbsp" }
        ],
        steps: [
          "In a mixing bowl, combine boiled chickpeas, diced onion, tomato, and green chili.",
          "Toss with chaat masala, roasted cumin powder, and fresh lemon juice.",
          "Garnish with pomegranate seeds and fresh coriander. Serve fresh."
        ],
        chefTips: "Canned chickpeas can be used in a pinch; just rinse thoroughly under cold water to eliminate excess sodium.",
        youtubeVideos: [
          { id: "yt1", title: "Healthy High Protein Chickpea Chaat Recipe", duration: "5:30", channel: "Street Food Fit", query: "healthy chickpea chaat recipe protein" },
          { id: "yt2", title: "Chickpea Benefits for Muscle & Satiety", duration: "6:45", channel: "NutriScience", query: "chickpeas nutrition bodybuilding" },
          { id: "yt3", title: "5 Quick Vegan Snacks Under 300 Cals", duration: "8:20", channel: "Plant Fuel", query: "high protein vegan snacks" }
        ],
        orderQuery: "Healthy Chickpea Salad"
      },
      {
        id: "gb-m6",
        slotName: "Dinner",
        time: "8:30 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "Pan-Seared Salmon (or Tofu Steak) & Sweet Potato Mash",
        tag: "Omega-3 Recovery Dinner",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        calories: 550,
        protein: 36,
        carbs: 42,
        fat: 18,
        prepTime: "15 min",
        cookTime: "18 min",
        isVeg: false,
        dietType: "Pescatarian / High Protein",
        description: "Omega-3 rich pan-seared salmon fillet (or pressed herbed tofu steak) served over creamy cinnamon mashed sweet potatoes and steamed asparagus.",
        benefits: ["Reduces delayed onset muscle soreness (DOMS)", "Potassium restores intra-cellular water", "Promotes melatonin and deep REM sleep"],
        ingredients: [
          { name: "Atlantic Salmon Fillet (or Tofu)", amount: "150g" },
          { name: "Orange Sweet Potato (boiled)", amount: "1 medium (150g)" },
          { name: "Asparagus & Baby Carrots", amount: "1 cup" },
          { name: "Unsweetened Almond Milk", amount: "2 tbsp (for mash)" },
          { name: "Garlic, Dill, Olive Oil, Sea Salt", amount: "To season" }
        ],
        steps: [
          "Boil sweet potato until fork-tender, mash with almond milk, pinch of cinnamon and sea salt.",
          "Season salmon fillet with dill, garlic powder, and black pepper.",
          "Sear in a hot skillet with 1/2 tsp olive oil skin-side down for 4 minutes, flip and sear for 3 minutes.",
          "Steam asparagus for 3 minutes. Plate salmon atop warm sweet potato mash and vegetables."
        ],
        chefTips: "Do not move the salmon while searing the skin side; this creates the signature crisp restaurant crust.",
        youtubeVideos: [
          { id: "yt1", title: "Pan Seared Salmon with Crispy Skin Masterclass", duration: "8:00", channel: "Gourmet Health", query: "how to pan sear salmon crispy skin" },
          { id: "yt2", title: "Creamy Sweet Potato Mash Without Butter", duration: "4:50", channel: "Clean Cooking", query: "healthy sweet potato mash recipe" },
          { id: "yt3", title: "Why Omega-3s Supercharge Muscle Repair", duration: "9:10", channel: "Sports Medicine", query: "omega 3 muscle recovery bodybuilding" }
        ],
        orderQuery: "Grilled Salmon Sweet Potato Bowl"
      }
    ]
  },
  {
    id: "muscle-gain",
    slug: "muscle-gain",
    title: "Hypertrophy High-Protein Mass Routine",
    subtitle: "Calorie-surplus, macronutrient-engineered powerhouse for serious lifters seeking maximum hypertrophy.",
    category: "High Protein",
    categoryId: "high-protein",
    badge: "Maximum Hypertrophy",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    description: "Packed with clean complex carbohydrates, premium quality proteins, and healthy fats. Structured in 5 nutrient-dense meals to maintain a continuous positive nitrogen balance.",
    difficulty: "Moderate",
    mealsCount: 5,
    prepTimeAvg: "25 min",
    calories: 2900,
    protein: 175,
    carbs: 340,
    fat: 85,
    fiber: 44,
    rating: 4.9,
    reviewsCount: 420,
    tags: ["Bulking", "Hypertrophy", "High Protein", "Anabolic Window", "Strength"],
    isVegetarian: false,
    isLowSugar: false,
    isHighProtein: true,
    disclaimer: "Ensure regular strength progressive overload to maximize lean muscle gain rather than excess adipose storage.",
    dailyTimeline: [
      {
        id: "mg-m1",
        slotName: "Morning & Breakfast",
        time: "7:30 AM",
        icon: "Sun",
        emoji: "🥣",
        title: "Mega Mass Oats Power Bowl with Peanut Butter & Eggs",
        tag: "Anabolic Breakfast",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        calories: 680,
        protein: 45,
        carbs: 78,
        fat: 22,
        prepTime: "12 min",
        cookTime: "10 min",
        isVeg: false,
        dietType: "High-Protein",
        description: "1 cup rolled oats cooked in milk with 1 scoop whey protein, 2 tbsp natural peanut butter, chia seeds, paired with 2 whole boiled eggs.",
        benefits: ["High leucine content", "Long-burning fuel", "Calorie dense without junk"],
        ingredients: [
          { name: "Rolled Oats", amount: "80g" },
          { name: "Full-Cream or Soy Milk", amount: "250 ml" },
          { name: "Whey Protein Powder", amount: "1 scoop (30g)" },
          { name: "Natural Peanut Butter", amount: "2 tbsp (32g)" },
          { name: "Whole Eggs (boiled)", amount: "2 whole" },
          { name: "Banana (sliced)", amount: "1 whole" }
        ],
        steps: [
          "Cook oats with milk in a saucepan for 5 minutes.",
          "Take off heat and stir in whey protein and peanut butter until rich and creamy.",
          "Top with banana slices and eat alongside 2 boiled eggs seasoned with salt and pepper."
        ],
        chefTips: "Never boil whey protein directly in boiling milk; always stir it in after taking the pan off heat.",
        youtubeVideos: [
          { id: "yt1", title: "700 Calorie Mass Gainer Oatmeal", duration: "6:40", channel: "Bulk Kitchen", query: "mass gainer oatmeal recipe" },
          { id: "yt2", title: "Hypertrophy Breakfast for Hardgainers", duration: "10:15", channel: "Hypertrophy Hub", query: "breakfast for muscle gain bulk" },
          { id: "yt3", title: "How Many Eggs Should You Eat for Muscle?", duration: "8:00", channel: "Nutrition Facts", query: "whole eggs bodybuilding muscle" }
        ],
        orderQuery: "Peanut Butter Oatmeal Protein Shake"
      },
      {
        id: "mg-m2",
        slotName: "Afternoon",
        time: "11:30 AM",
        icon: "Coffee",
        emoji: "☀️",
        title: "Tuna / Paneer Whole Wheat Wrap with Hummus",
        tag: "High Protein Pocket",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
        calories: 520,
        protein: 38,
        carbs: 55,
        fat: 16,
        prepTime: "8 min",
        cookTime: "5 min",
        isVeg: false,
        dietType: "High-Protein Wrap",
        description: "Large 100% whole wheat tortilla loaded with flaked tuna in brine (or grilled paneer), garlic hummus, shredded carrots, spinach, and black olives.",
        benefits: ["Convenient high protein on the go", "Healthy olive fats", "Low glycemic fiber"],
        ingredients: [
          { name: "Whole Wheat Tortilla / Roti", amount: "1 large (60g)" },
          { name: "Canned Light Tuna in Water (or Paneer)", amount: "130g" },
          { name: "Classic Hummus", amount: "2 tbsp" },
          { name: "Baby Spinach & Shredded Carrots", amount: "1 cup" },
          { name: "Lemon juice & Black Pepper", amount: "To taste" }
        ],
        steps: [
          "Spread hummus across the whole wheat tortilla.",
          "Layer drained tuna (or pan-sautéed paneer), greens, and carrots.",
          "Drizzle lemon juice and roll tightly. Toast in dry skillet for 2 minutes to seal."
        ],
        chefTips: "Wrap in parchment paper to make it easy to pack for office or campus.",
        youtubeVideos: [
          { id: "yt1", title: "Meal Prep High Protein Wraps (40g Protein)", duration: "7:30", channel: "Meal Prep Zone", query: "high protein wraps meal prep" },
          { id: "yt2", title: "Healthy Tuna Wrap Masterclass", duration: "5:10", channel: "Quick Bites", query: "healthy tuna wrap recipe" },
          { id: "yt3", title: "Paneer Wrap for Muscle Building", duration: "8:40", channel: "Fit India", query: "paneer wrap high protein gym" }
        ],
        orderQuery: "High Protein Wrap Salad"
      },
      {
        id: "mg-m3",
        slotName: "Lunch",
        time: "2:00 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "Grilled Steak or Tofu Teriyaki with Jasmine Rice & Broccoli",
        tag: "Mass Builder Fuel",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 720,
        protein: 48,
        carbs: 85,
        fat: 18,
        prepTime: "15 min",
        cookTime: "15 min",
        isVeg: false,
        dietType: "Non-Vegetarian",
        description: "Marinated lean tenderloin steak (or extra-firm tofu) glazed in homemade low-sugar teriyaki sauce over steamed jasmine rice and sesame broccoli.",
        benefits: ["Creatine and heme iron from lean red meat", "Rapid glycogen replenishment", "Zinc for testosterone support"],
        ingredients: [
          { name: "Lean Flank Steak (or Firm Tofu)", amount: "180g" },
          { name: "Steamed White Jasmine Rice", amount: "2 cups (300g cooked)" },
          { name: "Broccoli & Snow Peas", amount: "1.5 cups" },
          { name: "Low Sodium Soy Sauce & Honey", amount: "1 tbsp soy + 1 tsp honey" },
          { name: "Sesame Oil & Toasted Sesame Seeds", amount: "1 tsp" }
        ],
        steps: [
          "Sear flank steak on high heat cast iron pan for 3-4 minutes each side.",
          "Add broccoli and snow peas to pan with a splash of water, cover to steam for 2 minutes.",
          "Glaze with soy-honey sauce, slice steak across grain, and plate over hot jasmine rice."
        ],
        chefTips: "White jasmine rice digests rapidly post-workout to shuttle amino acids straight into muscle cells.",
        youtubeVideos: [
          { id: "yt1", title: "Quick Teriyaki Steak Bowl for Bulking", duration: "9:00", channel: "Chef Bulking", query: "teriyaki steak bowl recipe gym" },
          { id: "yt2", title: "Jasmine Rice vs Brown Rice for Lifters", duration: "6:20", channel: "Fit Science", query: "white jasmine rice bodybuilding benefits" },
          { id: "yt3", title: "50g Protein High Calorie Meals", duration: "11:15", channel: "Mass Gainers", query: "50g protein bulking lunch" }
        ],
        orderQuery: "Teriyaki Rice Bowl Steak"
      },
      {
        id: "mg-m4",
        slotName: "Evening",
        time: "5:30 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Greek Yogurt Crunch Parfait with Granola & Honey",
        tag: "Slow Digesting Snack",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        calories: 380,
        protein: 24,
        carbs: 48,
        fat: 10,
        prepTime: "4 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "200g thick Greek yogurt layered with toasted almond granola, chia seeds, fresh mango cubes, and raw wildflower honey.",
        benefits: ["High casein protein", "Probiotic gut support", "Natural anti-catabolic fuel"],
        ingredients: [
          { name: "Greek Yogurt (2% fat)", amount: "200g" },
          { name: "Almond Oat Granola", amount: "40g" },
          { name: "Fresh Mango or Berries", amount: "1/2 cup" },
          { name: "Raw Honey", amount: "1 tsp" },
          { name: "Chia Seeds", amount: "1 tsp" }
        ],
        steps: [
          "Spoon half the Greek yogurt into a clear glass.",
          "Layer half the granola and mango cubes.",
          "Repeat second layer, top with chia seeds, and drizzle honey."
        ],
        chefTips: "Greek yogurt provides both rapid whey and slow-digesting casein.",
        youtubeVideos: [
          { id: "yt1", title: "How to Build the Perfect High Protein Parfait", duration: "5:10", channel: "Healthy Sweet Tooth", query: "greek yogurt granola parfait recipe" },
          { id: "yt2", title: "Casein Protein Before Bed vs Day", duration: "7:40", channel: "Protein Lab", query: "casein protein benefits muscle growth" },
          { id: "yt3", title: "Best Granola Brands for Fitness", duration: "6:00", channel: "Grocery Guide", query: "healthy low sugar granola review" }
        ],
        orderQuery: "Greek Yogurt Granola Parfait"
      },
      {
        id: "mg-m5",
        slotName: "Dinner",
        time: "8:45 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "Grilled Cottage Cheese / Chicken Tikka & Quinoa Pilaf",
        tag: "Overnight Muscle Repair",
        image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
        calories: 600,
        protein: 42,
        carbs: 54,
        fat: 19,
        prepTime: "15 min",
        cookTime: "15 min",
        isVeg: true,
        dietType: "High-Protein",
        description: "Tandoori-spiced grilled cottage cheese cubes (or chicken chunks) served over fragrant spiced quinoa and mint chutney.",
        benefits: ["Sustained overnight amino acid delivery", "High calcium & phosphorus for bone density", "Low sodium"],
        ingredients: [
          { name: "Low-Fat Paneer / Cottage Cheese (or Chicken)", amount: "180g" },
          { name: "Cooked Tricolor Quinoa", amount: "1.5 cups" },
          { name: "Greek Yogurt (for marinade)", amount: "2 tbsp" },
          { name: "Tandoori Masala, Ginger Garlic, Lemon", amount: "1 tbsp spices" },
          { name: "Bell Peppers & Red Onions (diced)", amount: "1 cup" }
        ],
        steps: [
          "Marinate paneer/chicken with spiced yogurt, ginger-garlic paste, and lemon for 15 mins.",
          "Skewer with bell peppers and onions, grill or bake at 200°C for 12-14 minutes.",
          "Serve steaming hot atop fluffy quinoa with fresh mint-cilantro dip."
        ],
        chefTips: "Cottage cheese / paneer casein digests over 6-8 hours, preventing muscle catabolism while sleeping.",
        youtubeVideos: [
          { id: "yt1", title: "Authentic Restaurant Style Paneer Tikka", duration: "8:30", channel: "Spice Master", query: "healthy paneer tikka recipe oven" },
          { id: "yt2", title: "High Protein Indian Dinners for Muscle Gain", duration: "12:00", channel: "Desi Fitness", query: "high protein indian dinner gym" },
          { id: "yt3", title: "Top Overnight Recovery Meals", duration: "7:50", channel: "Sleep & Growth", query: "night meals for muscle growth" }
        ],
        orderQuery: "Paneer Tikka Quinoa Bowl"
      }
    ]
  },
  {
    id: "weight-management",
    slug: "weight-management",
    title: "Metabolic Reset & Fat Loss Routine",
    subtitle: "High satiety, thermogenic whole-food sequence to preserve lean muscle while burning body fat.",
    category: "Weight Management",
    categoryId: "weight-management",
    badge: "Fat Loss & Satiety",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    description: "Engineered with high thermic effect foods (TEF), abundant leafy greens, and lean protein to prevent hunger pangs and keep leptin levels optimized during a moderate calorie deficit.",
    difficulty: "Easy",
    mealsCount: 5,
    prepTimeAvg: "15 min",
    calories: 1580,
    protein: 118,
    carbs: 132,
    fat: 46,
    fiber: 39,
    rating: 4.9,
    reviewsCount: 618,
    tags: ["Calorie Deficit", "High Satiety", "Metabolic Boost", "Intermittent Friendly", "Gut Health"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: true,
    disclaimer: "Maintain a moderate deficit (-300 to -500 kcal) for sustainable fat loss without metabolic adaptation.",
    dailyTimeline: [
      {
        id: "wm-m1",
        slotName: "Morning",
        time: "7:00 AM",
        icon: "Sun",
        emoji: "🌅",
        title: "Apple Cider Vinegar & Ginger Detox Infusion",
        tag: "Metabolism Kickstart",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        calories: 25,
        protein: 0.5,
        carbs: 4,
        fat: 0,
        prepTime: "3 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Warm water mixed with raw unfiltered Apple Cider Vinegar (with mother), grated ginger, lemon juice, and a pinch of cayenne pepper.",
        benefits: ["Stimulates stomach acid for better digestion", "Improves insulin sensitivity", "Suppresses early appetite"],
        ingredients: [
          { name: "Raw Organic Apple Cider Vinegar", amount: "1 tbsp (15 ml)" },
          { name: "Fresh Grated Ginger", amount: "1/2 tsp" },
          { name: "Warm Water", amount: "300 ml" },
          { name: "Fresh Lemon Juice", amount: "1 tsp" },
          { name: "Cayenne Pepper", amount: "1 tiny pinch" }
        ],
        steps: [
          "Stir ACV, lemon juice, grated ginger, and cayenne into warm water.",
          "Sip through a glass straw to protect dental enamel.",
          "Follow with a glass of plain water."
        ],
        chefTips: "Always use a straw with acidic morning drinks to safeguard tooth enamel.",
        youtubeVideos: [
          { id: "yt1", title: "Science Behind Apple Cider Vinegar for Fat Loss", duration: "9:20", channel: "Doctor's Review", query: "apple cider vinegar fat loss science" },
          { id: "yt2", title: "Morning Metabolism Habits That Work", duration: "7:10", channel: "Fit Habits", query: "morning habits boost metabolism" },
          { id: "yt3", title: "How to Take ACV Safely", duration: "4:30", channel: "Health Line", query: "how to drink acv safely" }
        ],
        orderQuery: "Apple Cider Vinegar Green Tea"
      },
      {
        id: "wm-m2",
        slotName: "Breakfast",
        time: "9:00 AM",
        icon: "Coffee",
        emoji: "🥣",
        title: "Spiced Tofu / Egg Bhurji with Avocado on Rye Toast",
        tag: "High Satiety Breakfast",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        calories: 360,
        protein: 26,
        carbs: 28,
        fat: 14,
        prepTime: "8 min",
        cookTime: "8 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Crumbled organic tofu (or egg whites) scrambled with turmeric, cumin, tomatoes, and spinach, served on toasted dark rye bread with mashed avocado.",
        benefits: ["Zero sugar spike", "Rich in choline and lutein", "Keeps hunger off until lunch"],
        ingredients: [
          { name: "Firm Tofu / Egg Whites", amount: "150g tofu or 4 whites" },
          { name: "Dark Rye Bread / Whole Grain", amount: "1 slice" },
          { name: "Fresh Avocado", amount: "30g (approx 2 tbsp mashed)" },
          { name: "Tomatoes, Onions, Green Chili", amount: "1/2 cup diced" },
          { name: "Turmeric & Pink Salt", amount: "To season" }
        ],
        steps: [
          "Sauté onions, tomatoes, and chilies in 1/2 tsp olive oil.",
          "Crumble tofu, add turmeric and pink salt, toss for 4-5 minutes until warm.",
          "Toast rye bread, spread mashed avocado, and heap warm bhurji on top."
        ],
        chefTips: "Rye bread has high soluble arabinoxylan fiber which significantly slows digestion compared to wheat.",
        youtubeVideos: [
          { id: "yt1", title: "Tofu Bhurji Recipe - Indian Vegan Scramble", duration: "6:15", channel: "Vegan Desi", query: "tofu bhurji recipe vegan scramble" },
          { id: "yt2", title: "Best Breads for Weight Loss", duration: "8:00", channel: "Nutrition Doctor", query: "best bread for weight loss rye sourdough" },
          { id: "yt3", title: "High Satiety Breakfasts Under 400 Cals", duration: "10:30", channel: "Satiety Diet", query: "high satiety breakfast weight loss" }
        ],
        orderQuery: "Tofu Scramble Avocado Toast"
      },
      {
        id: "wm-m3",
        slotName: "Lunch",
        time: "1:15 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "Mediterranean Chopped Chickpea & Grilled Paneer Bowl",
        tag: "Low-Calorie High-Volume",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 460,
        protein: 32,
        carbs: 44,
        fat: 14,
        prepTime: "12 min",
        cookTime: "8 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Massive volume salad: crisp romaine, cucumbers, cherry tomatoes, kalamata olives, boiled chickpeas, and seared low-fat paneer cubes dressed in lemon-herb vinaigrette.",
        benefits: ["High volume fills stomach mechanoreceptors", "Low calorie density", "32g protein protects lean tissue"],
        ingredients: [
          { name: "Low-Fat Paneer / Tofu (grilled)", amount: "120g" },
          { name: "Boiled Chickpeas", amount: "1/2 cup (80g)" },
          { name: "Romaine Lettuce & Baby Spinach", amount: "3 packed cups" },
          { name: "Cucumber & Cherry Tomatoes", amount: "1 cup chopped" },
          { name: "Extra Virgin Olive Oil & Lemon Dressing", amount: "1 tsp oil + lemon juice + oregano" }
        ],
        steps: [
          "Chop lettuce, cucumber, and tomatoes into bite-sized pieces in a large salad bowl.",
          "Sear paneer cubes in a non-stick pan for 4 minutes with oregano and salt.",
          "Add warm paneer and chickpeas over greens, drizzle lemon-herb dressing, and toss thoroughly."
        ],
        chefTips: "Eating greens at the start of lunch forms a fiber mesh in the small intestine, slowing carb uptake.",
        youtubeVideos: [
          { id: "yt1", title: "High Volume Low Calorie Meal Prep", duration: "11:20", channel: "Volume Eating", query: "volume eating high protein salad" },
          { id: "yt2", title: "Mediterranean Salad for Fat Loss", duration: "7:40", channel: "Healthy Table", query: "mediterranean chickpea salad weight loss" },
          { id: "yt3", title: "The Science of Volume Eating", duration: "9:15", channel: "Dr. Diet", query: "volume eating fat loss mechanics" }
        ],
        orderQuery: "Mediterranean Paneer Salad Bowl"
      },
      {
        id: "wm-m4",
        slotName: "Evening Snack",
        time: "5:00 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Roasted Edamame / Spiced Cucumber Boats",
        tag: "Crunchy Anti-Snack",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
        calories: 140,
        protein: 14,
        carbs: 10,
        fat: 4,
        prepTime: "5 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Dry roasted salted edamame beans paired with English cucumber rounds topped with a light dab of Greek yogurt tzatziki and chili flakes.",
        benefits: ["Under 150 calories", "14g plant protein", "Satisfies salt and crunch cravings"],
        ingredients: [
          { name: "Dry Roasted Edamame (Salted)", amount: "30g" },
          { name: "Cucumber Slices", amount: "1 cup" },
          { name: "Greek Yogurt Dip / Mint Chutney", amount: "1 tbsp" }
        ],
        steps: [
          "Slice chilled cucumber into thick wheels.",
          "Top with a small dab of Greek yogurt mint dip.",
          "Enjoy along with crunchy roasted edamame."
        ],
        chefTips: "Dry roasted edamame has twice the protein of peanuts with half the calories.",
        youtubeVideos: [
          { id: "yt1", title: "Best 100-Calorie High Protein Snacks", duration: "6:50", channel: "Smart Bites", query: "100 calorie high protein snacks" },
          { id: "yt2", title: "How to Make Crispy Roasted Edamame", duration: "4:30", channel: "Snack Lab", query: "how to roast edamame crispy" },
          { id: "yt3", title: "Beat Evening Cravings Forever", duration: "8:10", channel: "Mindful Eating", query: "how to stop evening binge eating" }
        ],
        orderQuery: "Edamame Cucumber Healthy Salad"
      },
      {
        id: "wm-m5",
        slotName: "Dinner",
        time: "7:30 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "Hearty Green Moong Dal Soup & Sautéed Garden Veggies",
        tag: "Light Thermogenic Dinner",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        calories: 440,
        protein: 28,
        carbs: 46,
        fat: 10,
        prepTime: "10 min",
        cookTime: "20 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Slow-simmered whole green moong lentil soup flavored with cumin, ginger, and lemon, accompanied by a wok of garlic-sautéed mushrooms, french beans, and broccoli.",
        benefits: ["Gentle on evening digestion", "High potassium prevents water retention", "Zero dairy heaviness before sleep"],
        ingredients: [
          { name: "Whole Green Moong Dal (soaked)", amount: "60g dry" },
          { name: "Button Mushrooms & French Beans", amount: "1.5 cups" },
          { name: "Broccoli & Carrots", amount: "1 cup" },
          { name: "Cumin Seeds, Ginger Paste, Lemon", amount: "1 tsp" },
          { name: "Cold Pressed Mustard / Olive Oil", amount: "1 tsp" }
        ],
        steps: [
          "Pressure cook or simmer soaked green moong with ginger, turmeric, and water for 18 mins.",
          "In a wok, heat oil, add cumin seeds, and flash-fry mushrooms and vegetables with crushed black pepper for 5 minutes.",
          "Ladle warm moong dal soup into a deep bowl, squeeze lemon juice, and serve with hot wok veggies."
        ],
        chefTips: "Eating dinner by 7:30 PM gives your system 3 hours before bed to finish primary digestion, improving deep sleep HRV.",
        youtubeVideos: [
          { id: "yt1", title: "Healthy Green Moong Dal Soup for Weight Loss", duration: "7:00", channel: "Indian Health Kitchen", query: "green moong dal soup recipe" },
          { id: "yt2", title: "Wok Sautéed Veggies in 5 Minutes", duration: "5:20", channel: "Quick Cook", query: "stir fry vegetables garlic healthy" },
          { id: "yt3", title: "Why Early Dinners Burn More Fat", duration: "8:45", channel: "Circadian Health", query: "circadian rhythm early dinner weight loss" }
        ],
        orderQuery: "Moong Dal Soup Vegetable Bowl"
      }
    ]
  },
  {
    id: "heart-friendly",
    slug: "heart-friendly",
    title: "Cardio-Protective Mediterranean Routine",
    subtitle: "Potassium-rich, low-sodium sequence designed to support arterial flexibility and healthy cholesterol.",
    category: "Health & Wellness",
    categoryId: "health-wellness",
    badge: "Cardio Vitality",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
    description: "Built upon the evidence-backed Mediterranean dietary pattern: Extra virgin olive oil, cold-water fish/walnuts, antioxidant berries, and high-potassium legumes.",
    difficulty: "Easy",
    mealsCount: 5,
    prepTimeAvg: "18 min",
    calories: 1850,
    protein: 92,
    carbs: 210,
    fat: 58,
    fiber: 46,
    rating: 4.9,
    reviewsCount: 290,
    tags: ["Low Sodium", "DASH Friendly", "Omega-3", "Mediterranean", "Heart Safe"],
    isVegetarian: true,
    isLowSugar: true,
    isHighProtein: false,
    disclaimer: "For general educational guidance only. Consult your cardiologist or physician for specific medical conditions.",
    dailyTimeline: [
      {
        id: "hf-m1",
        slotName: "Morning",
        time: "7:00 AM",
        icon: "Sun",
        emoji: "🌅",
        title: "Hibiscus & Pomegranate Antioxidant Tonic + Walnuts",
        tag: "Nitric Oxide Booster",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        calories: 130,
        protein: 3,
        carbs: 8,
        fat: 10,
        prepTime: "5 min",
        cookTime: "5 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Freshly brewed dried hibiscus petal infusion paired with 4 raw walnut halves rich in alpha-linolenic acid (ALA).",
        benefits: ["Naturally relaxes vascular walls", "Potent anthocyanins", "Lowers systolic blood pressure"],
        ingredients: [
          { name: "Dried Organic Hibiscus Petals", amount: "1 tbsp" },
          { name: "Boiling Water", amount: "250 ml" },
          { name: "Raw Walnut Halves", amount: "4 pieces" },
          { name: "Fresh Mint Leaf", amount: "2 leaves" }
        ],
        steps: [
          "Steep hibiscus petals in boiling water for 5 minutes until ruby red.",
          "Strain into a cup and sip along with raw walnuts."
        ],
        chefTips: "Hibiscus tea contains natural ACE-inhibitory bioactive peptides that support healthy blood pressure.",
        youtubeVideos: [
          { id: "yt1", title: "Hibiscus Tea: The Heart Blood Pressure Wonder", duration: "8:10", channel: "Cardio Health", query: "hibiscus tea blood pressure study" },
          { id: "yt2", title: "Why Walnuts Are the Ultimate Heart Food", duration: "6:20", channel: "Brain & Heart", query: "walnuts cardiovascular health benefits" },
          { id: "yt3", title: "Daily Habits for Arterial Health", duration: "9:40", channel: "Doctor Oz", query: "daily habits for clean arteries" }
        ],
        orderQuery: "Hibiscus Tea Raw Walnuts"
      },
      {
        id: "hf-m2",
        slotName: "Breakfast",
        time: "8:30 AM",
        icon: "Coffee",
        emoji: "🥣",
        title: "Warm Cinnamon Pear & Golden Flaxseed Oatmeal",
        tag: "Soluble Fiber Shield",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        calories: 390,
        protein: 15,
        carbs: 58,
        fat: 12,
        prepTime: "10 min",
        cookTime: "10 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Coarse rolled oats simmered with diced ripe pear, freshly ground golden flaxseeds, almond milk, and Ceylon cinnamon.",
        benefits: ["Binds bile acids to reduce LDL", "Potassium balances sodium", "Zero cholesterol"],
        ingredients: [
          { name: "Rolled Oats", amount: "50g" },
          { name: "Fresh Bosc Pear (diced)", amount: "1 medium" },
          { name: "Ground Golden Flaxseed", amount: "1 tbsp" },
          { name: "Unsweetened Almond Milk", amount: "250 ml" },
          { name: "Ceylon Cinnamon", amount: "1/2 tsp" }
        ],
        steps: [
          "Simmer oats with diced pear in almond milk until tender.",
          "Turn off heat and fold in ground flaxseed and cinnamon.",
          "Serve warm in a ceramic bowl."
        ],
        chefTips: "Always grind flaxseeds right before eating because whole seeds pass through undigested.",
        youtubeVideos: [
          { id: "yt1", title: "Heart-Healthy Oatmeal Recipes", duration: "7:15", channel: "Cardio Kitchen", query: "heart healthy oatmeal recipes" },
          { id: "yt2", title: "Ground Flaxseed vs Flax Oil", duration: "5:00", channel: "Nutrition Facts", query: "ground flaxseed vs flax oil heart" },
          { id: "yt3", title: "How Soluble Fiber Lowers LDL", duration: "8:30", channel: "Med School Clips", query: "soluble fiber cholesterol mechanism" }
        ],
        orderQuery: "Oatmeal Bowl with Fresh Fruit"
      },
      {
        id: "hf-m3",
        slotName: "Lunch",
        time: "1:30 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "Tuscan White Bean & Kale Skillet with Wild Rice",
        tag: "Plant Potassium Power",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 540,
        protein: 26,
        carbs: 76,
        fat: 14,
        prepTime: "12 min",
        cookTime: "15 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Creamy cannellini beans braised in extra virgin olive oil, garlic, sun-dried tomatoes, and baby kale, served alongside nutty wild rice pilaf.",
        benefits: ["High magnesium and potassium", "Polyphenols protect LDL from oxidation", "Complete plant protein"],
        ingredients: [
          { name: "Cannellini White Beans (cooked)", amount: "1.5 cups (240g)" },
          { name: "Baby Tuscan Kale (shredded)", amount: "2 cups" },
          { name: "Cooked Wild & Brown Rice Mix", amount: "1 cup" },
          { name: "Sun-Dried Tomatoes (in olive oil)", amount: "2 tbsp chopped" },
          { name: "Extra Virgin Olive Oil (first cold press)", amount: "1 tbsp" },
          { name: "Garlic & Italian Herbs", amount: "3 cloves garlic + oregano" }
        ],
        steps: [
          "Warm extra virgin olive oil on gentle heat, sauté garlic until fragrant.",
          "Add white beans, sun-dried tomatoes, and vegetable broth; simmer for 8 minutes.",
          "Stir in kale for the final 2 minutes until bright green and tender.",
          "Serve over warm wild rice pilaf."
        ],
        chefTips: "Extra virgin olive oil contains oleocanthal, a natural anti-inflammatory compound similar to low-dose ibuprofen.",
        youtubeVideos: [
          { id: "yt1", title: "Tuscan White Bean & Kale Skillet", duration: "8:45", channel: "Mediterranean Dish", query: "tuscan white bean kale recipe" },
          { id: "yt2", title: "Why Cannellini Beans Are a Superfood", duration: "5:30", channel: "Plant Nutrition", query: "cannellini beans benefits heart" },
          { id: "yt3", title: "Olive Oil Selection Guide", duration: "10:15", channel: "Olive Oil Expert", query: "how to buy real extra virgin olive oil" }
        ],
        orderQuery: "Tuscan White Bean Kale Salad"
      },
      {
        id: "hf-m4",
        slotName: "Evening Snack",
        time: "5:00 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Dark Chocolate Square (85%) & Roasted Pumpkin Seeds",
        tag: "Flavonoid Treat",
        image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=800&q=80",
        calories: 180,
        protein: 7,
        carbs: 12,
        fat: 13,
        prepTime: "2 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegan",
        description: "20g of 85% single-origin dark cocoa paired with lightly toasted unsalted pumpkin seeds.",
        benefits: ["Flavanols enhance endothelial nitric oxide", "High zinc & magnesium", "Low sugar"],
        ingredients: [
          { name: "85%+ Dark Chocolate", amount: "20g (2 squares)" },
          { name: "Raw or Lightly Toasted Pumpkin Seeds", amount: "1.5 tbsp (15g)" }
        ],
        steps: [
          "Melt the dark chocolate slowly on your tongue.",
          "Follow with crunchy pumpkin seeds for texture."
        ],
        chefTips: "Choose chocolate with at least 85% cocoa solids to maximize flavanols while keeping sugar minimal.",
        youtubeVideos: [
          { id: "yt1", title: "The Cardiologist Guide to Dark Chocolate", duration: "6:50", channel: "Heart Docs", query: "dark chocolate heart health benefits" },
          { id: "yt2", title: "Magnesium for Heart Rhythm & Sleep", duration: "8:20", channel: "Cardiology Today", query: "magnesium heart rhythm benefits" },
          { id: "yt3", title: "Healthy Afternoon Desk Snacks", duration: "5:40", channel: "Clean Bites", query: "healthy afternoon snacks heart" }
        ],
        orderQuery: "Dark Chocolate Healthy Nuts"
      },
      {
        id: "hf-m5",
        slotName: "Dinner",
        time: "8:00 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "Grilled Trout / Herbed Tofu with Roasted Beetroot & Lentils",
        tag: "Nitrate & Folate Rich Dinner",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
        calories: 530,
        protein: 34,
        carbs: 48,
        fat: 18,
        prepTime: "15 min",
        cookTime: "20 min",
        isVeg: false,
        dietType: "Pescatarian / Vegetarian Option",
        description: "Pan-roasted rainbow trout (or firm herbed tofu steak) served over French green Puy lentils, roasted balsamic beetroot wedges, and fresh arugula.",
        benefits: ["Beet nitrates improve microcirculation", "EPA & DHA omega-3s reduce triglycerides", "High folate"],
        ingredients: [
          { name: "Rainbow Trout Fillet (or Herbed Tofu)", amount: "150g" },
          { name: "Cooked French Green Lentils", amount: "1 cup (180g)" },
          { name: "Roasted Red Beetroot (wedges)", amount: "1 medium (100g)" },
          { name: "Wild Baby Arugula", amount: "1 packed cup" },
          { name: "Balsamic Glaze & Olive Oil", amount: "1 tsp each" }
        ],
        steps: [
          "Toss beetroot wedges in balsamic and roast at 200°C for 20 minutes until tender.",
          "Sear trout fillet in olive oil for 3 minutes each side until flaky.",
          "Plate warm green lentils, top with fresh arugula, roasted beets, and the trout fillet."
        ],
        chefTips: "Beetroot is one of the world's richest natural sources of dietary inorganic nitrates.",
        youtubeVideos: [
          { id: "yt1", title: "Pan Seared Trout with Roasted Beets", duration: "9:30", channel: "Seafood Chef", query: "pan seared trout roasted beets" },
          { id: "yt2", title: "How Beetroot Nitrates Lower Blood Pressure", duration: "8:15", channel: "Medical Science", query: "beetroot juice nitrates blood pressure" },
          { id: "yt3", title: "Why Green Lentils Are Heart Superfoods", duration: "6:00", channel: "NutriPulse", query: "green lentils nutrition heart health" }
        ],
        orderQuery: "Grilled Fish Green Lentil Salad"
      }
    ]
  },
  {
    id: "student-budget-plan",
    slug: "student-budget-plan",
    title: "Student Quick & Budget Power Routine",
    subtitle: "Under 15-minute, ultra-affordable high-nutrition meals made with simple pantry staples.",
    category: "Student",
    categoryId: "student",
    badge: "Budget & Speed",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    description: "Designed for busy students and young professionals. Zero complicated culinary equipment, under $4 per day cost equivalent, high in brain-fueling choline, B-complex, and steady complex carbs.",
    difficulty: "Super Easy",
    mealsCount: 4,
    prepTimeAvg: "10-12 min",
    calories: 2100,
    protein: 105,
    carbs: 275,
    fat: 58,
    fiber: 38,
    rating: 4.8,
    reviewsCount: 388,
    tags: ["Under 15 Min", "Budget Friendly", "Pantry Staples", "Brain Boost", "Dorm Friendly"],
    isVegetarian: true,
    isLowSugar: false,
    isHighProtein: true,
    disclaimer: "All meals can be prepped using a single electric kettle, microwave, or basic single-burner hot plate.",
    dailyTimeline: [
      {
        id: "sb-m1",
        slotName: "Breakfast",
        time: "8:00 AM",
        icon: "Coffee",
        emoji: "🥣",
        title: "Overnight PB & Banana Power Oats in a Jar",
        tag: "0-Minute Morning Prep",
        image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80",
        calories: 490,
        protein: 22,
        carbs: 72,
        fat: 14,
        prepTime: "3 min (night before)",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Vegetarian",
        description: "Prep before sleep: Rolled oats soaked in milk, peanut butter, chia seeds, and sliced banana. Grab straight from the fridge and eat during morning lecture!",
        benefits: ["Zero morning cooking required", "Budget friendly staples", "Sustained focus without caffeine crash"],
        ingredients: [
          { name: "Rolled Oats", amount: "60g (3/4 cup)" },
          { name: "Cow Milk or Soy/Almond Milk", amount: "180 ml" },
          { name: "Peanut Butter", amount: "1.5 tbsp" },
          { name: "Banana (sliced)", amount: "1 whole" },
          { name: "Chia or Flax Seeds", amount: "1 tsp" }
        ],
        steps: [
          "In a mason jar or reusable container, mix oats, milk, peanut butter, and chia seeds.",
          "Top with sliced banana, screw the lid, and refrigerate overnight.",
          "Eat cold in the morning or warm for 45 seconds in the microwave."
        ],
        chefTips: "Buy bulk rolled oats and peanut butter for maximum monthly savings.",
        youtubeVideos: [
          { id: "yt1", title: "5 Easy Overnight Oats for College Students", duration: "7:20", channel: "College Eats", query: "easy overnight oats college budget" },
          { id: "yt2", title: "How to Eat Healthy in College Under $30/Week", duration: "12:40", channel: "Student Budget Life", query: "cheap healthy student meal prep" },
          { id: "yt3", title: "Best Brain Foods for Exam Weeks", duration: "6:15", channel: "Study Hacks", query: "brain food for studying focus" }
        ],
        orderQuery: "Overnight Oats Fruit Jar"
      },
      {
        id: "sb-m2",
        slotName: "Lunch",
        time: "1:00 PM",
        icon: "Utensils",
        emoji: "🍛",
        title: "10-Minute Egg / Paneer Fried Brown Rice & Veggies",
        tag: "Quick Wok Master",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 580,
        protein: 28,
        carbs: 78,
        fat: 16,
        prepTime: "5 min",
        cookTime: "8 min",
        isVeg: true,
        dietType: "Eggetarian / Vegetarian",
        description: "Quick skillet fried rice using day-old leftover rice, 2 scrambled eggs (or paneer cubes), frozen mixed vegetables, soy sauce, and sesame oil.",
        benefits: ["Uses leftover rice and frozen veggies", "Under 10 minutes from stove to plate", "High protein and fiber"],
        ingredients: [
          { name: "Cooked Brown / White Rice", amount: "1.5 cups (leftover cold)" },
          { name: "Eggs or Paneer cubes", amount: "2 eggs or 100g paneer" },
          { name: "Frozen Mixed Veggies (peas, carrots, corn)", amount: "1 cup" },
          { name: "Soy Sauce & Sriracha / Chili Garlic", amount: "1 tbsp + 1 tsp" },
          { name: "Vegetable Oil", amount: "1 tsp" }
        ],
        steps: [
          "Heat oil in a skillet, add frozen veggies and sauté for 2 minutes.",
          "Push veggies to side, crack eggs (or add paneer), and scramble.",
          "Add cold rice and soy sauce, stir-fry on high heat for 3-4 minutes until steaming and aromatic."
        ],
        chefTips: "Cold leftover rice fries much crisper than freshly cooked warm rice.",
        youtubeVideos: [
          { id: "yt1", title: "10-Minute Student Fried Rice", duration: "6:10", channel: "Student Cook", query: "10 minute egg fried rice student" },
          { id: "yt2", title: "Single Pan Dorm Room Cooking", duration: "9:50", channel: "Dorm Chef", query: "one pan meals college dorm" },
          { id: "yt3", title: "Frozen Vegetables Nutrition Myth Busted", duration: "5:30", channel: "Science of Food", query: "frozen vegetables nutrition vs fresh" }
        ],
        orderQuery: "Egg Fried Rice Veggie Bowl"
      },
      {
        id: "sb-m3",
        slotName: "Evening Snack",
        time: "5:00 PM",
        icon: "Flame",
        emoji: "🥜",
        title: "Toasted Bread with Boiled Spiced Eggs / Hummus & Carrots",
        tag: "Study Focus Snack",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
        calories: 320,
        protein: 16,
        carbs: 34,
        fat: 12,
        prepTime: "5 min",
        cookTime: "0 min",
        isVeg: true,
        dietType: "Eggetarian / Vegetarian",
        description: "2 whole grain toast slices paired with sliced boiled eggs sprinkled with black pepper, or crunchy raw carrot sticks with creamy hummus.",
        benefits: ["Choline in egg yolk supports memory retention", "Zero cooking required", "Prevents junk food vending machine runs"],
        ingredients: [
          { name: "Whole Wheat Bread", amount: "2 slices" },
          { name: "Boiled Eggs (or 3 tbsp Hummus)", amount: "2 whole eggs" },
          { name: "Carrot / Cucumber Sticks", amount: "1 cup" },
          { name: "Black Pepper & Chaat Masala", amount: "To taste" }
        ],
        steps: [
          "Toast bread until golden.",
          "Slice boiled eggs, lay on toast, and dust with black pepper and a pinch of salt.",
          "Enjoy with crunchy carrot sticks."
        ],
        chefTips: "Boil a batch of 8 eggs on Sunday night and keep in the fridge for instant snacks all week.",
        youtubeVideos: [
          { id: "yt1", title: "Hard Boiled Egg Peeling Hack That Never Fails", duration: "4:00", channel: "Kitchen Hacks", query: "easy peel hard boiled eggs hack" },
          { id: "yt2", title: "Cheap High Protein Study Snacks", duration: "7:40", channel: "Student Nutrition", query: "cheap high protein student snacks" },
          { id: "yt3", title: "Top Foods for Memory & Exam Prep", duration: "8:10", channel: "Brain Guide", query: "foods that improve memory concentration" }
        ],
        orderQuery: "Egg Toast Healthy Snack"
      },
      {
        id: "sb-m4",
        slotName: "Dinner",
        time: "8:30 PM",
        icon: "Moon",
        emoji: "🌙",
        title: "One-Pot Creamy Red Lentil Curry & Roti / Rice",
        tag: "Comforting 15-Min Dinner",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
        calories: 610,
        protein: 34,
        carbs: 86,
        fat: 14,
        prepTime: "5 min",
        cookTime: "15 min",
        isVeg: true,
        dietType: "Vegan",
        description: "Quick red lentils (masoor dal) simmered with canned diced tomatoes, garlic, curry powder, and a swirl of coconut or dairy milk, eaten with warm rotis or rice.",
        benefits: ["Red lentils cook in only 12 minutes without soaking", "Packed with iron, folate, and plant protein", "Costs under $1.50 per serving"],
        ingredients: [
          { name: "Dry Split Red Lentils (Masoor Dal)", amount: "80g (approx 1/2 cup)" },
          { name: "Canned Diced Tomatoes / Fresh Tomatoes", amount: "1/2 cup" },
          { name: "Whole Wheat Rotis (or 1 cup cooked rice)", amount: "2 rotis" },
          { name: "Curry Powder, Turmeric, Cumin", amount: "1 tsp curry + 1/2 tsp each" },
          { name: "Garlic, Ginger & Oil", amount: "1 tsp oil + 2 cloves minced" }
        ],
        steps: [
          "Rinse red lentils quickly under tap water.",
          "In a small pot, heat oil, add garlic, curry powder, and tomatoes; cook for 2 minutes.",
          "Add red lentils and 1.5 cups water. Simmer on medium for 12-14 minutes until creamy.",
          "Season with salt and squeeze of lemon. Serve hot with warm rotis."
        ],
        chefTips: "Red lentils break down naturally into a thick, velvety stew without needing any blender or cream.",
        youtubeVideos: [
          { id: "yt1", title: "15-Minute Red Lentil Curry (Dal Tadka)", duration: "7:50", channel: "Easy Vegan", query: "15 minute red lentil curry masoor dal" },
          { id: "yt2", title: "College Student 1-Pot Dinner Recipes", duration: "10:15", channel: "Student Meals", query: "one pot college dinner recipes" },
          { id: "yt3", title: "Why Red Lentils Are the Ultimate Fast Food", duration: "5:45", channel: "Quick Nutrition", query: "red lentils nutrition fast cooking" }
        ],
        orderQuery: "Dal Tadka Roti Meal"
      }
    ]
  }
];

// Merged global list with all standard routines and rich regional & western routines
export const ROUTINES_DATA = [
  ...BASE_ROUTINES_DATA,
  ...Object.values(REGIONAL_ROUTINES_MAP)
];

// Helper lookup methods
export const getRoutineById = (id) => ROUTINES_DATA.find((r) => r.id === id || r.slug === id);
export const getRoutinesByCategory = (catId) => ROUTINES_DATA.filter((r) => r.categoryId === catId || r.category.toLowerCase().includes(catId.toLowerCase()));
