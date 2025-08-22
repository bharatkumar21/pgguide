# PG Portal - Postgraduate Entrance Exam Information Portal

A comprehensive, mobile-first responsive website providing detailed information about postgraduate entrance examinations in India, including MA, MCA, and MBA programs.

## 🌟 Features

- **Mobile-First Design**: Optimized for mobile devices with responsive design for tablets and desktops
- **Tabbed Navigation**: Clean, intuitive navigation between different program categories
- **Dynamic Content Loading**: Content loaded from structured JSON data files
- **Modern UI/UX**: Clean card-based design with smooth animations and hover effects
- **Search & Filter Ready**: Framework ready for implementing search and filtering functionality
- **Accessibility**: Built with accessibility best practices in mind

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and above
- **Tablet**: Responsive grid layouts for medium screens (768px+)
- **Desktop**: Full-featured experience for large screens (1024px+)

## 🏗️ Project Structure

```
pgportal/
├── index.html              # Main HTML file with tabbed interface
├── css/
│   └── style.css          # Main stylesheet with mobile-first responsive design
├── js/
│   └── main.js            # JavaScript functionality for tabs and interactions
├── data/
│   └── exams.json         # Structured data for entrance examinations
├── assets/
│   └── images/            # Images and icons (placeholder)
└── README.md              # Project documentation
```

## 🎯 Program Categories

### MA Programs
- Central Universities Entrance Test (CUET-PG)
- Jawaharlal Nehru University Entrance Exam (JNUEE)
- Banaras Hindu University Postgraduate Entrance Test (BHU PET)
- Delhi University Entrance Test (DUET)

### MCA Programs
- NIT MCA Common Entrance Test (NIMCET)
- MAH MCA CET
- CUET-PG (MCA)
- WB JECA

### MBA Programs
- Common Admission Test (CAT)
- Xavier Aptitude Test (XAT)
- Management Aptitude Test (MAT)
- Graduate Management Admission Test (GMAT)
- Symbiosis National Aptitude Test (SNAP)

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation
1. Clone or download the repository
2. Navigate to the project directory
3. Open `index.html` in a web browser

### Development Setup
For local development with live reload:

#### Option 1: Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` in the file explorer
3. Select "Open with Live Server"
4. Your browser will automatically open with live reload enabled

#### Option 2: Command Line
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📊 Data Structure

The website uses a structured JSON format for exam information:

```json
{
  "category": {
    "title": "Category Title",
    "description": "Category description",
    "exams": [
      {
        "name": "Exam Name",
        "eligibility": ["Requirement 1", "Requirement 2"],
        "syllabus": ["Topic 1", "Topic 2"],
        "importantDates": ["Date 1", "Date 2"],
        "applicationProcess": ["Step 1", "Step 2"],
        "website": "https://example.com"
      }
    ]
  }
}
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy theming:
```css
:root {
  --primary-color: #234078;
  --secondary-color: #183157;
  --accent-color: #4a90e2;
  --background-color: #f8fafc;
  --card-background: #ffffff;
}
```

### Adding New Exams
1. Edit `data/exams.json`
2. Add new exam data following the existing structure
3. The website will automatically load and display new content

### Styling
- Main styles are in `css/style.css`
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Smooth transitions and hover effects

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and Custom Properties
- **Vanilla JavaScript**: No external dependencies
- **JSON**: Data storage and retrieval

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Lazy loading ready
- Optimized CSS with CSS custom properties
- Minimal JavaScript footprint
- Responsive images support

## 📝 Content Management

### Updating Exam Information
1. Locate the relevant section in `data/exams.json`
2. Update the exam details
3. Save the file
4. Refresh the website to see changes

### Adding New Categories
1. Add new category data to `data/exams.json`
2. Add corresponding tab in `index.html`
3. Update JavaScript to handle new category

## 🌐 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main` or `master`)
4. Website will be available at `https://username.github.io/repository-name`

### Other Hosting
- Upload files to any web hosting service
- Ensure `data/exams.json` is accessible
- Test all functionality after deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions, suggestions, or issues:
- Create an issue in the repository
- Contact: info@pgportal.in (placeholder)

## 🔄 Future Enhancements

- [ ] Search functionality
- [ ] Advanced filtering options
- [ ] User accounts and favorites
- [ ] Exam notifications
- [ ] Study material integration
- [ ] Mobile app version
- [ ] Multi-language support

---

**Made with ❤️ for students pursuing higher education in India**
