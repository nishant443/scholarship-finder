# 🎓 SheScholar - Scholarship Finder for Girls

A full-stack MERN application that helps girls find scholarships tailored to their profile using intelligent matching algorithms.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)

---

## ✨ Features

### Core Features
- **Smart Scholarship Matching**: Algorithm calculates match percentage based on user eligibility
- **User Authentication**: Secure JWT-based login/register system
- **Profile Management**: Users can update their education, field, state, category, income, and gender
- **Scholarship Browser**: Filter and search through 500+ scholarships
- **Application Tracker**: Save, track, and manage scholarship applications
- **Deadline Alerts**: Visual indicators for urgent deadlines

### Unique Selling Points
- **Match Score Algorithm**: 0-100% compatibility score for each scholarship
- **Personalized Dashboard**: Shows top matched scholarships for logged-in users
- **Multi-criteria Filtering**: Filter by education level, field, state, category, provider
- **Responsive Design**: Built with Tailwind CSS for mobile-first experience

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**: Server framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing

### Frontend
- **React 18**: UI library
- **Vite**: Build tool
- **Tailwind CSS**: Styling
- **React Router v6**: Routing
- **Axios**: HTTP client
- **Context API**: State management

---

## 📁 Project Structure

```
scholarship-finder/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Scholarship.js         # Scholarship schema
│   │   └── Application.js         # Application tracking
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── scholarships.js        # Scholarship routes
│   │   └── applications.js        # Application routes
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── scholarshipController.js
│   │   └── applicationController.js
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── utils/
│   │   ├── matchScore.js          # 🎯 Matching algorithm
│   │   └── seedScholarships.js    # Sample data
│   └── server.js                  # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ScholarshipCard.jsx
    │   │   ├── MatchScoreBadge.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ScholarshipList.jsx
    │   │   ├── ScholarshipDetail.jsx
    │   │   ├── Profile.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Global auth state
    │   ├── utils/
    │   │   └── api.js             # Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── vite.config.js
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Step 1: Clone/Download the Project

```bash
cd scholarship-finder
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/scholarship-finder
JWT_SECRET=your_secret_key_change_this
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start MongoDB

If using local MongoDB:
```bash
mongod
```

If using MongoDB Atlas, update `MONGO_URI` in backend/.env

---

## 🎬 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:5173

### Option 2: Seed Sample Data (Recommended)

```bash
cd backend
npm run seed
```
This adds 20 sample scholarships to your database.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Scholarships
- `GET /api/scholarships` - Get all scholarships (with filters)
- `GET /api/scholarships/matched/me` - Get matched scholarships (Protected)
- `GET /api/scholarships/:id` - Get single scholarship
- `GET /api/scholarships/stats` - Get statistics

### Applications
- `POST /api/applications/save` - Save/bookmark scholarship (Protected)
- `GET /api/applications` - Get user's applications (Protected)
- `PUT /api/applications/:id` - Update application status (Protected)
- `DELETE /api/applications/:id` - Remove saved scholarship (Protected)
- `GET /api/applications/stats` - Get application stats (Protected)

---

## 🎯 How It Works

### The Matching Algorithm

Located in `backend/utils/matchScore.js`, this is the core innovation:

```javascript
function calculateMatchScore(userProfile, eligibility) {
  let score = 0;
  
  if (eligibility.education.includes(userProfile.education)) {
    score += 25;
  }
  
  if (eligibility.field.includes(userProfile.field) || eligibility.field.includes('Any')) {
    score += 25;
  }
  
  if (eligibility.state.includes(userProfile.state) || eligibility.state.includes('All India')) {
    score += 20;
  }
  
  if (eligibility.category.includes(userProfile.category)) {
    score += 15;
  }
  
  if (eligibility.gender.includes(userProfile.gender)) {
    score += 10;
  }
  
  if (userProfile.income <= eligibility.maxIncome) {
    score += 5;
  }
  
  return score; 
}
```

### User Flow

1. **Register/Login** → User creates account
2. **Complete Profile** → Adds education, field, state, category, income, gender
3. **View Matched Scholarships** → Algorithm shows scholarships with match scores
4. **Save & Track** → User saves scholarships and tracks application status
5. **Apply** → User clicks official link to apply

---

## 📝 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "user",
  profile: {
    education: String,
    field: String,
    state: String,
    category: String,
    income: Number,
    gender: String
  }
}
```

### Scholarship Schema
```javascript
{
  name: String,
  description: String,
  amount: String,
  deadline: Date,
  link: String,
  eligibility: {
    education: [String],
    field: [String],
    state: [String],
    category: [String],
    gender: [String],
    maxIncome: Number
  },
  documents: [String],
  provider: "Government" | "Private" | "University"
}
```

### Application Schema
```javascript
{
  user: ObjectId (ref: User),
  scholarship: ObjectId (ref: Scholarship),
  status: "saved" | "applied" | "in-progress" | "accepted" | "rejected",
  appliedAt: Date,
  notes: String
}
```

---

## 🎨 Key Features to Highlight in Interview

1. **Smart Matching Algorithm** - Unique 6-criteria scoring system
2. **Complete MERN Stack** - Full-stack implementation
3. **JWT Authentication** - Secure token-based auth
4. **Protected Routes** - Frontend and backend route protection
5. **Responsive UI** - Tailwind CSS responsive design
6. **Real-world Problem** - Solves actual scholarship discovery issue
7. **Scalable Architecture** - Clean separation of concerns

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in .env

### Port Already in Use
- Change PORT in backend/.env
- Change port in frontend/vite.config.js

### CORS Error
- Ensure frontend URL is allowed in backend/server.js cors config

---

## 📦 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set VITE_API_URL to production backend URL

---

## 📄 License
MIT License - Women's Day Project 2025

---

## 👩‍💻 Author
Created for Full Stack Development Challenge - Women's Day Special

---

## 🙏 Acknowledgments
- National Scholarship Portal (NSP)
- AICTE, UGC, and other government scholarship providers
- All organizations empowering girls through education
