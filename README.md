# 📓 Notebook - Web Version

A beautiful, modern note-taking application with a sleek dark/light theme, inspired by Microsoft Outlook. Built with vanilla JavaScript and Vite for a fast, lightweight experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🌟 Features

- **📝 Create & Edit Notes** - Quickly create new notes with titles and rich content
- **🌙 Dark/Light Theme** - Toggle between beautiful dark and light themes
- **💾 Auto-Save** - Notes are automatically saved to browser localStorage
- **🔍 Note Preview** - Quick preview of note content in the sidebar
- **🗑️ Delete Notes** - Remove notes with confirmation
- **📅 Date Tracking** - Automatic timestamps for note creation and updates
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **📱 Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean, professional interface with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download this project:
```bash
cd Notebook-Web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174/
```

## 📖 Usage

### Creating a Note
1. Click the **✚** button in the top-right of the sidebar
2. Enter a title for your note
3. Start typing your content
4. Your note is saved automatically!

### Switching Themes
Click the **🌙** (dark mode) or **☀️** (light mode) button in the top-right corner of the sidebar to toggle between themes. Your preference is automatically saved.

### Deleting a Note
1. Select the note you want to delete
2. Click the **🗑️** button in the note header
3. Confirm the deletion

### Managing Notes
- **Click any note** in the sidebar to view and edit it
- **Notes are sorted** by most recently updated at the top
- **Date displayed** shows the last update time
- **Preview text** helps you find notes quickly

## 🛠️ Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
Notebook-Web/
├── src/
│   ├── main.js           # Main application logic
│   ├── style.css         # Styles with dark/light theme support
│   └── counter.js        # (Legacy - can be removed)
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## 💾 Data Storage

Notes are stored in your browser's **localStorage**. This means:
- ✅ No server needed
- ✅ All data stays on your device
- ✅ Notes persist even after closing the browser
- ⚠️ Clearing browser data will delete all notes
- ⚠️ Notes don't sync across devices

**Tip:** Export your notes regularly if they're important!

## 🎨 Customization

### Changing Colors
Edit the color variables in `src/style.css`:

```css
:root[data-theme="light"] {
  --primary-color: #0078d4;
  --primary-hover: #005a9e;
  /* ... more colors ... */
}

:root[data-theme="dark"] {
  --primary-color: #4a9eff;
  --primary-hover: #3d8fdb;
  /* ... more colors ... */
}
```

### Modifying Fonts
Change the font import in `src/style.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

## 🔧 Built With

- **Vite** - Lightning fast build tool
- **Vanilla JavaScript** - No heavy frameworks
- **CSS3** - Modern styling with CSS variables
- **localStorage API** - Browser-based data persistence

## 📝 Notes

- All data is stored locally in your browser
- Maximum storage depends on your browser (typically 5-10MB)
- Notes are plain text - no formatting support yet
- Dark theme is enabled by default

## 🚀 Future Enhancements

- [ ] Rich text editing (bold, italic, lists)
- [ ] Search functionality
- [ ] Note categories/tags
- [ ] Export notes to PDF
- [ ] Cloud sync option
- [ ] Note sharing
- [ ] Dark mode auto-detection

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Create pull requests

## 💬 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainer.

---

**Made with ❤️ for note-takers everywhere**
