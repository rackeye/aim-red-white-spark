export type Course = {
  slug: string;
  title: string;
  group: "Foundation" | "Secondary" | "Senior Secondary";
  level: string;
  subjects: string[];
  batch: string;
  fees: {
    monthly?: string;
    quarterly?: string;
    halfYearly?: string;
    yearly?: string;
  };
  highlights: string[];
};

export type Topper = {
  name: string;
  exam: string;
  score: string;
  year: string;
  note: string;
  image?: string; // Optional image property for the UI
};

export const courses: Course[] = [
  {
    slug: "class-1-8",
    title: "Class 1 – 8 Junior Foundation",
    group: "Foundation",
    level: "Class 1 to 8",
    subjects: ["English", "Hindi", "Mathematics", "Social Science", "Science", "GK", "Computer"],
    batch: "Mon–Sat · 4:00 PM – 5:30 PM",
    fees: {
      quarterly: "₹4,500",
      halfYearly: "₹8,000",
      yearly: "₹14,000",
    },
    highlights: [
      "Activity based concept building",
      "Handwriting & reading practice",
      "Weekly parent feedback",
    ],
  },
  {
    slug: "class-9-10",
    title: "Class 9 & 10 Foundation (CBSE)",
    group: "Foundation",
    level: "Class 9 & 10",
    subjects: ["Mathematics", "Science", "GeoGraphy", "English", "Physics", "Chemistry", "Biology", "Computer", "History & Civics", "Economics"],
    batch: "Mon–Sat · 5:30 PM – 7:00 PM",
    fees: {
      halfYearly: "₹14,000",
      quarterly: "₹7,500",
      yearly: "₹23,000",
    },
    highlights: [
      "NCERT plus advanced worksheets",
      "Olympiad & NTSE foundation",
      "Monthly unit tests with analysis",
    ],
  },
  {
    slug: "class-9-10-icse",
    title: "Class 9 & 10 Foundation (ICSE)",
    group: "Foundation",
    level: "Class 9 & 10",
    subjects: ["Mathematics", "Science", "GeoGraphy", "English", "Physics", "Chemistry", "Biology", "Computer", "History & Civics", "Economics"],
    batch: "Mon–Sat · 5:30 PM – 7:00 PM",
    fees: {
      halfYearly: "₹15,000",
      quarterly: "₹8,500",
      yearly: "₹28,000",
    },
    highlights: [
      "NCERT plus advanced worksheets",
      "Olympiad & NTSE foundation",
      "Monthly unit tests with analysis",
    ],
  },
  {
    slug: "class-11-12-science",
    title: "Class 11 & 12 Science (CBSE)",
    group: "Senior Secondary",
    level: "Class 11 & 12 · Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science"],
    batch: "Mon–Sat · 5:30 PM – 7:30 PM",
    fees: {
      quarterly: "₹7,500",
      halfYearly: "₹14,500",
      yearly: "₹27,000",
    },
    highlights: [
      "Board + JEE/NEET integrated teaching",
      "Separate PCM and PCB sections",
      "Daily practice problem sheets",
    ],
  },
  {
    slug: "class-11-12-science-icse",
    title: "Class 11 & 12 Science (ICSE)",
    group: "Senior Secondary",
    level: "Class 11 & 12 · Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science"],
    batch: "Mon–Sat · 5:30 PM – 7:30 PM",
    fees: {
      quarterly: "₹9,000",
      halfYearly: "₹17,000",
      yearly: "₹30,000",
    },
    highlights: [
      "Board + JEE/NEET integrated teaching",
      "Separate PCM and PCB sections",
      "Daily practice problem sheets",
    ],
  },
  {
    slug: "class-11-12-commerce",
    title: "Class 11 & 12 Commerce (CBSE/ICSE)",
    group: "Senior Secondary",
    level: "Class 11 & 12 · Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics", "Maths", "English", "Computer Science/AI"],
    batch: "Mon–Sat · 3:00 PM – 5:30 PM",
    fees: {
      quarterly: "₹6,000",
      halfYearly: "₹11,000",
      yearly: "₹21,000",
    },
    highlights: [
      "Ledger to balance sheet, step by step",
      "CA Foundation orientation",
      "Case-study based economics",
    ],
  },
  {
    slug: "class-11-12-arts",
    title: "Class 11 & 12 Humanities (CBSE/ICSE)",
    group: "Senior Secondary",
    level: "Class 11 & 12 · Arts",
    subjects: ["History", "Political Science", "Geography", "Sociology", "English", "Economics"],
    batch: "Mon–Sat · 3:00 PM – 5:30 PM",
    fees: {
      quarterly: "₹6,000",
      halfYearly: "₹11,000",
      yearly: "₹21,000",
    },
    highlights: [
      "Answer writing practice",
      "Map & diagram mastery",
      "UPSC/CUET awareness classes",
    ],
  },
];

export const courseGroups = ["All", "Foundation", "Senior Secondary"] as const;

export const stats = [
  { value: "12+", label: "Years of teaching" },
  { value: "500+", label: "Students taught" },
  { value: "96%", label: "Above 80% in boards" },
  { value: "1:18", label: "Teacher to student ratio" },
];

export const faculty = [
  { name: "R. K. Sharma", subject: "Physics · Class 11–12", exp: "14 years" },
  { name: "Anjali Verma", subject: "Mathematics · Class 9–12", exp: "11 years" },
  { name: "S. Praveen", subject: "Chemistry · Class 11–12", exp: "9 years" },
  { name: "Neha Gupta", subject: "Biology · Class 11–12", exp: "8 years" },
  { name: "Arifa Khan", subject: "Accountancy & Economics", exp: "10 years" },
  { name: "Kavita Singh", subject: "Foundation Class 1–8", exp: "12 years" },
];

export const testimonials = [
  {
    name: "Ritika Yadav",
    detail: "Class 12 Science · 94.2%",
    quote:
      "The daily practice sheets and weekly tests made the board exam feel like just another test day.",
  },
  {
    name: "Aman Kumar",
    detail: "Class 10 · 96%",
    quote:
      "Doubt classes on Saturday were the biggest help. Teachers never moved ahead until the concept was clear.",
  },
  {
    name: "Sneha Patel",
    detail: "Class 12 Commerce · 91%",
    quote:
      "Accountancy used to scare me. Sir's step-by-step ledger method changed everything for me.",
  },
];

export const faqs = [
  {
    q: "Which classes and streams do you teach?",
    a: "We teach Class 1 to 10 (all subjects) and Class 11–12 in Science (PCM & PCB), Commerce and Arts/Humanities.",
  },
  {
    q: "How large are the batches?",
    a: "Every batch is capped at 18 students so each child gets individual attention and personal doubt time.",
  },
  {
    q: "Do you conduct regular tests?",
    a: "Yes. Weekly chapter tests, monthly unit tests and full-length model papers with detailed performance reports.",
  },
  {
    q: "Is a demo class available?",
    a: "Yes, every new student can attend two free demo classes before taking admission.",
  },
  {
    q: "Do you provide study material?",
    a: "All enrolled students receive printed notes, practice sheets and previous year question banks at no extra cost.",
  },
];

export const toppers: Topper[] = [
  { name: "Ritika Yadav", exam: "Class 12 · Science (PCB)", score: "94.2%", year: "2025", note: "State rank in Biology, now at a government medical college.", image: "/images/toppers/ritika.jpg" },
  { name: "Aman Kumar", exam: "Class 10 · Boards", score: "96.0%", year: "2025", note: "School topper — perfect 100 in Mathematics.", image: "/images/toppers/ritika.jpg"},
  { name: "Sneha Patel", exam: "Class 12 · Commerce", score: "91.4%", year: "2025", note: "Highest Accountancy score in the centre.", image: "/images/toppers/ritika.jpg" },
  { name: "Harsh Meena", exam: "Class 12 · Science (PCM)", score: "93.8%", year: "2024", note: "JEE Mains 98.1 percentile after two years with us.", image: "/images/toppers/ritika.jpg" },
  { name: "Ayesha Khan", exam: "Class 10 · Boards", score: "95.2%", year: "2024", note: "Full marks in Science and Social Science.", image: "/images/toppers/ritika.jpg" },
  { name: "Devansh Rai", exam: "Class 12 · Arts", score: "89.6%", year: "2024", note: "Topper in Political Science and History.", image: "/images/toppers/ritika.jpg" },
  { name: "Priya Sharma", exam: "Class 10 · Boards", score: "94.4%", year: "2023", note: "NTSE stage-1 qualifier from the foundation batch.", image: "/images/toppers/ritika.jpg" },
  { name: "Rohan Gupta", exam: "Class 12 · Science (PCM)", score: "92.0%", year: "2023", note: "Cleared NEET-level Physics with weekly test discipline.", image: "/images/toppers/ritika.jpg" },
];

export const topperStats = [
  { value: "100+", label: "Above 90% since 2019" },
  { value: "1000+", label: "Trusted Parents" },
  { value: "96%", label: "Students above 80%" },
  { value: "100%", label: "Board pass record" },
];

export const activities = [
  { title: "Weekly Test Series", text: "Every Saturday chapter test with an answer-discussion session the same evening.", tag: "Academics" },
  { title: "Doubt Marathon", text: "Monthly 3-hour open doubt desk where students bring anything unresolved.", tag: "Support" },
  { title: "Science Exhibition", text: "Annual model and experiment fair for Class 6–10 with parent judging.", tag: "Events" },
  { title: "Quiz League", text: "Inter-batch GK and subject quiz with a running points table across the year.", tag: "Events" },
  { title: "Olympiad Workshops", text: "Prep sprints for NSO, IMO and NTSE with previous-year paper drills.", tag: "Competitions" },
  { title: "Career Counselling", text: "Stream selection sessions for Class 10 students and their parents.", tag: "Guidance" },
  { title: "Parent–Teacher Meet", text: "Monthly progress meeting with a written performance report card.", tag: "Support" },
  { title: "Motivation Sessions", text: "Talks by alumni and toppers on study routine, focus and exam stress.", tag: "Wellbeing" },
];

export const specialCourses = [
  {
    slug: "crash-course-boards",
    title: "Board Exam Crash Course",
    audience: "Class 10 & 12 · All streams",
    duration: "60 days",
    fee: "₹4,500",
    points: ["Full syllabus revision map", "20 full-length model papers", "Answer-writing and presentation drill"],
  },
  {
    slug: "jee-neet-foundation",
    title: "JEE / NEET Foundation",
    audience: "Class 11 & 12 · Science",
    duration: "2 years",
    fee: "₹2,600 / month",
    points: ["NCERT plus advanced problem sets", "Weekly MCQ speed tests", "Doubt desk with subject specialists"],
  },
  {
    slug: "olympiad-ntse",
    title: "Olympiad & NTSE Prep",
    audience: "Class 6 to 10",
    duration: "6 months",
    fee: "₹1,500 / month",
    points: ["Logical reasoning modules", "Past 10-year paper practice", "Mock olympiad every fortnight"],
  },
  {
    slug: "spoken-english",
    title: "Spoken English & Personality",
    audience: "Class 5 to 12",
    duration: "3 months",
    fee: "₹1,000 / month",
    points: ["Daily speaking practice circles", "Group discussion and stage confidence", "Grammar correction workbook"],
  },
  {
    slug: "computer-basics",
    title: "Computer & Digital Skills",
    audience: "Class 4 to 9",
    duration: "4 months",
    fee: "₹900 / month",
    points: ["Typing, MS Office and internet safety", "Intro to Scratch coding", "Project-based assessment"],
  },
  {
    slug: "summer-camp",
    title: "Summer Learning Camp",
    audience: "Class 1 to 8",
    duration: "45 days",
    fee: "₹2,000",
    points: ["Handwriting and reading improvement", "Maths tables and mental ability", "Art, craft and activity hours"],
  },
];
