# Portfolio Website

A professional, clean portfolio website built with vanilla HTML, CSS, and JavaScript. Features a modern design with smooth animations and responsive layouts.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-based animations and hover effects
- **Clean Architecture**: Well-organized code with separation of concerns
- **Modern UI**: Professional gradient effects and card-based layouts
- **Fast Loading**: No frameworks, pure vanilla JavaScript for optimal performance
- **SEO Friendly**: Semantic HTML structure

## 📁 Project Structure

```text
Portfolio Site/
├── index.html              # Main landing page
├── projects/
│   ├── gameboard.html      # Interactive Gameboard project detail
│   └── spare-shed.html     # The Spare Shed project detail
├── css/
│   └── styles.css          # All styling and responsive design
├── js/
│   └── main.js            # Interactive functionality
└── README.md              # This file
```

## 🎨 Customization Guide

### Update Your Personal Information

1. **Contact Links** (in `index.html`):

   ```html
   <a href="mailto:YOUR_EMAIL@example.com" class="contact-link">Email</a>
   <a href="https://github.com/YOUR_USERNAME" class="contact-link">GitHub</a>
   <a href="https://linkedin.com/in/YOUR_USERNAME" class="contact-link">LinkedIn</a>
   ```

2. **Hero Section** (in `index.html`):
   - Update the title and subtitle to match your personal brand
   - Modify the gradient colors in CSS if desired

### Add Images and Videos

To add media to your project pages:

1. Create an `images/` folder in the root directory
2. Add your project images and videos
3. Replace the placeholder divs in project pages:

   ```html
   <!-- Replace this: -->
   <div class="media-item placeholder">
       <p>Image: Hexagon Gameboard Layout</p>
   </div>
   
   <!-- With this: -->
   <div class="media-item">
       <img src="../images/gameboard-layout.jpg" alt="Hexagon Gameboard Layout">
   </div>
   ```

4. For videos, use:

   ```html
   <div class="media-item">
       <video controls>
           <source src="../images/demo-video.mp4" type="video/mp4">
       </video>
   </div>
   ```

### Add More Projects

1. Create a new HTML file in the `projects/` folder
2. Use `gameboard.html` or `spare-shed.html` as a template
3. Add a new project card to `index.html`:

   ```html
   <article class="project-card">
       <div class="project-image">
           <div class="project-placeholder">
               <!-- Your icon or image -->
           </div>
       </div>
       <div class="project-content">
           <h3 class="project-title">Project Name</h3>
           <p class="project-description">Brief description</p>
           <div class="project-tags">
               <span class="tag">Tech 1</span>
               <span class="tag">Tech 2</span>
           </div>
           <a href="projects/your-project.html" class="btn btn-secondary">Learn More</a>
       </div>
   </article>
   ```

### Customize Colors

Colors are defined as CSS variables in `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1e40af;       /* Darker variant */
    --accent-color: #0ea5e9;       /* Accent highlights */
    /* ... more colors ... */
}
```

Simply modify these values to match your brand colors.

### Customize Fonts

To use different fonts:

1. Add Google Fonts or custom fonts to `index.html`:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
   ```

2. Update the font variables in `css/styles.css`:

   ```css
   --font-primary: 'Your Font', sans-serif;
   ```

## 🌐 Deployment

### Option 1: GitHub Pages

1. Create a new repository on GitHub
2. Push your portfolio files to the repository
3. Go to Settings → Pages
4. Select the main branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your Portfolio Site folder
3. Your site will be live instantly with a custom URL

### Option 3: Local Development

Simply open `index.html` in your web browser to view locally.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Performance Features

- **Intersection Observer API**: For efficient scroll animations
- **CSS Transitions**: Hardware-accelerated animations
- **Optimized JavaScript**: Minimal DOM manipulation
- **Lazy Loading Ready**: Easy to implement for images

## 🔧 Future Enhancements

Consider adding:

- A blog section
- A skills/technologies section
- Testimonials or recommendations
- A downloadable resume/CV
- Dark mode toggle
- Contact form with backend integration
- Project filtering by technology

## 📝 License

This portfolio template is free to use and modify for your personal portfolio.

## 🤝 Contributing

Feel free to customize this template to match your personal style and needs!

---

Made with ❤️ using vanilla HTML, CSS, and JavaScript
