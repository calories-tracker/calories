export const TODAY = {
  goal: 2200,
  consumed: 1420,
  protein: { g: 78, goal: 140 },
  carbs: { g: 165, goal: 240 },
  fat: { g: 52, goal: 75 },
  streak: 12,
  caloriesBurned: 487,
  activities: [
    { id: 1, type: 'Walk', emoji: '🚶', kcal: 142, duration: '38 min', time: '7:30 AM' },
    { id: 2, type: 'Strength', emoji: '🏋️', kcal: 215, duration: '45 min', time: '12:15 PM' },
    { id: 3, type: 'Cycling', emoji: '🚴', kcal: 130, duration: '22 min', time: '6:10 PM' },
  ],
  meals: [
    { id: 1, type: 'Breakfast', emoji: '🥣', name: 'Greek yogurt & berries', kcal: 320, time: '8:14 AM', quality: 88, bg: ['#F4E4C1', '#E8B4B8'] },
    { id: 2, type: 'Lunch', emoji: '🥗', name: 'Chicken caesar wrap', kcal: 540, time: '12:48 PM', quality: 64, bg: ['#C8E6C9', '#81C784'] },
    { id: 3, type: 'Snack', emoji: '🍎', name: 'Apple + almond butter', kcal: 220, time: '3:22 PM', quality: 92, bg: ['#FFCCBC', '#FF8A65'] },
    { id: 4, type: 'Dinner', emoji: '🍝', name: 'Pasta primavera', kcal: 340, time: '7:05 PM', quality: 71, bg: ['#FFE0B2', '#FFB74D'] },
  ],
};

export const ANALYSIS = {
  name: 'Avocado toast w/ poached egg',
  confidence: 94,
  kcal: 385,
  protein: 16,
  carbs: 32,
  fat: 22,
  items: [
    { name: 'Sourdough bread', kcal: 120, weight: '60g' },
    { name: 'Avocado', kcal: 160, weight: '½ medium' },
    { name: 'Poached egg', kcal: 78, weight: '1 large' },
    { name: 'Olive oil & seasoning', kcal: 27, weight: '~5ml' },
  ],
};

export const HISTORY_DAYS = [
  {
    label: 'Today', date: 'Apr 30',
    consumed: 1420, goal: null, meals: 4,
    items: [
      { emoji: '🥣', type: 'Breakfast', name: 'Greek yogurt & berries', kcal: 320, time: '8:14 AM', bg: ['#F4E4C1', '#E8B4B8'] },
      { emoji: '🥗', type: 'Lunch', name: 'Chicken caesar wrap', kcal: 540, time: '12:48 PM', bg: ['#C8E6C9', '#81C784'] },
      { emoji: '🍎', type: 'Snack', name: 'Apple + almond butter', kcal: 220, time: '3:22 PM', bg: ['#FFCCBC', '#FF8A65'] },
      { emoji: '🍝', type: 'Dinner', name: 'Pasta primavera', kcal: 340, time: '7:05 PM', bg: ['#FFE0B2', '#FFB74D'] },
    ],
  },
  {
    label: 'Yesterday', date: 'Apr 29',
    consumed: 2080, goal: 2200, meals: 4,
    items: [
      { emoji: '🥞', type: 'Breakfast', name: 'Pancakes & maple syrup', kcal: 480, time: '8:30 AM', bg: ['#FFE0B2', '#FFB74D'] },
      { emoji: '🍔', type: 'Lunch', name: 'Cheeseburger & fries', kcal: 820, time: '1:15 PM', bg: ['#FFCCBC', '#FF8A65'] },
      { emoji: '🍿', type: 'Snack', name: 'Popcorn', kcal: 180, time: '4:00 PM', bg: ['#F4E4C1', '#E8B4B8'] },
      { emoji: '🍣', type: 'Dinner', name: 'Salmon & rice bowl', kcal: 600, time: '7:30 PM', bg: ['#C8E6C9', '#81C784'] },
    ],
  },
  {
    label: 'Mon', date: 'Apr 28',
    consumed: 2310, goal: 2200, meals: 5,
    items: [
      { emoji: '🥐', type: 'Breakfast', name: 'Croissant & latte', kcal: 420, time: '8:00 AM', bg: ['#FFE0B2', '#FFB74D'] },
      { emoji: '🌯', type: 'Lunch', name: 'Burrito bowl', kcal: 760, time: '12:30 PM', bg: ['#C8E6C9', '#81C784'] },
      { emoji: '🍫', type: 'Snack', name: 'Dark chocolate', kcal: 200, time: '3:30 PM', bg: ['#FFCCBC', '#FF8A65'] },
      { emoji: '🍕', type: 'Dinner', name: 'Margherita pizza (2 slices)', kcal: 720, time: '7:45 PM', bg: ['#FFE0B2', '#FFB74D'] },
      { emoji: '🍷', type: 'Snack', name: 'Glass of red wine', kcal: 210, time: '9:00 PM', bg: ['#E8B4B8', '#C48B9F'] },
    ],
  },
  {
    label: 'Sun', date: 'Apr 27',
    consumed: 1890, goal: 2200, meals: 3,
    items: [
      { emoji: '🥑', type: 'Brunch', name: 'Avocado toast', kcal: 540, time: '10:30 AM', bg: ['#C8E6C9', '#81C784'] },
      { emoji: '🍝', type: 'Lunch', name: 'Pasta carbonara', kcal: 720, time: '2:00 PM', bg: ['#FFE0B2', '#FFB74D'] },
      { emoji: '🥗', type: 'Dinner', name: 'Caesar salad & soup', kcal: 630, time: '7:00 PM', bg: ['#C8E6C9', '#81C784'] },
    ],
  },
  {
    label: 'Sat', date: 'Apr 26',
    consumed: 2150, goal: 2200, meals: 4,
    items: [],
  },
  {
    label: 'Fri', date: 'Apr 25',
    consumed: 1950, goal: 2200, meals: 4,
    items: [],
  },
];

export const RANGE_DATA = {
  week: [
    { label: 'Thu', consumed: 1980, quality: 72 },
    { label: 'Fri', consumed: 1950, quality: 78 },
    { label: 'Sat', consumed: 2150, quality: 65 },
    { label: 'Sun', consumed: 1890, quality: 82 },
    { label: 'Mon', consumed: 2310, quality: 54 },
    { label: 'Tue', consumed: 2080, quality: 68 },
    { label: 'Wed', consumed: 1420, quality: 81 },
  ],
  month: [
    { label: '1', consumed: 1820, quality: 74 }, { label: '2', consumed: 2050, quality: 68 },
    { label: '3', consumed: 1760, quality: 82 }, { label: '4', consumed: 2200, quality: 61 },
    { label: '5', consumed: 1900, quality: 76 }, { label: '6', consumed: 2310, quality: 54 },
    { label: '7', consumed: 1650, quality: 85 }, { label: '8', consumed: 1980, quality: 70 },
    { label: '9', consumed: 2100, quality: 63 }, { label: '10', consumed: 1870, quality: 79 },
    { label: '11', consumed: 2280, quality: 58 }, { label: '12', consumed: 1750, quality: 83 },
    { label: '13', consumed: 2030, quality: 72 }, { label: '14', consumed: 1920, quality: 77 },
    { label: '15', consumed: 1680, quality: 88 }, { label: '16', consumed: 2150, quality: 65 },
    { label: '17', consumed: 1990, quality: 73 }, { label: '18', consumed: 2260, quality: 60 },
    { label: '19', consumed: 1810, quality: 81 }, { label: '20', consumed: 1730, quality: 86 },
    { label: '21', consumed: 2080, quality: 69 }, { label: '22', consumed: 1960, quality: 74 },
    { label: '23', consumed: 2200, quality: 62 }, { label: '24', consumed: 1850, quality: 80 },
    { label: '25', consumed: 1950, quality: 78 }, { label: '26', consumed: 2150, quality: 65 },
    { label: '27', consumed: 1890, quality: 82 }, { label: '28', consumed: 2310, quality: 54 },
    { label: '29', consumed: 2080, quality: 68 }, { label: '30', consumed: 1420, quality: 81 },
  ],
  year: [
    { label: 'May', consumed: 2020, quality: 71 },
    { label: 'Jun', consumed: 1940, quality: 75 },
    { label: 'Jul', consumed: 2100, quality: 68 },
    { label: 'Aug', consumed: 1980, quality: 74 },
    { label: 'Sep', consumed: 1870, quality: 79 },
    { label: 'Oct', consumed: 2050, quality: 72 },
    { label: 'Nov', consumed: 2200, quality: 65 },
    { label: 'Dec', consumed: 2350, quality: 58 },
    { label: 'Jan', consumed: 1750, quality: 82 },
    { label: 'Feb', consumed: 1880, quality: 78 },
    { label: 'Mar', consumed: 1960, quality: 75 },
    { label: 'Apr', consumed: 1850, quality: 79 },
  ],
};
