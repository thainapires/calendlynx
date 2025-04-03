# Schedulynx 📅

![image](https://github.com/user-attachments/assets/fd822d0d-6825-49fa-81f5-e48c7c826fe4)

Schedulynx is a scheduling app that syncs with your Google Calendar, allowing others to book time directly into your calendar with ease. It uses NextAuth.js for authentication, enabling users to log in via their Google account.

### Main points
- Syncs with Google Calendar
- Allows users to share their availability with others
- Automatically schedules meetings and events into the user's Google Calendar
- Google account login via NextAuth.js.

### Technology Stack
- React
- TypeScript
- Next.js
- NextAuth.js
- Google API
- Prisma (ORM)

Installation

1. Clone the repository:
```
git clone https://github.com/thainapires/schedulynx.git
cd schedulynx
```

2. Install dependencies:
```npm install```

3. Set up environment variables for Google authentication by creating a .env file with the following content:

```
DATABASE_URL="mysql://root:docker@localhost:3306/schedulynx"

# Google oAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
```

3. Start the development server:
```npm run dev```

Visualize the database with Prisma Studio

```npx prisma studio```

### Docker to run the mysql database

```docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```
