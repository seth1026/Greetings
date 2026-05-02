# 🌟 Greetings App

A modern, fast, and interactive web application for generating personalized, high-quality greeting cards. Built with cutting-edge web technologies, it allows users to choose from a variety of beautifully designed templates, customize them with their name and profile picture, and download or share them instantly.

---

## 🚀 Features

- **Personalized Greetings**: Automatically integrates the user's name and profile picture into templates.
- **Dynamic Templates**: A wide selection of greeting card templates categorized by occasions, festivals, and moods.
- **Search & Filter**: Quickly find the perfect template using a responsive search and category chips.
- **High-Resolution Downloads**: Generate and download crystal-clear PNG images of your customized greeting cards.
- **Instant Sharing**: Share your creations directly via web share APIs or customized links.
- **Premium Tier**: Exclusive access to premium templates integrated with secure payments via Razorpay.
- **Smooth Animations**: Fluid page transitions, micro-interactions, and smooth scrolling for a premium feel.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.

---

## 💡 Use Cases

- **Festival Greetings**: Quickly create and send personalized wishes for Diwali, Christmas, Eid, etc.
- **Birthdays & Anniversaries**: Send customized cards to friends and family with a personal touch.
- **Corporate Greetings**: Generate branded and professional greetings for employees or clients.
- **Daily Inspiration**: Share motivational quotes with beautifully designed typography and backgrounds.

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" title="Next.js" alt="Next.js" width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" alt="React" width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title="TypeScript" alt="TypeScript" width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind CSS" alt="Tailwind CSS" width="40" height="40" />&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="40" height="40" />&nbsp;
</div>

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
* **Image Generation**: `dom-to-image`
* **Authentication/Backend**: [Firebase](https://firebase.google.com/)
* **Payments**: [Razorpay](https://razorpay.com/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚙️ Setup Instructions

Follow these steps to get the project up and running on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/greetings-app.git
cd greetings-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add your credentials:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

---

## 📄 License

This project is licensed under the MIT License.
