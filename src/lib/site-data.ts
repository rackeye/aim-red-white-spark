export type Course = {
  slug: string;
  title: string;
  group: "Foundation" | "Secondary" | "Senior Secondary";
  level: string;
  subjects: string[];
  batch: string;
  fee: string;
  highlights: string[];
};

export const courses: Course[] = [
  {
    slug: "class-1-5",
    title: "Class 1 – 5 Junior Foundation",
    group: "Foundation",
    level: "Class 1 to 5",
    subjects: ["English", "Hindi", "Mathematics", "EVS", "Basic Computer"],
    batch: "Mon–Sat · 4:00 PM – 5:30 PM",
    fee: "₹800 / month",
    highlights: [
      "Activity based concept building",
      "Handwriting & reading practice",
      "Weekly parent feedback",
    ],
  },
  {
    slug: "class-6-8",
    title: "Class 6 – 8 Foundation Booster",
    group: "Foundation",
    level: "Class 6 to 8",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Sanskrit"],
    batch: "Mon–Sat · 5:30 PM – 7:00 PM",
    fee: "₹1,200 / month",
    highlights: [
      "NCERT plus advanced worksheets",
      "Olympiad & NTSE foundation",
      "Monthly unit tests with analysis",
    ],
  },
  {
    slug: "class-9",
    title: "Class 9 Board Foundation",
    group: "Secondary",
    level: "Class 9",
    subjects: ["Mathematics", "Science", "Social Science", "English", "IT"],
    batch: "Mon–Sat · 6:00 PM – 8:00 PM",
    fee: "₹1,600 / month",
    highlights: [
      "Chapter-wise practice sheets",
      "Doubt sessions every Saturday",
      "Basics of JEE/NEET pattern questions",
    ],
  },
  {
    slug: "class-10",
    title: "Class 10 Board Champions",
    group: "Secondary",
    level: "Class 10",
    subjects: ["Mathematics", "Science", "Social Science", "English", "Hindi"],
    batch: "Mon–Sat · 7:00 AM – 9:00 AM",
    fee: "₹1,900 / month",
    highlights: [
      "Full syllabus done before January",
      "15+ full length board model papers",
      "Personal mentor for every student",
    ],
  },
  {
    slug: "class-11-science",
    title: "Class 11 Science (PCM / PCB)",
    group: "Senior Secondary",
    level: "Class 11 · Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
    batch: "Mon–Sat · 6:30 AM – 9:30 AM",
    fee: "₹2,600 / month",
    highlights: [
      "Board + JEE/NEET integrated teaching",
      "Separate PCM and PCB sections",
      "Daily practice problem sheets",
    ],
  },
  {
    slug: "class-11-commerce",
    title: "Class 11 Commerce",
    group: "Senior Secondary",
    level: "Class 11 · Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics", "Maths", "English"],
    batch: "Mon–Sat · 3:00 PM – 5:30 PM",
    fee: "₹2,100 / month",
    highlights: [
      "Ledger to balance sheet, step by step",
      "CA Foundation orientation",
      "Case-study based economics",
    ],
  },
  {
    slug: "class-11-arts",
    title: "Class 11 Arts / Humanities",
    group: "Senior Secondary",
    level: "Class 11 · Arts",
    subjects: ["History", "Political Science", "Geography", "Sociology", "English"],
    batch: "Mon–Sat · 3:00 PM – 5:30 PM",
    fee: "₹1,700 / month",
    highlights: [
      "Answer writing practice",
      "Map & diagram mastery",
      "UPSC/CUET awareness classes",
    ],
  },
  {
    slug: "class-12-science",
    title: "Class 12 Science (PCM / PCB)",
    group: "Senior Secondary",
    level: "Class 12 · Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "English"],
    batch: "Mon–Sat · 6:30 AM – 9:30 AM",
    fee: "₹2,900 / month",
    highlights: [
      "Board scoring strategy + numericals drill",
      "Weekly JEE/NEET pattern mock tests",
      "Previous 15 years solved in class",
    ],
  },
  {
    slug: "class-12-commerce",
    title: "Class 12 Commerce",
    group: "Senior Secondary",
    level: "Class 12 · Commerce",
    subjects: ["Accountancy", "Business Studies", "Economics", "Maths", "English"],
    batch: "Mon–Sat · 2:30 PM – 5:00 PM",
    fee: "₹2,400 / month",
    highlights: [
      "Company accounts & analysis made easy",
      "Speed-solving practice for boards",
      "CUET commerce preparation",
    ],
  },
  {
    slug: "class-12-arts",
    title: "Class 12 Arts / Humanities",
    group: "Senior Secondary",
    level: "Class 12 · Arts",
    subjects: ["History", "Political Science", "Geography", "Sociology", "English"],
    batch: "Mon–Sat · 2:30 PM – 5:00 PM",
    fee: "₹1,900 / month",
    highlights: [
      "Structured notes for every chapter",
      "Board-style long answer drills",
      "CUET humanities test series",
    ],
  },
];

export const courseGroups = ["All", "Foundation", "Secondary", "Senior Secondary"] as const;

export const stats = [
  { value: "12+", label: "Years of teaching" },
  { value: "4,800+", label: "Students taught" },
  { value: "96%", label: "Above 80% in boards" },
  { value: "1:18", label: "Teacher to student ratio" },
];

export const faculty = [
  { name: "R. K. Sharma", subject: "Physics · Class 11–12", exp: "14 years" },
  { name: "Anjali Verma", subject: "Mathematics · Class 9–12", exp: "11 years" },
  { name: "S. Praveen", subject: "Chemistry · Class 11–12", exp: "9 years" },
  { name: "Neha Gupta", subject: "Biology · Class 11–12", exp: "8 years" },
  { name: "Mohd. Arif", subject: "Accountancy & Economics", exp: "10 years" },
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
