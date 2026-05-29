# ⬡ OctaFight Fantasy — UFC/MMA Fantasy Sports

Build lineups from real UFC fighters, enter salary-cap contests, earn points from live fight stats, and compete for prizes. Production-ready Next.js 15 app.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Prisma + PostgreSQL, Clerk Auth, Stripe, Pusher Realtime, Recharts, Framer Motion, Vercel

## Setup

```bash
cp .env.example .env.local   # fill in DB/Clerk/Stripe/Pusher keys
npm install
npm run db:push              # push Prisma schema
npm run db:seed              # seed 60 fighters, events, contests
npm run dev                  # http://localhost:3000
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
