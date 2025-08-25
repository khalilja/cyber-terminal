# cyber-terminal
My tool is a versatile, web-based platform for transforming and analyzing data. You can input text, hex, or binary and apply a chain of powerful operations. The intuitive interface lets you arrange "recipes" of functions, from simple text transformations and data analysis to complex cryptographic tasks.
#  XrooT Cyber Terminal v3.1.337

**The Ultimate Hacker-Style Encoding/Decoding Tool**

A cyberpunk-themed CyberChef alternative with Matrix rain effects, dual themes, and an authentic terminal interface that looks straight out of a sci-fi movie.


##  Features

###  **Authentic Hacker Aesthetics**
- **Matrix Rain Background** - Animated falling code effect
- **Terminal-Style Interface** - Monospace fonts and command-line vibes  
- **Cyberpunk Color Scheme** - Neon green/cyan on dark backgrounds
- **ASCII Art Branding** - Custom XrooT logo
- **Glitch Animations** - Error effects that actually glitch out
- **Scan-line Effects** - Button hover animations

###  **Dual Theme System**
- **Dark Mode** - Full black terminal with neon accents (default)
- **Light Mode** - Clean white interface for stealth operations
- **Instant Toggle** - Switch themes with one click
- **Dynamic Colors** - All elements adapt to theme changes

###  **Professional Operations**
- **Encoding** - Base64, URL, Hex, HTML encoding/decoding
- **Hashing** - MD5, SHA256, CRC32 hash generation
- **Cryptography** - Caesar cipher, ROT13, XOR encryption
- **Text Transform** - Case conversion, reverse, formatting
- **Data Format** - JSON pretty-print and minification

### 🛠️ **Advanced UX Features**
- **Drag & Drop Files** - Visual drop zones with hover states
- **Real-time Search** - Filter operations instantly
- **Category System** - Organized operation groups
- **Status Feedback** - Live connection status and operation counts
- **Copy/Download** - Professional output handling
- **Responsive Design** - Works on desktop and mobile

##  File Structure

```
XrooT-Cyber-Terminal/
├── index.html          # Main HTML structure
├── css/
│   └── style.css       # All styling and animations
├── js/
│   └── script.js       # Application logic and effects
└── README.md           # This file
```

## Quick Start

1. **Download all files** maintaining the folder structure
2. **Open `index.html`** in any modern browser
3. **Start encoding/decoding** - No server required!

##  Usage

### Basic Operations
1. **Select Operation** - Click any operation card to select it
2. **Input Data** - Type or paste data in the input buffer
3. **Execute** - Hit the ⚡ EXECUTE button
4. **Copy/Save** - Use ⎘ COPY or ⇩ SAVE buttons

### File Handling
- **Drag & Drop** - Simply drag files onto the input area
- **Click Upload** - Click the drop zone to browse files
- **Supported Formats** - TXT, JSON, XML, BIN, and more

### Advanced Features
- **Search Operations** - Use the search bar to find specific operations
- **Filter by Category** - Click category chips to filter operations
- **Theme Toggle** - Switch between dark/light modes
- **Keyboard Shortcuts** - Standard copy/paste shortcuts work

## Supported Operations

### Encoding
- Base64 encode/decode
- URL encode/decode  
- Hexadecimal conversion
- HTML entity encoding

###  Hashing
- MD5 hash generation
- SHA-256 hash generation
- CRC-32 checksum calculation

###  Cryptography
- Caesar cipher (shift-3)
- ROT13 encoding
- XOR cipher with key

###  Text Transform
- Case conversion (upper/lower)
- String reversal
- Whitespace removal

###  Format
- JSON pretty-printing
- JSON minification

##  Technical Highlights

- **Pure Frontend** - No backend dependencies
- **Modern CSS** - CSS Grid, Flexbox, custom properties
- **Vanilla JavaScript** - No frameworks, pure performance
- **Canvas Animation** - Smooth Matrix rain effect
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Proper ARIA labels and keyboard navigation

##  Customization

### Adding New Operations
1. Add to the `operations` array in `script.js`
2. Implement the operation logic in `performOperation()`
3. Operations are automatically categorized and searchable

### Theme Customization
- Edit CSS custom properties in `:root` for dark theme
- Edit `[data-theme="light"]` properties for light theme
- All colors use CSS variables for easy customization

### Visual Effects
- Matrix animation speed: Adjust `setInterval(drawMatrix, 35)`
- Glitch duration: Modify timeout in glitch animations
- Hover effects: Edit transition timings in CSS

## 🔧 Browser Compatibility

-  Chrome 80+
-  Firefox 75+
-  Safari 13+
-  Edge 80+

##  License

MIT License - Feel free to use, modify, and distribute!

##  Contributing

Want to add more operations or improve the UI? Pull requests welcome!

---

**Created with 💚 for the cybersecurity community**

*"In a world of 1 and 0, be the one who decodes the impossible."*
