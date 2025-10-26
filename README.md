# Referral Credit System

> Next.js (TypeScript) + Tailwind CSS frontend

Live demo (architecture & business logic): [https://referral-credit-system.vercel.app/](https://referral-credit-system.vercel.app/)
Video explanation: [https://youtu.be/n4T0UbZCaHY](https://youtu.be/n4T0UbZCaHY)

---

## Project overview

A referral and credit-tracking web app built with **Next.js (TypeScript)** and **Tailwind CSS**. The system demonstrates: secure user auth, referral links/codes, purchase simulation, credit rewards (first purchase only), and an admin-style dashboard to monitor referral activity.

Key functional requirements implemented:

- User registration, login, logout
- Unique referral code per user and referral relationship tracking.
- First-purchase credit reward (2 credits each for referrer and referred) with protections against double-crediting.
- Purchase simulation button (client-side call to API) — only the first successful purchase by a referred user triggers credits.
- Dashboard: Total referred users, referred users who purchased, total credits earned, and copy/share referral link.

---

## 🔧 Tech stack

- Frontend: **Next.js** (v14+) with **TypeScript**
- Styling: **Tailwind CSS**
- API: Separate backend (Node.js/Express or serverless) — configured via `NEXT_PUBLIC_API_URL`
- Database: MongoDB / PostgreSQL (depends on backend implementation)
- Authentication (pick one): Clerk | Supabase Auth | SuperTokens | NextAuth | Custom JWT

---

## ⚙️ Quick setup (developer)

1. Clone the repo

```bash
git clone <your-frontend-repo-url>
cd <folder-name>
```

2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn
```

3. Create `.env.local` in the project root and add the example variables below.

4. Run the app in development

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## .env example

Create a file `.env.local` with the following keys (update values as needed):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_VERCEL_URL=https://referral-credit-system.vercel.app
```

> Keep secret keys out of source control. Use environment variables in Vercel/Netlify when deploying.

---
