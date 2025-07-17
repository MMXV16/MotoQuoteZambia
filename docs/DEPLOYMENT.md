# Deployment Guide

This guide covers different deployment options for MotoQuote Zambia.

## � Vercel Deployment (Recommended)

Vercel provides excellent support for React applications with zero configuration and is our recommended deployment platform.

### Quick Deploy

1. Visit [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click **Import Project**
4. Select your repository
5. Vercel will auto-detect the settings, but verify:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Root Directory**: `./` (leave blank)
6. Click **Deploy**

### Manual Configuration

The project includes a `vercel.json` file with the following configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables

For production deployments, you can add environment variables in the Vercel dashboard:

1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add variables like:
   ```
   VITE_APP_NAME=MotoQuote Zambia
   VITE_API_URL=https://api.motoquote.zm
   VITE_ANALYTICS_ID=your-analytics-id
   ```

## �📄 GitHub Pages Deployment

GitHub Pages is a free hosting service that's perfect for our frontend-only application.

### Prerequisites

- GitHub account
- Repository pushed to GitHub
- Node.js and npm installed locally

### Step-by-Step Instructions

#### 1. Prepare Your Repository

Ensure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Install GitHub Pages CLI (Optional)

```bash
npm install -g gh-pages
```

#### 3. Add Deployment Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist/public"
  }
}
```

#### 4. Configure Vite for GitHub Pages

Update your `vite.config.ts` to include the correct base path:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/MotoQuoteZambia/", 
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
```

#### 5. Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
- Build your application
- Create a `gh-pages` branch
- Push the built files to that branch

#### 6. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch and **/ (root)** folder
6. Click **Save**

#### 7. Access Your Site

Your site will be available at:
```
https://MMXV16.github.io/repository-name/
```

### Automatic Deployment with GitHub Actions

For automatic deployment on every push to main:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist/public
```

## 🚀 Vercel Deployment

Vercel provides excellent support for React applications with zero configuration.

### Quick Deploy

1. Visit [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click **Import Project**
4. Select your repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Root Directory**: `./` (leave blank)
6. Click **Deploy**

### Custom Domain (Optional)

1. In your Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## 🌐 Netlify Deployment

Netlify offers continuous deployment and form handling capabilities.

### Deploy from Git

1. Visit [netlify.com](https://netlify.com)
2. Sign up and connect your GitHub account
3. Click **New site from Git**
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
6. Click **Deploy site**

### Netlify Configuration File

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## ☁️ Azure Static Web Apps

Microsoft Azure offers a generous free tier for static web apps.

### Prerequisites

- Azure account
- Azure CLI installed

### Deployment Steps

1. **Install Azure Static Web Apps CLI**:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Login to Azure**:
   ```bash
   az login
   ```

3. **Create Static Web App**:
   ```bash
   az staticwebapp create \
     --name MotoQuoteZambia \
     --resource-group your-resource-group \
     --source https://github.com/MMXV16/MotoQuoteZambia \
     --location "East US 2" \
     --branch main \
     --app-location "client" \
     --output-location "dist/public"
   ```

## 🪣 AWS S3 + CloudFront

For enterprise-level hosting with AWS.

### Prerequisites

- AWS account
- AWS CLI configured

### Deployment Steps

1. **Build your application**:
   ```bash
   npm run build
   ```

2. **Create S3 bucket**:
   ```bash
   aws s3 mb s3://MotoQuoteZambia-app
   ```

3. **Upload files**:
   ```bash
   aws s3 sync dist/public/ s3://MotoQuoteZambia-app --delete
   ```

4. **Configure bucket for static hosting**:
   ```bash
   aws s3 website s3://MotoQuoteZambia-app \
     --index-document index.html \
     --error-document index.html
   ```

5. **Set up CloudFront distribution** (optional but recommended for global CDN)

## 🔧 Environment Variables

For production deployments, you may need environment variables:

### Create `.env.production`

```env
VITE_APP_NAME=MotoQuote Zambia
VITE_API_URL=https://api.motoquote.zm
VITE_ANALYTICS_ID=your-analytics-id
```

### Platform-Specific Configuration

#### Vercel
Add environment variables in the dashboard under **Settings** → **Environment Variables**

#### Netlify
Add environment variables in **Site settings** → **Environment variables**

#### GitHub Pages
Use GitHub Secrets for sensitive data and replace them during build

## 🚨 Troubleshooting

### Common Issues

1. **404 on page refresh**
   - Ensure you have proper redirect rules for SPA routing
   - Add `_redirects` file for Netlify or configure server redirects

2. **Assets not loading**
   - Check the `base` configuration in `vite.config.ts`
   - Ensure relative paths are correct

3. **Build failures**
   - Check Node.js version compatibility
   - Clear `node_modules` and reinstall dependencies
   - Check for TypeScript errors

### Support

If you encounter issues:
1. Check the build logs for specific error messages
2. Verify all environment variables are set correctly
3. Test the build locally first with `npm run build`
4. Consult the platform-specific documentation

## 📊 Performance Optimization

### Build Optimization

1. **Enable compression** in your hosting platform
2. **Configure caching** headers for static assets
3. **Use CDN** for global content delivery
4. **Monitor bundle size** with tools like `webpack-bundle-analyzer`

### SEO Optimization

1. **Add meta tags** in `index.html`
2. **Configure robots.txt**
3. **Add sitemap.xml**
4. **Use semantic HTML** structure

---

Choose the deployment method that best fits your needs and budget. GitHub Pages is perfect for getting started, while cloud providers offer more advanced features for production applications.
