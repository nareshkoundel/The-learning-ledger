# The Learning Ledger — Dark Edition

> A dark, documentation-inspired personal knowledge journal for learning, building, and sharing technical knowledge.

🌐 **Live Website:** https://the-learning-ledger.vercel.app

📦 **Source Code:** https://github.com/nareshkoundel/The-learning-ledger

---

## About

**The Learning Ledger** is a personal knowledge journal built around the idea of turning everyday learning into a permanent, searchable collection of notes.

The platform is designed for documenting topics across:

* Cloud Computing
* DevOps
* AWS
* Networking
* Docker
* Kubernetes
* Artificial Intelligence
* Machine Learning
* Software Engineering
* Programming

Instead of keeping technical notes scattered across different applications, The Learning Ledger brings them together into one documentation-style learning space.

---

## Features

* Dark editorial interface
* Documentation-inspired article layout
* Markdown-based articles
* Technical learning notes
* Cover images for articles
* Responsive design
* Dynamic blog entries
* Category-based content
* Supabase-powered data storage
* Secure authentication
* Persistent cloud storage
* Fast Next.js frontend

---

## Tech Stack

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| **Next.js**          | Full-stack React framework    |
| **React**            | User interface                |
| **TypeScript**       | Type-safe development         |
| **Tailwind CSS**     | Styling and responsive design |
| **Supabase**         | Backend and database          |
| **PostgreSQL**       | Data storage                  |
| **Supabase Storage** | Image storage                 |
| **React Markdown**   | Markdown article rendering    |
| **GitHub**           | Version control               |
| **Vercel**           | Deployment                    |

---

## Design

The visual direction combines:

* Near-black backgrounds
* Warm orange accents
* Large editorial typography
* Rounded media panels
* Documentation-style layouts
* Minimal navigation
* Notebook-inspired visual elements
* Technical documentation aesthetics

The design is an original interpretation of a modern technical learning journal.

---

## Project Structure

```text
The-learning-ledger/
│
├── app/
│   ├── api/
│   ├── posts/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│
├── lib/
│   └── Supabase utilities
│
├── public/
│   └── Static assets
│
├── sql/
│   └── Database schema
│
├── .env.example
├── .gitignore
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nareshkoundel/The-learning-ledger.git
```

### 2. Enter the project

```bash
cd The-learning-ledger
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Supabase

Create a Supabase project and configure the required database tables and storage.

Run the SQL schema located at:

```text
sql/schema.sql
```

### 5. Configure environment variables

Create:

```text
.env.local
```

using:

```text
.env.example
```

Add your Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

The project uses environment variables for Supabase configuration.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Security

**Never commit `.env.local` or any private credentials to GitHub.**

The repository includes `.env.example` so the required environment variables can be understood without exposing private credentials.

---

## Deployment

The project is designed to be deployed using **Vercel**.

### Deployment process

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the required environment variables.
4. Deploy the application.
5. Open the generated Vercel domain.

Example:

```text
https://the-learning-ledger.vercel.app
```

---

## Learning Philosophy

The Learning Ledger follows a simple idea:

```text
Learn
  ↓
Build
  ↓
Document
  ↓
Share
  ↓
Keep Learning
```

Every article is a record of something learned, explored, or built.

The goal isn't to create perfect documentation.

The goal is to create documentation that is useful.

---

## Roadmap

### Current

* [x] Dark editorial homepage
* [x] Supabase integration
* [x] Markdown articles
* [x] Dynamic posts
* [x] Cover image support
* [x] Authentication
* [x] Responsive interface
* [x] Vercel deployment support

### Planned

* [ ] Documentation-style article navigation
* [ ] Table of contents
* [ ] Article sections
* [ ] Search
* [ ] Tags
* [ ] Related articles
* [ ] Reading progress indicator
* [ ] Code syntax highlighting
* [ ] Improved media library
* [ ] Dark/light theme options

---

## License

This project is created as a personal learning and knowledge-sharing platform.

---

## Author

**Naresh Koundel**

Built while learning and working with modern web, cloud, DevOps, and AI technologies.

---

### 🌐 Visit The Learning Ledger

**https://the-learning-ledger.vercel.app**

> Learn. Build. Document. Keep.
