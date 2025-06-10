# Arkham Labs

<div align="center">
  <img src="frontend/public/ArkhamBanner.png" alt="Arkham Labs Banner" width="100%">
  
  <p align="center">
    <strong>DC-inspired coding platform for mastering data structures and algorithms</strong>
  </p>
  
  <p align="center">
    🌃 Train in the shadows. Strike in the interview. 🗲
  </p>

  <p align="center">
    <a href="https://arkhamlabs.live">🌐 Live Demo</a> •
    <a href="https://youtu.be/Rczr7Lizdy0?feature=shared">📹 Project Walkthrough</a> •
    <a href="https://youtu.be/1-ANY5vd8m4?feature=shared">🎬 Hitesh sir's Reaction</a>
  </p>
</div>

---

## 🎯 Project Overview

Arkham Labs is a Batman-themed coding sanctuary where developers train like the League of Shadows. Built for the **ChaiCode LeetLab Challenge**, this platform combines the intensity of Gotham with cutting-edge web technologies to deliver an immersive coding experience.

As a passionate Batman fan, I wanted to create something unique that goes beyond conventional coding platforms. Every component was crafted from scratch, backgrounds designed in Figma, and animations carefully implemented with Framer Motion to create a truly immersive experience.

## ✨ Key Features

### 🏗️ Core Platform

- **Real-time Collaborative Editing** - Code together with fellow vigilantes using Liveblocks
- **Self-hosted Judge0** - Execute code in multiple languages on Azure VM infrastructure
- **Custom Code Editor** - Monaco-based editor with syntax highlighting and dark/light themes
- **Dynamic Problem Creation** - AI-powered problem generation with multiple test cases

### 🤖 AI Integration

- **Alfred AI Assistant** - Contextual coding help using Groq API
- **Intelligent Hints** - Get guidance without spoiling the solution
- **Code Review** - AI-powered code analysis and optimization suggestions
- **Problem Generation** - Create custom DSA problems with AI assistance

### 👤 User Experience

- **JWT Authentication** - Secure login/signup with refresh token rotation
- **Progress Tracking** - Contribution graphs, streaks, and detailed statistics
- **Problem Organization** - Create and manage DSA playlists
- **Revision System** - Mark problems for later review
- **Submission History** - Track all attempts with performance metrics

### 🎨 UI/UX Excellence

- **Batman-themed Design** - Immersive dark aesthetic with Gotham vibes
- **Custom Components** - Built from scratch without external UI libraries
- **Smooth Animations** - Framer Motion powered interactions
- **Dark/Light Mode** - Seamless theme switching

## 🛠️ Tech Stack

### Frontend

- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Monaco Editor**
- **Liveblocks** - Real-time collaboration infrastructure
- **React Hook Form + Zod** - Type-safe form validation
- **Zustand** - Lightweight state management

### Backend

- **Node.js + Express** - RESTful API server
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database operations
- **Judge0 API** - Code execution engine
- **Groq API** - AI-powered assistance
- **JWT** - Secure authentication with refresh tokens

### DevOps & Infrastructure

- **Docker** - Containerized services
- **NGINX** - Reverse proxy
- **PM2** - Process management and monitoring
- **Azure VM** - Cloud hosting infrastructure

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/arkham-labs.git
   cd arkham-labs
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Setup environment variables
   cp .env.sample .env
   # Edit .env with your database and API credentials

   # Run database migrations
   npx prisma migrate dev
   npx prisma generate

   # Start the server
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install

   # Start the development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Environment Variables

#### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/arkham_labs"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-token-secret"
GROQ_API_KEY="your-groq-api-key"
JUDGE0_API_URL="your-judge0-instance-url"
LIVEBLOCKS_SECRET_KEY="your-liveblocks-secret"
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## 📁 Project Structure

```
arkham-labs/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── styles/          # CSS and styling
│   │   └── libs/            # Utility functions
│   └── public/              # Static assets
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── libs/            # Utility libraries
│   │   └── prisma/          # Database schema
```

## 🎮 Features Deep Dive

### Real-time Collaboration

Experience pair programming like never before. Multiple users can edit code simultaneously with live cursors, syntax highlighting, and conflict resolution.

### Alfred AI Assistant

Your personal coding mentor powered by Groq's Llama models. Alfred provides:

- Contextual hints without spoiling solutions
- Code review and optimization suggestions
- Debugging assistance
- Algorithm explanation

### Advanced Problem System

- **Multiple Languages**: JavaScript, Python, Java support
- **Custom Test Cases**: Create comprehensive test suites
- **Difficulty Scaling**: Easy, Medium, Hard categorization
- **Tag System**: Organize by algorithms and data structures

### Performance Analytics

Track your coding journey with detailed metrics:

- Submission success rates
- Average runtime and memory usage
- Streak tracking and consistency metrics
- Comparative performance analysis

## 🏆 Achievements

- **ChaiCode LeetLab Challenge** - Complete full-stack implementation
- **Learning Journey** - Mastered NGINX, Docker networking, Liveblocks, and Groq API
- **Creator Recognition** - Featured in Hitesh Sir's reaction video
- **Performance** - Built during semester exams (ultimate time management test! 😅)

<!-- ## 🤝 Contributing

We welcome contributions from fellow vigilantes! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting -->

## 📈 Roadmap

- [ ] **Mobile Responsive** - Fully responsive design for mobile devices
- [ ] **Contest Mode** - Timed competitive programming
- [ ] **Advanced Analytics** - ML-powered performance insights
- [ ] **Video Solutions** - Step-by-step problem walkthroughs
- [ ] **Integration** - GitHub sync and portfolio generation
- [ ] **Comprehensive Test Suite** - Run code against hidden test cases with detailed feedback

## 🐛 Known Issues

- Collaborative editing may occasionally desync with high latency
- Mobile responsiveness improvements in progress


## 🙏 Acknowledgments

- **Hitesh Choudhary** - For the ChaiCode challenge and inspiration
- **DC Comics** - For the incredible Batman universe that inspired this theme
- **Open Source Community** - For the amazing tools that made this possible
- **Judge0** - For providing the code execution infrastructure
- **Liveblocks** - For real-time collaboration capabilities

##  Contact

**Kapil** - [@Kapilovsky](https://twitter.com/Kapilovsky)

Live Demo: [https://arkhamlabs.live](https://arkhamlabs.live)

---

<div align="center">
  <p><strong>Train in the Shadows. Strike in the Interview.</strong></p>
  <p>Built with Pain <3 </p>
</div>
