# Zero to Website - Web Development Learning Platform

A comprehensive web development learning platform built with HTML, CSS, JavaScript, and modern web technologies. This project provides interactive lessons, practice exercises, and tools for learning web development from the ground up.

## 📊 Google Analytics Integration

This project includes Google Analytics tracking across all HTML pages to monitor user engagement and page views. The tracking ID is **G-L1KR6MWWP3**.

### Analytics Coverage
- **Total HTML files with tracking:** 115 out of 132 total HTML files
- **Files processed:** 113 additional files beyond the original 2 files (index.html, 404.html)
- **Coverage:** All lesson pages, practice pages, chapter pages, and main site pages
- **Implementation:** Consistent Google Analytics tag placed in `<head>` section before `</head>`

### Tracking Code
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L1KR6MWWP3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-L1KR6MWWP3');
</script>
```

## 📚 Project Structure

```
├── Assets/
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript files
├── Chapters/         # Learning content organized by chapters
│   ├── Chapter-00-Introduction/
│   ├── Chapter-01-Development Environment/
│   ├── Chapter-02-HTML/
│   ├── Chapter-03-CSS/
│   ├── Chapter-04-Flexbox/
│   ├── Chapter-05-CSS Grid/
│   ├── Chapter-06-JavaScript/
│   ├── Chapter-07-Responsive Design/
│   ├── Chapter-08-Bootstrap/
│   ├── Chapter-09-Git & GitHub/
│   └── Chapter-10-Final Project & Deployment/
├── public/           # Static assets
├── src/              # Source code
└── scripts/          # Utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📈 Analytics Features

### Tracked Pages
- All lesson pages (`lesson.html`)
- All practice pages (`practice.html`)
- Chapter overview pages (`index.html`)
- Main site pages (about, blog, contact, etc.)
- Error pages (404.html)

### Metrics Tracked
- Page views
- User engagement
- Traffic sources
- Device types
- User behavior patterns

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Styling:** CSS, Flexbox, CSS Grid, Bootstrap
- **Build Tools:** Vite, TypeScript
- **Testing:** Vitest
- **Deployment:** Static site hosting

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Google Analytics Dashboard](https://analytics.google.com/)
- [Project Documentation](./Documentation/)
- [API Documentation](./docs/)

---

**Note:** This README was generated automatically as part of the Google Analytics integration process. For more detailed documentation, please refer to the project's documentation folder.