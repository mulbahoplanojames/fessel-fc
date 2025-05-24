# Fessel FC 🏆

![Build](https://img.shields.io/github/actions/workflow/status/mulbahoplanojames/fessel-fc/build.yml)
![License](https://img.shields.io/github/license/mulbahoplanojames/fessel-fc)
![version](https://img.shields.io/github/v/release/mulbahoplanojames/fessel-fc?include_prereleases)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js-000000?logo=auth.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-000000?logo=prisma&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-000000?logo=cloudinary&logoColor=white)
![Sonner](https://img.shields.io/badge/Sonner-000000?logo=sonner&logoColor=white)
![Next-Auth.js](https://img.shields.io/badge/Next-Auth.js-000000?logo=next-auth.js&logoColor=white)
![Next-Themes](https://img.shields.io/badge/Next-Themes-000000?logo=next-themes&logoColor=white)


## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## About
Fessel FC is a modern football web application built for Fessel FC with Next.js and TypeScript, featuring robust authentication, MongoDB integration, and a rich UI built with Radix UI components. It's designed to provide a seamless user experience with real-time data handling and modern development practices.

## Features
- ✅ Modern authentication with Auth.js
- 🔒 MongoDB integration with Prisma ORM
- 🎨 Responsive UI with Radix UI components
- 🎯 Real-time data fetching with React Query
- 📸 Image upload with Cloudinary
- 🌓 Dark/Light theme support
- 📱 Mobile-first design
- 📈 Performance optimized with Turbopack
- 🛡️ Type-safe development with TypeScript
- 🎯 Real-time e-commerce with React Query
- 📱 Mobile-first design

## Tech Stack
- Frontend:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
  - Sonner (Notifications)
  - Next-Auth.js
- Backend:
  - Node.js
  - MongoDB
  - Prisma ORM
  - Axios
  - Cloudinary
- Development:
  - pnpm
  - ESLint
  - Turbopack
  - React Query

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)
- pnpm
- Cloudinary account

### Installation
```bash
# Clone the repository
git clone https://github.com/mulbahoplanojames/fessel-fc.git
cd fessel-fc

# Install dependencies
pnpm install

# Copy .env.example to .env and fill in your credentials
pnpm run postinstall  # Generates Prisma client

# Start development server
pnpm dev
```

### Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Usage
1. Start the development server using `pnpm dev`
2. Create an account or log in
3. Explore the features and UI components
4. Use the dark/light theme toggle in the settings

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Next.js](https://nextjs.org/)
- [Radix UI](https://www.radix-ui.com/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
