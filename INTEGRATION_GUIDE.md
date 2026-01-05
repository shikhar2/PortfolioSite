# Portfolio Integration Setup Guide

## Overview
This guide will help you configure all the integrations for your portfolio to make it fully functional.

## 1. EmailJS Setup (Contact Form)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your email account
5. Copy the **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:
   ```
   From: {{name}} <{{email}}>
   
   Message:
   {{message}}
   ```
4. Copy the **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Configure Environment Variables
1. Open `.env` file in the project root
2. Replace the placeholder values:
   ```env
   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

### Step 6: Test
1. Restart your dev server: `npm run dev`
2. Fill out the contact form
3. Check your email for the test message

---

## 2. Update Personal Information

### Social Media Links
Edit the following files and update the placeholder URLs:

**`src/components/portfolio/Hero.tsx`** (Lines 103-105):
```typescript
{ icon: Github, href: 'https://github.com/YOUR_USERNAME', label: 'GitHub' },
{ icon: Linkedin, href: 'https://www.linkedin.com/in/YOUR_PROFILE', label: 'LinkedIn' },
```

**`src/components/portfolio/Contact.tsx`** (Lines 10-14):
```typescript
{ icon: Mail, label: 'Email', value: 'your.email@gmail.com', href: 'mailto:your.email@gmail.com' },
{ icon: Phone, label: 'Phone', value: '+91-XXXXXXXXXX', href: 'tel:+91XXXXXXXXXX' },
{ icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/YOUR_PROFILE', href: 'https://www.linkedin.com/in/YOUR_PROFILE' },
{ icon: Github, label: 'GitHub', value: 'github.com/YOUR_USERNAME', href: 'https://github.com/YOUR_USERNAME' },
```

### Project Links
Edit `src/components/portfolio/Projects.tsx` and update project URLs:

```typescript
const projects = [
  {
    // ... project info
    github: 'https://github.com/YOUR_USERNAME/your-repo',
    demo: 'https://your-demo-url.com', // Optional
  },
];
```

---

## 3. Resume Setup

### Option A: Use Your Own Resume
1. Replace `/home/shikharp/Personal/Portfolio-Site-main/public/resume.pdf` with your actual resume PDF
2. Make sure the filename is exactly `resume.pdf`

### Option B: Generate a Resume
Create a professional resume PDF using:
- [Overleaf](https://www.overleaf.com/) (LaTeX templates)
- [Canva](https://www.canva.com/) (Design templates)
- [Resume.io](https://resume.io/) (Online builder)

---

## 4. Optional: Google Analytics

### Step 1: Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### Step 2: Add to Environment
1. Open `.env.example` and uncomment the GA line
2. Add to `.env`:
   ```env
   VITE_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

### Step 3: Integrate (Optional - requires additional setup)
If you want to add analytics, let me know and I'll implement the tracking code.

---

## 5. Deployment Checklist

Before deploying to production:

- [ ] EmailJS credentials configured in `.env`
- [ ] All social media links updated
- [ ] Resume PDF uploaded to `/public` folder
- [ ] Project GitHub/demo URLs updated
- [ ] Test contact form works
- [ ] Test all external links work
- [ ] Test resume download works
- [ ] Build succeeds: `npm run build`
- [ ] Preview build: `npm run preview`

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Deploy!

---

## Troubleshooting

### Contact Form Not Sending
- Check browser console for errors
- Verify EmailJS credentials are correct in `.env`
- Restart dev server after changing `.env`
- Check EmailJS dashboard for quota limits

### Resume Not Downloading
- Verify `resume.pdf` exists in `/public` folder
- Check browser console for 404 errors
- Try accessing directly: `http://localhost:8080/resume.pdf`

### Social Links Not Working
- Verify URLs start with `https://`
- Check for typos in username/profile names
- Test links in incognito mode

---

## Support

For issues or questions:
1. Check the main README.md
2. Review EmailJS documentation
3. Check browser developer console for errors

Happy deploying! 🚀
