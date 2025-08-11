# Serenity Hotel

A modern hotel booking website built with Next.js, TypeScript, and Prisma.

## Features

- **User Authentication**: Secure user registration and login system
- **Room Booking**: Browse and book hotel rooms
- **Payment Processing**: Multiple payment methods support
- **Admin Panel**: Manage bookings, rooms, and users
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## User Registration System

The application includes a complete user registration system with the following features:

### Registration Form (`/register`)

- Full name, email, and password fields
- Real-time validation using Zod schemas
- Password hashing with bcrypt
- Duplicate email checking
- Automatic sign-in after successful registration
- Toast notifications for success/error feedback
- Loading states and form validation

### Security Features

- Password hashing using bcrypt with salt rounds
- Input validation and sanitization
- CSRF protection through Next.js server actions
- Unique email constraints in database

### Database Integration

- Uses Prisma ORM with PostgreSQL
- User model with role-based access control
- Automatic UUID generation for user IDs
- Timestamp tracking for audit purposes

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd serenity-hotel
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Configure your database URL in `.env.local`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/serenity_hotel"
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Seed the database (optional):

```bash
npm run db:seed
```

7. Start the development server:

```bash
npm run dev
```

### Database Seeding

The application includes sample data for testing:

```bash
npm run db:seed
```

This will create:

- Admin user: `admin@example.com` / `password`
- Guest user: `guest@example.com` / `password`

## API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `POST /api/auth/register` - User registration (server action)

### User Management

- User registration and login
- Role-based access control (guest/admin)
- Session management with JWT

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Password Hashing**: bcrypt
- **Validation**: Zod schemas
- **State Management**: React hooks and server actions

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── (auth)/         # Authentication routes
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── ui/             # Reusable UI components
│   └── sections/       # Page sections
├── lib/                 # Utility functions
│   ├── actions/        # Server actions
│   ├── auth.ts         # NextAuth configuration
│   ├── encrypt.ts      # Password hashing
│   └── validators.ts   # Zod validation schemas
└── types/              # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
