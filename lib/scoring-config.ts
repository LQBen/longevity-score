import 'server-only';

// Point values for each answer option per question
export const pointValues: Record<string, Record<string, number>> = {
  smoking: {
    never: 12,
    tried_few_times: 11,
    quit: 8,
    occasionally: 3,
    frequently: 0,
  },
  physical_activity: {
    very_active: 10,
    some_exercise: 7,
    some_movement: 2,
    sedentary: 0,
  },
  stress: {
    low: 10,
    medium: 6,
    varies: 3,
    high: 0,
  },
  future_outlook: {
    optimistic: 7,
    accepting: 5,
    dont_think: 3,
    nervous: 1,
    pessimistic: 0,
  },
  aging_attitude: {
    positive: 6,
    blase: 6,
    annoyed_wrinkles: 3,
    worry_best_years: 1,
    fear_dread: 0,
  },
  social_connection: {
    active_fulfilled: 8,
    content: 6,
    wish_more: 2,
    lonely: 0,
  },
  diet: {
    balanced_healthy: 6,
    seafood: 6,
    plant: 5,
    balanced_indulgent: 5,
    meat: 3,
    other: 2,
  },
  junk_food: {
    never: 4,
    occasionally: 4,
    most_days: 1,
    daily: 0,
  },
  religion: {
    regularly_observant: 6,
    not_regularly: 4,
    prefer_not_say: 2,
    not_particularly: 1,
  },
  work: {
    full_time: 6,
    part_time: 5,
    student: 4,
    unemployed: 0,
    homemaker: 6,
    retired: 6,
    financially_independent: 5,
  },
  marriage: {
    yes: 4,
    no: 0,
  },
  children: {
    biological: 4,
    adopted: 3,
    no: 0,
  },
  sleep_hours: {
    over_8: 4,
    '6_to_8': 4,
    under_6: 0,
  },
  sleep_pattern: {
    consistent: 3,
    naps: 3,
    irregular: 0,
    other: 1,
  },
  alcohol: {
    never: 4,
    religious: 4,
    quit: 3,
    occasionally: 2,
    frequently: 0,
  },
  living_environment: {
    rural: 3,
    suburban: 2,
    urban: 0,
  },
  physique: {
    thin: 3,
    average: 3,
    muscular: 3,
    stocky: 1,
    underweight: 0,
    overweight: 0,
    obese: 0,
    prefer_not_say: 0,
  },
};

// Bonus point values
export const bonusValues: Record<string, Record<string, number>> = {
  biological_sex: {
    female: 2,
    male: 0,
    prefer_not_to_say: 0,
  },
  family_longevity: {
    yes: 2,
    no: 0,
    not_sure: 0,
  },
};

// Scored question IDs (the 17 lifestyle questions)
export const scoredQuestionIds = [
  'smoking', 'physical_activity', 'stress', 'future_outlook', 'aging_attitude',
  'social_connection', 'diet', 'junk_food', 'religion', 'work',
  'marriage', 'children', 'sleep_hours', 'sleep_pattern', 'alcohol',
  'living_environment', 'physique',
];

// Tier definitions
export interface TierDef {
  min: number;
  max: number;
  label: string;
  message: string;
}

export const tiers: TierDef[] = [
  {
    min: 90, max: 100,
    label: 'Longevity Champion',
    message: "Congratulations! You are a Longevity Champion. Your lifestyle is strongly aligned with the habits of the world's longest-lived people. Your choices and habits are preparing you for a long, healthy life. For you, the biggest challenge may be maintaining this momentum. See which factors boosted your score and which ones — if any — are holding you back. Want to see how your friends or family would score? Share the quiz!",
  },
  {
    min: 80, max: 89,
    label: 'Longevity Optimized',
    message: "Awesome! You are Longevity Optimized. Your lifestyle is highly conducive to a long, healthy life — maybe even supercentenarian territory. This is the second-highest result possible, so you're doing a lot of things right. See which factors are working in your favor and which few adjustments could push you into Longevity Champion territory.",
  },
  {
    min: 70, max: 79,
    label: 'Longevity Inclined',
    message: "Nice work! You are Longevity Inclined. Your lifestyle is generally aligned with longevity patterns seen in supercentenarians. There's room for improvement, but you're doing more right than wrong. Very few supercentenarians had lifestyles considered perfect by today's medical standards, so you're in good company. See what's boosting your score and what's holding it back.",
  },
  {
    min: 50, max: 69,
    label: 'Longevity Enabled',
    message: "You're on the right track! You are Longevity Enabled. Your current lifestyle makes a long life possible. Some of your choices align with patterns seen in supercentenarians, but others may be working against you. See what's helping and what's hurting — a few changes could make a big difference.",
  },
  {
    min: 25, max: 49,
    label: 'Longevity Challenged',
    message: "You are Longevity Challenged. Your current lifestyle may be limiting your longevity potential. While some choices are on the right track, several of your habits may be holding you back. The good news? It's never too late. Many supercentenarians had imperfect habits in some areas but excelled in others. See which factors are working against you and where small changes could have the biggest impact.",
  },
  {
    min: 0, max: 24,
    label: 'Longevity Warning',
    message: "This is a Longevity Warning. Your current lifestyle is significantly misaligned with the habits of the world's longest-lived people. This score suggests that many of your habits conflict with patterns seen in supercentenarians. But your Longevity Score is a starting point — not a sentence. Even small changes can shift your trajectory. See which factors had the biggest negative impact — some simple improvements may surprise you.",
  },
];

// Factor conditional messages
interface ConditionRange {
  min: number;
  max: number;
  classification: 'booster' | 'neutral' | 'hazard';
  message: string;
}

interface FactorConfig {
  category: string;
  // Which question IDs contribute to this factor's score
  questionIds: string[];
  conditions: ConditionRange[];
  cta: { text: string; url: string };
}

export const factorConfigs: FactorConfig[] = [
  {
    category: 'Smoking',
    questionIds: ['smoking'],
    conditions: [
      { min: 12, max: 12, classification: 'booster', message: "Not smoking is the single most impactful longevity booster. The vast majority of supercentenarians never smoked. Scientific research over decades has identified smoking as the lifestyle habit most damaging to a person's longevity. By not smoking, you've likely added years to your life." },
      { min: 11, max: 11, classification: 'booster', message: "Not smoking is the single most impactful longevity booster. Having only tried smoking a few times without developing a habit puts you in the same category as lifelong non-smokers. The vast majority of supercentenarians never smoked." },
      { min: 8, max: 8, classification: 'booster', message: "Quitting smoking is a major longevity booster — congratulations! Scientific research has identified smoking as the lifestyle habit most damaging to longevity. The good news is that within 10-15 years of quitting, most of the damage can be reversed. While some supercentenarians famously smoked, they are rare exceptions." },
      { min: 3, max: 3, classification: 'hazard', message: "Smoking occasionally is a longevity hazard, even if it's not routine. Scientific research over decades has identified smoking as the lifestyle habit most damaging to a person's longevity. While some supercentenarians famously smoked, they are rare exceptions. Reducing or eliminating your smoking — even occasional — would be one of the highest-impact changes you could make." },
      { min: 0, max: 0, classification: 'hazard', message: "Frequent smoking is the most significant longevity hazard in this assessment. Scientific research over decades has identified smoking as the lifestyle habit most damaging to a person's longevity. While some supercentenarians famously smoked, they are rare exceptions. Quitting smoking would likely have a bigger impact on your longevity than any other single change." },
    ],
    cta: { text: 'Learn more about smoking and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Physical Activity',
    questionIds: ['physical_activity'],
    conditions: [
      { min: 10, max: 10, classification: 'booster', message: "Your level of physical activity is a major longevity booster. Few supercentenarians had strict exercise regimens, but almost all of them stayed physically active in their daily lives — walking, gardening, doing chores, staying on their feet. You're doing the same. Keep it up!" },
      { min: 7, max: 7, classification: 'booster', message: "Your level of physical activity is a longevity booster. You're getting some regular movement, which aligns well with supercentenarian patterns. Few of them were gym-goers — most just stayed on their feet throughout the day. You're on the right track." },
      { min: 2, max: 2, classification: 'hazard', message: "Your activity level is a longevity hazard. You're getting some movement, but spending most of the day seated or inactive works against you. Few supercentenarians had strict exercise regimens, but almost all of them stayed physically active in daily life. Even small increases — a daily walk, standing more, doing chores — can make a meaningful difference." },
      { min: 0, max: 0, classification: 'hazard', message: "A sedentary lifestyle is a major longevity hazard. Almost all supercentenarians stayed physically active in their daily lives, even if they never set foot in a gym. Minimal physical movement throughout the day is one of the strongest predictors of reduced longevity. Start small — even brief daily walks can begin to shift this in your favor." },
    ],
    cta: { text: 'Learn more about physical activity and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Stress',
    questionIds: ['stress'],
    conditions: [
      { min: 10, max: 10, classification: 'booster', message: "A low stress level is a major longevity booster. Almost all supercentenarians reported low stress levels. A calm, even-keeled temperament is one of the most consistent traits among the world's longest-lived people. Kudos to you for finding ways to cope with life's challenges." },
      { min: 6, max: 6, classification: 'neutral', message: "A medium stress level is a moderate longevity hazard. Almost all supercentenarians reported low stress levels. You're not in the danger zone, but reducing your stress could meaningfully improve your longevity outlook. Even small coping strategies can make a difference." },
      { min: 3, max: 3, classification: 'hazard', message: "A varying or inconsistent stress level is a longevity hazard. Almost all supercentenarians reported consistently low stress. The unpredictability of your stress may be as harmful as the stress itself. Finding ways to create more stability and calm in your daily routine could help." },
      { min: 0, max: 0, classification: 'hazard', message: "A high level of stress is a serious longevity hazard. Almost all supercentenarians reported low stress levels — it's one of the most consistent traits among the world's longest-lived people. While it's often difficult to fix the root causes of stress, finding ways to cope with it should be a priority. Even small changes can make a big difference over time." },
    ],
    cta: { text: 'Learn more about stress and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Future Outlook',
    questionIds: ['future_outlook'],
    conditions: [
      { min: 7, max: 7, classification: 'booster', message: "Even past the age of 100, most supercentenarians feel optimistic about the future. Their positive outlook often comes from focusing on their own lives rather than on world events outside their control. You share this positive outlook, making it a longevity booster for you." },
      { min: 5, max: 5, classification: 'booster', message: "Even past the age of 100, most supercentenarians feel optimistic about the future. Their positive outlook often comes from focusing on their own lives rather than on world events outside their control. Accepting whatever comes reflects a calm equanimity that many supercentenarians share. This is a longevity booster for you." },
      { min: 3, max: 3, classification: 'neutral', message: "Even past the age of 100, most supercentenarians feel optimistic about the future. You reported that you don't think much about the future. If that means you enjoy living in the moment, it may be a minor longevity booster. But if it reflects avoidance or apathy, it could work against you." },
      { min: 1, max: 1, classification: 'hazard', message: "Even past the age of 100, most supercentenarians feel optimistic about the future. Their positive outlook often comes from focusing on their own lives rather than on world events outside their control. Feeling nervous or concerned about the future is a longevity hazard, but it's one that can shift with deliberate focus on what you can control." },
      { min: 0, max: 0, classification: 'hazard', message: "Even past the age of 100, most supercentenarians feel optimistic about the future. A pessimistic outlook on the future is a significant longevity hazard. The world's longest-lived people tend to focus on their own lives and the people around them rather than on events beyond their control. Shifting your focus inward may help." },
    ],
    cta: { text: 'Learn more about outlook and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Attitude on Aging',
    questionIds: ['aging_attitude'],
    conditions: [
      { min: 6, max: 6, classification: 'booster', message: "Not many people who fear getting old make it to age 110. Your positive or neutral attitude toward aging is a longevity booster. Supercentenarians tend to embrace aging or simply not dwell on it." },
      { min: 3, max: 3, classification: 'neutral', message: "Not many people who fear getting old make it to age 110. However, some supercentenarians remained concerned about their appearance even into very late age. This vanity may actually help — looking younger can make someone feel younger. Your attitude is a minor longevity booster." },
      { min: 1, max: 1, classification: 'hazard', message: "Not many people who fear getting old make it to age 110. Worrying that your best years are behind you is a longevity hazard. Supercentenarians overwhelmingly report feeling that life continues to have value and meaning at every age." },
      { min: 0, max: 0, classification: 'hazard', message: "Not many people who fear getting old make it to age 110. Fear or dread about aging is a significant longevity hazard. The world's longest-lived people tend to approach aging with acceptance or even enthusiasm. Getting to know the stories of LongeviQuest-verified supercentenarians may help you see that aging doesn't have to be something you dread." },
    ],
    cta: { text: 'Learn more about aging attitudes and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Social Connection',
    questionIds: ['social_connection'],
    conditions: [
      { min: 8, max: 8, classification: 'booster', message: "Most supercentenarians reported high levels of social connection throughout their lives. This doesn't necessarily mean they were extremely socially active — it means they were satisfied with the connections they had. You share that same sense of fulfillment, making this a major longevity booster." },
      { min: 6, max: 6, classification: 'booster', message: "Most supercentenarians reported being satisfied with their social connections throughout their lives. You feel content with your level of social contact, which is what matters most — it's satisfaction, not quantity, that correlates with longevity. This is a longevity booster for you." },
      { min: 2, max: 2, classification: 'hazard', message: "Most supercentenarians reported being satisfied with their social connections. You indicated that you wish you had more social activity. The gap between what you have and what you want is itself a longevity hazard. Building even one or two more meaningful connections could make a difference." },
      { min: 0, max: 0, classification: 'hazard', message: "Most supercentenarians reported high levels of social satisfaction throughout their lives. Feeling lonely or isolated is a significant longevity hazard — research suggests its health impact is comparable to smoking. Building meaningful connections at any age can make a real difference, and even small steps matter." },
    ],
    cta: { text: 'Learn more about social connection and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Diet',
    questionIds: ['diet', 'junk_food'],
    conditions: [
      { min: 8, max: 10, classification: 'booster', message: "Your reported diet is a longevity booster. Most supercentenarians kept balanced diets rich in whole foods. Among those with strong food preferences, seafood was more common than meat or plants. Treating yourself is fine — most supercentenarians had a favorite indulgence — and moderation is what matters. Great job." },
      { min: 6, max: 7, classification: 'neutral', message: "Your reported diet is not significantly hurting or helping your score. Most supercentenarians kept balanced diets rich in whole foods. You're close to a longevity booster here — a few tweaks toward more whole foods or moderating snack frequency could tip the scale." },
      { min: 3, max: 5, classification: 'hazard', message: "Your reported diet is a longevity hazard. Most supercentenarians kept balanced diets rich in whole foods. Among those with strong food preferences, seafood was more common than meat. Treating yourself occasionally is fine — most supercentenarians had a favorite unhealthy snack — but moderation is key. Consider shifting toward more balanced, whole-food meals." },
      { min: 0, max: 2, classification: 'hazard', message: "Your reported diet is a significant longevity hazard. Most supercentenarians kept balanced diets rich in whole foods and ate indulgences in moderation. Your combination of diet type and snack frequency works against you. Even gradual shifts toward more balanced meals and less frequent junk food could meaningfully improve your longevity outlook." },
    ],
    cta: { text: 'Learn more about diet and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Religion / Spirituality',
    questionIds: ['religion'],
    conditions: [
      { min: 6, max: 6, classification: 'booster', message: "Nearly all supercentenarians report having religious or spiritual beliefs, regardless of location or culture. Additional research has linked longevity to a sense that life has purpose. Your regular observance is a longevity booster." },
      { min: 4, max: 4, classification: 'booster', message: "Nearly all supercentenarians report having religious or spiritual beliefs, regardless of location or culture. Even without regular observance, having spiritual beliefs may provide a sense of purpose and community that supports longevity. This is a longevity booster for you." },
      { min: 2, max: 2, classification: 'neutral', message: "Nearly all supercentenarians report having religious or spiritual beliefs. You preferred not to share details, which is completely fine. Research has linked longevity to feeling that life has purpose — whether that comes from faith, community, or something else entirely." },
      { min: 1, max: 1, classification: 'hazard', message: "Nearly all supercentenarians report having religious or spiritual beliefs, regardless of location or culture. Additional research has linked longevity to a sense that life has purpose. This factor is statistically a longevity hazard for you, but it can be outweighed by others — and purpose can come from many sources beyond religion." },
    ],
    cta: { text: 'Learn more about spirituality and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Work History',
    questionIds: ['work'],
    conditions: [
      { min: 5, max: 6, classification: 'booster', message: "Most supercentenarians worked in some fashion. Work provides structure, meaning, and often physical activity. Even those who never held a traditional job worked hard as homemakers or on the family farm. Your work history is a longevity booster." },
      { min: 4, max: 4, classification: 'booster', message: "Most supercentenarians worked throughout their lives. Being a student or working part-time still provides structure and purpose, which are the key longevity-related benefits of work. This is a minor longevity booster for you." },
      { min: 0, max: 0, classification: 'hazard', message: "Most supercentenarians worked in some fashion — not necessarily in traditional jobs, but in ways that gave their days structure and meaning. Not working is a longevity hazard, but it's one that can change. Volunteering, caregiving, or any purposeful routine can provide similar benefits." },
    ],
    cta: { text: "Discover what keeps the World's Oldest Barber showing up to work every day.", url: 'https://longeviquest.com/2024/01/worlds-oldest-barber-gives-perfect-haircut-at-age-107/' },
  },
  {
    category: 'Marriage and Family',
    questionIds: ['marriage', 'children'],
    conditions: [
      { min: 7, max: 8, classification: 'booster', message: "Most supercentenarians were married and had children at some point in their lives. Having both is a longevity booster — the combination provides deep social bonds, purpose, and a support network that extends into old age." },
      { min: 3, max: 6, classification: 'neutral', message: "Most supercentenarians were married with children, but not all. Having experienced one of the two still provides some of the social bonding and sense of purpose associated with longevity. This is a minor longevity booster." },
      { min: 0, max: 0, classification: 'hazard', message: "Most supercentenarians were married with children — but some reached 110 without either. Statistically, not having married or had children is a longevity hazard. However, so long as you are content with your life choices and have meaningful social connections, this factor can be outweighed by others." },
    ],
    cta: { text: 'Learn more about family and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Sleep Habits',
    questionIds: ['sleep_hours', 'sleep_pattern'],
    conditions: [
      { min: 7, max: 7, classification: 'booster', message: "Longevity is fueled by good sleep. Sleep is measured both in duration and consistency. You're doing well in both categories — getting adequate hours with a reliable pattern. Your sleep habits are a longevity booster." },
      { min: 4, max: 6, classification: 'neutral', message: "Longevity is fueled by good sleep, measured in both duration and consistency. You're doing reasonably well but there's room for improvement in either how long you sleep or how consistent your pattern is. Small adjustments could turn this into a full longevity booster." },
      { min: 1, max: 3, classification: 'hazard', message: "Longevity is fueled by good sleep, measured in both duration and consistency. Your sleep habits are a longevity hazard — you may be getting too few hours, sleeping on an irregular schedule, or both. Improving your sleep routine could have a meaningful impact on your longevity outlook." },
      { min: 0, max: 0, classification: 'hazard', message: "Your sleep habits are a significant longevity hazard. Getting under 6 hours of sleep with an irregular pattern works strongly against you. Longevity is fueled by consistent, adequate sleep. This is one of the most actionable factors in the assessment — improving your sleep routine could deliver real results." },
    ],
    cta: { text: 'Learn more about sleep and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Alcohol',
    questionIds: ['alcohol'],
    conditions: [
      { min: 4, max: 4, classification: 'booster', message: "Avoiding alcohol — or limiting it to religious observance — is a longevity booster. While some supercentenarians drank in moderation, consuming alcohol regularly for relaxation or pleasure is not a common behavior among the world's longest-lived people." },
      { min: 3, max: 3, classification: 'neutral', message: "Quitting alcohol is a positive step for longevity. While some supercentenarians drank in moderation, those who didn't drink at all are more common. Having quit puts you in a better position than current drinkers, even social ones." },
      { min: 2, max: 2, classification: 'hazard', message: "Social or occasional drinking is a moderate longevity hazard. While some supercentenarians did drink, those who abstained are more common among the world's longest-lived people. Having an active social life is a positive factor — but alcohol itself is not." },
      { min: 0, max: 0, classification: 'hazard', message: "Frequently consuming alcohol is a significant longevity hazard. Even supercentenarians who drank did so in moderation. Reducing your alcohol consumption would likely improve your longevity outlook." },
    ],
    cta: { text: 'Learn more about alcohol and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Living Environment',
    questionIds: ['living_environment'],
    conditions: [
      { min: 3, max: 3, classification: 'booster', message: "Living in a rural area or village is a longevity booster. Rural environments are heavily represented in the supercentenarian population. Reasons may include better air quality, closer family connections, and the physical activity associated with rural life." },
      { min: 2, max: 2, classification: 'neutral', message: "Most supercentenarians do not live in big cities. Living in a suburban area or town is a minor longevity booster. You get some of the benefits of lower density — less pollution, potentially stronger community ties — without the isolation of very rural areas." },
      { min: 0, max: 0, classification: 'hazard', message: "While not a major factor, living in an urban area is a minor longevity hazard. City dwellers are underrepresented in the supercentenarian population, possibly due to pollution, noise, and transit stress. But what you do every day matters far more than where you live — this is one of the least important factors in the assessment." },
    ],
    cta: { text: 'Learn more about environment and longevity →', url: 'https://longeviquest.com' },
  },
  {
    category: 'Physique',
    questionIds: ['physique'],
    conditions: [
      { min: 3, max: 3, classification: 'booster', message: "Most supercentenarians maintained a thin to average physique throughout their lives. Your reported physique aligns with this pattern, making it a minor longevity booster. The circumstances that shape our physique are mostly factored in elsewhere in this assessment." },
      { min: 1, max: 1, classification: 'neutral', message: "Your reported physique is a minor factor. Being stocky isn't ideal from a longevity perspective, but it's far from the most important variable. The circumstances that shape our physique are mostly factored in elsewhere in this assessment." },
      { min: 0, max: 0, classification: 'hazard', message: "Being significantly underweight or overweight is a longevity hazard. Most supercentenarians maintained a thin to average physique. However, physique is one of the least important factors in this assessment — what you do (activity, diet, stress management) matters more than what you weigh." },
    ],
    cta: { text: 'Learn more about physique and longevity →', url: 'https://longeviquest.com' },
  },
];

// Bonus configs
export interface BonusConfig {
  questionId: string;
  category: string;
  triggerValue: string;
  points: number;
  bonusMessage: string;
  neutralMessage: string;
}

export const bonusConfigs: BonusConfig[] = [
  {
    questionId: 'biological_sex',
    category: 'Female Longevity Advantage',
    triggerValue: 'female',
    points: 2,
    bonusMessage: "Being female is widely recognized as a biological longevity advantage. About 90% of supercentenarians are female. This isn't a lifestyle factor — it's a biological one. Your Longevity Score includes a +2 bonus displayed separately from your lifestyle score.",
    neutralMessage: "Being female is widely recognized as a biological longevity advantage — about 90% of supercentenarians are female. This isn't a lifestyle factor, so you weren't penalized. Your Longevity Score measures what you can control.",
  },
  {
    questionId: 'family_longevity',
    category: 'Family Longevity Advantage',
    triggerValue: 'yes',
    points: 2,
    bonusMessage: "Having direct relatives who reached the age of 90 provides an inherited longevity advantage. Your family history earns you a +2 bonus displayed separately from your lifestyle score. The science is clear — longevity runs in families.",
    neutralMessage: "Having direct relatives who reached 90 provides an inherited longevity advantage. Since Longevity Score is a lifestyle assessment, you weren't penalized for not having this. Your score measures what you can control.",
  },
];

// Age factor messages
export function getAgeFactorMessage(age: number): string {
  if (age >= 80) {
    return `At ${age}, you have already exceeded the life expectancy in most countries. Whatever your score, you're doing something right!`;
  }
  return `At ${age}, your longevity journey is still unfolding. Keep making choices that help you stay strong, active, and optimistic.`;
}

// Severity labels based on percentage of max points
export type SeverityLevel = 'major_booster' | 'minor_booster' | 'neutral' | 'minor_hazard' | 'major_hazard';

export function getSeverityLevel(points: number, maxPoints: number): SeverityLevel {
  if (maxPoints === 0) return 'neutral';
  const pct = (points / maxPoints) * 100;
  if (pct >= 80) return 'major_booster';
  if (pct >= 60) return 'minor_booster';
  if (pct >= 40) return 'neutral';
  if (pct >= 20) return 'minor_hazard';
  return 'major_hazard';
}

export function getSeverityLabel(severity: SeverityLevel): string {
  switch (severity) {
    case 'major_booster': return 'Major Longevity Booster';
    case 'minor_booster': return 'Minor Longevity Booster';
    case 'neutral': return 'Neutral';
    case 'minor_hazard': return 'Minor Longevity Hazard';
    case 'major_hazard': return 'Major Longevity Hazard';
  }
}

// Calculate max points for a factor's question IDs
function getMaxPoints(questionIds: string[]): number {
  let max = 0;
  for (const qId of questionIds) {
    const values = pointValues[qId];
    if (values) {
      max += Math.max(...Object.values(values));
    }
  }
  return max;
}

// Calculate score from answers
export function calculateScore(answers: Record<string, string | number>) {
  // Calculate lifestyle score
  let lifestyleScore = 0;
  for (const qId of scoredQuestionIds) {
    const answer = answers[qId];
    if (typeof answer === 'string' && pointValues[qId]?.[answer] !== undefined) {
      lifestyleScore += pointValues[qId][answer];
    }
  }

  // Calculate bonuses and add to score
  let bonusTotal = 0;
  const bonuses: Array<{ category: string; points: number; message: string }> = [];
  for (const bc of bonusConfigs) {
    const answer = answers[bc.questionId];
    if (answer === bc.triggerValue) {
      bonuses.push({ category: bc.category, points: bc.points, message: bc.bonusMessage });
      bonusTotal += bc.points;
    }
  }

  // Final score = lifestyle + bonuses, capped at 100
  const finalScore = Math.min(lifestyleScore + bonusTotal, 100);

  // Determine tier based on final score (with bonuses)
  const tier = tiers.find(t => finalScore >= t.min && finalScore <= t.max) || tiers[tiers.length - 1];

  // Calculate factor breakdowns with severity
  const factors: Array<{
    category: string;
    classification: 'booster' | 'neutral' | 'hazard';
    severity: SeverityLevel;
    severityLabel: string;
    message: string;
    cta: { text: string; url: string };
    points: number;
    maxPoints: number;
  }> = [];

  for (const fc of factorConfigs) {
    // Sum points for this factor's questions
    let factorPoints = 0;
    for (const qId of fc.questionIds) {
      const answer = answers[qId];
      if (typeof answer === 'string' && pointValues[qId]?.[answer] !== undefined) {
        factorPoints += pointValues[qId][answer];
      }
    }

    const maxPoints = getMaxPoints(fc.questionIds);
    const severity = getSeverityLevel(factorPoints, maxPoints);

    // Find matching condition
    const condition = fc.conditions.find(c => factorPoints >= c.min && factorPoints <= c.max);
    if (condition) {
      factors.push({
        category: fc.category,
        classification: condition.classification,
        severity,
        severityLabel: getSeverityLabel(severity),
        message: condition.message,
        cta: fc.cta,
        points: factorPoints,
        maxPoints,
      });
    }
  }

  // Sort factors by severity then by maxPoints (highest weight first)
  const severityOrder: Record<SeverityLevel, number> = {
    major_booster: 0,
    minor_booster: 1,
    neutral: 2,
    minor_hazard: 3,
    major_hazard: 4,
  };
  factors.sort((a, b) => {
    const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (sevDiff !== 0) return sevDiff;
    return b.maxPoints - a.maxPoints; // Higher weight first within same severity
  });

  // Age factor
  const age = typeof answers.age === 'number' ? answers.age : parseInt(answers.age as string) || 30;
  const ageMessage = getAgeFactorMessage(age);

  return {
    score: finalScore,
    tier: { label: tier.label, message: tier.message },
    bonuses,
    factors,
    age_factor: { age, message: ageMessage },
  };
}
