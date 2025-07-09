# 🔗 BitLinks - URL Shortener

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

**A modern, fast, and privacy-focused URL shortener built with Next.js 15 and MongoDB**

[✨ Features](#-features) • [🚀 Demo](#-demo) • [📦 Installation](#-installation) • [🎮 Usage](#-usage) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

BitLinks is a modern, privacy-first URL shortener that makes long URLs manageable without compromising your privacy. Built with Next.js 15, React, and MongoDB, it offers lightning-fast performance with a beautiful, responsive interface. Unlike other URL shorteners, BitLinks doesn't track you or require login credentials.

## ✨ Features

### 🔒 **Privacy First**
- 🛡️ No user tracking or analytics
- 🚫 No login required - completely anonymous
- 🔐 Your data stays private and secure
- 🌐 Open-source and transparent

### ⚡ **Lightning Fast Performance**
- 🚀 Built with Next.js 15 for optimal performance
- 📱 Server-side rendering for instant loading
- 🔄 Real-time URL generation and validation
- 💾 Efficient MongoDB database operations

### 🎯 **Smart URL Management**
- 🔗 Custom short URL aliases
- ✅ Duplicate URL detection
- 🔄 Instant redirection to original URLs
- 📊 Simple and clean URL structure

### 🎨 **Beautiful Interface**
- 🌈 Modern purple-themed design with Tailwind CSS
- 📱 Fully responsive layout for all devices
- ✨ Smooth animations and transitions
- 🎯 Intuitive user experience
- 🔥 Custom Poppins font for elegant typography

### 🛠️ **Developer-Friendly**
- 📝 Clean, modular Next.js architecture
- 🗄️ MongoDB integration with connection pooling
- 🔧 Easy deployment and customization
- 📡 RESTful API design
- 🌍 Environment-based configuration

## 🚀 Demo

> **🌟 Live Demo**: [**BitLinks URL Shortener**](https://url-shortner-ecru-tau.vercel.app/) 
> 
> *Experience fast, privacy-focused URL shortening with no registration required!*

## 📦 Installation

### 🌐 Quick Deploy
**Want to deploy instantly?** Deploy to Vercel with one click!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/pushkarkumarsaini2006/URL-Shortner)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/pushkarkumarsaini2006/URL-Shortner.git
   cd URL-Shortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bitlinks
   NEXT_PUBLIC_HOST=https://url-shortner-ecru-tau.vercel.app
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (recommended)
   # Update MONGODB_URI with your Atlas connection string
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### 📁 Project Structure
```
URL-Shortner/
├── 📁 app/
│   ├── 📄 page.js                 # Homepage
│   ├── 📄 layout.js               # Root layout
│   ├── 📄 globals.css             # Global styles
│   ├── 📁 shorten/
│   │   └── 📄 page.js             # URL shortening page
│   ├── 📁 [shorturl]/
│   │   └── 📄 page.js             # Dynamic redirect page
│   ├── 📁 api/
│   │   └── 📁 generate/
│   │       └── 📄 route.js        # URL generation API
│   └── 📁 fonts/                  # Custom fonts
├── 📁 components/
│   └── 📄 Navbar.js               # Navigation component
├── 📁 lib/
│   └── 📄 mongodb.js              # Database connection
├── 📄 package.json                # Dependencies
├── 📄 tailwind.config.js          # Tailwind configuration
├── 📄 next.config.mjs             # Next.js configuration
└── 📄 README.md                   # This file
```

## 🎮 Usage

### Basic URL Shortening

1. **Access the Application**: Visit the homepage
2. **Navigate to Shorten**: Click "Try Now" or visit `/shorten`
3. **Enter Details**:
   - Original URL (e.g., `https://example.com/very-long-url`)
   - Custom short URL (e.g., `mylink`)
4. **Generate**: Click "Generate" to create your short URL
5. **Use**: Copy and share your shortened URL

### URL Redirection

- **Access**: Visit `url-shortner-ecru-tau.vercel.app/yourshorturl`
- **Redirect**: Automatically redirects to the original URL
- **Fallback**: Invalid URLs redirect to homepage

### API Usage

#### Create Short URL
```bash
curl -X POST https://url-shortner-ecru-tau.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/long-url",
    "shorturl": "mylink"
  }'
```

#### Response Format
```json
{
  "success": true,
  "error": false,
  "message": "URL Generated Successfully"
}
```

## 🛠️ Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/bitlinks` |
| `NEXT_PUBLIC_HOST` | Your domain URL | `https://url-shortner-ecru-tau.vercel.app` |

### Database Schema

```javascript
// MongoDB Collection: url
{
  _id: ObjectId,
  url: "https://example.com/original-url",
  shorturl: "customalias",
  createdAt: ISODate (auto-generated)
}
```

### Customization

#### Styling
Modify colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      purple: {
        100: '#f3e8ff',
        500: '#8b5cf6',
        600: '#7c3aed'
      }
    }
  }
}
```

#### Homepage Content
Edit `app/page.js` to customize the landing page message and design.

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add `MONGODB_URI` and `NEXT_PUBLIC_HOST`
3. **Deploy**: Vercel will automatically build and deploy

### Other Platforms

#### Netlify
```bash
npm run build
npm run export
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📱 Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| 🌐 Chrome | 90+ |
| 🦊 Firefox | 88+ |
| 🧭 Safari | 14+ |
| 📘 Edge | 90+ |

## 🔧 Technical Details

### Built With
- **Next.js 15**: React framework with App Router
- **React 18**: Modern React with hooks
- **MongoDB**: NoSQL database for URL storage
- **Tailwind CSS**: Utility-first CSS framework
- **Poppins Font**: Custom typography

### Key Features Implementation
- **Server-Side Rendering**: Fast initial page loads
- **API Routes**: Built-in API with Next.js
- **Dynamic Routing**: Automatic URL redirection
- **Database Connection Pooling**: Efficient MongoDB connections
- **Responsive Design**: Mobile-first approach

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Font Loading**: Optimized custom font loading
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Built-in caching for static assets

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

```bash
# Clone your fork
git clone https://github.com/pushkarkumarsaini2006/URL-Shortner.git

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and test
npm run dev

# Submit pull request
```

### Areas for Contribution
- 🔐 **Security**: Enhanced security features
- 📊 **Analytics**: Optional privacy-respecting analytics
- 🎨 **UI/UX**: Design improvements
- 🔧 **Performance**: Optimization enhancements
- 📚 **Documentation**: Improved documentation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pushkar Kumar Saini**
- GitHub: [@pushkarkumarsaini2006](https://github.com/pushkarkumarsaini2006)
- Email: pushkarkumarsaini2006@gmail.com

## 🙏 Acknowledgments

- 🎨 **Next.js Team** for the amazing framework
- 🍃 **MongoDB** for reliable database solutions
- 🎨 **Tailwind CSS** for beautiful styling utilities
- 🌟 **Vercel** for seamless deployment platform

## 🗺️ Roadmap

- [ ] 📊 Optional analytics dashboard
- [ ] 🔐 Password protection for URLs
- [ ] 📱 Mobile app development
- [ ] 🔗 Bulk URL shortening
- [ ] 📈 URL expiration dates
- [ ] 🎨 Custom domain support

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/pushkarkumarsaini2006/URL-Shortner?style=social)
![GitHub forks](https://img.shields.io/github/forks/pushkarkumarsaini2006/URL-Shortner?style=social)
![GitHub issues](https://img.shields.io/github/issues/pushkarkumarsaini2006/URL-Shortner)
![GitHub pull requests](https://img.shields.io/github/issues-pr/pushkarkumarsaini2006/URL-Shortner)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Pushkar Kumar Saini](https://github.com/pushkarkumarsaini2006)

</div>