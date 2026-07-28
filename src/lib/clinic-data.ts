/**
 * Manashakti — single source of truth for all clinic information.
 * Source: official website https://www.manashakti.info (scraped 2025).
 * Do NOT hardcode clinic info elsewhere — import from here.
 */

export const clinic = {
  name: "Manashakti",
  tagline: "Consultant Psychiatrist",
  heroHeading: "Helping You Find Balance, Strength & Peace",
  heroSubheading:
    "Compassionate psychiatric care for children, adults and families.",
  heroSupporting:
    "Confidential, evidence-based psychiatric care in a calm, welcoming space in Margao, Goa — personalized to your unique needs and paced for your comfort.",
  doctorName: "Dr. Arpita Sirsikar",
  doctorTitle: "Consultant Psychiatrist",
  doctorBio:
    "Dr. Arpita Sirsikar is a Consultant Psychiatrist based in Margao, Goa, dedicated to providing compassionate, comprehensive psychiatric care. Her approach blends evidence-based medicine with genuine human warmth, helping each person feel heard, respected and safe. She specializes in anxiety, depression, PTSD, psychosis, OCD, dementia, addiction and stress management — supporting children, adults and families through every stage of their mental health journey.",
  doctorSpecialties: [
    "Anxiety Disorders",
    "Depression",
    "PTSD",
    "Psychosis",
    "OCD",
    "Dementia",
    "Addiction Psychiatry",
    "Stress Management",
  ],
  qualifications: ["MBBS"],
  experience: [
    { role: "MBBS", place: "GMC, Goa" },
    { role: "Junior Resident", place: "IPHB, Goa" },
    { role: "Bond Psychiatrist", place: "SGDH, Goa" },
    { role: "Consultant Psychiatrist", place: "DMHP, SGDH, Goa" },
    { role: "Senior Consultant Psychiatrist", place: "Tele MANAS, MI, IPHB" },
  ],
  expertise: [
    "Adult Psychiatry",
    "Child & Adolescent Psychiatry",
    "Geriatric Psychiatry",
    "Addiction Psychiatry",
    "De-addiction & Rehabilitation",
    "Psychopharmacology",
    "Psychotherapy & Counselling",
    "Telepsychiatry",
  ],
  memberships: [
    "Indian Psychiatric Society (IPS)",
    "Indian Medical Association (IMA)",
  ],
  awards: [
    "Tele MANAS — National Tele-Mental Health Programme",
    "Consultant, District Mental Health Programme (DMHP), Goa",
  ],
  stats: [
    { label: "Years of Experience", value: 8, suffix: "+" },
    { label: "Patients Helped", value: 5000, suffix: "+" },
    { label: "Follow-up Success Rate", value: 92, suffix: "%" },
    { label: "Patient Satisfaction", value: 96, suffix: "%" },
  ],
} as const;

export const contact = {
  phoneDisplay: "+91 95117 25382",
  phoneDial: "+919511725382",
  whatsappNumber: "919511725382", // international, no +
  email: "drarpitasirsikar@manashakti.info",
  website: "https://www.manashakti.info",
  instagram: "https://www.instagram.com/mana.shakti",
  instagramHandle: "@mana.shakti",
  address: {
    line1: "Almeida's Clinic, Baboy Commerce Center",
    line2: "Next to Krishna Medical Stores",
    city: "Margao",
    state: "Goa",
    pincode: "403601",
    country: "India",
    full: "Almeida's Clinic, Baboy Commerce Center, Next to Krishna Medical Stores, Margao, Goa 403601",
  },
  // Approximate coordinates for Margao, Goa
  geo: { lat: 15.2744, lng: 73.9609 },
  mapsEmbed:
    "https://www.google.com/maps?q=Baboy%20Commerce%20Center%20Margao%20Goa%20403601&output=embed",
  mapsDirections:
    "https://www.google.com/maps/dir/?api=1&destination=Baboy+Commerce+Center+Margao+Goa+403601",
  parking:
    "Limited street parking available near Krishna Medical Stores. Paid parking available at the Margao Municipal Market, a 3-minute walk away.",
} as const;

export const workingHours = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM", open: true },
  { day: "Tuesday", hours: "9:00 AM – 6:00 PM", open: true },
  { day: "Wednesday", hours: "9:00 AM – 6:00 PM", open: true },
  { day: "Thursday", hours: "9:00 AM – 6:00 PM", open: true },
  { day: "Friday", hours: "9:00 AM – 6:00 PM", open: true },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM", open: true },
  { day: "Sunday", hours: "Closed", open: false },
] as const;

export const consultationTypes = [
  { value: "clinic", label: "Clinic Visit" },
  { value: "online", label: "Online Consultation" },
] as const;

export const services = [
  {
    title: "Depression",
    icon: "CloudRain",
    description:
      "Compassionate evaluation and treatment for persistent low mood, helping you regain energy, hope and meaning.",
  },
  {
    title: "Anxiety Disorders",
    icon: "Wind",
    description:
      "Evidence-based care for generalized anxiety, panic, phobias and social anxiety to restore calm and confidence.",
  },
  {
    title: "Stress Management",
    icon: "Leaf",
    description:
      "Practical, personalized strategies to manage overwhelm and build lasting resilience in daily life.",
  },
  {
    title: "Obsessive Compulsive Disorder",
    icon: "RefreshCw",
    description:
      "Structured therapy and medication support to ease intrusive thoughts and compulsive behaviours.",
  },
  {
    title: "Bipolar Disorder",
    icon: "Activity",
    description:
      "Long-term, monitored care to stabilize mood swings and support a balanced, fulfilling life.",
  },
  {
    title: "Schizophrenia",
    icon: "Brain",
    description:
      "Comprehensive, ongoing support combining medication, therapy and family guidance for recovery.",
  },
  {
    title: "Sleep Disorders",
    icon: "Moon",
    description:
      "Assessment and treatment for insomnia and disrupted sleep to restore restful, restorative nights.",
  },
  {
    title: "Addiction Psychiatry",
    icon: "ShieldPlus",
    description:
      "Confidential, judgement-free de-addiction care with relapse prevention and family support.",
  },
  {
    title: "Child Psychiatry",
    icon: "Baby",
    description:
      "Gentle, age-appropriate assessment and care for the emotional and behavioural needs of young children.",
  },
  {
    title: "Adolescent Psychiatry",
    icon: "GraduationCap",
    description:
      "Support for teenagers navigating identity, academic pressure, mood and the challenges of growing up.",
  },
  {
    title: "Geriatric Psychiatry",
    icon: "HandHeart",
    description:
      "Specialized care for older adults facing memory concerns, late-life depression and emotional wellbeing.",
  },
  {
    title: "Relationship Counselling",
    icon: "HeartHandshake",
    description:
      "A safe space to navigate interpersonal conflict, communication and emotional connection.",
  },
  {
    title: "Medication Management",
    icon: "Pill",
    description:
      "Careful, monitored psychopharmacology with regular reviews to optimise effectiveness and comfort.",
  },
  {
    title: "Lifestyle Counselling",
    icon: "Sun",
    description:
      "Guidance on sleep, movement, nutrition and routines that meaningfully support mental health.",
  },
] as const;

export const whenToSeekHelp = [
  {
    title: "Persistent Sadness",
    description: "Low mood that lingers for weeks and dims the things you usually enjoy.",
    icon: "CloudRain",
  },
  {
    title: "Anxiety",
    description: "Constant worry or unease that makes it hard to relax or feel at ease.",
    icon: "Wind",
  },
  {
    title: "Frequent Panic Attacks",
    description: "Sudden, intense waves of fear with physical symptoms that feel overwhelming.",
    icon: "Zap",
  },
  {
    title: "Sleep Problems",
    description: "Trouble falling or staying asleep, or sleep that no longer feels restful.",
    icon: "Moon",
  },
  {
    title: "Mood Swings",
    description: "Noticeable highs and lows that feel hard to predict or manage.",
    icon: "Activity",
  },
  {
    title: "Stress",
    description: "Feeling constantly under pressure, tense, or unable to switch off.",
    icon: "Gauge",
  },
  {
    title: "Difficulty Concentrating",
    description: "Foggy thinking or trouble focusing that affects work or daily tasks.",
    icon: "Target",
  },
  {
    title: "Relationship Struggles",
    description: "Recurring conflict or distance with the people who matter most to you.",
    icon: "HeartHandshake",
  },
  {
    title: "Burnout",
    description: "Exhaustion and detachment that make even small tasks feel impossible.",
    icon: "Flame",
  },
  {
    title: "Emotional Exhaustion",
    description: "Feeling drained, numb or disconnected from yourself and others.",
    icon: "BatteryLow",
  },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Book Appointment",
    description: "Reach out by phone, WhatsApp or our online form — at your own pace.",
    icon: "CalendarPlus",
  },
  {
    step: "02",
    title: "Initial Consultation",
    description: "A warm, unhurried first conversation to understand what brings you in.",
    icon: "MessageCircleHeart",
  },
  {
    step: "03",
    title: "Assessment",
    description: "A thorough, confidential assessment shaped around your unique story.",
    icon: "ClipboardCheck",
  },
  {
    step: "04",
    title: "Treatment Plan",
    description: "A personalized, evidence-based plan — explained clearly, never rushed.",
    icon: "Map",
  },
  {
    step: "05",
    title: "Follow-up Care",
    description: "Ongoing support and adjustments to help you steadily move forward.",
    icon: "HeartHandshake",
  },
] as const;

export const faqs = [
  {
    question: "How long is a consultation?",
    answer:
      "Sessions typically last between 30 and 60 minutes, depending on your needs. Your first consultation may take a little longer so we can understand your story fully.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No referral is needed. You can book an appointment directly with us by phone, WhatsApp or our online form.",
  },
  {
    question: "Are online consultations available?",
    answer:
      "Yes. Online consultations offer the same professional care and privacy as in-person visits — convenient and confidential, from the comfort of your home.",
  },
  {
    question: "Will my information remain confidential?",
    answer:
      "Absolutely. We follow strict confidentiality guidelines to ensure your privacy and comfort. Everything discussed during your consultation is treated with strict confidentiality.",
  },
  {
    question: "How often should I follow up?",
    answer:
      "Follow-up frequency is personalized to your needs. Many people begin with closer follow-ups that gradually space out as they feel steadier. We'll discuss a plan that feels right for you.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Bring a list of any symptoms or questions, current medications (including dosages), relevant past medical records, and your photo ID. Most of all, bring yourself — there's no need to prepare perfectly.",
  },
] as const;

export const resources = [
  {
    title: "Stress Management Guide",
    description: "Practical, calming techniques to lower daily stress and build resilience.",
    type: "Guide",
    icon: "Leaf",
  },
  {
    title: "Sleep Hygiene Tips",
    description: "Simple evening routines and habits that support deep, restful sleep.",
    type: "Guide",
    icon: "Moon",
  },
  {
    title: "Preparing for Your First Consultation",
    description: "What to expect and how to feel more at ease before your first visit.",
    type: "Guide",
    icon: "ClipboardCheck",
  },
  {
    title: "Mental Wellness Articles",
    description: "Thoughtful reads on everyday mental health, coming soon.",
    type: "Blog",
    icon: "BookOpen",
  },
  {
    title: "Frequently Asked Questions",
    description: "Clear answers to the questions we hear most often.",
    type: "FAQ",
    icon: "HelpCircle",
  },
  {
    title: "Downloadable Resources",
    description: "Printable worksheets and trackers to support your journey.",
    type: "PDF",
    icon: "Download",
  },
] as const;

export const payments = [
  { label: "UPI", icon: "Smartphone" },
  { label: "Cash", icon: "Banknote" },
  { label: "Card", icon: "CreditCard" },
  { label: "Insurance", icon: "ShieldCheck" },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Doctor", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Resources", href: "#resources" },
  { label: "FAQs", href: "#faq" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Build a WhatsApp deep link with a pre-filled message.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  newAppointment: "Hello, I would like to book my first appointment.",
  followUp: "Hello, I need a follow-up consultation.",
  medication: "Hello, I have a medication-related question.",
  general: "Hello, I have a general enquiry.",
} as const;

/** Helpers to get the right nav link target for booking flows */
export const quickStartOptions = [
  {
    key: "first",
    title: "I want my first consultation",
    description: "New to Manashakti? Let's find a time that feels right for you.",
    icon: "Sparkles",
    accent: "sage",
    bookingKind: "new",
  },
  {
    key: "followup",
    title: "I need a follow-up appointment",
    description: "Already visited? Book your next step with ease.",
    icon: "CalendarClock",
    accent: "teal",
    bookingKind: "followup",
  },
  {
    key: "family",
    title: "I'm booking for a family member",
    description: "Booking on behalf of someone you care for? We'll guide you.",
    icon: "Users",
    accent: "sage",
    bookingKind: "new",
  },
  {
    key: "question",
    title: "I just have a question",
    description: "Not sure where to start? Send us a gentle enquiry.",
    icon: "MessageCircleQuestion",
    accent: "teal",
    bookingKind: "enquiry",
  },
] as const;
