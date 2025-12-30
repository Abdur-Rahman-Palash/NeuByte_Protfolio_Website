# NeuByte Portfolio Website

A modern, responsive portfolio website built with Next.js, designed to showcase professional work, blog posts, and services. This template provides a clean, animated interface with dark/light theme support.

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Animated Components**: Smooth animations using Framer Motion and GSAP
- **Blog System**: Integrated blog with categories and related posts
- **Contact Form**: Functional contact form with API integration
- **SEO Optimized**: Built with Next.js for better search engine visibility
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Theme Management**: next-themes
- **Linting**: ESLint
- **Code Formatting**: Prettier

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/neubyte-portfolio-website.git
   cd neubyte-portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Development**: `npm run dev` - Starts the development server
- **Build**: `npm run build` - Builds the application for production
- **Start**: `npm run start` - Starts the production server
- **Lint**: `npm run lint` - Runs ESLint for code quality checks

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── blog/              # Blog listing
│   ├── contact/           # Contact page
│   └── ...
├── components/            # Reusable components
│   ├── About/             # About section components
│   ├── Blog/              # Blog components
│   ├── Header/            # Navigation header
│   └── ...
├── lib/                   # Utility functions and animations
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## AI Agents Integration

This project integrates AI agents from Mind Studio for specialized tasks:

- **Resume Scorer Agent**: Analyzes and scores resumes
- **Cover Letter Agent**: Generates personalized cover letters

### Setup
1. Sign up for Mind Studio API
2. Get your API key and base URL
3. Add them to `.env.local`:
   ```
   MIND_STUDIO_API_KEY=your_key
   MIND_STUDIO_BASE_URL=https://api.mindstudio.ai
   ```

### Usage
Call the endpoints from your frontend:
- `/api/agents/resume-scorer` (POST with `resumeText`)
- `/api/agents/cover-letter` (POST with `jobDescription` and `userInfo`)

Adjust the API endpoints and request formats based on Mind Studio's documentation.