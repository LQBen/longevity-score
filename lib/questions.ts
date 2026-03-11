// Client-safe question data — NO point values
export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: string;
  text: string;
  infobox?: string;
  options: QuestionOption[];
  type: 'select' | 'slider';
  sliderMin?: number;
  sliderMax?: number;
}

export const questions: Question[] = [
  // 1. Who are you answering for? (Q21 - Unscored)
  {
    id: 'who_answering_for',
    category: 'Context',
    text: 'Who are you answering for?',
    type: 'select',
    options: [
      { id: 'me', text: 'Me' },
      { id: 'spouse', text: 'Spouse / Significant Other' },
      { id: 'parent', text: 'Parent' },
      { id: 'grandparent', text: 'Grandparent' },
      { id: 'child', text: 'Child' },
      { id: 'friend', text: 'Friend' },
      { id: 'other', text: 'Other' },
    ],
  },
  // 2. How old are you now? (Q20 - Age slider)
  {
    id: 'age',
    category: 'Age',
    text: 'How old are you now?',
    infobox: 'The scale caps at 122 because that\'s the verified human longevity record, held by Jeanne Calment of France (1875–1997).',
    type: 'slider',
    sliderMin: 0,
    sliderMax: 122,
    options: [],
  },
  // 3. What is your biological sex? (Q18 - Bonus)
  {
    id: 'biological_sex',
    category: 'Female Advantage',
    text: 'What is your biological sex?',
    infobox: 'Biological sex is not a lifestyle factor. Females have a recognized biological longevity advantage, so this provides a small bonus.',
    type: 'select',
    options: [
      { id: 'female', text: 'Female' },
      { id: 'male', text: 'Male' },
      { id: 'prefer_not_to_say', text: 'Prefer not to say' },
    ],
  },
  // 4. Have any of your relatives reached the age of 90 or above? (Q19 - Bonus)
  {
    id: 'family_longevity',
    category: 'Family Advantage',
    text: 'Have any of your relatives reached the age of 90 or above?',
    infobox: 'Family history is not a lifestyle factor. Having relatives who lived past 90 may indicate an inherited longevity advantage.',
    type: 'select',
    options: [
      { id: 'yes', text: 'Yes' },
      { id: 'no', text: 'No' },
      { id: 'not_sure', text: 'Not sure' },
    ],
  },
  // 5. Do you smoke? (Q1 - Tier 1)
  {
    id: 'smoking',
    category: 'Smoking',
    text: 'Do you smoke?',
    infobox: 'Smoking is the lifestyle factor most strongly associated with reduced longevity. The vast majority of supercentenarians never smoked.',
    type: 'select',
    options: [
      { id: 'never', text: 'Never' },
      { id: 'tried_few_times', text: 'Only tried a few times' },
      { id: 'quit', text: 'I used to, but I quit' },
      { id: 'occasionally', text: 'Occasionally' },
      { id: 'frequently', text: 'Frequently' },
    ],
  },
  // 6. How physically active are you? (Q2 - Tier 1)
  {
    id: 'physical_activity',
    category: 'Physical Activity',
    text: 'How physically active are you?',
    infobox: 'Few supercentenarians had strict exercise regimens, but almost all stayed physically active in daily life.',
    type: 'select',
    options: [
      { id: 'very_active', text: 'I exercise frequently and stay physically active throughout the day' },
      { id: 'some_exercise', text: "I get some exercise and/or I'm on my feet most days (e.g. walking, chores, errands)" },
      { id: 'some_movement', text: 'I move around some, but spend most of the day seated or inactive' },
      { id: 'sedentary', text: 'Mostly sedentary (minimal physical movement throughout the day)' },
    ],
  },
  // 7. What's your typical stress level? (Q3 - Tier 1)
  {
    id: 'stress',
    category: 'Stress',
    text: "What's your typical stress level?",
    infobox: 'Almost all supercentenarians reported low stress levels. A calm temperament is one of the most consistent traits among the world\'s longest-lived people.',
    type: 'select',
    options: [
      { id: 'low', text: 'Low' },
      { id: 'medium', text: 'Medium' },
      { id: 'varies', text: 'Varies' },
      { id: 'high', text: 'High' },
    ],
  },
  // 8. How do you feel about the future? (Q4 - Tier 1)
  {
    id: 'future_outlook',
    category: 'Future Outlook',
    text: 'How do you feel about the future?',
    infobox: 'Even past 100, most supercentenarians feel optimistic. Their outlook often comes from focusing on their own lives rather than world events.',
    type: 'select',
    options: [
      { id: 'optimistic', text: 'Optimistic / excited' },
      { id: 'accepting', text: 'Accepting whatever comes' },
      { id: 'dont_think', text: "I don't think much about the future" },
      { id: 'nervous', text: 'Nervous / concerned' },
      { id: 'pessimistic', text: 'Pessimistic / dreading' },
    ],
  },
  // 9. Which best describes your view on aging? (Q5 - Tier 1)
  {
    id: 'aging_attitude',
    category: 'Attitude on Aging',
    text: 'Which best describes your view on aging?',
    infobox: 'Not many people who fear getting old make it to 110. A positive or neutral attitude toward aging is a consistent trait among supercentenarians.',
    type: 'select',
    options: [
      { id: 'positive', text: 'Older and wiser by the day – bring it on!' },
      { id: 'blase', text: 'Blasé – age is just a number.' },
      { id: 'annoyed_wrinkles', text: 'Annoyed only by visible signs of aging like wrinkles.' },
      { id: 'worry_best_years', text: 'I sometimes worry my best years are behind me.' },
      { id: 'fear_dread', text: 'Aging often gives me fear or dread.' },
    ],
  },
  // 10. How socially connected are you? (Q6 - Tier 2)
  {
    id: 'social_connection',
    category: 'Social Connection',
    text: 'How socially connected are you? Think about how often you interact with others or feel connected socially. It\'s about your own satisfaction.',
    type: 'select',
    options: [
      { id: 'active_fulfilled', text: 'I have an active social life that fulfills me.' },
      { id: 'content', text: 'I have enough social contact to be content.' },
      { id: 'wish_more', text: 'I have some social activity but wish I had more.' },
      { id: 'lonely', text: 'I often feel lonely or isolated from others.' },
    ],
  },
  // 11. Choose the most accurate description of your diet. (Q7 - Tier 2)
  {
    id: 'diet',
    category: 'Diet',
    text: 'Choose the most accurate description of your diet. Think about what\'s on your plate most often during meals.',
    type: 'select',
    options: [
      { id: 'balanced_healthy', text: 'Balanced, health-conscious' },
      { id: 'seafood', text: 'Seafood-focused' },
      { id: 'plant', text: 'Plant-focused' },
      { id: 'balanced_indulgent', text: 'Balanced, with indulgences' },
      { id: 'meat', text: 'Meat-focused' },
      { id: 'other', text: 'Other/unlisted' },
    ],
  },
  // 12. How often do you treat yourself to junk food, candy, or soda? (Q8 - Tier 2)
  {
    id: 'junk_food',
    category: 'Junk Food',
    text: 'How often do you treat yourself to junk food, candy, or soda?',
    infobox: 'Many supercentenarians enjoyed a favorite treat. Moderation matters more than total abstinence.',
    type: 'select',
    options: [
      { id: 'never', text: 'Never' },
      { id: 'occasionally', text: 'Occasionally' },
      { id: 'most_days', text: 'Most days' },
      { id: 'daily', text: 'Daily' },
    ],
  },
  // 13. Would you consider yourself religious / spiritual? (Q9 - Tier 2)
  {
    id: 'religion',
    category: 'Religion / Spirituality',
    text: 'Would you consider yourself religious / spiritual?',
    infobox: 'Nearly all supercentenarians report having religious or spiritual beliefs, regardless of location. Research also links longevity to feeling that life has purpose.',
    type: 'select',
    options: [
      { id: 'regularly_observant', text: 'Yes, regularly observant' },
      { id: 'not_regularly', text: 'Yes, but not regularly observant' },
      { id: 'prefer_not_say', text: 'Prefer not to say' },
      { id: 'not_particularly', text: 'Not particularly' },
    ],
  },
  // 14. Do you work? (Q10 - Tier 2)
  {
    id: 'work',
    category: 'Work History',
    text: 'Do you work?',
    infobox: "Choosing 'Retired' factors in that you worked for many years prior to retiring.",
    type: 'select',
    options: [
      { id: 'full_time', text: 'Yes, full-time' },
      { id: 'part_time', text: 'Yes, part-time' },
      { id: 'student', text: 'Student' },
      { id: 'unemployed', text: 'Unemployed / seeking work' },
      { id: 'homemaker', text: 'Homemaker' },
      { id: 'retired', text: 'Retired' },
      { id: 'financially_independent', text: "Financially independent / don't need to work" },
    ],
  },
  // 15. Have you ever been married? (Q11 - Tier 3)
  {
    id: 'marriage',
    category: 'Marriage',
    text: 'Have you ever been married?',
    type: 'select',
    options: [
      { id: 'yes', text: 'Yes' },
      { id: 'no', text: 'No' },
    ],
  },
  // 16. Do you have children? (Q12 - Tier 3)
  {
    id: 'children',
    category: 'Children',
    text: 'Do you have children?',
    infobox: 'If you have biological AND adopted children, please select the first option.',
    type: 'select',
    options: [
      { id: 'biological', text: 'Yes - biological' },
      { id: 'adopted', text: 'Yes - adopted' },
      { id: 'no', text: 'No / not yet' },
    ],
  },
  // 17. How many hours of sleep do you usually get? (Q13 - Tier 3)
  {
    id: 'sleep_hours',
    category: 'Sleep Hours',
    text: 'How many hours of sleep do you usually get?',
    type: 'select',
    options: [
      { id: 'over_8', text: 'Over 8 hours' },
      { id: '6_to_8', text: '6-8 hours' },
      { id: 'under_6', text: 'Under 6 hours' },
    ],
  },
  // 18. How would you describe your sleep pattern? (Q14 - Tier 3)
  {
    id: 'sleep_pattern',
    category: 'Sleep Pattern',
    text: 'How would you describe your sleep pattern?',
    type: 'select',
    options: [
      { id: 'consistent', text: 'I routinely get a full night\'s sleep with consistent hours.' },
      { id: 'naps', text: 'I supplement my nightly sleep with daytime naps.' },
      { id: 'irregular', text: 'My sleep hours are irregular or inconsistent.' },
      { id: 'other', text: 'Other' },
    ],
  },
  // 19. Do you drink alcohol? (Q15 - Tier 3)
  {
    id: 'alcohol',
    category: 'Alcohol',
    text: 'Do you drink alcohol?',
    type: 'select',
    options: [
      { id: 'never', text: 'Never' },
      { id: 'religious', text: 'Only for religious purposes' },
      { id: 'quit', text: "I used to, but don't anymore" },
      { id: 'occasionally', text: 'Occasionally / socially' },
      { id: 'frequently', text: 'Frequently' },
    ],
  },
  // 20. Which of these options best describes the area where you live? (Q16 - Tier 4)
  {
    id: 'living_environment',
    category: 'Living Environment',
    text: 'Which of these options best describes the area where you live?',
    type: 'select',
    options: [
      { id: 'rural', text: 'Rural / Village' },
      { id: 'suburban', text: 'Suburban / Town' },
      { id: 'urban', text: 'Urban / City' },
    ],
  },
  // 21. Choose the most accurate description of your current physique. (Q17 - Tier 4)
  {
    id: 'physique',
    category: 'Physique',
    text: 'Choose the most accurate description of your current physique.',
    type: 'select',
    options: [
      { id: 'thin', text: 'Thin' },
      { id: 'average', text: 'Average' },
      { id: 'muscular', text: 'Muscular' },
      { id: 'stocky', text: 'Stocky' },
      { id: 'underweight', text: 'Underweight' },
      { id: 'overweight', text: 'Overweight' },
      { id: 'obese', text: 'Obese' },
      { id: 'prefer_not_say', text: 'Prefer not to say' },
    ],
  },
  // 22. How long do you want to live? (Q22 - Unscored)
  {
    id: 'want_to_live',
    category: 'Post-Results',
    text: 'How long do you want to live?',
    type: 'select',
    options: [
      { id: 'forever', text: 'Forever' },
      { id: '110_plus', text: '110+ years' },
      { id: '91_110', text: '91-110' },
      { id: '81_90', text: '81-90' },
      { id: 'no_aspiration', text: "I don't have any particular longevity aspiration." },
    ],
  },
  // 23. What do you expect your Longevity Score will be? (Q23 - Unscored)
  {
    id: 'expected_score',
    category: 'Post-Results',
    text: 'What do you expect your Longevity Score will be?',
    type: 'select',
    options: [
      { id: 'champion', text: '91%+ – Longevity Champion' },
      { id: 'optimized', text: '80-90% – Longevity Optimized' },
      { id: 'inclined', text: '70-79% – Longevity Inclined' },
      { id: 'enabled', text: '50-69% – Longevity Enabled' },
      { id: 'challenged', text: '25-49% – Longevity Challenged' },
      { id: 'warning', text: '0-24% – Longevity Warning' },
    ],
  },
];
