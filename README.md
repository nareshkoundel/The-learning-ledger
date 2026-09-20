# The Learning Ledger — Dark Edition

A dark, documentation-inspired personal knowledge journal with a Supabase backend.

## Stack
- Next.js
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- React Markdown
- GitHub + Vercel deployment

## Included
- Dark editorial homepage
- Uploaded coffee + notebook artwork as the hero visual
- Public blog entries
- Individual Markdown articles
- Secure Supabase email/password login
- Admin editor
- Publish/draft control
- Cover image upload
- Delete posts
- Row Level Security

## Local setup

1. Install Node.js 20+.
2. Create a Supabase project.
3. In Supabase SQL Editor, run `sql/schema.sql`.
4. In Supabase Authentication, create your admin user under Authentication > Users.
5. Copy `.env.example` to `.env.local` and add your Supabase URL and anon key.
6. Run:

```bash
npm install
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/admin

## GitHub

```bash
git init
git add .
git commit -m "Build The Learning Ledger"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-learning-ledger.git
git push -u origin main
```

Do NOT commit `.env.local`.

## Deploy

Use Vercel for this full-stack Next.js app. GitHub Pages is not suitable because this project uses server-side routes and Supabase authentication.

1. Push repo to GitHub.
2. Import repository in Vercel.
3. Add:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
4. Deploy.
5. Add your custom domain in Vercel if desired.

## Publishing workflow

Go to `/admin` → sign in → write Markdown → optionally upload cover image → publish.

The article is saved in Supabase and appears automatically on the homepage.

## Design direction

The visual direction is inspired by the supplied reference: near-black background, warm orange accent, large typography, rounded media panel, documentation-like information blocks, and a hand-drawn notebook/coffee visual. It is an original design rather than a copy of the reference site.
# The-learning-ledger
