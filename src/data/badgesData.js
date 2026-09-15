// Badges, Milestones, and Progression Stage Definitions

export const STAGES_CONFIG = [
  {
    stage: 1,
    name: "Bronze Initiate",
    minStreak: 0,
    maxStreak: 6,
    color: "#CD7F32",
    badgeIcon: "🥉",
    description: "Beginning your wellness journey with daily consistency."
  },
  {
    stage: 2,
    name: "Silver Practitioner",
    minStreak: 7,
    maxStreak: 13,
    color: "#94A3B8",
    badgeIcon: "🥈",
    description: "Completed 1 full week of routine nutrition!"
  },
  {
    stage: 3,
    name: "Gold Master",
    minStreak: 14,
    maxStreak: 29,
    color: "#F59E0B",
    badgeIcon: "🥇",
    description: "Completed 2 full weeks of disciplined dietary habit."
  },
  {
    stage: 4,
    name: "Platinum Champion",
    minStreak: 30,
    maxStreak: 59,
    color: "#06B6D4",
    badgeIcon: "👑",
    description: "Completed 1 whole month (30 days) of routine mastery!"
  },
  {
    stage: 5,
    name: "Diamond Legend",
    minStreak: 60,
    maxStreak: 9999,
    color: "#8B5CF6",
    badgeIcon: "💎",
    description: "60+ Days of peak lifestyle transformation."
  }
];

export const BADGES_DATA = [
  {
    id: "daily-starter",
    title: "Daily Routine Master",
    category: "Daily Milestones",
    icon: "🏅",
    criteria: "Complete all scheduled meals for 1 day",
    requiredDays: 1,
    gradient: "linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)",
    borderColor: "#F59E0B",
    description: "Successfully checked off and ate every planned meal for today."
  },
  {
    id: "weekly-warrior",
    title: "7-Day Streak Warrior",
    category: "Weekly Milestones",
    icon: "🛡️",
    criteria: "Complete a full 7-day week of health routines",
    requiredDays: 7,
    gradient: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
    borderColor: "#10B981",
    description: "Completed 1 entire week (7 consecutive days) of healthy meal schedules."
  },
  {
    id: "fortnight-legend",
    title: "14-Day Consistency Titan",
    category: "Multi-Week Milestones",
    icon: "⚡",
    criteria: "Maintain active routine streak for 14 continuous days",
    requiredDays: 14,
    gradient: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    borderColor: "#3B82F6",
    description: "Two straight weeks of metabolic balance and dietary discipline."
  },
  {
    id: "monthly-grandmaster",
    title: "30-Day Monthly Grandmaster",
    category: "Monthly Milestones",
    icon: "👑",
    criteria: "Complete 1 full month (30 days) of routine nutrition",
    requiredDays: 30,
    gradient: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
    borderColor: "#A855F7",
    description: "A full 30-day month of complete dietary discipline."
  },
  {
    id: "sixty-day-titan",
    title: "60-Day Diamond Master",
    category: "Monthly Milestones",
    icon: "💎",
    criteria: "Achieve 60 days (2 months) of continuous active routine",
    requiredDays: 60,
    gradient: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    borderColor: "#06B6D4",
    description: "Two full months of transformative health and longevity."
  },
  {
    id: "regional-foodie",
    title: "Cultural Cuisine Explorer",
    category: "Exploration",
    icon: "📍",
    criteria: "Explore and practice authentic regional dishes from your location",
    requiredDays: 1,
    gradient: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
    borderColor: "#F97316",
    description: "Practiced authentic traditional recipes tailored to your location."
  },
  {
    id: "hydration-hero",
    title: "Hydro Champion",
    category: "Hydration",
    icon: "💧",
    criteria: "Reach the daily target of 8+ glasses of water",
    requiredDays: 1,
    gradient: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    borderColor: "#0284C7",
    description: "Maintained optimal cellular hydration with 2,000+ ml water intake."
  },
  {
    id: "recipe-curator",
    title: "Recipe Collector",
    category: "Recipe Book",
    icon: "❤️",
    criteria: "Save 3 or more favorite meal recipes to your personal collection",
    requiredDays: 1,
    gradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    borderColor: "#F43F5E",
    description: "Curated your favorite healthy dishes in your saved recipe book."
  }
];

export function calculateStage(streakDays = 0) {
  const safeStreak = Math.max(0, Number(streakDays) || 0);
  for (let i = STAGES_CONFIG.length - 1; i >= 0; i--) {
    if (safeStreak >= STAGES_CONFIG[i].minStreak) {
      return STAGES_CONFIG[i];
    }
  }
  return STAGES_CONFIG[0];
}
