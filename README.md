# Portfolio Site - Shikhar Pathak

A modern, premium portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ Premium UI with glassmorphism effects and animated gradients
- 🎯 Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🎨 Modern component library with Shadcn UI
- 📧 Working contact form with EmailJS integration
- ⚡ Fast performance with Vite

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Email Service**: EmailJS

## 📦 Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd Portfolio-Site-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Configuration

### EmailJS Setup (Required for Contact Form)

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up your email service and template
3. Copy your credentials to `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

See [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md) for detailed setup instructions.

### Personal Information

Update the following files with your information:
- `src/components/portfolio/Hero.tsx` - Social links
- `src/components/portfolio/Contact.tsx` - Contact information
- `src/components/portfolio/Projects.tsx` - Project details
- `public/resume.pdf` - Your resume

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

This project can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!
# PortfolioSite
