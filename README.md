# Next.js Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with dark/light theme support
- 📱 Fully responsive design
- 🔒 Secure authentication with bcrypt password hashing
- 🗄️ PostgreSQL database with Drizzle ORM
- 🎭 Framer Motion animations
- 📊 Interactive components with Radix UI
- 🎯 SEO optimized with proper meta tags

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Neon
- **ORM**: Drizzle ORM
- **Authentication**: Custom with bcrypt
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **State Management**: TanStack Query

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update your database URL in `.env.local`

5. Push database schema:
   ```bash
   npm run db:push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── ui/            # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── shared/            # Shared schemas and types
└── migrations/        # Database migrations
```

## License

MIT License

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completio