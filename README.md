# 🎯 CareerMentor AI

An AI-powered career coaching platform built with **Next.js**, featuring user authentication, onboarding, industry insights, mock interviews, resume building, and more. 🚀

---

## 🌟 Features

- 🔐 **User Authentication** - Secure login/signup with Clerk
- 🏁 **Onboarding Flow** - Personalized user setup and data collection
- 📊 **AI Industry Insights** - Weekly career insights powered by Gemini AI
- 🎤 **Mock Interviews Preparation** - AI-generated interview questions & performance tracking
- 📄 **Resume Builder** - AI-assisted resume creation with PDF download
- ✉️ **Cover Letter Generator** - Automated cover letter generation
- ⏳ **Weekly Updates** - Scheduled insights via Inngest cron jobs
- 📱 **Responsive Design** - Built with Tailwind CSS & Shadcn UI

---

## 🛠 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: Neon (PostgreSQL)
- **Authentication**: Clerk
- **AI Integration**: Gemini AI API
- **Task Scheduling**: Inngest
- **Deployment**: Vercel

---

## ⚡ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/[your-username]/ai-career-coach.git
cd ai-career-coach
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
DATABASE_URL="your-neon-db-url"
CLERK_SECRET_KEY="your-clerk-secret"
GEMINI_API_KEY="your-gemini-api-key"
INNGEST_SIGNING_KEY="your-inngest-key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-public-key"
```

### 4️⃣ Initialize the Database
```bash
npx prisma migrate dev
```

### 5️⃣ Run the Development Server
```bash
npm run dev
```
🔗 Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗 Key Components

### 🔑 Authentication
- Powered by Clerk
- Custom login/signup pages
- User data stored in Neon via Prisma

### 🧠 AI Features
- Industry insights from **Gemini AI**
- AI-generated **mock interview questions**
- AI-powered **resume & cover letter generation**

### ⏰ Scheduled Tasks
- Weekly career insights via **Inngest cron jobs**

---

## 🚀 Deployment

1. Push your code to GitHub
2. Connect to your hosting platform (e.g., **Vercel**)
3. Set up **environment variables** in the hosting dashboard
4. **Deploy** your application 🎉

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m '✨ Add amazing feature'
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a **Pull Request** ✅

---

🎯 Let's revolutionize career coaching with **CareerMentor AI**! 🚀💡
