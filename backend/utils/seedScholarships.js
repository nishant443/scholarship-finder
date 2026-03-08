const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Scholarship = require('../models/Scholarship');

dotenv.config();

const scholarships = [
  {
    name: "AICTE Pragati Scholarship for Girls",
    description: "Scholarship for girl students pursuing technical degree courses (Engineering/Pharmacy). One girl child per family with family income less than 8 lakh per annum.",
    amount: "₹30,000 - ₹50,000 per year",
    deadline: new Date('2025-03-31'),
    link: "https://www.aicte-india.org/schemes/students-development-schemes/pragati",
    eligibility: {
      education: ["UG"],
      field: ["Engineering", "Pharmacy"],
      state: ["All India"],
      category: ["All"],
      gender: ["Female"],
      maxIncome: 800000
    },
    documents: ["Income Certificate", "Admission Proof", "Aadhaar Card", "Bank Details"],
    provider: "Government",
    benefits: "Tuition fee waiver + maintenance allowance"
  },
  {
    name: "National Means-cum-Merit Scholarship (NMMS)",
    description: "Scholarship for meritorious students of economically weaker sections to check drop-out rates at class VIII and encourage them to continue studies at secondary stage.",
    amount: "₹12,000 per year",
    deadline: new Date('2025-04-15'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["10th"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 350000
    },
    documents: ["Income Certificate", "Caste Certificate", "Marksheet", "Bank Details"],
    provider: "Government",
    benefits: "Monthly scholarship amount"
  },
  {
    name: "Central Sector Scheme of Scholarship for College and University Students",
    description: "Scholarship for students who have passed Class 12th exam and are pursuing regular degree courses.",
    amount: "₹10,000 - ₹20,000 per year",
    deadline: new Date('2025-05-31'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 800000
    },
    documents: ["Income Certificate", "Class 12th Marksheet", "Admission Receipt", "Aadhaar Card"],
    provider: "Government",
    benefits: "Annual scholarship for course duration"
  },
  {
    name: "Post Matric Scholarship for SC Students",
    description: "Financial assistance to SC students studying at post-matriculation or post-secondary stage to enable them to complete their education.",
    amount: "Varies (covers tuition + maintenance)",
    deadline: new Date('2025-06-30'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["12th", "UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["SC"],
      gender: ["All"],
      maxIncome: 250000
    },
    documents: ["Caste Certificate", "Income Certificate", "Previous Year Marksheet", "Fee Receipt"],
    provider: "Government",
    benefits: "Full tuition fee + maintenance allowance"
  },
  {
    name: "Post Matric Scholarship for ST Students",
    description: "Scholarship for ST students pursuing post-matriculation studies including degree, diploma and certificate courses.",
    amount: "Varies (covers tuition + maintenance)",
    deadline: new Date('2025-06-30'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["12th", "UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["ST"],
      gender: ["All"],
      maxIncome: 250000
    },
    documents: ["Tribal Certificate", "Income Certificate", "Marksheet", "Admission Proof"],
    provider: "Government",
    benefits: "Complete financial support for education"
  },
  {
    name: "INSPIRE Scholarship for Higher Education",
    description: "Scholarship for students pursuing natural and basic sciences courses to encourage them in research careers.",
    amount: "₹80,000 per year",
    deadline: new Date('2025-07-31'),
    link: "https://online-inspire.gov.in/",
    eligibility: {
      education: ["UG", "PG"],
      field: ["Science"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: null
    },
    documents: ["Class 12th Marksheet", "Admission Proof", "Bank Details"],
    provider: "Government",
    benefits: "Scholarship + research internship opportunities"
  },
  {
    name: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
    description: "Scholarship for wards/widows of deceased/ex-CAPF and AR personnel to pursue professional and technical courses.",
    amount: "₹3,000 per month (Boys), ₹3,500 per month (Girls)",
    deadline: new Date('2025-08-31'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: null
    },
    documents: ["Service Certificate", "Death Certificate (if applicable)", "Admission Proof"],
    provider: "Government",
    benefits: "Monthly scholarship amount"
  },
  {
    name: "UGC Ishan Uday Special Scholarship for North Eastern Region",
    description: "Special scholarship for students from North Eastern Region pursuing higher education.",
    amount: "Up to ₹5,400 per month",
    deadline: new Date('2025-09-15'),
    link: "https://ugc.ac.in/",
    eligibility: {
      education: ["UG", "PG", "PhD"],
      field: ["Any"],
      state: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
      category: ["All"],
      gender: ["All"],
      maxIncome: null
    },
    documents: ["Domicile Certificate", "Admission Proof", "Previous Year Marksheet"],
    provider: "Government",
    benefits: "Monthly stipend for entire course duration"
  },
  {
    name: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    description: "Scholarship for girl students from notified minority communities who are studying in classes 9 to 12.",
    amount: "₹10,000 - ₹12,000 per year",
    deadline: new Date('2025-10-31'),
    link: "https://momascholarship.gov.in/",
    eligibility: {
      education: ["10th", "12th"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["Female"],
      maxIncome: 200000
    },
    documents: ["Minority Community Certificate", "Income Certificate", "Marksheet", "Bank Details"],
    provider: "Government",
    benefits: "Annual scholarship amount"
  },
  {
    name: "National Fellowship for SC Students",
    description: "Fellowship for SC students pursuing M.Phil and Ph.D courses in Indian universities.",
    amount: "₹25,000 - ₹28,000 per month + contingency",
    deadline: new Date('2025-11-30'),
    link: "https://ugc.ac.in/",
    eligibility: {
      education: ["PhD"],
      field: ["Any"],
      state: ["All India"],
      category: ["SC"],
      gender: ["All"],
      maxIncome: null
    },
    documents: ["Caste Certificate", "Admission Letter", "Research Proposal", "No Objection Certificate"],
    provider: "Government",
    benefits: "Monthly fellowship + annual contingency grant"
  },
  {
    name: "Swami Vivekananda Merit-cum-Means Scholarship (West Bengal)",
    description: "State scholarship for meritorious students from economically disadvantaged backgrounds in West Bengal.",
    amount: "₹1,000 - ₹5,000 per month",
    deadline: new Date('2026-01-15'),
    link: "https://svmcm.wbhed.gov.in/",
    eligibility: {
      education: ["UG", "PG"],
      field: ["Any"],
      state: ["West Bengal"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 250000
    },
    documents: ["Income Certificate", "Domicile Certificate", "Marksheet", "Admission Receipt"],
    provider: "Government",
    benefits: "Monthly scholarship based on course level"
  },
  {
    name: "Dr. Ambedkar Post-Matric Scholarship for EBC",
    description: "Scholarship for Economically Backward Class students pursuing post-matric education.",
    amount: "Varies based on course",
    deadline: new Date('2026-02-28'),
    link: "https://scholarships.gov.in/",
    eligibility: {
      education: ["12th", "UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["EWS"],
      gender: ["All"],
      maxIncome: 100000
    },
    documents: ["EBC Certificate", "Income Certificate", "Fee Receipt", "Marksheet"],
    provider: "Government",
    benefits: "Tuition fee reimbursement + maintenance allowance"
  },
  {
    name: "Indira Gandhi Scholarship for Single Girl Child",
    description: "UGC scholarship to encourage single girl children to pursue higher education.",
    amount: "₹36,200 per year for PG courses",
    deadline: new Date('2026-03-31'),
    link: "https://ugc.ac.in/",
    eligibility: {
      education: ["PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["Female"],
      maxIncome: null
    },
    documents: ["Single Girl Child Certificate", "Admission Proof", "Class 12th Marksheet"],
    provider: "Government",
    benefits: "Annual scholarship for 2 years"
  },
  {
    name: "AICTE Saksham Scholarship for Differently Abled Students",
    description: "Scholarship for differently-abled students pursuing technical degree/diploma courses.",
    amount: "₹50,000 per year",
    deadline: new Date('2025-04-30'),
    link: "https://www.aicte-india.org/",
    eligibility: {
      education: ["UG"],
      field: ["Engineering", "Pharmacy"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 800000
    },
    documents: ["Disability Certificate (40% or more)", "Income Certificate", "Admission Proof"],
    provider: "Government",
    benefits: "Annual scholarship + laptop/assistive devices"
  },
  {
    name: "Merit-cum-Means Scholarship for Minority Communities",
    description: "Scholarship for meritorious students from minority communities pursuing professional and technical courses.",
    amount: "₹20,000 per year",
    deadline: new Date('2025-05-15'),
    link: "https://momascholarship.gov.in/",
    eligibility: {
      education: ["UG", "PG"],
      field: ["Engineering", "Medicine", "Management"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 250000
    },
    documents: ["Minority Certificate", "Income Certificate", "Merit Certificate", "Admission Proof"],
    provider: "Government",
    benefits: "Annual scholarship for course duration"
  },
  {
    name: "Reliance Foundation Undergraduate Scholarship",
    description: "Scholarship for meritorious undergraduate students across India pursuing various fields.",
    amount: "₹2,00,000 per year",
    deadline: new Date('2025-06-30'),
    link: "https://reliancefoundation.org/",
    eligibility: {
      education: ["UG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 600000
    },
    documents: ["Income Certificate", "Class 12th Marksheet", "Admission Letter", "Academic Records"],
    provider: "Private",
    benefits: "100% tuition fee waiver + mentorship program"
  },
  {
    name: "Tata Capital Pankh Scholarship for Girls",
    description: "Empowering girl students from class 6 to postgraduate level with financial assistance.",
    amount: "₹10,000 - ₹80,000 (varies by level)",
    deadline: new Date('2025-07-15'),
    link: "https://www.buddy4study.com/page/tata-capital-pankh-scholarship-program",
    eligibility: {
      education: ["10th", "12th", "UG", "PG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["Female"],
      maxIncome: 400000
    },
    documents: ["Income Proof", "Academic Records", "ID Proof", "Bank Details"],
    provider: "Private",
    benefits: "Financial assistance for entire academic year"
  },
  {
    name: "SBI Asha Scholarship Program",
    description: "Scholarship for meritorious students from economically disadvantaged backgrounds across India.",
    amount: "Up to ₹20,000 per year",
    deadline: new Date('2025-08-30'),
    link: "https://www.sbi.co.in/",
    eligibility: {
      education: ["10th", "12th", "UG"],
      field: ["Any"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 300000
    },
    documents: ["Income Certificate", "Previous Year Marksheet", "Admission Proof", "Aadhaar"],
    provider: "Private",
    benefits: "Educational assistance + mentorship"
  },
  {
    name: "Foundation for Excellence Scholarship",
    description: "Merit-based scholarship for economically challenged engineering and medical students.",
    amount: "₹25,000 - ₹50,000 per year",
    deadline: new Date('2025-09-30'),
    link: "https://www.ffe.org/",
    eligibility: {
      education: ["UG"],
      field: ["Engineering", "Medicine"],
      state: ["All India"],
      category: ["All"],
      gender: ["All"],
      maxIncome: 600000
    },
    documents: ["Income Proof", "JEE/NEET Rank Card", "Admission Letter", "Academic Records"],
    provider: "Private",
    benefits: "Financial aid + skill development programs"
  },
  {
    name: "Women Scientist Scheme (WOS-A)",
    description: "Research grant for unemployed women scientists pursuing research in basic/applied sciences.",
    amount: "Up to ₹55,000 per month + research grant",
    deadline: new Date('2025-10-15'),
    link: "https://dst.gov.in/",
    eligibility: {
      education: ["PG", "PhD"],
      field: ["Science"],
      state: ["All India"],
      category: ["All"],
      gender: ["Female"],
      maxIncome: null
    },
    documents: ["Qualification Certificates", "Research Proposal", "No Objection Certificate"],
    provider: "Government",
    benefits: "Fellowship + research contingency + overhead charges"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    await Scholarship.deleteMany({});
    console.log('🗑️  Cleared existing scholarships');
    
    await Scholarship.insertMany(scholarships);
    console.log(`✅ Successfully seeded ${scholarships.length} scholarships`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
